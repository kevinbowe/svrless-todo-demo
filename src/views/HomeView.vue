<script lang="ts">
	const BLOCKAPIFLAG = ref(false)
</script>

<template>
	<v-app>
		<MasterLayout>
			<v-container class="d-flex flex-wrap my-n2" >
				<v-row align="center" no-gutters class="mt-n5">
					<v-col><img :height="mobile? 280:600" src="../assets/hero.svg"/></v-col>
					<v-col>
						<div :class="mobile? 'text-h4':'text-h3'">Welcome to Ohggi</div>
						<div>by DaBowe.com</div>
						<v-btn to="/todo" color="primary" text="select to continue" class="mt-4"></v-btn>
					</v-col>
				</v-row>
			</v-container>
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
import { useTheme, useDisplay } from "vuetify";
import { useUserPiniaStore } from "../stores/user"
import  ThemeChanger from "../components/ThemeChanger.vue"
import { ref } from "vue";

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const piniaStore = useUserPiniaStore();
const theme = useTheme();
const { mobile } = useDisplay()

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