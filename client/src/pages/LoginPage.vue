<template>
  <q-page class="q-pa-md sfondoHome">
    <q-card class="q-mx-auto q-pa-lg" style="width: 30rem; max-width: 100%">
      <q-form @submit.prevent="doLogin">
        <q-card-section class="q-gutter-md">
          <q-input v-model="email" outlined type="email" label="Email" :rules="[(val) => !!val || 'Campo Richiesto']" />
          <q-input
            v-model="password"
            outlined
            :type="isPwd ? 'password' : 'text'"
            label="Password"
            :rules="[(val) => !!val || 'Campo Richiesto']"
            ><template #append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              ></q-icon>
            </template>
          </q-input>
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
      //se sei medico o laboraotrorio devi essere stato approvato !!!!!!!!
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

    return { email, password, doLogin, isPwd: ref(true) };
  },
});
</script>
