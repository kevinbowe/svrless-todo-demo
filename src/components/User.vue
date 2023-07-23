<template>
	<!-- SignIn & SignUp Forms -->
	<v-row no-gutters v-if="!isSession">
		<v-col :lg="4" :md="6" :sm="8" :xs="12" class="ma-auto" >
			<v-card variant="outlined" >
				<v-tabs fixed-tabs v-model="SignInSignUpTab" >
					<v-tab value="signinTab">Sign In</v-tab>
					<v-tab value="signupTab">Sign Up</v-tab>
				</v-tabs>
				<v-card-text >
					<v-window  v-model="SignInSignUpTab">
						<!-- SignIn Form -->
						<v-window-item __SIGN_IN__ value="signinTab">
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
								<v-btn :disabled="!isCompleteUserSignIn" size="large" color="primary" block class="mb-3" @click="signInUser" > Sign In </v-btn>
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
									<v-text-field id="emailSuId" v-model="workingEmailModel" 

									ref="workingEmailFieldRef"
									clearable @click:clear="clearWorkingEmailModelValidationError"
									:rules="[ 
										value => checkEmailSpecialChar(value), 
										value => checkEmailName(value), 
										value => checkEmailDomain(value),
									]"


									density="compact" variant="outlined" label="Email" required />
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
								<v-btn 	:disabled="!workingEmailModel || !workingUsernameModel || !workingPasswordModel || !workingPasswordModel2"
											block size="large" color="primary" class="mb-3" @click="signUpUser" > Sign Up </v-btn>
							</v-row>
						</v-window-item>
					</v-window>
					

				</v-card-text>
			</v-card>
		</v-col>
	</v-row>

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
	<v-row justify="center" v-if="!isSession">
		<v-overlay class="align-center justify-center" v-model="toggleUserConfirm" >
			<v-sheet width="20em" color="background" border="lg" elevation="24" 
					:style="{height:userConfirmationMessage.Message2.value ? '24em' : '21em'}">
				<v-row>
					<v-spacer/>
					<v-btn __THIS_IS_THE_X_IN_UPPER_RIGHT__ 
						class="mr-3" icon="$close" size="large" variant="text" @click="toggleUserConfirm=false"></v-btn>
				</v-row>
				<v-col style="margin-top:-2.5em;">
					<v-row no-gutters>
						<h1 class="ma-auto" v-html="userConfirmationMessage.Title.value"></h1>
						<p v-html="userConfirmationMessage.Message.value"></p>
						<p class="ma-auto" v-html="userConfirmationMessage.Message2.value"></p>
						<p class="ma-auto" v-html="userConfirmationMessage.Message3.value"></p>
					</v-row>
					<v-row><v-spacer/>
						<v-col cols="11">
							<v-text-field label="Confirmation Code" v-model="confirmUserCodeModel" 
								clearable @click:clear="confirmUserCodeModel = undefined"
								id="ConfCode" placeholder="Enter your code" class="mb-2" style="height:1.75em;" 
								variant="outlined" density="compact">
							</v-text-field>
						</v-col><v-spacer/>
					</v-row>
					<v-row class="mx-5">
						<v-btn :disabled="!confirmUserCodeModel" @click="confirmUserSignUp" block color="primary" class="mb-2" > Confirm </v-btn>
						<v-btn block color="surface" class="mb-2" @click="resendUserConfirmationCode(workingUsernameModel)"> Resend Code </v-btn>
					</v-row>
				</v-col>
			</v-sheet>
		</v-overlay>
	</v-row>
	<!-- Sign Out -->
	<v-row no-gutters v-if="isSession">
		<v-spacer></v-spacer>
		<v-col cols="8"><div> <v-btn class="mt-3" color="primary" @click="signOutUser">
			Sign Out</v-btn></div></v-col>
		<v-spacer></v-spacer>
	</v-row>
</template>

<script lang="ts">
	export const isSession = ref(false)
</script>

<script setup lang="ts">
import { info, info1, info2 , info3, info4, info5, info6, info7 } from "../my-util-code/MyConsoleUtil"
import { enter, enter0, enter1, enter2, enter3, enter4, enter5, enter6, enter7 } from "../my-util-code/MyConsoleUtil"
import { bar, whitebar, greybar, redbar, greenbar, orangebar } from "../my-util-code/MyConsoleUtil"
import { log, warn, err, err2, exit, success, pass, fail, fini, start, progress, joy, } from "../my-util-code/MyConsoleUtil"

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
import { Auth, Hub } from 'aws-amplify';
import { ref, Ref, computed } from 'vue'
import { parseEmail, emailModel } from '../components/Email.vue'
import { nicknameModel } from  "../components/Nickname.vue"
import { usernameModel } from  "../components/Preferred_username.vue"

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const SignInSignUpTab = ref()
const errorSigningInMessage = ref("")
const workingUsernameModel = ref("")
const workingPasswordModel = ref("")
const workingPasswordModel2 = ref("")

