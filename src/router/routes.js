
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Index.vue'),
      },
      {
        path: 'requests',
        component: () => import('pages/Requests.vue'),
      },
      {
        path: 'request/:id',
        component: () => import('pages/Request.vue'),
      },
    ],
  },
  {
    path: '/auth/',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        path: 'login',
        component: () => import('pages/Login.vue'),
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: 'logout',
        component: () => import('pages/Logout.vue'),
      },
    ],
  },
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue'),
  })
}

export default routes
