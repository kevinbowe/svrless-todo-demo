<template>
	<!-- PopUp Reset Password Dialog -- Modal -->
	<v-row justify="center" __v-if="openResetPasswordDialogFlag">
		<v-dialog __RESET_SIGNAL_1__ 
		v-if="passwordResetSignal == 1" activator="parent" v-model="openResetPasswordDialogFlag" persistent >
			<v-card class="mx-auto" width="21em" color="background_alt" border="lg" elevation="24">
				<v-form validate-on="submit" @submit.prevent="submitSignal" >
					<v-card-title>
						<v-row>
							<v-col >
								<p class="text-h4">Reset Password</p>
							</v-col>
							<v-col cols="1" class="justify-end">
								<v-btn style="padding-bottom:3em;"
								icon="$close" size="large" variant="text" 
								@click="cancelResetPassword"/>
								<!-- @click="{openResetPasswordDialogFlag=false; passwordResetSignal=0}"/> -->
							</v-col>
						</v-row>
					</v-card-title>
					<v-card-text>
						<v-text-field __User_Name__
						v-model="workingUsername_RESET_PID_Model" ref="workingUsername_RESET_PID_FieldRef"
						clearable @click:clear="clearWorkingUsername_RESET_PID_ModelValidationError"
						:rules="[
							value => !!value,
							value => checkWorkingUsernameTooShort(value),
							value => checkWorkingUsernameFirstChar(value),
							value => checkWorkingUsernameSpecialCharExceptions(value)
						]" 
						density="compact" variant="outlined" label="Username" required />
					</v-card-text>
					<v-card-actions>
						<v-btn type="submit" :disabled="!workingUsername_RESET_PID_Model" block color="surface" 
						style="background-color:rgb(var(--v-theme-primary))"> 
							OK 
						</v-btn> 
					</v-card-actions>
				</v-form>
			</v-card>
		</v-dialog>
		<v-dialog __RESET_SIGNAL_2__ 
		v-if="passwordResetSignal == 2" activator="parent" v-model="openResetPasswordDialogFlag" persistent >
			<v-card class="mx-auto" width="21em" color="background_alt" border="lg" elevation="24">
				<v-form validate-on="submit" @submit.prevent="submitSignal">
					<v-card-title>
						<v-row>
							<v-col >
								<p class="text-h4">Reset Password</p>
							</v-col>
							<v-col cols="1" class="justify-end">
								<v-btn style="padding-bottom:3em;"
								icon="$close" size="large" variant="text" 
								@click="cancelResetPassword"/>
								<!-- @click="{openResetPasswordDialogFlag=false; passwordResetSignal=0}"/> -->
							</v-col>
						</v-row>
					</v-card-title>
					<v-card-text>
						<v-row __User_Code__ >
							<v-text-field label="Confirmation Code" v-model="confirmationCode_RESET_PID_Model"
							ref="confirmationCode_RESET_PID_FieldRef" 
							clearable @click:clear="clearConfirmationCode_RESET_PID_ModelValidationError"
							:rules="[ 
								value => value.length <= 5 ? `Invalid Code > Length = [ ${value.length} ]` : true,
						 	]"
							placeholder="Enter your code" variant="outlined" density="compact"/>
						</v-row>
						<v-row __New_Password__>
							<v-text-field label="New Password" v-model="workingPassword_RESET_PID_Model" 
							:append-inner-icon="passwordIcon1 ? 'mdi-eye' : 'mdi-eye-off'" 
							prepend-inner-icon="mdi-lock-outline" :type="passwordIcon1 ? 'text' : 'password'"  
							@click:append-inner="passwordIcon1 = !passwordIcon1"
							ref=workingPassword_RESET_PID_FieldRef
							clearable @click:clear="clearWorkingPassword_RESET_PID_ModelValidationError"
							:rules="[ 
								// value => !!value || 'Required',
								value => !!value,
								value => checkPasswordTooShort(value),
								value => checkPasswordSpecialChars(value),
							]"
							variant="outlined" density="compact" />
						</v-row>
					</v-card-text>
					<v-card-actions>
						<v-btn type="submit" :disabled="!confirmationCode_RESET_PID_Model || !workingPassword_RESET_PID_Model" 
						block color="surface" style="background-color:rgb(var(--v-theme-primary))"> 
							OK 
						</v-btn> 
					</v-card-actions>
				</v-form>
			</v-card>
		</v-dialog>

		<v-overlay __RESET_SIGNAL_3__
		v-if="passwordResetSignal == 3" v-model="overlayVisible"
		class="align-center justify-center">
			<v-card width="21em" class="pa-2 text-center" color="background_alt" border="lg" elevation="24">
				<p class="text-h4"> Reset Success </p>
				<p> Your Password has been Updated. </p>
				<v-btn class="mt-7" block color="primary" @click="passwordResetNextStep"> OK </v-btn> 
			</v-card>
		</v-overlay>
	</v-row>

