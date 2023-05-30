<template>
	<v-app>
		<MasterLayout>
			<h1 class="text-primary">Home Page Content</h1>
			<hr class="mb-10">

			<v-row justify="center">

				<!-- START Column ONE -->
				<v-col cols="6">
					
					<!-- START Status -->
					nickNameModel [ {{ nicknameModel }} ]
					<br>
					workingNicknameModel [ {{ workingNicknameModel }} ]

					<v-divider :thickness="20"  class="ma-5"></v-divider>
					
					<v-row class="my-0 py-0" justify="center" v-if="route === 'authenticated'">
						user.attribute [ name | value ]
					</v-row>

					<v-row class="my-0 py-0" justify="center" v-if="route === 'authenticated'">
						<v-col cols="3" class="text-right my-0 py-0"> Nick Name </v-col>
						<v-col cols="5" class="text-left my-0 py-0"> [ {{ user.attributes.nickname }} ]</v-col>
					</v-row>
					<!-- END Status -->

					<!-- START Forms -->
					<v-form :disabled="route !== 'authenticated'" class="w-50 mx-auto mt-10" validate-on="submit" @submit.prevent="submitNickname" >
						<v-row>
							<v-text-field :rules="[	value => checkReservedNickname(value), 
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
					<!-- END Forms -->

					<!-- Experiment -->
					<!-- <v-row class="justify-end"><v-col cols="7" class="mr-3 mt-5"><v-btn color=secondary 
						@click="getNickName"> TEST </v-btn></v-col></v-row> -->

				</v-col> 
				<!-- END Column ONE -->	
				<!-- START Column TWO -->
				<v-col cols="6"> 
					<v-container style="text-align:start;">
						<v-row>
							<v-col cols="6">
							</v-col>
							<v-col cols="6">
							</v-col>
						</v-row>
					</v-container>

					<!-- <authenticator :services="services" initialState="signUp" :formFields="formFields" :signUpAttributes="['email']"> -->
					<authenticator :services="services" initialState="signUp" :formFields="formFields" :signUpAttributes="['email, preferred_username']">

						<template v-slot:sign-up-fields>
							<authenticator-sign-up-form-fields />


							<p style="margin-bottom:-.75em;">Preferred Username</p>
							<v-text-field 
									class="signup-nickname"
									placeholder="required"
									name="my Preferred Username"
									hint="Short & Simple" variant="outlined" density="compact" v-model="workingPreferredUsernameModel" >
								</v-text-field>





							<p style="margin-bottom:-.75em;">Nickname</p>
							<v-text-field 
									ZZZid="signup-nickname-id"
									class="signup-nickname"
									:rules="[	value => checkReservedNickname(value), 
															value => checkShortNickname(value),
															value => checkFirstChar(value),
															value => checkSpecialChars(value)]"
									placeholder="( optional )"
									name="myNickname"
									hint="Short & Simple" variant="outlined" density="compact" v-model="workingNicknameModel" >
								</v-text-field>


							<v-row>
								<v-col cols="9"><AmplifyCheckBox/></v-col>
								<v-col><a href="/tandc">Read Here</a></v-col>
							</v-row>
						</template>

					</authenticator>



					<div v-if="route === 'authenticated'">
						<v-divider :thickness="20"  class="ma-2"></v-divider>
						
						<v-row>
							<v-col cols="4" style="text-align:end;">
								<div>attribute.email</div>
								<div>attribute.nickname</div>
							</v-col>
						
							<v-col cols="6" style="text-align:start;">
								<div>{{ user.attributes.email }}</div>
								<div>{{ user.attributes.nickname }}</div>
							</v-col>
						</v-row>
						
						<v-divider :thickness="20"  class="ma-2"></v-divider>

						<v-row>
							<v-col cols="4" style="text-align:end;">
								<div>emailModel</div>
								<div>nicknameModel</div>
							</v-col>

							<v-col cols="6" style="text-align:start;">
								<div>{{ emailModel }}</div>
								<div>{{ nicknameModel }}</div>
							</v-col>
						</v-row>

						<v-divider :thickness="20"  class="ma-2"></v-divider>

						<h1>Hello {{ nicknameModel }} !</h1>

						<v-btn v-if="route === 'authenticated'" color="primary" @click="signOut">Sign Out</v-btn>
					</div>

					<ThemeChanger />

				</v-col> 
				<!-- END Column TWO -->
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
import { AdminGetUserCommand, CognitoIdentityProviderClient, GetUserCommand, GetUserRequest } 
	from "@aws-sdk/client-cognito-identity-provider";
