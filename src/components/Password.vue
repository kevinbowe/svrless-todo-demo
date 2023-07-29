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

	<!-- PopUp Message Dialog -- Modal -->
	<v-row justify="center" v-if="openDialogFlag" >
		<v-dialog activator="parent" v-model="openDialogFlag" persistent >
			<v-card 	color="background_alt" border="lg" 
						class="ma-auto" height="10em" width="22em" elevation="24">
				<v-card-text> 
					<h1>Success</h1><strong>Your password has been Updated.</strong>
				</v-card-text>
				<v-card-actions>
					<v-btn @click="openDialogFlag = false" block 
					color="surface" 
					style="background-color:rgb(var(--v-theme-primary))"> OK </v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
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
import { checkPasswordTooShort, checkPasswordSpecialChars } from "../components/PasswordParts/PasswordValidators"

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
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
const openDialogFlag = ref()
const workingPasswordFormRef = ref()
const newWorkingPasswordFormRef = ref()

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const clearWorkingPasswordModelValidationError = () => workingPasswordFormRef.value.resetValidation()
/* ----------------------------------------------------------------------------- */
const clearNewWorkingPasswordModelValidationError = () => newWorkingPasswordFormRef.value.resetValidation()

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
async function submitPassword (event) {

	if(BLOCKAPI("submitPassword function "))return
	
	const results = await event
	if(!results.valid)return /* Cancel Submission if validation FAILED */
	
	//				If we get here, validation was sucessful
	//				This will return the user in the user pool (not updated )
	const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
	//				This updates the password
	await Auth.changePassword(authUser, workingPasswordModel.value, newWorkingPasswordModel.value)
	//				Clear the working fields.
	newWorkingPasswordModel.value = ""
	workingPasswordModel.value = ""
	//				Display the confirmation dialog.
	openDialogFlag.value = true
}

</script>

<style>
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
</style>