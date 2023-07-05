<template>
	<v-app>
		<MasterLayout>
			<h1 class="text-primary">Home Page Content</h1>
			<hr class="mb-10">
			<v-row justify="center" v-if="usernameModel">
				<v-spacer/>
				<v-col cols="8">
					<v-divider :thickness="10" class="ma-2"></v-divider>
					<v-row no-gutters>
						<v-col style="background-color: rgb(var(--v-theme-surface)); color: rgb(var(--v-theme-border_alt));">
							<p>Nick Name:</p></v-col>
						<v-col>
							<p>{{ nicknameModel }}</p></v-col>
					</v-row>
							
					<v-divider :thickness="3" />
					<v-row no-gutters style="background-color:rgb(var(--v-theme-surface)); color: rgb(var(--v-theme-border_alt));">
						<p class="ma-auto">Email:</p></v-row>
					<v-row no-gutters><p class="ma-auto">{{ emailModel }}</p></v-row>
					
					<v-divider :thickness="3" />
					<v-row no-gutters style="background-color: rgb(var(--v-theme-surface)); color: rgb(var(--v-theme-border_alt));">
						<p class="ma-auto">Phone Number:</p></v-row>
					<v-row no-gutters ><p class="ma-auto">{{ phone_numberModel }}</p></v-row>
					
					<v-divider :thickness="3" />
					<v-row no-gutters style="background-color: rgb(var(--v-theme-surface)); color: rgb(var(--v-theme-border_alt));">
						<p class="ma-auto">User Name:</p></v-row>
					<v-row no-gutters ><p class="ma-auto">{{ usernameModel }}</p></v-row>

					<v-divider :thickness="10"></v-divider>
				</v-col>
				<v-spacer/>
			</v-row>
			<v-row no-gutters v-if="!usernameModel" >
				<v-col cols="4" class="ma-auto" >
					<v-card style="background-color: rgb(var(--v-theme-surface_alt));" color="border_alt" variant="outlined" >
						<v-tabs color="primary" bg-color="surface" fixed-tabs v-model="SignInSignUpTab" >
							<v-tab value="signinTab">Sign In</v-tab>
							<v-tab value="signupTab">Sign Up</v-tab>
						</v-tabs>
						<v-card-text >
							<v-window  v-model="SignInSignUpTab">
								<v-window-item __SIGN_IN__ value="signinTab">
									<v-row no-gutters>
										<v-col cols="12">
											<v-text-field 
												id="userSignInId"
												v-model="workingUsernameModel"
												clearable 
												density="compact" 
												variant="outlined" 
												label="Username" 
												required
											/></v-col>

										<v-col cols="12">
											<v-text-field 
												id="passwordSignInId"
												v-model="workingPasswordModel"
												:append-inner-icon="DEBUG_show1 ? 'mdi-eye' : 'mdi-eye-off'"
												prepend-inner-icon="mdi-lock-outline"
												:type="DEBUG_show1 ? 'text' : 'password'" 
												@click:append-inner="DEBUG_show1 = !DEBUG_show1"
												clearable density="compact" variant="outlined" label="Password" required 
											/></v-col>
											<v-btn size="large" color="primary" block class="mb-3" @click="AccountSignIn" > Sign In </v-btn>

									</v-row>
								</v-window-item>
								
								<v-window-item __SIGN_UP__ value="signup">
									<v-row no-gutters>
										<v-col cols="12">
											<v-text-field 
												_v-model="DEBUG_password1"
												v-model="workingPasswordModel"
												:append-inner-icon="DEBUG_show11 ? 'mdi-eye' : 'mdi-eye-off'"
												prepend-inner-icon="mdi-lock-outline"
												:type="DEBUG_show11 ? 'text' : 'password'" 
												@click:append-inner="DEBUG_show11 = !DEBUG_show11"
												clearable density="compact" variant="outlined" label="Password*" required >
											</v-text-field></v-col>

										<v-col cols="12">
											<v-text-field 
											_v-model="DEBUG_password2"
											v-model="workingPasswordModel2"
												:append-inner-icon="DEBUG_show12 ? 'mdi-eye' : 'mdi-eye-off'"
												prepend-inner-icon="mdi-lock-outline"
												:type="DEBUG_show12 ? 'text' : 'password'" 
												@click:append-inner="DEBUG_show12 = !DEBUG_show12"
												clearable density="compact" variant="outlined" label="Confirm Password*" required >
											</v-text-field></v-col>
										
										<v-col cols="12">
											<v-text-field 
												id="emailSuId"
												v-model="workingEmailModel"
												clearable density="compact" variant="outlined" label="Email" required 
											/>
										</v-col>
										<v-col cols="12">
											<v-text-field 
												id="usernameSuId"
												v-model="workingUsernameModel"
												clearable 
												density="compact" 
												variant="outlined" 
												label="Username" 
												required />
										</v-col>
										<v-col cols="12">
											<v-text-field 
												id="phone_numberSuId"
												v-model="workingPhone_numberModel"
												clearable density="compact" variant="outlined" label="Phone number"/></v-col>
										<v-col cols="12">
											<v-text-field 
												id="nicknameSuId"
												v-model="workingNicknameModel"
												clearable density="compact" variant="outlined" label="Nickname"/></v-col>

										<v-btn block size="large" color="primary" class="mb-3" @click="AccountSignUp" > Sign Up </v-btn>

									</v-row>
								</v-window-item>
							</v-window>
						</v-card-text>
					</v-card>
				</v-col>
			</v-row>
			<!-- Confirmation -->
			<v-row justify="center" _v-if="!toggleConfirm" __v-if="!usernameModel">
				<v-overlay class="align-center justify-center" v-model="toggleConfirm" >

					<v-sheet width="30em" style="height:23em;" color="surface_alt" _color="background" elevation="24" >
					<!-- <v-sheet width="30em" :style="{height:!EmailConfirmationMessage.Title.value?'28em':'23em'}" color="background" elevation="24" > -->

					<v-row>
							<v-spacer></v-spacer>
							<v-btn __THIS_IS_THE_X_IN_UPPER_RIGHT__ 
								class="mr-3" icon="$close" size="large" variant="text" @click="toggleConfirm=false"></v-btn>
						</v-row>

						<v-col _cols="6" style="margin-top:-2.5em;">

							<!-- <v-row class="mx-5 mb-5"> -->
								<!-- <h1 class="ma-auto" v-html="EmailConfirmationMessage.Title.value"></h1>
								<p v-html="EmailConfirmationMessage.Message.value"></p> -->
								<!-- <h1 class="ma-auto">Hello</h1>
								<p>Message</p>
							</v-row> -->
							<v-row class="justify-center">Confirmation Code</v-row>
							<v-row ><v-spacer></v-spacer><v-col cols="11">
								<v-text-field v-model="confirmCodeModel"
									id="ConfCode" placeholder="Enter your code" class="mb-2" style="height:1.75em;" variant="outlined" clearable density="compact">
								</v-text-field>
							</v-col><v-spacer></v-spacer></v-row>

							<v-row class="mx-5">
								<v-btn :disabled="!confirmCodeModel" @click="AccountConfirmSignUp" block color="primary" class="mb-2" >
									Confirm
								</v-btn>
							</v-row>

							<!-- <v-row class="mx-5" >
								<v-btn :disabled="!workingEmailModel" @click="resendEmailConfirmationCode" block color="background" class="mb-2" >
									Resend Code
								</v-btn>
							</v-row> -->

						</v-col>
					</v-sheet>
				</v-overlay>
			</v-row>



			<!-- Sign Out -->
			<v-row no-gutters v-if="usernameModel">
				<v-spacer></v-spacer>
				<v-col cols="8"><div> <v-btn class="mt-3" color="primary" @click="AccountSignOut">
					Sign Out</v-btn></div></v-col>
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
import { Amplify, Auth, Hub, I18n, } from 'aws-amplify';
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
const workingUsernameModel = ref("")
const workingPasswordModel = ref("")
const workingPasswordModel2 = ref("")
const workingEmailModel =ref("")
// const workingNicknameModel = ref("")
const workingPhone_numberModel = ref("")
const toggleConfirm:boolean = ref(false)
const confirmCodeModel:Number = ref()
const EmailConfirmationMessage = { Title: ref(""), Message: ref("") }



