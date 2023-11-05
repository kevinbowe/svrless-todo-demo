<template>
	<v-btn text="Sign Out" rounded="xl" class="my-1" width="10em" color="surface_alt" @click="signOutUser"/>			
</template>

<script setup lang="ts">
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
import { info, info1, info2 , info3, info4, info5, info6, info7 } from "../my-util-code/MyConsoleUtil"
import { enter, enter0, enter1, enter2, enter3, enter4, enter5, enter6, enter7 } from "../my-util-code/MyConsoleUtil"
import { bar, whitebar, greybar, redbar, greenbar, orangebar } from "../my-util-code/MyConsoleUtil"
/* ----------------------------------------------------------------------------- */
import { Auth } from 'aws-amplify';
import router from "../router";

import { useUserPiniaStore } from "../stores/user"
const piniaStore = useUserPiniaStore(); //initialize the piniaStore

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const signOutUser = async () => { 
	try { 
		await Auth.signOut()
		.then( (response) => {
			piniaStore.connected = false
			piniaStore.username = ""
			piniaStore.preferred_username = ""

			//				Redirect to Home View
			router.push({name:'Home'})
		})
		.catch(error => {
			piniaStore.connected = true
			console.log('error signing out: ', error)
		})
	}
	catch (error) { 
		piniaStore.connected = true
		console.log('error signing out: ', error);}
}
</script>