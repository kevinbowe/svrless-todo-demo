<template>
<v-app>
	<MasterLayout>
	<v-container class="text-center">
		<h1 class="text-primary">Dev Page Content</h1>
		<ThemeChanger />
	</v-container>
</MasterLayout>
</v-app>
</template>

<script lang="ts" setup>
import ThemeChanger from "../components/ThemeChanger.vue";
import MasterLayout from "../layouts/MasterLayout.vue";
</script>
