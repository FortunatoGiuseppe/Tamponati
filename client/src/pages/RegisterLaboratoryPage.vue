<template>
  <q-page class="q-pa-md">
    <div class="text-center" style="font-size: 1.2rem"><q-icon name="biotech" size="md" /><br />Laboratorio</div>
    <q-separator />

    <register-laboratorio class="q-mt-md" />
  </q-page>
</template>

<script>
import RegisterLaboratorio from 'src/components/RegisterLaboratorio.vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'RegisterPage',
  components: { RegisterLaboratorio },
});
</script>
