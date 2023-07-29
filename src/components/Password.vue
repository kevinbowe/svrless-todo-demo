<template>
	<!-- Update password-->
	<v-row justify="center">
		<v-col :sm="8" :md="6" :lg="4" class="ma-5" >
		<v-form validate-on="submit" @submit.prevent="submitPassword" >
			<v-row>
				<v-text-field label="Current Password"  v-model= "workingPasswordModel" 
					clearable 
					:rules="[ ]" variant="outlined" density="compact" 
				></v-text-field>
			</v-row>
			<v-row>
				<v-text-field label="New Password"  v-model= "newWorkingPasswordModel" 
					clearable 
					:rules="[ ]" variant="outlined" density="compact" 
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
const clearWorkingPasswordModelValidationError = () => passwordFormRef.value.resetValidation()

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
</script>

<style>
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
</style>