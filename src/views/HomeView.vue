<!-- src/views/HomeView.vue -->
 
<script lang="ts">
	const showDev = ref(false)
	const BLOCKAPIFLAG = ref(false)
</script>

<template>
	<v-app>
		<MasterLayout>

			<v-row v-if="showDev">
				<v-spacer/>
				<v-col cols="2">
					<v-btn color="grey-darken-2" class="ma-1" @click="piniaStore.deleteAllDevStores()">Delete Dev LS</v-btn>
				</v-col>
				<v-col cols="3">
					<v-btn color="grey-darken-2" class="ma-1" @click="piniaStore.clearAllStores()">Delete ( Dev & Auth ) LS</v-btn>
					This will Sign Out User
				</v-col>
				<v-spacer/>
			</v-row>

		</MasterLayout>
	</v-app>
</template>

<script setup lang="ts">
import MasterLayout from "../layouts/MasterLayout.vue";
/* ----------------------------------------------------------------------------- */
import { bluebar, info, info1, info2 , info3, info4, info5, info6, info7 } from "../my-util-code/MyConsoleUtil"
import { enter, enter0, enter1, enter2, enter3, enter4, enter5, enter6, enter7 } from "../my-util-code/MyConsoleUtil"
import { bar, whitebar, greybar, redbar, greenbar, orangebar } from "../my-util-code/MyConsoleUtil"
/* ----------------------------------------------------------------------------- */
import { useTheme } from "vuetify";
import { useUserPiniaStore } from "../stores/user"
import  ThemeChanger from "../components/ThemeChanger.vue"
import { ref } from "vue";

//import colors from 'vuetify/lib/util/colors'

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
// const { mobile } = useDisplay()
const piniaStore = useUserPiniaStore(); // initialize the piniaStore
const theme = useTheme();

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/* 				if(BLOCKAPI("submitEmail function "))return								*/
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const BLOCKAPI = (message:string|null|undefined = null) => {
	if(BLOCKAPIFLAG.value) 
	message ? info7(`${message} -- BLOCKED`) : info7("-- BLOCKED -- ")
return BLOCKAPIFLAG.value
}

/* ----------------------------------------------------------------------------- */
theme.global.name.value = piniaStore.Active_Theme
</script>

<style>
</style>