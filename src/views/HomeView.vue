<template>
	<v-app>
		<MasterLayout>
			<h1 class="text-primary">Home Page Content</h1>
			<hr class="mb-10">

			<!-- <v-row v-if="route === 'authenticated'" justify="center">
				<v-spacer/>
				<v-col cols="8">
					<v-divider :thickness="10" class="ma-2"></v-divider>
					<v-row no-gutters>
						<v-col style="background-color: rgb(var(--v-theme-surface));"><p>Nick Name:</p></v-col>
						<v-col><p>{{ nicknameModel }}</p></v-col>
					</v-row>
							
					<v-divider :thickness="3" />
					<v-row no-gutters style="background-color:rgb(var(--v-theme-surface));"><p class="ma-auto">Email:</p></v-row>
					<v-row no-gutters><p class="ma-auto">{{ emailModel }}</p></v-row>
					
					<v-divider :thickness="3" />
					<v-row no-gutters style="background-color: rgb(var(--v-theme-surface));"><p class="ma-auto">Phone Number:</p></v-row>
					<v-row no-gutters ><p class="ma-auto">{{ phone_numberModel }}</p></v-row>
					
					<v-divider :thickness="3" />
					<v-row no-gutters style="background-color: rgb(var(--v-theme-surface));"><p class="ma-auto">User Name:</p></v-row>
					<v-row no-gutters ><p class="ma-auto">{{ usernameModel }}</p></v-row>

					<v-divider :thickness="10"></v-divider>
				</v-col>
				<v-spacer/>
			</v-row> -->
			<v-row no-gutters >
				<v-col cols="3" >
					<v-card style="background-color: rgb(var(--v-theme-surface_alt));" color="border_alt" variant="outlined" >
						<v-tabs color="primary" bg-color="surface" fixed-tabs v-model="SignInSignUpTab" >
							<v-tab value="signin">Sign In</v-tab>
							<v-tab value="signup">Sign Up</v-tab>
						</v-tabs>
						<v-card-text >
							<v-window v-model="SignInSignUpTab">
								<v-window-item value="signin">
									<v-row no-gutters>
										<v-col cols="12">
											<v-text-field id="usernameId" clearable density="compact" variant="outlined" label="User name" hint="example: kevinbowe1" /></v-col>

										<v-col cols="12">
											<v-text-field 
												v-model="DEBUG_password"
												:append-inner-icon="DEBUG_show1 ? 'mdi-eye' : 'mdi-eye-off'"
												prepend-inner-icon="mdi-lock-outline"
												:type="DEBUG_show1 ? 'text' : 'password'" 
												@click:append-inner="DEBUG_show1 = !DEBUG_show1"
												clearable density="compact" variant="outlined" label="Password" required 
											></v-text-field></v-col>



											<v-btn size="large" color="primary" block class="mb-3" @click="DEBUG_dialog = false" > Sign In </v-btn>
										

									</v-row>
								</v-window-item>
								<v-window-item value="signup">
									<v-row no-gutters>
										<v-col cols="12">
											<v-text-field 
												v-model="DEBUG_password1"
												:append-inner-icon="DEBUG_show11 ? 'mdi-eye' : 'mdi-eye-off'"
												prepend-inner-icon="mdi-lock-outline"
												:type="DEBUG_show11 ? 'text' : 'password'" 
												@click:append-inner="DEBUG_show11 = !DEBUG_show11"
												clearable density="compact" variant="outlined" label="Password*" required >
											</v-text-field></v-col>

										<v-col cols="12">
											<v-text-field 
											v-model="DEBUG_password2"
												:append-inner-icon="DEBUG_show12 ? 'mdi-eye' : 'mdi-eye-off'"
												prepend-inner-icon="mdi-lock-outline"
												:type="DEBUG_show12 ? 'text' : 'password'" 
												@click:append-inner="DEBUG_show12 = !DEBUG_show12"
												clearable density="compact" variant="outlined" label="Confirm Password*" required >
											</v-text-field></v-col>
										
										<v-col cols="12">
											<v-text-field clearable density="compact" variant="outlined" label="Email" required /></v-col>
										<v-col cols="12">
											<v-text-field clearable density="compact" variant="outlined" label="Username" required /></v-col>
										<v-col cols="12">
											<v-text-field clearable density="compact" variant="outlined" label="Phone number"/></v-col>
										<v-col cols="12">
											<v-text-field clearable density="compact" variant="outlined" label="Nickname"/></v-col>
										<v-btn block size="large" color="primary" class="mb-3" @click="DEBUG_dialog = false" > Sign Up </v-btn>
									</v-row>
								</v-window-item>
							</v-window>
						</v-card-text>
					</v-card>
				</v-col>
				<v-col cols="3">
					<authenticator :services="services" initialState="signUp" :formFields="formFields" >
						<template v-slot:sign-up-fields>
							<authenticator-sign-up-form-fields />
							
							<p style="margin-bottom:-.75em;color:grey">Phone number</p>
							<v-text-field
								style="box-shadow:none;"
								class="signup-nickname"
								:rules="[ /* Phone Number Validation */ ]"
								placeholder="( optional )"
								name="phone_number"
								hint="Short & Simple" 
								variant="outlined" 
								density="compact" 
								v-model="workingPhone_numberModel" 
							></v-text-field>

							<p style="margin-bottom:-.75em;color:grey;">Nickname</p>
							<v-text-field 
								class="signup-nickname"
								:rules="[ value => checkReservedNickname(value), value => checkShortNickname(value), value => checkFirstChar(value), value => checkSpecialChars(value) ]"
								placeholder="( optional )"
								name="nickname"
								hint="Short & Simple" variant="outlined" density="compact" v-model="workingNicknameModel" >
							</v-text-field>
						</template>
					</authenticator>
				</v-col>
			</v-row>

			<v-row no-gutters >
				<v-spacer></v-spacer>
				<v-col cols="8">
					<div v-if="route === 'authenticated'">
						<v-btn class="mt-3" v-if="route === 'authenticated'" color="primary" @click="signOut">Sign Out</v-btn>
					</div>
					<!-- <ThemeChanger /> -->
				</v-col>
				<v-spacer></v-spacer>
			</v-row>
		
		</MasterLayout>
	</v-app>
