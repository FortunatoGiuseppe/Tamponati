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
        <div class="text-h4">Questionari anamnesi</div>
      </q-card-section>
              <q-card-section class="q-pt-none">
        <div class="col">
          <div class="q-pa-sd">
            <q-table
              id="tabellaAgenda"
              :hide-header="mode === 'grid'"
              title="Prenotazioni:"
              :rows="prenotazioni"
              :columns="colonne"  
              :rows-per-page-options="[0]"
              row-key="id"
              :grid="mode == 'grid'"
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
              <template #header-cell-malato="props">
                <q-th :props="props">
                  <q-icon name="sick" size="2em"></q-icon>
                  {{ props.col.label }}
                </q-th>
              </template>
              <template #header-cell-febbre="props">
                <q-th :props="props">
                  <q-icon name="thermostat" size="2em"></q-icon>
                  {{ props.col.label }}
                </q-th>
              </template>
              <template #top>
                <q-btn
                  class="absolute-right q-mr-sm"
                  flat
                  round
                  dense
                  :icon="mode === 'grid' ? 'list' : 'grid_on'"
                  @click="mode = mode === 'grid' ? 'list' : 'grid'"
                >
                  <q-tooltip v-close-popup :disable="$q.platform.is.mobile" >{{mode === "grid" ? "List" : "Grid"}}</q-tooltip>
                </q-btn>
                <div class="text-h7 text-weight-bold">Mostra filtri:</div>
                <q-toggle v-model="value" color="primary" keep-color class="q-pr-xl"></q-toggle>
                <q-select
                  v-if="value == true"
                  v-model="visibleColumns"
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
                  :options="colonne"
                  option-value="name"
                  options-cover
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
  name: 'VisualizzaQuestionari',
  emits: [...useDialogPluginComponent.emits],
  setup() {
      const { dialogRef, onDialogOK, onDialogHide } = useDialogPluginComponent();
      const state = useState();
      const prenotazioni = ref([]);
      const colonne = [
      {
        name: 'data',
        label: 'Data',
        field: 'data',
        align: 'left',
        sortable: true,
        sort: (a, b) => date.extractDate(a, 'DD/MM/YYYY') - date.extractDate(b, 'DD/MM/YYYY'),
      },
      { name: 'codicefiscale', label: 'codice fiscale', field: 'codicefiscale', sortable: true, align: 'left' },
      { name: 'cognome', label: 'cognome', field: 'cognome', sortable: true, align: 'left' },
      { name: 'nome', label: 'nome', field: 'nome', sortable: true, align: 'left' },
      //questionario
      { name: 'malato', label: 'è malato?', field: 'malato', sortable: true, align: 'left' },
      { name: 'febbre', label: 'ha febbre?', field: 'febbre', sortable: true, align: 'left' },
      { name: 'allergie', label: 'possiede allergie?', field: 'allergie', sortable: true, align: 'left' },
      { name: 'specificaAllergie', label: 'specifica delle allergie', field: 'specificaAllergie', sortable: true, align: 'left' },
      { name: 'malattieGravi', label: 'soffre di malattie gravi?', field: 'malattieGravi', sortable: true, align: 'left' },
      { name: 'compromissioniSistema', label: 'presenta compromissioni del sistema immunitario?', field: 'compromissioniSistema', sortable: true, align: 'left' },
    ];
     db.collection('prenotazioni')
      .where('id_laboratorio', '==', state.value.id)
      .where('confermato', '==', 1)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = {
            id: doc.id,
            data: date.formatDate(doc.data().data.toDate(), 'DD/MM/YYYY'),
            codicefiscale: doc.data().codicefiscale,
            nome: doc.data().nome,
            cognome: doc.data().cognome,
            tipotampone: doc.data().tipotampone,
            //Questionario
              malato:  doc.data().malato,
              febbre:  doc.data().febbre,
              allergie: doc.data().allergie,
              specificaAllergie:  doc.data().specificaAllergie,
              malattieGravi:  doc.data().malattieGravi,
              compromissioniSistema:  doc.data().compromissioniSistema,
              assunzioneFarmaci:   doc.data().assunzioneFarmaci,
          };
          if (doc.data().malato == true) {
            data.malato = 'si';
          } else if(doc.data().malato == false){
            data.malato = 'no';
          } else  {
            data.malato = 'non lo so';
          }
          if (doc.data().febbre == true) {
            data.febbre = 'si';
          } else if(doc.data().febbre == false){
            data.febbre = 'no';
          } else  {
            data.febbre = 'non lo so';
          }
          if (doc.data().allergie == true) {
            data.allergie = 'si';
          } else if(doc.data().allergie == false){
            data.allergie = 'no';
          } else  {
            data.allergie = 'non lo so';
          }
          if (doc.data().malattieGravi == true) {
            data.malattieGravi = 'si';
          } else if(doc.data().allergie == false){
            data.malattieGravi = 'no';
          } else  {
            data.malattieGravi = 'non lo so';
          }
          if (doc.data().compromissioniSistema == true) {
            data.compromissioniSistema = 'si';
          } else if(doc.data().allergie == false){
            data.compromissioniSistema = 'no';
          } else  {
            data.compromissioniSistema = 'non lo so';
          }
          if (doc.data().assunzioneFarmaci == true) {
            data.assunzioneFarmaci = 'si';
          } else if(doc.data().allergie == false){
            data.assunzioneFarmaci = 'no';
          } else  {
            data.assunzioneFarmaci = 'non lo so';
          }
          prenotazioni.value.push(data);
        });
      });

   return {
      dialog: ref(false),
      maximizedToggle: ref(true),
      dialogRef,
      onDialogOK,
      onDialogHide,
      visibleColumns: ref(['codicefiscale', 'data','malato','febbre','allergie','malattieGravi','compromissioniSistema','assunzioneFarmaci']),
      colonne,
      prenotazioni,
      value: ref(false),
      mode: ref('grid'),
    };
  }
});
</script>
