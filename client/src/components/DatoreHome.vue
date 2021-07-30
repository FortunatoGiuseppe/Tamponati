<template>
  <div>
    <h1>Datore di Lavoro</h1>
    <q-page-sticky position="bottom-right" :offset="[24, 24]">
      <q-btn fab icon="add" label="Nuova Prenotazione" color="primary" @click="openPrenota" />
    </q-page-sticky>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useQuasar } from 'quasar';
import PrenotaTampone from 'src/components/PrenotaTampone.vue';

export default defineComponent({
  name: 'DatoreHome',
  setup() {
    const $q = useQuasar();
    const openPrenota = () => {
      $q.dialog({
        component: PrenotaTampone,
      }).onOk(async (val) => {});
    };

    return { openPrenota };
  },
});
</script>