const passwordIcon1 = ref(false)
const passwordIcon2 = ref(false)
const passwordIcon2b = ref(false)

const errorSigningUpMessage =ref("")
const workingEmailModel =ref("")
const workingPhone_numberModel = ref("")
const workingNicknameModel =  ref("")
const workingPreferred_usernameModel = ref("")

const userConfirmationMessage = { Title: ref(""), Message: ref(""), Message2: ref(""), Message3: ref("") }
const confirmUserCodeModel = ref()

const toggleUserConfirm:Ref<boolean> = ref(false)
const restartConfirm = ref()
const openDialogFlag = ref()

const phone_numberModel= ref("")

/*||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
|||                       MOVE THIS CODE WHEN FINISHED	
|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| */

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const workingEmailFieldRef = ref()
const clearWorkingEmailModelValidationError = () => workingEmailFieldRef.value.resetValidation()


/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/*																											*/
/**/					const BLOCKAPIFLAG = ref(true)										 /**/
/*																											*/
/* 				if(BLOCKAPI("submitEmail function "))return								*/
/*																											*/
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
			enter0("Hub.listen => Case SignUp")
			confirmUserCodeModel.value = null // Clear confirmCodeModel - Prepare for input
			toggleUserConfirm.value = true // Display Confirm Ui
			restartConfirm.value = false
			buildUserConfirmationMessage(workingEmailModel.value, restartConfirm.value)
			return
		case "confirmSignUp" :
			// bar()
			// enter1("Hub.listen => Case CONFIRM SignUp -> Toggle Confirm")
			toggleUserConfirm.value = false // Hide Confirm Ui
			return
		case "autoSignIn" :
			// bar()
			// enter2("Hub.listen => Case AUTO SignIn -> CLEAR Working Models")
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
			isSession.value = true
			return
		case "signOut" :
			return
	} // END_SWITCH
})

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const isCompleteUserSignIn = computed<boolean>(() => workingUsernameModel.value && workingPasswordModel.value ? true : false )

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/* Email -- Validation */
/* ----------------------------------------------------------------------------- */
const checkEmailSpecialChar = (emailArg) => {
					// DEBUG CODE
					if (emailArg === null) info7("checkEmailSpecialChar(emailArg) > emailArg is Null")
	
	//				Check ALL Special Chars -- REFERENCE -- 7/21/23
	const rxAll = /[+\-_@\.`~!#$%^&'"*,:;/ {}[\]()<>]/gm

	// 			Exclude these Special Chars ---->  +  -  _  @  .
	const rxExclude = /[`~!#$%^&'"*,:;/ {}[\]()<>]/gm
	const matchExclude = emailArg.match(rxExclude)
	if(matchExclude) return `Special chars are not allowed [ ${matchExclude} ]`
			
	//				Perform multiple '@'' check
	const rxMultiAtChar = /@{2}|@.*@/gm
	const matchMultiAtChar = emailArg.match(rxMultiAtChar)
	if(matchMultiAtChar) return "Multiple '@' chars are not allowed"

	//				Perform consecutive special char check  ---->  . -  +
	let rxConsecutive = /\.\.|--|\+\+/gm
	const matchConsecutive = emailArg.match(rxConsecutive)
	if ( matchConsecutive) return `Consecutive Special Characters are not allowed. [ ${matchConsecutive} ]`
	
	return true
}
/* ----------------------------------------------------------------------------- */
const checkEmailName = (emailArg) => {
	const parsedEmail = parseEmail(emailArg)
	if (!parsedEmail) return "FAIL checkEmailName() > Invalid Email"
	
	//				Length check ( long & short ) ---->	64 char
	//				0123456789_123456789_123456789_123456789_123456789_123456789_1234
	let len = parsedEmail.name.length;
	if(len > 64) return "FAIL checkEmailName() > Length Check: Max char allowed = 64 char"
	if(len <= 0) return "FAIL checkEmailName() > Length Check: Min char allowed = 1 char"

	//				Leading and trailing special char check. -- The trailing '_' has been removed from the check.
	//			 	_asd@gmail.com		-asd@gmail.com		asd-@gmail.com
	//				+asd@gmail.com		asd+@gmail.com		.asd@gmail.com		asd.@gmail.com
		const rxLeadTrailChar = /^[-_+\\.]|[-+\\.]$/gm
	let matchLeadTrailChar = parsedEmail.name.match(rxLeadTrailChar)
	if(matchLeadTrailChar) return `[-_+.] can not be the first/last char of email name [ ${matchLeadTrailChar} ]`

	return true
}
/* ----------------------------------------------------------------------------- */
const checkEmailDomain = (emailArg) => {
	const emailDomain = parseEmail(emailArg).domain

	//			Length check ( long & short ) ----> 253 char
	//			asd@_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789.com   */
	let len = emailDomain.length;
	if(len > 253) return `Max Valid Domain Length: 253 -- Actual Length: ${emailDomain.length}`
	if(len <= 2) return `Min Valid Domain Length: 3 -- Actual Length: ${emailDomain.length}`
	
	//			Split the domain and tld and check from both pieces.
	const rxDomainAndTLD = /^(?<domain>.*)[\\.|\\s](?<tld>.*)/m
	let matchDomainAndTLD = emailDomain.match(rxDomainAndTLD)

	//			Check Domain
	if(matchDomainAndTLD?.groups?.domain.length === 0 || matchDomainAndTLD?.groups?.domain === undefined) 
		return `An email domain is required ${emailDomain}`
	
	//			Check Leading/Trailing Special Char in Domain
	// 		asd@-asd.com	asd@asd-.com	asd@.asd.com	asd@asd..com
	// 		asd@_asd.com	asd@asd_.com	asd@+asd.com	asd@asd+.com
	const rxLeadTrailDomainChar = /^[-_+\\.]|[-_+\\.]$/gm
	let matchLeadTrailDomainChar = matchDomainAndTLD.groups.domain.match(rxLeadTrailDomainChar)
	if(matchLeadTrailDomainChar) return `[-_+.] can not be the first/last char in the domain name [ ${matchLeadTrailDomainChar} ]`
	
	//			Check	TLD (Top-Level-Domain)
	if(matchDomainAndTLD?.groups.tld.length === 0 || matchDomainAndTLD?.groups.tld === undefined)
		return "FAIL checkEmailDomain() > Domain Check: TopLevelDomain is missing"
	
	//			Check Leading/Trailing Special Char in TLD
	let matchLeadAndTrailTldChar = matchDomainAndTLD?.groups.tld.match(rxLeadTrailDomainChar)
	if(matchLeadAndTrailTldChar) return `[-_+.] can not be the first/last char in the TLD name [ ${matchLeadAndTrailTldChar} ]`
	return true
}


/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const buildUserConfirmationMessage = (email:string|null = null, restartConfirm:Boolean = false) => {
	userConfirmationMessage.Title.value = "We Emailed You"
	userConfirmationMessage.Message.value = 
		`To confirm your new account, you must enter the ` +
		`code we emailed to the new email address you provided.` 
	if(restartConfirm) {
		if(!email) {
			//			If we get here, we are restarting Confirm and there is no email.
			return userConfirmationMessage 
		}
		//			If we get here, we are retrying to confirm and the email is still available.
		//				We DIDN'T reload the page.
		let {name , domain} = parseEmail(email)
		userConfirmationMessage.Message2.value = `<b>${name[0]}***@${domain[0]}***</b>`
		return userConfirmationMessage 
	}
	//			If we get here, we are on the SignUp Happypath
	//			If we get here, the email arg contains data.
	let {name , domain} = parseEmail(email)
	let obscureEmail = `${name[0]}***@${domain[0]}***`
	userConfirmationMessage.Message2.value = `<b>${obscureEmail}</b>`
	userConfirmationMessage.Message3.value = `This may take a minuet to arrive.`
	return userConfirmationMessage
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
async function confirmUserSignUp() {
	// if(BLOCKAPI("confirmUserSignUp function "))return
	try {
		//					This function ONLY sets the user state to Confirmed.
		//					The user is NOT signed in.
		await Auth.confirmSignUp(workingUsernameModel.value, confirmUserCodeModel.value)
		//					Check to see if we were trying to restart the confirmation
		//					This will not start until the Auth.confirmSignUp(~) returns
		if (restartConfirm.value === true) {
			//				If we get here, try signing in again.
			signInUser()
			toggleUserConfirm.value = false	// Close the Confirm Ui
			isSession.value = true			// We are signed in
			restartConfirm.value = false	// Lower the Confirm flag
		}
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
const signUpUser = async () => {
	// if(BLOCKAPI("signUpUser function "))return
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
		}) // END_ASYNC_CATCH
		if (user) isSession.value = true
	}
	catch (error) { 
							err('error signing in', error)
			errorSigningInMessage.value = "Undefined Sign In Error. Please try again." 
	} // END_TRY_CATCH
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const signOutUser = async () => {
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

 			toggleUserConfirm.value = false
 			isSession.value = false
		})
	}
	catch (error) { console.log('error signing out: ', error);}
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/* Decl getSession */
async function getSession(){
	//				This is NOT called during SignUp
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
})

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
</script>