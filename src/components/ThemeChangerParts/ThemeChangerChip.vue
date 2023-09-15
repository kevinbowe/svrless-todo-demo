
<template>
	<v-chip v-for="theme in themes" class="ma-1" style="background-color:grey;" @click="setTheme(theme)" > 
		{{ theme }} 
	</v-chip>

</template>

<script setup lang="ts">
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
//import { ref } from "vue";
import { useTheme, useDisplay } from "vuetify";

/* ----------------------------------------------------------------------------- */
import {
	enter, enter0, enter1, bar, 
	greybar, bluebar, whitebar, 
	info, info1, info2 , info3, info4, info5, info6, info7 } 
		from "../../my-util-code/MyConsoleUtil"

import { useUserPiniaStore } from "../../stores/user"

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const props = defineProps({ id: { type: String } })

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const piniaStore = useUserPiniaStore(); // initialize the piniaStore
const theme = useTheme();
const themes = Object.keys(theme.computedThemes.value);

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const setTheme = (themeArg) => {  

	if(props.id === 'A') {
		piniaStore.A_Theme = themeArg
		piniaStore.A_ThemeText = themeArg

		piniaStore.Inactive_Theme = piniaStore.Active_Theme
		piniaStore.Active_Theme = themeArg

		piniaStore.A_ThemeIcon = "mdi-toggle-switch"
		piniaStore.A_ThemeColor = "green"
		
		piniaStore.B_ThemeIcon = "mdi-toggle-switch-off"
		piniaStore.B_ThemeColor = "red"
		
		theme.global.name.value = themeArg
		return
	}
	piniaStore.B_Theme = themeArg
	piniaStore.B_ThemeText = themeArg

	piniaStore.Inactive_Theme = piniaStore.Active_Theme
	piniaStore.Active_Theme = themeArg

	piniaStore.B_ThemeIcon = "mdi-toggle-switch"
	piniaStore.B_ThemeColor = "green"
	
	piniaStore.A_ThemeIcon = "mdi-toggle-switch-off"
	piniaStore.A_ThemeColor = "red"

	theme.global.name.value = themeArg
}

</script>