</template>

<script setup lang="ts">
import MasterLayout from "../layouts/MasterLayout.vue";
import { toRefs, ref, Ref, computed } from 'vue'
				/*  */
import { info, infor , infog, infob, infoy, infoo, infop, infom,
			info1, info2 , info3, info4, info5, info6, info7,
			log, warn, err , progress, joy, enter, exit,
			success, bar, whitebar, fini, start, pass, fail }
	from "../my-util-code/MyConsoleUtil"
				/*  */
import ThemeChanger from "../components/ThemeChanger.vue";
				/*  */
import { AuthenticatorSignUpFormFields, SignIn, useAuthenticator, AmplifyCheckBox, translations} from '@aws-amplify/ui-vue';
import { Amplify, Auth, Hub, I18n } from 'aws-amplify';
import awsconfig from '../aws-exports';
import "@aws-amplify/ui-vue/styles.css";

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
import * as AWS from "@aws-sdk/client-cognito-identity-provider";
import { registerLayouts } from "../layouts/register";
import router from "../router";

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
I18n.putVocabularies(translations)
I18n.setLanguage('en')
I18n.putVocabulariesForLanguage('en', {
  'Create Account': 'Sign Up', // Tab header
});

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
Amplify.configure(awsconfig);

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

							const DEBUG_show1 = ref(false)
							const DEBUG_password = ref("")
							//
							const DEBUG_show11 = ref(false)
							const DEBUG_password1 = ref("")
							//
							const DEBUG_show12 = ref(false)
							const DEBUG_password2 = ref("")
							//
							const DEBUG_dialog = ref(false)
							const SignInSignUpTab = ref()

