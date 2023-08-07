<template>
	<v-form 
	class="w-50 mx-auto mt-1" 
	validate-on="submit" 
	@submit.prevent="submitPhone_number" >
		
	<v-row>
	
		<v-text-field
		v-model="phone_numberModel"
		ref="phone_numberFieldRef"
		clearable @click:clear= "clearPhone_numberValidationError"
		:rules="[
			value => checkPhone_number(value),
			value => checkPhone_numberInvalidCountryCode(value),
		]"
		label="Phone number (optional)" 
		hint="Example: 1 (919) 333-4444"
		variant="outlined" 
		density="compact"
		/>

		</v-row>

		<v-row class="justify-end">
		
			<v-btn class="ml-2" color="primary" size="large" type="submit"> Save Phone number</v-btn>
		
		</v-row>
	
	</v-form>

</template>

<script setup lang="ts">
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
import {ref} from "vue"
import { Auth } from "aws-amplify";
import { stripPhone_numberFmt, checkPhone_number, checkPhone_numberInvalidCountryCode } 
	from "../components/Phone_numberParts/Phone_numerValidators"

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const phone_numberModel = ref("")
const phone_numberFieldRef = ref("")
const clearPhone_numberValidationError = () => phone_numberFieldRef.value.resetValidation()


/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/* Submit Phone Number Decl */
async function submitPhone_number(event) {
	const results = await event
	if(!results.valid) return // Cancel Submission if validation FAILED
	//				Strips these characters -- 'sp', '+', '-', '(', ')'
	//				If a Country code is missing, add '1' (North America)
	const strippedPhone_number = stripPhone_numberFmt(phone_numberModel)
	//				Add the '+' prefix
	strippedPhone_number.value = `+${strippedPhone_number.value}`
	//				This will return the user in the user pool (not updated )
	const newuser = await Auth.currentAuthenticatedUser({bypassCache: true /* false */});
	await Auth.updateUserAttributes(newuser, {'phone_number': strippedPhone_number.value })
	await Auth.currentUserInfo().then(result => {
		phone_numberModel.value = result.attributes.phone_number
	})
}

</script>