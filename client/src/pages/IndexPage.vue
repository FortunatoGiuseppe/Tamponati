<template>
  <q-page class="flex" style="padding: 0px">
    <section class="full-width sfondoHome">
      <component :is="currentPage" class="text-white sfondoHomeComponents"></component>
    </section>
  </q-page>
</template>

<script>
import { computed, defineComponent, watchEffect } from 'vue';
import { useAuth } from '@vueuse/firebase/useAuth';
import { db, auth } from 'boot/firebase';
import { useState } from 'src/modules/useState.js';
import NoLoginHome from 'src/components/NoLoginHome.vue';
import CittadinoHome from 'src/components/CittadinoHome.vue';
import LaboratorioHome from 'src/components/LaboratorioHome.vue';
import MedicoHome from 'src/components/MedicoHome.vue';
import DatoreHome from 'src/components/DatoreHome.vue';
import AmministratoreHome from 'src/components/AmministratoreHome.vue';
import AslHome from 'src/components/AslHome.vue';

export default defineComponent({
  name: 'PageIndex',
  components: { NoLoginHome, CittadinoHome, MedicoHome, DatoreHome, LaboratorioHome, AmministratoreHome, AslHome },
  setup() {
    const { isAuthenticated, user } = useAuth(auth);
    const state = useState();
    const currentPage = computed(() => {
      if (state.value.tipo_utente) {
        switch (state.value.tipo_utente) {
          case 1:
            return CittadinoHome;
          case 2:
            return MedicoHome;
          case 3:
            return DatoreHome;
          case 4:
            return LaboratorioHome;
          case 5:
            return AmministratoreHome;
          case 6:
            return AslHome;
        }
      }
      return NoLoginHome;
    });
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
    return { currentPage };
  },
});
</script>
