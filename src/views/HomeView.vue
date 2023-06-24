<template>
	<v-app>
		<MasterLayout>
			<h1 class="text-primary">Home Page Content</h1>
			<hr class="mb-10">

			<v-row v-if="route === 'authenticated'" justify="center">
				<v-spacer/>
				<v-col cols="8">
					<v-divider :thickness="10" class="ma-2"></v-divider>
					<v-row no-gutters>
						<v-col style="background-color: rgb(var(--v-theme-surface));"><p>Nick Name:</p></v-col>
						<v-col><p>{{ nicknameModel }}</p></v-col>
					</v-row>
							
					<v-divider :thickness="3" />
					<v-row no-gutters style="background-color:rgb(var(--v-theme-surface));"><p class="ma-auto">Email:</p></v-row>
					<v-row no-gutters><p class="ma-auto">{{ emailModel }}</p></v-row>
					
					<v-divider :thickness="3" />
					<v-row no-gutters style="background-color: rgb(var(--v-theme-surface));"><p class="ma-auto">Phone Number:</p></v-row>
					<v-row no-gutters ><p class="ma-auto">{{ phone_numberModel }}</p></v-row>
					
					<v-divider :thickness="3" />
					
					
					
					<v-row no-gutters style="background-color: rgb(var(--v-theme-surface));"><p class="ma-auto">User Name:</p></v-row>
					<v-row no-gutters ><p class="ma-auto">{{ usernameModel }}</p></v-row>



					<v-divider :thickness="10"></v-divider>
				</v-col>
				<v-spacer/>
			</v-row>
			<v-row no-gutters >
				<v-spacer></v-spacer>
				<v-col cols="8">
					<!-- <v-divider :thickness="10"></v-divider> -->
					<authenticator :services="services" initialState="signUp" :formFields="formFields" >
						<template v-slot:sign-up-fields>
							<authenticator-sign-up-form-fields />
							<p style="margin-bottom:-.75em;">Phone number</p>
							<v-text-field 
								class="signup-nickname"
								:rules="[ /* Phone Number Validation */ ]"
								placeholder="( optional )"
								name="phone_number"
								hint="Short & Simple" variant="outlined" density="compact" v-model="workingPhone_numberModel" >
							</v-text-field>
							<p style="margin-bottom:-.75em;">Nickname</p>
							<v-text-field 
								class="signup-nickname"
								:rules="[	value => checkReservedNickname(value), 
													value => checkShortNickname(value),
													value => checkFirstChar(value),
													value => checkSpecialChars(value)]"
								placeholder="( optional )"
								name="nickname"
								hint="Short & Simple" variant="outlined" density="compact" v-model="workingNicknameModel" >
							</v-text-field>
						</template>
					</authenticator>
				</v-col>
				<v-spacer></v-spacer>
			</v-row>
			<v-row no-gutters >
				<v-spacer></v-spacer>
				<v-col cols="8">
					<div v-if="route === 'authenticated'">
						<v-btn class="mt-3" v-if="route === 'authenticated'" color="primary" @click="signOut">Sign Out</v-btn>
					</div>
					<!-- <ThemeChanger /> -->
				</v-col>
				<v-spacer></v-spacer>
			</v-row>
		
		</MasterLayout>
	</v-app>
</template>

<script setup lang="ts">
import MasterLayout from "../layouts/MasterLayout.vue";
import { toRefs, ref, Ref, computed } from 'vue'
				/*  */
import { info, infor , infog, infob, infoy, infoo, infop, infom,
			info1, info2 , info3, info4, info5, info6, info7,
			log, warn, err , progress, joy, enter, exit,
			success, bar, whitebar, fini, start, pass, fail }
	from "../my-util-code/MyConsoleUtil"
				/*  */
import ThemeChanger from "../components/ThemeChanger.vue";
				/*  */
