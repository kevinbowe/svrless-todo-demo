<template>
	<v-chip-group v-for="theme in themes">
		<div v-if="props.id ==='left'">
			<v-chip v-if="theme === piniaStore.authLightTheme" style="color:white;background-color: magenta;"> {{ theme }} </v-chip>
			<v-chip v-else @click="setLeft(theme)"> {{ theme }}</v-chip>
		</div>
		<div v-if="props.id ==='right'">
			<v-chip v-if="theme === piniaStore.authDarkTheme" style="color:black;background-color: yellow;"> {{ theme }} </v-chip>
			<v-chip v-else @click="setRight(theme)"> {{ theme }}</v-chip>
		</div>
	</v-chip-group>
</template>


<!-- <template>
	<p>{{ props.id }}</p>
	<p>{{ props.id === 'right' ? piniaStore.activeTheme : piniaStore.inactiveTheme  }}</p>
	<v-chip-group v-for="theme in themes"> -->
	<!-- <v-chip-group> -->
		<!-- <v-chip class="ma-2" style="color:white;background-color: grey;">FINDME-1</v-chip> -->
		<!-- <v-chip class="ma-2" style="color:red;background-color: pink;">FINDME-2</v-chip> -->
		<!-- <v-chip v-for="theme in themes"> -->
			<!-- <v-chip>
				<div v-if="props.id ==='left'">
					<div v-if="theme === piniaStore.activeTheme" style="color:red;">
					{{ theme }} </div>
					<div v-else>{{ theme }}</div>
				</div>
				<div v-if="props.id ==='right'">
					<div v-if="theme === piniaStore.inactiveTheme" style="color:red;">
					{{ theme }} </div>
					<div v-else>{{ theme }}</div>
				</div>
		</v-chip>
	</v-chip-group>

</template> -->

<script setup lang="ts">
import { ref, computed } from "vue";
import { useTheme } from "vuetify";
/* ----------------------------------------------------------------------------- */
import { info, info1, info2 , info3, info4, info5, info6, info7 } from "../../my-util-code/MyConsoleUtil"
import { enter, enter0, enter1, enter2, enter3, enter4, enter5, enter6, enter7 } from "../../my-util-code/MyConsoleUtil"
import { bar, whitebar, greybar, redbar, greenbar, orangebar } from "../../my-util-code/MyConsoleUtil" 
import { pass, fail } from "../../my-util-code/MyConsoleUtil"
/* ----------------------------------------------------------------------------- */
import { useUserPiniaStore } from "../../stores/user"

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const piniaStore = useUserPiniaStore(); // initialize the piniaStore

// const theme = useTheme();
// const themeVals = Object.keys(theme.computedThemes.value);

const props = defineProps({
 	themeList: Array<string|undefined>,
	id: String
})

const themes = ref(props.themeList)
const id = ref(props.id)

const setRight = (theme) => { enter(`setRight(theme) ${theme}`) }
const setLeft = (theme) => { enter(`setLeft(theme) ${theme}`) }

</script>