<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <tool-bar @drawopen="toggleLeftDrawer" />
    </q-header>

    <q-drawer v-if="$q.screen.lt.md" v-model="leftDrawerOpen" side="left" class="bg-primary text-white">
      <q-scroll-area class="fit">
        <q-list>
          <q-item
            v-if="state.tipo_utente"
            v-ripple
            clickable
            active-class="text-black"
            :to="state.tipo_utente == 4 ? '/profilolab' : '/profilo'"
          >
            <q-item-section>{{ state.nomecompleto }}</q-item-section>
          </q-item>
          <q-item v-else><q-item-section /></q-item>
          <q-separator />

          <q-item v-ripple clickable active-class="text-black" to="/chisiamo">
            <q-item-section>Chi siamo</q-item-section>
          </q-item>
          <q-separator />

          <q-item v-ripple clickable active-class="text-black" to="/informativa">
            <q-item-section>Informativa</q-item-section>
          </q-item>
          <q-separator />

          <q-item v-ripple clickable active-class="text-black" to="/registerlab">
            <q-item-section>Voglio Convenzionarmi</q-item-section>
          </q-item>
          <q-separator />

          <q-item v-if="!state.tipo_utente" v-ripple clickable active-class="text-black" to="/register">
            <q-item-section>Registrati</q-item-section>
          </q-item>
          <q-separator />
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view class="q-py-md" />
    </q-page-container>
  </q-layout>
</template>

<script>
import ToolBar from 'src/components/ToolBar.vue';
import { defineComponent, ref } from 'vue';
import { useState } from 'src/modules/useState.js';
export default defineComponent({
  name: 'MainLayout',
  components: { ToolBar },
  setup() {
    const state = useState();
    const leftDrawerOpen = ref(false);
    return {
      state,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
