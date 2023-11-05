<script lang="ts">
	const BLOCKAPIFLAG = ref(false)
	export default {inheritAttrs: false}
</script>

<template>
<v-app>
<MasterLayout>
	<!-- SignIn & SignUp Forms -->
	<v-row no-gutters v-if="!piniaStore.connected">
		<v-col :lg="4" :md="6" :sm="8" :xs="12" class="ma-auto" >
			<v-card variant="outlined" >
				<v-tabs fixed-tabs v-model="SignInSignUpTab" >
					<v-tab value="signinTab">Sign In</v-tab>
					<v-tab value="signupTab">Sign Up</v-tab>
				</v-tabs>
				<v-card-text >
					<v-window  v-model="SignInSignUpTab">

						<!-- SignIn Form -->
						<v-window-item value="signinTab">
							<v-row no-gutters>
								<v-col cols="12" class="my-5" >
									<v-card v-if="errorSigningInMessage" >
										{{ errorSigningInMessage }}
									</v-card>
								</v-col>
							</v-row>
							<v-row no-gutters>
								<v-col cols="12">
									<v-text-field label="Username" id="userSignInId" v-model="workingUsernameModel" density="compact"  
									clearable @click:clear="workingUsernameModel = ''" variant="outlined" required>
								</v-text-field>
								</v-col>
								<v-col cols="12">
									<v-text-field label="Password" id="passwordSignInId" v-model="workingPasswordModel" :append-inner-icon="passwordIcon1 ? 'mdi-eye' : 'mdi-eye-off'" 
										prepend-inner-icon="mdi-lock-outline" :type="passwordIcon1 ? 'text' : 'password'"  @click:append-inner="passwordIcon1 = !passwordIcon1"
										clearable  @click:clear="workingPasswordModel = ''" density="compact" variant="outlined" required >
									</v-text-field>
								</v-col>
							</v-row>
							<v-btn :disabled="!isCompleteUserSignIn" size="large" color="primary" block class="mb-3" @click="signInUser" > Sign In </v-btn>

							<!-- Reset Password Link -->
							<v-row class="justify-end">
								<v-btn size="large" color="link" variant="text" class="text-none" style="text-decoration: underline;" 
								@click="resetPasswordDialog = true" > 
									<v-tooltip activator="parent"> Reset/Forgot Password</v-tooltip>
									<p>Reset Password</p>
								</v-btn>
							</v-row>
						</v-window-item>

						<!-- SignUp Form -->
						<v-window-item __SIGN_UP__ value="signupTab">
							<v-row no-gutters>
								<v-col cols="12" class="my-5" >
									<v-card v-if="errorSigningUpMessage" style="background-color: rgb(var(--v-theme-warning));">
										{{ errorSigningUpMessage }}
									</v-card>
								</v-col>
							</v-row>
							<v-form validate-on="submit" @submit.prevent="signUpUser">
								<v-row no-gutters>
									<v-col cols="12">
										<v-text-field id="usernameSuId" v-model="workingUsernameModel" 
										ref="workingUsernameFieldRef"
										clearable @click:clear="clearWorkingUsernameModelValidationError"
										:rules="[
											value => checkWorkingUsernameTooShort(value),
											value => checkWorkingUsernameFirstChar(value),
											value => checkWorkingUsernameSpecialCharExceptions(value)
										]" 
										density="compact" variant="outlined" label="Username" required />
									</v-col>

									<v-col cols="12">
										<v-text-field v-model="workingPasswordModel" :append-inner-icon="passwordIcon2 ? 'mdi-eye' : 'mdi-eye-off'" 
											prepend-inner-icon="mdi-lock-outline" :type="passwordIcon2 ? 'text' : 'password'"  
											@click:append-inner="passwordIcon2 = !passwordIcon2" clearable density="compact" variant="outlined" 
											label="Password" required > 
										</v-text-field></v-col>

									<v-col cols="12">
										<v-text-field id="emailSuId" v-model="workingEmailModel" 
										ref="workingEmailFieldRef"
										clearable @click:clear="clearWorkingEmailModelValidationError"
										:rules="[ 
											value => checkWorkingEmailSpecialChar(value), 
											value => checkWorkingEmailName(value), 
											value => checkWorkingEmailDomain(value),
										]"
										density="compact" variant="outlined" label="Email" required />
									</v-col>


									<v-col cols="12">
										<v-text-field id="phone_numberSuId" v-model="workingPhone_numberModel" 
										ref="workingPhone_numberFieldRef"
										clearable @click:clear="clearWorkingPhone_numberValidationError"
										:rules="[
											value => checkPhone_number(value),
											value => checkPhone_numberInvalidCountryCode(value),
										]"
										density="compact" variant="outlined" label="Phone number (optional)"/>
									</v-col>
									<v-col cols="12">
										<v-text-field id="nicknameSuId" v-model="workingNicknameModel" 
										ref="workingNicknameFieldRef"
										clearable @click:clear="clearWorkingNicknameModelValidationError"
										:rules="[
											value => checkNicknameReserved(value),
											value => checkNicknameTooShort(value),
											value => checkNicknameNumericFirstChar(value),
											value => checkNicknameFirstChar(value),
											value => checkNicknameLastChar(value),
											value => checkNicknameSpecialChars(value),
										]"
										density="compact" variant="outlined" label="Nickname (optional)"/>
									</v-col>


									<v-btn :disabled="!workingEmailModel || !workingUsernameModel || !workingPasswordModel"
											block size="large" color="primary" class="mb-3" type="submit" > 
												Sign Up 
									</v-btn>
								</v-row>
							</v-form>
						</v-window-item>
					</v-window>
				</v-card-text>
			</v-card>
		</v-col>
	</v-row>
	
	<!-- PopUp Reset Password Dialog -- Modal -->
	<ResetPassword v-if="resetPasswordDialog" @onExit="closeResetPassword"></ResetPassword>

	<!-- PopUp Message Dialog -- Modal -->
	<v-row justify="center" v-if="openDialogFlag" >
		<v-dialog activator="parent" v-model="openDialogFlag" persistent >
			<v-card 	color="background_alt" border="lg" 
						class="ma-auto" height="10em" width="20em" elevation="24">
				<v-card-text> 
					<h1>Error</h1><strong>Invalid Confirmation Code.</strong>
				</v-card-text>
				<v-card-actions>
					<v-btn @click="openDialogFlag = false" block 
					color="surface" 
					style="background-color:rgb(var(--v-theme-primary))"> OK </v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-row>

	<!-- SignUp Confirmation -->
	<v-overlay v-if="!piniaStore.connected" class="align-center justify-center" v-model="toggleUserConfirm" >
		<v-sheet width="20em" class="pa-3" elevation="24" color="background" border="lg">
			<v-row><v-spacer/>
				<v-btn __X_IN_UPPER_RIGHT__ icon="$close" size="large" variant="text" @click="toggleUserConfirm=false"/>
			</v-row>
			<v-row class="pa-5" style="margin-top:-2.5em;" no-gutters>
				<h1 class="ma-auto" v-html="userConfirmationMessage.Title"></h1>
				<p v-html="userConfirmationMessage.Message"></p>
				<p class="ma-auto" v-html="userConfirmationMessage.Message2"></p>
				<p class="ma-auto" v-html="userConfirmationMessage.Message3"></p>
			</v-row>

			<v-form validate-on="submit" @submit.prevent="confirmUserSignUp">

				<v-text-field label="Confirmation Code" v-model="confirmUserCodeModel" 
				ref="confirmUserCodeModelFieldRef" id="ConfCode"
				:rules="[
					value => !!value,
					value => checkConfirmationTooShort(value),
					value => checkConfirmationSpecialChars(value),
				]"	
				placeholder="Enter your code" variant="outlined" density="compact"
				clearable @click:clear="clearConfirmUserCodeModelValidationError" />
			
				<v-btn block class="my-5" color="primary" type="submit" :disabled="!confirmUserCodeModel" > 
					Confirm 
				</v-btn>
			</v-form>

			<v-btn block color="surface" @click="resendUserConfirmationCode(workingUsernameModel)"> 
				Resend Code 
			</v-btn>

		</v-sheet>
	</v-overlay>
