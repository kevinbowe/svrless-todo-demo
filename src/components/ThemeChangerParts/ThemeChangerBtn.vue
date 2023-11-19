
<template>
	<!-- <h1 class="mr-3">{{ props.id }}</h1> -->
	<v-btn width="16em" rounded class="mr-3" @click="toggleTheme(`${props.id}`)">
		<div class="my-n5">
			<v-icon size="60" 
						:color="props.id === 'A' ? piniaStore.A_ThemeColor : piniaStore.B_ThemeColor" 
						:icon="props.id ===  'A' ? piniaStore.A_ThemeIcon  : piniaStore.B_ThemeIcon" />
			{{ props.id === 'A' ? piniaStore.A_ThemeText : piniaStore.B_ThemeText  }}
		</div>
	</v-btn>
</template>

<script setup lang="ts">
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
import { ref } from "vue";
import { useTheme, useDisplay } from "vuetify";
/* ----------------------------------------------------------------------------- */
import {
	enter, enter0, enter1, bar, 
	greybar, bluebar, whitebar, 
	info, info1, info2 , info3, info4, info5, info6, info7 } 
		from "../../my-util-code/MyConsoleUtil"

import { useUserPiniaStore } from "../../stores/user"

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const piniaStore = useUserPiniaStore(); // initialize the piniaStore

const props = defineProps({ id: { type: String } })

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const theme = useTheme();

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const toggleTheme = (ab) => {
	if(ab==='A')
	{
		//				Toggle Icon and Color
		if( piniaStore.A_ThemeColor==='red' ) {
			piniaStore.A_ThemeColor = 'green'
			piniaStore.A_ThemeIcon = 'mdi-toggle-switch'
			piniaStore.B_ThemeColor = 'red'
			piniaStore.B_ThemeIcon = 'mdi-toggle-switch-off'
		}
		//				Tobble GLOBAL Theme
		if( piniaStore.A_Theme !== theme.global.name.value ) {
			theme.global.name.value = piniaStore.A_Theme
			piniaStore.Active_Theme = piniaStore.A_Theme
			piniaStore.Inactive_Theme = piniaStore.B_Theme
		}
		return
	}
	//				Toggle Icons and Color
	if( piniaStore.A_ThemeColor==='green') {
		piniaStore.B_ThemeColor = 'green'
		piniaStore.B_ThemeIcon = 'mdi-toggle-switch'
		piniaStore.A_ThemeColor = 'red'
		piniaStore.A_ThemeIcon = 'mdi-toggle-switch-off'
	}
	//				Toggle the GLOBAL theme 
	if( piniaStore.B_Theme !== theme.global.name.value ) {
		theme.global.name.value = piniaStore.B_Theme
		piniaStore.Active_Theme = piniaStore.B_Theme
		piniaStore.Inactive_Theme = piniaStore.A_Theme
}
}

</script>