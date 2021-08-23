<template>
  <div>
    <p class="text-center text-h5"><q-icon name="biotech" size="lg" /> Medico</p>
    <template v-if="state.approvato == null"
      ><p class="text-center text-h4">Non si è stati ancora aggiunti alla lista dei medici approvati.</p></template
    >
    <template v-if="state.approvato == false"><p class="text-center text-h4">Approvazione non concessa.</p></template>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useState } from 'src/modules/useState.js';

export default defineComponent({
  name: 'NonApprovatoMedico',
  setup() {
    const state = useState();

    return { state };
  },
});
</script>
