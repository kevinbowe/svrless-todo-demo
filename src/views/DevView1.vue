<template>
	<v-app>
		<MasterLayout>
			<h1>DEV View 1</h1>
			<h1>TWO "Then().Then().Catch()" Examples</h1>
			<v-row justify="center">

				<v-col cols="6">
					<ThemeChanger />
					<ThemePreview />
					<hr class="my-5">
					<h1>REFERENCE</h1>
					<v-sheet width="300" color="background" class="mx-auto">
					<v-form validate-on="submit" @submit.prevent="callRulePromise(myNickname)">
						<v-text-field 
							v-model="myNickname" 
							label="Your Nickname"
						></v-text-field>
						<v-btn color="green" type="submit" block class="mt-2">Submit -- Reference</v-btn>
					</v-form>
					</v-sheet>
					<hr class="my-5">
					<h1>EXPERIMENT</h1>
					<v-sheet width="300" color="background" class="mx-auto">
					
						<v-form validate-on="submit" @submit.prevent="submitNickname">
						
						<!-- <v-text-field 
							v-model="myNickname" 
							label="Your Nickname"`
							:rules="[value => checkApi(value)]"
						></v-text-field> -->

						<!-- This version is NOT finishing fieldLength(value) before the submitNickname() is executed -->
						<!-- <v-text-field 
							v-model="myNickname" 
							label="Your Nickname"
							:rules="[ value => checkApi(value), value => fieldLength(value)]"
						></v-text-field> -->

						<v-text-field 
							v-model="myNickname" 
							label="Your Nickname"
							:rules="[value => resetValidation(value).then(checkApiPromise(value)).then(fieldLengthPromise(value))]"
						></v-text-field>

						<!-- <v-text-field 
							v-model="myNickname" 
							label="Your Nickname"
							:rules="[value => checkApiPromise(value)]"
						></v-text-field>
						 -->



						<v-btn color="blue" type="submit" block class="mt-2">Submit -- Experiment</v-btn>
					</v-form>
					</v-sheet>

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
import { vModelCheckbox } from "vue";
Amplify.configure(awsconfig);

const { route, user, signOut } = toRefs(useAuthenticator());
const formFields = {
	signUp: {
		nickname: { order: 1 }, email: { order: 2 },
		password: { order: 3 }, confirm_password: { order: 4 }
	},
}
const myNickname = ref("")

let timeout: any = null
let userName: String = ""

async function submitX(event: Event) {
	const results = await event
	alert(JSON.stringify(results, null,2))
}

let submitOK: boolean = true;

async function resetValidation (userName: String) : Promise<any> {
	return new Promise(resolve => {
		enter("resetValidation")
		submitOK = true;
		exit("resetValidation")
		resolve(userName)
	})
}


async function checkApiPromise (userName: String) : Promise<any> {
	return new Promise(resolve => {
		enter("checkApiPromise() == ", userName) ; 
			if (!userName){
				exit("checkApi() - FAIL -- Empty UserName")
				submitOK = false;
				return resolve('Please enter a user name')
			}
			if (userName === 'kevin') {
				exit("checkApi() - FAIL -- Kevin: Invalid UserName")
				submitOK = false;
				return resolve('"kevin" has already been used. Try again') 
			}
			exit("checkApi() - PASS -- Empty Check & Invalid Kevin Check")
			resolve(true)
	})
}

function fieldLengthPromise(value: any ) /* : Promise<any> */  {
	return new Promise((resolve) => {
		enter("fieldLengthPromise()  == ", value)
		if (value.length <= 4) {
			info("   reject -- Length Check")
			exit("fieldLength()")
			submitOK = false;
			resolve("length validation error")
		} else {
			info("   resolve - Length Check")
			exit("fieldLength()")
			resolve(true)
		}
	})
}


// function dummy (v:any) {
// 	console.log("Dummy() == ", v) ; 
// 	// return "Failure to Verify"
// 	return true
// }

// function checkApi (userName: any) {
// 	enter("checkApi() == ", userName) ; 

// 	if (!userName) {
// 		exit("checkApi() - FAIL -- Empty UserName")
// 		return 'Please enter a user name'
// 	}
// 	if (userName === 'kevin') {
// 		exit("checkApi() - FAIL -- Kevin: Invalid UserName")
// 		return '"kevin" has already been used. Try again'
// 	}
// 	exit("checkApi() - PASS -- Empty Check & Invalid Kevin Check")
// 	return true
// }

// function fieldLength(value: any) {
// 	console.log("fieldLength Check -- Value == ", value)
// 		if (value.length <= 4) {
// 			info("reject -- Length Check")
// 			return("length validation error")
// 		} else {
// 			info("resolve - Length Check")
// 			return true
// 		}
// }




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
			// reject("length validation error")
			resolve("length validation error")
		} else {
			info("resolve - Length Check")
			// resolve(value)
			resolve(true)
		}
	})
}

async function submitNickname() {
	enter("submitNickname")

	info("submit OK == ", submitOK)
	if (!submitOK) { 
		exit("submitNickname quits")
		return }
	
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
											console.log(`%c   ${msg}`, "color: cyan;"), value }
					
					const enter =    	(msg: string, value: any = "") => { 
											console.log(`%cENTER >>>--> ${msg}`, "color: yellow;"), value }

					const exit =    	(msg: string, value: any = "") => { 
											console.log(`%c<--<<< EXIT - ${msg}`, "color: magenta;"), value }

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