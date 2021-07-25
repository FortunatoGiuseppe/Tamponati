<template>
     <q-card class="my-card text-white" style="background: #1976D2">
      <q-card-section>
        <div class="text-h6"> {{item.nome}}</div>
        <q-img class="card-img-top" :src="`https://placeimg.com/200/200/nature`+item.id" spinner-color="blue"></q-img>
        <div class="text-subtitle2">{{item.descrizione}}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        Prezzo: {{item.prezzo}}<br>
        Disponibilita': {{item.disp}}<br>
        <q-btn href="#" class="primary">Dettagli</q-btn>
      </q-card-section>
    </q-card>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Product-box',
  props: ['item'],
});
</script>