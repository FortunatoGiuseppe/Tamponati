<template>
  <q-form @submit.prevent="saveForm">
    <q-stepper v-model="step" vertical color="primary" animated class="q-mx-auto q-pa-lg" style="width: 30rem">
      <q-step :name="1" title="Anagrafica" :done="step > 1">
        <q-input
          v-model="register.nome"
          outlined
          label="Nome Laboratorio"
          :rules="[(val) => !!val || 'Campo Richiesto']"
        />
        <q-input
          v-model="register.indirizzo"
          outlined
          label="Indirizzo, numero"
          :rules="[(val) => !!val || 'Campo Richiesto']"
        />
        <q-input
          v-model="register.piva"
          outlined
          label="Partita IVA"
          mask="###########"
          :rules="[(val) => !!val || 'Campo Richiesto']"
        />
        <q-select
          v-model="register.provincia"
          outlined
          emit-value
          map-options
          :options="optionsProvince"
          label="Provincia"
          :rules="[(val) => !!val || 'Campo Richiesto']"
        />
        <q-input v-model="register.citta" outlined label="Comune" :rules="[(val) => !!val || 'Campo Richiesto']" />
        <q-input
          v-model="register.cap"
          outlined
          label="CAP"
          mask="#####"
          :rules="[(val) => !!val || 'Campo Richiesto']"
        />
        <q-stepper-navigation>
          <q-btn v-if="dati" type="submit" color="primary" label="Aggiorna Profilo" />
          <q-btn v-else color="primary" label="Continua" @click="step = 2" />
        </q-stepper-navigation>
      </q-step>

      <q-step v-if="!dati" :name="2" title="Email e Password" :done="step > 2">
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
  name: 'RegisterLaboratorio',
  props: {
    dati: {
      type: Object,
      default: null,
    },
  },
  setup(props) {
    const router = useRouter();
    const $q = useQuasar();
    const register = ref({});

    const optionsProvince = ref([]);
    db.collection('province')
      .get()
      .then((querySnapshot) => {
        const prov = [];
        querySnapshot.forEach((doc) => {
          prov.push(doc.data());
        });
        optionsProvince.value = prov;
      });

    if (props.dati) {
      register.value = { ...props.dati };
    }

    const doRegister = async () => {
      try {
        const userCredential = await auth.createUserWithEmailAndPassword(register.value.email, register.value.password);

        const userCr = userCredential.user;
        await db.collection('users').doc(userCr.uid).set({
          tipo_utente: 4,
          nome: register.value.nome,
          piva: register.value.piva,
          indirizzo: register.value.indirizzo,
          provincia: register.value.provincia,
          citta: register.value.citta,
          cap: register.value.cap,
          email: userCr.email,
          uid: userCr.uid,
          approvato: false,
        });
        router.push('/');
      } catch (error) {
        $q.notify({
          type: 'negative',
          position: 'top',
          message: 'Laboratorio già registrato!',
        });
        console.log(error);
      }
    };

    const updateDB = async () => {
      try {
        await db.collection('users').doc(register.value.uid).update({
          tipo_utente: 4,
          nome: register.value.nome,
          piva: register.value.piva,
          indirizzo: register.value.indirizzo,
          provincia: register.value.provincia,
          citta: register.value.citta,
          cap: register.value.cap,
        });

        $q.notify({
          type: 'positive',
          position: 'top',
          message: 'Anagrafica Aggiornata!',
        });
      } catch (error) {
        $q.notify({
          type: 'negative',
          position: 'top',
          message: 'Errore salvataggio dati!',
        });
        console.log(error);
      }
    };

    const saveForm = () => {
      if (props.dati) {
        updateDB();
      } else {
        doRegister();
      }
    };

    return { step: ref(1), saveForm, register, optionsProvince };
  },
});
</script>
