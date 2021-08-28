<template>
  <div>
    <p class="text-center text-h5"><q-icon name="biotech" size="lg" /> Laboratorio</p>
    <div class="row">
      <div class="col">
        <div class="q-pa-md">
          <q-table
            title="Da Confermare"
            :rows="daConfermare"
            :columns="colConfermare"
            :pagination="{ page: 1, rowsPerPage: 0 }"
            row-key="id"
            binary-state-sort
            hide-bottom
            bordered
            flat
          >
            <template #body-cell-data="props">
              <q-td :props="props">
                {{ props.row.data }}
                <q-popup-edit
                  v-slot="scope"
                  v-model="props.row.data"
                  auto-save
                  @save="(value) => updateDataTampone(value, props.row)"
                >
                  <q-input v-model="scope.value" mask="##/##/####" dense autofocus @keyup.enter="scope.set" />
                </q-popup-edit>
              </q-td>
            </template>

            <template #body-cell-confermato="props">
              <q-td :props="props">
                <q-checkbox v-model="props.row.confermato" @update:model-value="confermaTampone(props.row)" />
              </q-td>
            </template>
          </q-table>
        </div>
        <div class="q-pa-md">
          <q-table
            title="Da Refertare"
            :rows="daRefertare"
            :columns="colRefertare"
            :pagination="{ page: 1, rowsPerPage: 0 }"
            row-key="id"
            binary-state-sort
            hide-bottom
            bordered
            flat
          >
            <template #body-cell-esito="props">
              <q-td :props="props">
                <q-option-group
                  v-model="props.row.esito"
                  :options="optionsEsito"
                  @update:model-value="(value) => updateEsitoTampone(value, props.row)"
                />
              </q-td>
            </template>
          </q-table>
        </div>
        <div class="q-pa-md">
          <q-table
            title="Refertati"
            :rows="refertati"
            :columns="colRefertare"
            :pagination="{ page: 1, rowsPerPage: 4 }"
            row-key="id"
            binary-state-sort
            bordered
            flat
          >
            <template #body-cell-esito="props">
              <q-td :props="props">
                <q-option-group
                  v-model="props.row.esito"
                  :options="optionsEsito"
                  @update:model-value="(value) => updateEsitoTampone(value, props.row)"
                />
              </q-td>
            </template>
          </q-table>
        </div>
      </div>
      <div class="col-4">
        <vue3-chart-js
          :id="doughnutChart.id"
          ref="chartRef"
          :type="doughnutChart.type"
          :data="doughnutChart.data"
          :options="doughnutChart.options"
          style="font-color:white"
        />
      </div>
    </div>
    <q-page-sticky position="bottom-right" :offset="[24, 24]">
      <q-btn fab icon="date_range" label="Calendario" to="/calendario" color="primary" />
    </q-page-sticky>
    <q-page-sticky position="bottom-right" :offset="[24, 95]">
      <q-btn fab icon="date_range" label="Questionari" color="primary"  @click="openQuestionari"/>
    </q-page-sticky>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue';
