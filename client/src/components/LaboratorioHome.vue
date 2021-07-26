<template>
  <div>
    <h1>Laboratorio</h1>
    <q-page-sticky position="bottom-right" :offset="[24, 24]">
      <q-btn fab icon="date_range" label="Calendario" to="/calendario" color="primary" />
    </q-page-sticky>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CittadinoHome',
  setup() {},
});
</script>