import { registerLayouts } from "../layouts/register";
import router from "../router";

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
I18n.putVocabularies(translations)
I18n.setLanguage('en')
I18n.putVocabulariesForLanguage('en', {
  'Create Account': 'Sign Up', // Tab header
});

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const awsCredentialIdentity = {
	//				Found this in IAM > Users > Amplify-dev-4-28 > Summary > Access key 1 || Also in Tags
	accessKeyId : "AKIA2NXKRVMVZ5GXPS5R", 
	//				Created in AIM > Amplify-dev-4-28 > Security credentials > Access keys > Create access key 
	//				also here -- ~/Documents/aws-dev access keys.txt
	secretAccessKey: "5LtAOgl+WggUJUef90KLy1wqWYaXzAsDevPOmA7u"  
}
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
Amplify.configure(awsconfig);
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const { route, user, signOut, validationErrors } = toRefs(useAuthenticator());
const formFields = {
	signUp: {
		email: { order: 1 },
		password: { order: 2 }, 
		confirm_password: { order: 3 },
		// preferred_username: { order: 4}
		// nickname: { order:4 }
	},
}
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const services = {
	async validateCustomSignUp(formData) {

		start("Enter validateCustomSignUp()")
		info("formData", formData)

		

		if (!formData.acknowledgement) { return { acknowledgement: "You must agree: Resistence is Futile" } }
		if (formData.myNickname) {
			//				This is going to return an ValidationError string 
			//				--OR-- a "passed validation" boolean true.
			let nicknameValidationRtn = await Promise.all( [
						checkReservedNickname(formData.myNickname),
						checkShortNickname(formData.myNickname),
						checkSpecialChars (formData.myNickname),
					]).then (resultArray => {
						// This return exists to await Promise.all()
						return checkValidationResults(resultArray)
			} )
			//			At this point we have a validation error message "string" == fail
			//			--OR-- a validation passed "boolean".
			if(typeof nicknameValidationRtn == 'boolean') {
				//			Update the nicknameModel
				nicknameModel.value = formData.myNickname
			} else {
				return nicknameValidationRtn
			}
		}
	},
};

function checkValidationResults(resultsArray) {
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
		const newuser = await Auth.currentAuthenticatedUser();
		await Auth.updateUserAttributes(newuser, {'nickname': workingNicknameModel.value })
		await Auth.currentUserInfo().then(result => {
			nicknameModel.value = result.attributes.nickname
		}) // END_THEN

		//				Redirect to Profile page.
		//				Pass the new nickname and the email-address
		router.push({name:`profile`, params: {
						p1:nicknameModel.value, p2:emailModel.value }  }) 
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
	Hub.listen('auth', (data) => {
		switch(data.payload.event) {
			// case "signUp" :
			// case "confirmSignUp" :
			// case "autoSignIn" :
			case "signIn" :
				// Does the nicknameModel exist?
				if (!!nicknameModel.value.length) { 
					//
					// 			If we get here, the nicknameModel exists.
					//				This only happens during the SignUp work flow.
					start("Executing UpdateNicname() -- nicknameModel == ", nicknameModel.value)
					UpdateNickname(nicknameModel) 
					fini("Executing UpdateNicname() -- nicknameModel == ", nicknameModel.value)
				}

				Auth.currentAuthenticatedUser().then(results => { 
					emailModel.value = results.attributes.email
					workingNicknameModel.value =  data.payload.data.attributes.nickname
					nicknameModel.value =  data.payload.data.attributes.nickname
					//				
					// 			Redirect to the Profile page.
					router.push({path: '/profile'})
				})
				return
			case "signOut" :
				workingNicknameModel.value = nicknameModel.value = ""
				return
			} // END_SWITCH
		})
						
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
async function UpdateNickname(nicknameModel){
		//
		// 			This will return the user in the user pool (not updated )
		const newuser = await Auth.currentAuthenticatedUser();
		await Auth.updateUserAttributes(newuser, {'nickname': nicknameModel.value })
		await Auth.currentUserInfo().then(result => {
			nicknameModel.value = result.attributes.nickname
			workingNicknameModel.value = result.attributes.nickname
		}) // END_THEN

}
const cognitoIdentityProviderClient = new CognitoIdentityProviderClient({
	region: awsconfig.aws_cognito_region,
	credentials: awsCredentialIdentity
});

async function getNicknameEmail(){
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
	return {nicknameModel, emailModel}
};

const workingPreferredUsernameModel = ref("")
const preferredUsernameModel = ref("")

const workingNicknameModel = ref("")
const nicknameModel = ref("")
const emailModel = ref("")
// 			ORIGINAL
// getNicknameEmail().then((result:any) => { 
getNicknameEmail().then((result:""|{nicknameModel:Ref<string>,emailModel:Ref<string>}) => { 
	nicknameModel.value = nicknameModel.value
	workingNicknameModel.value = nicknameModel.value
	emailModel.value = emailModel.value
	return result
})

const resetNickname = () => { workingNicknameModel.value = nicknameModel.value }

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