<template>
<v-app>
<MasterLayout>
	<ThemeChanger/>
	<div class="my-5"></div>
	<ThemePreview/>
</MasterLayout>
</v-app>
</template>

<script setup lang="ts">
	import MasterLayout from "../layouts/MasterLayout.vue";
	import ThemeChanger from "../components/ThemeChanger.vue"
	import ThemePreview from "../components/ThemePreview.vue"
	import { useUserPiniaStore } from "../stores/user"
	import { useTheme } from "vuetify";

	/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
	const piniaStore = useUserPiniaStore(); //initialize the piniaStore
	const theme = useTheme();

/* ----------------------------------------------------------------------------- */
theme.global.name.value = piniaStore.Active_Theme

</script>