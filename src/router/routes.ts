// path: src/router/routes.ts

import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'HomeView',
    component: () => import(/* webpackChunkName: "home" */ '../views/HomeView.vue'),
		// component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    meta: {
      layout: 'DefaultLayout',
    },
  },
  {
    path: '/about',
    name: 'AboutView',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    meta: {
      layout: 'DefaultLayout',
    },
  },

  {
    path: '/profile',
    name: 'ProfileView',
    component: () =>
      import(/* webpackChunkName: "profile" */ '../views/ProfileView.vue'),
		meta: {
      layout: 'DashboardLayout',
    },
  },
];

export default routes;
