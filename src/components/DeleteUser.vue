<template>
	<!-- Access Delete User -->
	<v-card class="ma-auto pa-2" variant="tonal" max-width="30em" elevation="24" >
		<v-card-text>
			<v-row >
				<v-col>
					<v-row class="text-h6"> Delete User w/ conf</v-row>
				</v-col>
				<v-col align-self="center">
					<v-row justify="end">
						<v-btn text="Edit" v-if="!showDeleteUser" color="minor" @click="showDeleteUser=!showDeleteUser"/>
					</v-row>
				</v-col>
			</v-row>
		</v-card-text>
	</v-card>

	<!-- Delete User -->
	<v-sheet v-if="showDeleteUser" color="background" max-width="30em" class="mx-auto">
		<div class="my-5 mx-3">
			<v-row class="justify-start">
				<v-label class="text-h5 mb-5" :text="`User: ${props.username}`" />
				<p align="left" class="mb-5">
					You are about to <strong> DELETE</strong> your account. 
					This deletion is <strong>PERMANENT</strong>. 
					The deletion can not be <strong>UNDONE</strong>. 
					Your account and all associated data will be <strong>LOST</strong>.
				</p>
			</v-row>
			<v-row class="justify-end mb-3">
				<v-btn text="Cancel" class="mx-1" color="surface" @click="showDeleteUser=false"/>
				<v-btn text="Confirm Deletion" color="error" @click="sendDeleteUser"/>
			</v-row>
		</div>
	</v-sheet>

	<!-- Delete Confirmation -->
	<v-overlay class="align-center justify-center" v-model="toggleConfirmDelete" >
		<v-sheet width="20em" class="pa-3" elevation="24" color="background" border="lg">
			
			<!-- Cancel (X) -->
			<v-row><v-spacer/>
				<v-btn __THIS_IS_THE_X_IN_UPPER_RIGHT__ icon="$close" size="large" variant="text" 
				@click="showDeleteUser=false; toggleConfirmDelete=false;"/>
			</v-row>

			<!-- Confirmation Message -->
			<v-row class="pa-5" style="margin-top:-2.5em;" no-gutters>
				<h1 class="ma-auto" v-html="deleteConfirmationMessage.Title.value"></h1>
				<p v-html="deleteConfirmationMessage.Message.value"></p>
				<p class="ma-auto" v-html="deleteConfirmationMessage.Message2.value"></p>
				<p class="ma-auto" v-html="deleteConfirmationMessage.Message3.value"></p>
			</v-row>

			<v-form validate-on="submit" @submit.prevent="applyDeleteConfirmationCode">
				<v-text-field label="Confirmation Code" v-model="confirmDeleteCodeModel" 
				ref="confirmDeleteCodeModelFieldRef" id="ConfCode" 
				:rules="[
					value => !!value,
					value => checkConfirmationTooShort(value),
					value => checkConfirmationSpecialChars(value),
				]"
				placeholder="Enter your code" variant="outlined" density="compact"
				clearable @click:clear="clearConfirmDeleteCodeModelValidationError"/>
				<v-btn block class="my-5" color="primary" type="submit" :disabled="!confirmDeleteCodeModel" > 
					Confirm 
				</v-btn>
			</v-form>

			<!-- Resend Code -->
			<v-btn block color="surface" @click="resendDeleteConfirmationCode" >
				Resend Code 
			</v-btn>

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

		</v-sheet>
	</v-overlay>
</template>

<script lang="ts">
	export default {inheritAttrs: false}
</script>

<script setup lang="ts">
import { err, info, info1, info2 , info3, info4, info5, info6, info7 } from "../my-util-code/MyConsoleUtil"
import { enter, enter0, enter1, enter2, enter3, enter4, enter5, enter6, enter7 } from "../my-util-code/MyConsoleUtil"
import { bar, whitebar, greybar} from "../my-util-code/MyConsoleUtil"
/* ----------------------------------------------------------------------------- */
import { ref, Ref } from 'vue'
import { Auth } from 'aws-amplify';

