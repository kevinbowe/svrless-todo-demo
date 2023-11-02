<template>
<v-app>
<MasterLayout>
	<v-container class="text-align:start">

		<h1 style="text-align: center;">Contact Info</h1>
		
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

	</v-container>
</MasterLayout>
</v-app>
</template>

<script lang="ts" setup>
	import MasterLayout from "../layouts/MasterLayout.vue";
	import { useTheme } from "vuetify";
	import { useUserPiniaStore } from "../stores/user"
	
	const piniaStore = useUserPiniaStore(); // initialize the piniaStore
	const theme = useTheme();
	/* ----------------------------------------------------------------------------- */
	theme.global.name.value = piniaStore.Active_Theme
</script>