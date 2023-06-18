<template>
	<v-app>
		<MasterLayout>
			<v-container class="text-center">
				<h1 class="text-primary">Profile Page Content</h1>
				<v-row v-if="route === 'authenticated'">
					<v-spacer/>
					<v-col cols="8">
						<v-divider :thickness="10" class="mb-10"></v-divider>
						<!-- START Forms -->

						<!-- Nickname -->
						<!-- <v-form :disabled="route !== 'authenticated'" class="w-50 mx-auto mt-10" validate-on="submit" @submit.prevent="submitNickname" >
							<v-row>
								<v-text-field :rules="[
									value => checkReservedNickname(value),
									value => checkShortNickname(value),
									value => checkFirstChar(value),
									value => checkSpecialChars(value)]"
									label="Nickname (optional)" hint="Short & Simple" variant="outlined" density="compact" v-model="workingNicknameModel"   />
							</v-row>
							<v-row class="justify-end">
								<v-btn :disabled="route !== 'authenticated'" color="surface" size="large" @click="resetNickname"> Cancel </v-btn>
								<v-btn :disabled="route !== 'authenticated'" class="ml-2" color="primary" size="large" type="submit"> Save </v-btn>
							</v-row>
						</v-form> -->

						<!-- Phone Number -->
						<!-- <v-row class="mt-5">
							<v-spacer></v-spacer>
							<v-col > +1 000 111 0000 </v-col>
							<v-spacer></v-spacer>
						</v-row>
						<v-row style="margin-top:-1.5em;">
							<v-spacer></v-spacer>
							<v-col> 1 000 111 0000 </v-col>
							<v-spacer></v-spacer>
						</v-row>
						<v-row style="margin-top:-1.5em;">
							<v-spacer></v-spacer>
							<v-col> 000 111 0000 </v-col>
							<v-spacer></v-spacer>
						</v-row>
						<v-form :disabled="route !== 'authenticated'" class="w-50 mx-auto mt-1" validate-on="submit" @submit.prevent="submitPhone_number" >
							<v-row>
								<v-text-field :rules="[
								value => checkPhone_number(value),
								value => checkPhone_numberInvalidCountryCode(value),
								]"
								label="Phone number (optional)" hint="Example: 1 (919) 333-4444"
								variant="outlined" density="compact"
								v-model="workingPhone_numberModel"
								></v-text-field>
							</v-row>
							<v-row class="justify-end">
								<v-btn :disabled="route !== 'authenticated'" color="surface" size="large" @click="resetPhone_number"> Cancel </v-btn>
								<v-btn :disabled="route !== 'authenticated'" class="ml-2" color="primary" size="large" type="submit"> Save </v-btn>
							</v-row>
						</v-form> -->
						
						<!-- Email Address -->
						<v-form :disabled="route !== 'authenticated'" class="w-50 mx-auto mt-1" validate-on="submit" @submit.prevent="submitEmail" >
							<v-row class="justify-end">
								<v-btn color="surface" size="large" variant="text" class="text-none" 
										@click="() => { buildEmailConfirmationMessage(workingEmailModel); toggleConfirm = true;}"
								><v-tooltip activator="parent" location="start">
										Confirm Email Popup
									</v-tooltip>
									<v-row class="justify-end mt-1" style="text-decoration: underline;">
											<p v-if="emailVerified"> Verified </p>
											<p v-else> Not Verified</p> 
											<v-spacer></v-spacer>
									</v-row>
								</v-btn>
							</v-row>
							<v-row>
								<v-text-field :rules="[
										value => checkEmailSpecialChar(value),
										value => checkEmailName(value),
										value => checkEmailDomain(value),
									]"
									label="Email (required)" hint="Example: dabowe@gmail.com" variant="outlined" density="compact"
									v-model="workingEmailModel">
								</v-text-field>
							</v-row>
							<v-row class="justify-end">
								<v-btn :disabled="route !== 'authenticated'" class="" color="surface" size="large" @click="resetEmail"> Cancel </v-btn>
								<v-btn :disabled="route !== 'authenticated'" class="ml-2" color="primary" size="large" type="submit"> Save </v-btn>
							</v-row>

							<!-- Confirmation -->
							<v-row justify="center">
								<v-overlay class="align-center justify-center" v-model="toggleConfirm" >
									<v-sheet width="30em" :style="{height:!EmailConfirmationMessage.Title.value?'28em':'23em'}" color="background" elevation="24" >
										<v-row>
											<v-spacer></v-spacer>
											<v-btn class="mr-3" icon="$close" size="large" variant="text" @click="toggleConfirm=false"></v-btn>
										</v-row>
										<v-col _cols="6" style="margin-top:-2.5em;">
											<v-row class="mx-5 mb-5">
												<h1 class="ma-auto" v-html="EmailConfirmationMessage.Title.value"></h1>
												<p v-html="EmailConfirmationMessage.Message.value"></p> 
											</v-row>
											<v-row class="justify-center">Confirmation Code</v-row>
											<v-row ><v-spacer></v-spacer><v-col cols="11">
												<v-text-field v-model="confirmCodeModel"
													id="ConfCode" placeholder="Enter your code" class="mb-2" style="height:1.75em;" variant="outlined" clearable density="compact">
												</v-text-field>
											</v-col><v-spacer></v-spacer></v-row>
											<v-row class="mx-5"> 
												<v-btn :disabled="!confirmCodeModel" @click="setEmailConfirmed" block color="primary" class="mb-2" > 
													Confirm 
												</v-btn> 
											</v-row>
											<v-row class="mx-5" >
 												<v-btn :disabled="!workingEmailModel" @click="resendEmailConfirmationCode" block color="background" class="mb-2" > 
													Resend Code
												</v-btn>
											</v-row>
										</v-col>
									</v-sheet>
								</v-overlay>
							</v-row>
						</v-form>
						<!-- END Forms -->

						</v-col>
						<v-spacer/>
					</v-row>

					<v-row v-if="route === 'authenticated'">
						<v-spacer/>
						<v-col cols="8">
						<v-divider :thickness="10" class="ma-2"></v-divider>

						<p>Passed Properties</p>
						<v-row>
							<v-col cols="6" style="text-align:end;">
								<p>nicknameModel</p>
								<p>emailModel</p>
								<p>phone_numberModel</p>
							</v-col>

							<v-divider vertical :thickness="3" class="my-2" />

							<v-col cols="4" style="text-align:start;">
								<p>{{ nicknameModel }}</p>
								<p>{{ emailModel }}</p>
								<p>{{ phone_numberModel }}</p>
							</v-col>
						</v-row>

						<v-divider :thickness="10" class="ma-2"></v-divider>

						<h4>Hello {{ nicknameModel }} !</h4>

						</v-col>
						<v-spacer/>
					</v-row>

					<v-row ><v-spacer/>
						<v-col cols="8">
							<v-divider :thickness="10" class="ma-2"></v-divider>
							<authenticator>
								<v-btn v-if="route === 'authenticated'" color="secondary" @click="signOut">Sign Out</v-btn>
							</authenticator>
						</v-col><v-spacer/>
					</v-row>

			</v-container>
		</MasterLayout>
	</v-app>
