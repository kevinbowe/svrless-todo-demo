<template>
	<!-- Update Preferred Username -->
	<v-row justify="center">
		<v-col :sm="8" :md="6" :lg="4" class="ma-5" >
			<v-form ref="usernameFormRef" validate-on="submit" @submit.prevent="submitUsername">
				<v-row>
					<v-text-field label="User Name" :rules="[
							value => checkPreferred_usernameTooShort(value),
							value => checkPreferred_usernameFirstChar(value),
							value => checkPreferred_usernameSpecialCharExceptions(value)
						]" 
						clearable @click:clear="clearUsernameModelValidationError"
						v-model="usernameModel" hint="Example: kb1" variant="outlined" density="compact" >
					</v-text-field>
				</v-row>
				<v-row class="justify-end">
					<v-btn :disabled="!usernameModel" color="primary" type="submit"> Save Preferred Username</v-btn>
				</v-row>
			</v-form>
		</v-col>
	</v-row>

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

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const usernameModel = ref("")
const usernameFormRef = ref()

const emit = defineEmits()
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
	await Auth.updateUserAttributes(newuser, {'preferred_username': usernameModel.value})
	.then(response => {
		//				This code will not execute --IF-- the function above causes an exception.
		Auth.currentUserInfo().then(result => {
			//			If we get here, The update worked.
			emit('onUpdatePreferred_username', { preferred_username: result.attributes.preferred_username})
			usernameModel.value = ""
		})
	})
	.catch((error) => {
		//			If I get here, there was a problem updating the preferred_username
		errorPopup.value = {title:`Username not available`, msg:`"${usernameModel.value}" is not available.` }
		usernameModel.value = ""
		showDialog.value = true
	}) 
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const clearUsernameModelValidationError = () => usernameFormRef.value.resetValidation()

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