<template>
	<v-app>
		<MasterLayout>
		<h1>Dev View 5</h1>
			<v-row class="my-5" justify="center">
				<v-sheet width="300" color="background" class="mx-auto">
					<h1>EXPERIMENT</h1>
					<div class="my-5"><hr></div>

					<v-text-field 
						v-model="confirmCodeModel" 
						id="ConfCode" 
						placeholder="Enter your code" 
						class="mb-2" 
						style="height:1.75em;" 
						variant="outlined" 
						clearable 
						density="compact"
					></v-text-field>

					<p class="mt-5"> Confirm Code Model [ {{ confirmCodeModel }} ]</p>

					<v-btn 
						:disabled="!confirmCodeModel"
						color="primary"
						@click="doSomething" 
						block 
						class="mt-8"
					> Submit </v-btn>
					<p class="mt-5"> Something [ {{ something }} ]</p>

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
	const doSomething = () => {something.value = "Submit Btn Selected"}

	const confirmCodeModel:Number = ref()


</script>

<style></style>