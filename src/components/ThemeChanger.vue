<template>
	<!-- <v-app> -->
	<!-- <v-container class="text-center"> -->
	<div class="text-center">
		<h1 class="text-left">Theme Switcher</h1>
		<v-switch @change="onChangeTheme" :label="`Toggle [${altThemeName}] Theme`" density="compact" :flat="true" inset />

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

		<!-- PREVIEW BLOCK -->
		<ThemePreview></ThemePreview>
		<!-- <div class="text-center">
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
		</div> -->
	</div>
	<!-- </v-container> -->
	<!-- </v-app> -->
</template>

<script setup lang="ts">
import { useTheme } from "vuetify";
const uTheme = useTheme();
const computedThemesKeysValue = Object.keys(uTheme.computedThemes.value);
const defaultLightTheme: string = "light";
const defaultDarkTheme: string = "dark";
const altThemeName = ref("");
altThemeName.value = defaultDarkTheme;
uTheme.global.name.value = defaultLightTheme;
let ThemeSwitchFlag = false // false == left
let selectedThemeModelLeft:string = "light"
let selectedThemeModelRight:string = "dark"

//// This is called by the <v-switch>/Toggle Theme
const onChangeTheme = () => {
	//// toggle the ThemeSwitchFlag
	ThemeSwitchFlag = !ThemeSwitchFlag;
	//// Set the new active theme to the opposit of the current active theme
	uTheme.global.name.value = uTheme.global.name.value === selectedThemeModelLeft ? selectedThemeModelRight : selectedThemeModelLeft;
	//// Update the Toggle Theme lable to display the 'alt' theme.
	altThemeName.value = uTheme.global.name.value === selectedThemeModelLeft ? selectedThemeModelRight : selectedThemeModelLeft;
};

//// This is called when a Option/Item is selected in the v-select Left or Right.
function updateSelectorAndTheme(itemTheme: { props: { value: string; }; }, selectorSide: boolean ) { 
	if (!selectorSide /* false -- left */){
		// This is going to set the selected left model based on the left item that was selected.
		selectedThemeModelLeft = itemTheme.props.value;

	} else { /* true -- right */
		//// This is going to set the selected right model based on the left item that was selected.
		selectedThemeModelRight = itemTheme.props.value;
	}
	//// This updates the active theme for the whole system.
	UpdateTheme(itemTheme.props.value, selectorSide)
}

//// This updates the Active Theme based on the Switch/Toggle position (left/right).
//// This also sets the Switch/Toggle position label based on the other theme.
const UpdateTheme = (myTheme: string, ThemeSelectorSide: boolean) => {
	//// Which switch is currently active (left or right)?
	if(!ThemeSwitchFlag /* false == left-switch | true == right */) {
		//// If we get here, the switch is set to the left... (false)

		//// Which selected theme (left or right) got passed to this function?
		if(!ThemeSelectorSide /* false == left-selected */) {
			// If we get here, the active theme should be updated.

			uTheme.global.name.value = myTheme;

		} else {
			//// If we get here, the right-selected was passed in.
			
			//// Update the switch label to be equal to the right-selected value
			altThemeName.value = myTheme;
		}
	} else {
		//// If we get here, the switch is set to the right... (true)

		//// Which theme selector (left or right) got passed to this function?
		if(ThemeSelectorSide /* true == right-selected */){
			//// If we get here, the active theme should be updated.

			uTheme.global.name.value = myTheme;

		} else {
			//// If we get here, the left-selected was passed in.

			//// Update the switch label to be equal to the left-selected value <<VERIFY>>
			altThemeName.value = myTheme;
		}
	}
};
</script>

<script lang="ts">
	import { defineComponent, computed, ref } from "vue";
	import ThemePreview from "../components/ThemePreview.vue";
	// import { Property } from "csstype";
	export default defineComponent({
		name: "ThemeChanger",
		components: {
			ThemePreview
		},
	});
</script>