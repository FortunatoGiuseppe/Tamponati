<template>
  <q-form @submit.prevent="doRegister">
    <q-stepper v-model="step" vertical color="primary" animated class="q-mx-auto q-pa-lg" style="width: 30rem">
      <q-step :name="1" title="Chi sono" :done="step > 1">
        <q-input
          outlined
          v-model="register.nomeLaboratorio"
          label="Nome Laboratorio"
          :rules="[(val) => !!val || 'Campo Richiesto']"
        />
        <q-input
          outlined
          v-model="register.indirizzo"
          label="Indirizzo, numero"
          :rules="[(val) => !!val || 'Campo Richiesto']"
        />
        <q-input outlined v-model="register.piva" label="Partita IVA" :rules="[(val) => !!val || 'Campo Richiesto']" />
        <q-input
          outlined
          v-model="register.provincia"
          label="Provincia"
          :rules="[(val) => !!val || 'Campo Richiesto']"
        />
        <q-input outlined v-model="register.citta" label="Comune" :rules="[(val) => !!val || 'Campo Richiesto']" />
        <q-input outlined v-model="register.cap" label="CAP" :rules="[(val) => !!val || 'Campo Richiesto']" />
        <q-stepper-navigation>
          <q-btn @click="step = 2" color="primary" label="Continua" />
        </q-stepper-navigation>
      </q-step>

      <q-step :name="2" title="Email e Password" :done="step > 2">
        <q-input
          outlined
          v-model="register.email"
          label="Email"
          type="email"
          :rules="[(val) => !!val || 'Campo Richiesto']"
        />
        <q-input
          outlined
          v-model="register.password"
          type="password"
          label="Password"
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
  name: 'RegisterLaboratorio',
  setup() {
    const router = useRouter();
    const $q = useQuasar();
    const register = ref({});

    const doRegister = async () => {
      try {
        const userCredential = await auth.createUserWithEmailAndPassword(register.value.email, register.value.password);
        auth.currentUser.updateProfile({
          displayName: register.value.nomeLaboratorio,
        });

        const userCr = userCredential.user;
        await db.collection('users').doc(userCr.uid).set({
          id_utente: 4,
          nome: register.value.nomeLaboratorio,
          piva: register.value.piva,
          indirizzo: register.value.indirizzo,
          provincia: register.value.provincia,
          citta: register.value.comune,
          cap: register.value.cap,
          email: userCr.email,
          uid: userCr.uid,
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

    return { step: ref(1), doRegister, register };
  },
});
</script>
