<template>
<v-app>
<MasterLayout>

	<v-container class="text-center">
		<h1 class="text-primary">Home Page Content</h1>
		kevinbowe1957+0422-230am@gmail.com
	</v-container>

	<authenticator>
		<template v-slot="{ user, signOut }">
			<h1>Hello {{ user.username }}!</h1>
			<v-btn color="primary" @click="signOut">Sign Out</v-btn>
		</template>
	</authenticator>

	<ThemeChanger />

</MasterLayout>
</v-app>
</template>

<script setup lang="ts">
	import MasterLayout from "../layouts/MasterLayout.vue";
	import ThemeChanger from "../components/ThemeChanger.vue";

	import "@aws-amplify/ui-vue/styles.css";
	import { Amplify } from 'aws-amplify';

	//	NOTE: aws-exports.js had to be renamed to aws-exports.ts
	import awsconfig from '../aws-exports';
	Amplify.configure(awsconfig);

</script>
