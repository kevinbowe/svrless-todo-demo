<template>
<v-app>
<MasterLayout>
<v-row justify="center">
	<v-col cols="6">

		<ThemeChanger />
		<ThemePreview />

					<!-- Use this for Async -- prevents page load
					BAD -- This is letting data that failed validation to be updated. 
					Fixed -- Set flag, isValid, and check flag before submitNickname() continues.
					The @submit.prevent stops the form from executing the default submission behavior followed by a Page reload.
					sunmitNickname is called insted of the submittion behavior.
					-->
					<!-- <v-form validate-on="submit" @submit.prevent="submitNickname"> -->
					
					<v-form validate-on="submit" @submit.prevent="callRulePromise(myNickname)">
					<!-- This will allow single character checks but will not execute the event until pressing select.
					The handler runs regardless of the validation status (true or false) 
					BAD -- This is letting data that filed validation to be updated. -->
					<!-- <v-form @submit.prevent="submitNickname"> -->

					<!-- This will validate the input when the submit button is selected.
					The event handler is NOT called.
					It COULD be placed in the validator but that doesn't seem correct. 
					A page load is executed when validation is sucessful 
					BAD -- This is performing validation but failing to update data when validation passes. -->
					<!-- <v-form validate-on="submit"> -->
						<!-- <v-text-field
							v-model="myNickname"
							:WORKS_THREE_rules="myNicknameRules"
							:WORKS_TWO_rules=[aRule]
							:FAIL_ONE_rules=[aRulePromise]
							:FAIL_TWO_rules=[callRulePromise]
							label="Your Nickname"
						></v-text-field> -->
						<v-text-field
							v-model="myNickname"
							label="Your Nickname"
						></v-text-field>
						<v-btn type="submit" block class="mt-2">Submit</v-btn>
					</v-form>
					<hr>
					<!-- <p><v-btn @click="callRulePromise('valid string')" /></p> -->

	</v-col>
	<v-col cols="6">

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

	</v-col>

</v-row>
</MasterLayout>
</v-app>
</template>

