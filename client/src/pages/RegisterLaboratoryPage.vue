<template>
  <q-page class="q-pa-md">
    <q-tabs
      v-model="tab"
      dense
      class="text-grey q-mx-auto q-pa-lg"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
      style="width: 30rem"
    >
      <q-tab name="Laboratorio" icon="biotech" label="Laboratorio" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="laboratorio">
        <register-laboratorio />
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script>
import RegisterLaboratorio from 'src/components/RegisterLaboratorio.vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'RegisterPage',
  components: { RegisterLaboratorio },
  setup() {
    return {
      tab: ref('laboratorio'),
      file: ref(null),
    };
  },
});
</script>
