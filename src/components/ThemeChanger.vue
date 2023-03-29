<template>
	<!-- <v-app> -->
	<!-- <v-container class="text-center"> -->
	<div class="text-center">
		<h1 class="text-left">Theme Switcher</h1>
		<v-switch @change="onChangeTheme" :label="`Toggle [${altThemeName}] Theme`" density="compact" :flat="true" inset />

		<!-- EXPERIMENT-1 ------------------------------------------------------------------------------------------------ -->
		<!-- <p class="text-center" v-if="selectTheme"><br />SELECTED VALUE [ {{ selectTheme.value }} ]</p><br />

		<v-select 
		label="Select Theme" 
		__StyleOfControl __variant="plain" variant="outlined"
		direction="vertical"
		__SizeOfControl_NotDropDown density="compact" __density="comfortable" __xdensity="default"
		v-model="selectTheme" 
		:items="computedThemesKeysValue"  
		class="class=text-left pa-3 ma-3">
			<template v-slot:selection>
				{{ selectTheme.value }} 
			</template>
			<template v-slot:item="item">
				<v-list-item @click="updateTheme(item)" style="color:pink;height:0px;margin:0px;padding:0px;">
					<v-list-item @click="updateTheme(item)">
					{{ item.props.title }}
				</v-list-item>
			</template>
		</v-select> -->

		<!-- WORKING -->
		<p class="text-center" v-if="selectedThemeModelLeft"><br />LEFT SELECTED VALUE [ {{ selectedThemeModelLeft }} ]</p><br />

		<p class="text-left"> Left Theme Selector</p>
		<v-select label="Select Theme" 
		v-model="selectedThemeModelLeft" 
		:items="computedThemesKeysValue"  
		class="class=text-left pa-3 ma-3">
			<template v-slot:selection>
				{{ selectedThemeModelLeft }} 
			</template>
			<template v-slot:item="item">
				<v-list-item @click="updateSelectorAndTheme(item, false /* Left Selector */)">
					{{ item.props.title }}
				</v-list-item>
			</template>
		</v-select>

		<p class="text-center" v-if="selectedThemeModelLeft"><br />RIGHT SELECTED VALUE [ {{ selectedThemeModelRight }} ]</p><br />
		<p class="text-left"> Right Theme Selector</p>
		<v-select label="Select Theme" 
		v-model="selectedThemeModelRight" 
		:items="computedThemesKeysValue"  
		class="class=text-left pa-3 ma-3">
			<template v-slot:selection>
				{{ selectedThemeModelRight }} 
			</template>
			<template v-slot:item="item">
				<v-list-item @click="updateSelectorAndTheme(item, true /* Right Selector */)">
					{{ item.props.title }}
				</v-list-item>
			</template>
		</v-select>

		<div class="text-center">
			<v-card-text>
				<v-card color="blue-grey-darken-1" class="my-2" @click="updatePreview(eachThemeName)" 
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
						<span v-for="colorArrayIndex in allThemesAndColors[themeIndex].colorArray.length">
							<v-chip :style="{ background: allThemesAndColors[themeIndex].colorArray[colorArrayIndex - 1].code }" label class="ma-1" :variant="chipVariant">
								<strong :style="{ color: allThemesAndColors[themeIndex].colorArray[colorArrayIndex - 1].code }"> {{ allThemesAndColors[themeIndex].colorArray[colorArrayIndex - 1].color }}</strong>
							</v-chip>
						</span>
						<br />
						<span v-for="colorArrayIndex in allThemesAndColors[themeIndex].colorArray.length">
							<v-chip :color="allThemesAndColors[themeIndex].colorArray[colorArrayIndex - 1].code" label class="ma-1" :variant="chipVariant">
								<strong>{{ allThemesAndColors[themeIndex].colorArray[colorArrayIndex - 1].color }}</strong>
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
import { useTheme } from "vuetify";
const uTheme = useTheme();
const computedThemesKeysValue = Object.keys(uTheme.computedThemes.value);
const computedThemesEntriesValue = Object.entries(uTheme.computedThemes.value);
const chipVariant: any = "outlined";
const defaultLightTheme: string = "light";
const defaultDarkTheme: string = "dark";
const altThemeName = ref("");
altThemeName.value = defaultDarkTheme;
uTheme.global.name.value = defaultLightTheme;
let ThemeSwitchFlag = false // false == left
let selectedThemeModelLeft:string = "light"
let selectedThemeModelRight:string = "dark"

