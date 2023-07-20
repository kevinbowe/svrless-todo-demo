<template>
	<!-- Update Preferred Username -->
	<v-row justify="center" v-if="isSession">
	<v-col :sm="8" :md="6" :lg="4" class="ma-5" >
	<v-form ref="preferred_usernameFormRef" validate-on="submit" @submit.prevent="submitPreferred_username">
		<v-row>
			<v-text-field label="User Name" :rules="[
					checkPreferred_usernameTooShort,
					checkPreferred_usernameFirstChar,
					checkPreferred_usernameSpecialCharExceptions
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
</template>

<script lang="ts">
	export const usernameModel = ref("")
</script>

<script setup lang="ts">
import { info, info1, info2 , info3, info4, info5, info6, info7 } from "../my-util-code/MyConsoleUtil"
import { enter, enter0, enter1, enter2, enter3, enter4, enter5, enter6, enter7 } from "../my-util-code/MyConsoleUtil"
import { bar, whitebar, greybar, redbar, greenbar, orangebar } from "../my-util-code/MyConsoleUtil"
import { log, warn, err, err2, exit, success, pass, fail, fini, start, progress, joy, } from "../my-util-code/MyConsoleUtil"
/*  */
import { ref, } from 'vue'
import { Auth } from 'aws-amplify';

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const workingPreferred_usernameModel = ref("")
const invalidUsernameDialogFlag = ref(false)
//const usernameModel = ref("")
const preferred_usernameFormRef = ref()

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
defineProps({
	isSession: Boolean
})

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
async function submitPreferred_username (event) {
	if(BLOCKAPI("submitPreferred_username function "))return

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
		workingPreferred_usernameModel.value = ""
	})
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const clearPreferred_usernameModelValidationError = () => preferred_usernameFormRef.value.resetValidation()

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
async function checkPreferred_usernameTooShort (workingPreferred_usernameModel) {
	if (workingPreferred_usernameModel.length > 0 && workingPreferred_usernameModel.length <= 2) {
		return 'User name is too short. Please try another one.'
	}
	return true
}

async function checkPreferred_usernameFirstChar (workingPreferred_usernameModel) {
		if (!isNaN(workingPreferred_usernameModel[0])) {
			return 'User name can not begin with a Number. Please try another one.'
		}
		return true
}

async function checkPreferred_usernameSpecialCharExceptions (workingPreferred_usernameModel) {
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
</script>

<style></style>