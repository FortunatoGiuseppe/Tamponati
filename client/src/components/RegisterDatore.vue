<template>
  <q-form @submit.prevent="doRegister">
    <q-stepper v-model="step" vertical color="primary" animated class="q-mx-auto q-pa-lg" style="width: 30rem">
      <q-step :name="1" title="Chi sono" :done="step > 1">
        <q-input outlined v-model="register.nome" label="Nome" :rules="[(val) => !!val || 'Campo Richiesto']" />
        <q-input outlined v-model="register.cognome" label="Cognome" :rules="[(val) => !!val || 'Campo Richiesto']" />
        <q-input
          outlined
          v-model="register.codicefiscale"
          label="Codice Fiscale"
          :rules="[(val) => !!val || 'Campo Richiesto']"
        />

        <q-input
          v-model="register.datanasciata"
          outlined
          label="Data di Nascita"
          mask="##/##/####"
          :rules="[(val) => /^-?[0-3]\d\/[0-1]\d\/[\d]+$/.test(val) || 'Campo Richiesto']"
        >
          <template #append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy ref="qDateProxy">
                <q-date
                  v-model="register.datanasciata"
                  mask="DD/MM/YYYY"
                  @update:model-value="() => $refs.qDateProxy.hide()"
                />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-stepper-navigation>
          <q-btn @click="step = 2" color="primary" label="Continua" />
        </q-stepper-navigation>
      </q-step>

      <q-step :name="2" title="Email e Password" icon="email" :done="step > 2">
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
          <q-btn @click="step = 3" color="primary" label="Continua" />
          <q-btn flat @click="step = 1" color="primary" label="Indietro" class="q-ml-sm" />
        </q-stepper-navigation>
      </q-step>

      <q-step :name="3" title="Azienda" icon="business" :done="step > 3">
        <q-input outlined v-model="register.nome" label="Partita IVA" :rules="[(val) => !!val || 'Campo Richiesto']" />
        <q-input outlined v-model="register.nome" label="Indirizzo" :rules="[(val) => !!val || 'Campo Richiesto']" />
        <q-stepper-navigation>
          <q-btn @click="step = 4" type="submit" color="primary" label="Registrati" />
          <q-btn flat @click="step = 2" color="primary" label="Indietro" class="q-ml-sm" />
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
  </q-form>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useQuasar } from 'quasar';
import { auth, db } from 'boot/firebase';

export default defineComponent({
  name: 'RegisterDatore',
  setup() {
    const $q = useQuasar();
    const register = ref({});

    const doRegister = async () => {
      try {
        const userCredential = await auth.createUserWithEmailAndPassword(register.value.email, register.value.password);
        auth.currentUser.updateProfile({
          displayName: register.value.nome + ' ' + register.value.cognome,
        });

        const userCr = userCredential.user;
        await db.collection('users').doc(userCr.uid).set({
          nome: register.value.nome,
          cognome: register.value.cognome,
          codicefiscale: register.value.codicefiscale,
          datanasciata: register.value.datanasciata,
          email: userCr.email,
          uid: userCr.uid,
          id: 3,
        });
        register.value = {};
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
