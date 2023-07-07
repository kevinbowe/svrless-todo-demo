<template>
	<v-app>
		<MasterLayout>
			<h1 class="text-primary">Home Page Content</h1>
			<hr class="mb-10">
			<v-row justify="center" v-if="isSession">
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
			<v-row no-gutters v-if="!isSession">
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
												:append-inner-icon="passwordIcon1 ? 'mdi-eye' : 'mdi-eye-off'"
												prepend-inner-icon="mdi-lock-outline"
												:type="passwordIcon1 ? 'text' : 'password'" 
												@click:append-inner="passwordIcon1 = !passwordIcon1"
												clearable density="compact" variant="outlined" label="Password" required 
											/></v-col>
											<v-btn size="large" color="primary" block class="mb-3" @click="AccountSignIn" > Sign In </v-btn>
									</v-row>
								</v-window-item>
								<v-window-item __SIGN_UP__ value="signupTab">
									<v-row no-gutters>
										<v-col cols="12">
											<v-text-field
												v-model="workingPasswordModel"
												:append-inner-icon="passwordIcon2 ? 'mdi-eye' : 'mdi-eye-off'"
												prepend-inner-icon="mdi-lock-outline"
												:type="passwordIcon2 ? 'text' : 'password'" 
												@click:append-inner="passwordIcon2 = !passwordIcon2"
												clearable density="compact" variant="outlined" label="Password*" required >
											</v-text-field></v-col>
										<v-col cols="12">
											<v-text-field 
											v-model="workingPasswordModel2"
												:append-inner-icon="passwordIcon2b ? 'mdi-eye' : 'mdi-eye-off'"
												prepend-inner-icon="mdi-lock-outline"
												:type="passwordIcon2b ? 'text' : 'password'" 
												@click:append-inner="passwordIcon2b = !passwordIcon2b"
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
			<v-row justify="center" v-if="!isSession">
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
			<v-row no-gutters v-if="isSession">
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
import { info, info1, info2 , info3, info4, info5, info6, info7,
			log, warn, err , progress, joy, enter, exit,
			success, bar, whitebar, fini, start, pass, fail }
	from "../my-util-code/MyConsoleUtil"
				/*  */
import { translations} from '@aws-amplify/ui-vue';
import { Amplify, Auth, Hub, I18n, } from 'aws-amplify';
import awsconfig from '../aws-exports';
import "@aws-amplify/ui-vue/styles.css";
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
const passwordIcon1 = ref(false)
const passwordIcon2 = ref(false)
const passwordIcon2b = ref(false)
const SignInSignUpTab = ref()

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const workingUsernameModel = ref("")
const workingPasswordModel = ref("")
const workingPasswordModel2 = ref("")
const workingEmailModel =ref("")
const workingPhone_numberModel = ref("")
const toggleConfirm:boolean = ref(false)
const confirmCodeModel:Number = ref()
const EmailConfirmationMessage = { Title: ref(""), Message: ref("") }

