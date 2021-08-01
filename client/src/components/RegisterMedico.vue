<template>
  <q-form @submit.prevent="doRegister">
    <q-stepper v-model="step" vertical color="primary" animated class="q-mx-auto q-pa-lg" style="width: 30rem">
      <q-step :name="1" title="Chi sono" :done="step > 1">
        <q-input v-model="register.nome" outlined label="Nome" :rules="[(val) => !!val || 'Campo Richiesto']" />
        <q-input v-model="register.cognome" outlined label="Cognome" :rules="[(val) => !!val || 'Campo Richiesto']" />
        <q-input
          v-model="register.codicefiscale"
          outlined
          label="Codice Fiscale"
          mask="AAAAAA##A##A###A"
          :rules="[(val) => !!val || 'Campo Richiesto']"
        />
        <q-input
          v-model="register.codicemedico"
          outlined
          label="Codice Medico (codice appartenenza proprio sistema sanitario)"
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
          <q-btn color="primary" label="Continua" @click="step = 2" />
        </q-stepper-navigation>
      </q-step>
      <q-step :name="2" title="Email e Password" :done="step > 2">
        <q-input
          v-model="register.email"
          outlined
          label="Email"
          type="email"
          :rules="[(val) => !!val || 'Campo Richiesto']"
        />
        <q-input
          v-model="register.password"
          outlined
          type="password"
          label="Password"
          :rules="[(val) => !!val || 'Campo Richiesto']"
        />

        <q-stepper-navigation>
          <q-btn type="submit" color="primary" label="Registrati" @click="step = 2" />
          <q-btn flat color="primary" label="Indietro" class="q-ml-sm" @click="step = 1" />
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
  name: 'RegisterMedico',
  setup() {
    const router = useRouter();
    const $q = useQuasar();
    const register = ref({});

    const doRegister = async () => {
      //controllo password 
      if(register.value.password==register.value.password2){
        try {
          const userCredential = await auth.createUserWithEmailAndPassword(register.value.email, register.value.password);

          const userCr = userCredential.user;
          await db.collection('users').doc(userCr.uid).set({
            tipo_utente: 2,
            nome: register.value.nome,
            cognome: register.value.cognome,
            codicefiscale: register.value.codicefiscale,
            codicemedico: register.value.codicemedico,
            datanasciata: register.value.datanasciata,
            email: userCr.email,
            uid: userCr.uid,
            approvato: false,
          });
          router.push('#');
          $q.notify({
              type: 'positive',
              position: 'top',
              message: 'Richiesta di convenzione inviata!',
              forever: true, 
            });
        } catch (error) {
          $q.notify({
            type: 'negative',
            position: 'top',
            message: 'Medico già registrato!',
          });
          console.log(error);
        }
      } else {
        $q.notify({
            type: 'negative',
            position: 'top',
            message: 'Attenzione le password inserite non coincidono!',
        });
      }
    };

    return { step: ref(1), doRegister, register };
  },
});
</script>
