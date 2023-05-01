<template>
<v-app>
<MasterLayout>

	<v-container class="text-center">
		<h1 class="text-primary">Home Page Content</h1>
		<hr>
		<h2 class="text-success">kevinbowe1957+0422-230am@gmail.com</h2>
		<hr>
		<h2 class="text-secondary">kevinbowe1957+0501a@gmail.com</h2>
		<hr>
		<h2 class="text-primary">kevinbowe1957+0501b@gmail.com </h2>
		<hr>
		<h2 class="text-error">kevinbowe1957+0501c@gmail.com </h2>
	</v-container>

	<authenticator initialState="signIn" :formFields="formFields" :signUpAttributes="['email', 'nickname']">
		<template v-slot:sign-up-fields>
			<authenticator-sign-up-form-fields />
		</template>
		<template v-slot="{ user, signOut, }">
			<h1>Hello {{ user.attributes.nickname  }} !</h1>
			<v-btn color="primary" @click="signOut">Sign Out</v-btn>
		</template>
	</authenticator>

	<!-- <authenticator __ORIGINAL__>
		<template v-slot="{ user, signOut }">
			<h1>Hello {{ user.username }}!</h1>
			<v-btn color="primary" @click="signOut">Sign Out</v-btn>
		</template>
	</authenticator> -->

	<ThemeChanger />

</MasterLayout>
</v-app>
</template>

<script setup lang="ts">
	import MasterLayout from "../layouts/MasterLayout.vue";
	import ThemeChanger from "../components/ThemeChanger.vue";
	// import { ref } from "vue";
	import {	AuthenticatorSignUpFormFields } from '@aws-amplify/ui-vue';
	import { Amplify, Auth } from 'aws-amplify';

	//	NOTE: aws-exports.js had to be renamed to aws-exports.ts
	import awsconfig from '../aws-exports';
	// import { onMounted } from "vue";

	import "@aws-amplify/ui-vue/styles.css";

	Amplify.configure(awsconfig);

	const formFields = {
    signUp: { 
		nickname: { order:1 }, email: { order:2 }, 
		password: { order: 3 }, confirm_password: { order: 4 } }, }

	// const nickname = ref();
	// async function GetNickname(){	
	// 	const  info   = await Auth.currentUserInfo();
	// 	nickname.value = info.attributes.nickname;
	// 	console.log("currentUserInfo > attributes.nickname ==== ", info.attributes.nickname)
	// 	// return info.attributes.nickname
	// }

	// const nickname = ref( {
	// 	Auth.currentUserInfo().then((info:any) => {
	// 		return info.attributes.nickname;
	// 	}) })
	
	// const nickname = ref("");
	
	// async function GetNickname(){
	// 		await Auth.currentUserInfo().then((info) => {
	// 			nickname.value = info.attributes.nickname;
	// 		});
	// 	// nickname.value = info.attributes.nickname;
	// 	//console.log("nickname ==== ", nickname.value)
	// }

	// onMounted(async () => {
	// 	try {
	// 		await Auth.currentUserInfo().then((info) => {
	// 		nickname.value = info.attributes.nickname;
	// 	})
	// 	} catch (err) {}
	// })

	// const propsXXX = defineProps({
	// nickname: String, default: () => Auth.currentUserInfo().then((info) => {
	// 		console.log("Nickname === ",info.attributes.nickname)
	//  		return info.attributes.nickname;
	// 	}
	// })

	// const props = withDefaults(defineProps(), {
	// 	nickname: () =>
	// 		Auth.currentUserInfo().then((info) => {
	// 			console.log("Nickname === ", info.attributes.nickname)
	// 			return info.attributes.nickname;

	// 		})
	// })

// 	const nick = computed(() => {
// 		Auth.currentUserInfo().then((info) => {
// 			console.log("Nickname === ",info.attributes.nickname)
// 	 		return info.attributes.nickname;
// 			// props.nickname? = info.attributes.nickname

// 	 	});

// });

</script>
