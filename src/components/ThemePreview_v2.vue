<template>
	<v-expansion-panels variant="popout">
		<v-expansion-panel>
			<v-expansion-panel-title color="grey-lighten-3">
				<template v-slot:default="{expanded}">
					ThemePreview
				</template>
			</v-expansion-panel-title>
			<v-expansion-panel-text class="text-center">
					<v-card-text style="padding:0 7px;">
						<v-card style="border:3px solid grey"
								class="my-2" @click="updateActiveTheme(eachThemeName)"
								:color="generateThemesWithAllColors()[themeIndex].colorArray[0].code"
								v-for="(eachThemeName, themeIndex) in computedThemesKeysValue" :key="themeIndex">
							<v-list-item>
								<v-list-item-action>
									<h2 class="text-grey" style="display: inline; margin-right: 1em">{{ eachThemeName.toUpperCase() }}</h2>
									<v-avatar v-if="uTheme.global.name.value === eachThemeName" color="success" size="30">
										<v-icon>mdi-check</v-icon>
									</v-avatar>
								</v-list-item-action>
							</v-list-item>
							<v-chip __BACKGROUND_CHIP_ONLY__ color="grey" label class="ma-1" :variant="chipVariant">
								<strong>{{ generateThemesWithAllColors()[themeIndex].colorArray[0].color }}</strong>
								<v-avatar variant="outlined" style="margin-left:1em" size="25"></v-avatar>
							</v-chip>
							<v-chip :color="generateThemesWithAllColors()[themeIndex].colorArray[colorArrayIndex].code" label class="ma-1" :variant="chipVariant"
									v-for="colorArrayIndex in generateThemesWithAllColors()[themeIndex].colorArray.length-1">
								<strong>{{ generateThemesWithAllColors()[themeIndex].colorArray[colorArrayIndex].color }}</strong>
								<v-avatar :style="{marginLeft:`1em`, background:generateThemesWithAllColors()[themeIndex].colorArray[colorArrayIndex].code } " size="25"></v-avatar>
							</v-chip>
						</v-card>
					</v-card-text>
			</v-expansion-panel-text>
		</v-expansion-panel>
	</v-expansion-panels>
</template>

<script setup lang="ts">
import { useTheme } from "vuetify";

const uTheme = useTheme();
const computedThemesKeysValue = Object.keys(uTheme.computedThemes.value);
const computedThemesEntriesValue = Object.entries(uTheme.computedThemes.value);
const chipVariant: any = "outlined";

//// Builds data for Theme Preview, Theme Switcher, and Left/Right Selector
const generateThemesWithAllColors = () => {
	//// Get the total number of themes.
	var themeLength = computedThemesKeysValue.length;
	var themeObjs = [];
	var colorArray: { color: string; code: string }[] = [];
	//// Create array to store the themes and related VideoColorSpace
	for (var i = 0; i < themeLength; i++) {
		//// Fetch the Theme name
		var themeName = computedThemesKeysValue[i];
		//// Fetch the Color elements
		var themeColorProps = computedThemesEntriesValue[i][1].colors;
		//// Filter the Theme Colors
		let colorFilter = ['background','surface','primary','secondary','info','error','success','warning','important']
		////	Look for matching colors
		let matches = Object.entries(themeColorProps).filter(val => colorFilter.includes(val[0]) )
		////	Hydrate the colorArray with matching colors
		matches.forEach(match => colorArray.push( {color: match[0], code: match[1]} ) )
		//// create a themeObject
		var o = { theme: themeName, colors: themeColorProps, colorArray: colorArray };
		themeObjs.push(o);
		//// Clear the colorArray for the next theme
		colorArray = [];
	}
	return themeObjs;
};

//// Update ActiveTheme
function updateActiveTheme(myTheme:string){
	//// Set the active theme to myTheme.
	////	The Theme Switcher and the left/right Theme selectors should NOT be changed.
	uTheme.global.name.value = myTheme;
}
</script>
<style>
.v-expansion-panel-text__wrapper {
    padding:0px;
}
</style>
