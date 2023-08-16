<template>
	<v-row no-gutters >
		<v-spacer/>
		<v-col cols="8">
			<v-btn text="Sign Out" 
			rounded="xl" class="my-1" width="10em" color="surface_alt" 
			@click="signOutUser"/>			
		</v-col>
		<v-spacer/>
	</v-row>
</template>

<script lang="ts">
	export default {inheritAttrs: false}
</script>

<script setup lang="ts">
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
import { info, info1, info2 , info3, info4, info5, info6, info7 } from "../my-util-code/MyConsoleUtil"
import { enter, enter0, enter1, enter2, enter3, enter4, enter5, enter6, enter7 } from "../my-util-code/MyConsoleUtil"
import { bar, whitebar, greybar, redbar, greenbar, orangebar } from "../my-util-code/MyConsoleUtil"
/* ----------------------------------------------------------------------------- */
import { Auth } from 'aws-amplify';
import { sessionState } from "../sessionState"
import router from "../router";

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const emit = defineEmits()

const signOutUser = async () => { 
	try { 
		await Auth.signOut()
		.then( (response) => {
			sessionState.connected = false
			//				Redirect to Home View
			router.push({name:'home'})
		})
		.catch(error => {
			sessionState.connected = true
			console.log('error signing out: ', error)
		})
	}
	catch (error) { 
		sessionState.connected = true
		console.log('error signing out: ', error);}
}
</script>