</MasterLayout>
</v-app>
</template>

<!-- %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% -->
<script setup lang="ts">

import { info, info1, info2 , info3, info4, info5, info6, info7 } from "../my-util-code/MyConsoleUtil"
import { exe, exe1, exe2 } from "../my-util-code/MyConsoleUtil"
import { enter, enter1, enter2, exit } from "../my-util-code/MyConsoleUtil"
import { bar, whitebar, greybar } from "../my-util-code/MyConsoleUtil"
import { err } from "../my-util-code/MyConsoleUtil"

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
import { Auth, Hub } from 'aws-amplify';
import { ref, Ref, computed } from 'vue'
/* ----------------------------------------------------------------------------- */
import MasterLayout from "../layouts/MasterLayout.vue";
import { parseEmail, checkWorkingEmailSpecialChar, checkWorkingEmailName, checkWorkingEmailDomain } 
	from "../components/EmailParts/EmailValidators"

import { checkNicknameReserved, checkNicknameTooShort, checkNicknameNumericFirstChar,  
			checkNicknameFirstChar, checkNicknameLastChar, checkNicknameSpecialChars } 
	from "../components/NicknameParts/NicknameValidators"

import  { stripPhone_numberFmt, checkPhone_number, checkPhone_numberInvalidCountryCode, }
	from "../components/Phone_numberParts/Phone_numerValidators"

