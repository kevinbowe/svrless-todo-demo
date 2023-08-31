<template>
	<v-app>
		<MasterLayout>
		<h1>Dev 1</h1>
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
import { useUserPiniaStore } from "../stores/user"
import { useTheme } from "vuetify";

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const theme = useTheme();
const piniaStore = useUserPiniaStore(); //initialize the piniaStore
const something:Ref<string> = ref<string>("")
const doSomething = () => {something.value = "Results of selecting Submit Btn"}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

theme.global.name.value = piniaStore.activeTheme
</script>

<style></style>