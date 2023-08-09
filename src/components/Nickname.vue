<template>
	<!-- Update Nickname -->
	<v-form ref="nicknameFormRef" validate-on="submit" @submit.prevent="submitNickname">
		<v-row no-gutters>
			<v-spacer/>
			<v-col cols="3" class="ma-2">
				<v-text-field label="Nickname" :rules="[
					value => checkNicknameReserved (value),
					value => checkNicknameTooShort (value),
					value => checkNicknameNumericFirstChar (value),
					value => checkNicknameFirstChar (value),
					value => checkNicknameLastChar (value),
					value => checkNicknameSpecialChars (value),
				]" 
					clearable @click:clear="clearNicknameModelValidationError"
					v-model="workingNicknameModel" hint="Example: kb1" variant="outlined" density="compact" >
				</v-text-field>
			</v-col>
			
			<v-col cols="2" >
				<v-btn class="mt-3" height="3em" :disabled="!workingNicknameModel" 
				color="primary" type="submit"> Save<br>Nickname</v-btn>
			</v-col>

			<v-spacer/>
		</v-row>
	</v-form>

	<!-- <v-row justify="center" >
		<v-col :sm="8" :md="6" :lg="4" class="ma-5" >
		<v-form ref="nicknameFormRef" validate-on="submit" @submit.prevent="submitNickname">
			<v-row>
				<v-text-field label="Nickname" :rules="[
						value => checkNicknameReserved (value),
						value => checkNicknameTooShort (value),
						value => checkNicknameNumericFirstChar (value),
						value => checkNicknameFirstChar (value),
						value => checkNicknameLastChar (value),
						value => checkNicknameSpecialChars (value),
					]" 
					clearable @click:clear="clearNicknameModelValidationError"
					v-model="workingNicknameModel" hint="Example: kb1" variant="outlined" density="compact" >
				</v-text-field>
			</v-row>
			<v-row class="justify-end">
				<v-btn :disabled="!workingNicknameModel" color="primary" type="submit"> Save Nickname</v-btn>
			</v-row>
		</v-form>
		</v-col>
	</v-row> -->
</template>


<script setup lang="ts">
import { info, info1, info2 , info3, info4, info5, info6, info7 } from "../my-util-code/MyConsoleUtil"
import { enter, enter0, enter1, enter2, enter3, enter4, enter5, enter6, enter7 } from "../my-util-code/MyConsoleUtil"
import { bar, whitebar, greybar, redbar, greenbar, orangebar } from "../my-util-code/MyConsoleUtil"
import { log, warn, err, err2, exit, success, pass, fail, fini, start, progress, joy, } from "../my-util-code/MyConsoleUtil"
/*  */
import { ref, } from 'vue'
import { Auth } from 'aws-amplify';

import { checkNicknameReserved,checkNicknameFirstChar, checkNicknameLastChar, 
			checkNicknameNumericFirstChar, checkNicknameSpecialChars, checkNicknameTooShort } 
	from "./NicknameParts/NicknameValidators"

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const nicknameFormRef = ref()
const clearNicknameModelValidationError = () => nicknameFormRef.value.resetValidation()

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const workingNicknameModel = ref("")

const emit = defineEmits()

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
async function submitNickname(event) {
	const results = await event
	if(!results.valid) return 

		// 				This will return the user in the user pool (not updated )
		const newuser = await Auth.currentAuthenticatedUser({bypassCache: true });
		await Auth.updateUserAttributes(newuser, {'nickname': workingNicknameModel.value })
		await Auth.currentUserInfo().then(result => {
		emit('onUpdateNickname', { nickname: result.attributes.nickname})
		workingNicknameModel.value = ""
	}) // END_THEN
}	

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
</script>

<style>
</style>