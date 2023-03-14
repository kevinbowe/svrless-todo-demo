<template>
	<v-app>
		<div class="text-center">
			<v-menu v-model="menu" :close-on-content-click="false" location="end">
				<template v-slot:activator="{ props }">
					<v-btn color="indigo" v-bind="props">
						<v-icon size="30" color="primary">mdi-palette</v-icon>
					</v-btn>
				</template>
				<v-card-text>
					<!-- <v-card class="my-2" :disabled="$vuetify.theme.themes.name === theme.name" @click="setTheme(theme)" hover outlined v-for="(theme, index) in themes" :key="index"> -->
					<!-- <v-card class="my-2" @click="setTheme(myTheme)" v-for="(myTheme, index) in myThemes" :key="index" > -->
					<!-- <v-card class="my-2" @click="readAllThemes(uTheme)" v-for="(myTheme, index) in myThemes" :key="index" > -->

					<!-- 	const themes = Object.entries(uTheme.computedThemes.value); -->
					
					<!-- <v-card class="my-2" @click="readAllThemes(uTheme)" v-for="(myTheme, index) in Object.keys(uTheme.computedThemes.value)" :key="index" > -->
					<v-card class="my-2" v-for="(eachThemeName, themeIndex) in Object.keys(uTheme.computedThemes.value)" :key="themeIndex" >
						<v-list-item>
							<!-- Display Theme Name -->
							<v-list-item-title class="font-weight-bold">
								Theme Name (eachThemeName) -- [{{ eachThemeName }}]&nbsp&nbsp | &nbsp&nbsp Index -- [{{ themeIndex }}]
							</v-list-item-title>
							<!-- Display Checkmark when Theme is selected/active -->
							<v-list-item-action>
								<v-avatar v-if="uTheme.global.name.value === eachThemeName" 
									color="success" size="30">
										<v-icon>mdi-check</v-icon>
								</v-avatar>
							</v-list-item-action>
						</v-list-item>

						<!-- DEBUG BUTTON --> <div class="my-2"> <v-chip @click=loadAllColorsXXX(themeIndex) class="mx-1" label> Top Row </v-chip> </div>
						
						<!-- Display each color in a specific Theme 
						     BAD -- Displays the unique Theme and Color-Hex but is missing the Name of the Color -->
						<div class="my-2">
							<v-chip v-for="(colorCode,colorName) in Object.entries(uTheme.computedThemes.value)[themeIndex][1].colors" colorName="colors"
								:color="colorCode" class="mx-1" label 
							>
								{{ colorName }}<br>
								{{ colorCode }}
							</v-chip>
						</div>

						<!-- BAD -- Display each color in a specific Theme 
						BAD -- Displays the SAME colors from each Theme -->
						<!--<div class="my-2">
							<v-chip v-for="(key) in loadAllColors()"
								:color="key[1]" class="mx-1" label 
							>
								{{ key[0] }}
								{{ key[1] }}
							</v-chip>
						</div> -->

					</v-card>
				</v-card-text>
			</v-menu>
		</div>
	</v-app>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useTheme } from "vuetify";
import { computed } from "vue";
const menu = ref(false);
const uTheme = useTheme();

function loadAllColorsXXX(themeIndex: number  ) {
	// console.log("Passed index")
	// 	console.log(themeIndex)
	// console.log("Computed Theme at index [" + themeIndex + "]")
	// 	console.log(Object.entries(uTheme.computedThemes.value)[themeIndex])
	// console.log("Computed Theme Color Properties at index [" + themeIndex + "][1].colors")
	// 	console.log(Object.entries(uTheme.computedThemes.value)[themeIndex][1].colors)
	const themes = Object.entries(uTheme.computedThemes.value);
	// const targetTheme = themes[themeIndex]
	// console.log("targetTheme")
	// console.log(targetTheme);


	//for (var themeForIndex in themes) {
		// console.log("Current Theme ForIndex"); 
		// // console.log(themeForIndex)
		// console.log(themeIndex)

		// [tt] contains all property names in [colors] object
		// var tt = themes[themeForIndex][1].colors;
		var tt = themes[themeIndex][1].colors;
		// console.log("themes[themeForIndex][1].colors"); console.log(tt)
	
		// Display all color names in the theme.
		for(var i=0; i < Object.entries(themes[themeIndex][1].colors).length; i++ ) {
			console.log("Color-Name: [" + Object.entries(tt)[i][0] + "] == Code: [" + Object.entries(tt)[i][1] + "]")
		}
		
		console.log(themes[themeIndex][0]);

	//}
}

function loadAllColors() {
	// This version repeats the SAME colors from each Theme.
	const themes = Object.entries(uTheme.computedThemes.value);
	var colors = null;
	for (var theme in themes) {
		//console.log(`Theme Name == ` + themes[theme][0])

		// [tt] contains all property names in [colors] object
		var tt = Object.entries(uTheme.computedThemes.value)[theme][1].colors;

		// Display all color names in the theme.
		colors = Object.entries(tt);
		//  for(var i=0; i < colors.length; i++ ) {
		//  	console.log("Color-Name: [" + colors[i][0] + "] == Code: [" + colors[i][1] + "]")
	 	// }
	}
	return colors;
}

// EXPERIMENT
// Fetch each theme
// Report the names
function readAllThemes(uThemes: object ) {
	const themes = Object.entries(uTheme.computedThemes.value);
	for (var theme in themes) {
		console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
		console.log(`Theme Name == ` + themes[theme][0])

		// [tt] contains all property names in [colors] object
		var tt = Object.entries(uTheme.computedThemes.value)[theme][1].colors;

		// Display all color names in the theme.
		var colors = Object.entries(tt);
		for(var i=0; i < colors.length; i++ ) {
			console.log("Color-Name: [" + colors[i][0] + "] == Code: [" + colors[i][1] + "]")
	 	}
	}
}
// EXPERIMENT
function setTheme(myTheme: string ) { uTheme.global.name.value = myTheme }
// EXPERIMENT
function getAllThemes(){ var keys = Object.entries(uTheme.global.current.value.colors);};
</script>
