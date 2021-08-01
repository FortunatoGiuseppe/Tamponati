<template>
  <div>
    <h1>Cittadino</h1>
    <div class="row justify-evenly">
      <div class="col-4">
        <q-btn class="full-width" rounded size="19px" icon="add" label="Nuova Prenotazione" color="primary" @click="openPrenota" />
      </div>
      <div class="col-4">
        <q-btn class="full-width" rounded size="19px" icon="book" label="Agenda personale" color="primary" @click="openAgenda"/>
      </div>
    </div>
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