</template>

<script lang="ts" setup>
import MasterLayout from "../layouts/MasterLayout.vue";
import { Auth, Hub } from 'aws-amplify';
import { ConfirmSignIn, useAuthenticator } from '@aws-amplify/ui-vue';

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  */
import {
	info, info1, info2, info3, info4, info5, info6, info7,
	bar, whitebar, greybar,
	enter, start,
	progress, pause, resume,
	fini, exit, joy, pass, success,
	warn,
	fail, err,  err2,
	log,
} from "../my-util-code/MyConsoleUtil"
import { toRefs, ref, computed, } from 'vue'
import { Authenticator } from "@aws-amplify/ui-vue";
import "@aws-amplify/ui-vue/styles.css";

const { route, signOut} = toRefs(useAuthenticator());
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

const confirmCodeModel:Number = ref()
let toggleConfirm:boolean = ref(false)

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const props = defineProps({
	p1: { type: String },
	p2: { type: String },
	p3: { type: String }
})

const nicknameModel = ref(props.p1)
const workingNicknameModel = ref("")
const resetNickname = () => { workingNicknameModel.value = nicknameModel.value }

const phone_numberModel = ref(props.p3)
const workingPhone_numberModel = ref("")
const resetPhone_number = () => { workingPhone_numberModel.value = phone_numberModel.value }

