const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/chiSiamo',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/chiSiamo.vue') }],
  },
  {
    path: '/informativa',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/informativa.vue') }],
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
    path: '/prenota',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/PrenotaTamponePage.vue') }],
  },

  {
    path: '/registerLaboratory',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/RegisterLaboratoryPage.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
