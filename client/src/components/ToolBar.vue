<template>
  <q-toolbar>
    <q-btn class="toolBar_btn" stretch flat icon="home" to="/" />
    <q-toolbar-title class=" toolBar_btn text-weight-bold">Tamponati App</q-toolbar-title>
    <q-btn class="toolBar_btn" stretch flat label="Chi siamo" to="/chisiamo" />
    <q-btn class="toolBar_btn" stretch flat label="Informativa" to="/informativa" />
    <q-space />
    <template v-if="state.tipo">
      <q-btn class="toolBar_btn" stretch flat :to="state.tipo == 4 ? '/profilolab' : '/profilo'" :label="state.nomecompleto" />
      <q-btn class="toolBar_btn" stretch flat icon="logout" title="Logout" @click="logout" />
    </template>
    <template v-else>
      <q-btn class="toolBar_btn" stretch flat label="Voglio Convenzionarmi" icon="biotech" to="/registerlab" />
      <q-btn class="toolBar_btn" stretch flat label="Register" icon="person" to="/register" />
      <q-btn class="toolBar_btn" stretch flat label="Login" icon="login" to="/login" />
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
