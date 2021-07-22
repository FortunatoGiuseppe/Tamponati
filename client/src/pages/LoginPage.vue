<template>
  <q-page class="q-pa-md">
    <q-card class="q-mx-auto q-pa-lg" style="width: 30rem">
      <q-form @submit.prevent="doLogin">
        <q-card-section class="q-gutter-md">
          <q-input outlined type="email" v-model="email" label="Email" :rules="[(val) => !!val || 'Campo Richiesto']" />
          <q-input
            outlined
            type="password"
            v-model="password"
            label="Password"
            :rules="[(val) => !!val || 'Campo Richiesto']"
          />
        </q-card-section>
        <q-card-actions>
          <q-btn type="submit" flat>Login</q-btn>
          <q-btn flat to="/register">Registrati</q-btn>
        </q-card-actions>
      </q-form>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { auth } from 'boot/firebase';

export default defineComponent({
  name: 'LoginPage',
  setup() {
    const router = useRouter();
    const $q = useQuasar();

    const email = ref('');
    const password = ref('');

    const doLogin = async () => {
      try {
        await auth.signInWithEmailAndPassword(email.value, password.value);
        router.push('/');
      } catch (error) {
        $q.notify({
          type: 'negative',
          position: 'top',
          message: 'Nome utente o Password errati',
        });
        console.log(error);
      }
    };

    return { email, password, doLogin };
  },
});
</script>
