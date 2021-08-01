<template>
  <q-page class="q-pa-md sfondoHome">
    <q-tabs
      v-model="tab"
      dense
      class="text-primary q-mx-auto q-pa-lg"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
      style="width: 30rem;"
    >
      <q-tab name="cittadino" icon="face" label="Cittadino" />
      <q-tab name="medico" icon="medication" label="Medico" />
      <q-tab name="datorediLavoro" icon="people_alt" label="Datore di lavoro" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" style="background: rgba(0, 0, 0, 0);" animated>
      <q-tab-panel name="cittadino">
        <register-cittadino />
      </q-tab-panel>

      <q-tab-panel name="medico">
        <register-medico />
      </q-tab-panel>

      <q-tab-panel name="datorediLavoro">
        <register-datore />
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script>
import RegisterCittadino from 'src/components/RegisterCittadino.vue';
import RegisterMedico from 'src/components/RegisterMedico.vue';
import RegisterDatore from 'src/components/RegisterDatore.vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'RegisterPage',
  components: { RegisterCittadino, RegisterMedico, RegisterDatore },
  setup() {
    return {
      tab: ref('cittadino'),
      file: ref(null),
    };
  },
});
</script>
