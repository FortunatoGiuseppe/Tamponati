<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md" style="width: 100%">
      <q-carousel
        v-model="slide"
        animated
        navigation
        infinite
        :autoplay="autoplay"
        arrows
        transition-prev="slide-right"
        transition-next="slide-left"
        @mouseenter="autoplay = false"
        @mouseleave="autoplay = true"
      >
        <q-carousel-slide :name="1" img-src="../img/carousel1.jpg"></q-carousel-slide>
        <q-carousel-slide :name="2" img-src="../img/carousel2.jpg"></q-carousel-slide>
        <q-carousel-slide :name="3" img-src="../img/carousel3.jpg"></q-carousel-slide>
        <q-carousel-slide :name="4" img-src="../img/carousel4.jpg"></q-carousel-slide>
      </q-carousel>
    </div>
    <section class="full-width">
      <cittadino-home v-if="state.tipo_utente && state.tipo_utente == 1" />
      <medico-home v-else-if="state.tipo_utente && state.tipo_utente == 2" />
      <div v-else-if="state.tipo_utente && state.tipo_utente == 3">
        <h1>Datore di Lavoro</h1>
      </div>
      <laboratorio-home v-else-if="state.tipo_utente && state.tipo_utente == 4" />
      <div v-else>
        <h1>TAMPONATI</h1>
        <h2>Prenota il tuo tampone presso i laboratori piu vicini a te</h2>
      </div>
    </section>
  </q-page>
</template>

<script>
import { defineComponent, ref, watchEffect } from 'vue';
import { useAuth } from '@vueuse/firebase/useAuth';
import { db, auth } from 'boot/firebase';
import { useState } from 'src/modules/useState.js';
import CittadinoHome from 'src/components/CittadinoHome.vue';
import LaboratorioHome from 'src/components/LaboratorioHome.vue';
import MedicoHome from 'src/components/MedicoHome.vue';

export default defineComponent({
  name: 'PageIndex',
  components: { CittadinoHome, LaboratorioHome, MedicoHome },
  setup() {
    const { isAuthenticated, user } = useAuth(auth);
    const state = useState();
     const slide = 1;
    const autopaly = true;

    watchEffect(() => {
      if (isAuthenticated.value && user.value && user.value.uid) {
        db.collection('users')
          .doc(user.value.uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              const userDB = doc.data();

              state.value.id = user.value.uid;
              state.value.nome = userDB.nome;
              if (userDB.tipo_utente > 2) {
                state.value.nomecompleto = userDB.nome;
              } else {
                state.value.nomecompleto = userDB.nome + ' ' + userDB.cognome;
                state.value.cognome = userDB.cognome;
                state.value.cf = userDB.codicefiscale;
              }
              state.value.tipo_utente = userDB.tipo_utente;
            }
          });
      }
    });

    return { state,  slide: ref(1), autoplay: ref(true)  };
  },
});
</script>
