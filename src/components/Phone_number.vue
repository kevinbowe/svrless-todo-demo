<template>
	<!-- Save Phone number -->
	<!-- <v-form validate-on="submit" @submit.prevent="submitPhone_number" >
		<v-row no-gutters>
			<v-spacer/>
			<v-col cols="3" class="ma-2">
			<v-text-field label="Phone number (optional)" v-model="phone_numberModel"
			ref="phone_numberFieldRef"
			clearable @click:clear= "clearPhone_numberValidationError"
			:rules="[
				value => checkPhone_number(value),
				value => checkPhone_numberInvalidCountryCode(value),
			]"
			hint="Example: 1 (919) 333-4444" 
			variant="outlined" density="compact"/>
			</v-col>
	
			<v-col cols="2" >
				<v-btn class="mt-3" height="3em" 
				 :disabled="!phone_numberModel" color="primary" type="submit">
				Save Phone<br>number</v-btn>
			</v-col>
			<v-spacer/>
		</v-row>
	</v-form> -->

	<v-row justify="center">
		<v-col :sm="8" :md="6" :lg="4" class="ma-5" >
			<v-row class="justify-start">
				<v-label class="text-h5 mb-5" :text="phone_numberModel" />
			</v-row>
			<v-form validate-on="submit" @submit.prevent="submitPhone_number" >
				<v-row>
					<v-text-field label="Phone number (optional)" v-model="workingPhone_numberModel"
					ref="phone_numberFieldRef"
					clearable @click:clear= "clearPhone_numberValidationError"
					:rules="[
						value => checkPhone_number(value),
						value => checkPhone_numberInvalidCountryCode(value),
					]"
					hint="Example: 1 (919) 333-4444" variant="outlined" density="compact"/>
				</v-row>
				<v-row class="justify-end">
					<v-btn class="mx-1" color="surface" @click="emit('onCancelPhone_number', false )"> Cancel</v-btn>
					<v-btn text="Save Phone number" type="submit"
					:disabled="!workingPhone_numberModel" color="primary" _size="large"/>
				</v-row>
			</v-form>
		</v-col>
	</v-row>
</template>

<script setup lang="ts">
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
import {ref} from "vue"
import { Auth } from "aws-amplify";
import { stripPhone_numberFmt, checkPhone_number, checkPhone_numberInvalidCountryCode } 
	from "../components/Phone_numberParts/Phone_numerValidators"
/* ----------------------------------------------------------------------------- */
import { info, info1, info2 , info3, info4, info5, info6, info7 } from "../my-util-code/MyConsoleUtil"
import { enter, enter0, enter1, bar, whitebar, greybar, log, warn, err } from "../my-util-code/MyConsoleUtil"

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const emit = defineEmits()
/* ----------------------------------------------------------------------------- */
const props = defineProps({phone_numberModel: { type: String }})
const phone_numberModel = ref("")
phone_numberModel.value = props.phone_numberModel

const workingPhone_numberModel = ref("")
const phone_numberFieldRef = ref("")
const clearPhone_numberValidationError = () => phone_numberFieldRef.value.resetValidation()

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/* Submit Phone Number Decl */
async function submitPhone_number(event) {
	const results = await event
	if(!results.valid) return // Cancel Submission if validation FAILED
	if(BLOCKAPI("submitEmail function "))return

	//				Strips these characters -- 'sp', '+', '-', '(', ')'
	//				If a Country code is missing, add '1' (North America)
	const strippedPhone_number = stripPhone_numberFmt(workingPhone_numberModel)
	//				Add the '+' prefix
	strippedPhone_number.value = `+${strippedPhone_number.value}`
	//				This will return the user in the user pool (not updated )
	const newuser = await Auth.currentAuthenticatedUser({bypassCache: true /* false */});
	await Auth.updateUserAttributes(newuser, {'phone_number': strippedPhone_number.value })
	await Auth.currentUserInfo().then(result => {
		
		emit('onUpdatePhone_number', { 
			phone_number: result.attributes.phone_number,
			showPhone_number: false
		})
		workingPhone_numberModel.value = ""
	})
}
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/**/					const BLOCKAPIFLAG = ref(false)										 /**/
/* 				if(BLOCKAPI("submitEmail function "))return								*/
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const BLOCKAPI = (message:string|null|undefined = null) => {
	if(BLOCKAPIFLAG.value) 
		message ? info7(`${message} -- BLOCKED`) : info7("-- BLOCKED -- ")
	return BLOCKAPIFLAG.value
}
</script>