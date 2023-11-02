<!-- <script lang="ts"> 
	const showDev = ref(true)
</script> -->

<template>
	<v-app>
		<MasterLayout>
			<h1 class="text-primary">Account Settings</h1>

			<!-- <div v-if="showDev">
				<v-btn color="grey-darken-2" class="ma-1" @click="piniaStore.deleteAllDevStores()">Delete Dev LS</v-btn><br/>
				<v-btn color="grey-darken-2" class="ma-1" @click="piniaStore.clearAllStores()">Delete ( Dev & Auth ) LS</v-btn>
				<p>This will Sign Out User</p>
			</div> -->

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
			<SignOut/>

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
// import User from "../components/User.vue"
import Nickname from "../components/Nickname.vue"
import Preferred_username from "../components/Preferred_username.vue";
import Email from "../components/Email.vue";
import SignOut from "../components/SignOut.vue"
import Password from "../components/Password.vue"
import Phone_number from "../components/Phone_number.vue"
import DeleteUser from "../components/DeleteUser.vue"
import { useUserPiniaStore } from "../stores/user"
import { useTheme } from "vuetify";

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const theme = useTheme();
const piniaStore = useUserPiniaStore(); //initialize the piniaStore
const nicknameModel = ref()
const emailModel = ref()
const phone_numberModel = ref()
const usernameModel = ref()

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const updateEmail = (payload) => { emailModel.value = payload.email }
/* ----------------------------------------------------------------------------- */
const setNickname = (payload) => { nicknameModel.value = payload.nickname }
/* ----------------------------------------------------------------------------- */
const setPhone_number = (payload) => { phone_numberModel.value = payload.phone_number }
/* ----------------------------------------------------------------------------- */
const setPreferred_username = (payload) => { usernameModel.value = payload.preferred_username }
/* ----------------------------------------------------------------------------- */

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/* Decl getSession */
type attributesType = {nickname:string, email:string, phone_number:string, username: string, session: boolean}

async function getSession(){
	return await Auth.currentAuthenticatedUser({bypassCache: true })
		.then((user) => {
			let attributes: attributesType = {
				"nickname": user.attributes?.nickname,
				"email": user.attributes?.email,
				"phone_number": user.attributes?.phone_number,
				"username": user.attributes?.preferred_username  ? user.attributes?.preferred_username : user.username,
				"session": true
			}
			return attributes

		}).catch((reason) => {
			let attributes: attributesType = {
				"nickname": "",
				"email": "",
				"phone_number": "",
				"username": "",
				"session": false
			}
			return attributes
		} )
	};
	
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/* Execute getSession() -- This is not executed SignUp */
getSession().then( (result) => { 
	nicknameModel.value = result.nickname
	emailModel.value = result.email
	phone_numberModel.value = result.phone_number
	usernameModel.value = result.username
})

/* ----------------------------------------------------------------------------- */
theme.global.name.value = piniaStore.Active_Theme

</script>

<style>
</style>