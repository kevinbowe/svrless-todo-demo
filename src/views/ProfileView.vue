
<template>
	<v-app>
		<MasterLayout>
			<v-container class="text-center">
				<h1 class="text-primary">Profile Page Content.</h1>
				<v-row v-if="route === 'authenticated'">
					<v-spacer></v-spacer>
					<v-col cols="6">
						<v-divider :thickness="20" class="ma-2"></v-divider>

						<h1>Passed Properties</h1>
						<v-row>
							<v-col cols="6" style="text-align:end;">
								<h2>nicknameModel</h2>
								<h2>emailModel</h2>
								<h2>phone_numberModel</h2>
							</v-col>

							<v-divider vertical :thickness="6" class="my-2" />
							
							<v-col cols="4" style="text-align:start;">
								<h2>{{ nicknameModel }}</h2>
								<h2>{{ emailModel }}</h2>
								<h2>{{ phone_numberModel }}</h2>

							</v-col>
						</v-row>

						<v-divider :thickness="20" class="ma-2"></v-divider>

						<h1>Hello {{ nicknameModel }} !</h1>

						
					</v-col>
					<v-spacer></v-spacer>
				</v-row>
				
				<div v-if="route !== 'authenticated'">
					<Authenticator>
						<!-- 
							I need to suppress the Su tab
							Only display the Si tab 
						-->
					</Authenticator>
				</div>	
				

			</v-container>
		</MasterLayout>
	</v-app>
</template>


<script lang="ts" setup>
import MasterLayout from "../layouts/MasterLayout.vue";
import { Auth, Hub } from 'aws-amplify';
import { GetUserCommand, GetUserRequest, CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";
import awsconfig from '../aws-exports';
import { AuthenticatorSignUpFormFields, SignIn, useAuthenticator, AmplifyCheckBox, translations} from '@aws-amplify/ui-vue';

/*  */
import {
	info, infor, infog, infob, infoy, infoo, infop, infom,
	info1, info2, info3, info4, info5, info6, info7,
	log, warn, err, progress, joy, enter, exit,
	success, bar, whitebar, fini, start, pass, fail, err2
} from "../my-util-code/MyConsoleUtil"

import { toRefs, ref, Ref, computed } from 'vue'
import router from "../router";
import { Authenticator } from "@aws-amplify/ui-vue";

const { route, user, signOut, validationErrors } = toRefs(useAuthenticator());

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const awsCredentialIdentity = {
	//				Found this in IAM > Users > Amplify-dev-4-28 > Summary > Access key 1 || Also in Tags
	accessKeyId : "AKIA2NXKRVMVZ5GXPS5R", 
	//				Created in AIM > Amplify-dev-4-28 > Security credentials > Access keys > Create access key 
	//				also here -- ~/Documents/aws-dev access keys.txt
	secretAccessKey: "5LtAOgl+WggUJUef90KLy1wqWYaXzAsDevPOmA7u"  
}

const cognitoIdentityProviderClient = new CognitoIdentityProviderClient({
	region: awsconfig.aws_cognito_region,
	credentials: awsCredentialIdentity
});

const props = defineProps({
	p1: { type: String },
	p2: { type: String },
	p3: { type: String }
})

const nicknameModel = ref(props.p1)
const emailModel = ref(props.p2)
const phone_numberModel = ref(props.p3)

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
Hub.listen('auth', (data) => {
	// enter("PROFILE -- Hub.listen")
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
						exit("Hub.listen: sign In")
						
						return
						case "signOut" :
							enter("Hub.listen: sign Out")
							exit("Hub.listen: sign Out")
							
							return
						} // END_SWITCH
						// exit("PROFILE -- Hub.listen")
						
					})
					

	/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
	bar()
	start("ProfileView.vue <script setup>")
					
	/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
	//				This DEFINES getNickEmailPhone function
	async function getNickEmailPhone(){
		// enter("getNickEmailPhone")
		
		const cognitoAccessToken = await Auth.currentSession()
		.then(currenSession => {return currenSession.getAccessToken().getJwtToken()}).catch(err => { return err})
		if (cognitoAccessToken === "No current user") { 
			// info("No current user -- Please sign in")
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
		
		return {nicknameModel, emailModel, phone_numberModel}
	};
	let areParamsEmpty = function() {
		let v = Object.values(props)
		let o = v.find(e => e.length === 0)
		// IF no match: return undefined ELSE return string
		// info("typeof Find Results", typeof o)
		return typeof o !== undefined
	}
	let areModelsEmpty = function(){
		// info4("nicknameModel.value?.length",nicknameModel.value?.length)
		// info5("emailModel.value?.length",emailModel.value?.length)
		// info6("phone_numberModel.value?.length",phone_numberModel.value?.length)
		return nicknameModel.value?.length === 0 ||
		emailModel.value?.length === 0 ||
		phone_numberModel.value?.length === 0
	}
	/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
	// if(areParamsEmpty() || areModelsEmpty()) {
		
		// 	//				I need to check for not being signed in and reporting it to the UI
		// 	getNickEmailPhone().then( (result: ""| { 
			// 		nicknameModel:Ref<string|undefined>, 
			// 		emailModel:Ref<string|undefined>,
			// 		phone_numberModel:Ref<string|undefined> 
			// 	}) => {
				// 		nicknameModel.value = nicknameModel.value
				// 		emailModel.value = emailModel.value
				// 		phone_numberModel.value = phone_numberModel.value
				// 			return result
				// 		}
				// 	) // END_THEN()
				// }
		
	/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
	async function getSession(){

		info3("areParamsEmpty ()", areParamsEmpty())
		info3("areModelsEmpty ()", areModelsEmpty())

		if(areParamsEmpty() || areModelsEmpty()) {
			info("Params or Models are empty")

			//				Check to see if there is an active session.
			let session = await Auth.currentAuthenticatedUser({bypassCache: false})
			.then((user) => {
				emailModel.value = user.attributes?.email
				phone_numberModel.value =  user.attributes?.phone_number
				nicknameModel.value = user.attributes?.nickname
			})
			.catch((error) => { 
				info("No Session User -->",error)
				//				If I get here, there is no session or params
				//				I need to signIn.
			})

			// //			I need to check for not being signed in and reporting it to the UI
			// getNickEmailPhone().then( (result: ""| { 
			// 	nicknameModel:Ref<string|undefined>, 
			// 	emailModel:Ref<string|undefined>,
			// 	phone_numberModel:Ref<string|undefined> 
			// }) => {
			// 	nicknameModel.value = nicknameModel.value
			// 	emailModel.value = emailModel.value
			// 	phone_numberModel.value = phone_numberModel.value
			// 	return result
			// }
			// ) // END_THEN()
		}
		else {
			info2("Params and Models exist")
			//				If we get here, the params and models exist.
			//				We don't need to sign in.
		}
	} // END_getSession()_DECL

	getSession()	

			
			
	fini("ProfileView.vue <script setup>")
</script>