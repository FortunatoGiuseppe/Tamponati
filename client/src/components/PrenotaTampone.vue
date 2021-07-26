<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin" style="min-width: 455px">
      <q-form @submit.prevent="doPrenotazione">
        <q-card-section>
          <div class="text-h6">Prenota Tampone</div>
        </q-card-section>
        <q-separator />
        <q-card-section class="col q-gutter-md">
          <q-select
            v-model="tipotampone"
            outlined
            label="Tipo di Tampone"
            :options="options"
            :rules="[(val) => !!val || 'Campo Richiesto']"
          />
          <q-select
            v-model="provincia"
            outlined
            emit-value
            map-options
            label="Provincia"
            :options="optionsProvince"
            :rules="[(val) => !!val || 'Campo Richiesto']"
          />
          <q-select
            v-model="id_laboratorio"
            outlined
            label="Laboratorio"
            option-value="uid"
            option-label="nome"
            emit-value
            map-options
            :options="optionsLaboratori"
            :rules="[(val) => !!val || 'Campo Richiesto']"
            @filter="getLabs"
          >
            <template #option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section>
                  <q-item-label>{{ scope.opt.nome }}</q-item-label>
                  <q-item-label caption>{{ scope.opt.citta }} ({{ scope.opt.provincia }})</q-item-label>
                  <q-item-label caption>{{ scope.opt.indirizzo }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select>
          <q-date ref="calRef" v-model="data" landscape :options="dateDispo" />
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
          <q-btn v-close-popup label="Annulla" color="grey" flat />
          <q-btn type="submit" color="primary" label="Prenota" flat />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, ref, watch, nextTick } from 'vue';
import { useQuasar, useDialogPluginComponent, date } from 'quasar';
import firebase from 'firebase/app';
import { db } from 'boot/firebase';
import { useState } from 'src/modules/useState.js';

export default defineComponent({
  name: 'PrenotaTampone',
  props: {
    id: {
      type: String,
      default: null,
    },
  },
  emits: [...useDialogPluginComponent.emits],
  setup() {
    const { dialogRef, onDialogOK, onDialogHide } = useDialogPluginComponent();
    const calRef = ref(null);
    const $q = useQuasar();
    const state = useState();
    const tipotampone = ref('');
    const id_laboratorio = ref('');
    const data = ref('');
    const provincia = ref('');
    const optionsLaboratori = ref([]);

    const optionsProvince = ref([]);
    db.collection('province')
      .get()
      .then((querySnapshot) => {
        const prov = [];
        querySnapshot.forEach((doc) => {
          prov.push(doc.data());
        });
        optionsProvince.value = prov;
      });

    const getLabs = (val, update, abort) => {
      if (provincia.value.length < 2) {
        abort();
        return;
      }

      db.collection('users')
        .where('tipo_utente', '==', 4)
        .where('provincia', '==', provincia.value)
        .get()
        .then((querySnapshot) => {
          update(() => {
            optionsLaboratori.value = [];
            querySnapshot.forEach((doc) => {
              optionsLaboratori.value.push(doc.data());
            });
          });
        });
    };

    const dateDispo = ref([]);
    const getDateDispo = async () => {
      const giorniDispo = [];
      db.collection('calendari')
        .where('id_laboratorio', '==', id_laboratorio.value)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            giorniDispo.push(date.formatDate(doc.data().data.toDate(), 'YYYY/MM/DD'));
          });
        });
      dateDispo.value = giorniDispo;
      // await nextTick();
      // calRef.value.setCalendarTo('2021', '8');
      // await nextTick();
      // calRef.value.setCalendarTo('2021', '7');
      // console.log(dateDispo.value);
    };

    watch(id_laboratorio, getDateDispo);

    const doPrenotazione = async () => {
      if (!data.value || data.value.length < 4) {
        $q.notify({
          type: 'negative',
          position: 'top',
          message: 'Selezionare una data!',
        });
        return;
      }

      try {
        await db.collection('prenotazioni').add({
          tipotampone: tipotampone.value,
          id_laboratorio: id_laboratorio.value,
          data: firebase.firestore.Timestamp.fromDate(date.extractDate(data.value, 'YYYY/MM/DD')),
          nome: state.value.nome,
          cognome: state.value.cognome,
          codicefiscale: state.value.cf,
          confermato: 0,
          esito: null,
        });
        onDialogOK();
      } catch (error) {
        $q.notify({
          type: 'negative',
          position: 'top',
          message: 'Errore salvataggio Dati!',
        });
        console.log(error);
      }
    };

    return {
      calRef,
      dateDispo,
      dialogRef,
      onDialogOK,
      onDialogHide,
      options: ['Molecolare', 'Antigenico'],
      optionsProvince,
      optionsLaboratori,
      getLabs,
      tipotampone,
      provincia,
      id_laboratorio,
      data,
      doPrenotazione,
    };
  },
});
</script>
