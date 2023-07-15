<template>
	<v-app>
		<MasterLayout>
			<h1 class="text-primary">Home Page Content</h1>
			<hr class="mb-10">
			<!-- Update Email-->
			<v-row justify="center" v-if="isSession">
				<v-col :sm="8" :md="6" :lg="4" class="ma-5" >
				<v-form ref="emailFormRef" validate-on="submit" @submit.prevent="submitEmail" >
					<v-row>
						<v-text-field 
							label="Email"  v-model= "workingEmailModel" 
							
							clearable @click:clear="clearWorkingEmailModelValidationError"

							:rules="[
										value => checkEmailSpecialChar(value),
										value => checkEmailName(value),
										value => checkEmailDomain(value),
									]"
							variant="outlined" density="compact" 
						></v-text-field>
					</v-row>
					<v-row class="justify-end">
						<v-btn :disabled="!workingEmailModel" color="primary" type="submit"> Save Email </v-btn>
					</v-row>
				</v-form>
				</v-col>
			</v-row>
			<!-- Email Confirmation -->
			<v-row justify="center" v-if="isSession">
				<v-overlay class="align-center justify-center" v-model="toggleConfirmEmail" >
					<v-sheet width="20em" color="surface_alt" elevation="24" 
							:style="{height:emailConfirmationMessage.Message2.value ? '25.5em' : '22.5em'}">
						<v-row>
							<v-spacer></v-spacer>
							<v-btn __THIS_IS_THE_X_IN_UPPER_RIGHT__ 
								class="mr-3" icon="$close" size="large" variant="text" @click="toggleConfirmEmail=false"></v-btn>
						</v-row>
						<v-col style="margin-top:-2.5em;">
							<v-row no-gutters>
								<h1 class="ma-auto" v-html="emailConfirmationMessage.Title.value"></h1>
								<p v-html="emailConfirmationMessage.Message.value"></p>
								<p class="ma-auto" v-html="emailConfirmationMessage.Message2.value"></p>
								<p class="ma-auto" v-html="emailConfirmationMessage.Message3.value"></p>
							</v-row>
							<v-row _no-gutters class="justify-center">Confirmation Code</v-row>
							<v-row _no-gutters><v-spacer/>
								<v-col cols="11">
									<v-text-field v-model="confirmEmailCodeModel" clearable @click:clear="invalidEmailConfirmCode = ''"
										id="ConfCode" placeholder="Enter your code" class="mb-2" style="height:1.75em;" variant="outlined"  density="compact">
									</v-text-field>
									<p class="mt-4" style="color:rgb(var(--v-theme-error));" >{{ invalidEmailConfirmCode }}</p>
								</v-col><v-spacer/>
							</v-row>
							<v-row class="mx-5">
								<v-btn :disabled="!confirmEmailCodeModel" @click="applyEmailConfirmationCode" block color="primary" class="mb-2" > Confirm </v-btn>
								<v-btn block color="background" class="mb-2" @click="resendEmailConfirmationCode"> Resend Code </v-btn>
							</v-row>
						</v-col>
					</v-sheet>
				</v-overlay>
			</v-row>
			<!-- Update Preferred Username -->
			<v-row justify="center" v-if="isSession">
				<v-col :sm="8" :md="6" :lg="4" class="ma-5" >

				<v-form ref="preferred_usernameFormRef" validate-on="submit" @submit.prevent="submitPreferred_username">
					<v-row>
						<v-text-field label="User Name" :rules="[
								checkShortPreferred_username,
								checkFirstCharPreferred_username,
								checkSpecialCharExceptionsPreferred_username
							]" 
							clearable @click:clear="clearPreferred_usernameModelValidationError"
							v-model="workingPreferred_usernameModel" hint="Example: kb1" variant="outlined" density="compact" >
						</v-text-field>
					</v-row>
					<v-row class="justify-end">
						<v-btn :disabled="!workingPreferred_usernameModel" color="primary" type="submit"> Save Preferred Username</v-btn>
					</v-row>
				</v-form>
				</v-col>
			</v-row>
			<!-- User Info -->
			<v-row justify="center" v-if="isSession">
				<v-col :lg="4" :md="6" :sm="8" :xs="12" class="ma-auto" >
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
			</v-row>
			<!-- SignIn & SignUp Forms -->
			<v-row no-gutters v-if="!isSession">
				<v-col :lg="4" :md="6" :sm="8" :xs="12" class="ma-auto" >
					<v-card style="background-color: rgb(var(--v-theme-surface_alt));" color="border_alt" variant="outlined" >
						<v-tabs color="primary" bg-color="surface" fixed-tabs v-model="SignInSignUpTab" >
							<v-tab value="signinTab">Sign In</v-tab>
							<v-tab value="signupTab">Sign Up</v-tab>
						</v-tabs>
						<v-card-text >
							<v-window  v-model="SignInSignUpTab">
								<!-- SignIn Form -->
								<v-window-item __SIGN_IN__ value="signinTab">
									<v-row no-gutters>
										<v-col cols="12" class="my-5" >
											<v-card v-if="errorSigningInMessage" style="background-color: rgb(var(--v-theme-warning));">
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
										<v-btn :disabled="!isCompleteSignIn" size="large" color="primary" block class="mb-3" @click="AccountSignIn" > Sign In </v-btn>
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
									<v-row no-gutters>
										<v-col cols="12">
											<v-text-field v-model="workingPasswordModel" :append-inner-icon="passwordIcon2 ? 'mdi-eye' : 'mdi-eye-off'" 
												prepend-inner-icon="mdi-lock-outline" :type="passwordIcon2 ? 'text' : 'password'"  
												@click:append-inner="passwordIcon2 = !passwordIcon2" clearable density="compact" variant="outlined" 
												label="Password*" required > 
											</v-text-field></v-col>
										<v-col cols="12">
											<v-text-field v-model="workingPasswordModel2"
												:append-inner-icon="passwordIcon2b ? 'mdi-eye' : 'mdi-eye-off'" prepend-inner-icon="mdi-lock-outline" 
												:type="passwordIcon2b ? 'text' : 'password'" @click:append-inner="passwordIcon2b = !passwordIcon2b"
												clearable density="compact" variant="outlined" label="Confirm Password*" required >
											</v-text-field>
										</v-col>
										<v-col cols="12">
											<v-text-field id="emailSuId" v-model="workingEmailModel" clearable density="compact" variant="outlined" label="Email" required />
										</v-col>
										<v-col cols="12">
											<v-text-field id="usernameSuId" v-model="workingUsernameModel" clearable  density="compact" 
												variant="outlined" label="Username" required />
										</v-col>
										<v-col cols="12">
											<v-text-field id="phone_numberSuId" v-model="workingPhone_numberModel" clearable density="compact" variant="outlined" label="Phone number"/>
										</v-col>
										<v-col cols="12">
											<v-text-field id="nicknameSuId" v-model="workingNicknameModel" clearable density="compact" variant="outlined" label="Nickname"/>
										</v-col>
										<v-btn block size="large" color="primary" class="mb-3" @click="AccountSignUp" > Sign Up </v-btn>
									</v-row>
								</v-window-item>
							</v-window>
						</v-card-text>
					</v-card>
				</v-col>
			</v-row>
			<!-- Preferred Username Confirmation -->
			<v-row justify="center" v-if="!isSession">
				<v-overlay class="align-center justify-center" v-model="toggleConfirm" >
					<v-sheet width="20em" color="surface_alt" elevation="24" 
							:style="{height:accountConfirmationMessage.Message2.value ? '25.5em' : '22.5em'}">
						<v-row>
							<v-spacer></v-spacer>
							<v-btn __THIS_IS_THE_X_IN_UPPER_RIGHT__ 
								class="mr-3" icon="$close" size="large" variant="text" @click="toggleConfirm=false"></v-btn>
						</v-row>
						<v-col style="margin-top:-2.5em;">
							<v-row no-gutters>
								<h1 class="ma-auto" v-html="accountConfirmationMessage.Title.value"></h1>
								<p v-html="accountConfirmationMessage.Message.value"></p>
								<p class="ma-auto" v-html="accountConfirmationMessage.Message2.value"></p>
								<p class="ma-auto" v-html="accountConfirmationMessage.Message3.value"></p>
							</v-row>
							<v-row _no-gutters class="justify-center">Confirmation Code</v-row>
							<v-row _no-gutters><v-spacer/>
								<v-col cols="11">
									<v-text-field v-model="confirmCodeModel" clearable @click:clear="invalidConfirmCode = ''"
										id="ConfCode" placeholder="Enter your code" class="mb-2" style="height:1.75em;" variant="outlined"  density="compact">
									</v-text-field>
									<p class="mt-4" style="color:rgb(var(--v-theme-error));" >{{ invalidConfirmCode }}</p>
								</v-col><v-spacer/>
							</v-row>
							<v-row class="mx-5">
								<v-btn :disabled="!confirmCodeModel" @click="AccountConfirmSignUp" block color="primary" class="mb-2" > Confirm </v-btn>
								<v-btn block color="background" class="mb-2" @click="AccountResendConfirmationCode(workingUsernameModel)"> Resend Code </v-btn>
							</v-row>
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
			log, warn, err, err2, progress, joy, exit,
			enter, enter0, enter1, enter2, enter3, enter4, enter5, enter6, enter7, 
			success, bar, whitebar, greybar, fini, start, pass, fail  }
	from "../my-util-code/MyConsoleUtil"
				/*  */
