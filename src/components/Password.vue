<template>
	<div class="ma-3">

	<!-- Access Preferred_username -->
	<v-card class="ma-auto pa-2" variant="tonal" max-width="30em" elevation="24" >
			<v-card-text>
				<v-row >
					<v-col>
						<v-row class="text-h6"> Change Password </v-row>
						<!-- <v-row>{{ props.username }}</v-row> -->
					</v-col>
					<v-col align-self="center">
						<v-row justify="end">
							<v-btn text="Edit" v-if="!showPassword" color="minor" @click="showPassword=!showPassword"/>
						</v-row>
					</v-col>
				</v-row>
			</v-card-text>
		</v-card>

	<!-- Update Preferred Username -->
	<v-sheet v-if="showPassword" color="background" max-width="30em" class="mx-auto">
		<v-form validate-on="submit" @submit.prevent="submitPassword" >
			<div class="mx-3 my-6">
				
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
					variant="outlined" density="compact" />
				</v-row>

				<v-row class="mt-4">
					<v-text-field label="New Password"  v-model= "newWorkingPasswordModel" 
					:append-inner-icon="passwordIcon2 ? 'mdi-eye' : 'mdi-eye-off'" 
					prepend-inner-icon="mdi-lock-outline" :type="passwordIcon2 ? 'text' : 'password'"  
					@click:append-inner="passwordIcon2 = !passwordIcon2"
					ref=newWorkingPasswordFormRef
					clearable @click:clear="clearNewWorkingPasswordModelValidationError"
					:rules="[ 						
						value => checkPasswordTooShort(value),
						value => checkPasswordSpecialChars(value), 
					]" 
					variant="outlined" density="compact" />
				</v-row>	
				
				<v-row class="justify-end px-3 py-2">
					<v-btn text="Cancel" class="mx-1" color="surface" @click="showPassword = false; workingPasswordModel=''; newWorkingPasswordModel='' "/> 
					<v-btn text="Update Password" :disabled="!workingPasswordModel || !newWorkingPasswordModel" color="primary" type="submit"/>
				</v-row>
			</div>
		</v-form>

	</v-sheet>
</div>

	<!-- PopUp Message Dialog -- Modal -->
	<v-row justify="center" v-if="openDialogFlag" >
		<v-dialog activator="parent" v-model="openDialogFlag" persistent >
			<v-card 	color="background_alt" border="lg" 
						class="ma-auto" height="10em" width="22em" elevation="24">
				<v-card-text> 
					<h1>Success</h1><strong>Your password has been Updated.</strong>
				</v-card-text>
				<v-card-actions>
					<v-btn text="OK" @click="openDialogFlag = false; showPassword = false" 
					block color="surface" style="background-color:rgb(var(--v-theme-primary))"/>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-row>

</template>

<script lang="ts">
	export default {inheritAttrs: false}
</script>

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
const emit = defineEmits()

const workingPasswordModel =ref("")
const newWorkingPasswordModel =ref("")
const passwordIcon1 = ref(false)
const passwordIcon2 = ref(false)

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const openDialogFlag = ref()
const workingPasswordFormRef = ref()
const newWorkingPasswordFormRef = ref()

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const clearWorkingPasswordModelValidationError = () => workingPasswordFormRef.value.resetValidation()
/* ----------------------------------------------------------------------------- */
const clearNewWorkingPasswordModelValidationError = () => newWorkingPasswordFormRef.value.resetValidation()

const showPassword = ref(false)

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
async function submitPassword (event) {
	const results = await event
		if(!results.valid) {
			return /* Cancel Submission if validation FAILED */
		}
	if(BLOCKAPI("submitPassword function ")) {
		newWorkingPasswordModel.value = ""
		workingPasswordModel.value = ""
		openDialogFlag.value = true 
		return
	}

	//				If we get here, validation was sucessful
	//				This will return the user in the user pool (not updated )
	const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
	//				This updates the password
	await Auth.changePassword(authUser, workingPasswordModel.value, newWorkingPasswordModel.value)
	//				Clear the working fields.
	newWorkingPasswordModel.value = ""
	workingPasswordModel.value = ""
	//				Display the confirmation dialog.
	//				The emit will be executed from the dialog.
	openDialogFlag.value = true 
}

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
</script>

<style>
</style>