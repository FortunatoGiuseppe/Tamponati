<template>
  <q-page class="flex flex-center">
    <section>
      <cittadino-home v-if="state.tipo && state.tipo == 1" />
      <div v-else-if="state.tipo && state.tipo == 2">
        <h1>Medico</h1>
      </div>
      <div v-else-if="state.tipo && state.tipo == 3">
        <h1>Datore di Lavoro</h1>
      </div>
      <laboratorio-home v-else-if="state.tipo && state.tipo == 4" />
      <div v-else>
        <h1>TAMPONATI</h1>
        <h2>Prenota il tuo tampone presso i laboratori piu vicini a te</h2>
      </div>
    </section>
  </q-page>
</template>

<script>
import { defineComponent, watchEffect } from 'vue';
import { useAuth } from '@vueuse/firebase/useAuth';
import { db, auth } from 'boot/firebase';
import { useState } from 'src/modules/useState.js';
import CittadinoHome from 'src/components/CittadinoHome.vue';
import LaboratorioHome from 'src/components/LaboratorioHome.vue';

export default defineComponent({
  name: 'PageIndex',
  components: { CittadinoHome, LaboratorioHome },
  setup() {
    const { isAuthenticated, user } = useAuth(auth);
    const state = useState();

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
              state.value.tipo = userDB.tipo_utente;
            }
          });
      }
    });

    return { state };
  },
});
</script>