import { translations} from '@aws-amplify/ui-vue';
import { Amplify, Auth, Hub, I18n, } from 'aws-amplify';
import awsconfig from '../aws-exports';
import "@aws-amplify/ui-vue/styles.css";
import router from "../router";
import { resolveTransitionHooks } from "vue";
import { vModelCheckbox } from "vue";

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
I18n.putVocabularies(translations)
I18n.setLanguage('en')
I18n.putVocabulariesForLanguage('en', {
  'Create Account': 'Sign Up', // Tab header
});

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
Amplify.configure(awsconfig);

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/* All Const Decls */
const DEBUG_Model = ref()

const preferred_usernameFormRef = ref()
const emailFormRef = ref()

const invalidEmailConfirmCode = ref("")
const confirmEmailCodeModel = ref("")
const toggleConfirmEmail:boolean = ref(false)
const emailConfirmationMessage = { Title: ref(""), Message: ref(""), Message2: ref(""), Message3: ref("") }

const passwordIcon1 = ref(false)
const passwordIcon2 = ref(false)
const passwordIcon2b = ref(false)
const SignInSignUpTab = ref()

const toggleConfirm:boolean = ref(false)
const confirmCodeModel:Number = ref()
const isSession = ref(true)

const accountConfirmationMessage = { Title: ref(""), Message: ref(""), Message2: ref(""), Message3: ref("") }

