<template>
	<!-- <v-container __DESKTOP__> -->


		<v-row >
			<div class="float-md-left">
				<v-btn width="16em" _class="float-md-left" class="mr-3" rounded @click="theme.global.name.value = piniaStore.activeTheme">
					<div class="my-n5">
						<v-icon size="60" color="green" v-if="piniaStore.activeTheme === theme.global.name.value" icon="mdi-toggle-switch"/>
						<v-icon size="60" v-else color="red" icon="mdi-toggle-switch-off"/>
						{{ piniaStore.activeTheme }}
					</div>
				</v-btn>
			</div>
			<div>
				<v-chip v-for="theme in themeVals"
				style="{ theme === piniaStore.activeTheme ? color:black;background-color: yellow; : color:black;background-color:grey;}"
				@click="setActiveTheme(theme)"> 
					{{ theme }} 
				</v-chip>
			</div>
		</v-row>

		<v-row>
			<div class="float-md-left">
				<v-btn width="16em" class="mr-3" rounded @click="theme.global.name.value = piniaStore.inactiveTheme">
					<div class="my-n5">
						<v-icon size="60" color="green" v-if="piniaStore.inactiveTheme === theme.global.name.value" icon="mdi-toggle-switch"/>
						<v-icon size="60" v-else color="red" icon="mdi-toggle-switch-off"/>
						{{ piniaStore.inactiveTheme }}
					</div>
				</v-btn>
			</div>
			<div>
				<v-chip v-for="theme in themeVals"
				style="{ theme === piniaStore.inactiveTheme ? color:black;background-color: yellow; : color:black;background-color:grey;}"
				@click="setInactiveTheme(theme)"> 
					{{ theme }} 
				</v-chip>
			</div>
		</v-row>
	<!-- </v-container> -->

	<!-- <v-container __MOBILE__ class="d-sm-none">
	</v-container> -->
	
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useTheme } from "vuetify";
import { Auth } from "aws-amplify";
/* ----------------------------------------------------------------------------- */
import {
	enter, enter0, enter1, bar, 
	greybar, bluebar, whitebar, 
	info, info1, info2 , info3, info4, info5, info6, info7 } 
		from "../my-util-code/MyConsoleUtil"
import { useUserPiniaStore } from "../stores/user"

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const piniaStore = useUserPiniaStore(); // initialize the piniaStore

const theme = useTheme();
const themeVals = Object.keys(theme.computedThemes.value);

// Set the default Models and Theme
// let leftModel:string = piniaStore.activeTheme
// let rightModel:string = piniaStore.inactiveTheme

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

const setInactiveTheme = (themeArg) => { 
	piniaStore.inactiveTheme = themeArg
	theme.global.name.value = themeArg
}

const setActiveTheme = (themeArg) => { 
	piniaStore.activeTheme = themeArg
	theme.global.name.value = themeArg
}


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