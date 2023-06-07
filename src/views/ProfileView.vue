<template>
	<v-app>
		<MasterLayout>
			<v-container class="text-center">
				<h1 class="text-primary">Profile Page Content.</h1>

				<v-row v-if="route === 'authenticated'">

					<v-spacer/>
					<v-col cols="8">
						<v-divider :thickness="10" __class="ma-2"></v-divider>

						<!-- START Forms -->
						<!-- Nickname -->
						<v-form :disabled="route !== 'authenticated'" class="w-50 mx-auto mt-10" validate-on="submit" @submit.prevent="submitNickname" >
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
						</v-form>

						<!-- Phone Number -->
						<p class="mt-5">+1 (919) 272-7866</p>
						1 000 111 0000<br>
						7 000 111 0000<br>
						53 000 111 0000<br>
						591 000 111 0000<br>
						<v-form :disabled="route !== 'authenticated'" class="w-50 mx-auto mt-10" validate-on="submit" @submit.prevent="submitPhone_number" >
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

				<!-- Mobile -->
				<v-row class="d-sm-none" v-if="route !== 'authenticated'" >
					<v-col>
						<Authenticator>
						</Authenticator>
					</v-col>
				</v-row>

				<!-- Desktop -->
				<v-row align="center" class="d-none d-sm-flex" style="height: 50em;"
						v-if="route !== 'authenticated'" >
					<v-col>
						<Authenticator>
						</Authenticator>
					</v-col>
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
	info, infor, infog, infob, infoy, infoo, infop, infom,
	info1, info2, info3, info4, info5, info6, info7,
	log, warn, err, progress, joy, enter, exit,
	success, bar, whitebar, greybar, fini, start, pass, fail, err2, pause, resume
} from "../my-util-code/MyConsoleUtil"

import { toRefs, ref, } from 'vue'
import { Authenticator } from "@aws-amplify/ui-vue";
import "@aws-amplify/ui-vue/styles.css";

const { route, } = toRefs(useAuthenticator());

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const props = defineProps({
	p1: { type: String },
	p2: { type: String },
	p3: { type: String }
})

const nicknameModel = ref(props.p1)
const workingNicknameModel = ref("")
const resetNickname = () => { workingNicknameModel.value = nicknameModel.value }

const emailModel = ref(props.p2)

const phone_numberModel = ref(props.p3)
const workingPhone_numberModel = ref("")
const resetPhone_number = () => { workingPhone_numberModel.value = phone_numberModel.value }

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
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
	const newuser = await Auth.currentAuthenticatedUser();
	await Auth.updateUserAttributes(newuser, {'phone_number': strippedPhone_number.value })
	await Auth.currentUserInfo().then(result => {
		phone_numberModel.value = result.attributes.phone_number
	})
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
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
async function submitNickname(event) {
		const results = await event
		if(!results.valid) return
		//				This will return the user in the user pool (not updated )
		const newuser = await Auth.currentAuthenticatedUser();
		await Auth.updateUserAttributes(newuser, {'nickname': workingNicknameModel.value })
		await Auth.currentUserInfo().then(result => {
			nicknameModel.value = result.attributes.nickname
		})
}
	
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
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
			enter("Hub.listen: auto Sign In")
			exit("Hub.listen: auto Sign In")
			return

		case "confirmSignUp" :
			enter("Hub.listen: confirm Sign Up")
			exit("Hub.listen: confirm Sign Up")
			return

		case "autoSignIn" :
			enter("Hub.listen: auto Sign In")
			exit("Hub.listen: auto Sign In")
			return

		case "signIn" :
			enter("Hub.listen: signIn")
			getSession()
			exit("Hub.listen: sign In")
			return

		case "signOut" :
			enter("Hub.listen: sign Out")
			exit("Hub.listen: sign Out")
			return
	} // 			END_SWITCH
})

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
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
		let session = await Auth.currentAuthenticatedUser({bypassCache: false})
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

</style>