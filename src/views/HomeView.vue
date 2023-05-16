<template>
	<v-app>
		<MasterLayout>
			<h1 class="text-primary">Home Page Content</h1>
			<hr class="mb-10">

			<v-row justify="center">

				<!-- START Column ONE -->
				<v-col cols="6">
					
					<!-- START Status -->
					<v-row class="my-0 py-0" justify="center" v-if="route === 'authenticated'">
						<v-col cols="3" class="text-right my-0 py-0"> Nick Name </v-col>
						<v-col cols="5" class="text-left my-0 py-0"> {{ user.attributes.nickname }} </v-col>
					</v-row>

					<!-- <v-row class="my-0 py-0" justify="center">
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

					<!-- <v-form class="w-50 mx-auto mt-10" validate-on="submit" @submit.prevent="" >
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
							</v-btn></v-col>
					</v-row>

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

				</v-col> 
				<!-- END Column TWO -->
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
import { AdminGetUserCommand, CognitoIdentityProviderClient, GetUserCommand, GetUserRequest } 
	from "@aws-sdk/client-cognito-identity-provider";
	
const awsCredentialIdentity = {
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

const cognitoIdentityProviderClient = new CognitoIdentityProviderClient({
	region: awsconfig.aws_cognito_region,
	credentials: awsCredentialIdentity
});

async function GetTest() {

	//			Fetch the current Cognito Session Action Token
	const cognitoAccessToken = await Auth.currentSession()
			.then(currenSession => {return currenSession.getAccessToken().getJwtToken()})
	// 		Create and instantiate a GetUserRequestInput object
	const getUserRequestInput = new class GetUserRequestInput implements GetUserRequest { AccessToken: string | undefined = ""}
	// 		Hydrate the GetUserRequestInput object with the Session datas access token
	getUserRequestInput.AccessToken = cognitoAccessToken	
	// 		Create the GetUserCommand object with the input argument "getUserRequestInput object"
	const getUserCommand = new GetUserCommand(getUserRequestInput);	
	// 		Send the GetUserCommand for execution 
	const getUserCommandOutput = await cognitoIdentityProviderClient.send(getUserCommand);
	// 		Display results object
	log("\nGetUserCommandOutput (object)\n", getUserCommandOutput)

	log("\nGetUserCommandOutput.UserAttributes (object)\n", getUserCommandOutput.UserAttributes)
	log("\nGetUserCommandOutput.UserAttrigutes.nickname (object)\n", getUserCommandOutput.UserAttributes?.find(e => e.Name === "nickname")?.Value )

}

const nickName = computed(() => { return "Mr Kranky -- placeholder" });
const phoneNumber:Ref<string> = ref("1 (919) 272-7866 -- placehold")
const themeDefault:Ref<string> = ref("light -- palcehold")
const themeAlt:Ref<string> = ref("dark -- placehold")
				//////
const resetNickname = () => { return "Original Nickname" }
const resetPhoneNumber = () => { return "Original Phone Number" }
const resetThemeAlt = () => { return "Name of Alt Theme" }
const resetThemeDefault = () => { return "Name of Alt Theme" }
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