<script setup lang="ts">
	import MasterLayout from "../layouts/MasterLayout.vue";
	import ThemeChanger from "../components/ThemeChanger.vue";
	import ThemePreview from "../components/ThemePreview.vue";
	import {	AuthenticatorSignUpFormFields, useAuthenticator } from '@aws-amplify/ui-vue';
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
		nickname: { order:1 },  email: { order:2 }, 
		password: { order: 3 }, confirm_password: { order: 4 } }, }
	
	async function submitNickname() { 
		// These will be displayed and then QUICKLY CLEARED bcs of a screen refresh/load.
		//...console.log("The myNickname Input -- ", myNickname.value)
		//...console.log("Start updating User Auth >>>-->")
		//...console.log("isValid Flag == ", isValid)
		//...if(!isValid) return

		console.log("%cexecuting updateUserAttributes == ", "color: black; background-color:orange;", myNickname.value)
		// const user = await Auth.currentAuthenticatedUser();
		// await Auth.updateUserAttributes( user, {'nickname':myNickname.value } );
	}
	const myNickname = ref("")
				//let isValid:boolean = false

				// const aRule = (value: String) => {
				// 	if (value) return true
				// 	return "aRule Fail Message"
				// }

				// const aRulePromise__ONE = new Promise( ( resolve, reject ) => { setTimeout( () => { resolve("Success!") }, 300 ) } )
				// const aRulePromise__TWO = new Promise( ( resolve, reject ) => { testFieldEmptyTWO( "A test string"); resolve("success!") } )
				// const aRulePromise__THREE_WORKS = new Promise( ( resolve, reject ) => { resolve(testFieldEmptyTWO( i )) } )

				// const i = "inputStr"
				// const i = "abc"
				// const i = null
				

				// function callRulePromise__ONE__WORKS__(){ aRulePromise(i).then((successMessage) => log("The resolve message == ", successMessage))	}
				// function aRulePromise__TWO__WORKS__(i: String) { let rtn = testFieldEmptyTWO(i); return new Promise( (resolve, reject) => resolve(rtn)) }


				function testFieldEmptyTWO(value: String) { 
					if (value === null || value.length === 0) return "empty validation error"
					return true
				}

				// function aRulePromise(i: String) { 
				// 	log("myNicknme input == ",i)
				// 	return new Promise( (resolve, reject) => {
				// 		let rtn = testFieldEmptyTWO(i); 
				// 		if (typeof rtn === "boolean"){
				// 			info("resolve - Empty Check",null)
				// 			 resolve(i)
				// 		} else {
				// 		err("reject -- Empty Check")
				// 		reject(rtn) 
				// 		}
				// 	}
				// )}

			
			function testFieldExists(i: String) {
				log("myNicknme input == ",i)
				return new Promise ((resolve, reject) => {
					if (i === null || i.length === 0) {
						info("reject -- Empty Check")
						reject("empty validation error") 
					} else {
						info("resolve - Empty Check")
						resolve(i)
					}
				})
			}




			function callRulePromise(i: string){
				// aRulePromise(i)
				testFieldExists(i)
					.then( testFieldLength )
					.then( submitNickname )
					.then( (successMessage) => log("Final resolve message == ", successMessage) )
					.catch( function(error) {
						console.error(error)
					})
			}




			function testFieldLength (value: any) { 
				console.log("testFieldLengthTWO Check -- Value == ", value)
				return new Promise((resolve,reject) => {
					if (value.length <= 4) {
						info("reject -- Length Check")
						reject("length validation error")
					} else {
						info("resolve - Length Check")
						resolve(value)
					}
				})
			}

			// function testFieldLengthTWO(value: any) { 
			// 	console.log("testFieldLengthTWO Check -- Value == ", value)
			// 	if (value.length <=4 ) {
			// 		return "length validation error"
			// 	}
			// 	return true
			// }


													// function testRulesPromise(value: String) { return new Promise(resolve => { testFieldEmpty(value) }) }
													// function testFieldEmpty(value: String) { isValid = value ? true : false	}
													// function testFieldLength(value:any) { isValid = value.length >= 4 ? true : false; return isValid }

	// const myNicknameRules = [ 
	// 	(value: String) => {
	// 		let rtn = fieldEmpty(value)
	// 		if ( typeof rtn === "string" ) return rtn
	// 		return fieldLength(value)
	// 	}
	// ]

	// function fieldEmpty(value:String){
	// 	console.warn("Start Empty Validation >>>-->")
	// 	if (value) {
	// 		console.log("%c<--<<< Exit Empty Validation -- SUCCESS", "color: black; background-color:green;")
	// 		isValid = true
	// 		return true
	// 	}
	// 	console.error("<--<<< Exit Empty Validation -- FAIL")
	// 	isValid = false
	// 	return 'Nickname required...'
	// }

	// function fieldLength(value:String){
	// 	console.warn("Start Length Validation >>>-->")
	// 	if (value.length >= 4) {
	// 		console.log("%c<--<<< Exit Length Validation -- SUCCESS", "color: black; background-color:green;")
	// 		isValid = true
	// 		return true
	// 	}
	// 	console.error("<--<<< Exit Length Validation -- FAIL")
	// 	isValid = false
	// 	return 'Nickname is too short required...'
	// }

	//... ORIGINAL
	//		These rules are applied to a specific <v-text-field>.
	//		Special datatypes can have special rules (zip codes, phone-numbers)
	const myNicknameRules__ORG__ = [ 
		(value: String) => {
			console.warn("Start Validation >>>-->")
			if (value) {
				console.log("%c<--<<< Exit Validation -- SUCCESS", "color: black; background-color:green;")
				// isValid = true
				return true
			}
			console.error("<--<<< Exit Validation -- FAIL")
			// isValid = false
			return 'Nickname required...'
		}
	]
							const log = console.log;
							const warn = console.warn;
							const err = console.error;
							
							function joy (msg:string,value:any){ console.log(`%c${msg}`,"color: black; background-color:orange;", value) }

							const info = (msg:string, value:any = "") => { console.log(`%c${msg}`,"color: cyan;"), value }
							
							const success = (msg:string, value:any) => { console.log(`%c${msg}`,"color: black; background-color:green;", value) }
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