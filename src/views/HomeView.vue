<template>
	<v-app>
	<v-container class="text-center">
		<!-- <h3 class="pink lighten-4 red--text text--darken-4">Home Page Content -- class="pink lighten-4 red--text text--darken-4" -- FAILS.1</h3>
		<h3 class="bg-pink-lighten-4 text-red-darken-4">Home Page Content -- class="bg-pink-lighten-4 text-red-darken-4" -- WORKS.2</h3>
		<h3 class="text-light bg-dark">Home Page Content -- class="text-light bg-dark" -- FAILS.3</h3>
		<h3 class="text-dark">Home Page Content -- class="text-dark" -- FAILS.4</h3>
		<h3 class="text-grey">Home Page Content -- class="text-grey" -- WORKS.5</h3>
		<h3 class="text-danger">Home Page Content -- class="text-danger" -- FAIL.6</h3>
		<h3 class="text-blue">Home Page Content -- class="text-blue" -- WORKS.7 </h3>
		<h3 class="text-surface bg-primary">Home Page Content -- class="text-primary bg-secondary" -- WORKS.8 </h3>
		<h3 class="text-primary">Home Page Content -- class="text-primary" -- WORKS.9 </h3>
		<hr> -->

		<h1 class="text-primary">Home Page Content</h1>
			<ThemeChanger />
	</v-container>
</v-app>
</template>

<script lang="ts" setup></script>

<script lang="ts">
import ThemeChanger from "../components/ThemeChanger.vue";

export default {
    name: "MasterLayout",
    components: { 
		ThemeChanger 
	}
};
</script>