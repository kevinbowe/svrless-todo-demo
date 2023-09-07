<!-- src/views/HomeView.vue -->
<template>
	<v-app>
		<MasterLayout>
			<h1 class="text-primary">Home</h1>
			<hr class="mb-10">
	
			<ThemeChanger></ThemeChanger>

			<v-spacer style="height:2em;"></v-spacer>
			
			<v-btn color="secondary" @click="onChangeSwitch">Toggle Theme</v-btn>

			<v-spacer style="height:2em;"></v-spacer>
			
			<v-btn color="grey-darken-2" class="ma-1" @click="piniaStore.deleteAllStores()">Delete Dev LS</v-btn>
			<v-btn color="grey-darken-2" class="ma-1" @click="resetAllStores">Reset LS</v-btn><br>
			<v-btn color="grey-darken-2" class="ma-1" @click="piniaStore.clearAllStores()">Delete ( Dev & Auth ) LS</v-btn><br>
			This will Sign Out User
			
			<v-spacer style="height:1em;"></v-spacer>
			<h1>Counter App</h1>
			<p>(piniaStore) Count is {{ piniaStore.count }}</p>
			<p>(piniaStore) Double count is {{ piniaStore.doubleCount }}</p>
			
			<v-btn color="blue-grey-darken-2" class="ma-1" @click="piniaStore.increment(1)">Add</v-btn>
			<v-btn color="blue-grey-darken-2" class="ma-1" @click="piniaStore.decrement(1)">Subtract</v-btn>
			<v-btn color="blue-grey-darken-2" class="ma-1" @click="piniaStore.reset">Reset</v-btn>
				
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
// const themeVals = Object.keys(theme.computedThemes.value);
const onChangeSwitch = () => {
	//				Toggle the light and dark themes based on the piniaStore [ active and inactive ]
	theme.global.name.value = piniaStore.inactiveTheme
	piniaStore.inactiveTheme =	piniaStore.activeTheme
	piniaStore.activeTheme = theme.global.name.value
}

/* ----------------------------------------------------------------------------- */
const resetAllStores = () => {
	//				Do this to cause the watch (pinia.state) to fire.
	piniaStore.activeTheme = ""
	//				This will reset all piniaStore values.
	piniaStore.resetAllStores()
	theme.global.name.value = piniaStore.activeTheme
}
/* ----------------------------------------------------------------------------- */

theme.global.name.value = piniaStore.activeTheme

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/**/					const BLOCKAPIFLAG = ref(false)										 /**/
/* 				if(BLOCKAPI("submitEmail function "))return								*/
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const BLOCKAPI = (message:string|null|undefined = null) => {
	if(BLOCKAPIFLAG.value) 
		message ? info7(`${message} -- BLOCKED`) : info7("-- BLOCKED -- ")
	return BLOCKAPIFLAG.value
}
</script>

<style>
</style>