<template>
	<v-app>
		<MasterLayout>
			<h1 class="text-primary">Home Page Content</h1>
			<hr class="mb-10">

			<div v-if="isSession">
				<!-- Update Nickname -->
				<Nickname/>
				<!-- Update Email-->
				<Email/>
				<!-- Update Preferred Username -->
				<Preferred_username/>
				<!-- User Info -->
				<UserInfo />
				<!-- Sign Out -->
				<SignOut @onSignOut="setSession"/>

				<!-- Experiment-1 -->
				<Experiment_one 
					@onExperimentEmit="ExperimentOneHandler"
					@onExperimentEmit_B="ExperimentOne_B_Handler"
				/>

				<!-- Experiment-2 -->
				<Experiment_two @onExperimentEmit="ExperimentTwoHandler"/>

			</div>

			<!-- SignUp, SignIn and Confirm -->
			<User v-else />
			
		</MasterLayout>
	</v-app>
</template>

<script setup lang="ts">
import MasterLayout from "../layouts/MasterLayout.vue";
import { ref } from 'vue'
/* ----------------------------------------------------------------------------- */
import { info, info1, info2 , info3, info4, info5, info6, info7 } from "../my-util-code/MyConsoleUtil"
import { enter, enter0, enter1, enter2, enter3, enter4, enter5, enter6, enter7 } from "../my-util-code/MyConsoleUtil"
import { bar, whitebar, greybar, redbar, greenbar, orangebar } from "../my-util-code/MyConsoleUtil"
import { log, warn, err, err2, exit, success, pass, fail, fini, start, progress, joy, } from "../my-util-code/MyConsoleUtil"
/* ----------------------------------------------------------------------------- */
import { translations} from '@aws-amplify/ui-vue';
import { Amplify, Auth, Hub, I18n, } from 'aws-amplify';
import awsconfig from '../aws-exports';
import "@aws-amplify/ui-vue/styles.css";
/* ----------------------------------------------------------------------------- */
import User from "../components/User.vue"
import Nickname from "../components/Nickname.vue"
import Preferred_username from "../components/Preferred_username.vue";
import Email from "../components/Email.vue";
import UserInfo from "../components/UserInfo.vue"
import SignOut from "../components/SignOut.vue"
//////
import Experiment_one from "../components/Experiment_one.vue"
import Experiment_two from "../components/Experiment_two.vue"

/* ----------------------------------------------------------------------------- */
import {isSession} from "../components/User.vue"

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
Amplify.configure(awsconfig);

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
function ExperimentOneHandler (obj) {
	enter("HomeView.vue --> ExperimentOneHandler()")
	info3(obj.isSignedInFlag)
	info4(obj.username)
	info5(obj.phone)
	bar()
}
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
function ExperimentOne_B_Handler (obj) {
	enter("HomeView.vue --> ExperimentOne_B_Handler()")
	info3(obj.isSignedInFlag)
	info4(obj.username)
	info5(obj.phone)
	bar()
}
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
function ExperimentTwoHandler (obj) {
	enter0("HomeView.vue --> ExperimentTwoHandler()")
	info(obj.isSignedInFlag)
	info1(obj.username)
	bar()
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
function setSession ({isSessionFlag, myModel}) {
	isSession.value = isSessionFlag
}

// /* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
// /* Decl getSession */
// async function getSession(){
// 	//				This is NOT called during SignUp
// 	const cognitoAccessToken = await Auth.currentSession()
// 	.then(currenSession => {
// 		return currenSession .getAccessToken() .getJwtToken()})
// 		.catch(err => { return err})
// 		if (cognitoAccessToken === "No current user") return { "isSession": false }
// 
// 	return await Auth.currentAuthenticatedUser({bypassCache: true })
// 		.then((user) => {
// 			return {
// 				"nickname": user.attributes?.nickname,
// 				"email": user.attributes?.email,
// 				"phone_number": user.attributes?.phone_number,
// 				"username": user.attributes?.preferred_username  ? user.attributes?.preferred_username : user.username,
// 				"isSession": true
// 			}
// 		})
// 	};
	
// /* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
// /* Execute getSession() */
// /* 				This is NOT called during SignUp	 */
// getSession().then( (result) => { 
// 	bar()
// 	enter("PARENT HomeView > getSession() -- Initialization")
// 	//					These models are not available on a reload when signed in.
// 	nicknameModel.value = result.nickname
// 	emailModel.value = result.email
// 	phone_numberModel.value = result.phone_number
// 	usernameModel.value = result.username
// 
// 	//					Do the result values exist? -- Yes
// 	info("result.nickname",result.nickname)
// 	info("result.email",result.email)
// 	info("result.phone_number",result.phone_number)
// 	info("result.username",result.username)
// 
// 	info2("nicknameModel.value", nicknameModel.value)
// 	info2("emaiModel.value", emailModel.value)
// 	info2("phone_numberModel.value", phone_numberModel.value)
// 	info2("usernameModel.value", usernameModel.value)
// 
// 	isSession.value = result.isSession;
// })

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
	}
	.amplify-tabs-item[data-state=active] { 
		color: rgb(var(--v-theme-primary)); 
		border-color: rgb(var(--v-theme-primary));
		border-top-width: 5px;
	}
	.v-input { margin-top: 2px;}
	.signup-nickname input {
		color: var(--amplify-components-fieldcontrol-color);
		border-color: var(--amplify-components-fieldcontrol-border-color);
		border-style: var(--amplify-components-fieldcontrol-border-style);
		border-width: var(--amplify-components-fieldcontrol-border-width);
	}
	.v-slide-group-item--active {
		/* background-color: rgb(var(--v-theme-surface_alt)); */
		/* color: rgb(var(--v-theme-background)); */
		/* background-color: rgb(var(--v-theme-surface)); */
	}
	.v-tab__slider {
		/* top: 0; */
		height:4px;
		color: rgb(var(--v-theme-primary));
	}
</style>