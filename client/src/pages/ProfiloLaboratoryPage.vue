<template>
  <q-page class="q-pa-md">
    <div class="text-center" style="font-size: 1.2rem"><q-icon name="biotech" size="md" /><br />Laboratorio</div>
    <q-separator />

    <register-laboratorio :dati="dati" class="q-mt-md" />
  </q-page>
</template>

<script>
import RegisterLaboratorio from 'src/components/RegisterLaboratorio.vue';
import { defineComponent, ref } from 'vue';
import { db } from 'boot/firebase';
import { useState } from 'src/modules/useState.js';

export default defineComponent({
  name: 'RegisterPage',
  components: { RegisterLaboratorio },
  setup() {
    const dati = ref({});
    const state = useState();

    db.collection('users')
      .doc(state.value.id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          dati.value = doc.data();
        }
      });

    return { dati };
  },
});
</script>
