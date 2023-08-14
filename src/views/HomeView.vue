<template>
	<v-app>
		<MasterLayout>
			<h1 class="text-primary">Home Page Content</h1>
			<hr class="mb-10">

			<div v-if="isSession">

				<!-- Delete User -->
				<DeleteUser :username="usernameModel" :email="emailModel" />

				<!-- Update Password-->
				<Password />

				<!-- Update Nickname -->
				<Nickname :nickname="nicknameModel" @onUpdateNickname="setNickname" />
					
				<!-- Update Phone number -->
				<Phone_number :phone_number="phone_numberModel" @onUpdatePhone_number="setPhone_number" />
				
				<!-- Update Preferred Username -->
				<Preferred_username :username="usernameModel" @onUpdatePreferred_username="setPreferred_username" />

				<!-- Update Email-->
				<Email :email="emailModel" @onUpdateEmail="updateEmail"/>
									
				<!-- Sign Out -->
				<SignOut @onSignOut="setSession"/>
			</div>

			<!-- SignUp, SignIn, Confirm and Reset Password -->
			<User v-else @onSignIn="setUserInfo"/>
			
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
/* ----------------------------------------------------------------------------- */
import { Auth } from 'aws-amplify';
import "@aws-amplify/ui-vue/styles.css";
/* ----------------------------------------------------------------------------- */
import User from "../components/User.vue"
import Nickname from "../components/Nickname.vue"
import Preferred_username from "../components/Preferred_username.vue";
import Email from "../components/Email.vue";
import SignOut from "../components/SignOut.vue"
import Password from "../components/Password.vue"
import Phone_number from "../components/Phone_number.vue"
import DeleteUser from "../components/DeleteUser.vue"

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const setSession = (payload) => { isSession.value = payload.sessionState }

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const nicknameModel = ref()
const emailModel = ref()
const phone_numberModel = ref()
const usernameModel = ref()
const isSession = ref(true)

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const updateEmail = (payload) => { emailModel.value = payload.email }
/* ----------------------------------------------------------------------------- */
const setNickname = (payload) => { nicknameModel.value = payload.nickname }
/* ----------------------------------------------------------------------------- */
const setPhone_number = (payload) => { phone_numberModel.value = payload.phone_number }
/* ----------------------------------------------------------------------------- */
const setPreferred_username = (payload) => { usernameModel.value = payload.preferred_username }
/* ----------------------------------------------------------------------------- */
const setUserInfo = (payload) => { 
	nicknameModel.value = payload.nickname
	emailModel.value = payload.email
	phone_numberModel.value = payload.phone_number
	usernameModel.value = payload.username
	isSession.value = payload.sessionState
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
				"session": true
			}
		}).catch((reason) => {
			return {"session": false}
		} )
	};
	
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/* Execute getSession() -- This is not executed SignUp */
getSession().then( (result) => { 
	nicknameModel.value = result.nickname
	emailModel.value = result.email
	phone_numberModel.value = result.phone_number
	usernameModel.value = result.username
	isSession.value = result.session
})

</script>

<style>
</style>