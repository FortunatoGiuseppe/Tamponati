<template>
  <q-page class="flex" style="padding:0px;">
    <section class="full-width sfondoHome">
      <cittadino-home v-if="state.tipo_utente && state.tipo_utente == 1"           class="text-white sfondoHomeComponents"/>
      <medico-home v-else-if="state.tipo_utente && state.tipo_utente == 2"         class="text-white sfondoHomeComponents"/>
      <datore-home v-else-if="state.tipo_utente && state.tipo_utente == 3"         class="text-white sfondoHomeComponents"/>
      <laboratorio-home v-else-if="state.tipo_utente && state.tipo_utente == 4"    class="text-white sfondoHomeComponents"/>
      <amministratore-home v-else-if="state.tipo_utente && state.tipo_utente == 5" class="bg-white"/>
      <asl-home v-else-if="state.tipo_utente && state.tipo_utente == 6"            class="text-white sfondoHomeComponents"/>

      <div v-else>  
    
        <div class="full-width text-white absolute-center"  style="background: rgb(0 0 0 / 78%); padding:20px">
        <h1 class="home">TAMPONATI</h1>
        <h3 class="home">Prenota il tuo tampone presso i laboratori piu vicini a te</h3>
        </div>
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
import DatoreHome from 'src/components/MedicoHome.vue';
import AmministratoreHome from 'src/components/AmministratoreHome.vue';
import AslHome from 'src/components/AslHome.vue';

export default defineComponent({
  name: 'PageIndex',
  components: { CittadinoHome, LaboratorioHome, MedicoHome, AmministratoreHome, AslHome, DatoreHome },
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

    return { state, slide: ref(1), autoplay: ref(true) };
  },
});
</script>