const emailModel = ref(props.p2)
const workingEmailModel = ref("")
const resetEmail = () => { workingEmailModel.value = emailModel.value }
const EmailConfirmationMessage = { Title: ref(""), Message: ref("") }

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/* Email */

const emailVerified = ref()
const emailVerifiedMessage = ref()

const resendEmailConfirmationCode = async () => {
	const user = await Auth.currentAuthenticatedUser();
	await Auth.updateUserAttributes(user, { email: workingEmailModel.value });
}

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
	const emailName = parseEmail(emailArg).name
	//				Length check ( long & short )
	//				--	64 char
	//				0123456789_123456789_123456789_123456789_123456789_123456789_1234
	let len = emailName.length;
	if(len > 64){
		return "FAIL checkEmailName() > Length Check: Max char allowed = 64 char"
	}
	if(len <= 0){
		return "FAIL checkEmailName() > Length Check: Min char allowed = 1 char"
	}
	//				Leading and trailing special char check
	//				Note: The trailing '_' has been removed from the check.
	//					Gmail accepts this trailing character.
	/*			 	TEST DATA -- This patterns must fail.
						asd_@gmail.com // This is valid
						-asd@gmail.com		asd-@gmail.com		_asd@gmail.com		+asd@gmail.com
						asd+@gmail.com		.asd@gmail.com		asd.@gmail.com		*/

	const regex = new RegExp('^[-_+\\.]|[-+\\.]$', 'gm')
	let match = regex.exec(emailName)
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
	let match = regex.exec(emailDomain)
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

const parseEmail = (email) => {
	const regex = new RegExp('^(?<name>.*)@(?<domain>.*)', 'gm')
	let match = regex.exec(email)
	return { name: match.groups.name, domain: match.groups.domain }
}

