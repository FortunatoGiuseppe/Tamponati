<template>
  <q-toolbar>
    <q-btn stretch flat icon="home" to="/" />
    <q-toolbar-title class="text-weight-bold">Tamponati App</q-toolbar-title>
    <q-space />
    <template v-if="state.tipo">
      <q-btn stretch flat :to="state.tipo == 4 ? '/profilolab' : '/profilo'" :label="state.nomecompleto" />
      <q-btn stretch flat icon="logout" title="Logout" @click="logout" />
    </template>
    <template v-else>
      <q-btn stretch flat label="Voglio Convenzionarmi" icon="biotech" to="/registerlab" />
      <q-btn stretch flat label="Register" icon="person" to="/register" />
      <q-btn stretch flat label="Login" icon="login" to="/login" />
    </template>
  </q-toolbar>
</template>

<script>
import { defineComponent } from 'vue';
import { auth } from 'boot/firebase';
import { emptyState, useState } from 'src/modules/useState.js';

export default defineComponent({
  name: 'ToolBar',
  setup() {
    const state = useState();

    const logout = async () => {
      await auth.signOut();
      state.value = { ...emptyState };
    };

    return { state, logout };
  },
});
</script>
