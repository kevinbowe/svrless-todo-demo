<template>
	<!-- Update Email-->
	<v-row justify="center" v-if="isSession">
		<v-col :sm="8" :md="6" :lg="4" class="ma-5" >
		<v-form ref="emailFormRef" validate-on="submit" @submit.prevent="submitEmail" >
			<v-row>
				<v-text-field label="Email -- Confirmed"  v-model= "workingEmailModel" 
					clearable @click:clear="clearWorkingEmailModelValidationError"
					:rules="[ value => checkEmailSpecialChar(value), value => checkEmailName(value), value => checkEmailDomain(value),]"
					variant="outlined" density="compact" 
				></v-text-field>
			</v-row>
			<v-row class="justify-end">
				<v-btn :disabled="!workingEmailModel" color="primary" type="submit"> Save Email </v-btn>
			</v-row>
		</v-form>
		</v-col>
	</v-row>
	<!-- Update Email Confirmation -->
	<v-row justify="center" v-if="isSession">
		<v-overlay class="align-center justify-center" v-model="toggleConfirmEmail" >
			<v-sheet height="24em" width="20em" color="surface_alt" elevation="24">
					<v-row><v-spacer/>
					<v-btn __THIS_IS_THE_X_IN_UPPER_RIGHT__ 
						class="mr-3" icon="$close" size="large" variant="text" @click="toggleConfirmEmail=false"></v-btn>
				</v-row>
				<v-col style="margin-top:-2.5em;">
					<v-row no-gutters>
						<h1 class="ma-auto" v-html="emailConfirmationMessage.Title.value"></h1>
						<p v-html="emailConfirmationMessage.Message.value"></p>
						<p class="ma-auto" v-html="emailConfirmationMessage.Message2.value"></p>
						<p class="ma-auto" v-html="emailConfirmationMessage.Message3.value"></p>
					</v-row>
					<v-row><v-spacer/>
						<v-col cols="11">
							<v-text-field label="Confirmation Code" v-model="confirmEmailCodeModel" clearable @click:clear="invalidEmailConfirmCode = ''"
								id="ConfCode" placeholder="Enter your code" class="mb-2" style="height:1.75em;" variant="outlined"  density="compact">
							</v-text-field>
							<p class="mt-4" style="color:rgb(var(--v-theme-error));" >{{ invalidEmailConfirmCode }}</p>
						</v-col><v-spacer/>
					</v-row>
					<v-row class="mx-5">
						<v-btn :disabled="!confirmEmailCodeModel" @click="applyEmailConfirmationCode" block color="primary" class="mb-2" > Confirm </v-btn>
						<v-btn block color="surface" class="mb-2" @click="resendEmailConfirmationCode"> Resend Code </v-btn>
					</v-row>
				</v-col>
			</v-sheet>
		</v-overlay>
	</v-row>
</template>

<script lang="ts">
	export const emailModel = ref("")
</script>

<script setup lang="ts">
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
				/*  */
import { info, info1, info2 , info3, info4, info5, info6, info7 } from "../my-util-code/MyConsoleUtil"
import { enter, enter0, enter1, enter2, enter3, enter4, enter5, enter6, enter7 } from "../my-util-code/MyConsoleUtil"
import { bar, whitebar, greybar, redbar, greenbar, orangebar } from "../my-util-code/MyConsoleUtil"
import { log, warn, err, err2, exit, success, pass, fail, fini, start, progress, joy, } from "../my-util-code/MyConsoleUtil"
				/*  */
