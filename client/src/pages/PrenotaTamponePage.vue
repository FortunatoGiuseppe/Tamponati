<template>
  <q-form @submit.prevent="doRegister">
    <q-stepper v-model="step" vertical color="primary" animated class="q-mx-auto q-pa-lg" style="width: 50rem">
      <q-step :name="1" title="Seleziona Tampone" :done="step > 1">
        <q-select outlined v-model="register.tampone" :options="options" label="Seleziona tampone" />
        <q-stepper-navigation>
          <q-btn @click="step = 2" color="primary" label="Continua" />
        </q-stepper-navigation>
      </q-step>

      <q-step :name="2" title="Dati personali" :done="step > 2">
        <q-input outlined v-model="register.nome" label="Nome" :rules="[(val) => !!val || 'Campo Richiesto']" />
        <q-input outlined v-model="register.cognome" label="Cognome" :rules="[(val) => !!val || 'Campo Richiesto']" />
        <q-input
          outlined
          v-model="register.codicefiscale"
          label="Codice Fiscale"
          :rules="[(val) => !!val || 'Campo Richiesto']"
        />
        <q-stepper-navigation>
          <q-btn @click="step = 2" type="submit" color="primary" label="Registrati" />
          <q-btn flat @click="step = 1" color="primary" label="Indietro" class="q-ml-sm" />
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
  </q-form>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useQuasar } from 'quasar';
import { auth, db } from 'boot/firebase';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'PrenotaTamponePage',
  setup() {
    const router = useRouter();
    const $q = useQuasar();
    const register = ref({});

    const doPrenotazione = async () => {
      try {
        // const userCredential = await auth.createUserWithEmailAndPassword(register.value.email, register.value.password);
        // auth.currentUser.updateProfile({
        //   displayName: register.value.nome + ' ' + register.value.cognome,
        // });

        const userCr = userCredential.user;
        await db.collection('prenotazioni').doc(userCr.uid).set({
          tampone: register.value.tampone,
          nome: register.value.nome,
          cognome: register.value.cognome,
          codicefiscale: register.value.codicefiscale,
        });
        register.value = {};
        router.push('/');
      } catch (error) {
        $q.notify({
          type: 'negative',
          position: 'top',
          message: 'Utente già esistente!',
        });
        console.log(error);
      }
    };

    return {
      step: ref(1),
      doPrenotazione,
      register,
      model: ref(null),
      options: ['Molecolare', 'Antigenico'],
    };
  },
});
</script>
