<template>
<v-app>
	<v-btn class="pa-3 ma-5" to="/">Go To Home</v-btn>
	<h1 class="text-primary">Dev View Content</h1>
	<v-container class="text-center">
		<ThemePreview />
	</v-container>
</v-app>
</template>

<script lang="ts" setup></script>

<script lang="ts">
import ThemePreview from "../components/ThemePreview.vue";

export default {
    name: "MasterLayout",
    components: { 
		ThemePreview
	}
};
</script>