import { ref, Ref } from 'vue'
import { Auth } from 'aws-amplify';
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const invalidEmailConfirmCode = ref("")
const emailFormRef = ref()
const confirmEmailCodeModel = ref("")
const toggleConfirmEmail:Ref<boolean> = ref(false)
const emailConfirmationMessage = { Title: ref(""), Message: ref(""), Message2: ref(""), Message3: ref("") }
const workingEmailModel =ref("")
// const emailModel = ref("")
const openDialogFlag = ref()

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
defineProps({
	isSession: Boolean
})

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/*																											*/
/**/					const BLOCKAPIFLAG = ref(false)										 /**/
/*																											*/
/* 				if(BLOCKAPI("submitEmail function "))return								*/
/*																											*/
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const BLOCKAPI = (message:string|null|undefined = null) => {
	if(BLOCKAPIFLAG.value) 
		message ? info7(`${message} -- BLOCKED`) : info7("-- BLOCKED -- ")
	return BLOCKAPIFLAG.value
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const parseEmail = (email) => {
	const regex = new RegExp('^(?<name>.*)@(?<domain>.*)', 'gm')
		let match = regex.exec(email)
		if (match) return { name: match.groups.name, domain: match.groups.domain }
		return null
	}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
async function submitEmail (event) {

	if(BLOCKAPI("submitEmail function "))return
	
	const results = await event
	if(!results.valid) {
		return /* Cancel Submission if validation FAILED */
	}
	//				If we get here, validation was sucessful
	//				This will return the user in the user pool (not updated )
	const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
	await Auth.updateUserAttributes(authUser, {'email': workingEmailModel.value })
	await Auth.currentUserInfo().then(result => {
		emailModel.value = result.attributes.email
		//				Prepare the Confirm UI message
		emailConfirmationMessage.value = buildEmailConfirmationMessage(workingEmailModel.value)
		//				Display the Confirmation UI
		toggleConfirmEmail.value = true
	})
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const resendEmailConfirmationCode = async () => {
	const user = await Auth.currentAuthenticatedUser().then( () => {
		confirmEmailCodeModel.value = ""
	});
	await Auth.updateUserAttributes(user, { email: workingEmailModel.value });
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const applyEmailConfirmationCode = async function () {
	await Auth.verifyCurrentUserAttributeSubmit('email', `${ confirmEmailCodeModel.value}`)
		.then((response) => {
			// 		If we get here, the email is CONFIRMED.
			emailModel.value = workingEmailModel.value
			workingEmailModel.value = null
			confirmEmailCodeModel.value = null
			
			toggleConfirmEmail.value = false
		})
		.catch((e) => {
			openDialogFlag.value = true // open the Popup Dialog
			confirmEmailCodeModel.value = null
		})
		return
	}
	
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const buildEmailConfirmationMessage = (email:string) => {
	emailConfirmationMessage.Title.value = "We Emailed You"
	
	emailConfirmationMessage.Message.value = 
	`To confirm your new account, you must enter the ` +
	`code we emailed to the new email address you provided.` 
	
	let {name , domain} = parseEmail(email)
	emailConfirmationMessage.Message2.value = `<b>${name[0]}***@${domain[0]}***</b>`
	
	emailConfirmationMessage.Message3.value = `This may take a minuet to arrive.`
	
	return emailConfirmationMessage
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const clearWorkingEmailModelValidationError = () => emailFormRef.value.resetValidation()

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/* Email -- Validation */
const checkEmailSpecialChar = (emailArg) => {
	//				Perform general special char check
	const regexSpecialChar = new RegExp('^.*[!#$%^\'"*,:;|/ {}<>[\\]\\\\()]', 'gm')

	const specialCharMatch = regexSpecialChar.exec(emailArg)
	if ( specialCharMatch !== null) {
		//			If we get here, there was a match
		return "FAIL checkEmailSpecialChar() > specialCharMatch"
	}
	//				Perform multiple @ check
	const regexMultipleAtChar = new RegExp('^.*@.*@', 'gm')
	const multipleAtCharMatch = regexMultipleAtChar.exec(emailArg)
	if ( multipleAtCharMatch !== null) {
		//			If we get here, there was a match
		return "FAIL checkEmailSpecialChar() > multipleAtCharMatch"
	}
	//				Perform consecutive special char check
	const regexConsecutiveSpecialChar = new RegExp('\\.\\.|--|\\+\\+', 'gm')
	const consecutiveSpecialCharMatch = regexConsecutiveSpecialChar.exec(emailArg)
	if ( consecutiveSpecialCharMatch !== null) {
		//			If we get here, there was a match
		return "FAIL checkEmailSpecialChar() > ConsecutiveSpecialChar"
	}
	return true
}

const checkEmailName = (emailArg) => {
	const parsedEmail = parseEmail(emailArg)
	if (!parsedEmail) return "FAIL checkEmailName() > Invalid Email"
	//				Length check ( long & short )
	//				--	64 char
	//				0123456789_123456789_123456789_123456789_123456789_123456789_1234
	let len = parsedEmail.name.length;
	if(len > 64) return "FAIL checkEmailName() > Length Check: Max char allowed = 64 char"
	if(len <= 0) return "FAIL checkEmailName() > Length Check: Min char allowed = 1 char"
	//				Leading and trailing special char check
	//				Note: The trailing '_' has been removed from the check.
	//					Gmail accepts this trailing character.
	/*			 	TEST DATA -- This patterns must fail.
						asd_@gmail.com // This is valid
						-asd@gmail.com		asd-@gmail.com		_asd@gmail.com		+asd@gmail.com
						asd+@gmail.com		.asd@gmail.com		asd.@gmail.com
	*/
	const regex = new RegExp('^[-_+\\.]|[-+\\.]$', 'gm')
	let match = regex.exec(parsedEmail.name)
	if(match != null){
		return `Invalid character [-_+.] used at begining or end of email name [ ${match} ]`
	}

return true
}

const checkEmailDomain = (emailArg) => {
	const emailDomain = parseEmail(emailArg).domain
	//				Length check ( long & short )
	/*				TEST DATA -- 253 char domain
					asd@_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789.com   */

	let len = emailDomain.length;
	if(len > 253){
		return `Max Valid Domain Length: 253 -- Actual Length: ${emailDomain.length}`
	}
	if(len <= 2){
		return `Min Valid Domain Length: 3 -- Actual Length: ${emailDomain.length}`
	}

	//				Domain and TopLevelDomain check
	//				Split the domain and tld and check from both pieces.
	const regex = new RegExp('^(?<domain>.*)[\\.|\\s](?<tld>.*)', 'gm')
	let match:RegExpExecArray | null = regex.exec(emailDomain)
	//				Domain Check Section
	//				Exists Check
	if(match?.groups.domain.length === 0 || match?.groups.domain === undefined){
		//			Missing the Domain
		return "FAIL checkEmailDomain() > Domain Check: Domain is missing"
	}

	//		TEST DATA
	// asd@-asd.com		asd@asd-.com		asd@.asd.com		asd@asd..com
	// asd@_asd.com		asd@asd_.com		asd@+asd.com		asd@asd+.com

	//				Leading/Trailing Special Char Check
	const regexSpecialChar = new RegExp('^[-_+\\.]|[-_+\\.]$', 'gm')
	let matchSpecialChar = regexSpecialChar.exec(match?.groups.domain)
	if(matchSpecialChar != null){
		return `Invalid character [-_+.] used at begining or end of domain name [ ${matchSpecialChar} ]`
	}

	//				TLD (Top-Level-Domain) Checks
	//				Exists Check
	if(match?.groups.tld.length === 0 || match?.groups.tld === undefined){
		return "FAIL checkEmailDomain() > Domain Check: TopLevelDomain is missing"
	}
	//				Leading/Trailing Special Char Check
	let matchTldSpecialChar = regexSpecialChar.exec(match?.groups.tld)
	if(matchTldSpecialChar != null){
		return `Invalid character [-_+.] used at begining or end of TLD name [ ${matchTldSpecialChar} ]`
	}
	return true
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
</script>


<style>
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
</style>