// path: src/router/routes.ts

import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/account",
		name: "Account",
		component: () => import("../views/AccountSettingsView.vue"),
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
		path: "/profile/:p1?/:p2?/:p3?/:p4?", 
		name: "profile",
		props: true,
		component: () =>
			import("../views/ProfileView.vue"),
		meta: {
			layout: "master",
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
		path: "/article1",
		name: "Article1",
		component: () => import("../views/Article1View.vue"),
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
