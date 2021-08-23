<template>
  <q-page class="q-pa-md">
    <p class="text-center text-h5"><q-icon name="admin_panel_settings" size="lg" /> Amministratore</p>

    <div class="q-py-md">
      <q-table
        title="Richieste Medici"
        :rows="richiesteMed"
        :columns="colMedici"
        :pagination="{ page: 1, rowsPerPage: 0 }"
        row-key="id"
        binary-state-sort
        hide-bottom
        bordered
        flat
      >
        <template #body-cell-action="props">
          <q-td :props="props">
            <q-btn icon="done" flat @click="doApprova('med', props.row, true)" />
            <q-btn icon="close" flat @click="doApprova('med', props.row, false)" />
          </q-td>
        </template>
      </q-table>
    </div>

    <div class="q-py-md">
      <q-table
        title="Richieste Laboratori"
        :rows="richiesteLab"
        :columns="colLab"
        :pagination="{ page: 1, rowsPerPage: 0 }"
        row-key="id"
        binary-state-sort
        hide-bottom
        bordered
        flat
      >
        <template #body-cell-action="props">
          <q-td :props="props">
            <q-btn icon="done" flat @click="doApprova('lab', props.row, true)" />
            <q-btn icon="close" flat @click="doApprova('lab', props.row, false)" />
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { db } from 'boot/firebase';
export default defineComponent({
  name: 'AmministratoreHome',
  setup() {
    const richiesteMed = ref([]);
    const richiesteLab = ref([]);
    const colMedici = [
      { name: 'nome', label: 'Nome', field: 'nome', align: 'left', sortable: true },
      { name: 'cognome', label: 'Cognome', field: 'cognome', align: 'left', sortable: true },
      { name: 'codicemedico', label: 'Codice medico', field: 'codicemedico', align: 'left', sortable: true },
      { name: 'email', label: 'E-Mail', field: 'email', align: 'left', sortable: true },
      { name: 'action', label: 'Action', align: 'left' },
    ];
    const colLab = [
      { name: 'nome', label: 'Nome', field: 'nome', align: 'left', sortable: true },
      { name: 'piva', label: 'Partita Iva', field: 'piva', align: 'left', sortable: true },
      { name: 'citta', label: 'Città', field: 'citta', align: 'left', sortable: true },
      { name: 'provincia', label: 'Prov.', field: 'provincia', align: 'left', sortable: true },
      { name: 'cap', label: 'CAP', field: 'cap', align: 'left', sortable: true },
      { name: 'action', label: 'Action', align: 'left' },
    ];
    db.collection('users')
      .where('tipo_utente', '==', 2)
      .where('approvato', '==', null)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          richiesteMed.value.push(doc.data());
        });
      });
    db.collection('users')
      .where('tipo_utente', '==', 4)
      .where('convenzionato', '==', null)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          richiesteLab.value.push(doc.data());
        });
      });
    const doApprova = async (type, row, value) => {
      if (type == 'lab') {
        await db.collection('users').doc(row.uid).update({ approvato: value });
        const idx = richiesteLab.value.findIndex((el) => el.uid === row.uid);
        if (idx !== -1) {
          richiesteLab.value.splice(idx, 1);
        }
      } else {
        await db.collection('users').doc(row.uid).update({ approvato: value });
        const idx = richiesteMed.value.findIndex((el) => el.uid === row.uid);
        if (idx !== -1) {
          richiesteMed.value.splice(idx, 1);
        }
      }
    };
    return {
      colMedici,
      colLab,
      richiesteMed,
      richiesteLab,
      doApprova,
    };
  },
});
</script>
