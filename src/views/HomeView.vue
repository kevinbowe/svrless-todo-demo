<!-- src/views/HomeView.vue -->
<template>
	<v-app>
		<MasterLayout>
			<h1 class="text-primary">Home</h1>
			<hr class="mb-10">
	
			<ThemeChanger></ThemeChanger>

			<v-spacer style="height:2em;"></v-spacer>
			
			<!-- MOVE THIS BLOCK TO <ThemeChanger> or Account > Settings -->
			<p><v-btn color="grey-darken-2" class="ma-1" @click="piniaStore.deleteAllDevStores()">Delete Dev LS</v-btn></p>
			<v-btn color="grey-darken-2" class="ma-1" @click="piniaStore.clearAllStores()">Delete ( Dev & Auth ) LS</v-btn><br>
			This will Sign Out User
		</MasterLayout>
	</v-app>
</template>

<script setup lang="ts">
import MasterLayout from "../layouts/MasterLayout.vue";
/* ----------------------------------------------------------------------------- */
import { info, info1, info2 , info3, info4, info5, info6, info7 } from "../my-util-code/MyConsoleUtil"
import { enter, enter0, enter1, enter2, enter3, enter4, enter5, enter6, enter7 } from "../my-util-code/MyConsoleUtil"
import { bar, whitebar, greybar, redbar, greenbar, orangebar } from "../my-util-code/MyConsoleUtil"
/* ----------------------------------------------------------------------------- */
import { useTheme } from "vuetify";
import { useUserPiniaStore } from "../stores/user"
import  ThemeChanger from "../components/ThemeChanger.vue"
import { Auth } from "aws-amplify";
import { ref } from "vue";

import colors from 'vuetify/lib/util/colors'

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
// const { mobile } = useDisplay()
const piniaStore = useUserPiniaStore(); // initialize the piniaStore
const theme = useTheme();


/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/**/					const BLOCKAPIFLAG = ref(false)										 /**/
/* 				if(BLOCKAPI("submitEmail function "))return								*/
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const BLOCKAPI = (message:string|null|undefined = null) => {
	if(BLOCKAPIFLAG.value) 
	message ? info7(`${message} -- BLOCKED`) : info7("-- BLOCKED -- ")
return BLOCKAPIFLAG.value
}

/* ----------------------------------------------------------------------------- */

//				Do I need this ??? -- What is this here ???
// theme.global.name.value = piniaStore.A_Theme
theme.global.name.value = piniaStore.Active_Theme
</script>

<style>
</style>