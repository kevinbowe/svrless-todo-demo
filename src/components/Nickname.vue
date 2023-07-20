<template>
	<!-- Update Nickname -->
	<v-row justify="center" v-if="isSession">
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
	</v-row>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { 
	workingNicknameModel,
	nicknameModel,
	submitNickname,
	checkNicknameReserved,
	checkNicknameTooShort,
	checkNicknameNumericFirstChar,
	checkNicknameFirstChar,
	checkNicknameLastChar,
	checkNicknameSpecialChars
} from  "../components/NicknameParts/Nickname"

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
defineProps({
	isSession: Boolean
})


/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const nicknameFormRef = ref()
const clearNicknameModelValidationError = () => nicknameFormRef.value.resetValidation()

</script>

<style>
</style>