async function submitEmail (event) {
	const results = await event
	if(!results.valid) {
		return /* Cancel Submission if validation FAILED */
	}
	//				If we get here, validation was sucessful
	//				This will return the user in the user pool (not updated )
	const newuser = await Auth.currentAuthenticatedUser({bypassCache: true /* false */});
	await Auth.updateUserAttributes(newuser, {'email': workingEmailModel.value })
	await Auth.currentUserInfo().then(result => {
		emailModel.value = result.attributes.email
		//				Prepare the Confirm UI message
		EmailConfirmationMessage.value = buildEmailConfirmationMessage(workingEmailModel.value)
		//				Display the Confirmation UI
		toggleConfirm.value = true
	})
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const buildEmailConfirmationMessage = (email:string) => {
	if(email) {
		//			If we get here, the email arg contains data.
		let {name , domain} = parseEmail(email)
		let obscureEmail = `${name[0]}***@${domain[0]}***`
		EmailConfirmationMessage.Title.value = "We Emailed You"
		EmailConfirmationMessage.Message.value = 
			`Your code is on the way. To confirm your email address change, `+
			`enter the code we emailed to <b>${obscureEmail}</b>.`+
			`<br>This may take a minuet to arrive.`
		return EmailConfirmationMessage
	}
	//				No Title should be included with this message.
	let message = 
		`To confirm your email address change, you <b>MUST</b> enter the `+
		`code we emailed to the new email address you provided.<br><br>` + 

		`<h2>Resend Code: Not available.</h2>`+
		
		`Your new email is not accessable to the application. To generate `+
		`a confirmation code, close this popup and update the email again. `+
		`You can use the same email.`
	EmailConfirmationMessage.Message.value = message
	return EmailConfirmationMessage
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const setEmailConfirmed = async function () {
	await Auth.verifyCurrentUserAttributeSubmit('email', `${confirmCodeModel.value}`)
		.then((response) => {
			toggleConfirm.value = false
			confirmCodeModel.value = null
			emailModel.value = workingEmailModel.value
		})
		.catch((e) => {
			alert(`ERROR -- Invalid Confirmation Code [ ${confirmCodeModel.value} ] -- ${e}` )
		});
	return
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

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
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
/* Nickname Decl */
async function submitNickname(event) {
		const results = await event
		if(!results.valid) return
		//				This will return the user in the user pool (not updated )
		const newuser = await Auth.currentAuthenticatedUser({bypassCache: true /* false */});
		await Auth.updateUserAttributes(newuser, {'nickname': workingNicknameModel.value })
		await Auth.currentUserInfo().then(result => {
			nicknameModel.value = result.attributes.nickname
		})
}
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/* Nickname Validation Decls */
async function checkReservedNickname (workingNickname) {
	if (workingNickname === 'kevin') {
		return 'User nickname reserved. Please try another one.'
	}
	return true
}
async function checkShortNickname (workingNickname) {
	if (workingNickname.length > 0 && workingNickname.length <= 3) {
		return 'User nickname is too short. Please try another one.'
	}
	return true
}
async function checkFirstChar (workingNickname) {
	if (!isNaN(workingNickname[0])) {
		return 'User nickname can not begin with a Number. Please try another one.'
	}
	return true
}
async function checkSpecialChars (workingNickname) {
	const re = /[!@#$%\^&*(){}[\]<>?/|]/
	const match = workingNickname.match(re)
	// 			Check the format
	if(match) {
		return 'User nickname can not contain special characters. Please try another one.'
	}
	return true
}
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
Hub.listen('auth', (data) => {
	switch(data.payload.event) {
		case "signUp" :
		case "confirmSignUp" :
		case "autoSignIn" :
		case "signOut" :
			return
		case "signIn" :
			getSession()
			return
	} // 			END_SWITCH
})
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/* GetSession Decl */
let areParamsEmpty = function() {
	let v = Object.values(props)
	let o = v.find(e => e.length === 0)
	// 			IF no match: return undefined ELSE return string
	return typeof o !== undefined
}
let areModelsEmpty = function(){
	return nicknameModel.value?.length === 0 ||
	emailModel.value?.length === 0 ||
	phone_numberModel.value?.length === 0
}
async function getSession(){
	if(areParamsEmpty() || areModelsEmpty()) {
		//				Check to see if there is an active session.
		await Auth.currentAuthenticatedUser({bypassCache: true /* false */})
		.then((user) => {
			emailModel.value = user.attributes?.email
			emailVerified.value = user.attributes?.email_verified
			emailVerifiedMessage.value = user.attributes?.email_verified ? "Confirmed" : "Unconfirmed"
			phone_numberModel.value =  user.attributes?.phone_number
			nicknameModel.value = user.attributes?.nickname
		})
		.catch((error) => {
			//				If I get here, there is no session or params
			//				I need to signIn.
		})
	}
	else {
		//				If we get here, the params and models exist.
		//				We don't need to sign in.
	}
}
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
getSession()
</script>
<style>
	/* Apply styling to Authenticator so that is is consistent with the rest of the site. */
	.amplify-button--link { color: rgb(var(--v-theme-primary)); }
	.amplify-button[data-variation='primary'] { background-color: rgb(var(--v-theme-primary)); }
	.amplify-tabs-item { color: rgb(var(--v-theme-primary)); }
	.amplify-tabs-item:focus { color: rgb(var(--v-theme-primary)); }
	.amplify-tabs-item:hover { color: rgb(var(--v-theme-primary)); }
	.amplify-tabs-item[data-state=inactive] {
		color: rgb(var(--v-theme-primary));
		border-color: rgb(var(--v-theme-primary));
		background-color: #E0E0E0;
		/* border-bottom-width: 5px; */
	}

	/* Apply styling to Authenticator so that is is consistent with the rest of the site. */
	.amplify-tabs-item[data-state=active] {
		color: rgb(var(--v-theme-primary));
		border-color: rgb(var(--v-theme-primary));
		border-top-width: 5px;
		/* border-right-width: 5px; ; */
	}
	/*
	.amplify-alert--error {
			color: black;
			background-color: rgb(var(--v-theme-error));
	} */

	/* Style the Nickname field, in the Authenticator to match the style of the rest of the site. */
	.v-input { margin-top: 2px;}
	.signup-nickname input {text-align: center;}

	/* Prevent the SignUp tab from displaying */
	.amplify-tabs { display: none; }

	/* input#input-140::placeholder{ color:red;text-align:center} */
	input#ConfCode::placeholder{ text-align:center}
	input#ConfCode{ text-align:center}
</style>