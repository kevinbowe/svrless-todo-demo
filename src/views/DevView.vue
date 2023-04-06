<template>
<v-app>
<MasterLayout_v2>
	<v-container class="text-center">
		<h1 class="text-primary">Dev Page Content</h1>
		<ThemeChanger />
	</v-container>
</MasterLayout_v2>
</v-app>
</template>

<script lang="ts" setup>
import ThemeChanger from "../components/ThemeChanger.vue";
import MasterLayout_v1 from "../layouts/MasterLayout_v1.vue";
import MasterLayout_v2 from "../layouts/MasterLayout_v2.vue";
</script>
