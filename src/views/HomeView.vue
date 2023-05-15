<template>
	<v-app>
		<MasterLayout>
			<h1 class="text-primary">Home Page Content</h1>
			<hr class="mb-10">

			<v-row justify="center">
				<v-col cols="6"> <!-- START Column ONE -->
					
				<!-- START Status -->
					<!-- <v-row class="my-0 py-0" justify="center" v-if="route === 'authenticated'">
						<v-col cols="3" class="text-right my-0 py-0"> Nick Name </v-col>
						<v-col cols="5" class="text-left my-0 py-0"> {{ user.attributes.nickname }} </v-col>
					</v-row>

					<v-row class="my-0 py-0" justify="center">
						<v-col cols="3" class="text-right my-0 py-0"> Phone </v-col>
						<v-col cols="5" class="text-left my-0 py-0"> {{ phoneNumber }} </v-col>
					</v-row>

					<v-row class="my-0 py-0" justify="center">
						<v-col cols="3" class="text-right my-0 py-0">Theme (def)</v-col>
						<v-col cols="5" class="text-left my-0 py-0"> {{ themeDefault }} </v-col>
					</v-row>

					<v-row class="my-0 py-0" justify="center">
						<v-col cols="3" class="text-right my-0 py-0"> Theme (alt) </v-col>
						<v-col cols="5" class="text-left my-0 py-0"> {{ themeAlt }} </v-col>
					</v-row> -->
				<!-- END Status -->

				<!-- START Forms -->

					<!-- {{ user.pool }} -->

					<v-form :disabled="route !== 'authenticated'"
								class="w-50 mx-auto mt-10" validate-on="submit" @submit.prevent="" >
						<v-row>
							<v-text-field label="Nickname" hint="Short & Simple" variant="outlined" density="compact" v-model="nickName" :rules="[]" />
						</v-row>
						<v-row class="justify-end">
							<v-btn :disabled="route !== 'authenticated'" color="surface" size="large" @click="resetNickname"> Cancel </v-btn>
							<v-btn :disabled="route !== 'authenticated'" class="ml-2" color="primary" size="large" type="submit"> Save </v-btn>
						</v-row>
					</v-form>



<!-- 
					<v-form class="w-50 mx-auto mt-10" validate-on="submit" @submit.prevent="" >
						<v-row>
							<v-text-field label="Phone Number" hint="Short & Simple" variant="outlined" density="compact" v-model="phoneNumber" :rules="[]" />
						</v-row>
						<v-row class="justify-end">
							<v-btn color="surface" size="large" @click="resetPhoneNumber"> Cancel </v-btn>
							<v-btn class="ml-2" color="primary" size="large" type="submit"> Save </v-btn>
						</v-row>
					</v-form>

					<v-form class="w-50 mx-auto mt-10" validate-on="submit" @submit.prevent="" >
						<v-row>
							<v-text-field label="Theme <default>" hint="Theme loaded automatically" variant="outlined" density="compact" v-model="themeDefault" :rules="[]" />
						</v-row>
						<v-row class="justify-end">
							<v-btn color="surface" size="large" @click="resetThemeDefault"> Cancel </v-btn>
							<v-btn class="ml-2" color="primary" size="large" type="submit"> Save </v-btn>
						</v-row>
					</v-form>

					<v-form class="w-50 mx-auto mt-10" validate-on="submit" @submit.prevent="" >
						<v-row>
							<v-text-field label="Theme <alternate>" hint="Alterate Theme" variant="outlined" density="compact" v-model="themeAlt" :rules="[]" />
						</v-row>
						<v-row class="justify-end">
							<v-btn color="surface" size="large" @click="resetThemeAlt"> Cancel </v-btn>
							<v-btn class="ml-2" color="primary" size="large" type="submit"> Save </v-btn>
						</v-row>
					</v-form> -->
				<!-- END Forms -->


					<v-row class="justify-end">
						<v-col cols="7" class="mr-3 mt-5">
							<v-btn color=secondary @click="GetTest"> 
								TEST 
							</v-btn></v-col></v-row>



				</v-col> <!-- END Column ONE -->

				<v-col cols="6"> <!-- START Column TWO -->
					<v-container class="text-center">
						<!-- <h4 class="text-secondary">kevinbowe1957+53a@gmail.com&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp Kranky -
							53 A </h4>
						<hr>
						<h4 class="text-primary">kevinbowe1957+53b@gmail.com&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp DaBowe - 53
							B </h4>
						<hr>
						<h4 class="text-error">kevinbowe1957+511a@gmail.com&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp Mista Bo - 511 A
						</h4>
						<hr>
						<h4 class="text-primary">kevinbowe1957+511b@gmail.com&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp ??</h4>
						<hr>
						<h4 class="text-secondary">kevinbowe1957+53c@gmail.com&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp ??</h4>
						<hr>
						<h4 class="text-error">kevinbowe1957+53d@mail.com &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp ??</h4>
						<hr>
						<h4 class="text-primary">kevinbowe1957+53e@gmail.com &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp ??</h4> 
						<hr> -->
						<h4 class="text-grey">kevinbowe1957+511a@gmail.com &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp Mista Bo - 511 A </h4>
						<hr>
						<h4 class="text-grey">kevinbowe1957+511b@gmail.com &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp Double Bo 2 Go - 511 B </h4>
						<hr>
						<h3 class="text-grey">kevinbowe1957+512a@gmail.com &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp DaBowe - 512 A </h3>
					</v-container>

					<authenticator initialState="signIn" :formFields="formFields" :signUpAttributes="['email', 'nickname']">
						<template v-slot:sign-up-fields>
							<authenticator-sign-up-form-fields />
						</template>
					</authenticator>

					<div v-if="route === 'authenticated'">
						<h1>Hello {{ user.attributes.nickname }} !</h1>
						<div>Email == {{ user.attributes.email }}</div>
						<div>NickName == {{ user.attributes.nickname }}</div>
						<v-btn v-if="route === 'authenticated'" color="primary" @click="signOut">Sign Out</v-btn>
					</div>

					<ThemeChanger />

				</v-col> <!-- END Column TWO -->
			</v-row>
		</MasterLayout>
	</v-app>