const AccountSignOut = async () => {
	try { await Auth.signOut()
		.then(result => {
			emailModel.value = ""
			nicknameModel.value = ""
			usernameModel.value = ""
			phone_numberModel.value = ""
			workingEmailModel.value = ""

			workingNicknameModel.value = ""
			workingPasswordModel.value = ""
			workingPasswordModel2.value = ""
			workingPhone_numberModel.value = ""
			workingUsernameModel.value = ""
			toggleConfirm.value = false
		})
	} 
	catch (error) { console.log('error signing out: ', error);}
}

const AccountSignIn = async () => {
					enter("AccountSignOn")
	try { const user = await Auth.signIn(workingUsernameModel.value, workingPasswordModel.value);
					info("   Username", user.username)
					info("   Preferred_username", user.attributes.preferred_username)
					info("   eMail", user.attributes.email)
					info("   Phone number", user.attributes.phone_number)
					info("   Nickname", user.attributes.nickname)
	} catch (error) { console.log('error signing in', error); }
}
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const AccountSignUp = async () => {
	/**
	 * 		usernameModel
	 *		workingUsernameModel

	 * 		preferred_usernameModel
	 *		workingPreferred_usernameModel

	 * 		emailModel
	 *		workingEmailModel
	 * 
	 * 		phone_numberModel
	 * 	workingPhone_numberModel
	 * 				workingPhone_number ------ REFACTOR
	 * 				workingPhonenumberModel -- REFACTOR
	 * 
	 * 		nicknameModel
	 * 	workingNicknameModel
	 * 
	 * 		<-no passwordModel->
	 * 	workingPasswordModel
	 * 
	 * 		<-no passwordModel2->
	 * 	workingPasswordModel2 -- ADD THIS
	 * 
	 */
					info1("workingPasswordModel --> ",workingPasswordModel.value)
					info2("workingPasswordModel2 --> ",workingPasswordModel2.value)
					info3("workingEmailModel --> ",workingEmailModel.value)
					info4("workingUsernameModel --> ",workingUsernameModel.value)
					info5("workingPhone_numberModel --> ",workingPhone_numberModel.value)
					//	Deal with this later in the journey
					info6("workingNicknameModel --> ",workingNicknameModel.value)
	try {

	

		const { user } = await Auth.signUp({
			username: workingUsernameModel.value,
			password: workingPasswordModel.value,
			attributes: {
				email: workingEmailModel.value,
				phone_number: workingPhone_numberModel.value,
			},

			autoSignIn: { // optional - enables auto sign in after user is confirmed
				enabled: true,
			}
		})
		console.log(user);
	} catch (error) {
		console.log('error signing up:', error);
	}
}


