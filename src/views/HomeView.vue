<template>
	<v-app>
		<MasterLayout>
			
			<h1>Home View</h1>
			<hr>
			<v-row class="my-5" justify="center">
				<v-sheet width="300" color="background" class="mx-auto">

					<!-- Put stuff here -->

				</v-sheet>
			</v-row>

		</MasterLayout>
	</v-app>
</template>

<script setup lang="ts">
import MasterLayout from "../layouts/MasterLayout.vue";
import {ref} from "vue"
import  { log, warn, err , progress, joy, info, enter,
			exit, success, bar, whitebar, fini, start, pass, fail }
	from "../my-util-code/MyConsoleUtil"
</script>

<style></style>