</template>

<script setup lang="ts">
import MasterLayout from "../layouts/MasterLayout.vue";
import { toRefs, ref, Ref, computed } from 'vue'
				//////
import  { log, warn, err , progress, joy, info, enter,
			exit, success, bar, whitebar, fini, start, pass, fail }
	from "../my-util-code/MyConsoleUtil"
import ThemeChanger from "../components/ThemeChanger.vue";
				//////
import { AuthenticatorSignUpFormFields, useAuthenticator } from '@aws-amplify/ui-vue';
import { Amplify, Auth } from 'aws-amplify';
				//	NOTE: aws-exports.js had to be renamed to aws-exports.ts
import awsconfig from '../aws-exports';
import "@aws-amplify/ui-vue/styles.css";

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
import { 
	AdminGetUserCommand, 
	CognitoIdentityProviderClient, 
	AddCustomAttributesCommand, 
	AwsCredentialIdentity
} from "@aws-sdk/client-cognito-identity-provider";

// import { createClientForDefaultRegion } from "../../libs/utils/util-aws-sdk.js";
// import { Config, CognitoIdentityCredentials } from "@aws-sdk";

import { CognitoUser, CognitoUserPool, AuthenticationDetails, CognitoUserAttribute, } from "amazon-cognito-identity-js";

// This is the arn (Amazon Resource Name)
// 	arn:aws:cognito-idp:us-east-1:716677688107:userpool/us-east-1_FrbKYTqmg
	/* 	Keywords	==	arn:aws:
			Service === cognito-idp:
			Region ====	us-east-1:
			AWS Account ID === 716677688107:
			Resource-type == userpool/
			Resource-ID ==== us-east-1_FrbKYTqmg		*/
	
let cConfig = {
	// IAM > IAM Identity Center > Settings > Details > Regiom
	region: "us-east-1", // 
	// 2 Parts: Region ========== AWS-Home > Region(us-east-1 | N.Virginia)
	//				AWS Account Id == AWS-Home > Account Name(KB Experiemnt) > Account ID
	IdentityPoolId: "us-east-1:716677688107", //
	// AWS Cognito > User pools > User pool ID
	UserPoolId: "us-east-1_FrbKYTqmg", //
	// Cognito > User pool > User pool name(vueawsauthrawv3ec688e6e_userpool_ec688e6e-dev)
	// 	> App integration > App client list > Client Name(vueawsec688e6e_app_webClient) > Client ID 
	ClientId: "1u6oke9flr3b35b3q8me9fn8r2" // 
}
let myUsername = "cfc00cf6-ffa8-400e-b279-c3ec9d5e5d4c"

