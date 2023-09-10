<template>
	<v-app>
		<MasterLayout>
			<v-container class="text-center">
				<h1 class="text-primary">Profile</h1>
				<hr class="mb-10">

				<!-- User Info -->
				<v-row >
					<v-spacer/>
					<v-col cols="8">

						<v-row no-gutters style="color:rgb(var(--v-theme-secondary))">
							<p class="ma-auto text-h4">{{ isSignedIn }} </p> </v-row>

						<v-row no-gutters class="text-h5 mt-5" style="color:rgb(var(--v-theme-secondary))">
							Nick Name:</v-row>
						<v-row no-gutters class="px-10 text-h7">{{ nicknameModel }}</v-row>

						<v-row no-gutters class="text-h5  mt-5" style="color:rgb(var(--v-theme-secondary))">
							Email:</v-row>
						<v-row no-gutters class="px-10 text-h7">{{ emailModel }}</v-row>

						<v-row no-gutters class="text-h5  mt-5"  style="color:rgb(var(--v-theme-secondary))">
							Phone Number:</v-row>
						<v-row no-gutters class="px-10 text-h7">{{ phone_numberModel }}</v-row>
						
						<v-row no-gutters class="text-h5 mt-5"  style="color:rgb(var(--v-theme-secondary))">
							User Name:</v-row>					
						<v-row no-gutters class="px-10 text-h7">{{ usernameModel }}</v-row>

					</v-col>
					<v-spacer/>
				</v-row>

			</v-container>
		</MasterLayout>
	</v-app>
</template>

<script lang="ts" setup>
import MasterLayout from "../layouts/MasterLayout.vue";
import { Auth } from 'aws-amplify';
import { ref } from 'vue'
import { useUserPiniaStore } from "../stores/user"
import { useTheme } from "vuetify";
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const piniaStore = useUserPiniaStore(); //initialize the piniaStore
const theme = useTheme();
const nicknameModel = ref()
const phone_numberModel = ref()
const emailModel = ref()
const usernameModel = ref()
const isSignedIn = ref()

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/* GetSession Decl */
async function getSession(){
		//				Check to see if there is an active session.
		await Auth.currentAuthenticatedUser({bypassCache: true /* false */})
		.then((user) => {
			isSignedIn.value = "Signed In"
			emailModel.value = user.attributes?.email
			phone_numberModel.value =  user.attributes?.phone_number
			nicknameModel.value = user.attributes?.nickname
			
			usernameModel.value = user.username
			if (user.attributes?.preferred_username) 
			usernameModel.value = user.attributes?.preferred_username
			piniaStore.connected = true
	})
	.catch((error) => {
		isSignedIn.value = "Not Signed In"
		piniaStore.connected = false
	} )
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
getSession()
/* ----------------------------------------------------------------------------- */

//				Do I need this ??? -- What is this here ???
//theme.global.name.value = piniaStore.A_Theme
theme.global.name.value = piniaStore.Active_Theme
</script>
<style></style>