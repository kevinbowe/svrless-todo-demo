<template>
	<v-app>
		<MasterLayout>
			<h1 class="text-primary">Home Page Content</h1>
			<hr class="mb-10">

			<div v-if="isSession">

				<!-- Update Password-->
				<Password />

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
						<v-row no-gutters ><p class="ma-auto">{{ friendlyPhone(phone_numberModel) }}</p></v-row>
						<v-divider :thickness="3" />
						<v-row no-gutters style="background-color: rgb(var(--v-theme-surface)); color: rgb(var(--v-theme-border_alt));">
							<p class="ma-auto">User Name:</p></v-row>
							<v-row no-gutters ><p class="ma-auto">{{ usernameModel }}</p></v-row>
						<v-divider :thickness="10"></v-divider>
					</v-col>
				</v-row>

				<!-- Sign Out -->
				<SignOut @onSignOut="setSession"/>
			</div>

			<!-- SignUp, SignIn and Confirm -->
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

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const setSession = (payload) => { isSession.value = payload.sessionState }

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const nicknameModel = ref()
const emailModel = ref()
const phone_numberModel = ref()
const usernameModel = ref()
const isSession = ref(true)
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const friendlyPhone = (phone) => {
	if (phone == undefined) return
	const regex = /(?<plus>\+)(?<country>\d{1,3})(?<areacode>\d{3})(?<exchange>\d{3})(?<line>\d{4})/g;
	let match = regex.exec(phone)
	return `${match?.groups?.plus}${match?.groups?.country} (${match?.groups?.areacode}) ${match?.groups?.exchange}-${match?.groups?.line}`
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const setEmail = (payload) => emailModel.value = payload.email 

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const setNickname = (payload) => nicknameModel.value = payload.nickname 

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const setPreferred_username = (payload) => usernameModel.value = payload.preferred_username

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const setUserInfo = (payload) => { 
	nicknameModel.value = payload.nickname
	emailModel.value = payload.email
	phone_numberModel.value = payload.phonenumber
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