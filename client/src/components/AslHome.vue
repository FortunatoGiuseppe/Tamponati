<template>
  <q-page class="q-pa-md">
    <div class="text-center" style="font-size: 1.2rem"><q-icon name="local_hospital" size="md" /><br />ASL</div>
    <q-separator />
    <q-card class="my-card">
      <q-card-section class="bg-blue-12 text-white">
        <div class="text-h6 text-center">Visualizzazione:</div>
      </q-card-section>
      <q-tabs v-model="tab" class="bg-blue-12 text-white no-caps">
        <q-tab label="dati statistici" name="one" style="width: 50%" icon="analytics"></q-tab>
        <q-tab label="tracciamento positivi" name="two" style="width: 50%" icon="view_list"></q-tab>
      </q-tabs>

      <q-separator></q-separator>

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="one">
          <div class="q-pa-md">
            <q-table
              id="tabellaAgenda"
              title="Esiti tamponi:"
              :rows="statistici"
              :columns="columns"
              row-key="name"
              :visible-columns="visibleColumns"
            >
              <template #header-cell-codicefiscale="props">
                <q-th :props="props">
                  <q-icon name="badge" size="2em"></q-icon>
                  {{ props.col.label }}
                </q-th>
              </template>
              <template #header-cell-data="props">
                <q-th :props="props">
                  <q-icon name="history" size="2em"></q-icon>
                  {{ props.col.label }}
                </q-th>
              </template>
              <template #header-cell-esito="props">
                <q-th :props="props">
                  <q-icon name="coronavirus" size="2em"></q-icon>
                  {{ props.col.label }}
                </q-th>
              </template>
              <template #header-cell-prenotatoda="props">
                <q-th :props="props">
                  <q-icon name="supervisor_account" size="2em"></q-icon>
                  {{ props.col.label }}
                </q-th>
              </template>
              <template #header-cell-laboratorio="props">
                <q-th :props="props">
                  <q-icon name="biotech" size="2em"></q-icon>
                  {{ props.col.label }}
                </q-th>
              </template>
              <template #header-cell-tipotampone="props">
                <q-th :props="props">
                  <q-icon name="vaccines" size="2em"></q-icon>
                  {{ props.col.label }}
                </q-th>
              </template>

              <template #top>
                <div class="text-h7 text-weight-bold q-pr-xl">Mostra filtri:</div>
                <q-toggle
                  v-model="value"
                  color="primary"
                  keep-color
                  class ="q-pr-xl"
                ></q-toggle>
                <q-select
                  v-if="value == true"
                  v-model="visibleColumns"
                  label="Seleziona campi tabella"
                  multiple
                  use-input
                  outlined
                  use-chips
                  color="primary"
                  dense
                  options-dense
                  :display-value="$q.lang.table.columns"
                  emit-value
                  map-options
                  :options="columns"
                  option-value="name"
                  option-label="name"
                ></q-select>
              </template>
            </q-table>
          </div>
        </q-tab-panel>

        <q-tab-panel name="two">
          <div class="q-pa-md">
            <q-table
              id="tabellaAgenda"
              title="Esiti tamponi:"
              :rows="risultati"
              :columns="columns2"
              row-key="name"
              :visible-columns="visibleColumns2"
            >
            <template #header-cell-codicefiscale="props">
                <q-th :props="props">
                  <q-icon name="badge" size="2em"></q-icon>
                  {{ props.col.label }}
                </q-th>
              </template>
              <template #header-cell-data="props">
                <q-th :props="props">
                  <q-icon name="history" size="2em"></q-icon>
                  {{ props.col.label }}
                </q-th>
              </template>
              <template #header-cell-esito="props">
                <q-th :props="props">
                  <q-icon name="coronavirus" size="2em"></q-icon>
                  {{ props.col.label }}
                </q-th>
              </template>
              <template #header-cell-prenotatoda="props">
                <q-th :props="props">
                  <q-icon name="supervisor_account" size="2em"></q-icon>
                  {{ props.col.label }}
                </q-th>
              </template>
              <template #header-cell-email="props">
                <q-th :props="props">
                  <q-icon name="email" size="2em"></q-icon>
                  {{ props.col.label }}
                </q-th>
              </template>
              <template #header-cell-laboratorio="props">
                <q-th :props="props">
                  <q-icon name="biotech" size="2em"></q-icon>
                  {{ props.col.label }}
                </q-th>
              </template>
              <template #header-cell-tipotampone="props">
                <q-th :props="props">
                  <q-icon name="text_fields" size="2em"></q-icon>
                  {{ props.col.label }}
                </q-th>
              </template>
              <template #top>
                <div class="text-h7 text-weight-bold q-pr-xl">Mostra filtri:</div>
                <q-toggle
                            v-model="value2"
                            color="primary"
                            keep-color
                            class ="q-pr-xl"
                        ></q-toggle>
                <q-select
                  v-if="value2 == true"
                  v-model="visibleColumns2"
                  label="Seleziona campi tabella"
                  multiple
                  use-input
                  outlined
                  use-chips
                  color="primary"
                  dense
                  options-dense
                  :display-value="$q.lang.table.columns"
                  emit-value
                  map-options
                  :options="columns2"
                  option-value="name"
                  option-label="name"
                ></q-select>
              </template>
            </q-table>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
    <div class="col-4">
        <vue3-chart-js
          :id="doughnutChart.id"
          ref="chartRef"
          :type="doughnutChart.type"
          :data="doughnutChart.data"
          :options="doughnutChart.options"
        />
      </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, watch } from 'vue';
