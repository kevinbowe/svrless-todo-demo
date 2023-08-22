<template>
	<div class="ma-3">

		<!-- Access Preferred_username -->
		<v-card class="ma-auto pa-2" variant="tonal" max-width="30em" elevation="24" >
			<v-card-text>
				<v-row >
					<v-col>
						<v-row class="text-h6"> 
							<v-icon icon="mdi-account" class="mr-2"/> Change Username
						</v-row>
						<v-row class="mx-7">{{ props.username }}</v-row>
					</v-col>
					<v-col cols="2" align-self="center">
						<v-row justify="end">
							<v-btn text="Edit" v-if="!showUsername" color="secondary" @click="showUsername=!showUsername"/>
						</v-row>
					</v-col>
				</v-row>
			</v-card-text>
		</v-card>

		<!-- Update Preferred Username -->
		<v-sheet v-if="showUsername" color="background" max-width="30em" class="mx-auto my-3">
			<v-form ref="usernameFormRef" validate-on="submit" @submit.prevent="submitUsername">
				<v-text-field label="New Username" 
				:rules="[
					value => checkPreferred_usernameTooShort(value),
					value => checkPreferred_usernameFirstChar(value),
					value => checkPreferred_usernameSpecialCharExceptions(value)
				]" 
				clearable @click:clear="clearUsernameModelValidationError"
				v-model="workingUsernameModel" hint="Example: kb1" variant="outlined" density="compact" />

				<v-row class="justify-end px-3 py-5">
					<v-btn text="Cancel" class="mx-1" color="surface" @click="showUsername = false; workingUsernameModel='' "/>
					<v-btn text="Save Preferred Username" :disabled="!workingUsernameModel" color="primary" type="submit"/>
				</v-row>
			</v-form>
		</v-sheet>

	</div>

	<!-- __ERROR_POPUP__ -->
	<v-row justify="center" v-if="showDialog" >
		<v-dialog activator="parent" v-model="showDialog" persistent >
			<v-card color="background_alt" border="lg" class="ma-auto" elevation="24">
				<v-card-title class="text-h5"> {{ errorPopup.title }}</v-card-title>
				<v-card-text> {{ errorPopup.msg }}</v-card-text>
				<v-card-actions>
					<v-btn @click="showDialog = false" block color="surface" 
					style="background-color:rgb(var(--v-theme-primary))"> 
						OK 
				</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-row>

</template>

<script lang="ts">
	export default {inheritAttrs: false}
</script>

<script setup lang="ts">
import { err, info, info1, info2 , info3, info4, info5, info6, info7 } from "../my-util-code/MyConsoleUtil"
import { enter, enter0, enter1, enter2, enter3, enter4, enter5, enter6, enter7 } from "../my-util-code/MyConsoleUtil"
import { bar, whitebar, greybar} from "../my-util-code/MyConsoleUtil"
/* ----------------------------------------------------------------------------- */
import { ref, } from 'vue'
import { Auth } from 'aws-amplify';
/* ----------------------------------------------------------------------------- */
import { checkPreferred_usernameTooShort, checkPreferred_usernameFirstChar,
			checkPreferred_usernameSpecialCharExceptions }
	from "../components/Preferred_usernameParts/Preferred_usernameValidators"
import { sessionState } from "../sessionState";

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const emit = defineEmits()

/* ----------------------------------------------------------------------------- */
const props = defineProps({username: { type: String }})

const workingUsernameModel = ref("")
const usernameFormRef = ref()
const clearUsernameModelValidationError = () => usernameFormRef.value.resetValidation()

const showUsername = ref(false)

/* ----------------------------------------------------------------------------- */
const showDialog = ref(false)
const errorPopup = ref({title:"", msg:""})

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
async function submitUsername (event) {
	if(BLOCKAPI("submitUsername function "))return
	const results = await event
	if(!results.valid) return 
	//				If we get here, validation was sucessful

	//				This will return the user in the user pool (not updated )
	const newuser = await Auth.currentAuthenticatedUser({bypassCache: true});
	await Auth.updateUserAttributes(newuser, {'preferred_username': workingUsernameModel.value})
	.then(response => {
		//				This code will not execute --IF-- the function above causes an exception.
		Auth.currentUserInfo().then(result => {
			//			If we get here, The update worked.
			emit('onUpdatePreferred_username', { 
				preferred_username: result.attributes.preferred_username,
				// showPreferred_username: false
			})
			sessionState.userName = result.attributes.preferred_username
			workingUsernameModel.value = ""
			showUsername.value = false
		})
	})
	.catch((error) => {
		//			If I get here, there was a problem updating the preferred_username
		errorPopup.value = {title:`Username not available`, msg:`"${workingUsernameModel.value}" is not available.` }
		workingUsernameModel.value = ""
		showDialog.value = true
	}) 
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/**/					const BLOCKAPIFLAG = ref(false)										 /**/
/* 				if(BLOCKAPI("submitEmail function "))return								*/
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const BLOCKAPI = (message:string|null|undefined = null) => {
	if(BLOCKAPIFLAG.value) 
		message ? info7(`${message} -- BLOCKED`) : info7("-- BLOCKED -- ")
	return BLOCKAPIFLAG.value
}
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
</script>

<style></style>