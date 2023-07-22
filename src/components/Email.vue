<template>
	<!-- Update Email-->
	<v-row justify="center" v-if="isSession">
		<v-col :sm="8" :md="6" :lg="4" class="ma-5" >
		<v-form ref="emailFormRef" validate-on="submit" @submit.prevent="submitEmail" >
			<v-row>
				<v-text-field label="Email -- Confirmed"  v-model= "workingEmailModel" 
					clearable @click:clear="clearWorkingEmailModelValidationError"
					:rules="[ 
						value => checkEmailSpecialChar(value), 
						value => checkEmailName(value), 
						value => checkEmailDomain(value),
					]"
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
	/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
	export const parseEmail = (email) => {
		const regex = new RegExp('^(?<name>.*)@(?<domain>.*)', 'gm')
			let match = regex.exec(email)
			if (match) return { name: match.groups.name, domain: match.groups.domain }
			return null
		}
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
	const authUser = await Auth.currentAuthenticatedUser({bypassCache: true})
	await Auth.updateUserAttributes(authUser, {'email': workingEmailModel.value });
	confirmEmailCodeModel.value = ""
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
/* ----------------------------------------------------------------------------- */
const checkEmailSpecialChar = (emailArg) => {
					// DEBUG CODE
					if (emailArg === null) info7("checkEmailSpecialChar(emailArg) > emailArg is Null")
	
	//				Check ALL Special Chars -- REFERENCE -- 7/21/23
	const rxAll = /[+\-_@\.`~!#$%^&'"*,:;/ {}[\]()<>]/gm

	// 			Exclude these Special Chars ---->  +  -  _  @  .
	const rxExclude = /[`~!#$%^&'"*,:;/ {}[\]()<>]/gm
	const matchExclude = emailArg.match(rxExclude)
	if(matchExclude) return `Special chars are not allowed [ ${matchExclude} ]`
			
	//				Perform multiple '@'' check
	const rxMultiAtChar = /@{2}|@.*@/gm
	const matchMultiAtChar = emailArg.match(rxMultiAtChar)
	if(matchMultiAtChar) return "Multiple '@' chars are not allowed"

	//				Perform consecutive special char check  ---->  . -  +
	let rxConsecutive = /\.\.|--|\+\+/gm
	const matchConsecutive = emailArg.match(rxConsecutive)
	if ( matchConsecutive) return `Consecutive Special Characters are not allowed. [ ${matchConsecutive} ]`
	
	return true
}
/* ----------------------------------------------------------------------------- */
const checkEmailName = (emailArg) => {
	const parsedEmail = parseEmail(emailArg)
	if (!parsedEmail) return "FAIL checkEmailName() > Invalid Email"
	
	//				Length check ( long & short ) ---->	64 char
	//				0123456789_123456789_123456789_123456789_123456789_123456789_1234
	let len = parsedEmail.name.length;
	if(len > 64) return "FAIL checkEmailName() > Length Check: Max char allowed = 64 char"
	if(len <= 0) return "FAIL checkEmailName() > Length Check: Min char allowed = 1 char"

	//				Leading and trailing special char check. -- The trailing '_' has been removed from the check.
	//			 	_asd@gmail.com		-asd@gmail.com		asd-@gmail.com
	//				+asd@gmail.com		asd+@gmail.com		.asd@gmail.com		asd.@gmail.com
		const rxLeadTrailChar = /^[-_+\\.]|[-+\\.]$/gm
	let matchLeadTrailChar = parsedEmail.name.match(rxLeadTrailChar)
	if(matchLeadTrailChar) return `[-_+.] can not be the first/last char of email name [ ${matchLeadTrailChar} ]`

	return true
}
/* ----------------------------------------------------------------------------- */
const checkEmailDomain = (emailArg) => {
	const emailDomain = parseEmail(emailArg).domain

	//			Length check ( long & short ) ----> 253 char
	//			asd@_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789.com   */
	let len = emailDomain.length;
	if(len > 253) return `Max Valid Domain Length: 253 -- Actual Length: ${emailDomain.length}`
	if(len <= 2) return `Min Valid Domain Length: 3 -- Actual Length: ${emailDomain.length}`
	
	//			Split the domain and tld and check from both pieces.
	const rxDomainAndTLD = /^(?<domain>.*)[\\.|\\s](?<tld>.*)/m
	let matchDomainAndTLD = emailDomain.match(rxDomainAndTLD)

	//			Check Domain
	if(matchDomainAndTLD?.groups?.domain.length === 0 || matchDomainAndTLD?.groups?.domain === undefined) 
		return `An email domain is required ${emailDomain}`
	
	//			Check Leading/Trailing Special Char in Domain
	// 		asd@-asd.com	asd@asd-.com	asd@.asd.com	asd@asd..com
	// 		asd@_asd.com	asd@asd_.com	asd@+asd.com	asd@asd+.com
	const rxLeadTrailDomainChar = /^[-_+\\.]|[-_+\\.]$/gm
	let matchLeadTrailDomainChar = matchDomainAndTLD.groups.domain.match(rxLeadTrailDomainChar)
	if(matchLeadTrailDomainChar) return `[-_+.] can not be the first/last char in the domain name [ ${matchLeadTrailDomainChar} ]`
	
	//			Check	TLD (Top-Level-Domain)
	if(matchDomainAndTLD?.groups.tld.length === 0 || matchDomainAndTLD?.groups.tld === undefined)
		return "FAIL checkEmailDomain() > Domain Check: TopLevelDomain is missing"
	
	//			Check Leading/Trailing Special Char in TLD
	let matchLeadAndTrailTldChar = matchDomainAndTLD?.groups.tld.match(rxLeadTrailDomainChar)
	if(matchLeadAndTrailTldChar) return `[-_+.] can not be the first/last char in the TLD name [ ${matchLeadAndTrailTldChar} ]`
	return true
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
</script>


<style>
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
</style>src/components/Email.vue