let myCredentials = {
	// Found this in IAM > Users > Amplify-dev-4-28 > Summary > Access key 1 || Also in Tags
	accessKeyId : "AKIA2NXKRVMVZ5GXPS5R", 

	// Created in AIM > Amplify-dev-4-28 > Security credentials > Access keys > Create access key 
	// also here -- ~/Documents/aws-dev access keys.txt
	secretAccessKey: "5LtAOgl+WggUJUef90KLy1wqWYaXzAsDevPOmA7u"  
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
Amplify.configure(awsconfig);

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const { route, user, signOut } = toRefs(useAuthenticator());
const formFields = {
	signUp: {
		nickname: { order: 1 }, email: { order: 2 },
		password: { order: 3 }, confirm_password: { order: 4 }
	},
}
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const eMail:Ref<string> = ref("")


const nickNameX:Ref<string> = ref("Mr Kranky -- placehold")

					async function GetTest() {

						const currentUserSession /* user */ = await Auth.currentAuthenticatedUser()//.then(rtn => { info(rtn); return rtn});
						info(currentUserSession.attributes.nickname)
						info(currentUserSession.attributes.email)
						info("(username/sub) == ", currentUserSession.attributes.sub)
						
						const curCredentials = await Auth.currentCredentials()
						info("currentCredentials", curCredentials)

						const curSession = await Auth.currentSession()
						info("currentSession", curSession)

						const curUserCredentials = await Auth.currentUserCredentials()
						info("curUserCredentials", curUserCredentials)

						const curUserInfo = await Auth.currentUserInfo()
						info("curUserInfo", curUserInfo)
						info("curUserInfo.attributes", curUserInfo.attributes)
						info("curUserInfo.id", curUserInfo.id)
						info("curUserInfo.username", curUserInfo.username)

						const curUserPoolUser = await Auth.currentUserPoolUser()
						info("curUserPoolUser", curUserPoolUser)

						
										info("aws_cognito_identity_pool_id == ", awsconfig.aws_cognito_identity_pool_id)
										// info("aws_cognito_username_attributes[0] == ", awsconfig.aws_cognito_username_attributes[0])
										info("awsconfig.aws_user_pools_id == ", awsconfig.aws_user_pools_id)
										// info("aws_cognito_signup_attributes[0] == ", awsconfig.aws_cognito_signup_attributes[0])
										// info("aws_cognito_signup_attributes[1] == ", awsconfig.aws_cognito_signup_attributes[1])
										info("awsconfig.aws_user_pools_web_client_id == ", awsconfig.aws_user_pools_web_client_id)

						const client = new CognitoIdentityProviderClient({
							region: cConfig.region,
							credentials: {
								accessKeyId: myCredentials.accessKeyId,
								secretAccessKey: myCredentials.secretAccessKey,
							}
						});
						const input = {
							UserPoolId: cConfig.UserPoolId,
							Username: myUsername
						};
						const command = new AdminGetUserCommand(input);
						// const response = await client.send(command);
						// // log(response)
						// // log(response.UserAttributes) // nickname
						// log(response.UserAttributes[2]) // nickname
						// // log(response.UserAttributes[2].Name) // nickname
						// // log(response.UserAttributes[2].Value) // DaBowe
					}

const nickName = computed(() => {
	// info("aws_cognito_identity_pool_id == ", awsconfig.aws_cognito_identity_pool_id)
	// info("aws_cognito_username_attributes[0] == ", awsconfig.aws_cognito_username_attributes[0])
	// info("awsconfig.aws_user_pools_id == ", awsconfig.aws_user_pools_id)
	// info("aws_cognito_signup_attributes[0] == ", awsconfig.aws_cognito_signup_attributes[0])
	// info("aws_cognito_signup_attributes[1] == ", awsconfig.aws_cognito_signup_attributes[1])
	// info("awsconfig.aws_user_pools_web_client_id == ", awsconfig.aws_user_pools_web_client_id)
	let rtn:string = "Mr Kranky -- placeholder"
	if (user)	//info("TRUE -- user == ", user)
	return rtn
});


const phoneNumber:Ref<string> = ref("1 (919) 272-7866 -- placehold")
const themeDefault:Ref<string> = ref("light -- palcehold")
const themeAlt:Ref<string> = ref("dark -- placehold")
const password:Ref<string> = ref("")

const resetNickname = () => {
	return "Original Nickname"
}

const resetPhoneNumber = () => {
	return "Original Phone Number"
}

const resetThemeAlt = () => {
	return "Name of Alt Theme"
}

const resetThemeDefault = () => {
	return "Name of Alt Theme"
}

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


	.amplify-alert--error {
		/* color: black; */
		/* background-color: rgb(var(--v-theme-error)); */
	}
	.v-input { margin-top: 2px;}
</style>