<template>
<v-app>
<MasterLayout>
	<h1>Home</h1>
	<v-row class="my-5" justify="center">
			<v-sheet width="300" color="background" class="mx-auto">
				<h1>EXPERIMENT</h1>
				<v-btn color="blue" @click="testClick" block class="mt-2">Submit -- Experiment</v-btn>
			</v-sheet>
	</v-row>
</MasterLayout>
</v-app>
</template>

<script setup lang="ts">
import MasterLayout from "../layouts/MasterLayout.vue";
import {ref} from "vue"
import  { log, warn, err , progress, joy, info, enter, exit, success, bar, whitebar, fini, start } from "../my-util-code/MyConsoleUtil"
// import "../my-util-code/MyConsoleUtil"
const testClick = (input:string) => {
																											whitebar(" <--<<< START"); 
	let rtn = PTest()
																											bar(" <--<<< Fini"); 
}

function PTest() { 
enter("PTest")

exit("PTest")
}

</script>

<style>
/* Documentation Example
	.amplify-button[data-variation='primary'] 
	{ background: linear-gradient( to right, var(--amplify-colors-green-80), var(--amplify-colors-orange-40) );} */

.amplify-button--link {
	color: rgb(var(--v-theme-primary));
}

.amplify-button[data-variation='primary'] {
	background-color: rgb(var(--v-theme-primary));
}

.amplify-tabs-item {
	color: rgb(var(--v-theme-primary));
}

.amplify-tabs-item:focus {
	color: rgb(var(--v-theme-primary));
}

.amplify-tabs-item:hover {
	color: rgb(var(--v-theme-primary));
}

.amplify-tabs-item[data-state=active] {
	color: rgb(var(--v-theme-primary));
	border-color: rgb(var(--v-theme-primary));
}</style>