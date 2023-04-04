<template>
<v-app>
	
<v-btn class="pa-3 ma-5" to="/">Go To Home</v-btn>
<h1 class="text-primary">Dev View Content</h1>

<v-container class="text-center">
	<hr style="height:1em;background:black;">
	<ThemePreview_v2 />
	<!-- <hr style="height:1em;background:black;"> -->
	<!-- <ThemePreview_Exp_v2 /> -->
	<!-- <hr style="height:1em;background:black;"> -->
	<!-- <ThemePreview_v1 /> -->
	<!-- <hr style="height:1em;background:black;"> -->
	<!-- <ThemePreview_Exp_v0 /> -->
	<!-- <hr style="height:1em;background:black;"> -->
	<!-- <ThemePreview_Exp_v1 /> -->
</v-container>

</v-app>
</template>

<script lang="ts" setup>
// Experiments
import ThemePreview_Exp_v0 from "../components/ThemePreview_Exp_v0.vue";
import ThemePreview_Exp_v1 from "../components/ThemePreview_Exp_v1.vue";
import ThemePreview_Exp_v2 from "../components/ThemePreview_Exp_v2.vue";
// Latest version
import ThemePreview_v1 from "../components/ThemePreview_v1.vue";
import ThemePreview_v2 from "../components/ThemePreview_v2.vue";
</script>
