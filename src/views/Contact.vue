<template>
<v-app>
<MasterLayout>
	<v-container>
		<v-col class="d-flex justify-center">
			<v-card width="50%" color="secondary" variant="tonal" class="text-h4">Contact-Info</v-card>
		</v-col>

		<p class="mt-5"> www.DaBowe.com</p>

		<p class="mt-5">828 Glenco Rd,</p>
		<p>Durham, North Carolina 27703</p>
		<p>919 272-7866</p>

		<p class="mt-5">Kevin Bowe (KB)</p>
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