/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const parseEmail = (email) => {
	const regex = new RegExp('^(?<name>.*)@(?<domain>.*)', 'gm')
	let match = regex.exec(email)
	if (match) return { name: match.groups.name, domain: match.groups.domain }
	return null
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const buildEmailConfirmationMessage = (email:string) => {
	if(email) {
		//			If we get here, the email arg contains data.
		let {name , domain} = parseEmail(email)
		let obscureEmail = `${name[0]}***@${domain[0]}***`
		EmailConfirmationMessage.Title.value = "We Emailed You"
		EmailConfirmationMessage.Message.value =
			`Your code is on the way. To confirm your email address change, `+
			`enter the code we emailed to <b>${obscureEmail}</b>.`+
			`<br>This may take a minuet to arrive.`
		return EmailConfirmationMessage
	}
	//				No Title should be included with this message.
	let message =
		`To confirm your email address change, you <b>MUST</b> enter the `+
		`code we emailed to the new email address you provided.<br><br>` +

		`<h2>Resend Code: Not available.</h2>`+

		`Your new email is not accessable to the application. To generate `+
		`a confirmation code, close this popup and update the email again. `+
		`You can use the same email.`
	EmailConfirmationMessage.Message.value = message
	return EmailConfirmationMessage
}


/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const resendEmailConfirmationCode = async () => {
	const user = await Auth.currentAuthenticatedUser();
	await Auth.updateUserAttributes(user, { email: workingEmailModel.value });
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

async function AccountConfirmSignUp() {
  try {

					info("workingUsernameModel.value", workingUsernameModel.value)
					info("confirmCodeModel.value > ",confirmCodeModel.value)
    await Auth.confirmSignUp(workingUsernameModel.value, confirmCodeModel.value)
	 .then(result => {
		workingEmailModel.value = ""
		workingNicknameModel.value = ""
		workingPasswordModel.value = ""
		workingPasswordModel2.value = ""
		workingPhone_numberModel.value = ""
		workingUsernameModel.value = ""
	 });
	//				When this is done, clear ALL working data.

  } catch (error) {
    console.log('error confirming sign up', error);
  }
}






/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const setEmailConfirmed = async function () {
						enter("setEmailConfirmed > confirmCodeModel.value > ", confirmCodeModel.value)

	await Auth.verifyCurrentUserAttributeSubmit('email', `${confirmCodeModel.value}`)
		.then((response) => {
						enter("verifyCurrentUserAttributeSubmit.then()")

			toggleConfirm.value = false
			confirmCodeModel.value = null
			emailModel.value = workingEmailModel.value
			if (!emailModel.value)
				Auth.currentUserInfo().then((response) => emailModel.value = response.attributes.email)
		})
		.catch((e) => {
						err("verifyCurrentUserAttributeSubmit > Catch > ",e)
			alert(`ERROR -- Invalid Confirmation Code [ ${confirmCodeModel.value} ] -- ${e}` )
		})
	return
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
			case "signUp" :
				enter("Hub.listen --> case: Sign Up")
				confirmCodeModel.value = null
				toggleConfirm.value = true
				return

			case "confirmSignUp" :
				enter("Hub.listen --> case: confirm Sign Up")
				toggleConfirm.value = false
				return

			case "autoSignIn" :
				enter("Hub.listen --> case: auto Sign In")
				return

			/* First Sign In (Sign Up workflow) */
			case "signIn" :
				enter("Hub.listen --> case: Sign In")
				// Does the nicknameModel exist?
				// if (!!nicknameModel.value.length) { 
				if (nicknameModel.value && nicknameModel.value.length > 0) { 
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
								enter("Hub.listen --> case: Sign In --> Normal")
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
				enter("Hub.listen --> case: Sign Out")
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
const workingPhonenumberModel = ref("")
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

			/*				If we get here, hide these items: User Info, Confirm, SignOut
			*/

			info("There is no session available")
			return "" 
		}
		
		/*					If we get here, we are signed in. 
							There is a session available.
							Hide these items: SignIn, SignUp, Confirm
							----
							Show these items: SignOut, User Info
		*/
		
	return await Auth.currentAuthenticatedUser({bypassCache: true /* false */})
		.then((user) => {
			return {
				"nickname": user.attributes?.nickname,
				"email": user.attributes?.email,
				"phone_number": user.attributes?.phone_number,
				"username": user.preferred_username ? user.preferred_username : user.username,
			}
		})
	};
	
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/* Execute getSession() */
info("Calling getSessioin(~)")
getSession().then( (result) => { 
	info("getSession > then() > Updating Models")
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