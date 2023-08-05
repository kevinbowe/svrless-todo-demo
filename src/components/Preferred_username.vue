<template>
	<!-- Update Preferred Username -->
	<v-row justify="center">
		<v-col :sm="8" :md="6" :lg="4" class="ma-5" >
			<v-form ref="preferred_usernameFormRef" validate-on="submit" @submit.prevent="submitPreferred_username">
				<v-row>
					<v-text-field label="User Name" :rules="[
							value => checkPreferred_usernameTooShort(value),
							value => checkPreferred_usernameFirstChar(value),
							value => checkPreferred_usernameSpecialCharExceptions(value)
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

	<!-- __ERROR_POPUP__ -->
	<v-row justify="center" v-if="showDialog" >
		<v-dialog activator="parent" v-model="showDialog" persistent >
			<v-card 	color="background_alt" border="lg" 
						class="ma-auto" height="10em" width="20em" elevation="24">
				<v-card-text> 
					<h1>Oops!</h1><strong>Something went wrong...</strong>
				</v-card-text>
				<v-card-actions>
					<v-btn @click="showDialog = false" block 
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
import { info, info1, info2 , info3, info4, info5, info6, info7 } from "../my-util-code/MyConsoleUtil"
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
const workingPreferred_usernameModel = ref("")
const preferred_usernameFormRef = ref()
const emit = defineEmits()

const showDialog = ref(false)

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
async function submitPreferred_username (event) {
	if(BLOCKAPI("submitPreferred_username function "))return
	const results = await event
	if(!results.valid) return 
	//				If we get here, validation was sucessful
	//				This will return the user in the user pool (not updated )
	const newuser = await Auth.currentAuthenticatedUser({bypassCache: true});
						info(`Current Auth User [ ${newuser.username} ] `)
						info(`Current Auth Preferred_User [ ${newuser.attributes.preferred_username} ] `)

	try {
	await Auth.updateUserAttributes(newuser, {'preferred_username': workingPreferred_usernameModel.value})
	.then(response => {
						info(`The username is updating`)
						info(`Response Status ${response.status}`)
						info1(`Response [ ${response} ]`)
						info2(`Response [ ${Object.getOwnPropertyNames(response)} ]`)
						info2(`Response [ ${Object.getOwnPropertyNames(response[1])} ]`)
		if(!response.OK) {
			throw new Error("Oops")
		}
		Auth.currentUserInfo()
		.then(result => {
						info1(`JOY -- This is the CURRENT username-1 > [ ${result.attributes.preferred_username} ]`)
			//			If we get here, The update worked.
			emit('onUpdatePreferred_username', { preferred_username: result.attributes.preferred_username})
			workingPreferred_usernameModel.value = ""
		})
	})
	// .catch((error) => {
	// 	//			If I get here, there was a problem updating the preferred_username
	// 					info(`There was an error...`) //  "AliasExistsException: Already found an entry for the provided username."
	// 					info1(`   ${error}`) //  "AliasExistsException: Already found an entry for the provided username."
	// 	Auth.currentUserInfo().then(result => {
	// 				info2(`FAIL -- This is the Current Username-2 > [ ${result.attributes.preferred_username} ]`)
	// 		emit('onUpdatePreferred_username', { preferred_username: result.attributes.preferred_username})
	// 		workingPreferred_usernameModel.value = ""
	// 	})
	// 	showDialog.value = true
	// }) // END_ASYNC_CATCH
	} catch (e) {
		info7(`Outside Catch\n      [ ${e} ]`)
	}

}
// /* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
// async function submitPreferred_username (event) {
// 	if(BLOCKAPI("submitPreferred_username function "))return
// 	const results = await event
// 	if(!results.valid) return 
// 	//				If we get here, validation was sucessful
// 	//				This will return the user in the user pool (not updated )
// 	const newuser = await Auth.currentAuthenticatedUser({bypassCache: true});
// 						info(`Current Auth User [ ${newuser.username} ] `)
// 						info(`Current Auth Preferred_User [ ${newuser.attributes.preferred_username} ] `)
// 
// 	await Auth.updateUserAttributes(newuser, {'preferred_username': workingPreferred_usernameModel.value})
// 	.then(response => {
// 						info(`The username is updating`)
// 		Auth.currentUserInfo()
// 		.then(result => {
// 						info1(`JOY -- This is the CURRENT username-1 > [ ${result.attributes.preferred_username} ]`)
// 			//			If we get here, The update worked.
// 			emit('onUpdatePreferred_username', { preferred_username: result.attributes.preferred_username})
// 			workingPreferred_usernameModel.value = ""
// 		})
// 	})
// 	.catch((error) => {
// 		//			If I get here, there was a problem updating the preferred_username
// 						info(`There was an error...`) //  "AliasExistsException: Already found an entry for the provided username."
// 						info1(`   ${error}`) //  "AliasExistsException: Already found an entry for the provided username."
// 		Auth.currentUserInfo().then(result => {
// 					info2(`FAIL -- This is the Current Username-2 > [ ${result.attributes.preferred_username} ]`)
// 			emit('onUpdatePreferred_username', { preferred_username: result.attributes.preferred_username})
// 			workingPreferred_usernameModel.value = ""
// 		})
// 		showDialog.value = true
// 	})
// }

