<template>
  <q-toolbar>
    <q-btn v-if="$q.screen.lt.md" dense flat round icon="menu" @click="$emit('drawopen')" />
    <q-btn round dense flat icon="home" to="/" />
    <q-toolbar-title class="text-weight-bold">Tamponati App</q-toolbar-title>
    <template v-if="$q.screen.gt.md">
      <q-btn stretch flat label="Chi siamo" to="/chisiamo" />
      <q-btn stretch flat label="Informativa" to="/informativa" />
      <q-space />
      <template v-if="state.tipo_utente">
        <q-btn stretch flat :to="state.tipo_utente == 4 ? '/profilolab' : '/profilo'" :label="state.nomecompleto" />
        <q-btn round dense flat icon="logout" title="Logout" @click="logout" />
      </template>
      <template v-else>
        <q-btn stretch flat label="Voglio Convenzionarmi" icon="biotech" to="/registerlab" />
        <q-btn stretch flat label="Registrati" icon="person" to="/register" />
        <q-btn stretch flat label="Login" icon="login" to="/login" />
      </template>
    </template>
    <template v-else>
      <template v-if="state.tipo_utente">
        <q-btn round dense flat icon="logout" title="Logout" @click="logout" />
      </template>
      <template v-else>
        <q-btn round dense flat icon="login" to="/login" />
      </template>
    </template>
  </q-toolbar>
</template>

<script>
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { auth } from 'boot/firebase';
import { emptyState, useState } from 'src/modules/useState.js';
export default defineComponent({
  name: 'ToolBar',
  emits: ['drawopen'],
  setup() {
    const router = useRouter();
    const state = useState();
    const logout = async () => {
      await auth.signOut();
      state.value = { ...emptyState };
      router.push('/');
    };
    return { state, logout };
  },
});
</script>
