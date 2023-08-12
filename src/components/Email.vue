<template>
<!-- Update Email-->
<v-sheet color="background" max-width="30em" class="mx-auto px-3">
	<v-row justify="start" class="mx-0 pt-5 text-h6"> Change Email </v-row>
	<v-row justify="start" class="mx-0 pb-5"> {{ emailModel }} </v-row>
	
	<v-form ref="emailFormRef" validate-on="submit" @submit.prevent="submitEmail" >
		<v-text-field label="Email -- Confirmed" v-model= "workingEmailModel" 
		:rules="[ 
			value => checkWorkingEmailSpecialChar(value), 
			value => checkWorkingEmailName(value), 
			value => checkWorkingEmailDomain(value),
		]"
		variant="outlined" density="compact" 
		clearable @click:clear="clearWorkingEmailModelValidationError"/>

		<v-row class="justify-end px-3">
			<v-btn text="Cancel" class="mx-1" color="surface" @click="showEmail = false; emit('onCancelEmail', false )"/>
			<v-btn text="Save Email" :disabled="!workingEmailModel" color="primary" type="submit"/>
		</v-row>
	</v-form>
</v-sheet>

<!-- Update Email Confirmation -->
<v-overlay class="align-center justify-center" v-model="toggleConfirmEmail" >
	<v-sheet width="20em" class="pa-3" elevation="24" color="background" border="lg">
			<v-row><v-spacer/>
			<v-btn __THIS_IS_THE_X_IN_UPPER_RIGHT__ icon="$close" size="large" variant="text" 
			@click="toggleConfirmEmail=false; workingEmailModel = ''; "/>
		</v-row>
		<v-row class="pa-5" style="margin-top:-2.5em;" no-gutters>
			<h1 class="ma-auto" v-html="emailConfirmationMessage.Title.value"></h1>
			<p v-html="emailConfirmationMessage.Message.value"></p>
			<p class="ma-auto" v-html="emailConfirmationMessage.Message2.value"></p>
			<p class="ma-auto" v-html="emailConfirmationMessage.Message3.value"></p>
		</v-row>

		<v-form validate-on="submit" @submit.prevent="applyEmailConfirmationCode">
			<v-text-field label="Confirmation Code" v-model="confirmEmailCodeModel" 
			ref="confirmEmailCodeModelFieldRef" id="ConfCode" 
			:rules="[
				value => !!value,
				value => checkConfirmationTooShort(value),
				value => checkConfirmationSpecialChars(value),
			]"
			placeholder="Enter your code" variant="outlined" density="compact"
			clearable @click:clear="clearConfirmEmailCodeModelValidationError"/>
			<v-btn block class="my-5" color="primary" type="submit" :disabled="!confirmEmailCodeModel" > 
				Confirm 
			</v-btn>
		</v-form>

		<v-btn block color="surface" @click="resendEmailConfirmationCode" >
			Resend Code 
		</v-btn>

	</v-sheet>
</v-overlay>

<!-- PopUp Message Dialog -- Modal -->
<v-dialog v-if="openDialogFlag" activator="parent" v-model="openDialogFlag" persistent >
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
</template>

<script lang="ts">
	export default {inheritAttrs: false}
</script>

<script setup lang="ts">
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
import { info, info1, info2 , info3, info4, info5, info6, info7 } from "../my-util-code/MyConsoleUtil"
import { enter, enter0, enter1, 
			bar, whitebar, greybar, 
			log, warn, err } from "../my-util-code/MyConsoleUtil"
/* ----------------------------------------------------------------------------- */
import { ref, Ref } from 'vue'
import { Auth } from 'aws-amplify';

import { checkConfirmationTooShort, checkConfirmationSpecialChars,}
	from "../components/ConfirmationParts/ComfirmationValidators"

import { parseEmail, checkWorkingEmailSpecialChar, checkWorkingEmailName, checkWorkingEmailDomain } 
	from "../components/EmailParts/EmailValidators"

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const emit = defineEmits()

/* ----------------------------------------------------------------------------- */
const props = defineProps({email: { type: String }})
const emailModel = ref("")
emailModel.value = props.email

const workingEmailModel =ref("")
const emailFormRef = ref()
const clearWorkingEmailModelValidationError = () => emailFormRef.value.resetValidation()
/* ----------------------------------------------------------------------------- */
const confirmEmailCodeModel = ref("")
const confirmEmailCodeModelFieldRef = ref()
const clearConfirmEmailCodeModelValidationError = () => confirmEmailCodeModelFieldRef.value.resetValidation()
/* ----------------------------------------------------------------------------- */
const toggleConfirmEmail:Ref<boolean> = ref(false)
const emailConfirmationMessage = { Title: ref(""), Message: ref(""), Message2: ref(""), Message3: ref("") }
const openDialogFlag = ref()

const showEmail = ref(false)

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
async function submitEmail (event) {
	const results = await event
	if(!results.valid) {
		return /* Cancel Submission if validation FAILED */
	}
	
	if(BLOCKAPI("submitEmail function ")){
		toggleConfirmEmail.value = true
		return
	}

	//				If we get here, validation was successful
	//				This will return the user in the user pool (not updated )
	const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
	await Auth.updateUserAttributes(authUser, {'email': workingEmailModel.value })
	await Auth.currentUserInfo().then(result => {
		//				Prepare the Confirm UI message
		emailConfirmationMessage.value = buildEmailConfirmationMessage(workingEmailModel.value)
		//				Display the Confirmation UI
		toggleConfirmEmail.value = true
	})
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const resendEmailConfirmationCode = async () => {
	if(BLOCKAPI("resendEmailConfirmationCode(~) function ")) {
		return
	}


	const authUser = await Auth.currentAuthenticatedUser({bypassCache: true})
	await Auth.updateUserAttributes(authUser, {'email': workingEmailModel.value });
	confirmEmailCodeModel.value = ""
	//					Clear all validation messages.
	confirmEmailCodeModelFieldRef.value.resetValidation()
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const applyEmailConfirmationCode = async function (event) {
	const results = await event
	if(!results.valid) return /* Cancel Submission if validation FAILED */

	if(BLOCKAPI("applyEmailConfirmationCode(~) function ")) { return }

	await Auth.verifyCurrentUserAttributeSubmit('email', `${ confirmEmailCodeModel.value}`)
	.then((response) => {
		// 		If we get here, the email is CONFIRMED.
		emit('onUpdateEmail', { 
			email: workingEmailModel.value, 
			showEmail: false
		})
		workingEmailModel.value = ""
		confirmEmailCodeModel.value = ""
		toggleConfirmEmail.value = false
	})
	.catch((e) => {
		openDialogFlag.value = true // open the Popup Dialog
		confirmEmailCodeModel.value = ""
	})
	return
}
	
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const buildEmailConfirmationMessage = (email:string) => {
	emailConfirmationMessage.Title.value = "We Emailed You"
	
	emailConfirmationMessage.Message.value = 
	`To confirm this change, you must enter the ` +
	`code we emailed to the new email address you provided.` 

	let {name , domain} = parseEmail(email)

	emailConfirmationMessage.Message2.value = `<b>${name[0]}***@${domain[0]}***</b>`
	emailConfirmationMessage.Message3.value = `This may take a minuet to arrive.`
	return emailConfirmationMessage
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

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
</script>

<style></style>