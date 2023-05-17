<template>
	<v-app>
		<MasterLayout>
		<h1>Dev View</h1>
			<v-row class="my-5" justify="center">
				<v-sheet width="300" color="background" class="mx-auto">
					<h1>EXPERIMENT</h1>
					<div class="my-5"><hr></div>
					<v-btn @click="doSomething" block class="mt-2">Submit</v-btn>
						{{ something }}
				</v-sheet>
			</v-row>
		</MasterLayout>
	</v-app>
</template>

<script setup lang="ts">
import MasterLayout from "../layouts/MasterLayout.vue";
import {Ref, ref} from "vue"


import { info, infor , infog, infob, infoy, infoo, infop, infom,
			info1, info2 , info3, info4, info5, info6, info7,
			log, warn, err , progress, joy, enter, exit,
			success, bar, whitebar, fini, start, pass, fail }
	from "../my-util-code/MyConsoleUtil"

	const something:Ref<string> = ref<string>("")
	const doSomething = () => {something.value = "Results of selecting Submit Btn"}
</script>

<style></style>