<template>
	<!-- Update Email-->
	<v-row justify="center">
		<v-col :sm="8" :md="6" :lg="4" class="ma-5" >
		<v-form ref="emailFormRef" validate-on="submit" @submit.prevent="submitEmail" >
			<v-row>
				<v-text-field label="Email -- Confirmed"  v-model= "workingEmailModel" 
					clearable @click:clear="clearWorkingEmailModelValidationError"
					:rules="[ 
						value => checkWorkingEmailSpecialChar(value), 
						value => checkWorkingEmailName(value), 
						value => checkWorkingEmailDomain(value),
					]"
					variant="outlined" density="compact" 
				></v-text-field>
			</v-row>
			<v-row class="justify-end">
				<v-btn :disabled="!workingEmailModel" color="primary" type="submit"> Save Email </v-btn>
			</v-row>
		</v-form>
		</v-col>
	</v-row>

	<!-- Update Email Confirmation -->
	<v-row justify="center" >
		<v-overlay class="align-center justify-center" v-model="toggleConfirmEmail" >
			<v-sheet height="24em" width="20em" color="surface_alt" elevation="24">
					<v-row><v-spacer/>

					<v-btn __THIS_IS_THE_X_IN_UPPER_RIGHT__ 
					@click="toggleConfirmEmail=false; workingEmailModel = ''; "
					class="mr-3" icon="$close" size="large" variant="text" ></v-btn>

				</v-row>
				<v-col style="margin-top:-2.5em;">
					<v-row no-gutters>
						<h1 class="ma-auto" v-html="emailConfirmationMessage.Title.value"></h1>
						<p v-html="emailConfirmationMessage.Message.value"></p>
						<p class="ma-auto" v-html="emailConfirmationMessage.Message2.value"></p>
						<p class="ma-auto" v-html="emailConfirmationMessage.Message3.value"></p>
					</v-row>
					<v-form validate-on="submit" @submit.prevent="applyEmailConfirmationCode">
						<v-row>
							<v-spacer/>
							<v-col cols="11">
								
								<v-text-field 
								_style="height:1.75em;" 
								label="Confirmation Code" 
								v-model="confirmEmailCodeModel" 
								ref="confirmEmailCodeModelFieldRef"
								id="ConfCode" 
								:rules="[
									value => !!value,
									value => checkConfirmationTooShort(value),
									value => checkConfirmationSpecialChars(value),
								]"
								placeholder="Enter your code" 
								variant="outlined"  
								density="compact"
								class="mb-2" 
								clearable @click:clear="clearConfirmEmailCodeModelValidationError"
								/>
							</v-col>
							<v-spacer/>
						</v-row>
						<v-row class="mx-5 mt-5" _class="mx-5">
							<v-btn type="submit" :disabled="!confirmEmailCodeModel" block color="primary" class="mb-2" > Confirm </v-btn>
						</v-row>
					</v-form>
					<v-row class="mx-5">	
						<v-btn block color="surface" class="mb-2" @click="resendEmailConfirmationCode"> Resend Code </v-btn>
					</v-row>
				</v-col>
			</v-sheet>
		</v-overlay>
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
const emailFormRef = ref()

const toggleConfirmEmail:Ref<boolean> = ref(false)
const emailConfirmationMessage = { Title: ref(""), Message: ref(""), Message2: ref(""), Message3: ref("") }
const workingEmailModel =ref("")

const openDialogFlag = ref()
const emit = defineEmits()

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
async function submitEmail (event) {

	if(BLOCKAPI("submitEmail function "))return
	
	const results = await event
	if(!results.valid) {
		return /* Cancel Submission if validation FAILED */
	}
	//				If we get here, validation was sucessful
	//				This will return the user in the user pool (not updated )
	const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
	await Auth.updateUserAttributes(authUser, {'email': workingEmailModel.value })
	await Auth.currentUserInfo().then(result => {
		//...emailModel.value = result.attributes.email
		//				Prepare the Confirm UI message
		emailConfirmationMessage.value = buildEmailConfirmationMessage(workingEmailModel.value)
		//				Display the Confirmation UI
		toggleConfirmEmail.value = true
	})
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const resendEmailConfirmationCode = async () => {
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
	// if(BLOCKAPI("signUpUser function "))return

	await Auth.verifyCurrentUserAttributeSubmit('email', `${ confirmEmailCodeModel.value}`)
	.then((response) => {
		// 		If we get here, the email is CONFIRMED.

		emit('onUpdateEmail', { email: workingEmailModel.value})
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
	`To confirm your new account, you must enter the ` +
	`code we emailed to the new email address you provided.` 

	let {name , domain} = parseEmail(email)

	emailConfirmationMessage.Message2.value = `<b>${name[0]}***@${domain[0]}***</b>`
	emailConfirmationMessage.Message3.value = `This may take a minuet to arrive.`
	return emailConfirmationMessage
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const clearWorkingEmailModelValidationError = () => emailFormRef.value.resetValidation()

/* ----------------------------------------------------------------------------- */
const confirmEmailCodeModel = ref("")
const confirmEmailCodeModelFieldRef = ref()
const clearConfirmEmailCodeModelValidationError = () => confirmEmailCodeModelFieldRef.value.resetValidation()

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
</script>

<style>
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
</style>src/components/Email.vue