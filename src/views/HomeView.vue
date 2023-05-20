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
					workingNicknameMode; [ {{ workingNicknameModel }} ]

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
									label="Nickname" hint="Short & Simple" variant="outlined" density="compact" v-model="workingNicknameModel"   />
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
					<v-container class="text-center">
						<h4 class="text-grey">kevinbowe1957+511a@gmail.com &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp Mista Bo - 511 A </h4>
						<hr>
						<h4 class="text-grey">kevinbowe1957+511b@gmail.com &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp Double Bo 2 Go - 511 B </h4>
						<hr>
						<h3 class="text-grey">kevinbowe1957+512a@gmail.com &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp DaBowe - 512 A </h3>
					</v-container>

					<authenticator :services="services" initialState="signIn" :formFields="formFields" :signUpAttributes="['email',/*  'nickname' *//* , 'phone_number' */ ]">

						<template v-slot:sign-up-fields>
							<authenticator-sign-up-form-fields />
							<v-row>
								<v-col cols="9"><AmplifyCheckBox/></v-col>
								<v-col><a href="/tandc">Read Here</a></v-col>
							</v-row>
						</template>
					</authenticator>

					<div v-if="route === 'authenticated'">
						<h1>Hello {{ user.attributes.nickname }} !</h1>
						<div>Email == {{ user.attributes.email }}</div>
						<div>NickName == {{ user.attributes.nickname }}</div>
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
import { AuthenticatorSignUpFormFields, SignIn, useAuthenticator, AmplifyCheckBox} from '@aws-amplify/ui-vue';
import { Amplify, Auth, Hub, } from 'aws-amplify';
import awsconfig from '../aws-exports';
import "@aws-amplify/ui-vue/styles.css";

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
import { AdminGetUserCommand, CognitoIdentityProviderClient, GetUserCommand, GetUserRequest } 
	from "@aws-sdk/client-cognito-identity-provider";
import { registerLayouts } from "../layouts/register";

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
// const { route, user, signOut } = toRefs(useAuthenticator());
const { route, user, signOut, validationErrors } = toRefs(useAuthenticator());
const formFields = {
	signUp: {
		/* phone_numner: { order: 1 }, */
		/*	nickname: { order: 2 },  */
		email: { order: 3 },
		password: { order: 4 }, 
		confirm_password: { order: 5 },
	},
}
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const services = {
  async validateCustomSignUp(formData) {
	info("Enter validateCustomSignUp()")
    if (!formData.acknowledgement) {
      return {
        acknowledgement: "You must agree: Resistence is Futile",
      };
		
    }
  },
};
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

async function submitNickname(event) {
	const results = await event
	if(!results.valid) return
				/*  */
	const user = await Auth.currentAuthenticatedUser();
	await Auth.updateUserAttributes(user, { 'nickname': workingNicknameModel.value });
	nicknameModel.value = workingNicknameModel.value
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
		case "signIn" :
			// 			The payload.data will contain all of the Attributes.
			// 			The payload.data.pool will include [ clientId | userPoolId ]
			// 			The payload.data.signInUserSession will include a accessToken	
			//
			//				getNickname() may be un-necessary if we have access to all of the user attrubutes
			/* getNickname() // Required ? Leave for Debug */

			nicknameModel.value = workingNicknameModel.value =  data.payload.data.attributes.nickname
			return
		
		case "signOut" : 
			workingNicknameModel.value = nicknameModel.value = ""
			return
	} // END_SWITCH
})

// const cognitoIdentityProviderClient = new CognitoIdentityProviderClient({
// 	region: awsconfig.aws_cognito_region,
// 	credentials: awsCredentialIdentity
// });

// async function getNickname(){
// 	const cognitoAccessToken = await Auth.currentSession()
// 			.then(currenSession => {return currenSession.getAccessToken().getJwtToken()}).catch(err => { return err})
// 	if (cognitoAccessToken === "No current user") { 
// 		return ""
// 	}
// 	const getUserRequestInput = new class GetUserRequestInput implements GetUserRequest { AccessToken: string | undefined = ""}
// 	getUserRequestInput.AccessToken = cognitoAccessToken	
// 	const getUserCommand = new GetUserCommand(getUserRequestInput);	
// 	const getUserCommandOutput = await cognitoIdentityProviderClient.send(getUserCommand);
// 	//				Update the Model based on the GetUserCommandOutput
// 	const temp = nicknameModel.value = getUserCommandOutput.UserAttributes?.find(e => e.Name === "nickname")?.Value
// 	//... return temp
// };
				
const workingNicknameModel = ref("")
const nicknameModel = ref("")
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
</style>