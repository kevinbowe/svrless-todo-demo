<template>
<div class="ma-3">

	<!-- Access Email -->
	<v-card class="ma-auto pa-2" variant="tonal" max-width="30em" elevation="24" >
		<v-card-text>
			<v-row >
				<v-col>
					<v-row class="text-h6"> 
						<v-icon icon="mdi-email" class="mr-2"/> Change Email w/ conf
					</v-row>
					<v-row class="mx-5">{{ props.email }}</v-row>
				</v-col>
				<v-col cols="2" align-self="center">
					<v-row justify="end">
						<v-btn text="Edit" v-if="!showEmail" color="secondary" @click="showEmail=!showEmail"/>
					</v-row>
				</v-col>
			</v-row>
		</v-card-text>
	</v-card>

	<!-- Update Email-->
	<v-sheet v-if="showEmail" color="background" max-width="30em" class="mx-auto my-3">

		<v-form ref="emailFormRef" validate-on="submit" @submit.prevent="submitEmail" >
			<v-text-field label="New Email" v-model="workingEmailModel" 
			:rules="[ 
				value => checkWorkingEmailSpecialChar(value), 
				value => checkWorkingEmailName(value), 
				value => checkWorkingEmailDomain(value),
			]"
			variant="outlined" density="compact" 
			clearable @click:clear="clearWorkingEmailModelValidationError"/>

			<v-row class="justify-end px-3 py-5">
				<v-btn text="Cancel" class="mx-1" color="surface" @click="showEmail = false; workingEmailModel='' "/>
				<v-btn text="Save Email" :disabled="!workingEmailModel" color="primary" type="submit"/>
			</v-row>
		</v-form>

	</v-sheet>

</div>

<!-- Update Email Confirmation -->
<v-overlay class="align-center justify-center" v-model="toggleConfirmEmail" >
	<v-sheet width="20em" class="pa-3" elevation="24" color="background" border="lg">
		<v-row><v-spacer/>
			<v-btn __THIS_IS_THE_X_IN_UPPER_RIGHT__ icon="$close" size="large" variant="text" 
			@click="toggleConfirmEmail=false; workingEmailModel=''; showEmail = false;"/>
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

			<v-btn text="Confirm" block class="mb-5 mt-2" color="primary" type="submit" :disabled="!confirmEmailCodeModel" /> 
		</v-form>

		<v-btn text="Resend Code" block color="surface" @click="resendEmailConfirmationCode"/>

	</v-sheet>
</v-overlay>

<!-- PopUp Message Dialog -- Modal -->
<v-dialog v-if="openDialogFlag" activator="parent" v-model="openDialogFlag" persistent >
	<v-card color="background_alt" border="lg" 
	class="ma-auto" height="10em" width="20em" elevation="24">
		<v-card-text> 
			<h1>Error</h1><strong>Invalid Confirmation Code.</strong>
		</v-card-text>
		<v-card-actions>
			<v-btn text="OK" @click="openDialogFlag = false" 
			block color="surface" style="background-color:rgb(var(--v-theme-primary))"/>
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
const props = defineProps({ email: { type: String }})

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
		emailConfirmationMessage.value = buildEmailConfirmationMessage(workingEmailModel.value)
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

	if(BLOCKAPI("applyEmailConfirmationCode(~) function ")) { 
		workingEmailModel.value = ""
		confirmEmailCodeModel.value = ""
		toggleConfirmEmail.value = false
		showEmail.value = false
		openDialogFlag.value = true // open the Popup Dialog
		return 
	}

	await Auth.verifyCurrentUserAttributeSubmit('email', `${ confirmEmailCodeModel.value}`)
	.then((response) => {
		// 		If we get here, the email is CONFIRMED.
		emit('onUpdateEmail', { email: workingEmailModel.value, })
		workingEmailModel.value = ""
		confirmEmailCodeModel.value = ""
		toggleConfirmEmail.value = false
		showEmail.value = false
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