<template>
  <div>
    <h1>Datore di Lavoro</h1>
    <!-- <q-page-sticky position="bottom-right" :offset="[24, 24]">-->
    <div class="row justify-evenly">
      <div class="col-4">
        <q-btn
          class="full-width"
          rounded
          size="19px"
          icon="add"
          label="Prenotazione"
          color="primary"
          @click="openPrenota"
        />
      </div>
      <div class="col-4">
        <q-btn
          class="full-width"
          rounded
          size="19px"
          icon="book"
          label="Agenda personale"
          color="primary"
          @click="openAgenda"
        />
      </div>
    </div>
    <!-- </q-page-sticky> -->
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useQuasar } from 'quasar';
import PrenotaTampone from 'src/components/PrenotaTampone.vue';
import AgendaPersonale from 'src/components/AgendaPersonale.vue';

export default defineComponent({
  name: 'DatoreHome',
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

    return { openPrenota, openAgenda };
  },
});
</script>