import  { checkWorkingUsernameTooShort, checkWorkingUsernameFirstChar, checkWorkingUsernameSpecialCharExceptions}
	from "../components/UsernameParts/UsernameValidators"

import { checkConfirmationTooShort, checkConfirmationSpecialChars,}
	from "../components/ConfirmationParts/ComfirmationValidators"

import ResetPassword from "../components/ResetPassword.vue"
import router from "../router";
import { useUserPiniaStore } from "../stores/user"

import { useTheme } from "vuetify";

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

const piniaStore = useUserPiniaStore(); //initialize the piniaStore

const SignInSignUpTab = ref()

const nicknameModel = ref("")
const emailModel = ref("")
const phone_numberModel = ref("")
const usernameModel = ref("")

const workingPasswordModel = ref("")
const workingPreferred_usernameModel = ref("")

const passwordIcon1 = ref(false)
const passwordIcon2 = ref(false)

const errorSigningInMessage = ref("")
const errorSigningUpMessage =ref("")

type userConfirmationMessageType = { Title: string, Message: string, Message2: string, Message3: string }
let userConfirmationMessage: userConfirmationMessageType = { Title: "", Message: "", Message2: "", Message3: "" }

const toggleUserConfirm:Ref<boolean> = ref(false)
const restartConfirm = ref()
const openDialogFlag = ref()
const resetPasswordDialog = ref()
	
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const emit = defineEmits()
	
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const confirmUserCodeModel = ref()
const confirmUserCodeModelFieldRef = ref()
const clearConfirmUserCodeModelValidationError = () => confirmUserCodeModelFieldRef.value.resetValidation()

const workingEmailModel =ref("")
const workingEmailFieldRef = ref()
const clearWorkingEmailModelValidationError = () => workingEmailFieldRef.value.resetValidation()

const workingUsernameModel = ref("")
const workingUsernameFieldRef = ref()
const clearWorkingUsernameModelValidationError = () => workingUsernameFieldRef.value.resetValidation()

