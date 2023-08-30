<!-- src/views/HomeView.vue -->
<template>
	<v-app>
		<MasterLayout>
			<h1 class="text-primary">Home</h1>
			<hr class="mb-10">

			<h1>Theme Dirty App</h1>
			<p>theme.global.name.value -- > [ {{ theme.global.name.value }} ]</p>
			<hr>
			<p>Pina store</p>
			<p>{{ store }}</p>
			<br>
			<p>store.activeTheme -- > {{ store.activeTheme }}</p>
			<p>store.count -- > {{ store.count }}</p>

			<v-btn @click="onChangeSwitch">Toggle Theme</v-btn>

			<v-spacer style="height:3em;"></v-spacer>

			<v-btn @click="store.deleteCounterKeyStore()">Delete Counter_KEY Store</v-btn>
			<v-btn @click="store.deleteAllStores()">Delete All stores</v-btn><br>
			<v-btn @click="store.resetAllStores()">Reset All stores</v-btn><br>
			<v-btn @click="store.clearAllStores()">Clear All stores</v-btn><br>

			<v-spacer style="height:3em;"></v-spacer>

			<h1>Counter App</h1>
			<p>(Pinia Store) Count is {{ store.count }}</p>
			<p>(Pinia Store) Double count is {{ store.doubleCount }}</p>

			<v-btn @click="store.increment(1)">Add</v-btn>
			<v-btn @click="store.decrement(1)">Subtract</v-btn>
			<v-btn @click="store.reset">Reset</v-btn>

		</MasterLayout>
	</v-app>
</template>

<script setup lang="ts">
import MasterLayout from "../layouts/MasterLayout.vue";
/* ----------------------------------------------------------------------------- */
import { info, info1, info2 , info3, info4, info5, info6, info7 } from "../my-util-code/MyConsoleUtil"
import { enter, enter0, enter1, enter2, enter3, enter4, enter5, enter6, enter7 } from "../my-util-code/MyConsoleUtil"
import { bar, whitebar, greybar, redbar, greenbar, orangebar } from "../my-util-code/MyConsoleUtil"
/* ----------------------------------------------------------------------------- */


import { useCounterStore } from "../stores/counter"
import { useTheme } from "vuetify";

const store = useCounterStore(); //initialize the store
const theme = useTheme();

const onChangeSwitch = () => {
					enter(`onChangeSwitch`)
	//				Toggle the light and dark themes based on the theme.current.value['dark'] which is a bool
	//				Any theme name can be used. 
	const themeCurrentDark = theme.current.value['dark']
					info(`WAS --> Theme --> ${themeCurrentDark ? 'light' : 'dark'}`)
	theme.global.name.value = themeCurrentDark ? 'light' : 'dark'
					info2(`IS --> Theme --> ${themeCurrentDark ? 'light' : 'dark'}`)

	store.activeTheme = theme.global.name.value

}

theme.global.name.value = store.activeTheme

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
</script>

<style>
</style>