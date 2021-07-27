<template>
  <q-page class="q-pa-md">
    <div class="text-center" style="font-size: 1.2rem">
      <q-icon name="local_hospital" size="md" /><br/>ASL
    </div>
    <q-separator />
    <q-card class="my-card">
      <q-card-section class="bg-primary text-white">
        <div class="text-h6 text-center">Visualizzazione:</div>
      </q-card-section>
     <q-tabs v-model="tab" class="bg-primary text-white no-caps" > 
        <q-tab label="dati statistici" name="one" style="width:50%" icon="analytics"></q-tab>
        <q-tab label="esito dei tamponi" name="two" style="width:50%" icon="view_list"></q-tab>
      </q-tabs>

      <q-separator></q-separator>

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="one">
         <div class="q-pa-md">
            <q-table
            title="Treats"
            :rows="rows"
            :columns="columns"
            row-key="name"
            :visible-columns="visibleColumns"
            >
            <template #top>

                <q-space></q-space>

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
         
        </q-tab-panel>
      </q-tab-panels>
     </q-card>
    <!--<div class="text-center" style="font-size: 1.2rem">
      <q-icon name="local_hospital" size="md" /><br/>ASL
    </div>
    <q-separator />


    <h4>Dati statistici dei tamponi:dati relativi ai tamponi</h4>
    <h4>dati degli utenti risultati positivi.</h4>--><!--analytics   view_list  local_hospital-->
    
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { db } from 'boot/firebase';
import { useState } from 'src/modules/useState.js';

export default defineComponent({
  name: 'ASL',
  data() {
    return {
        tab: ref('one'),
        visibleColumns: ref([ 'numero tampone', 'laboratorio', 'data', 'esito' ]),
        columns : [
        {
            name: 'numero tampone',
            required: true,
            label: 'numero tampone',
            align: 'left',
            field: 'name',
            sortable: true
        },
        { name: 'nome', align: 'center', label: 'nome', field: 'nome', sortable: true },
        { name: 'cognome', label: 'cognome', field: 'cognome', sortable: true },
        { name: 'laboratorio', label: 'laboratorio', field: 'laboratorio' },
        { name: 'data', label: 'data', field: 'data' },
        { name: 'esito', label: 'esito', field: 'esito', sortable: true },
        { name: 'iron', label: 'Iron', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
        ],

        rows : [],
    };
  },
  created() {
    //prende cose da DB
   }
});
</script>


