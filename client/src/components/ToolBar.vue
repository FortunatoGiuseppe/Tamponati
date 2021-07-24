<template>
  <q-toolbar>
    <q-btn stretch flat label="Home" to="/" />
    <q-btn stretch flat label="Chi siamo" to="/chiSiamo" />
    <q-btn stretch flat label="Visualizza l'informativa" to="/informativa" />
    <q-space />
    <q-toolbar-title stretch flat>Tamponati</q-toolbar-title>
    <q-space />
    <template v-if="isAuthenticated">
      <q-btn stretch flat to="/prenota">Prenota Tampone</q-btn>
      <q-btn stretch flat to="/" :label="user.displayName" />
      <q-btn stretch flat to="/" @click="logout">Logout</q-btn>
    </template>
    <template v-else>
      <q-btn stretch flat label="Voglio Convenzionarmi" icon="biotech" to="/registerLaboratory" />
      <q-btn stretch flat label="Login" icon="login" to="/login" />
      <q-btn stretch flat label="Register" icon="person" to="/register" />
    </template>
  </q-toolbar>
</template>

<script>
import { defineComponent } from 'vue';
import { useAuth } from '@vueuse/firebase/useAuth';
import { auth } from 'boot/firebase';

export default defineComponent({
  name: 'ToolBar',
  setup() {
    const { isAuthenticated, user } = useAuth(auth);

    const logout = async () => {
      await auth.signOut();
    };

    return { user, isAuthenticated, logout };
  },
});
</script>
