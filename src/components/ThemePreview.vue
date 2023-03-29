<template>
<div class="text-center">
	<div class="text-center">
		<v-card-text>
			<v-card color="blue-grey-darken-1" class="my-2" @click="updateActiveTheme(eachThemeName)" 
			v-for="(eachThemeName, themeIndex) in computedThemesKeysValue" :key="themeIndex">
				<v-list-item>
					<v-list-item-action>
						<div>
							<h1 style="display: inline; margin-right: 1em">{{ eachThemeName.toUpperCase() }}</h1>
						</div>
						<v-avatar v-if="uTheme.global.name.value === eachThemeName" color="success" size="30">
							<v-icon>mdi-check</v-icon>
						</v-avatar>
					</v-list-item-action>
				</v-list-item>
				<div class="text-center">
					<span v-for="colorArrayIndex in generateThemesWithAllColors()[themeIndex].colorArray.length">
						<v-chip :style="{ background: generateThemesWithAllColors()[themeIndex].colorArray[colorArrayIndex - 1].code }" label class="ma-1" :variant="chipVariant">
							<strong :style="{ color: generateThemesWithAllColors()[themeIndex].colorArray[colorArrayIndex - 1].code }"> {{ generateThemesWithAllColors()[themeIndex].colorArray[colorArrayIndex - 1].color }}</strong>
						</v-chip>
					</span>
					<br />
					<span v-for="colorArrayIndex in generateThemesWithAllColors()[themeIndex].colorArray.length">
						<v-chip :color="generateThemesWithAllColors()[themeIndex].colorArray[colorArrayIndex - 1].code" label class="ma-1" :variant="chipVariant">
							<strong>{{ generateThemesWithAllColors()[themeIndex].colorArray[colorArrayIndex - 1].color }}</strong>
						</v-chip>
					</span>
				</div>
			</v-card>
		</v-card-text>
	</div>
</div>
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
	var cArray: { color: string; code: string }[] = [];
	//// Create array to store the themes and related VideoColorSpace
	for (var i = 0; i < themeLength; i++) {
		//// Fetch the Theme name
		var tName = computedThemesKeysValue[i];
		// Fetch the Color elements
		var tColorProps = computedThemesEntriesValue[i][1].colors;
		Object.entries(tColorProps).forEach((e) => {
			if (e[0].includes("-")) return;
			var o = { color: e[0], code: e[1] };
			cArray.push(o);
		});
		//// create the themeObject
		var o = { theme: tName, colors: tColorProps, colorArray: cArray };
		themeObjs.push(o);
		//// Clear the cArray for the next theme pass
		cArray = [];
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

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
// import { Property } from "csstype";
export default defineComponent({
	name: "ThemeChanger",
	components: {},
});
</script>
