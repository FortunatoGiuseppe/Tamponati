<template>
  <q-page class="flex flex-center">
      <q-parallax 
        src="../img/bg4.jpg" 
        :height="707"
      >
     <q-card class="my-card" flat bordered>
      <q-card-section vertical>
        <q-card-section class="q-pt-xs">
          <div class="text-overline">chi siamo</div>
          <div class="text-h3 q-mt-sm q-mb-xs">La nostra missione</div>
          <div class="text-h6 text-grey">
            Siamo un gruppo di studenti universitari con l'obiettivo di creare un sito di prenotazione tamponi.
          </div><br>
          <q-separator></q-separator>
          <div class="text-h4 text">
              Il team:
          </div>
        </q-card-section>

        <q-card-section class="row justify-center items-center q-gutter-md">
          <q-card class="my-card q-pa-xs" style="background: #1976d2, ">
            <q-avatar  rounded size="200px">
                <img src="../img/fortunato.jpg">
            </q-avatar>
            <q-card-actions align="center">
                <q-item-label>Fortunato Giuseppe</q-item-label>
            </q-card-actions>
          </q-card>

          <q-card class="my-card q-pa-xs flat">
            <q-avatar rounded size="200px">
                <img src="../img/alemanno.jpg">
            </q-avatar>
            <q-card-actions align="center">
                <q-item-label>Alemanno Giuseppe</q-item-label>
            </q-card-actions>
          </q-card>

          <q-card class="my-card q-pa-xs">
            <q-avatar rounded size="200px">
                <img src="../img/fortunato.jpg">
            </q-avatar>
            <q-card-actions align="center">
                <q-item-label>Di Claudio Sabatina</q-item-label>
            </q-card-actions>
          </q-card>
          
        </q-card-section>
      </q-card-section>
    </q-card>
      </q-parallax> 
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ChiSiamo',
});
</script>