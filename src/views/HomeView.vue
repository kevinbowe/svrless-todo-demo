<template>
	<v-app>
		<MasterLayout>
			<h1 class="text-primary">Home Page Content</h1>
			<hr class="mb-10">
			<div v-if="isSession">

				<!-- Update Nickname -->
				<Nickname @onUpdateNickname="setNickname"/>

				<!-- Update Email-->
				<Email @onUpdateEmail="setEmail"/>

				<!-- Update Preferred Username -->
				<Preferred_username @onUpdatePreferred_username="setPreferred_username"/>

				<!-- <UserInfo/> -->
				<v-row justify="center">
					<v-col :lg="4" :md="6" :sm="8" :xs="12" class="ma-auto" >
						<v-divider :thickness="10" class="ma-2"></v-divider>
						<v-row no-gutters>
							<v-col style="background-color: rgb(var(--v-theme-surface)); color: rgb(var(--v-theme-border_alt));">
								<p>Nick Name:</p></v-col>
							<v-col><p>{{ nicknameModel }}</p></v-col>
						</v-row>
						<v-divider :thickness="3" />
						<v-row no-gutters style="background-color:rgb(var(--v-theme-surface)); color: rgb(var(--v-theme-border_alt));">
							<p class="ma-auto">Email:</p></v-row>
						<v-row no-gutters><p class="ma-auto">{{ emailModel }}</p></v-row>
						<v-divider :thickness="3" />
						<v-row no-gutters style="background-color: rgb(var(--v-theme-surface)); color: rgb(var(--v-theme-border_alt));">
							<p class="ma-auto">Phone Number:</p></v-row>
						<v-row no-gutters ><p class="ma-auto">{{ phone_numberModel }}</p></v-row>
						<v-divider :thickness="3" />
						<v-row no-gutters style="background-color: rgb(var(--v-theme-surface)); color: rgb(var(--v-theme-border_alt));">
							<p class="ma-auto">User Name:</p></v-row>
							<v-row no-gutters ><p class="ma-auto">{{ usernameModel }}</p></v-row>
						<v-divider :thickness="10"></v-divider>
					</v-col>
				</v-row>

				<!-- Sign Out -->
				<SignOut @onSignOut="setSession"/>
				<!-- Experiment-1 -->
				<Experiment_one @onExperimentEmit="ExperimentOneHandler"
					@onExperimentEmit_B="ExperimentOne_B_Handler"/>
				<!-- Experiment-2 -->
				<Experiment_two @onExperimentEmit="ExperimentTwoHandler"/>
			</div>

			<!-- SignUp, SignIn and Confirm -->
			<!-- <User v-else /> -->
			<User @onSignIn="setUserInfo"/>

			
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
import { Amplify, Auth, Hub, I18n, } from 'aws-amplify';
import awsconfig from '../aws-exports';
import "@aws-amplify/ui-vue/styles.css";
/* ----------------------------------------------------------------------------- */
import User, { isSession } from "../components/User.vue"
// import User, { emailModel, phone_numberModel, usernameModel } from "../components/User.vue"
import Nickname from "../components/Nickname.vue"
import Preferred_username from "../components/Preferred_username.vue";
import Email from "../components/Email.vue";
// import UserInfo from "../components/UserInfo.vue"
import SignOut from "../components/SignOut.vue"
// EXPERIMENTS
import Experiment_one from "../components/Experiment_one.vue"
import Experiment_two from "../components/Experiment_two.vue"

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
function ExperimentOneHandler (obj) {
	enter("HomeView.vue --> ExperimentOneHandler()")
	info3(obj.isSignedInFlag)
	info4(obj.username)
	info5(obj.phone)
	bar()
}
/* ----------------------------------------------------------------------------- */
function ExperimentOne_B_Handler (obj) {
	enter("HomeView.vue --> ExperimentOne_B_Handler()")
	info3(obj.isSignedInFlag)
	info4(obj.username)
	info5(obj.phone)
	bar()
}
/* ----------------------------------------------------------------------------- */
function ExperimentTwoHandler (obj) {
	enter0("HomeView.vue --> ExperimentTwoHandler()")
	info(obj.isSignedInFlag)
	info1(obj.username)
	bar()
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const setSession = (payload) => { isSession.value = payload.sessionState }

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const nicknameModel = ref()
const emailModel = ref()
const phone_numberModel = ref()
const usernameModel = ref()

const setEmail = (payload) => {
			enter(`setEmail > [ ${payload.email} ]`)
	emailModel.value = payload.email
}

const setNickname = (payload) => { 
			enter(`setNickname > [ ${payload.nickname} ]`)
	nicknameModel.value = payload.nickname
}

const setPreferred_username = (payload) => {
			enter(`setPreferred_username > [ ${payload.preferred_username} ]`)
	usernameModel.value = payload.preferred_username
}

const setUserInfo = (payload) => { 
			enter(`setUserInfo > [ ${payload} ]`)
			info(`Payload.nickname.value > [ ${payload.nickname} ]`)
			info(`Payload.email.value > [ ${payload.email} ]`)

			info(`Payload.phonenumber.value > [ ${payload.phonenumber} ]`)
			info(`Payload.Username.value > [ ${payload.username} ]`)

	nicknameModel.value = payload.nickname
	emailModel.value = payload.email
	phone_numberModel.value = payload.phonenumber
	usernameModel.value = payload.username
}
	
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/* Decl getSession */
async function getSession(){
	return await Auth.currentAuthenticatedUser({bypassCache: true })
		.then((user) => {
			return {
				"nickname": user.attributes?.nickname,
				"email": user.attributes?.email,
				"phone_number": user.attributes?.phone_number,
				"username": user.attributes?.preferred_username  ? user.attributes?.preferred_username : user.username,
				"isSession": true
			}
		})
	};
	
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/* Execute getSession() -- This is not executed SignUp */
getSession().then( (result) => { 
	bar()
	enter("PARENT HomeView > getSession() -- Initialization")
	nicknameModel.value = result.nickname
	emailModel.value = result.email
	phone_numberModel.value = result.phone_number
	usernameModel.value = result.username
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