<template>
	<v-app>
		<MasterLayout>
        <v-container fluid class="fill-height justify-center" >
				<p class="text-h3"> ~~ Future ~~</p>
			</v-container>
		</MasterLayout>
	</v-app>
</template>

<script setup lang="ts">
	import MasterLayout from "../layouts/MasterLayout.vue";

	import { useTheme } from "vuetify";
	import { useUserPiniaStore } from "../stores/user"
	
	const piniaStore = useUserPiniaStore(); // initialize the piniaStore
	const theme = useTheme();
	/* ----------------------------------------------------------------------------- */
	theme.global.name.value = piniaStore.Active_Theme

</script>