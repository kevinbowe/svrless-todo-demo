<template>
	<!-- Update password-->
	<v-row justify="center">
		<v-col :sm="8" :md="6" :lg="4" class="ma-5" >
		<v-form validate-on="submit" @submit.prevent="submitPassword" >
			
			<v-row>
				<v-text-field label="Current Password"  v-model= "workingPasswordModel" 
					:append-inner-icon="passwordIcon1 ? 'mdi-eye' : 'mdi-eye-off'" 
					prepend-inner-icon="mdi-lock-outline" :type="passwordIcon1 ? 'text' : 'password'"  @click:append-inner="passwordIcon1 = !passwordIcon1"
					ref=workingPasswordFormRef
					clearable @click:clear="clearWorkingPasswordModelValidationError"
					:rules="[ 
						value => checkPasswordTooShort(value),
						value => checkPasswordSpecialChars(value),
				 	]" 
					variant="outlined" density="compact" 
				></v-text-field>
			</v-row>
			
			<v-row>
				<v-text-field label="New Password"  v-model= "newWorkingPasswordModel" 
					:append-inner-icon="passwordIcon2 ? 'mdi-eye' : 'mdi-eye-off'" 
					prepend-inner-icon="mdi-lock-outline" :type="passwordIcon2 ? 'text' : 'password'"  @click:append-inner="passwordIcon2 = !passwordIcon2"
					ref=newWorkingPasswordFormRef
					clearable @click:clear="clearNewWorkingPasswordModelValidationError"
					:rules="[ 						
						value => checkPasswordTooShort(value),
						value => checkPasswordSpecialChars(value), 
					]" 
					variant="outlined" density="compact" 
				></v-text-field>
			</v-row>

			<v-row class="justify-end">
				<v-btn :disabled="!workingPasswordModel || !newWorkingPasswordModel" color="primary" type="submit"> Update Password </v-btn>
			</v-row>
		</v-form>
		</v-col>
	</v-row>
</template>

<script setup lang="ts">
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
				/*  */
import { info, info1, info2 , info3, info4, info5, info6, info7 } from "../my-util-code/MyConsoleUtil"
import { enter, enter0, enter1, enter2, enter3, enter4, enter5, enter6, enter7 } from "../my-util-code/MyConsoleUtil"
import { bar, whitebar, greybar, redbar, greenbar, orangebar } from "../my-util-code/MyConsoleUtil"
				/*  */
import { ref } from 'vue'
import { Auth } from 'aws-amplify';

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const passwordFormRef = ref()
const workingPasswordModel =ref("")
const newWorkingPasswordModel =ref("")
const passwordIcon1 = ref(false)
const passwordIcon2 = ref(false)
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
async function submitPassword (event) {

	if(BLOCKAPI("submitPassword function "))return
	
	const results = await event
	if(!results.valid) {
		return /* Cancel Submission if validation FAILED */
	}
	//				If we get here, validation was sucessful
	//				This will return the user in the user pool (not updated )
	const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});

	//				This updates the password
	await Auth.changePassword(authUser, workingPasswordModel.value, newWorkingPasswordModel.value)
}
	
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const workingPasswordFormRef = ref()
const clearWorkingPasswordModelValidationError = () => workingPasswordFormRef.value.resetValidation()
/* ----------------------------------------------------------------------------- */
const newWorkingPasswordFormRef = ref()
const clearNewWorkingPasswordModelValidationError = () => newWorkingPasswordFormRef.value.resetValidation()

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
async function checkPasswordTooShort (password) {
	if (password.length <= 5) return 'User password is too short. Please try another one.'
	return true
}
/* ----------------------------------------------------------------------------- */
async function checkPasswordSpecialChars (password) {
	//				These chars are valid.
	//			>>>-->	!  @  #  $  %  ^  &  * <--<<<

	//				Check ALL Special Chars -- REFERENCE -- 7/21/23
	const rxAll = /[+\-_@\.`~!#$%^&'"*,:;/ {}[\]()<>]/gm

	const rxException = /[+\-_\.`~'",:;/ {}[\]()<>]/gm
	const match = password.match(rxException)
	if(match) return 'No Special characters. Exceptions: ! @ # $ % ^ & * '
	return true
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
</script>

<style>
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
</style>