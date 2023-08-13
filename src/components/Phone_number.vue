<template>
	<div class="ma-3">

		<!-- Access Phone number -->
		<v-card class="ma-auto pa-2" variant="tonal" max-width="30em" elevation="24" >
			<v-card-text>
				<v-row >
					<v-col>
						<v-row class="text-h6"> Change Phone number </v-row>
						<v-row>{{ friendlyPhone(props.phone_number) }}</v-row>
					</v-col>
					<v-col align-self="center">
						<v-row justify="end">
							<v-btn text="Edit" v-if="!showPhone_number" color="minor" @click="showPhone_number=!showPhone_number"/>
						</v-row>
					</v-col>
				</v-row>
			</v-card-text>
		</v-card>

		<!-- Update Phone number -->
		<v-sheet v-if="showPhone_number" color="background" max-width="30em" class="mx-auto my-3">
			<v-form validate-on="submit" @submit.prevent="submitPhone_number" >
				<v-text-field label="Phone number (optional)" v-model="workingPhone_numberModel"
				ref="phone_numberFieldRef"
				clearable @click:clear= "clearPhone_numberValidationError"
				:rules="[
					value => checkPhone_number(value),
					value => checkPhone_numberInvalidCountryCode(value),
				]"
				hint="Example: 1 (919) 333-4444" variant="outlined" density="compact"/>

				<v-row class="justify-end px-3 py-5">
					<v-btn text="Cancel" class="mx-1" color="surface" @click="showPhone_number = false; workingPhone_numberModel='' "/>
					<v-btn text="Save Phone number" type="submit" :disabled="!workingPhone_numberModel" color="primary" />
				</v-row>
			</v-form>
		</v-sheet>

	</div>
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
const props = defineProps({phone_number: { type: String }})


const workingPhone_numberModel = ref("")
const phone_numberFieldRef = ref("")
const clearPhone_numberValidationError = () => phone_numberFieldRef.value.resetValidation()

const showPhone_number = ref(false)

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
			// showPhone_number: false
		})
		workingPhone_numberModel.value = ""
		showPhone_number.value = false
	})
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const friendlyPhone = (phone) => {
	if (phone == undefined) return
	const regex = /(?<plus>\+)(?<country>\d{1,3})(?<areacode>\d{3})(?<exchange>\d{3})(?<line>\d{4})/g;
	let match = regex.exec(phone)
	return `${match?.groups?.plus}${match?.groups?.country} (${match?.groups?.areacode}) ${match?.groups?.exchange}-${match?.groups?.line}`
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