import { date } from 'quasar';
import { useQuasar } from 'quasar';
import firebase from 'firebase/app';
import { db } from 'boot/firebase';
import { useState } from 'src/modules/useState.js';
import Vue3ChartJs from '@j-t-mcc/vue3-chartjs';
import VisualizzaQuestionari from 'src/components/VisualizzaQuestionari.vue';
export default defineComponent({
  name: 'LaboratorioHome',
  components: { Vue3ChartJs },
  setup() {
    const state = useState();
    const chartRef = ref(null);
    const $q = useQuasar();
    const openQuestionari = () => {
      $q.dialog({
        component: VisualizzaQuestionari,
      }).onOk(async (val) => {});
    };
    const doughnutChart = {
      id: 'doughnut',
      type: 'pie',
      data: {
        labels: ['Positivi', 'Negativi'],
        datasets: [],
      },
      options: {
        responsive: true,
        plugins: {},
      },
    };
    const optionsEsito = [
      {
        label: 'Positivo',
        value: true,
      },
      {
        label: 'Negativo',
        value: false,
      },
    ];

    const colConfermare = [
      {
        name: 'data',
        label: 'Data',
        field: 'data',
        align: 'left',
        sortable: true,
        sort: (a, b) => date.extractDate(a, 'DD/MM/YYYY') - date.extractDate(b, 'DD/MM/YYYY'),
      },
      { name: 'codicefiscale', label: 'Cod. Fiscale', field: 'codicefiscale', align: 'left', sortable: true },
      { name: 'nome', label: 'Nome', field: 'nome', align: 'left', sortable: true },
      { name: 'cognome', label: 'Cognome', field: 'cognome', align: 'left', sortable: true },
      { name: 'confermato', label: 'Conferma', field: 'confermato', align: 'left' },
    ];

    const colRefertare = [
      {
        name: 'data',
        label: 'Data',
        field: 'data',
        align: 'left',
        sortable: true,
        sort: (a, b) => date.extractDate(a, 'DD/MM/YYYY') - date.extractDate(b, 'DD/MM/YYYY'),
      },
      { name: 'codicefiscale', label: 'Cod. Fiscale', field: 'codicefiscale', align: 'left', sortable: true },
      { name: 'nome', label: 'Nome', field: 'nome', align: 'left', sortable: true },
      { name: 'cognome', label: 'Cognome', field: 'cognome', align: 'left', sortable: true },
      { name: 'esito', label: 'Esito', field: 'esito', align: 'left' },
    ];

    const daConfermare = ref([]);
    db.collection('prenotazioni')
      .where('id_laboratorio', '==', state.value.id)
      .where('confermato', '==', 0)
      .orderBy('data', 'asc')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const { nome, cognome, codicefiscale } = doc.data();
          daConfermare.value.push({
            id: doc.id,
            data: date.formatDate(doc.data().data.toDate(), 'DD/MM/YYYY'),
            codicefiscale,
            nome,
            cognome,
            confermato: false,
            esito: null,
          });
        });
      });

    const daRefertare = ref([]);
    db.collection('prenotazioni')
      .where('id_laboratorio', '==', state.value.id)
      .where('confermato', '==', 1)
      .where('esito', '==', null)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const { nome, cognome, codicefiscale, esito } = doc.data();
          daRefertare.value.push({
            id: doc.id,
            data: date.formatDate(doc.data().data.toDate(), 'DD/MM/YYYY'),
            codicefiscale,
            nome,
            cognome,
            confermato: true,
            esito,
          });
        });
      });
      const refertati = ref([]);
      db.collection('prenotazioni')
        .where('id_laboratorio', '==', state.value.id)
        .where('confermato', '==', 1)
        .where('esito', 'in', [true,false])
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const { nome, cognome, codicefiscale, esito } = doc.data();
            refertati.value.push({
              id: doc.id,
              data: date.formatDate(doc.data().data.toDate(), 'DD/MM/YYYY'),
              codicefiscale,
              nome,
              cognome,
              confermato: true,
              esito,
            });
          });
        });

    const confermaTampone = async (row) => {
      await db.collection('prenotazioni').doc(row.id).update({ confermato: 1 });

      const querySnapshot = await db
        .collection('calendari')
        .where('id_laboratorio', '==', state.value.id)
        .where('data', '==', firebase.firestore.Timestamp.fromDate(date.extractDate(row.data, 'DD/MM/YYYY')))
        .get();

      querySnapshot.forEach((doc) => {
        db.collection('calendari')
          .doc(doc.id)
          .update({ qta_disponibile: (doc.data().qta_disponibile ? doc.data().qta_disponibile : doc.data().qta) - 1 });
      });

      const idx = daConfermare.value.findIndex((el) => el.id === row.id);
      if (idx !== -1) {
        daConfermare.value.splice(idx, 1);
        daRefertare.value.push(row);
      }
    };

    const updateEsitoTampone = async (value, row) => {
      await db.collection('prenotazioni').doc(row.id).update({ esito: value });

      const idx = daRefertare.value.findIndex((el) => el.id === row.id);
      if (idx !== -1) {
        daRefertare.value.splice(idx, 1);
        refertati.value.push(row);
      }
    };

    const updateDataTampone = async (val, row) => {
      try {
        await db
          .collection('prenotazioni')
          .doc(row.id)
          .update({ data: firebase.firestore.Timestamp.fromDate(date.extractDate(val, 'DD/MM/YYYY')) });
      } catch (error) {
        console.log(error);
      }
    };

    watch(
      refertati,
      () => {
        console.log(1);
        const positivi = refertati.value.reduce((acc, val) => acc + (val.esito === true ? 1 : 0), 0);
        const negativi = refertati.value.reduce((acc, val) => acc + (val.esito === false ? 1 : 0), 0);

        doughnutChart.data.datasets = [
          {
            backgroundColor: ['rgb(255, 99, 132)', 'rgb(29, 116, 206)'],
            data: [positivi, negativi],
            hoverOffset: 4,
          },
        ];

        chartRef.value.update(250);
      },
      { deep: true }
    );

    return {
      updateEsitoTampone,
      optionsEsito,
      colConfermare,
      colRefertare,
      daConfermare,
      daRefertare,
      refertati,
      confermaTampone,
      updateDataTampone,
      chartRef,
      doughnutChart,
      openQuestionari
    };
  },
});
</script>
