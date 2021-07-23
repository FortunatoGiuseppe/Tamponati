<template>
  <q-page class="flex flex-center">
    <section>
      <h2 class="text-center"> La nostra missione</h2>
      <div class="chiSiamo">
          <h4>Siamo un gruppo di studenti universitari con l'obiettivo di creare un sito di prenotazione tamponi.</h4>      
             <div style="position: center;">
              <div class="riguadroPersona">
                  <img class="chiSiamo" src="../img/fortunato.jpg" alt="Forest">
                <p class="desc">Alemanno Giuseppe</p>
              </div>

              <div class="riguadroPersona"> 
                  <img class="chiSiamo" src="../img/fortunato.jpg" alt="Forest">
                <p class="desc">Di Claudio Sabatina</p>
              </div>

              <div class="riguadroPersona">
                  <img  class="chiSiamo" src="../img/fortunato.jpg" alt="Forest">
                <p class="desc">Fortunato Giuseppe</p>
              </div>
             </div> 
      </div>
    </section>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'chiSiamo',
});
</script>