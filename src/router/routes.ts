// path: src/router/routes.ts

import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/dev3',
		name: 'Dev 3',
		component: () => import(/* webpackChunkName: "home" */ '../views/DevView3.vue'),
		meta: {
		  layout: 'default',
		},
	 },
	{
		path: '/dev2',
		name: 'Dev 2',
		component: () => import(/* webpackChunkName: "home" */ '../views/DevView2.vue'),
		meta: {
		  layout: 'default',
		},
	 },
	{
    path: '/dev',
    name: 'Dev',
    component: () => import(/* webpackChunkName: "home" */ '../views/DevView.vue'),
    meta: {
      layout: 'default',
    },
  },
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
			layout: 'default',
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
	path: '/signin',
	name: 'Sign In',
	component: () => import(/* webpackChunkName: "home" */ '../views/SigninView.vue'),
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
