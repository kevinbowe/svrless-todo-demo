<template>
<div class="ma-3">
	
	<!-- Access Nickname -->
	<v-card class="ma-auto pa-2" variant="tonal" max-width="30em" elevation="24" >
		<v-card-text>
			<v-row >
				<v-col>
					<v-row class="text-h6"> Change Nickname </v-row>
					<v-row>{{ props.nickname }}</v-row>
				</v-col>
				<v-col align-self="center">
					<v-row justify="end">
						<v-btn text="Edit" v-if="!showNickname" color="minor" @click="showNickname=!showNickname"/>
					</v-row>
				</v-col>
			</v-row>
		</v-card-text>
	</v-card>

	<!-- Update Nickname-->
	<v-sheet v-if="showNickname" color="background" max-width="30em" class="mx-auto my-3">
		<v-form ref="nicknameFormRef" validate-on="submit" @submit.prevent="submitNickname">
			<v-text-field label="New Nickname" :rules="[
				value => checkNicknameReserved (value),
				value => checkNicknameTooShort (value),
				value => checkNicknameNumericFirstChar (value),
				value => checkNicknameFirstChar (value),
				value => checkNicknameLastChar (value),
				value => checkNicknameSpecialChars (value),
			]" 
			clearable @click:clear="clearNicknameModelValidationError"
			v-model="workingNicknameModel" hint="Example: kb1" variant="outlined" density="compact"/>

			<v-row class="justify-end px-3 py-5">
				<v-btn text="Cancel" class="mx-1" color="surface" @click="showNickname = false; workingNicknameModel='' "/>
				<!-- <v-btn text="Cancel" class="mx-1" color="surface" @click="emit('onCancelNickname', false )"/> -->
				<v-btn text="Save Nickname" :disabled="!workingNicknameModel" color="primary" type="submit"/>
			</v-row>
		</v-form>
	</v-sheet>

</div>
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
const emit = defineEmits()

/* ----------------------------------------------------------------------------- */
const props = defineProps({nickname: {type: String}})

const workingNicknameModel = ref("")
const nicknameFormRef = ref()
const clearNicknameModelValidationError = () => nicknameFormRef.value.resetValidation()

const showNickname = ref(false)

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
async function submitNickname(event) {
	const results = await event
	if(!results.valid) return 

		// 				This will return the user in the user pool (not updated )
		const newuser = await Auth.currentAuthenticatedUser({bypassCache: true });
		await Auth.updateUserAttributes(newuser, {'nickname': workingNicknameModel.value })
		await Auth.currentUserInfo().then(result => {
		emit('onUpdateNickname', { 
			nickname: result.attributes.nickname,
		})
		workingNicknameModel.value = ""
		showNickname.value = false
	}) // END_THEN
}	

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
</script>

<style>
</style>