const workingPhone_numberModel = ref("")
const workingPhone_numberFieldRef = ref()
const clearWorkingPhone_numberValidationError = () => workingPhone_numberFieldRef.value.resetValidation()

const workingNicknameModel =  ref("")
const workingNicknameFieldRef = ref()
const clearWorkingNicknameModelValidationError = () => workingNicknameFieldRef.value.resetValidation()

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const closeResetPassword = (payload) => { 
	resetPasswordDialog.value = payload.state
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const isCompleteUserSignIn = computed<boolean>(() => workingUsernameModel.value && workingPasswordModel.value ? true : false )
		
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const buildUserConfirmationMessage = (email:string|null = null, restartConfirm:Boolean = false) => {
	userConfirmationMessage.Title = "We Emailed You"
	userConfirmationMessage.Message = 
		`To confirm your new account, you must enter the ` +
		`code we emailed to the new email address you provided.` 
	if(restartConfirm) {
		if(!email) {
			//			If we get here, we are restarting Confirm and there is no email.
			return userConfirmationMessage 
		}
		//			If we get here, we are retrying to confirm and the email is still available.
		//				We DIDN'T reload the page.
		type parseEmailType = {name:string|undefined, domain:string | undefined} | null
		let nameDomain: parseEmailType = parseEmail(email)
		
		userConfirmationMessage.Message2 = `<div style="height:4em;"></div>`
		if(nameDomain && nameDomain?.name && nameDomain?.domain) {
			userConfirmationMessage.Message2 = `<b>${nameDomain?.name[0]}***@${nameDomain?.domain[0]}***</b>`
		}
		return userConfirmationMessage 
	}
	//			If we get here, we are on the SignUp Happypath
	//			If we get here, the email arg contains data.
	type parseEmailType = {name:string|undefined, domain:string | undefined} | null
	let nameDomain: parseEmailType = parseEmail(email)
		
	userConfirmationMessage.Message2 = `<div style="height:4em;"></div>`
	if(nameDomain && nameDomain?.name && nameDomain?.domain) {
		userConfirmationMessage.Message2 = `<b>${nameDomain?.name[0]}***@${nameDomain?.domain[0]}***</b>`
	}

	userConfirmationMessage.Message3 = `This may take a minuet to arrive.`
	return userConfirmationMessage
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const confirmUserSignUp = async (event) => {
	// if(BLOCKAPI("confirmUserSignUp function "))return
	const results = await event
	if(!results.valid) return /* Cancel Submission if validation FAILED */
	// if(BLOCKAPI("signUpUser function "))return

	try {
		//					This function ONLY sets the user state to Confirmed.
		//					The user is NOT signed in.
		await Auth.confirmSignUp(workingUsernameModel.value, confirmUserCodeModel.value)
		//					Check to see if we were trying to restart the confirmation
		//					This will not start until the Auth.confirmSignUp(~) returns
		if (restartConfirm.value === true) {
			//				If we get here, try signing in again.
			toggleUserConfirm.value = false	// Close the Confirm Ui
			piniaStore.connected = true
			restartConfirm.value = false	// Lower the Confirm flag
		} 
		signInUser()
	} catch (error) {
		err('error confirming sign up', error);
		openDialogFlag.value = true
		confirmUserCodeModel.value = undefined
	}
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
async function resendUserConfirmationCode(username) {
	// if(BLOCKAPI("resendUserConfirmationCode function "))return

	confirmUserCodeModel.value = undefined
	try { await Auth.resendSignUp(username) }
	catch (error) { err('error resending code:', error) }
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const signUpUser = async (event) => {
	const results = await event
	if(!results.valid) return /* Cancel Submission if validation FAILED */
	// if(BLOCKAPI("signUpUser function "))return

	try {
		await Auth.signUp({
			username: workingUsernameModel.value,
			password: workingPasswordModel.value,
			attributes: {
				email: workingEmailModel.value,
				// Add a <plus> prefix to the phone number that has had the formatting removed.
				phone_number: `+${stripPhone_numberFmt(workingPhone_numberModel.value).value}`, 
				nickname: workingNicknameModel.value
			},
			autoSignIn: { enabled: true, }
		})
		.catch(error => {
			if(error.name === "UsernameExistsException")
				errorSigningUpMessage.value = "This username is not available"
		})
	} catch (error) {
		console.log('error signing up:', error);
	}
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const signInUser = async () => {
	try { 
		errorSigningInMessage.value = ""
		const user = await Auth.signIn(workingUsernameModel.value, workingPasswordModel.value)
		.catch(error => {
			if(error.name === "NotAuthorizedException") errorSigningInMessage.value = "Incorrect username or password. Please try again." 
			if(error.name !== "UserNotConfirmedException") return
			//				Restart the confirmation.
			toggleUserConfirm.value = true // Display Confirm Ui
			restartConfirm.value = true
			//				Initialize the Invalid Confirm Code model and message
			confirmUserCodeModel.value = undefined
			buildUserConfirmationMessage(workingEmailModel.value, restartConfirm.value)
		})
		if (user) {
			emit( 'onSignIn', { 
				nickname: user.attributes?.nickname, 
				email: user.attributes?.email,
				phone_number: user.attributes?.phone_number,	
				username: user.attributes?.preferred_username ?? user.username,
			})
			piniaStore.connected = true
			router.push({name:'home'})
		}
	}
	catch (error) { 
							err('error signing in', error)
			errorSigningInMessage.value = "Undefined Sign In Error. Please try again." 
	}
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/* 				if(BLOCKAPI("submitEmail function "))return								*/
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const BLOCKAPI = (message:string|null|undefined = null) => {
	if(BLOCKAPIFLAG.value) 
		message ? info7(`${message} -- BLOCKED`) : info7("-- BLOCKED -- ")
	return BLOCKAPIFLAG.value
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
Hub.listen('auth', (data) => {
	switch(data.payload.event) {
		case "signUp" :
			// bar()
			// enter0("Hub.listen => Case SignUp")
			confirmUserCodeModel.value = null 
			toggleUserConfirm.value = true // Display Confirm Ui
			restartConfirm.value = false
			buildUserConfirmationMessage(workingEmailModel.value, restartConfirm.value)
			return
		case "confirmSignUp" :
			// bar()
			// enter1("Hub.listen => Case CONFIRM SignUp")
			toggleUserConfirm.value = false // Hide Confirm Ui
			return
		case "autoSignIn" :
				// bar()
				// enter2("Hub.listen => Case AUTO SignIn")
				workingNicknameModel.value = ""
				workingEmailModel.value = ""
				workingPreferred_usernameModel.value = ""
				return
		case "signIn" :
				// bar()
				// enter3("Hub.listen => Case SignIn")
				Auth.currentAuthenticatedUser({bypassCache: true})
				.then(results => {
					emailModel.value = results.attributes.email
					nicknameModel.value =  data.payload.data.attributes.nickname
					phone_numberModel.value = data.payload.data.attributes.phone_number
					usernameModel.value = data.payload.data.attributes.preferred_username 
					? data.payload.data.attributes.preferred_username 
					: data.payload.data.username
				})
				piniaStore.connected = true
				return
		case "signOut" :
					return
	} 
})

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
Auth.currentAuthenticatedUser({bypassCache: true})
.then(results => {
	nicknameModel.value =  results.attributes.nickname
	emailModel.value = results.attributes.email
	phone_numberModel.value = results.attributes.phone_number
	usernameModel.value = results.attributes.preferred_username ? results.attributes.preferred_username : results.username
})
.catch( () => { })

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

const theme = useTheme();
	/* ----------------------------------------------------------------------------- */
	theme.global.name.value = piniaStore.Active_Theme
	
</script>