import { checkConfirmationTooShort, checkConfirmationSpecialChars,}
	from "../components/ConfirmationParts/ComfirmationValidators"
import { parseEmail } from "../components/EmailParts/EmailValidators"

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const emit = defineEmits()

/* ----------------------------------------------------------------------------- */
const props = defineProps({
	username: { type: String }, 
	email: {type: String}
})

/* ----------------------------------------------------------------------------- */
const confirmDeleteCodeModel = ref("")
const confirmDeleteCodeModelFieldRef = ref()
const clearConfirmDeleteCodeModelValidationError = () => confirmDeleteCodeModelFieldRef.value.resetValidation()
/* ----------------------------------------------------------------------------- */
const toggleConfirmDelete:Ref<boolean> = ref(false)
const deleteConfirmationMessage = { Title: ref(""), Message: ref(""), Message2: ref(""), Message3: ref("") }
const openDialogFlag = ref()

const showDeleteUser = ref(false)

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const sendDeleteUser = async () => {
	if(BLOCKAPI("sendDeleteUser function ")) { 
		deleteConfirmationMessage.value = buildDeleteConfirmationMessage(props.email)
		toggleConfirmDelete.value = true; 
		return 
	}

	await Auth.verifyCurrentUserAttribute("email")
	.then(response => { 
		deleteConfirmationMessage.value = buildDeleteConfirmationMessage(props.email)
		toggleConfirmDelete.value = true 
	})
	.catch(e => err(`Auth.verifyCurrentUserAttribute FAILED ${e}`))
}
/* ----------------------------------------------------------------------------- */
const applyDeleteConfirmationCode = async (event) => {
	const results = await event
	if(!results.valid) return /* Cancel Submission if validation FAILED */

	if(BLOCKAPI("applyDeleteConfirmationCode function ")) {
		//openDialogFlag.value = true // open the Popup Dialog
		showDeleteUser.value = false
		openDialogFlag.value = false
		toggleConfirmDelete.value = false;
		return
	}
	//				Verify the input confirmation code 
	await Auth.verifyCurrentUserAttributeSubmit("email", confirmDeleteCodeModel.value)
	.then(response => {
		Auth.deleteUser();
		showDeleteUser.value = false
		openDialogFlag.value = false
		toggleConfirmDelete.value = false;
	})
	.catch((e) => {
		openDialogFlag.value = true // open the Popup Dialog
		confirmDeleteCodeModel.value = ""
	})
}

/* ----------------------------------------------------------------------------- */
const resendDeleteConfirmationCode = async () => {
	if(BLOCKAPI("resendDeleteConfirmationCode function ")) return

	await Auth.verifyCurrentUserAttribute("email")
	confirmDeleteCodeModel.value = ""
	//					Clear all validation messages.
	confirmDeleteCodeModelFieldRef.value.resetValidation()
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const buildDeleteConfirmationMessage = (email:string) => {
	deleteConfirmationMessage.Title.value = "Last Chance..."
	deleteConfirmationMessage.Message.value = 
	`Before we delete your account, you must enter the ` +
	`code we sent to the email address associated with this account.` 

	let {name , domain} = parseEmail(email)
	deleteConfirmationMessage.Message2.value = `<b>${name[0]}***@${domain[0]}***</b>`
	deleteConfirmationMessage.Message3.value = `It may take a minuet to arrive.`

	return deleteConfirmationMessage
}


/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/**/					const BLOCKAPIFLAG = ref(true)										 /**/
/* 				if(BLOCKAPI("submitEmail function "))return								*/
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const BLOCKAPI = (message:string|null|undefined = null) => {
	if(BLOCKAPIFLAG.value) 
		message ? info7(`${message} -- BLOCKED`) : info7("-- BLOCKED -- ")
	return BLOCKAPIFLAG.value
}
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
</script>