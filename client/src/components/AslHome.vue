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
        <q-tab label="esito dei tamponi" name="two" style="width: 50%" icon="view_list"></q-tab>
      </q-tabs>

      <q-separator></q-separator>

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="one">
          <div class="q-pa-md">
            <q-table
              id="tabellaStatistici"
              title="Esiti tamponi:"
              table-header-class="bg-blue-12 text-white"
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
                  <q-icon name="text_fields" size="2em"></q-icon>
                  {{ props.col.label }}
                </q-th>
              </template>

              <template #top>
                <div class="text-h7 text-weight-bold q-pr-xl">Campi da visualizzare:</div>
                <q-select
                  v-model="visibleColumns"
                  multiple
                  outlined
                  dense
                  options-dense
                  :display-value="$q.lang.table.columns"
                  emit-value
                  map-options
                  :options="columns"
                  option-value="name"
                  options-cover
                  style="min-width: 150px"
                ></q-select>
              </template>
            </q-table>
          </div>
        </q-tab-panel>

        <q-tab-panel name="two">
          <div class="q-pa-md">
            <q-table
              id="tabellaStatistici"
              title="Esiti tamponi:"
              table-header-class="bg-blue-12 text-white"
              :rows="risultati"
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
                  <q-icon name="text_fields" size="2em"></q-icon>
                  {{ props.col.label }}
                </q-th>
              </template>
              <template #top>
                <div class="text-h7 text-weight-bold q-pr-xl">Campi da visualizzare:</div>

                <q-select
                  v-model="visibleColumns"
                  multiple
                  outlined
                  dense
                  options-dense
                  :display-value="$q.lang.table.columns"
                  emit-value
                  map-options
                  :options="columns"
                  option-value="name"
                  options-cover
                  style="min-width: 150px"
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
      visibleColumns: ref(['codicefiscale', 'data', 'esito']),
      columns: [
        { name: 'codicefiscale', label: 'codice fiscale', field: 'codicefiscale', sortable: true, align: 'left' },
        { name: 'cognome', label: 'cognome', field: 'cognome', sortable: true, align: 'left' },
        { name: 'nome', label: 'nome', field: 'nome', sortable: true, align: 'left' },
        { name: 'laboratorio', label: 'laboratorio', field: 'laboratorio', sortable: true, align: 'left' },
        { name: 'data', label: 'data', field: 'datatampone', sortable: true, align: 'center' },
        { name: 'esito', label: 'esito', field: 'esito', sortable: true, align: 'left' },
        {
          name: 'tipotampone',
          label: 'tipo tampone',
          field: 'tipotampone',
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
        },
        { name: 'prenotatoda', label: 'prenotato da', field: 'prenotatoda', sortable: true, align: 'center' },
      ],

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
            datatampone: doc.data().data,
            esito: doc.data().esito,
            tipotampone: doc.data().tipotampone,
            prenotatoda: doc.data().prenotatoda,
          };
          if(doc.data().esito==true){
              data.esito= 'positivo';
          } else {
              data.esito= 'negativo';
          }
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
            datatampone: doc.data().data,
            esito: doc.data().esito,
            tipotampone: doc.data().tipotampone,
            prenotatoda: doc.data().prenotatoda,
          };
          if(doc.data().esito==true){
              data.esito= 'positivo';
          } else {
              data.esito= 'negativo';
          }
          this.risultati.push(data);
        });
      });
  },
});
</script>