const { route, user, signOut, validationErrors } = toRefs(useAuthenticator());
const formFields = {
	signUp: {
		// username: { order: 1},
		password: { order: 2 }, 
		confirm_password: { order: 3 },
		email: { order: 4 },
		// phone_number: { order: 5 },
		// nickname: { order:6 }
	},
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const services = {
	async validateCustomSignUp(formData) {
		if (formData.nickname) {
			//				This is going to return an ValidationError string 
			//				--OR-- a "passed validation" boolean true.
			let nicknameValidationRtn = await Promise.all( [
						checkReservedNickname(formData.nickname),
						checkShortNickname(formData.nickname),
						checkSpecialChars (formData.nickname),
					]).then (resultArray => {
						// This return exists to await Promise.all()
						return checkValidationResults(resultArray)
			} )
			//			At this point we have a validation error message "string" == fail
			//			--OR-- a validation passed "boolean".
			if(typeof nicknameValidationRtn == 'boolean') {
				//			Update the nicknameModel
				// nicknameModel.value = formData.myNickname
				nicknameModel.value = formData.nickname
			} else {
				return nicknameValidationRtn
			}
		}
	},
};

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
function checkValidationResults(resultsArray) {
		for(let i = 0; i <= resultsArray.length; i++) {
			if (typeof resultsArray[i] == 'string'){
				// This return exits the '.then'
				return resultsArray[i]
			}
		}
		return true
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
async function submitNickname(event) {

		const results = await event
		if(!results.valid) return
		
		// This will return the user in the user pool (not updated )
		const newuser = await Auth.currentAuthenticatedUser({bypassCache: true /* false */});
		await Auth.updateUserAttributes(newuser, {'nickname': workingNicknameModel.value })
		await Auth.currentUserInfo().then(result => {
			nicknameModel.value = result.attributes.nickname
		}) // END_THEN

		//				Redirect to Profile page.
		//				Pass the new nickname and the email-address
		router.push({name:`profile`, params: {
		 				p1:nicknameModel.value, 
						p2:emailModel.value, 
						p3:phone_numberModel.value,
						p4:usernameModel.value
		}  }) 
}	
async function checkReservedNickname (workingNickname) {
		if (workingNickname === 'kevin') {
			return 'User nickname reserved. Please try another one.'
		}
		return true
}
async function checkShortNickname (workingNickname) {
		if (workingNickname.length > 0 && workingNickname.length <= 3) {
			return 'User nickname is too short. Please try another one.'
		}
		return true
}
async function checkFirstChar (workingNickname) {
		if (!isNaN(workingNickname[0])) {
			return 'User nickname can not begin with a Number. Please try another one.'
		}
		return true
}
async function checkSpecialChars (workingNickname) {
		const re = /[!@#$%\^&*(){}[\]<>?/|]/
		const match = workingNickname.match(re)
		// Check the format
		if(match) {
			return 'User nickname can not contain special characters. Please try another one.'
		}
		return true
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
Hub.listen('auth', (data) => {
		switch(data.payload.event) {
			// case "signUp" :
			// case "confirmSignUp" :
			// case "autoSignIn" :

			/* First Sign In (Sign Up workflow) */
			case "signIn" :
				// Does the nicknameModel exist?
				if (!!nicknameModel.value.length) { 
					//
					// 			If we get here, the nicknameModel exists.
					//				This only happens during the SignUp work flow.
					UpdateNickname(nicknameModel) 
					Auth.currentAuthenticatedUser({bypassCache: true /* false */})

					emailModel.value = data.payload.data.attributes.email
					nicknameModel.value = data.payload.data.attributes.nickname
					phone_numberModel.value = data.payload.data.attributes.phone_number
					usernameModel.value = data.payload.data.username
					
					router.push({name:`profile`, params: {
									p1:nicknameModel.value, 
									p2:emailModel.value,
									p3:phone_numberModel.value,
									p4:usernameModel.value
			 					}  }) 
				}

				/* Normal SignIn */
				Auth.currentAuthenticatedUser({bypassCache: true /* false */}).then(results => {
					emailModel.value = results.attributes.email
					workingNicknameModel.value =  data.payload.data.attributes.nickname
					nicknameModel.value =  data.payload.data.attributes.nickname
					phone_numberModel.value = data.payload.data.attributes.phone_number
					usernameModel.value = data.payload.data.attributes.preferred_username 
							? data.payload.data.attributes.preferred_username 
							: data.payload.data.username
				})
				return
			case "signOut" :
				workingNicknameModel.value = nicknameModel.value = ""
				return
			} // END_SWITCH
})
						
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
async function UpdateNickname(nicknameModel){
		// 			This will return the user in the user pool (not updated )
		const newuser = await Auth.currentAuthenticatedUser({bypassCache: true /* false */});
		await Auth.updateUserAttributes(newuser, {'nickname': nicknameModel.value })
		await Auth.currentUserInfo().then(result => {
			nicknameModel.value = result.attributes.nickname
			workingNicknameModel.value = result.attributes.nickname
		}) // END_THEN
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const usernameModel = ref("")
const phone_numberModel = ref("")
const workingPhone_numberModel = ref("")
const workingNicknameModel = ref("")
const nicknameModel = ref("")
const emailModel = ref("")
const resetNickname = () => { workingNicknameModel.value = nicknameModel.value }

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/* Decl getSession */
async function getSession(){
	const cognitoAccessToken = await Auth.currentSession()
	.then(currenSession => {
		return currenSession .getAccessToken() .getJwtToken()})
		.catch(err => { return err})
		if (cognitoAccessToken === "No current user"){
			info("There is no session available")
			return "" 
		}
		
		//					If we get here, we are signed in. There is a session available.
		
	return await Auth.currentAuthenticatedUser({bypassCache: true /* false */})
		.then((user) => {
			return {
				"nickname": user.attributes?.nickname,
				"email": user.attributes?.email,
				"phone_number": user.attributes?.phone_number,
				"username": user.preferred_username ? user.preferred_username : user.username	
			}
		})
	};
	
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/* Execute getSession() */
getSession().then( (result) => { 
	nicknameModel.value = result.nickname
	workingNicknameModel.value = result.nickname
	emailModel.value = result.email
	phone_numberModel.value = result.phone_number
	return result
})
</script>

<style>
	.amplify-button--link { color: rgb(var(--v-theme-primary)); }
	.amplify-button[data-variation='primary'] { background-color: rgb(var(--v-theme-primary)); }
	.amplify-tabs-item { color: rgb(var(--v-theme-primary)); }
	.amplify-tabs-item:focus { color: rgb(var(--v-theme-primary)); }
	.amplify-tabs-item:hover { color: rgb(var(--v-theme-primary)); }
	.amplify-tabs-item[data-state=inactive] { 
		color: rgb(var(--v-theme-primary)); 
		border-color: rgb(var(--v-theme-primary));
		background-color: #E0E0E0;
		/* border-bottom-width: 5px; */
	}
	.amplify-tabs-item[data-state=active] { 
		color: rgb(var(--v-theme-primary)); 
		border-color: rgb(var(--v-theme-primary));
		border-top-width: 5px;
		/* border-right-width: 5px; ; */
	}
	/* 
	.amplify-alert--error {
			color: black;
			background-color: rgb(var(--v-theme-error));
	} */
	/* .v-input { margin-top: 2px;}
	.signup-nickname input {text-align: center;} */
	.v-input { margin-top: 2px;}
	.signup-nickname input {
		/* box-sizing: border-box; */
		color: var(--amplify-components-fieldcontrol-color);
		/* font-size: var(--amplify-components-fieldcontrol-font-size); */
		/* line-height: var(--amplify-components-fieldcontrol-line-height); */
		/* padding-block-start: var(--amplify-components-fieldcontrol-padding-block-start); */
		/* padding-block-end: var(--amplify-components-fieldcontrol-padding-block-end); */
		/* padding-inline-start: var(--amplify-components-fieldcontrol-padding-inline-start); */
		/* padding-inline-end: var(--amplify-components-fieldcontrol-padding-inline-end); */

		border-color: var(--amplify-components-fieldcontrol-border-color);
		border-style: var(--amplify-components-fieldcontrol-border-style);
		border-width: var(--amplify-components-fieldcontrol-border-width);
	}
	/* .signup-nickname input {
		border-color:  var(--amplify-components-fieldcontrol-border-color);
		
		background-color: lightgoldenrodyellow;
		text-align: center;
		border-style:solid;
		border-width:thick;
		border-color:red;
		color:black;

		color: var(--amplify-components-fieldcontrol-color);
		border-width: var(--amplify-components-fieldcontrol-border-width);
		border-style: var(--amplify-components-fieldcontrol-border-style);
		outline-offset: var(--amplify-components-fieldcontrol-outline-offset);
	} */
	/* .amplify-input {
		border-color:green;
	} */
	.v-slide-group-item--active {
		background-color: rgb(var(--v-theme-surface_alt));
		color: rgb(var(--v-theme-background));
	}
	.v-tab__slider {
		top: 0;
		height:4px;
	}
</style>