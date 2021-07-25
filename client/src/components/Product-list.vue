<template>

    <div style="width: 90% text-align: center">
      <h2 style="text-align: center">Elenco laboratori:</h2>
        <div class="divFiltri">
            <button class="bottoneFiltro" v-on:click="product = product.filter(el => el.id>2)">filtro 1</button>
        </div>
      <div class="divLabs">
            <productBox v-for="product in products" v-bind:item="product" :key="product.id"></productBox>
      </div>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import productBox from 'src/components/Product-box.vue';

export default defineComponent({
  name: 'Product-list',
  components: { productBox },
    data(){
        return {
            products: [
                {
                    id:1,
                    nome: "laboratorio bello",
                    descrizione: "ciao",
                    prezzo: 100,
                    disp: 100,
                },
                {
                    id:2,
                    nome: "laboratorio brutto",
                    descrizione: "ciao ciao ciao",
                    prezzo: 80,
                    disp: 50,
                },
                {
                    id:3,
                    nome: "laboratorio ok",
                    descrizione: "ciao ciao",
                    prezzo: 20,
                    disp: 50,
                },
                
            ]
        };
    },
    methods: {
        prezzoBasso: function (product) {
            return product.filter(function(product) {
                return product.prezzo<=50;
            })
        }
    },
});  
</script>