const workingUsernameModel = ref("")
const workingPasswordModel = ref("")
const workingPasswordModel2 = ref("")
const workingEmailModel =ref("")
const workingPhone_numberModel = ref("")

const workingPreferred_usernameModel = ref("")
const invalidUsernameDialogFlag = ref(false)

const usernameModel = ref("")
const phone_numberModel = ref("")
const workingPhonenumberModel = ref("")
const workingNicknameModel = ref("")
const nicknameModel = ref("")
const emailModel = ref("")

const restartConfirm = ref()
const invalidConfirmCode = ref("")
const errorSigningInMessage = ref("")
const errorSigningUpMessage =ref("")

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
async function submitEmail (event) {

	info("submitEmail -> DEBUG > Cancel")
	return // DEBUG 


	const results = await event
	if(!results.valid) {
		return /* Cancel Submission if validation FAILED */
	}
	//				If we get here, validation was sucessful
	//				This will return the user in the user pool (not updated )
	const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
	await Auth.updateUserAttributes(authUser, {'email': workingEmailModel.value })
	await Auth.currentUserInfo().then(result => {
		emailModel.value = result.attributes.email
		//				Prepare the Confirm UI message
		emailConfirmationMessage.value = buildEmailConfirmationMessage(workingEmailModel.value)
		//				Display the Confirmation UI
		toggleConfirmEmail.value = true
	})
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const resendEmailConfirmationCode = async () => {
	const user = await Auth.currentAuthenticatedUser();
	await Auth.updateUserAttributes(user, { email: workingEmailModel.value });
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const applyEmailConfirmationCode = async function () {
	await Auth.verifyCurrentUserAttributeSubmit('email', `${ confirmEmailCodeModel.value}`)
		.then((response) => {
			// 		If we get here, the email is CONFIRMED.
			emailModel.value = workingEmailModel.value
			workingEmailModel.value = null
			confirmEmailCodeModel.value = null
			
			toggleConfirmEmail.value = false
		})
		.catch((e) => {
			err("verifyCurrentUserAttributeSubmit > Catch > ",e)
			// alert(`ERROR -- Invalid Confirmation Code [ ${confirmCodeModel.value} ] -- ${e}` )
		})
		return
	}
	
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const buildEmailConfirmationMessage = (email:string) => {
	emailConfirmationMessage.Title.value = "We Emailed You"
	
	emailConfirmationMessage.Message.value = 
	`To confirm your new account, you must enter the ` +
	`code we emailed to the new email address you provided.` 
	
	let {name , domain} = parseEmail(email)
	emailConfirmationMessage.Message2.value = `<b>${name[0]}***@${domain[0]}***</b>`
	
	emailConfirmationMessage.Message3.value = `This may take a minuet to arrive.`
	
	return emailConfirmationMessage
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/* Email -- Validation */
const checkEmailSpecialChar = (emailArg) => {
	//				Perform general special char check
	const regexSpecialChar = new RegExp('^.*[!#$%^\'"*,:;|/ {}<>[\\]\\\\()]', 'gm')

	const specialCharMatch = regexSpecialChar.exec(emailArg)
	if ( specialCharMatch !== null) {
		//			If we get here, there was a match
		return "FAIL checkEmailSpecialChar() > specialCharMatch"
	}
	//				Perform multiple @ check
	const regexMultipleAtChar = new RegExp('^.*@.*@', 'gm')
	const multipleAtCharMatch = regexMultipleAtChar.exec(emailArg)
	if ( multipleAtCharMatch !== null) {
		//			If we get here, there was a match
		return "FAIL checkEmailSpecialChar() > multipleAtCharMatch"
	}
	//				Perform consecutive special char check
	const regexConsecutiveSpecialChar = new RegExp('\\.\\.|--|\\+\\+', 'gm')
	const consecutiveSpecialCharMatch = regexConsecutiveSpecialChar.exec(emailArg)
	if ( consecutiveSpecialCharMatch !== null) {
		//			If we get here, there was a match
		return "FAIL checkEmailSpecialChar() > ConsecutiveSpecialChar"
	}
	return true
}

const checkEmailName = (emailArg) => {
	const parsedEmail = parseEmail(emailArg)
	if (!parsedEmail) return "FAIL checkEmailName() > Invalid Email"
	//				Length check ( long & short )
	//				--	64 char
	//				0123456789_123456789_123456789_123456789_123456789_123456789_1234
	let len = parsedEmail.name.length;
	if(len > 64) return "FAIL checkEmailName() > Length Check: Max char allowed = 64 char"
	if(len <= 0) return "FAIL checkEmailName() > Length Check: Min char allowed = 1 char"
	//				Leading and trailing special char check
	//				Note: The trailing '_' has been removed from the check.
	//					Gmail accepts this trailing character.
	/*			 	TEST DATA -- This patterns must fail.
						asd_@gmail.com // This is valid
						-asd@gmail.com		asd-@gmail.com		_asd@gmail.com		+asd@gmail.com
						asd+@gmail.com		.asd@gmail.com		asd.@gmail.com
	*/
	const regex = new RegExp('^[-_+\\.]|[-+\\.]$', 'gm')
	let match = regex.exec(parsedEmail.name)
	if(match != null){
		return `Invalid character [-_+.] used at begining or end of email name [ ${match} ]`
	}

return true
}

const checkEmailDomain = (emailArg) => {
	const emailDomain = parseEmail(emailArg).domain
	//				Length check ( long & short )
	/*				TEST DATA -- 253 char domain
					asd@_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789.com   */

	let len = emailDomain.length;
	if(len > 253){
		return `Max Valid Domain Length: 253 -- Actual Length: ${emailDomain.length}`
	}
	if(len <= 2){
		return `Min Valid Domain Length: 3 -- Actual Length: ${emailDomain.length}`
	}

	//				Domain and TopLevelDomain check
	//				Split the domain and tld and check from both pieces.
	const regex = new RegExp('^(?<domain>.*)[\\.|\\s](?<tld>.*)', 'gm')
	let match = regex.exec(emailDomain)
	//				Domain Check Section
	//				Exists Check
	if(match?.groups.domain.length === 0 || match?.groups.domain === undefined){
		//			Missing the Domain
		return "FAIL checkEmailDomain() > Domain Check: Domain is missing"
	}

	//		TEST DATA
	// asd@-asd.com		asd@asd-.com		asd@.asd.com		asd@asd..com
	// asd@_asd.com		asd@asd_.com		asd@+asd.com		asd@asd+.com

	//				Leading/Trailing Special Char Check
	const regexSpecialChar = new RegExp('^[-_+\\.]|[-_+\\.]$', 'gm')
	let matchSpecialChar = regexSpecialChar.exec(match?.groups.domain)
	if(matchSpecialChar != null){
		return `Invalid character [-_+.] used at begining or end of domain name [ ${matchSpecialChar} ]`
	}

	//				TLD (Top-Level-Domain) Checks
	//				Exists Check
	if(match?.groups.tld.length === 0 || match?.groups.tld === undefined){
		return "FAIL checkEmailDomain() > Domain Check: TopLevelDomain is missing"
	}
	//				Leading/Trailing Special Char Check
	let matchTldSpecialChar = regexSpecialChar.exec(match?.groups.tld)
	if(matchTldSpecialChar != null){
		return `Invalid character [-_+.] used at begining or end of TLD name [ ${matchTldSpecialChar} ]`
	}
	return true
}



/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
Hub.listen('auth', (data) => {
	switch(data.payload.event) {
		case "signUp" :
			// bar()
			// enter0("Hub.listen => Case SignUp")
			confirmCodeModel.value = null // Clear confirmCodeModel - Prepare for input
			toggleConfirm.value = true // Display Confirm Ui
			restartConfirm.value = false
			AccountBuildConfirmationMessage(workingEmailModel.value, restartConfirm.value)
			return
		
		case "confirmSignUp" :
			// bar()
			// enter1("Hub.listen => Case CONFIRM SignUp -> DO NOTHING")
			toggleConfirm.value = false // Hide Confirm Ui
			return
			
		case "autoSignIn" :
			// bar()
			// enter2("Hub.listen => Case AUTO SignIn -> DO NOTHING")
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
			isSession.value = true
			return
			
		case "signOut" :
			return
	} // END_SWITCH
})
		
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
async function submitPreferred_username (event) {
	info("submitPreferred_username -> DEBUG > Cancel")
	return // DEBUG 

	const results = await event
	if(!results.valid) return 

	//				If we get here, validation was sucessful
	//				This will return the user in the user pool (not updated )
	const newuser = await Auth.currentAuthenticatedUser({bypassCache: true});
	await Auth.updateUserAttributes(newuser, {
		'preferred_username': workingPreferred_usernameModel.value
	})	.catch((error) => {
		//			If I get here, there was a problem updating the preferred_username
		invalidUsernameDialogFlag.value = true
	})
	await Auth.currentUserInfo().then(result => {
		//			If we get here, The update worked.
		usernameModel.value = result.attributes.preferred_username
	})
}


const clearWorkingEmailModelValidationError = () => emailFormRef.value.resetValidation()
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const clearPreferred_usernameModelValidationError = () => preferred_usernameFormRef.value.resetValidation()

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
async function checkShortPreferred_username (workingPreferred_usernameModel) {
	if (workingPreferred_usernameModel.length > 0 && workingPreferred_usernameModel.length <= 2) {
		return 'User name is too short. Please try another one.'
	}
	return true
}

async function checkFirstCharPreferred_username (workingPreferred_usernameModel) {
		if (!isNaN(workingPreferred_usernameModel[0])) {
			return 'User name can not begin with a Number. Please try another one.'
		}
		return true
}

async function checkSpecialCharExceptionsPreferred_username (workingPreferred_usernameModel) {
		//				REF -- ALL Special Chars: /[-_.*\[\]@!#$%^\'"*,:;|/ {}<>()\\]/
		//				Special Char with exceptions: <hyphen> <under_bar> and <period>
		// let regexSpecialChar = /[*\[\]@!#$%^\'"*,:;|{}<>()\\\/]/
		//				Add <space>
		let regexSpecialChar = /[\s*\[\]@!#$%^\'"*,:;|{}<>()\\\/]/
		const match = workingPreferred_usernameModel.match(regexSpecialChar)
		// 				Check the format
		if(match) {
			return 'Only period, hyphen and underbar are allowed special characters. Try again.'
		}
		return true
}






/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const isCompleteSignIn = computed<boolean>(() => workingUsernameModel.value && workingPasswordModel.value ? true : false )

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const AccountSignOut = async () => {
	try { await Auth.signOut()
		.then(result => {
			emailModel.value = ""
			nicknameModel.value = ""
			usernameModel.value = ""
			phone_numberModel.value = ""

			workingPasswordModel.value = ""
			workingPasswordModel2.value = ""

			workingEmailModel.value = ""
			workingNicknameModel.value = ""
			workingUsernameModel.value = ""
			workingPhone_numberModel.value = ""

			toggleConfirm.value = false
			isSession.value = false
		})
	}
	catch (error) { console.log('error signing out: ', error);}
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const AccountSignIn = async () => {
	try { 
		errorSigningInMessage.value = ""
		const user = await Auth.signIn(workingUsernameModel.value, workingPasswordModel.value)
		.catch(error => {
			if(error.name === "NotAuthorizedException") errorSigningInMessage.value = "Incorrect username or password. Please try again." 
			if(error.name !== "UserNotConfirmedException") return

			//				Restart the confirmation.
			toggleConfirm.value = true // Display Confirm Ui
			restartConfirm.value = true
			//				Initialize the Invalid Confirm Code model and message
			invalidConfirmCode.value = ""
			confirmCodeModel.value = ""
			AccountBuildConfirmationMessage(workingEmailModel.value, restartConfirm.value)
		}) // END_ASYNC_CATCH

		if (user) isSession.value = true
	}
	catch (error) { 
							err('error signing in', error)
			errorSigningInMessage.value = "Undefined Sign In Error. Please try again." 
	} // END_TRY_CATCH
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const AccountSignUp = async () => {
	try {
		await Auth.signUp({
			username: workingUsernameModel.value,
			password: workingPasswordModel.value,
			attributes: {
				email: workingEmailModel.value,
				phone_number: workingPhone_numberModel.value,
				nickname: workingNicknameModel.value
			},
			autoSignIn: { enabled: true, }
		})
		.catch(error => {
			if(error.name === "UsernameExistsException")
				errorSigningUpMessage.value = "This username is not available"
		})
	} catch (error) {
		info('error signing up:', error);
	}
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
async function AccountConfirmSignUp() {
	try {
		//					This function ONLY sets the user state to Confirmed.
		//					The user is NOT signed in.
		await Auth.confirmSignUp(workingUsernameModel.value, confirmCodeModel.value)
		//					Check to see if we were trying to restart the confirmation
		//					This will not start until the Auth.confirmSignUp(~) returns
		if (restartConfirm.value === true) {
			//				If we get here, try signing in again.
			AccountSignIn()
			toggleConfirm.value = false	// Close the Confirm Ui
			isSession.value = true			// We are signed in
			restartConfirm.value = false	// Lower the Confirm flag
		}
	} catch (error) {
		err('error confirming sign up', error);
		invalidConfirmCode.value = "Invalid Confirm Code... Try again."
	}
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
async function AccountResendConfirmationCode(username) {
	try { await Auth.resendSignUp(username) 	} 
	catch (error) { err('error resending code:', error) }
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const AccountBuildConfirmationMessage = (email:string|null = null, restartConfirm:Boolean = false) => {
	accountConfirmationMessage.Title.value = "We Emailed You"
	accountConfirmationMessage.Message.value = 
		`To confirm your new account, you must enter the ` +
		`code we emailed to the new email address you provided.` 

	if(restartConfirm) {
		if(!email) {
			//			If we get here, we are restarting Confirm and there is no email.
			return accountConfirmationMessage 
		}
				
		//			If we get here, we are retrying to confirm and the email is still available.
		//				We DIDN'T reload the page.
		let {name , domain} = parseEmail(email)
		accountConfirmationMessage.Message2.value = `<b>${name[0]}***@${domain[0]}***</b>`
		
		return accountConfirmationMessage 
	}
	//			If we get here, we are on the SignUp Happypath
	//			If we get here, the email arg contains data.
	let {name , domain} = parseEmail(email)
	let obscureEmail = `${name[0]}***@${domain[0]}***`
	accountConfirmationMessage.Message2.value = `<b>${obscureEmail}</b>`
				
	accountConfirmationMessage.Message3.value = `This may take a minuet to arrive.`

	return accountConfirmationMessage
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const parseEmail = (email) => {
	const regex = new RegExp('^(?<name>.*)@(?<domain>.*)', 'gm')
	let match = regex.exec(email)
	if (match) return { name: match.groups.name, domain: match.groups.domain }
	return null
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
						// 			This return exists to await Promise.all()
						return checkValidationResults(resultArray)
			} )
			//			At this point we have a validation error message "string" == fail
			//			--OR-- a validation passed "boolean".
			if(typeof nicknameValidationRtn == 'boolean') {
				//			Update the nicknameModel
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
				// 				This return exits the '.then'
				return resultsArray[i]
			}
		}
		return true
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
async function submitNickname(event) {
	const results = await event
	if(!results.valid) return
	// 				This will return the user in the user pool (not updated )
	const newuser = await Auth.currentAuthenticatedUser({bypassCache: true });
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
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
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
		// 				Check the format
		if(match) {
			return 'User nickname can not contain special characters. Please try another one.'
		}
		return true
}
					
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/** Not referanced */
async function UpdateNickname(workingNicknameModel){
		// 			This will return the user in the user pool (not updated )
		const newuser = await Auth.currentAuthenticatedUser({bypassCache: true});
		await Auth.updateUserAttributes(newuser, {'nickname': workingNicknameModel.value })
		await Auth.currentUserInfo().then(result => {
			nicknameModel.value = result.attributes.nickname
			workingNicknameModel.value = result.attributes.nickname
		}) // END_THEN
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/* Decl getSession */
async function getSession(){
	//				This is NOT called during SignUp
					// enter7("getSession(~)")
	const cognitoAccessToken = await Auth.currentSession()
	.then(currenSession => {
		return currenSession .getAccessToken() .getJwtToken()})
		.catch(err => { return err})
		if (cognitoAccessToken === "No current user") return { "isSession": false }

	return await Auth.currentAuthenticatedUser({bypassCache: true })
		.then((user) => {
			return {
				"nickname": user.attributes?.nickname,
				"email": user.attributes?.email,
				"phone_number": user.attributes?.phone_number,
				"username": user.attributes?.preferred_username  ? user.attributes?.preferred_username : user.username,
				"isSession": true
			}
		})
	};
	
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/* Execute getSession() */
/* 				This is NOT called during SignUp	 */
getSession().then( (result) => { 
	nicknameModel.value = result.nickname
	emailModel.value = result.email
	phone_numberModel.value = result.phone_number
	usernameModel.value = result.username
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