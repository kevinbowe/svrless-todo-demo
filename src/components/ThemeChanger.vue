<template>
<!-- <v-app> -->
	<!-- <v-container class="text-center"> -->
	<div class="text-center">
		<h1 class="text-left">Theme Switcher</h1>
		<!-- ORIGINAL: -->
		<!-- <v-switch  @change="toggleDarkMode" :label="`toggle ${switchLabel} mode`" density="compact" :flat="true"/> -->
		<v-switch @change="toggleDarkMode" :label="`toggle ${altThemeName} mode`" density="compact" :flat="true" inset/>
		<div class="text-left"> Toggle Theme {{ altThemeName }}</div>
		<v-btn @click="computedColors(0)">Debug</v-btn>
		<div class="text-center">
			<v-card-text>
				<v-card color="blue-grey-darken-1" class="my-2" @click="setTheme(eachThemeName)" 
				v-for="(eachThemeName, themeIndex) in computedThemesKeysValue" :key="themeIndex">
					<v-list-item>
						<v-list-item-action>
							<div>
								<h1 style="display:inline;margin-right:1em;">{{eachThemeName.toUpperCase() }}</h1>
							</div>
							<v-avatar v-if="uTheme.global.name.value === eachThemeName" color="success" size="30">
								<v-icon>mdi-check</v-icon>
							</v-avatar>
						</v-list-item-action>
					</v-list-item>
					<!-- Display each Color Name in the Theme -->
					<div class="text-center">
						<span v-for="colorArrayIndex in allThemesAndColors[themeIndex].colorArray.length">
							<v-chip :style="{background: allThemesAndColors[themeIndex].colorArray[colorArrayIndex-1].code}" 
								label class="ma-1" :variant="chipVariant">
								<strong :style="{color: allThemesAndColors[themeIndex].colorArray[colorArrayIndex-1].code}">
									{{ allThemesAndColors[themeIndex].colorArray[colorArrayIndex-1].color }}</strong>
							</v-chip>
						</span>
						<br>
						<span v-for="colorArrayIndex in allThemesAndColors[themeIndex].colorArray.length">
							<v-chip :color="allThemesAndColors[themeIndex].colorArray[colorArrayIndex-1].code"
								label class="ma-1" :variant="chipVariant">
								<strong>{{ allThemesAndColors[themeIndex].colorArray[colorArrayIndex-1].color }}</strong>
							</v-chip>
						</span>
					</div>
				</v-card>
			</v-card-text>
		</div>
	</div>
	<!-- </v-container> -->
<!-- </v-app> -->
</template>

<script setup lang="ts">
import { ThemeInstance, useTheme } from "vuetify";
const uTheme = useTheme();
const computedThemesKeysValue = Object.keys(uTheme.computedThemes.value)
const computedThemesEntriesValue = Object.entries(uTheme.computedThemes.value)
const chipVariant:string = "outlined"
const generateThemesWithAllColors = () => {
	// Get the total number of themes.
	var themeLength = computedThemesKeysValue.length
	
	var themeObjs = []
	var cArray: { color: string; code: string; }[] = []
	
	// Create array to store the themes and related VideoColorSpace
	for(var i=0; i < themeLength; i++)
	{
		// Fetch the Theme name
		var tName = computedThemesKeysValue[i]
		
		// Fetch the Color elements
		var tColorProps =	computedThemesEntriesValue[i][1].colors

		Object.entries(tColorProps).forEach((e) => {
			if (e[0].includes('-')) return;
			var o ={"color":e[0], "code":e[1]}
			cArray.push(o)
		})

		// create the themeObject
		var o = {"theme": tName, "colors": tColorProps, "colorArray":cArray}
		themeObjs.push(o);

		// Clear the cArray for the next theme pass
		cArray = [];
	}

	return themeObjs
}
const allThemesAndColors = generateThemesWithAllColors()

const setTheme = (myTheme: string) => { uTheme.global.name.value = myTheme; };

// This needs to be computed
let altThemeName = ""


//// This performs the ACTUAL theme toggle
////	ORIGINAL
// const toggleDarkMode = () => { uTheme.global.name.value = uTheme.current.value.dark ? "light" : "dark"; }

////	DEV-WORKS
////	This version displays the name of the ACTIVE Theme.
// const toggleDarkMode = () => { 
// 	uTheme.global.name.value = uTheme.current.value.dark ? "light_custom" : "dark_custom"; 
// }

const toggleDarkMode = () => { 
		console.log("-------------------------------------------")
	altThemeName = uTheme.global.name.value
		console.log("Old Theme ",altThemeName)

	uTheme.global.name.value = uTheme.current.value.dark ? "light_custom" : "dark_custom"; 
		console.log("New Theme", uTheme.global.name.value)
		console.log("Alt Theme >>>---> ", altThemeName)
}


</script>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
export default defineComponent({
	name: "ThemeChanger",
	components: {
	},
});
</script>