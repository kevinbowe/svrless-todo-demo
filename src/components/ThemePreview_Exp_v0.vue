<template>
<div class="text-center">
	<h1>ThemePreview (Exp v0)</h1>
	<div class="text-center">
		<v-card-text>
			<v-card  style="border:3px solid grey"
				class="my-2" @click="updateActiveTheme(eachThemeName)"
				:color="generateThemesWithAllColors()[themeIndex].colorArray[0].code"
				v-for="(eachThemeName, themeIndex) in computedThemesKeysValue" :key="themeIndex">
				<v-list-item>
					<v-list-item-action>
							<h1 class="text-grey" style="display: inline; margin-right: 1em">{{ eachThemeName.toUpperCase() }}</h1>
						<v-avatar v-if="uTheme.global.name.value === eachThemeName" color="success" size="30">
							<v-icon>mdi-check</v-icon>
						</v-avatar>
					</v-list-item-action>
				</v-list-item>
				<span v-for="colorArrayIndex in generateThemesWithAllColors()[themeIndex].colorArray.length">
					<v-chip :style="{ background: generateThemesWithAllColors()[themeIndex].colorArray[colorArrayIndex - 1].code }" label class="ma-1" :variant="chipVariant">
						<strong :style="{ color: generateThemesWithAllColors()[themeIndex].colorArray[colorArrayIndex - 1].code }"> 
							{{ generateThemesWithAllColors()[themeIndex].colorArray[colorArrayIndex - 1].displayColor }}</strong>
					</v-chip>
				</span>
				<br />
				<span v-for="colorArrayIndex in generateThemesWithAllColors()[themeIndex].colorArray.length">
					<v-chip :color="generateThemesWithAllColors()[themeIndex].colorArray[colorArrayIndex - 1].code" label class="ma-1" :variant="chipVariant">
						<strong>
							{{ generateThemesWithAllColors()[themeIndex].colorArray[colorArrayIndex - 1].displayColor }}</strong>
					</v-chip>
				</span>
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
	var cArray: { color: string; displayColor: string; code: string }[] = [];
	//// Create array to store the themes and related VideoColorSpace
	for (var i = 0; i < themeLength; i++) {
		//// Fetch the Theme name
		var tName = computedThemesKeysValue[i];
		//// Fetch the Color elements
		var tColorProps = computedThemesEntriesValue[i][1].colors;

		Object.entries(tColorProps).forEach((e) => {
			switch(e[0]){
				// case 'background':
				// case 'surface':
				// case 'primary':
				// case 'secondary':
				// case 'info':
				// 	cArray.push({color: e[0], code: e[1]});

				// case 'background':
				// 	cArray.push({color: "bgnd", displayColor: e[0], code: e[1]}); break
				// case 'surface':
				// 	cArray.push({color: "surf", displayColor: e[0], code: e[1]}); break
				// case 'primary':
				// 	cArray.push({color: "prime", displayColor: e[0], code: e[1]}); break
				// case 'secondary':
				// 	cArray.push({color: "scndry", displayColor: e[0], code: e[1]}); break
				// case 'info':
				//	cArray.push({color: "info", displayColor: e[0], code: e[1]}); break

				case 'background':
					cArray.push({color:e[0], displayColor: "background", code: e[1]}); break
				case 'surface':
					cArray.push({color: e[0], displayColor: "surface", code: e[1]}); break
				case 'primary':
					cArray.push({color: e[0], displayColor: "primary", code: e[1]}); break
				case 'secondary':
					cArray.push({color: e[0], displayColor: "secondary", code: e[1]}); break

				case 'info':
					cArray.push({color: e[0], displayColor: "info", code: e[1]}); break
				case 'error':
					cArray.push({color: e[0], displayColor: "error", code: e[1]}); break
				case 'success':
					cArray.push({color: e[0], displayColor: "success", code: e[1]}); break
				case 'warning':
					cArray.push({color: e[0], displayColor: "warning", code: e[1]}); break
				default :
				 	if (e[0].includes("-")) break
			}
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