import { AuthenticatorSignUpFormFields, SignIn, useAuthenticator, AmplifyCheckBox, translations} from '@aws-amplify/ui-vue';
import { Amplify, Auth, Hub, I18n } from 'aws-amplify';
import awsconfig from '../aws-exports';
import "@aws-amplify/ui-vue/styles.css";

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
import * as AWS from "@aws-sdk/client-cognito-identity-provider";
import { registerLayouts } from "../layouts/register";
import router from "../router";

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
I18n.putVocabularies(translations)
I18n.setLanguage('en')
I18n.putVocabulariesForLanguage('en', {
  'Create Account': 'Sign Up', // Tab header
});

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
Amplify.configure(awsconfig);

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const { route, user, signOut, validationErrors } = toRefs(useAuthenticator());
const formFields = {
	signUp: {
		// username: { order: 1},
		password: { order: 2 }, 
		confirm_password: { order: 3 },
		email: { order: 4 },
		//phone_number: { order: 5 }
		// nickname: { order:4 }
	},
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const services = {
	async validateCustomSignUp(formData) {
						// start("Enter validateCustomSignUp()")
						// info("formData", formData)

		//				Disabled Temporary
		// ... if (!formData.acknowledgement) { return { acknowledgement: "You must agree: Resistence is Futile" } }
		if (formData.nickname) {
			//				This is going to return an ValidationError string 
			//				--OR-- a "passed validation" boolean true.
			let nicknameValidationRtn = await Promise.all( [
						checkReservedNickname(formData.nickname),
						checkShortNickname(formData.nickname),
						checkSpecialChars (formData.nickname),
					]).then (resultArray => {
						// This return exists to await Promise.all()
						return checkValidationResults(resultArray)
			} )
			//			At this point we have a validation error message "string" == fail
			//			--OR-- a validation passed "boolean".
			if(typeof nicknameValidationRtn == 'boolean') {
				//			Update the nicknameModel
				// nicknameModel.value = formData.myNickname
				nicknameModel.value = formData.nickname
			} else {
				return nicknameValidationRtn
			}
		}
	},
};

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
function checkValidationResults(resultsArray) {
						// enter("checkValidationResults")

		for(let i = 0; i <= resultsArray.length; i++) {
			if (typeof resultsArray[i] == 'string'){
				// This return exits the '.then'
				return resultsArray[i]
			}
		}
		return true
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
async function submitNickname(event) {

		const results = await event
		if(!results.valid) return
		
		// This will return the user in the user pool (not updated )
		const newuser = await Auth.currentAuthenticatedUser({bypassCache: true /* false */});
		await Auth.updateUserAttributes(newuser, {'nickname': workingNicknameModel.value })
		await Auth.currentUserInfo().then(result => {
			nicknameModel.value = result.attributes.nickname
		}) // END_THEN

		//				Redirect to Profile page.
		//				Pass the new nickname and the email-address
		router.push({name:`profile`, params: {
		 				p1:nicknameModel.value, 
						p2:emailModel.value, 
						p3:phone_numberModel.value,
						p4:usernameModel.value
		}  }) 
}	
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
		// Check the format
		if(match) {
			return 'User nickname can not contain special characters. Please try another one.'
		}
		return true
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
Hub.listen('auth', (data) => {
		switch(data.payload.event) {
			// case "signUp" :
			// case "confirmSignUp" :
			// case "autoSignIn" :
			/* First Sign In (Sign Up workflow) */
			case "signIn" :
				// Does the nicknameModel exist?
				if (!!nicknameModel.value.length) { 
					//
					// 			If we get here, the nicknameModel exists.
					//				This only happens during the SignUp work flow.
					UpdateNickname(nicknameModel) 
					/* const results = */ Auth.currentAuthenticatedUser({bypassCache: true /* false */})
					// .then(results => { 
						// emailModel.value = results.attributes.email
						// nicknameModel.value =  data.payload.data.attributes.nickname
						// phone_numberModel.value = data.payload.data.attributes.phone_number
						// usernameModel.value = data.payload.data.username

						// return {
						// 	// emailModel, 
						// 	"email": data.payload.data.attributes.email,
						// 	// nicknameModel, 
						// 	"nickname": data.payload.data.attributes.nickname,
						// 	// phone_numberModel, 
						// 	"phone_number": data.payload.data.attributes.phone_number,
						// 	// usernameModel
						// 	"username" : data.payload.data.username,
						// }
					// })
					
					// info("results",results)

					info("data.payload.data", data.payload.data)

					emailModel.value = data.payload.data.attributes.email
					nicknameModel.value = data.payload.data.attributes.nickname
					phone_numberModel.value = data.payload.data.attributes.phone_number
					usernameModel.value = data.payload.data.username
					
					info2("emailModel.value",emailModel.value)
					info3("nicknameModel.value",nicknameModel.value)
					info4("phone_numberModel.value",phone_numberModel.value)
					info5("usernameModel.value",usernameModel.value)

					info("router.push to Profile")
					router.push({name:`profile`, params: {
									p1:nicknameModel.value, 
									p2:emailModel.value,
									p3:phone_numberModel.value,
									p4:usernameModel.value
								}  }) 
				}

				/* Normal SignIn */
				Auth.currentAuthenticatedUser({bypassCache: true /* false */}).then(results => {
									info7("Enter Normal Sign In")
									info("results", data.payload.data) 
					emailModel.value = results.attributes.email
					workingNicknameModel.value =  data.payload.data.attributes.nickname
					nicknameModel.value =  data.payload.data.attributes.nickname
					phone_numberModel.value = data.payload.data.attributes.phone_number

									info(data.payload.data.attributes.preferred_username )
									info(data.payload.data.username )


					usernameModel.value = data.payload.data.attributes.preferred_username 
							? data.payload.data.attributes.preferred_username 
							: data.payload.data.username
				})
				return
			case "signOut" :
				workingNicknameModel.value = nicknameModel.value = ""
				return
			} // END_SWITCH
})
						
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
async function UpdateNickname(nicknameModel){
					// enter("UpdateNickname")
		//
		// 			This will return the user in the user pool (not updated )
		const newuser = await Auth.currentAuthenticatedUser({bypassCache: true /* false */});
		await Auth.updateUserAttributes(newuser, {'nickname': nicknameModel.value })
		await Auth.currentUserInfo().then(result => {
			nicknameModel.value = result.attributes.nickname
			workingNicknameModel.value = result.attributes.nickname
		}) // END_THEN

}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const cognitoIdentityProviderClient = new AWS.CognitoIdentityProviderClient({
		region: awsconfig.aws_cognito_region,
		credentials: {
			accessKeyId : import.meta.env.VITE_AWS_ACCESS_KEY_ID, 
			secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY} 
	});

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
async function getNickEmailPhone(){
			// enter("getNickEmailPhone")
		

	const cognitoAccessToken = await Auth.currentSession()
			.then(currenSession => {return currenSession.getAccessToken().getJwtToken()}).catch(err => { return err})
	if (cognitoAccessToken === "No current user") { 
		return ""
	}
	const getUserRequestInput = new class GetUserRequestInput implements GetUserRequest { AccessToken: string | undefined = ""}
	getUserRequestInput.AccessToken = cognitoAccessToken	
	const getUserCommand = new GetUserCommand(getUserRequestInput);	
	const getUserCommandOutput = await cognitoIdentityProviderClient.send(getUserCommand);
	//				Update the Model based on the GetUserCommandOutput
	let nickname = getUserCommandOutput.UserAttributes?.find(e => e.Name === "nickname")?.Value
	if(nickname) nicknameModel.value = nickname

	let email = getUserCommandOutput.UserAttributes?.find(e => e.Name === "email")?.Value
	if (email) emailModel.value = email

	let phone = getUserCommandOutput.UserAttributes?.find(e => e.Name === "phone_number")?.Value
	if (phone) phone_numberModel.value = phone


					info("getNicknameEmailPhone(~)")
					info("getNicknameEmailPhone(~)",  getUserCommandOutput.Username)
					info("getNicknameEmailPhone(~).UserAttributes",  getUserCommandOutput.UserAttributes)
	

		let user = getUserCommandOutput.Username
		if (user) usernameModel.value = getUserCommandOutput.Username

		let preferred_username = getUserCommandOutput.UserAttributes?.find(e => e.Name === "preferred_username")?.Value
		if (preferred_username) usernameModel.value = preferred_username



				info(`${nicknameModel.value}, ${emailModel.value}, ${phone_numberModel.value}, ${user}`)
	return {nicknameModel, emailModel, phone_numberModel, user}
};

const usernameModel = ref("")
const phone_numberModel = ref("")
const workingPhone_numberModel = ref("")
const workingNicknameModel = ref("")
const nicknameModel = ref("")
const emailModel = ref("")
const resetNickname = () => { workingNicknameModel.value = nicknameModel.value }

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
// getNicknameEmail().then((result:""|{nicknameModel:Ref<string>,emailModel:Ref<string>}) => { 
getNickEmailPhone().then( (result: ""| {
			nicknameModel:Ref<string>,
			emailModel:Ref<string>,
			phone_numberModel:Ref<string>, }) => { 
	nicknameModel.value = nicknameModel.value
	workingNicknameModel.value = nicknameModel.value
	emailModel.value = emailModel.value
	phone_numberModel.value = phone_numberModel.value
	//... usernameModel.value =  usernameModel.value
	return result
})
</script>

<style>
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
	.v-input { margin-top: 2px;}
	.signup-nickname input {text-align: center;}
	
</style>