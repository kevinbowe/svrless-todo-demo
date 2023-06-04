
<template>
	<v-app>
		<MasterLayout>
			<v-container class="text-center">
				<h1 class="text-primary">Profile Page Content.</h1>
				<v-row>
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
			</v-container>
		</MasterLayout>
	</v-app>
</template>


<script lang="ts" setup>
import MasterLayout from "../layouts/MasterLayout.vue";
import { Auth, Hub } from 'aws-amplify';
import { GetUserCommand, GetUserRequest, CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";
import awsconfig from '../aws-exports';
/*  */
import {
	info, infor, infog, infob, infoy, infoo, infop, infom,
	info1, info2, info3, info4, info5, info6, info7,
	log, warn, err, progress, joy, enter, exit,
	success, bar, whitebar, fini, start, pass, fail, err2
} from "../my-util-code/MyConsoleUtil"

import { toRefs, ref, Ref, computed } from 'vue'
import router from "../router";

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
//				This DEFINES getNickEmailPhone function
//				This is duplicated in HomeView.vue
//				This code must be made global, 
//				or at least importable from a SINGLE source,
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



bar()

let areParamsEmpty = function() {
	let v = Object.values(props)
	let o = v.find(e => e.length === 0)
	// IF no match: return undefined ELSE return string
	// info("typeof Find Results", typeof o)
	return typeof o !== undefined
}

//				Check to see if the models have been hydrated
let areModelsEmpty = function(){
	return nicknameModel.value?.length === 0 ||
	emailModel.value?.length === 0 ||
	phone_numberModel.value?.length === 0
}

if(areParamsEmpty() || areModelsEmpty()) {

	//				I need to check for not being signed in and reporting it to the UI
	getNickEmailPhone().then( (result: ""| { 
			nicknameModel:Ref<string|undefined>, 
			emailModel:Ref<string|undefined>,
			phone_numberModel:Ref<string|undefined> 
		}) => {
			nicknameModel.value = nicknameModel.value
			emailModel.value = emailModel.value
			phone_numberModel.value = phone_numberModel.value
			return result
		}
	) // END_THEN()


	// let rtn = getNickEmailPhone().then( (result: "" | string | { 
	// 		nicknameModel:Ref<string|undefined>, 
	// 		emailModel:Ref<string|undefined>,
	// 		phone_numberModel:Ref<string|undefined > 
	// 	} ) => {
	// 		nicknameModel.value = nicknameModel.value
	// 		emailModel.value = emailModel.value
	// 		phone_numberModel.value = phone_numberModel.value
	// 		return result
	// 	}
	// )

}


fini("Exit ProfileView.vue <script setup>")
</script>