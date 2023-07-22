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
								<v-btn 	:disabled="!workingEmailModel || !workingUsernameModel || !workingPasswordModel || !workingPasswordModel2"
											block size="large" color="primary" class="mb-3" @click="signUpUser" > Sign Up </v-btn>
							</v-row>
						</v-window-item>
					</v-window>
				</v-card-text>
			</v-card>
		</v-col>
	</v-row>
	<!-- SignUp Confirmation -->
	<!-- <v-row justify="center" v-if="!isSession">
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
	</v-row> -->
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
import { Auth } from 'aws-amplify';
import { ref, Ref, computed } from 'vue'

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

const toggleUserConfirm:Ref<boolean> = ref(false)

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const isCompleteUserSignIn = computed<boolean>(() => workingUsernameModel.value && workingPasswordModel.value ? true : false )

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
// 		.catch(error => {
// 			if(error.name === "NotAuthorizedException") errorSigningInMessage.value = "Incorrect username or password. Please try again." 
// 			if(error.name !== "UserNotConfirmedException") return
// 
// 			//				Restart the confirmation.
// 			toggleUserConfirm.value = true // Display Confirm Ui
// 			restartConfirm.value = true
// 			//				Initialize the Invalid Confirm Code model and message
// 			confirmUserCodeModel.value = undefined
// 			buildUserConfirmationMessage(workingEmailModel.value, restartConfirm.value)
// 		}) // END_ASYNC_CATCH
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
// 			emailModel.value = ""
// 			nicknameModel.value = ""
// 			usernameModel.value = ""
// 			phone_numberModel.value = ""
// 
// 			workingPasswordModel.value = ""
// 			workingPasswordModel2.value = ""
// 
// 			workingEmailModel.value = ""
// 			workingNicknameModel.value = ""
// 			workingUsernameModel.value = ""
// 			workingPhone_numberModel.value = ""
// 
 			toggleUserConfirm.value = false
 			isSession.value = false
		})
	}
	catch (error) { console.log('error signing out: ', error);}
}

// /* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
// /* Decl getSession */
// async function getSession(){
// 	//				This is NOT called during SignUp
// 	const cognitoAccessToken = await Auth.currentSession()
// 	.then(currenSession => {
// 		return currenSession .getAccessToken() .getJwtToken()})
// 		.catch(err => { return err})
// 		if (cognitoAccessToken === "No current user") return { "isSession": false }
// 
// 	return await Auth.currentAuthenticatedUser({bypassCache: true })
// 		.then((user) => {
// 			return {
// 				"nickname": user.attributes?.nickname,
// 				"email": user.attributes?.email,
// 				"phone_number": user.attributes?.phone_number,
// 				"username": user.attributes?.preferred_username  ? user.attributes?.preferred_username : user.username,
// 				"isSession": true
// 			}
// 		})
// 	};


// // const isSession = ref()
// /* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
// /* Execute getSession() */
// /* 				This is NOT called during SignUp	 */
// getSession().then( (result) => { 
// 	// nicknameModel.value = result.nickname
// 	// emailModel.value = result.email
// 	// phone_numberModel.value = result.phone_number
// 	// usernameModel.value = result.username
// 	isSession.value = result.isSession;
// })



/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
</script>