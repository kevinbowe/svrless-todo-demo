<template>
<v-expansion-panels style="max-width:40em"  class="ma-auto" variant="popout">
	<v-expansion-panel>
		<v-expansion-panel-title 
		color="grey-lighten-3">
			<template v-slot:default="{expanded}">
				ThemePreview
			</template>
		</v-expansion-panel-title>
		<v-expansion-panel-text 
			class="text-center"
		>
			<v-card-text>
				<v-card :color="generateThemesWithAllColors()[themeIndex].colorArray[0].code" 
					class="my-2" style="border:3px solid grey"
					@click="updateA_Theme(eachThemeName)"
					v-for="(eachThemeName, themeIndex) in computedThemesKeysValue" :key="themeIndex"
				>
					<v-list-item>
						<v-list-item-action>
							<h2 class="text-grey mr-4">
								{{ eachThemeName.toUpperCase() }}
							</h2>
							<v-avatar color="success" size="30"
								v-if="uTheme.global.name.value === eachThemeName" 
							>
								<v-icon>mdi-check</v-icon>
							</v-avatar>
						</v-list-item-action>
					</v-list-item>
					<v-chip __BACKGROUND_CHIP_ONLY__ 
						color="grey" label :variant="chipVariant" class="ma-1" 
					>
						<strong>
							{{ generateThemesWithAllColors()[themeIndex].colorArray[0].color }}
						</strong>
						<v-avatar variant="outlined" size="25" class="ml-4" />
					</v-chip>
					<v-chip label :variant="chipVariant" 
						:color="generateThemesWithAllColors()[themeIndex].colorArray[colorArrayIndex].code" class="ma-1"
						v-for="colorArrayIndex in generateThemesWithAllColors()[themeIndex].colorArray.length-1"
					>
						<strong>
							{{ generateThemesWithAllColors()[themeIndex].colorArray[colorArrayIndex].color }}
						</strong>
						<v-avatar size="25" class="ml-4" 
							:style="{background:generateThemesWithAllColors()[themeIndex].colorArray[colorArrayIndex].code } " 
						></v-avatar>
					</v-chip>
					</v-card>
				</v-card-text>
		</v-expansion-panel-text>
	</v-expansion-panel>
</v-expansion-panels>
</template>

<script setup lang="ts">
import { useTheme } from "vuetify";
/* ----------------------------------------------------------------------------- */
import { bluebar, info, info1, info2 , info3, info4, info5, info6, info7, infor, pass, fail }
	from "../my-util-code/MyConsoleUtil" // Cant find this in Prod Build

import { enter, enter0, enter1, enter2, enter3, enter4, enter5, enter6, enter7 }
	from "../my-util-code/MyConsoleUtil" // Cant find this in Prod Build

import { bar, whitebar, greybar, redbar, greenbar, orangebar }
	from "../my-util-code/MyConsoleUtil" // Cant find this in Prod Build

import { log, warn, err2, err, progress, joy, infob, infog, infoy, infoo, infop,
		infom, exit, success, start, fini, pause, resume,
		exe, exe1, exe2, exe3, exe4, exe5, exe6, exe7, }
	from "../my-util-code/MyConsoleUtil" // Cant find this in Prod Build
/* -------------------------------------------------------------------------- */
const uTheme = useTheme();
const computedThemesKeysValue = Object.keys(uTheme.computedThemes.value);
const computedThemesEntriesValue = Object.entries(uTheme.computedThemes.value);
const chipVariant: any = "outlined";

const colorFilter = [
	'background','surface','primary','secondary',
	'info','error','success','warning','important',
	'minor', 'major','link', 'border']

const themeLength = computedThemesKeysValue.length;

type colorArrayType = { color: string; code: string }
type themeObjsType = { theme: string, colorArray: colorArrayType[] }

// Build data for Theme Preview, Theme Switcher, and Left/Right Selector
const generateThemesWithAllColors = () => {
	let themeObjs: themeObjsType[] = [];
	let colorArray: colorArrayType [] = [];
	
	// Create array to store the themes and related VideoColorSpace
	for (let i = 0; i < themeLength; i++) {

		// 			Fetch the Theme name
		//				This will return [ light | dark | light_custom | dark_custom ]
		let themeName = computedThemesKeysValue[i];

		//				This will return the properties I set/created AND other properties
		//				like: surface_variant, on-surface_variant, 
		let themeColorProps = computedThemesEntriesValue[i][1].colors;

		//				Look for matching colors
		//				This builds a list of matches in the colorFilter.
		let matches = Object.entries(themeColorProps).filter(val => colorFilter.includes(val[0]) )

		//	Hydrate the colorArray with matching colors
		matches.forEach(match => colorArray.push( {color: match[0], code: match[1]} ) )

		// 			Create a themeObject
		let themeObj: themeObjsType = { theme: themeName, colorArray: colorArray };
		themeObjs.push(themeObj);
		// 			Clear the colorArray for the next theme
		colorArray = [];
	}
	// whitebar()
	return themeObjs;
};

// Update A_Theme
function updateA_Theme(myTheme:string){
	uTheme.global.name.value = myTheme;
}
</script>

<style>
	.v-expansion-panel-text__wrapper { padding:0px; }
</style>



