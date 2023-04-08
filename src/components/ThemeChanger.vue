<template>
	<v-container class="d-none d-sm-flex" Hide-All--Then-Show-All-SM-And-Larger> <!-- VERIFY -->
		<v-row no-gutters>
			<v-spacer />
			<v-col cols="5">
				<v-select label="Left Theme" style="width:10em;" class="float-right" 
						v-model="leftModel" :items="computedThemesKeysValue">
					<template v-slot:selection> {{ leftModel }} </template>
					<template v-slot:item="item">
						<v-list-item @click="updateSelectorAndTheme(item, false /* Left Selector */)"> {{ item.props.title }}
						</v-list-item>
					</template>
				</v-select>			
				<div class="float-right" style="margin:.6em 1em 0em 0em;">
					<v-avatar v-if="!ThemeSwitchFlag" color="success" size="30">
						<v-icon icon="mdi-check"> </v-icon> </v-avatar>
					<v-avatar v-else color="grey" size="30">
						<v-icon icon="mdi-circle-outline"></v-icon> </v-avatar>
				</div>
			</v-col>
			<v-col cols="2" align-self="center" style="margin:0em 0em .8em 0em;">
				<v-switch style="justify-content:center; display:flex;margin-bottom:1em;" 
						density="compact" :flat="true" inset @change="onChangeTheme" />
			</v-col>	
			<v-col cols="5">
				<v-select label="Right Theme" style="width:10em;" class="float-left" 
						v-model="rightModel" :items="computedThemesKeysValue">
					<template v-slot:selection> {{ rightModel }} </template>
					<template v-slot:item="item">
						<v-list-item @click="updateSelectorAndTheme(item, true /* Right Selector */)"> {{ item.props.title }}
						</v-list-item>
					</template>
				</v-select>
				<div class="float-left" style="margin:.7em 0em 0em 1em;">
					<v-avatar v-if="ThemeSwitchFlag" color="success" size="30">
						<v-icon icon="mdi-check"> </v-icon> </v-avatar>
					<v-avatar v-else color="grey" size="30">
						<v-icon icon="mdi-circle-outline"></v-icon> </v-avatar>
				</div>
			</v-col>
			<v-spacer />
		</v-row>
	</v-container>

	<v-container class="d-sm-none">
		<v-list-item>
			<v-list-item-action>
				<div style="margin:0em 1em 1em 0em;">
					<v-avatar v-if=!ThemeSwitchFlag color="success" size="30">
						<v-icon icon="mdi-check"> </v-icon> </v-avatar>
					<v-avatar v-else color="grey" size="30">
						<v-icon icon="mdi-circle-outline"> </v-icon> </v-avatar>
				</div>
				<v-select label="Left Theme" style="min-width:10em;" v-model="leftModel" :items="computedThemesKeysValue">
					<template v-slot:selection>
						<span class="d-flex justify-center"> {{ leftModel }} </span> </template>
					<template v-slot:item="item">
						<v-list-item @click="updateSelectorAndTheme(item, false /* Left Selector */)"> {{ item.props.title }}
						</v-list-item> </template>
				</v-select>
			</v-list-item-action>
		</v-list-item>

		<v-row no-gutters style="margin-left:3em;">
			<v-col class="text-right">
				<v-icon icon="mdi-arrow-up-left-bold" size="x-large" style="margin-top: -6px;"></v-icon> </v-col>
			<v-col cols="2">
				<v-switch style="justify-content:center;display:flex;" density="compact" :flat="true" inset
					@change="onChangeTheme" /></v-col>
			<v-col class="text-left">
				<v-icon icon="mdi-arrow-down-right-bold" size="x-large" style="margin-top: 14px;"></v-icon> </v-col>
		</v-row>

		<v-list-item>
			<v-list-item-action>
				<div style="margin:0em 1em 1em 0em;">
					<v-avatar v-if=ThemeSwitchFlag color="success" size="30">
						<v-icon icon="mdi-check"> </v-icon> </v-avatar>
					<v-avatar v-else color="grey" size="30">
						<v-icon icon="mdi-circle-outline"></v-icon> </v-avatar>
				</div>
				<v-select label="Right Theme" style="padding-top:6px;min-width:10em;" v-model="rightModel" :items="computedThemesKeysValue">
					<template v-slot:selection>
						<span class="d-flex justify-center"> {{ rightModel }} </span></template>
					<template v-slot:item="item">
						<v-list-item @click="updateSelectorAndTheme(item, true /* Right Selector */)"> {{ item.props.title }}
						</v-list-item> </template>
				</v-select>
		</v-list-item-action>
		</v-list-item>
	</v-container>

	<ThemePreview />

