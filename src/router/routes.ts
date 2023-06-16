// path: src/router/routes.ts

import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/dev5",
		name: "Dev 5",
		component: () => import("../views/DevView5.vue"),
		meta: {
			layout: "default",
		},
	},
	{
		path: "/dev",
		name: "Dev",
		component: () => import("../views/DevView.vue"),
		meta: {
			layout: "default",
		},
	},
	{
		path: "/dev4",
		name: "Dev 4",
		component: () => import("../views/DevView4.vue"),
		meta: {
			layout: "default",
		},
	},
	{
		path: "/dev3",
		name: "Dev 3",
		component: () => import("../views/DevView3.vue"),
		meta: {
			layout: "default",
		},
	},
	{
		path: "/dev2",
		name: "Dev 2",
		component: () => import("../views/DevView2.vue"),
		meta: {
			layout: "default",
		},
	},
	{
		path: "/dev1",
		name: "Dev 1",
		component: () => import("../views/DevView1.vue"),
		meta: {
			layout: "default",
		},
	},
	{
		path: "/",
		name: "home",
		component: () => import("../views/HomeView.vue"),
		meta: {
			layout: "master",
		},
	},
	{
		path: "/about",
		name: "About",
		component: () => import("../views/AboutView.vue"),
		meta: {
			layout: "default",
		},
	},
	{
		path: "/profile/:p1?/:p2?/:p3?", 
		name: "profile",
		props: true,
		component: () =>
			import("../views/ProfileView.vue"),
		meta: {
			layout: "master",
		},
	},
	{
		path: "/signin",
		name: "Sign In",
		component: () => import("../views/SigninView.vue"),
		meta: {
			layout: "default",
		},
	},
	{
		path: "/blog1",
		name: "Blog1",
		component: () => import("../views/Blog1View.vue"),
		meta: {
			layout: "blogDashboard",
		},
	},
	{
		path: "/blog2",
		name: "Blog2",
		component: () => import("../views/Blog2View.vue"),
		meta: {
			layout: "blogDashboard",
		},
	},

	{
		path: "/article1",
		name: "Article1",
		component: () => import("../views/Article1View.vue"),
		meta: {
			layout: "dashboard",
		},
	},
	{
		path: "/article2",
		name: "Article2",
		component: () => import("../views/Article2View.vue"),
		meta: {
			layout: "dashboard",
		},
	},
	{
		path: "/tandc",
		name: "Terms-and-Conditions",
		component: () => import("../views/TermsConditionsView.vue"),
		meta: {
			layout: "dashboard",
		},
	},
];

export default routes;
