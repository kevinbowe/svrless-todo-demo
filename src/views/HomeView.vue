<!-- src/views/HomeView.vue -->
<template>
	<v-app>
		<MasterLayout>
			<h1 class="text-primary">Home</h1>
			<hr class="mb-10">

			<h1>Theme Dirty App</h1>
			<p>theme.global.name.value -- > [ {{ theme.global.name.value }} ]</p>
			<p>piniaStore.activeTheme -- > [ {{ piniaStore.activeTheme }} ]</p><br>
			
			<v-btn color="secondary" @click="onChangeSwitch">Toggle Theme</v-btn>

			<v-spacer style="height:1em;"></v-spacer>

			<v-btn color="grey-darken-2" class="ma-1" @click="piniaStore.deleteAllStores()">Delete Dev pinia Stores</v-btn><br>
			<v-btn color="grey-darken-2" class="ma-1" @click="resetAllStores">Reset Dev pinia Stores</v-btn><br>
			<v-btn color="grey-darken-2" class="ma-1" @click="piniaStore.clearAllStores()">Delete ( Dev & Auth ) pinia Stores</v-btn><br>
			This will Sign Out User

			<v-spacer style="height:1em;"></v-spacer>

			<h1>Counter App</h1>
			<p>(piniaStore) Count is {{ piniaStore.count }}</p>
			<p>(piniaStore) Double count is {{ piniaStore.doubleCount }}</p>

			<v-btn color="blue-grey-darken-2" class="ma-1" @click="piniaStore.increment(1)">Add</v-btn>
			<v-btn color="blue-grey-darken-2" class="ma-1" @click="piniaStore.decrement(1)">Subtract</v-btn>
			<v-btn color="blue-grey-darken-2" class="ma-1" @click="piniaStore.reset">Reset</v-btn>

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
import { useTheme } from "vuetify";
import { useUserPiniaStore } from "../stores/user"

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const piniaStore = useUserPiniaStore(); // initialize the piniaStore
const theme = useTheme();
const onChangeSwitch = () => {
					enter(`onChangeSwitch`)
	//				Toggle the light and dark themes based on the theme.current.value['dark'] which is a bool
	//				Any theme name can be used. 
	const themeCurrentDark = theme.current.value['dark']
					info(`WAS --> Theme --> ${themeCurrentDark ? 'light' : 'dark'}`)
	theme.global.name.value = themeCurrentDark ? 'light' : 'dark'
					info2(`IS --> Theme --> ${themeCurrentDark ? 'light' : 'dark'}`)
	piniaStore.activeTheme = theme.global.name.value
}
/* ----------------------------------------------------------------------------- */
const resetAllStores = () => {
	//				Do this to cause the watch (pinia.state) to fire.
	piniaStore.activeTheme = ""
	//				This will reset all piniaStore values.
	piniaStore.resetAllStores()
	theme.global.name.value = piniaStore.activeTheme
}
/* ----------------------------------------------------------------------------- */

theme.global.name.value = piniaStore.activeTheme

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
</script>

<style>
</style>../stores/user