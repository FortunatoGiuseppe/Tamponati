<template>
  <div>
    <h1>Cittadino</h1>
      <q-btn fab icon="add" label="Nuova Prenotazione" color="primary" @click="openPrenota" />
      <q-btn fab icon="add" label="Agenda personale" color="primary" @click="openAgenda" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useQuasar } from 'quasar';
import PrenotaTampone from 'src/components/PrenotaTampone.vue';
import AgendaPersonale from 'src/components/AgendaPersonale.vue';
export default defineComponent({
  name: 'CittadinoHome',
  setup() {
    const $q = useQuasar();
    const openPrenota = () => {
      $q.dialog({
        component: PrenotaTampone,
      }).onOk(async (val) => {});
    };
    const openAgenda = () => {
      $q.dialog({
        component: AgendaPersonale,
      }).onOk(async (val) => {});
    };

    return { openPrenota,openAgenda};
  },
});
</script>
