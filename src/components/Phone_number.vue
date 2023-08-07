<template>
	<v-form 
	class="w-50 mx-auto mt-1" 
	validate-on="submit" 
	@submit.prevent="submitPhone_number" >
		
	<v-row>
	
		<v-text-field 
			:rules="[
				value => checkPhone_number(value),
				value => checkPhone_numberInvalidCountryCode(value),
			]"
			label="Phone number (optional)" 
			hint="Example: 1 (919) 333-4444"
			variant="outlined" 
			density="compact"
			v-model="workingPhone_numberModel"
			/>
	
		</v-row>

		<v-row class="justify-end">

			<v-btn color="surface" size="large" @click="resetPhone_number"> Cancel </v-btn>
			
			<v-btn class="ml-2" color="primary" size="large" type="submit"> Save </v-btn>
		
		</v-row>
	
	</v-form>

</template>

<script setup lang="ts">
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
import {ref} from "vue"
import { Auth } from 'aws-amplify';


/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const props = defineProps({
	p1: { type: String },
	p2: { type: String },
	p3: { type: String },
	p4: { type: String }
})
/* ----------------------------------------------------------------------------- */
const phone_numberModel = ref(props.p3)
const workingPhone_numberModel = ref("")
const resetPhone_number = () => { workingPhone_numberModel.value = phone_numberModel.value }

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/* Phone number validation Decls */
async function checkPhone_number (workingPhone_number) {
	//				Strips these characters -- 'sp', '+', '-', '(', ')'
	//				If a Country code is missing, add '1' (North America)
	let strippedPhone_number = stripPhone_numberFmt(workingPhone_number)
	//				Check length
	if (strippedPhone_number.value.length < 11)
	return `Incomplete phone number == char count == ${strippedPhone_number.value.length} == ${strippedPhone_number.value}`
	//				Check for alpha characters
	let expAtoZ = /[A-Za-z]/
	let match = strippedPhone_number.value.match(expAtoZ)
	if (match !== null )
	return `Alphabetical characters are invalid == [${match}] == ${strippedPhone_number.value}`
	//				Check for special characters
	let expSpecChar = /[!@#$%\^&*(){}[\]<>?/|\\]/
	let match2 = strippedPhone_number.value.match(expSpecChar)
	if (match2 !== null)
		return `Special characters are invalid == [${match2}] == ${strippedPhone_number.value}`
		//			If we get here, the phone number passed all validation tests
		return true
	}
/* ----------------------------------------------------------------------------- */
/* Phone Number Filters */
const InvalidCounteryCodes = {
	7 : "Russia ",
	53 : "Cuba" ,
	591 : "Bolivia" ,
	999 : "Unknown",
	99 : "Unknown",
	9 : "Unknown",
	0 : "Unknown"
}
const countryCodeMap = new Map(Object.entries(InvalidCounteryCodes))
async function checkPhone_numberInvalidCountryCode (workingPhone_number) {
	//				Strips these characters -- 'sp', '+', '-', '(', ')'
	//				If a Country code is missing, add '1' (North America)
	const strippedPhone_number = stripPhone_numberFmt(workingPhone_number)
	// 			Compare each value in the InvalidCounteryCodes array to the strippedPhone_number
	let validationMessage:any = true
	//				The copuntryCodeMap is based on a KVP object InvalidCountryCodes
	for (const [key,value] of countryCodeMap)
	{
		const rx = new RegExp(`^${key}`, "g")
		const match = strippedPhone_number.value.match(rx)
		if (match !== null) {
			validationMessage = `Invalid Country Code: ${key} [ ${value} ]`
			break
		}
	}
	return validationMessage
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/* Submit Phone Number Decl */
async function submitPhone_number(event) {
	const results = await event
	if(!results.valid) return // Cancel Submission if validation FAILED
	//				Strips these characters -- 'sp', '+', '-', '(', ')'
	//				If a Country code is missing, add '1' (North America)
	const strippedPhone_number = stripPhone_numberFmt(workingPhone_numberModel)
	//				Add the '+' prefix
	strippedPhone_number.value = `+${strippedPhone_number.value}`
	//				This will return the user in the user pool (not updated )
	const newuser = await Auth.currentAuthenticatedUser({bypassCache: true /* false */});
	await Auth.updateUserAttributes(newuser, {'phone_number': strippedPhone_number.value })
	await Auth.currentUserInfo().then(result => {
		phone_numberModel.value = result.attributes.phone_number
	})
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/* Phone_number */
const stripPhone_numberFmt = (phone_numberArg) => {
	//				Cast the input Arg to the proper type.
	let phone_numberStr:String = typeof phone_numberArg === "object" ? phone_numberArg.value : phone_numberArg
	if (typeof phone_numberStr !== "string" )	throw new Error('Parameter is unexpected type!')

	let expStrip = /\+|\s+|\-|\(|\)|\+1/g
	let strippedPhone_numberStr = phone_numberStr.replace(expStrip, '')
	//				If a Country code is missing, add '1' (North America)
	if (strippedPhone_numberStr.length == 10)
		strippedPhone_numberStr = `1${strippedPhone_numberStr}`
	//				Return a reference
	return ref(strippedPhone_numberStr)
}

</script>