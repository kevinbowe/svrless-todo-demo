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
		path: "/user",
		name: "User",
		component: () => import("../views/UserView.vue"),
		meta: {
			layout: "master",
		},
	},
	{
		path: "/dev1",
		name: "Dev1",
		component: () => import("../views/Dev1View.vue"),
		meta: {
			layout: "default",
		},
	},
	{
		path: "/dev2",
		name: "Dev2",
		component: () => import("../views/Dev2View.vue"),
		meta: {
			layout: "default",
		},
	},
	{
		path: "/future",
		name: "Future",
		component: () => import("../views/Future.vue"),
		meta: {
			layout: "default",
		},
	},
	{
		path: "/",
		name: "root",
		component: () => import("../views/HomeView.vue"),
		meta: {
			layout: "master",
		},
	},	
	{
		path: "/home",
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
			layout: "master",
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
		path: "/todo", 
		name: "todo",
		props: true,
		component: () =>
			import("../views/TodoView.vue"),
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
			layout: "master",
		},
	},
	{
		path: "/contact",
		name: "Contact",
		component: () => import("../views/Contact.vue"),
		meta: {
			layout: "master",
		},
	},
	{
		path: "/theme",
		name: "Theme",
		component: () => import("../views/ThemeView.vue"),
		meta: {
			layout: "master",
		},
	},
];

export default routes;
