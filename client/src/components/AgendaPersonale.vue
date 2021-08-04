<template>
<q-dialog ref="dialogRef" 
v-model="dialog"
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
@hide="onDialogHide"
>
      <q-card class="bg-primary text-white">
        <q-bar>
          <q-space></q-space>

          <q-btn dense flat icon="minimize"  :disable="!maximizedToggle" @click="maximizedToggle = false">
            <q-tooltip v-if="maximizedToggle" class="bg-white text-primary">Minimize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="crop_square"  :disable="maximizedToggle" @click="maximizedToggle = true">
            <q-tooltip v-if="!maximizedToggle" class="bg-white text-primary">Maximize</q-tooltip>
          </q-btn>
          <q-btn v-close-popup  dense flat icon="close">
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
                        title="Prenotazioni:"
                        :rows="prenotazioni"
                        :columns="colonne1"
                        :pagination="{ page: 1, rowsPerPage: 0 }"
                        row-key="id"
                        :visible-columns="visibleColumns1"
                    >
                    <template #top>
                    <div class="text-h7 text-weight-bold q-pr-xl">Campi da visualizzare:</div>
                    <q-select
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
                        title="Tamponi Eseguiti:"
                        :rows="tamponiEseguiti"
                        :columns="colonne2"
                        :pagination="{ page: 1, rowsPerPage: 0 }"
                        row-key="id"
                        :visible-columns="visibleColumns2"
                    > 
                        <template #top>
                        <div class="text-h7 text-weight-bold q-pr-xl">Campi da visualizzare:</div>
                         <q-select
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
                        style="min-width: 150px;"
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
        const { dialogRef, onDialogOK, onDialogHide } = useDialogPluginComponent();
        const state = useState();
        const prenotazioni = ref([]);
        const tamponiEseguiti = ref([]);

        const colonne1 = [
            { name: 'data', label: 'Data', field: 'data', align: 'left', sortable: true, sort: (a, b) => date.extractDate(a, 'DD/MM/YYYY') - date.extractDate(b, 'DD/MM/YYYY'), },
            { name: 'codicefiscale', label: 'codice fiscale', field: 'codicefiscale', sortable: true, align: 'left' },
            { name: 'cognome', label: 'cognome', field: 'cognome', sortable: true, align: 'left' },
            { name: 'nome', label: 'nome', field: 'nome', sortable: true, align: 'left' },
            { name: 'laboratorio', label: 'laboratorio', field: 'laboratorio', sortable: true, align: 'left' },
            { name: 'tipotampone', label: 'tipo tampone', field: 'tipotampone', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),},
        ];

        const colonne2 = [
            { name: 'data', label: 'Data', field: 'data', align: 'left', sortable: true, sort: (a, b) => date.extractDate(a, 'DD/MM/YYYY') - date.extractDate(b, 'DD/MM/YYYY'), },
            { name: 'codicefiscale', label: 'codice fiscale', field: 'codicefiscale', sortable: true, align: 'left' },
            { name: 'cognome', label: 'cognome', field: 'cognome', sortable: true, align: 'left' },
            { name: 'nome', label: 'nome', field: 'nome', sortable: true, align: 'left' },
            { name: 'laboratorio', label: 'laboratorio', field: 'laboratorio', sortable: true, align: 'left' },
            { name: 'esito', label: 'esito', field: 'esito', sortable: true, align: 'left' },
            { name: 'tipotampone', label: 'tipo tampone', field: 'tipotampone', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),},
        ];

        db.collection('prenotazioni')
        .where('prenotatoda', '==', state.value.id)
        .where('confermato', 'in', [0] )
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
            prenotazioni.value.push({
                id: doc.id,
                data: date.formatDate(doc.data().data.toDate(), 'DD/MM/YYYY'),
                codicefiscale: doc.data().codicefiscale,
                nome: doc.data().nome,
                cognome: doc.data().cognome,
                tipotampone: doc.data().tipotampone,
                laboratorio: doc.data().id_laboratorio,
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
                const data = {
                    codicefiscale: doc.data().codicefiscale,
                    cognome: doc.data().cognome,
                    nome: doc.data().nome,
                    laboratorio: doc.data().id_laboratorio,
                    data:  date.formatDate(doc.data().data.toDate(), 'DD/MM/YYYY'),
                    esito: doc.data().esito,
                    tipotampone: doc.data().tipotampone,
                    prenotatoda: doc.data().prenotatoda,
                };
                if(doc.data().esito==true){
                    data.esito= 'positivo';
                } else {
                    data.esito= 'negativo';
                }
                tamponiEseguiti.value.push(data);
            });
        });

        return {
            visibleColumns1: ref(['codicefiscale', 'data', 'laboratorio']),
            visibleColumns2: ref(['codicefiscale', 'data', 'esito']),
            dialog: ref(false),
            maximizedToggle: ref(true),
            colonne1,
            colonne2,
            prenotazioni,
            tamponiEseguiti,
            dialogRef,
            onDialogOK,
            onDialogHide,
        }
    },
})
</script>
