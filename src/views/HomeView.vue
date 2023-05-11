<template>
	<v-app>
		<MasterLayout>
			<h1 class="text-primary">Home Page Content</h1>
			<hr>
			<v-row justify="center">
				<v-col cols="6"> <!-- START Column ONE -->



					
					<!-- Add Experimental Code Here -->





				</v-col> <!-- END Column ONE -->

				<v-col cols="6"> <!-- START Column TWO -->
					<v-container class="text-center">
						<!-- <h4 class="text-secondary">kevinbowe1957+53a@gmail.com&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp Kranky -
							53 A </h4>
						<hr>
						<h4 class="text-primary">kevinbowe1957+53b@gmail.com&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp DaBowe - 53
							B </h4>
						<hr>
						<h4 class="text-error">kevinbowe1957+511a@gmail.com&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp Mista Bo - 511 A
						</h4>
						<hr>
						<h4 class="text-primary">kevinbowe1957+511b@gmail.com&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp ??</h4>
						<hr>
						<h4 class="text-secondary">kevinbowe1957+53c@gmail.com&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp ??</h4>
						<hr>
						<h4 class="text-error">kevinbowe1957+53d@mail.com &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp ??</h4>
						<hr>
						<h4 class="text-primary">kevinbowe1957+53e@gmail.com &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp ??</h4> 
						<hr> -->
						<h3 class="text-grey">kevinbowe1957+511a@gmail.com &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp Mista Bo - 511 A </h3>
					</v-container>

					<authenticator initialState="signIn" :formFields="formFields" :signUpAttributes="['email', 'nickname']">
						<template v-slot:sign-up-fields>
							<authenticator-sign-up-form-fields />
						</template>
					</authenticator>

					<div v-if="route === 'authenticated'">
						<h1>Hello {{ user.attributes.nickname }} !</h1>
						<div>Email == {{ user.attributes.email }}</div>
						<div>NickName == {{ user.attributes.nickname }}</div>
						<v-btn v-if="route === 'authenticated'" color="primary" @click="signOut">Sign Out</v-btn>
					</div>

					<ThemeChanger />

				</v-col> <!-- END Column TWO -->
			</v-row>
		</MasterLayout>
	</v-app>
</template>

<script setup lang="ts">
import MasterLayout from "../layouts/MasterLayout.vue";
import { toRefs, ref } from 'vue'
				//////
import  { log, warn, err , progress, joy, info, enter,
			exit, success, bar, whitebar, fini, start, pass, fail }
	from "../my-util-code/MyConsoleUtil"
import ThemeChanger from "../components/ThemeChanger.vue";
				//////
import { AuthenticatorSignUpFormFields, useAuthenticator } from '@aws-amplify/ui-vue';
import { Amplify, Auth } from 'aws-amplify';
				//	NOTE: aws-exports.js had to be renamed to aws-exports.ts
import awsconfig from '../aws-exports';
import "@aws-amplify/ui-vue/styles.css";
Amplify.configure(awsconfig);

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

const { route, user, signOut } = toRefs(useAuthenticator());
const formFields = {
	signUp: {
		nickname: { order: 1 }, email: { order: 2 },
		password: { order: 3 }, confirm_password: { order: 4 }
	},
}

</script>

<style>
	.amplify-button--link { color: rgb(var(--v-theme-primary)); }
	.amplify-button[data-variation='primary'] { background-color: rgb(var(--v-theme-primary)); }
	.amplify-tabs-item { color: rgb(var(--v-theme-primary)); }
	.amplify-tabs-item:focus { color: rgb(var(--v-theme-primary)); }
	.amplify-tabs-item:hover { color: rgb(var(--v-theme-primary)); }
	.amplify-abs-item[data-state=active] { color: rgb(var(--v-theme-primary)); border-color: rgb(var(--v-theme-primary));}
</style>