import { date } from 'quasar';
import { db } from 'boot/firebase';
import Vue3ChartJs from '@j-t-mcc/vue3-chartjs';

export default defineComponent({
  name: 'AslHome',
  components: { Vue3ChartJs },

  data() {
    //dbIstance= db.collection('prenotazioni');
    //var query = dbIstance.where("capital", "==", true);
    //dbIstance.orderBy("state").orderBy("population", "desc");
    const chartRef = ref(null);
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
    return {
      tab: ref('one'),
      visibleColumns: ref(['laboratorio','data','esito']),
      visibleColumns2: ref(['codicefiscale', 'data','prenotatoda', 'email']),
      columns: [
        { name: 'laboratorio', label: 'laboratorio', field: 'laboratorio', sortable: true, align: 'left' },
        { name: 'data', label: 'data', field: 'datatampone', sortable: true, align: 'center', sortable: true, sort: (a, b) => date.extractDate(a, 'DD/MM/YYYY') - date.extractDate(b, 'DD/MM/YYYY'), },
        { name: 'esito', label: 'esito', field: 'esito', sortable: true, align: 'left' },
        {
          name: 'tipotampone',
          label: 'tipo tampone',
          field: 'tipotampone',
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
        },
      ],
      columns2: [
        { name: 'codicefiscale', label: 'codice fiscale', field: 'codicefiscale', sortable: true, align: 'left' },
        { name: 'cognome', label: 'cognome', field: 'cognome', sortable: true, align: 'left' },
        { name: 'nome', label: 'nome', field: 'nome', sortable: true, align: 'left' },
        { name: 'laboratorio', label: 'laboratorio', field: 'laboratorio', sortable: true, align: 'left' },
        { name: 'data', label: 'data', field: 'datatampone', sortable: true, align: 'center', sortable: true, sort: (a, b) => date.extractDate(a, 'DD/MM/YYYY') - date.extractDate(b, 'DD/MM/YYYY'), },
        {
          name: 'tipotampone',
          label: 'tipo tampone',
          field: 'tipotampone',
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
        },
        { name: 'prenotatoda', label: 'prenotato da', field: 'prenotatoda', sortable: true, align: 'center' },
        { name: 'email', label: 'email utente registrato', field: 'email', sortable: true, align: 'left' },
      ],
      value: ref(false),
      value2: ref(false),
      statistici: [],
      risultati: [],
      chartRef,
      doughnutChart,
    };
  },
  created() {
    statistici: ref([]);
    chartRef : ref(null);
    //prende cose da DB
    db.collection('prenotazioni')
      .where('confermato', '==', 1)
      .where('esito', 'in', [true, false])
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = {
            codicefiscale: doc.data().codicefiscale,
            cognome: doc.data().cognome,
            nome: doc.data().nome,
            laboratorio: doc.data().id_laboratorio,
            datatampone: date.formatDate(doc.data().data.toDate(), 'DD/MM/YYYY'),
            esito: doc.data().esito,
            tipotampone: doc.data().tipotampone,
            prenotatoda: doc.data().prenotatoda,
          };
          if(doc.data().esito==true){
              data.esito= 'positivo';
          } else {
              data.esito= 'negativo';
          }
          db.collection('users')
            .where('tipo_utente', '==', 4)
            .where('uid', '==', data.laboratorio)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                 data.laboratorio = doc.data().nome;
                });
          });
          this.statistici.push(data);
        });
        watch(
      statistici,
      () => {
        const positivi = statistici.reduce((acc, val) => acc + (val.esito === true ? 1 : 0), 0);
        const negativi = statistici.reduce((acc, val) => acc + (val.esito === false ? 1 : 0), 0);

        doughnutChart.data.datasets = [
          {
            backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
            data: [positivi, negativi],
            hoverOffset: 4,
          },
        ];

        chartRef.value.update(250);
      },
      { deep: true }
    );
      });
      

    //prende cose da DB
    db.collection('prenotazioni')
      .where('confermato', '==', 1)
      .where('esito', '==', true)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = {
            codicefiscale: doc.data().codicefiscale,
            cognome: doc.data().cognome,
            nome: doc.data().nome,
            laboratorio: doc.data().id_laboratorio,
            datatampone: date.formatDate(doc.data().data.toDate(), 'DD/MM/YYYY'),
            esito: doc.data().esito,
            tipotampone: doc.data().tipotampone,
            prenotatoda: doc.data().prenotatoda,
          };
          if(doc.data().esito==true){
              data.esito= 'positivo';
          } else {
              data.esito= 'negativo';
          }
          db.collection('users')
            .where('tipo_utente', '==', 4)
            .where('uid', '==', data.laboratorio)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                 data.laboratorio = doc.data().nome;
                });
            });
          db.collection('users')
            .where('uid', '==', data.prenotatoda)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                 data.email = doc.data().email;
                });
          });
          this.risultati.push(data);
        });
      });
  },
});
</script>