</template>

<!-- %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% -->
<script lang="ts">
	export const isSession = ref()
	export default {inheritAttrs: false}
</script>

<script setup lang="ts">

import { info, info1, info2 , info3, info4, info5, info6, info7 } from "../my-util-code/MyConsoleUtil"
import { enter, enter0, enter1, enter2, enter3, enter4, enter5, enter6, enter7 } from "../my-util-code/MyConsoleUtil"
import { bar, whitebar, greybar, redbar, greenbar, orangebar } from "../my-util-code/MyConsoleUtil"
import { err } from "../my-util-code/MyConsoleUtil"

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
import { Auth, Hub } from 'aws-amplify';
import { ref, Ref, computed } from 'vue'
/* ----------------------------------------------------------------------------- */

import  { checkWorkingUsernameTooShort, checkWorkingUsernameFirstChar, checkWorkingUsernameSpecialCharExceptions}
	from "../components/UsernameParts/UsernameValidators"

import { checkPasswordSpecialChars, checkPasswordTooShort } from "../components/PasswordParts/PasswordValidators"

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const DEBUG_Model = ref()

const nicknameModel = ref("")
const emailModel = ref("")
const phone_numberModel = ref("")
const usernameModel = ref("")

const passwordIcon1 = ref(false)

const openResetPasswordDialogFlag = ref(true)
const overlayVisible = ref(true)
const passwordResetSignal = ref(1) //	[ Done/Ready == 0 | Request == 1 | Confirm == 2 | Fini == 3 ]

const emit = defineEmits()

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

const workingUsernameFieldRef = ref("")
const clearWorkingUsernameModelValidationError = () => workingUsernameFieldRef.value.resetValidation()

const workingPhone_numberFieldRef = ref("")
const clearWorkingPhone_numberValidationError = () => workingPhone_numberFieldRef.value.resetValidation()

const workingPassword_RESET_PID_Model = ref("")
const workingPassword_RESET_PID_FieldRef = ref("")
const clearWorkingPassword_RESET_PID_ModelValidationError = () => workingPassword_RESET_PID_FieldRef.value.resetValidation()

const workingUsername_RESET_PID_Model = ref("")
const workingUsername_RESET_PID_FieldRef = ref("")
const clearWorkingUsername_RESET_PID_ModelValidationError = () => workingUsername_RESET_PID_FieldRef.value.resetValidation()

const confirmationCode_RESET_PID_Model = ref("")
const confirmationCode_RESET_PID_FieldRef = ref("")
const clearConfirmationCode_RESET_PID_ModelValidationError = () => confirmationCode_RESET_PID_FieldRef.value.resetValidation()

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/*																											*/
/**/					const BLOCKAPIFLAG = ref(false)										 /**/
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
async function submitSignal (event) {
	if(BLOCKAPI("submitPassword function ")) return

	const results = await event
	if(!results.valid) return /* Cancel Submission if validation FAILED */

	//				If we get here, validation was sucessful
	passwordResetNextStep()
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const passwordResetNextStep = () => {
	passwordResetSignal.value = passwordResetSignal.value <= 2 ? ++passwordResetSignal.value : 0 
	openResetPasswordDialogFlag.value = passwordResetSignal.value == 0 ? false : true

	switch (passwordResetSignal.value) {
		case 0:			info(`passwordResetNextStep > Case 0 -- Fini`)
			cancelResetPassword()
			// emit( 'onResetPasswordFini', {resetPasswordState: false})
			break;
		case 1:			//info1(`passwordResetNextStep > Case 1 -- UID`)
			// 			Collect the UID and send to Cognito. -- This will generate a confirmation code.
			try { // Auth.forgotPassword(workingUsernameModel.value)
			} catch(err) { console.log(err);}
			break;
		case 2:			//info2(`passwordResetNextStep > Case 2 -- Conf Code & PID`)
			try { // Auth.forgotPasswordSubmit(	workingUsernameModel.value, confirmUserCodeModel.value, newWorkingPasswordModel.value);
			} catch(err) { console.log(err); }
			break;
		case 3:			//info3(`   passwordResetNextStep > Case 3 -- Msg`)
			break;
	}
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const cancelResetPassword = () => {
	emit( 'onResetPasswordFini', {resetPasswordState: false})
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
Auth.currentAuthenticatedUser({bypassCache: true})
	.then(results => {
		nicknameModel.value =  results.attributes.nickname
		emailModel.value = results.attributes.email
		phone_numberModel.value = results.attributes.phone_number
		usernameModel.value = results.attributes.preferred_username ? results.attributes.preferred_username : results.username
		isSession.value = true
	})
	.catch( () => { 
		isSession.value = false	
	})

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
</script>