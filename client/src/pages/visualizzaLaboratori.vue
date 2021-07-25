<template>
  <q-page class="flex flex-center">
    <section style="width:100%">
      <h2 style=" text-align: center"> Laboratori</h2>
    <div> 
        <productList></productList>
    </div>
    </section>
  </q-page>
</template>
<script>
import { defineComponent } from 'vue';
import productList from 'src/components/Product-list.vue';

export default defineComponent({
  name: 'visualizzaLaboratori',
  components: { productList },
});
</script>

