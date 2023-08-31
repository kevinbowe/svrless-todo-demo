<!-- src/views/HomeView.vue -->
<template>
	<v-app>
		<MasterLayout>
			<h1 class="text-primary">Home</h1>
			<hr class="mb-10">

			<h1>Theme Dirty App</h1>
			<p>theme.global.name.value -- > [ {{ theme.global.name.value }} ]</p>
			<hr>
			<p>PinaStore</p>
			<p>{{ piniaStore }}</p>
			<br>
			<p>piniaStore.activeTheme -- > {{ piniaStore.activeTheme }}</p>
			<p>piniaStore.count -- > {{ piniaStore.count }}</p>

			<v-btn @click="onChangeSwitch">Toggle Theme</v-btn>

			<v-spacer style="height:3em;"></v-spacer>

			<v-btn @click="piniaStore.deleteCounterKeyStore()">Delete Counter_KEY piniaStore</v-btn>
			<v-btn @click="piniaStore.deleteAllStores()">Delete All piniaStores</v-btn><br>
			<v-btn @click="piniaStore.resetAllStores()">Reset All piniaStores</v-btn><br>
			<v-btn @click="piniaStore.clearAllStores()">Clear All piniaStores</v-btn><br>

			<v-spacer style="height:3em;"></v-spacer>

			<h1>Counter App</h1>
			<p>(piniaStore) Count is {{ piniaStore.count }}</p>
			<p>(piniaStore) Double count is {{ piniaStore.doubleCount }}</p>

			<v-btn @click="piniaStore.increment(1)">Add</v-btn>
			<v-btn @click="piniaStore.decrement(1)">Subtract</v-btn>
			<v-btn @click="piniaStore.reset">Reset</v-btn>

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

theme.global.name.value = piniaStore.activeTheme

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
</script>

<style>
</style>../stores/user