// /* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
// async function submitPreferred_username (event) {
// 	if(BLOCKAPI("submitPreferred_username function "))return
// 	const results = await event
// 	if(!results.valid) return 
// 	//				If we get here, validation was sucessful
// 	//				This will return the user in the user pool (not updated )
// 	const newuser = await Auth.currentAuthenticatedUser({bypassCache: true});
// 
// 					info(`We got the current user`)
// 
// 	await Auth.updateUserAttributes(newuser, {'preferred_username': workingPreferred_usernameModel.value})
// 	.then(response => {
// 
// 					info(`The username has been updated`)
// 
// 	})
// 	.catch((error) => {
// 		//			If I get here, there was a problem updating the preferred_username
// 
// 					info(`There was an error \n ${error}`) //  "AliasExistsException: Already found an entry for the provided username."
// 
// 		showDialog.value = true
// 		return
// 	})
// 
// 					info1(`We caught the error but processing continues `)
// 
// 					info2(`Broadcasting the new Preferred Username back to HomeView.`)
// 	
// 	await Auth.currentUserInfo()
// 	.then(result => {
// 
// 					info(`This is the CURRENT username [ ${result.attributes.preferred_username} ]`)
// 
// 		//			If we get here, The update worked.
// 		emit('onUpdatePreferred_username', { preferred_username: result.attributes.preferred_username})
// 		workingPreferred_usernameModel.value = ""
// 	})
// }

// /* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
//	//
// async function submitPreferred_username (event) {
// 	if(BLOCKAPI("submitPreferred_username function "))return
// 	const results = await event
// 	if(!results.valid) return 
// 	//				If we get here, validation was sucessful
// 	//				This will return the user in the user pool (not updated )
// 	const newuser = await Auth.currentAuthenticatedUser({bypassCache: true});
// 	await Auth.updateUserAttributes(newuser, {
// 		'preferred_username': workingPreferred_usernameModel.value
// 	})
// 	.catch((error) => {
// 		//			If I get here, there was a problem updating the preferred_username
// 					info(error) //  "AliasExistsException: Already found an entry for the provided username."
// 		showDialog.value = true
// 		return
// 	})
// 					info1(`We caught the error but processing continues `)
// 	await Auth.currentUserInfo().then(result => {
// 		//			If we get here, The update worked.
// 		emit('onUpdatePreferred_username', { preferred_username: result.attributes.preferred_username})
// 		workingPreferred_usernameModel.value = ""
// 	})
// }


/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const clearPreferred_usernameModelValidationError = () => preferred_usernameFormRef.value.resetValidation()

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