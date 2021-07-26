<template>
  <q-page class="q-pa-md">
    <div class="text-center" style="font-size: 1.2rem">
      <q-icon name="admin_panel_settings" size="md" /><br />Amministratore
    </div>
    <q-separator />
    <!-- <div class="q-pa-md">
      <div class="q-gutter-xs">
        <q-chip
          removable
          v-model="medici"
          @remove="faQualcosa()"
          color="primary"
          text-color="white"
          icon="medical_services"
        >
          Medici
        </q-chip>
        <q-chip removable v-model="laboratori" @remove="faQualcosa()" color="teal" text-color="white" icon="biotech">
          Laboratori
        </q-chip>
      </div>
      <q-btn color="primary" label="Reset" @click="onResetClick()" class="q-mt-sm"></q-btn>
    </div> -->

    <h4>Richieste Medici:</h4>
    <q-list class="rounded-borders relative-position" bordered separator>
      <q-item class="text-weight-medium">
        <q-item-section>
          <q-item-label>Nome richiedente</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>Codice medico</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>Email</q-item-label>
        </q-item-section>
        <q-item-section class="col-2 text-black" side>
          <q-item-label>Action</q-item-label>
        </q-item-section>
      </q-item>
      <transition-group name="scale" move-class="move-transition">
        <div v-for="richiesta in richiesteMed" :key="richiesta.id">
          <q-item v-ripple clickable>
            <q-item-section>
              <q-item-label>{{ richiesta.nome }} {{ richiesta.cognome }}</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ richiesta.codicemedico }}</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ richiesta.email }}</q-item-label>
            </q-item-section>
            <q-item-section class="col-2 text-black" side>
              <q-item-label
                ><q-btn icon="done" flat @click="approvaRichiesta(richiesta)" />
                <q-btn icon="close" flat @click="disapprovaRichiesta(richiesta)" />
              </q-item-label>
            </q-item-section>
          </q-item>
        </div>
      </transition-group>
    </q-list>

    <q-separator />
    <h4>Richieste Laboratori:</h4>
    <q-list class="rounded-borders relative-position" bordered separator>
      <q-item class="text-weight-medium">
        <q-item-section>
          <q-item-label>richiedente</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>Partita Iva</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>Citta'</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>CAP</q-item-label>
        </q-item-section>
        <q-item-section class="col-2 text-black" side>
          <q-item-label>Action</q-item-label>
        </q-item-section>
      </q-item>
      <transition-group name="scale" move-class="move-transition">
        <div v-for="richiesta in richiesteLab" :key="richiesta.id">
          <q-item v-ripple clickable>
            <q-item-section>
              <q-item-label>{{ richiesta.nome }}</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ richiesta.piva }}</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ richiesta.citta }}</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ richiesta.cap }}</q-item-label>
            </q-item-section>
            <q-item-section class="col-2 text-black" side>
              <q-item-label>
                <q-btn icon="done" flat @click="approvaRichiesta(richiesta)" />
                <q-btn icon="close" flat @click="disapprovaRichiesta(richiesta)" />
              </q-item-label>
            </q-item-section>
          </q-item>
        </div>
      </transition-group>
    </q-list>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { db } from 'boot/firebase';
import { useState } from 'src/modules/useState.js';

export default defineComponent({
  name: 'AmministratorePage',
  setup() {
    const medici = ref(true);
    const laboratori = ref(true);
  },
  data() {
    return {
      medici: ref(true),
      laboratori: ref(true),
      richiesteMed: [],
      richiesteLab: [],
    };
  },
  created() {
    db.collection('users')
      .where('tipo_utente', '==', 2)
      .where('approvato', '==', false)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = {
            id: doc.id,
            tipo_utente: doc.data().tipo_utente,
            nome: doc.data().nome,
            cognome: doc.data().cognome,
            codicemedico: doc.data().codicemedico,
            email: doc.data().email,
            approvato: doc.data().approvato,
          };
          this.richiesteMed.push(data);
        });
      });
    db.collection('users')
      .where('tipo_utente', '==', 4)
      .where('approvato', '==', false)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = {
            id: doc.id,
            tipo_utente: doc.data().tipo_utente,
            nome: doc.data().nome,
            piva: doc.data().piva,
            citta: doc.data().citta,
            cap: doc.data().cap,
            approvato: doc.data().approvato,
          };
          this.richiesteLab.push(data);
        });
      });
  },
});
</script>


