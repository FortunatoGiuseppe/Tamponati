<template>
  <div class="q-pa-md">
    <q-form ref="formRef" @submit.prevent="addRow">
      <q-list class="rounded-borders q-my-md" bordered>
        <q-item class="items-start">
          <q-item-section>
            <q-item-label>
              <q-input
                v-model="register.data"
                outlined
                label="Data"
                dense
                mask="##/##/####"
                :rules="[
                  (val) => /^-?[0-3]\d\/[0-1]\d\/[\d]+$/.test(val) || 'Campo Richiesto',
                  (val) => checkMajToday(val) || 'La Data non deve essere nel passato',
                ]"
              >
                <template #append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qDateProxy">
                      <q-date
                        v-model="register.data"
                        mask="DD/MM/YYYY"
                        :options="limitDateFn"
                        @update:model-value="() => $refs.qDateProxy.hide()"
                      />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </q-item-label>
          </q-item-section>
          <q-item-section class="text-weight-medium">
            <q-item-label>
              <q-input
                ref="qtaRef"
                v-model.number="register.qta"
                outlined
                label="Quantità"
                dense
                :rules="[(val) => !!val || 'Campo Richiesto']"
              />
            </q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label class="text-black">
              <q-btn type="submit" icon="add" flat round color="primary" />
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-form>

    <q-list class="rounded-borders relative-position" bordered separator>
      <q-item class="text-weight-medium">
        <q-item-section>
          <q-item-label>Data</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>Q.ta Tamponi</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>Q.ta Tamponi disponibili</q-item-label>
        </q-item-section>
        <q-item-section class="col-2 text-black" side>
          <q-item-label>Action</q-item-label>
        </q-item-section>
      </q-item>

      <transition-group name="scale" move-class="move-transition">
        <template v-for="(row, index) in sortedCalendar" :key="index">
          <q-item v-ripple clickable>
            <q-item-section>
              <q-item-label>{{ row.data }}</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ row.qta }}</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ row.qta_disponibile }}</q-item-label>
            </q-item-section>
            <q-item-section class="col-2 text-black" side>
              <q-item-label><q-btn icon="delete" flat @click="deleteRow(row)" /></q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </transition-group>
    </q-list>
  </div>
</template>

<script>
import { defineComponent, ref, computed, nextTick } from 'vue';
import firebase from 'firebase/app';
import { date } from 'quasar';
import { db } from 'boot/firebase';
import { useState } from 'src/modules/useState.js';

export default defineComponent({
  name: 'PrenotaTamponePage',
  setup() {
    const state = useState();
    const formRef = ref(null);
    const qtaRef = ref(null);
    const calendario = ref([]);
    const register = ref({
      data: '',
      qta: '',
      qta_disponibile: '',
    });

    db.collection('calendari')
      .where('id_laboratorio', '==', state.value.id)
      .get()
      .then((querySnapshot) => {
        const cal = [];
        querySnapshot.forEach((doc) => {
          cal.push({
            data: date.formatDate(doc.data().data.toDate(), 'DD/MM/YYYY'),
            qta: doc.data().qta,
            qta_disponibile: doc.data().qta_disponibile,
          });
        });
        calendario.value = cal;
      });

    const today = date.formatDate(Date.now(), 'YYYY/MM/DD');
    const limitDateFn = (cal) => {
      return cal >= today;
    };
    const checkMajToday = (val) => {
      return date.extractDate(val, 'DD/MM/YYYY') >= new Date();
    };

    const findCalendarIndexByDate = (val) => {
      return calendario.value.findIndex((el) => el.data === val);
    };

    const addRow = async () => {
      const index = findCalendarIndexByDate(register.value.data);
      if (index !== -1) {
        calendario.value[index].qta = register.value.qta;

        const querySnapshot = await db
          .collection('calendari')
          .where('id_laboratorio', '==', state.value.id)
          .where(
            'data',
            '==',
            firebase.firestore.Timestamp.fromDate(date.extractDate(register.value.data, 'DD/MM/YYYY'))
          )
          .get();

        querySnapshot.forEach((doc) => {
          db.collection('calendari').doc(doc.id).update({ qta: register.value.qta });
        });
      } else {
        calendario.value.push({ ...register.value });

        await db.collection('calendari').add({
          id_laboratorio: state.value.id,
          data: firebase.firestore.Timestamp.fromDate(date.extractDate(register.value.data, 'DD/MM/YYYY')),
          qta: parseInt(register.value.qta),
          qta_disponibile: parseInt(register.value.qta),
        });
      }

      register.value.data = date.formatDate(
        date.addToDate(date.extractDate(register.value.data, 'DD/MM/YYYY'), { days: 1 }),
        'DD/MM/YYYY'
      );
      register.value.qta = '';

      await nextTick();
      formRef.value.resetValidation();
      qtaRef.value.focus();
    };

    const deleteRow = (row) => {
      const index = findCalendarIndexByDate(row.data);

      db.collection('calendari')
        .where('id_laboratorio', '==', state.value.id)
        .where('data', '==', firebase.firestore.Timestamp.fromDate(date.extractDate(row.data, 'DD/MM/YYYY')))
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            db.collection('calendari').doc(doc.id).delete();
          });
        });

      calendario.value.splice(index, 1);
    };

    const cancellaDateVecchie = () => {
      const index = findCalendarIndexByDate(row.data);

      db.collection('calendari')
        .where('data', '<=', firebase.firestore.Timestamp.fromDate(date.extractDate(row.data, 'DD/MM/YYYY')))
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            db.collection('calendari').doc(doc.id).delete();
          });
        });

      calendario.value.splice(index, 1);
    };

    const sortedCalendar = computed(() => {
      const res = [...calendario.value];
      res.sort((a, b) => {
        return date.extractDate(a.data, 'DD/MM/YYYY') - date.extractDate(b.data, 'DD/MM/YYYY');
      });

      return res;
    });

    return {
      formRef,
      qtaRef,
      limitDateFn,
      checkMajToday,
      register,
      sortedCalendar,
      addRow,
      deleteRow,
      cancellaDateVecchie,
    };
  },
});
</script>
