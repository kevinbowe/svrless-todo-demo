<template>
<v-app>
<MasterLayout>
	<v-container class="text-center">
		<h1 class="text-primary">Home Page Content</h1>
		<hr>
		<h4 class="text-secondary">kevinbowe1957+53a@gmail.com&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp  Kranky  - 53 A  </h4><hr>
		<h4 class="text-primary">kevinbowe1957+53b@gmail.com&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp    DaBowe  - 53 B  </h4><hr>
		<h4 class="text-error">kevinbowe1957+53c@gmail.com&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp      Nevik   - 53 C  </h4><hr>
		<h4 class="text-primary">kevinbowe1957+53d@gmail.com&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp    Mz G    - 53 D  </h4><hr>
		<h4 class="text-secondary">kevinbowe1957+53e@gmail.com&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp  Chester - 53 E  </h4><hr>
		<h4 class="text-error">kevinbowe1957+53f@mail.com &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp      KB      - 53 F  </h4><hr>
		<h4 class="text-black">kevinbowe1957+53g@gmail.com &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp     GitGud  - 53 G  </h4>

	</v-container>

	<authenticator initialState="signIn" :formFields="formFields" :signUpAttributes="['email', 'nickname']">
		<template v-slot:sign-up-fields>
			<authenticator-sign-up-form-fields />
		</template>
	</authenticator>

	<div v-if="route === 'authenticated'">
		<h1>Hello {{ user.attributes.nickname  }} !</h1>
		<div>Email == {{ user.attributes.email  }}</div>
		<div>NickName == {{ user.attributes.nickname  }}</div>
		<v-btn v-if="route === 'authenticated'" color="primary" @click="signOut">Sign Out</v-btn>
	</div>
	
	<ThemeChanger />

</MasterLayout>
</v-app>
</template>

<script setup lang="ts">
	import MasterLayout from "../layouts/MasterLayout.vue";
	import ThemeChanger from "../components/ThemeChanger.vue";
	import {	AuthenticatorSignUpFormFields, useAuthenticator } from '@aws-amplify/ui-vue';
	import { Amplify } from 'aws-amplify';
	//	NOTE: aws-exports.js had to be renamed to aws-exports.ts
	import awsconfig from '../aws-exports';
	import "@aws-amplify/ui-vue/styles.css";
	import { toRefs } from 'vue'
	// import {	useAuthenticator } from '@aws-amplify/ui-vue';
	const { route, user, signOut } = toRefs(useAuthenticator());
	




	Amplify.configure(awsconfig);

	const formFields = {
    signUp: { 
		nickname: { order:1 },  email: { order:2 }, 
		password: { order: 3 }, confirm_password: { order: 4 } }, }

</script>

<style>
/* Documentation Example
	.amplify-button[data-variation='primary'] 
	{ background: linear-gradient( to right, var(--amplify-colors-green-80), var(--amplify-colors-orange-40) );} */

.amplify-button--link { color: rgb(var(--v-theme-primary)); }

.amplify-button[data-variation='primary'] { background-color: rgb(var(--v-theme-primary)); }

.amplify-tabs-item { color: rgb(var(--v-theme-primary)); }

.amplify-tabs-item:focus { color: rgb(var(--v-theme-primary)); }

.amplify-tabs-item:hover { color: rgb(var(--v-theme-primary)); }

.amplify-tabs-item[data-state=active] { color: rgb(var(--v-theme-primary)); border-color: rgb(var(--v-theme-primary)); }
</style>