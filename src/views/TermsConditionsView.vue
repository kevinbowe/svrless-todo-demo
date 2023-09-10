<template>
<!-- <v-app> -->
<MasterLayout>
	<v-container class="text-align:start">

		<h1 class="text-primary" style="text-align: center;">Terms and Conditions Page</h1>

		<h1 style="text-align: center;">Terms and Conditions</h1>
		
		<v-row>
			<v-spacer></v-spacer>
			<v-col cols="4" style="text-align: center;">
					<p>www.DaBowe.com</p>
					221a Baker Street, 
					<p>Durham, North Carolina 27703</p>
					<p>919 333-4444</p>
			</v-col>
			<v-spacer></v-spacer>
		</v-row>

		<h2 class="my-5" style="text-align: center;">Last Updated: May 19, 2023</h2>

		<v-row>
			<v-spacer/>
			<v-col cols="12" style="text-align: start;">
				<h1>Introduction</h1>
				<p class="mx-10">These Terms and Conditions... Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

				<h1 class="my-5">Terms</h1>

				<h3 class="mb-5">Registration, Access and User.</h3>
				<p class="mx-10">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

			</v-col>
			<v-spacer/>
		</v-row>		
	</v-container>
</MasterLayout>
<!-- </v-app> -->
</template>

<script lang="ts" setup>
import MasterLayout from "../layouts/MasterLayout.vue";
import { useUserPiniaStore } from "../stores/user"
import { useTheme } from "vuetify";
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const theme = useTheme();
const piniaStore = useUserPiniaStore(); //initialize the piniaStore

/* ----------------------------------------------------------------------------- */
theme.global.name.value = piniaStore.Active_Theme
</script>