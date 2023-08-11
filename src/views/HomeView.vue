<template>
	<v-app>
		<MasterLayout>
			<h1 class="text-primary">Home Page Content</h1>
			<hr class="mb-10">

			<div v-if="isSession">

				<!-- Delete User -->
				<DeleteUser v-if="showDeleteUser" :usernameModel="usernameModel" :emailModel="emailModel" @onCancelDeleteUser="setShowDeleteUser"/>
				<div class="ma-3">
					<v-card v-if="!showDeleteUser" max-width="30em" elevation="24" 
					class="ma-auto pa-2" variant="tonal" color="major" _color="orange-darken-2">
						<v-card-text>
							<v-row >
								<v-col>
									<v-row class="text-h6"> Delete User w/ conf</v-row>
								</v-col>
								<v-col align-self="center">
									<v-row justify="end"><v-btn text="Edit" _color="orange-darken-2" color="major" @click="++showDeleteUser"/></v-row>
								</v-col>
							</v-row>
						</v-card-text>
					</v-card>
				</div>

				<!-- Update Password-->
				<Password v-if="showPassword" @onCancelPassword="setShowPassword"/>
				<div class="ma-3">
					<v-card v-if="!showPassword" class="ma-auto pa-2" variant="tonal" max-width="30em" elevation="24" >
						<v-card-text>
							<v-row >
								<v-col>
									<v-row class="text-h6">
										<v-icon start icon="mdi-lock-outline"></v-icon>Change Password
									</v-row>
									<v-row></v-row>
								</v-col>
								<v-col align-self="center">
									<v-row justify="end"><v-btn text="Edit" color="minor" @click="++showPassword"/></v-row>
								</v-col>
							</v-row>
						</v-card-text>
					</v-card>
				</div>

				<!-- Update Nickname -->
				<Nickname v-if="showNickname" :nicknameModel="nicknameModel" @onUpdateNickname="setNickname" @onCancelNickname="setShowNickname"/>
				<div class="ma-3">
					<v-card v-if="!showNickname" class="ma-auto pa-2" variant="tonal" max-width="30em" elevation="24" >
						<v-card-text>
							<v-row >
								<v-col>
									<v-row class="text-h6"> Change Nickname</v-row>
									<v-row>{{ nicknameModel }}</v-row>
								</v-col>
								<v-col align-self="center">
									<v-row justify="end"><v-btn text="Edit" color="minor" @click="++showNickname"/></v-row>
								</v-col>
							</v-row>
						</v-card-text>
					</v-card>
				</div>
					
				<!-- Update Phone number -->
				<Phone_number v-if="showPhone_number" :phone_numberModel="phone_numberModel" @onUpdatePhone_number="setPhone_number" @onCancelPhone_number="setShowPhone_number"/>
				<div class="ma-3">
					<v-card v-if="!showPhone_number" class="ma-auto pa-2" variant="tonal" max-width="30em" elevation="24" >
						<v-card-text>
							<v-row >
								<v-col>
									<v-row class="text-h6"> Change Phone number</v-row>
									<v-row>{{ phone_numberModel }}</v-row>
								</v-col>
								<v-col align-self="center">
									<v-row justify="end"><v-btn text="Edit" color="minor" @click="++showPhone_number"/></v-row>
								</v-col>
							</v-row>
						</v-card-text>
					</v-card>
				</div>
				
				<!-- Update Preferred Username -->
				<Preferred_username v-if="showPreferred_username" :usernameModel="usernameModel" @onUpdatePreferred_username="setPreferred_username" @onCancelPreferred_username="setShowPreferred_username"/>
				<div class="ma-3">
					<v-card v-if="!showPreferred_username" class="ma-auto pa-2" variant="tonal" max-width="30em" elevation="24" >
						<v-card-text>
							<v-row >
								<v-col>
									<v-row class="text-h6"> Change User name</v-row>
									<v-row>{{ usernameModel }}</v-row>
								</v-col>
								<v-col align-self="center">
									<v-row justify="end"><v-btn text="Edit" color="minor" @click="++showPreferred_username"/></v-row>
								</v-col>
							</v-row>
						</v-card-text>
					</v-card>
				</div>

				<!-- Update Email-->
				<Email v-if="showEmail" :emailModel="emailModel" @onUpdateEmail="setEmail" @onCancelEmail="setShowEmail"/>
				<div class="ma-3">
					<v-card v-if="!showEmail" class="ma-auto pa-2" variant="tonal" max-width="30em" elevation="24" >
						<v-card-text>
							<v-row >
								<v-col>
									<v-row class="text-h6"> Change Email w/ conf </v-row>
									<v-row>{{ emailModel }}</v-row>
								</v-col>
								<v-col align-self="center">
									<v-row justify="end"><v-btn text="Edit" color="minor" @click="++showEmail"/></v-row>
								</v-col>
							</v-row>
						</v-card-text>
					</v-card>
				</div>
									
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

const showNickname = ref(false)
const showPhone_number = ref(false)
const showPreferred_username = ref(false)
const showEmail = ref(false)
const showPassword = ref(false)
const showDeleteUser = ref(false)

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const friendlyPhone = (phone) => {
	if (phone == undefined) return
	const regex = /(?<plus>\+)(?<country>\d{1,3})(?<areacode>\d{3})(?<exchange>\d{3})(?<line>\d{4})/g;
	let match = regex.exec(phone)
	return `${match?.groups?.plus}${match?.groups?.country} (${match?.groups?.areacode}) ${match?.groups?.exchange}-${match?.groups?.line}`
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const setEmail = (payload) => {
	emailModel.value = payload.email
	showEmail.value = payload.showEmail
}
const setShowEmail = (payload) => showEmail.value = payload

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const setNickname = (payload) => { 
	nicknameModel.value = payload.nickname 
	showNickname.value = payload.showNickname
}
const setShowNickname = (payload) => {	showNickname.value = payload }

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const setShowPassword = (payload) => showPassword.value = payload

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const setShowDeleteUser = (payload) => showDeleteUser.value = payload

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const setPhone_number = (payload) => { 
	phone_numberModel.value = payload.phone_number,
	showPhone_number.value = payload.showPhone_number
}
const setShowPhone_number = (payload) => showPhone_number.value = payload

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const setPreferred_username = (payload) => {
	usernameModel.value = payload.preferred_username
	showPreferred_username.value = payload.showPreferred_username
}
const setShowPreferred_username = (payload) => showPreferred_username.value = payload

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
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