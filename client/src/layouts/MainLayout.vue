<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <tool-bar />
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import ToolBar from 'src/components/ToolBar.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MainLayout',
  components: { ToolBar },
});
</script>
