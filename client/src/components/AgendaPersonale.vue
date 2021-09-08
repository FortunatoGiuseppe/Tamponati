<template>
  <q-dialog
    ref="dialogRef"
    v-model="dialog"
    :maximized="maximizedToggle"
    transition-show="slide-up"
    transition-hide="slide-down"
    @hide="onDialogHide"
  >
    <q-card class="bg-primary text-white">
      <q-bar>
        <q-space></q-space>

        <q-btn dense flat icon="minimize" :disable="!maximizedToggle" @click="maximizedToggle = false">
          <q-tooltip v-if="maximizedToggle" class="bg-white text-primary">Minimize</q-tooltip>
        </q-btn>
        <q-btn dense flat icon="crop_square" :disable="maximizedToggle" @click="maximizedToggle = true">
          <q-tooltip v-if="!maximizedToggle" class="bg-white text-primary">Maximize</q-tooltip>
        </q-btn>
        <q-btn v-close-popup dense flat icon="close">
          <q-tooltip class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section>
        <div class="text-h4">Agenda personale</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="col">
          <div class="q-pa-sd">
            <div class="text-h6">Prenotazioni attive:</div>
            <q-table
              id="tabellaAgenda"
              title="Prenotazioni:"
              :rows="prenotazioni"
              :columns="colonne1"
              :pagination="{ page: 1, rowsPerPage: 0 }"
              row-key="id"
              :visible-columns="visibleColumns1"
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
                <div class="text-h7 text-weight-bold">Mostra filtri:</div>
                <q-toggle v-model="value" color="primary" keep-color class="q-pr-xl"></q-toggle>
                <q-select
                  v-if="value == true"
                  v-model="visibleColumns1"
                  label="Seleziona campi tabella"
                  multiple
                  outlined
                  dense
                  use-chips
                  color="primary"
                  options-dense
                  :display-value="$q.lang.table.columns"
                  emit-value
                  map-options
                  :options="colonne1"
                  option-value="name"
                  options-cover
                  style="min-width: 150px"
                ></q-select>
              </template>
            </q-table>
          </div>
          <div class="q-pa-sd">
            <div class="text-h6">Esiti tamponi:</div>
            <q-table
              id="tabellaAgenda"
              title="Tamponi Eseguiti:"
              :rows="tamponiEseguiti"
              :columns="colonne2"
              :pagination="{ page: 1, rowsPerPage: 0 }"
              row-key="id"
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
                <div class="text-h7 text-weight-bold">Mostra filtri:</div>
                <q-toggle v-model="value2" color="primary" keep-color class="q-pr-xl"></q-toggle>
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
                  :options="colonne2"
                  option-value="name"
                  option-label="name"
                  style="min-width: 150px"
                ></q-select>
              </template>
            </q-table>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>
import { defineComponent, ref } from 'vue';
import { useDialogPluginComponent, date } from 'quasar';
import { db } from 'boot/firebase';
import { useState } from 'src/modules/useState.js';
export default defineComponent({
  name: 'AgendaPersonale',
  emits: [...useDialogPluginComponent.emits],
  setup() {
    const { dialogRef, onDialogHide } = useDialogPluginComponent();
    const state = useState();
    const prenotazioni = ref([]);
    const laboratori = ref([]);
    const tamponiEseguiti = ref([]);

    const colonne1 = [
      {
        name: 'data',
        label: 'Data',
        field: 'data',
        align: 'left',
        sortable: true,
        sort: (a, b) => date.extractDate(a, 'DD/MM/YYYY') - date.extractDate(b, 'DD/MM/YYYY'),
      },
      { name: 'codicefiscale', label: 'Codice Fiscale', field: 'codicefiscale', sortable: true, align: 'left' },
      { name: 'cognome', label: 'Cognome', field: 'cognome', sortable: true, align: 'left' },
      { name: 'nome', label: 'Nome', field: 'nome', sortable: true, align: 'left' },
      { name: 'laboratorio', label: 'Laboratorio', field: 'laboratorio', sortable: true, align: 'left' },
      {
        name: 'tipotampone',
        label: 'Tipo Tampone',
        field: 'tipotampone',
        align: 'left',
        sortable: true,
        sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
      },
    ];

    const colonne2 = [
      {
        name: 'data',
        label: 'Data',
        field: 'data',
        align: 'left',
        sortable: true,
        sort: (a, b) => date.extractDate(a, 'DD/MM/YYYY') - date.extractDate(b, 'DD/MM/YYYY'),
      },
      { name: 'codicefiscale', label: 'Codice Fiscale', field: 'codicefiscale', sortable: true, align: 'left' },
      { name: 'cognome', label: 'Cognome', field: 'cognome', sortable: true, align: 'left' },
      { name: 'nome', label: 'Nome', field: 'nome', sortable: true, align: 'left' },
      { name: 'laboratorio', label: 'Laboratorio', field: 'laboratorio', sortable: true, align: 'left' },
      {
        name: 'tipotampone',
        label: 'Tipo Tampone',
        field: 'tipotampone',
        sortable: true,
        align: 'left',
        sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
      },
      { name: 'esito', label: 'Esito', field: 'esito', sortable: true, align: 'left' },
    ];

    (async () => {
      const querySnapshot = await db.collection('users').where('tipo_utente', '==', 4).get();
      querySnapshot.forEach((doc) => {
        laboratori.value.push(doc.data());
      });
    })();
    const getLabName = (id) => {
      const lab = laboratori.value.find((el) => el.uid === id);
      return lab.nome;
    };

    db.collection('prenotazioni')
      .where('prenotatoda', '==', state.value.id)
      .where('confermato', '==', 0)
      .get()
      .then((querySnapshot) => {
         querySnapshot.forEach((doc) => {
        prenotazioni.value.push({
          id: doc.id,
          data: date.formatDate(doc.data().data.toDate(), 'DD/MM/YYYY'),
          codicefiscale: doc.data().codicefiscale,
          nome: doc.data().nome,
          cognome: doc.data().cognome,
          laboratorio: getLabName(doc.data().id_laboratorio),
          tipotampone: doc.data().tipotampone,
          });
        });
      });

    db.collection('prenotazioni')
      .where('prenotatoda', '==', state.value.id)
      .where('confermato', '==', 1)
      .where('esito', 'in', [true, false])
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          tamponiEseguiti.value.push({
            id: doc.id,
            data: date.formatDate(doc.data().data.toDate(), 'DD/MM/YYYY'),
            codicefiscale: doc.data().codicefiscale,
            nome: doc.data().nome,
            cognome: doc.data().cognome,
            laboratorio: getLabName(doc.data().id_laboratorio),
            tipotampone: doc.data().tipotampone,
            esito: doc.data().esito == true ? 'Positivo' : 'Negativo',
            prenotatoda: doc.data().prenotatoda,
          });
        });
      });

    return {
      visibleColumns1: ref(['data', 'codicefiscale', 'laboratorio']),
      visibleColumns2: ref(['data', 'codicefiscale', 'laboratorio', 'esito']),
      dialog: ref(false),
      maximizedToggle: ref(true),
      colonne1,
      colonne2,
      prenotazioni,
      tamponiEseguiti,
      dialogRef,
      onDialogHide,
      value: ref(false),
      value2: ref(false),
    };
  },
});
</script>
