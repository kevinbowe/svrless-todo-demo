<template>
<v-app>
<MasterLayout>
	<v-col class="d-flex justify-center">
		<v-card width="60%" color="secondary" variant="tonal" class="text-h4">Terms and Conditions</v-card>
	</v-col>
	
	<p class="my-5"> www.DaBowe.com</p>

	<p>828 Glenco Rd,</p>
	<p>Durham, North Carolina 27703</p>
	<p>919 272-7866</p>

	<p class="my-5">Kevin Bowe (KB)</p>
	<p class="my-5 text-h5">Last Updated: May 19, 2023</p>

	<v-container>
			<v-row style="text-align:left;">
				<p class="mb-5 text-h4">Introduction</p>
				<p class="mx-10">These Terms and Conditions... Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
			</v-row>

			<v-row class="my-10 text-h4">Terms</v-row>
			
			<v-row style="text-align:left;">
				<p class="mb-5 text-h6">Registration, Access and User.</p>
				<p class="mx-10">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
			</v-row>
	</v-container>

</MasterLayout>
</v-app>
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