<template>
  <div>
    <p class="text-center text-h5"><q-icon name="biotech" size="lg" /> Laboratorio</p>
    <template v-if="state.convenzionato == null"
      ><p class="text-center text-h6">
        Non si è stati ancora aggiunti alla lista dei laboratori convenzionati.
      </p></template
    >
    <template v-if="state.convenzionato == false"><p class="text-center text-h6">Convenzione non concessa</p></template>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useState } from 'src/modules/useState.js';

export default defineComponent({
  name: 'NonConvenzionatoLaboratorio',
  setup() {
    const state = useState();

    return { state };
  },
});
</script>
