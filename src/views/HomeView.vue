<template>
	<v-app>
		<MasterLayout>
			<v-row justify="center">

				<v-col cols="6">
					<ThemeChanger />
					<ThemePreview />

					<v-form validate-on="submit" @submit.prevent="callRulePromise(myNickname)">
						<v-text-field 
							v-model="myNickname" 
							label="Your Nickname"
						></v-text-field>
						<v-btn type="submit" block class="mt-2">Submit</v-btn>
					</v-form>
				</v-col>

				<v-col cols="6">

					<v-container class="text-center">
						<h1 class="text-primary">Home Page Content</h1>
						<hr>
						<h4 class="text-secondary">kevinbowe1957+53a@gmail.com&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp Kranky -
							53 A </h4>
						<hr>
						<h4 class="text-primary">kevinbowe1957+53b@gmail.com&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp DaBowe - 53
							B </h4>
						<hr>
						<h4 class="text-error">kevinbowe1957+53c@gmail.com&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp Nevik - 53 C
						</h4>
						<hr>
						<h4 class="text-primary">kevinbowe1957+53d@gmail.com&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp Mz G - 53 D
						</h4>
						<hr>
						<h4 class="text-secondary">kevinbowe1957+53e@gmail.com&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp Chester -
							53 E </h4>
						<hr>
						<h4 class="text-error">kevinbowe1957+53f@mail.com &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp KB - 53 F
						</h4>
						<hr>
						<h4 class="text-black">kevinbowe1957+53g@gmail.com &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp GitGud - 53 G
						</h4>
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

				</v-col>
			</v-row>
		</MasterLayout>
	</v-app>
</template>
<script setup lang="ts">
import MasterLayout from "../layouts/MasterLayout.vue";
import ThemeChanger from "../components/ThemeChanger.vue";
import ThemePreview from "../components/ThemePreview.vue";
import { AuthenticatorSignUpFormFields, useAuthenticator } from '@aws-amplify/ui-vue';
import { Amplify, Auth } from 'aws-amplify';
//	NOTE: aws-exports.js had to be renamed to aws-exports.ts
import awsconfig from '../aws-exports';
import "@aws-amplify/ui-vue/styles.css";
import { toRefs, ref } from 'vue'
import { resolveComponent } from "vue";
Amplify.configure(awsconfig);

const { route, user, signOut } = toRefs(useAuthenticator());
const formFields = {
	signUp: {
		nickname: { order: 1 }, email: { order: 2 },
		password: { order: 3 }, confirm_password: { order: 4 }
	},
}
const myNickname = ref("")

function callRulePromise(i: string) {
	testFieldExists(i)
		.then(testFieldLength)
		.then(submitNickname)
		.then((successMessage) => log("Final resolve message == ", successMessage))
		.catch(function (error) {
			console.error(error)
		})
}

function testFieldExists(i: String) {
	log("myNicknme input == ", i)
	return new Promise((resolve, reject) => {
		if (i === null || i.length === 0) {
			info("reject -- Empty Check")
			reject("empty validation error")
		} else {
			info("resolve - Empty Check")
			resolve(i)
		}
	})
}

function testFieldLength(value: any) {
	console.log("testFieldLengthTWO Check -- Value == ", value)
	return new Promise((resolve, reject) => {
		if (value.length <= 4) {
			info("reject -- Length Check")
			reject("length validation error")
		} else {
			info("resolve - Length Check")
			resolve(value)
		}
	})
}

async function submitNickname() {
	progress("Executing 'update User Attributes' == ", myNickname.value)
	const user = await Auth.currentAuthenticatedUser();
	await Auth.updateUserAttributes(user, { 'nickname': myNickname.value });
}
					

					const log = console.log;     // normal log
					
					const warn = console.warn;   // Orange on Brown
					
					const err = console.error;   // Pink on DkRed

					const progress =  (msg: string, value: any = "") => { 
											console.log(`%c${msg}`, "color: black; background-color:orange;", value) }

					const joy =     	(msg: string, value: any = "") => { 
											console.log(`%c${msg}`, "color: pink;", value) }

					const info =    	(msg: string, value: any = "") => { 
											console.log(`%c${msg}`, "color: cyan;"), value }
					
					// const success = (msg: string, value: any = "") => { 
					//						console.log(`%c${msg}`, "color: black; background-color:green;", value) }

					const success = 	(msg: string, value: any = "") => { 
											console.log(`%c${msg}`, "color: green; background-color:black;", value) }

					const bar = 		((msg: string = "", value: any = "") => { 
											console.log(`%c|||||||||||||||||||||||||||||||||%c ${msg}`, "color: white; background-color:black;", value) })
</script>

<style>
/* Documentation Example
	.amplify-button[data-variation='primary'] 
	{ background: linear-gradient( to right, var(--amplify-colors-green-80), var(--amplify-colors-orange-40) );} */

.amplify-button--link {
	color: rgb(var(--v-theme-primary));
}

.amplify-button[data-variation='primary'] {
	background-color: rgb(var(--v-theme-primary));
}

.amplify-tabs-item {
	color: rgb(var(--v-theme-primary));
}

.amplify-tabs-item:focus {
	color: rgb(var(--v-theme-primary));
}

.amplify-tabs-item:hover {
	color: rgb(var(--v-theme-primary));
}

.amplify-tabs-item[data-state=active] {
	color: rgb(var(--v-theme-primary));
	border-color: rgb(var(--v-theme-primary));
}</style>