<script lang="ts">
	const BLOCKAPIFLAG = ref(false)
</script>

<template>
	<!-- <v-container __DESKTOP__> -->


		<v-row >
			<div class="float-md-left">
				<v-btn width="16em" _class="float-md-left" class="mr-3" rounded @click="theme.global.name.value = piniaStore.A_Theme">
					<div class="my-n5">
						<v-icon size="60" color="green" v-if="piniaStore.A_Theme === theme.global.name.value" icon="mdi-toggle-switch"/>
						<v-icon size="60" v-else color="red" icon="mdi-toggle-switch-off"/>
						{{ piniaStore.A_Theme }}
					</div>
				</v-btn>
			</div>
			<div>
				<v-chip v-for="theme in themeVals"
				style="{ theme === piniaStore.A_Theme ? color:black;background-color: yellow; : color:black;background-color:grey;}"
				@click="setA_Theme(theme)"> 
					{{ theme }} 
				</v-chip>
			</div>
		</v-row>

		<v-row>
			<div class="float-md-left">
				<v-btn width="16em" class="mr-3" rounded @click="theme.global.name.value = piniaStore.B_Theme">
					<div class="my-n5">
						<v-icon size="60" color="green" v-if="piniaStore.B_Theme === theme.global.name.value" icon="mdi-toggle-switch"/>
						<v-icon size="60" v-else color="red" icon="mdi-toggle-switch-off"/>
						{{ piniaStore.B_Theme }}
					</div>
				</v-btn>
			</div>
			<div>
				<v-chip v-for="theme in themeVals"
				style="{ theme === piniaStore.B_Theme ? color:black;background-color: yellow; : color:black;background-color:grey;}"
				@click="setB_Theme(theme)"> 
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
// let leftModel:string = piniaStore.A_Theme
// let rightModel:string = piniaStore.B_Theme

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

const setB_Theme = (themeArg) => { 
	piniaStore.B_Theme = themeArg
	theme.global.name.value = themeArg
}

const setA_Theme = (themeArg) => { 
	piniaStore.A_Theme = themeArg
	theme.global.name.value = themeArg
}


/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/* 				if(BLOCKAPI("submitEmail function "))return								*/
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const BLOCKAPI = (message:string|null|undefined = null) => {
	if(BLOCKAPIFLAG.value) 
		message ? info7(`${message} -- BLOCKED`) : info7("-- BLOCKED -- ")
	return BLOCKAPIFLAG.value
}
</script>