<template>
	<v-app>
		<MasterLayout>
			<v-container class="text-center">
				<h1 class="text-primary">Profile Page Content.</h1>
				{{ route }}
				<v-row v-if="route === 'authenticated'">
					<v-spacer/>
					<v-col cols="8">
						<v-divider :thickness="10" __class="ma-2"></v-divider>

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
						<v-row class="mt-5">
							<v-spacer></v-spacer>
							<v-col cols="5"> kevinbowe1957+__10__@gmail.com </v-col>
							<v-spacer></v-spacer>
						</v-row>
						<v-row style="margin-top:-1.5em;">
							<v-spacer></v-spacer>
							<v-col cols="5"> kevinbowe1957+__20__@gmail.com </v-col>
							<v-spacer></v-spacer>
						</v-row>
						<v-row style="margin-top:-1.5em;">
							<v-spacer></v-spacer>
							<v-col cols="5"> kevinbowe1957+__30__@gmail.com </v-col>
							<v-spacer></v-spacer>
						</v-row>
						
						<v-form :disabled="route !== 'authenticated'" class="w-50 mx-auto mt-1" validate-on="submit" @submit.prevent="submitEmail" >
							<v-row>
								<v-text-field :rules="[value => checkEmail_1(value),value => checkEmail_2(value),]" 
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
								<v-btn color="success" class="mt-2" @click="toggleConfirm = !toggleConfirm"> Show Overlay </v-btn>
								<v-overlay class="align-center justify-center" v-model="toggleConfirm" >
									<v-sheet height="25em" width="30em" color="background" elevation="24" >
										<!-- Confirmation UI -->
										<v-col _cols="6">
											<v-row class="ma-5">
												<h1 class="ma-auto">We Emailed You</h1>



												<p> 
													<!-- Your code is on the way. To login enter the code we email to k***@g***. This may take a minuet to arrive.  -->
													{{ EmailConfirmationMessage }}
												</p> 
											
											
											
											</v-row>
											<v-row class="justify-center">Confirmation Code</v-row>
											<v-row > 
												<v-spacer></v-spacer>
													<v-col cols="11"> 
														<v-text-field v-model="confirmCodeModel"
																id="ConfCode" placeholder="Enter your code" class="mb-2" style="height:1.75em;" variant="outlined" clearable density="compact"> 
														</v-text-field> 
													</v-col>
													<v-spacer></v-spacer>
											</v-row>
											
											
											<v-row class="mx-5"> 
												<v-btn
														@click="setEmailConfirmed" 
														block color="primary" class="mb-2"> 
													Confirm 
												</v-btn> 
											</v-row>

											<v-row class="mx-5" ><v-btn block color="background" class="mb-2" _style="margin-top:1.5em;">Resend Code</v-btn></v-row>
											<v-row class="mx-5"><v-btn block color="success" @click="toggleConfirm = false" > Hide Overlay </v-btn></v-row>
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
import { useAuthenticator } from '@aws-amplify/ui-vue';

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

import { toRefs, ref, } from 'vue'
import { Authenticator } from "@aws-amplify/ui-vue";
import "@aws-amplify/ui-vue/styles.css";

const { route, signOut} = toRefs(useAuthenticator());
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

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
const confirmCodeModel:Number = ref()
const EmailConfirmationMessage:String = ref("")

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/* Email */
const checkEmail_1 = (emailArg) => {
	// enter("checkEmail_1 ")
	// exit("checkEmail_1 --> pass")
	// return "Fail Email 1"
	return true
}

const checkEmail_2 = (emailArg) => {
	// enter("checkEmail_2 ")
	// exit("checkEmail_2 --> pass")
	// return "Fail Email 2"
	return true}

async function submitEmail (event) {	
							enter("submitEmail(event)")
							pause("submitEmail(event)")
	const results = await event
							resume("submitEmail(event)")
	if(!results.valid) {
							// fail("Validation -- submitEmail(event)")
		return /* Cancel Submission if validation FAILED */
	}
	//				If we get here, validation was sucessful

	//				This will return the user in the user pool (not updated )
	const newuser = await Auth.currentAuthenticatedUser({bypassCache: true /* false */});
	await Auth.updateUserAttributes(newuser, {'email': workingEmailModel.value })
	await Auth.currentUserInfo().then(result => {
		emailModel.value = result.attributes.email

		//				Prepare the Confirm UI message
						start("Prep Confirm Message")
		//				Call the function here.
		//				This function will set a messageModel that contains the WHOLE message string.
		EmailConfirmationMessage.value = buildEmailConfirmationMessage(workingEmailModel.value)
						fini("Prep Confirm Message")


		//				Display the Confirmation UI
		toggleConfirm.value = true
	})
							// exit("submitEmail(event)")
}
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const buildEmailConfirmationMessage = (email:string) => {

	
	/**
	 * Split on '@' into 2x groups
	 * fetch the first char of the first group
	 * fetch the first char of the second group.
	 * re-assemble the email
	 */
	
	const regex = new RegExp('^(?<name>.*)@(?<domain>.*)', 'gm')
		let match = regex.exec(email)
		// info("Match groups.name",match.groups.name)
		// info("Match groups.name[0] -- First Char --> Match [1]",match.groups.name[0])
		
		// info("Match groups.domain",match.groups.domain)
		// info("Match groups.domain[0] -- First Char --> ",match.groups.domain[0])
		
		// let match;
		// while ((match = regex.exec(email)) !== null) {
		// 	// This is necessary to avoid infinite loops with zero-width matches
		// 	if (match.index === regex.lastIndex) regex.lastIndex++;
		// 	// The result can be accessed through the `m`-variable.
		// 	match.forEach((match, groupIndex) => console.log(`Found match, group ${groupIndex}: ${match}`) );
		// }	
			
		let obscureEmail = `${match.groups.name[0]}***@${match.groups.domain[0]}***}`
		// info("obscureEmail", obscureEmail)
	
	return EmailConfirmationMessage.value = `Your code is on the way. To confirm your email address change, enter the code we emailed to \n${obscureEmail} \nThis may take a minuet to arrive.`
	// return rtn

}



/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const setEmailConfirmed = async function () {
	info("setConfirmed", confirmCodeModel.valueOf )

	await Auth.verifyCurrentUserAttributeSubmit('email', `${confirmCodeModel.value}`)
		.then((response) => {
			console.log('email verified');
			toggleConfirm.value = false
			confirmCodeModel.value = null
			emailModel.value = workingEmailModel.value

		})
		.catch((e) => {
			console.log('failed with error', e);
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
	if(!results.valid)
		// 		Cancel Submission if validation FAILED
		return

	////
	//				If we get here, Validation succeded

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
			// enter("Hub.listen: auto Sign In")
			// exit("Hub.listen: auto Sign In")
			return

		case "confirmSignUp" :
			// enter("Hub.listen: confirm Sign Up")
			// exit("Hub.listen: confirm Sign Up")
			return

		case "autoSignIn" :
			// enter("Hub.listen: auto Sign In")
			// exit("Hub.listen: auto Sign In")
			return

		case "signIn" :
			// enter("Hub.listen: signIn")
			getSession()
			// exit("Hub.listen: sign In")
			return

		case "signOut" :
			// enter("Hub.listen: sign Out")
			// exit("Hub.listen: sign Out")
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