const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/login',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/LoginPage.vue') }],
  },
  {
    path: '/register',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/RegisterPage.vue') }],
  },
  {
    path: '/profilo',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/RegisterPage.vue') }],
  },
  {
    path: '/registerlab',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/RegisterLaboratoryPage.vue') }],
  },
  {
    path: '/profilolab',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/ProfiloLaboratoryPage.vue') }],
  },
  {
    path: '/calendario',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/CalendarioLabPage.vue') }],
  },
  {
    path: '/questionari',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('components/VisualizzaQuestionari.vue') }],
  },
  {
    path: '/chisiamo',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/chiSiamo.vue') }],
  },
  {
    path: '/informativa',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Informativa.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
