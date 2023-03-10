// path: src/router/routes.ts

import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/HomeView.vue'),
    meta: {
      layout: 'master',
    },
  },
  {
    path: '/about',
    name: 'About',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    meta: {
			layout: 'dashboard',
    },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () =>
      import(/* webpackChunkName: "profile" */ '../views/ProfileView.vue'),
		meta: {
      layout: 'master',
    },
  },
	{
    path: '/signup',
    name: 'Signup',
    component: () => import(/* webpackChunkName: "home" */ '../views/SignupView.vue'),
    meta: {
      layout: 'default',
    },
  },
	{
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "home" */ '../views/LoginView.vue'),
    meta: {
      layout: 'default',
    },
  },
	{
    path: '/blog1',
    name: 'Blog1',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Blog1View.vue'),
    meta: {
			layout: 'blogDashboard',
    },
  },
	{
    path: '/blog2',
    name: 'Blog2',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Blog2View.vue'),
    meta: {
			layout: 'blogDashboard',
    },
  },

	{
    path: '/article1',
    name: 'Article1',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Article1View.vue'),
    meta: {
			layout: 'dashboard',
    },
  },
	{
    path: '/article2',
    name: 'Article2',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Article2View.vue'),
    meta: {
			layout: 'dashboard',
    },
  },

];

export default routes;