const isSession = ref(true)

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
					//enter("AccountSignOn")
	try { const user = await Auth.signIn(workingUsernameModel.value, workingPasswordModel.value);
	} catch (error) { console.log('error signing in', error); }
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const AccountSignUp = async () => {
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
		// info(user);
	} catch (error) {
		info('error signing up:', error);
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
				//	enter("AccountConfirmSignUp")
					//info("workingNicknameModel.value", workingNickname.value)

    await Auth.confirmSignUp(workingUsernameModel.value, confirmCodeModel.value)
	 .then(result => {
		workingEmailModel.value = ""
				//	info("Clearing workingNicknameModel")
		//... workingNicknameModel.value = ""
		workingPasswordModel.value = ""
		workingPasswordModel2.value = ""
		workingPhone_numberModel.value = ""
		workingUsernameModel.value = ""
	 });
  } catch (error) {
    console.log('error confirming sign up', error);
  }
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const setEmailConfirmed = async function () {
					//	enter("setEmailConfirmed > confirmCodeModel.value > ", confirmCodeModel.value)
	await Auth.verifyCurrentUserAttributeSubmit('email', `${confirmCodeModel.value}`)
		.then((response) => {
					//	enter("verifyCurrentUserAttributeSubmit.then()")
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
/**
 * 				This is for validating the nickname input.
 */
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

/**				
 * 				This will update the user nickname.
 * 				This related to updating the nickname after the account has been created.
 * 				This was a separate work flow.
 * 			** Not sure this was used to add nickname during the Sign Up workflow. **
 * 				Notice the router.push / redirect to the Profile page.
 */
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
							// info("Hub.listen => case Sign Up")
							//bar()
				confirmCodeModel.value = null
				toggleConfirm.value = true
				return

			case "confirmSignUp" :
							// info1("Hub.listen => case Confirm Sign Up")
				// Confirm has been completed but the Cx has not been authenticated (signed in)
				toggleConfirm.value = false
				return

			case "autoSignIn" :
					// info2("Hub.listen => case Auto Sign In")
					
				// info2("   workingNicknameModel.value - UpdateNickname(~) ARG -> \n",workingNicknameModel.value)
				//				This will set the nicknameModel and the workingNicknameModel
				UpdateNickname(workingNicknameModel) 
				// info3("--- nicknameModel -> ", nicknameModel.value)

				Auth.currentAuthenticatedUser({bypassCache: true})
				emailModel.value = data.payload.data.attributes.email
				nicknameModel.value = data.payload.data.attributes.nickname
				phone_numberModel.value = data.payload.data.attributes.phone_number
				usernameModel.value = data.payload.data.username
				// info2("   currentAuthenticatedUser.email -> ", data.payload.data.attributes.email)
				// info2("   currentAuthenticatedUser.phone_number -> ", data.payload.data.attributes.phone_number)
				// info2("   currentAuthenticatedUser.username -> ", data.payload.data.username)
				// info2("   currentAuthenticatedUser.nickname -> ", data.payload.data.attributes.nickname)
				return

			/* First Sign In (Sign Up workflow) */
			case "signIn" :

					bar()
					info4("Hub.listen => case Sign In")


				// Does the nicknameModel exist?
// 				if (workingNicknameModel.value && workingNicknameModel.value.length > 0) { 
				// 				info3("Hub.listen => case Sign In > update nickname")
					//
					// 			If we get here, the nicknameModel exists.
					//				This only happens during the SignUp work flow.
// 					UpdateNickname(workingNicknameModel) 
// 					Auth.currentAuthenticatedUser({bypassCache: true})
// 
// 					emailModel.value = data.payload.data.attributes.email
// 					nicknameModel.value = data.payload.data.attributes.nickname
// 					phone_numberModel.value = data.payload.data.attributes.phone_number
// 					usernameModel.value = data.payload.data.username
// 					isSession.value = true
// 					return
// 				}

				/* Normal SignIn */
								info5("Hub.listen => case Sign In > Normal Sign In")
				Auth.currentAuthenticatedUser({bypassCache: true}).then(results => {
					emailModel.value = results.attributes.email
					workingNicknameModel.value =  data.payload.data.attributes.nickname
					nicknameModel.value =  data.payload.data.attributes.nickname
					phone_numberModel.value = data.payload.data.attributes.phone_number
					usernameModel.value = data.payload.data.attributes.preferred_username 
							? data.payload.data.attributes.preferred_username 
							: data.payload.data.username

							bar()
							// info5("   SignIn > currentAuthenticatedUser.email -> ", data.payload.data.attributes.email)
							// info5("   SignIn > currentAuthenticatedUser.phone_number -> ", data.payload.data.attributes.phone_number)
							// info5("   SignIn > currentAuthenticatedUser.nickname -> ", data.payload.data.attributes.nickname)
							// info5("   SignIn > currentAuthenticatedUser.username -> ", data.payload.data.username)

							// info6("emailModel", emailModel.value )
							info6("nicknameModel", nicknameModel.value )
							info6("workingNicknameModel", workingNicknameModel.value )

							// info6("phone_numberModel.value", phone_numberModel.value)
							// info6("usernameModel.value", usernameModel.value )


			})
				isSession.value = true
				return
			case "signOut" :
							info6("Hub.listen => case Sign Out")
				workingNicknameModel.value = nicknameModel.value = ""
				isSession.value = false
				return
			} // END_SWITCH
})
						
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
async function UpdateNickname(workingNicknameModel){
		// 			This will return the user in the user pool (not updated )
		const newuser = await Auth.currentAuthenticatedUser({bypassCache: true /* false */});
		await Auth.updateUserAttributes(newuser, {'nickname': workingNicknameModel.value })
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
			//				If we get here, hide these items: User Info, Confirm, SignOut
			return { "isSession": false }
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
				"isSession": true
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
	isSession.value = result.isSession;
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
	}
	.amplify-tabs-item[data-state=active] { 
		color: rgb(var(--v-theme-primary)); 
		border-color: rgb(var(--v-theme-primary));
		border-top-width: 5px;
	}
	.v-input { margin-top: 2px;}
	.signup-nickname input {
		color: var(--amplify-components-fieldcontrol-color);
		border-color: var(--amplify-components-fieldcontrol-border-color);
		border-style: var(--amplify-components-fieldcontrol-border-style);
		border-width: var(--amplify-components-fieldcontrol-border-width);
	}
	.v-slide-group-item--active {
		background-color: rgb(var(--v-theme-surface_alt));
		color: rgb(var(--v-theme-background));
	}
	.v-tab__slider {
		top: 0;
		height:4px;
	}
</style>