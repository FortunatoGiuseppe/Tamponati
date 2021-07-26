import { createGlobalState, useStorage } from '@vueuse/core';

const emptyState = {
  id: null,
  nomecompleto: '',
  tipo: null,
  cf: '',
  provincia: '',
  nome: '',
  cognome: '',
};

const useState = createGlobalState(() => useStorage('vue-tamponati', { ...emptyState }, sessionStorage));

export { emptyState, useState };