</template>

<script setup lang="ts">
import { ref } from "vue";
import { useTheme } from "vuetify";
import ThemePreview from "./ThemePreview.vue";

const theme = useTheme();
const computedThemesKeysValue = Object.keys(theme.computedThemes.value);
//...const altThemeName = ref("");
const ThemeSwitchFlag = ref(false) //// false == left
let leftModel:string = "light"
let rightModel:string = "dark"
theme.global.name.value = "light";

const onChangeTheme = () => {
	//// toggle the ThemeSwitchFlag
	ThemeSwitchFlag.value = !ThemeSwitchFlag.value;

	//// Toggle the active theme (theme.global.name.value).
	//// Update the Toggle Theme lable to display the 'alt' theme.
	theme.global.name.value = /* altThemeName.value = */ 
		theme.global.name.value === leftModel ? rightModel : leftModel;
};

//// This is called when a Option/Item is selected in the v-select (Left or Right).
function updateSelectorAndTheme(itemTheme: { props: { value: string; }; }, selectorSide: boolean) { 
	if (!selectorSide /* false -- left */){
		//// This is going to set the model based on the item that was selected.
		leftModel = itemTheme.props.value;

	} else { /* true -- right */
		//// This is going to set the model based on the item that was selected.
		rightModel = itemTheme.props.value;
	}
	//// This updates the active theme for the whole system.
	//...UpdateTheme(itemTheme.props.value)0
	theme.global.name.value = itemTheme.props.value;
}

// //// This updates the Active Theme based on the Switch/Toggle position (left/right).
// //// This also sets the Switch/Toggle position label based on the theme selected in the alternate selector.
// const UpdateTheme_EXP1 = (selectedTheme: string, themeSelector: boolean) => {

// 	//// Which switch is currently active (left or right)?
// 	if(!ThemeSwitchFlag.value /* false == left-switch | true == right */) {
// 		//// If we get here, the switch is set to the left. (false)

// 		//// Which selected theme (left or right) got passed to this function?
// 		if(!themeSelector /* false == left-selector */) 
// 			//// If we get here, set the active theme to the selectedTheme arg.
// 			theme.global.name.value = selectedTheme;
// 		return	
// 	}

// 	//// If we get here, the switch is set to the right (true)

// 	//// Which theme selector (left or right) got passed to this function?
// 	if(themeSelector /* true == right-selector */){
// 		//// If we get here, set the active theme to the selectedTheme arg.

// 		theme.global.name.value = selectedTheme;
// 	}
// };


// //// This updates the Active Theme based on the Switch/Toggle position (left/right).
// //// This also sets the Switch/Toggle position label based on the theme selected in the alternate selector.
// const UpdateTheme__ORG = (selectedTheme: string, themeSelector: boolean) => {
// 	//// Which switch is currently active (left or right)?
// 	if(!ThemeSwitchFlag.value /* false == left-switch | true == right */) {
// 		//// If we get here, the switch is set to the left. (false)

// 		//// Which selected theme (left or right) got passed to this function?
// 		if(!themeSelector /* false == left-selector */) {
// 			//// If we get here, set the active theme to the selectedTheme arg.

// 			theme.global.name.value = selectedTheme;
// 		} 
// 	} else {
// 		//// If we get here, the switch is set to the right (true)

// 		//// Which theme selector (left or right) got passed to this function?
// 		if(themeSelector /* true == right-selector */){
// 			//// If we get here, set the active theme to the selectedTheme arg.

// 			theme.global.name.value = selectedTheme;
// 		}
// 	}
// };
</script>