// This is called by the <v-switch>/Toggle Theme
const onChangeTheme = () => {
	// toggle the ThemeSwitchFlag
	ThemeSwitchFlag = !ThemeSwitchFlag;
	//Set the new active theme to the opposit of the current active theme
	uTheme.global.name.value = uTheme.global.name.value === selectedThemeModelLeft ? selectedThemeModelRight : selectedThemeModelLeft;
	// Update the Toggle Theme lable to display the 'alt' theme.
	altThemeName.value = uTheme.global.name.value === selectedThemeModelLeft ? selectedThemeModelRight : selectedThemeModelLeft;
};

const generateThemesWithAllColors = () => {
	// Get the total number of themes.
	var themeLength = computedThemesKeysValue.length;
	var themeObjs = [];
	var cArray: { color: string; code: string }[] = [];
	// Create array to store the themes and related VideoColorSpace
	for (var i = 0; i < themeLength; i++) {
		// Fetch the Theme name
		var tName = computedThemesKeysValue[i];
		// Fetch the Color elements
		var tColorProps = computedThemesEntriesValue[i][1].colors;
		Object.entries(tColorProps).forEach((e) => {
			if (e[0].includes("-")) return;
			var o = { color: e[0], code: e[1] };
			cArray.push(o);
		});
		// create the themeObject
		var o = { theme: tName, colors: tColorProps, colorArray: cArray };
		themeObjs.push(o);
		// Clear the cArray for the next theme pass
		cArray = [];
	}
	return themeObjs;
};

const allThemesAndColors = generateThemesWithAllColors();

// Update Preview only
function updatePreview(myTheme:string){
	// Set the active theme to myTheme.
	//	The Theme Switcher and the left/right Theme selectors should NOT be changed.
	uTheme.global.name.value = myTheme;
}

// This is called when a Option/Item is selected.
function updateSelectorAndTheme(itemTheme: { props: { value: string; }; }, selectorSide: boolean ) { 
	if (!selectorSide /* false -- left */){
		// This is going to set the selected left model based on the left item that was selected.
		selectedThemeModelLeft = itemTheme.props.value;

	} else { /* true -- right */
		// This is going to set the selected right model based on the left item that was selected.
		selectedThemeModelRight = itemTheme.props.value;
	}
	// The updates the active theme for the whole system.
	UpdateTheme(itemTheme.props.value, selectorSide)
}

const UpdateTheme = (myTheme: string, ThemeSelectorSide: boolean) => {
	// Which switch is currently active (left or right)?
	if(!ThemeSwitchFlag /* false == left-switch | true == right */) {
		// If we get here, the switch is set to the left... (false)

		// Which selected theme (left or right) got passed to this function?
		if(!ThemeSelectorSide /* false == left-selected */) {
			// If we get here, the active theme should be updated.

			uTheme.global.name.value = myTheme;

		} else {
			// If we get here, the right-selected was passed in.
			
			// Update the switch label to be equal to the right-selected value
			altThemeName.value = myTheme;
		}
	} else {
		//--------------------------------------------------
		// If we get here, the switch is set to the right... (true)

		// Which theme selector (left or right) got passed to this function?
		if(ThemeSelectorSide /* true == right-selected */){
			// If we get here, the active theme should be updated.

			uTheme.global.name.value = myTheme;

		} else {
			// If we get here, the left-selected was passed in.

			// Update the switch label to be equal to the left-selected value <<VERIFY>>
			altThemeName.value = myTheme;
		}
	}
};
</script>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
// import { Property } from "csstype";
export default defineComponent({
	name: "ThemeChanger",
	components: {},
});
</script>
