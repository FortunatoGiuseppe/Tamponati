<template>
  <div>
    <h1 style="font-size:calc(40px + 4vw);">Datore di Lavoro</h1>
    <!-- <q-page-sticky position="bottom-right" :offset="[24, 24]">-->
    <div style="width:50%;  float:left; padding:20px; min-width:160px; text-align: center">
      <div class="col-4">
        <q-btn
          class="full-width"
          rounded
          style="font-size:min(20px,calc(10px + 2vw)); min-width:130px; max-width:500px;"
          icon="add"
          label="Prenotazione"
          color="primary"
          @click="openPrenota"
        />
      </div>
      <div style="width:50%; float:left;  padding:20px; min-width:130px; text-align: center">
        <q-btn
          class="full-width"
          rounded
          style="font-size:min(20px,calc(10px + 2vw)); min-width:130px; max-width:500px;"
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
