<template>
	<v-container 
		class="d-none d-sm-flex" Hide-All--Then-Show-All-SM-And-Larger>
		<v-row no-gutters>
			<v-spacer />
			<v-col cols="5">
				<ThemeSelector selectorLabel="Left Theme" :selectorItems=themeVals defaultItem="light" 
					:selectSwitchFlag=false selectorWidth="width:10em;" @clickSelectorEvent="onClick" 
					class="float-right" 
				></ThemeSelector>
				<div class="float-right mr-4 mt-3">
					<StatusIcons :stat="!switchFlag" />
				</div>
			</v-col>
			<v-col cols="2" align-self="center">
				<v-switch :model-value="switchFlag"
					class="mb-4 d-flex justify-center"
					density="compact" :flat="true" inset @change="onChangeSwitch" />
			</v-col>	
			<v-col cols="5">
				<ThemeSelector	selectorLabel="Right Theme" :selectorItems=themeVals defaultItem="dark" 
					:selectSwitchFlag=true selectorWidth="width:10em;" @clickSelectorEvent="onClick"
					class="float-left"
				></ThemeSelector>
				<div class="float-left ml-4 mt-4">
					<StatusIcons :stat="switchFlag" />
				</div>
			</v-col>
			<v-spacer />
		</v-row>
	</v-container>
	<v-container 
		class="d-sm-none">
		<v-list-item>
			<v-list-item-action>
				<div class="mr-4 mb-4" >
					<StatusIcons :stat="!switchFlag" />
				</div>
				<ThemeSelector selectorLabel="Left Theme" :selectorItems=themeVals defaultItem="light"
					:selectSwitchFlag=false electorWidth="width:10em;" @clickSelectorEvent="onClick"
				></ThemeSelector>
			</v-list-item-action>
		</v-list-item>
		<v-row no-gutters> 
			<v-col 
				class="text-right">
				<v-icon icon="mdi-arrow-up-left-bold" size="x-large" class="pb-2" />
			</v-col>
			<v-col cols="2">
				<v-switch :model-value="switchFlag" 
					class="d-flex justify-center"
					density="compact" :flat="true" inset
					@change="onChangeSwitch" /></v-col>
			<v-col 
			class="text-left">
				<v-icon icon="mdi-arrow-down-right-bold" size="x-large" 
					class="mt-4">
				</v-icon></v-col>
		</v-row>
		<v-list-item>
			<v-list-item-action>
				<div class="mr-4 mb-4">
					<StatusIcons :stat="switchFlag" />
				</div>
				<ThemeSelector selectorLabel="Right Theme" :selectorItems=themeVals defaultItem="dark"
					:selectSwitchFlag=true selectorWidth="width:10em;" @clickSelectorEvent="onClick" 
					class="pt-4"
				></ThemeSelector>
		</v-list-item-action>
		</v-list-item>
	</v-container>
	<ThemePreview />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useTheme } from "vuetify";
import ThemePreview from "./ThemePreview.vue";
import StatusIcons from "./ThemeParts/StatusIcons.vue"
import ThemeSelector from "./ThemeParts/ThemeSelector.vue"
const theme = useTheme();
const themeVals = Object.keys(theme.computedThemes.value);
const switchFlag = ref(false) //// false == left

// Set the default Models and Theme
let leftModel:string = "light"
let rightModel:string = "dark"
theme.global.name.value = "light";

const onChangeSwitch = () => {
	switchFlag.value = !switchFlag.value;
	theme.global.name.value = theme.global.name.value === leftModel ? rightModel : leftModel;
};

function onClick( selectorModel: string  , selectorSwitchFlag: boolean ){
	// // Update the right or left model depending on switchFlag
	selectorSwitchFlag ? rightModel = selectorModel : leftModel = selectorModel 
	// //	Update the switch.
	if(selectorSwitchFlag != switchFlag.value) switchFlag.value = !switchFlag.value;
	//	// Update active theme
	theme.global.name.value = selectorModel;
}


// function onClickSelectorXP( selectorModel: string  , selectSwitchFlag: boolean ){
// 	// // Update the right or left model depending on switchFlag
// 	selectSwitchFlag ? rightModel = selectorModel : leftModel = selectorModel 
// 	// //	Update the switch.
// 	if(selectSwitchFlag != switchFlag.value) switchFlag.value = !switchFlag.value;
// 	//	// Update active theme
// 	theme.global.name.value = selectorModel;
// }
</script>