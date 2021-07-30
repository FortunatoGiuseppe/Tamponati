<template>
  <q-page class="flex flex-center sfondoChiSiamo">
      <q-card class="my-card absolute-center chiSiamo" flat bordered style="background: rgb(0 0 0 / 78%)">
        <q-card-section vertical>
          <q-card-section class="q-pt-xs">
            <div class="text-overline text-white">chi siamo</div>
            <div class="text-h3 text-white q-mt-sm q-mb-xs">La nostra missione</div>
            <div class="text-h6 text-grey">
              Siamo un gruppo di studenti universitari con l'obiettivo di creare un sito di prenotazione tamponi.
            </div>
            <br />
            <q-separator></q-separator>
            <div class="text-h4 text-white">Il team:</div>
          </q-card-section>

          <q-card-section class="row justify-center items-center q-gutter-md">
            <q-card class="my-card q-pa-xs" style="background: #1976d2">
              <q-avatar rounded size="200px">
                <img src="../img/fortunato.jpg" />
              </q-avatar>
              <q-card-actions align="center">
                <q-item-label class="text-black">Fortunato Giuseppe</q-item-label>
              </q-card-actions>
            </q-card>

            <q-card class="my-card q-pa-xs flat">
              <q-avatar rounded size="200px">
                <img src="../img/alemanno.jpg" />
              </q-avatar>
              <q-card-actions align="center">
                <q-item-label class="text-black">Alemanno Giuseppe</q-item-label>
              </q-card-actions>
            </q-card>

            <q-card class="my-card q-pa-xs">
              <q-avatar rounded size="200px">
                <img src="../img/diclaudio.jpeg" />
              </q-avatar>
              <q-card-actions align="center">
                <q-item-label class="text-black">Di Claudio Sabatina</q-item-label>
              </q-card-actions>
            </q-card>
          </q-card-section>
        </q-card-section>
      </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ChiSiamo',
});
</script>
