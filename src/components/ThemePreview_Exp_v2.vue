<template>
<div class="text-center">
	<v-expansion-panels>
		<v-expansion-panel>
			<v-expansion-panel-title 
					zzzcolor="surface-lighten-3"
					color="grey-lighten-3">
				<template v-slot:default="{expanded}">
					ThemePreview (Exp v2)
				</template>
			</v-expansion-panel-title>
			<v-expansion-panel-text>
				<div class="text-center">
					ThemePreview (Exp v2)
					<v-card-text>
						<v-card style="border:3px solid grey"
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
							<v-chip BACKGROUND_CHIP_ONLY color="grey" label class="ma-1" :variant="chipVariant">
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
				</div>
			</v-expansion-panel-text>
		</v-expansion-panel>
	</v-expansion-panels>
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
	// var cArray: { color: string; displayColor: string; code: string }[] = [];
	var cArray: { color: string; code: string }[] = [];
	//// Create array to store the themes and related VideoColorSpace
	for (var i = 0; i < themeLength; i++) {
		//// Fetch the Theme name
		var tName = computedThemesKeysValue[i];
		//// Fetch the Color elements
		var tColorProps = computedThemesEntriesValue[i][1].colors;

		Object.entries(tColorProps).forEach((e) => {
			switch(e[0]){
				case 'background':
					cArray.push({color:e[0], code: e[1]}); break
				case 'surface':
					cArray.push({color: e[0], code: e[1]}); break
				case 'primary':
					cArray.push({color: e[0], code: e[1]}); break
				case 'secondary':
					cArray.push({color: e[0], code: e[1]}); break

				case 'info':
					cArray.push({color: e[0], code: e[1]}); break
				case 'error':
					cArray.push({color: e[0], code: e[1]}); break
				case 'success':
					cArray.push({color: e[0], code: e[1]}); break
				case 'warning':
					cArray.push({color: e[0], code: e[1]}); break
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
