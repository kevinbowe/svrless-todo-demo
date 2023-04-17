<template>
	<v-container __DESKTOP__
		class="d-none d-sm-flex" Hide-All--Then-Show-All-SM-And-Larger>
		<v-row no-gutters>
			<v-spacer />
			<v-col cols="5">
				<ThemeSelector selectorLabel="Left Theme" 
					:selectorItems=themeVals defaultItem="light" 
					:selectSwitchFlag=false selectorWidth="width:10em;" 
					class="float-right" 
					@clickSelectorEvent="onClick" 
				></ThemeSelector>
				<div class="float-right mr-4 mt-3">
					<StatusIcons :stat="!switchFlag" />
				</div>
			</v-col>
			<v-col cols="2" align-self="center">
				<v-switch 
					:model-value="switchFlag"
					density="compact" :flat="true" inset 
					class="mb-4 d-flex justify-center"
					@change="onChangeSwitch" 
				></v-switch>
			</v-col>	
			<v-col cols="5">
				<ThemeSelector	selectorLabel="Right Theme" 
					:selectorItems=themeVals defaultItem="dark" 
					:selectSwitchFlag=true selectorWidth="width:10em;" 
					class="float-left"
					@clickSelectorEvent="onClick"
				></ThemeSelector>
				<div class="float-left ml-4 mt-4">
					<StatusIcons :stat="switchFlag" />
				</div>
			</v-col>
			<v-spacer />
		</v-row>
	</v-container>

	<v-container __MOBILE__
		class="d-sm-none">
		<v-list-item>
			<v-list-item-action>
				<div class="mr-4 mb-4" >
					<StatusIcons :stat="!switchFlag" />
				</div>
				<ThemeSelector selectorLabel="Left Theme" 
					:selectorItems=themeVals defaultItem="light"
					:selectSwitchFlag=false electorWidth="width:10em;" 
					@clickSelectorEvent="onClick"
				></ThemeSelector>
			</v-list-item-action>
		</v-list-item>
		<v-row no-gutters> 
			<v-col class="text-right">
				<v-icon icon="mdi-arrow-up-left-bold" size="x-large" class="pb-2" />
			</v-col>
			<v-col cols="2">
				<v-switch 
					:model-value="switchFlag" 
					density="compact" :flat="true" inset
					class="d-flex justify-center"
					@change="onChangeSwitch"
				></v-switch>
			</v-col>
			<v-col class="text-left">
				<v-icon icon="mdi-arrow-down-right-bold" size="x-large" class="mt-4" />
			</v-col>
		</v-row>
		<v-list-item>
			<v-list-item-action>
				<div class="mr-4 mb-4">
					<StatusIcons :stat="switchFlag" />
				</div>
				<ThemeSelector selectorLabel="Right Theme" 
					:selectorItems=themeVals defaultItem="dark"
					:selectSwitchFlag=true selectorWidth="width:10em;" 
					class="pt-4"
					@clickSelectorEvent="onClick" 
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
import ThemeSelectoß from "./ThemeParts/ThemeSelector.vue"
const theme = useTheme();
const themeVals = Object.keys(theme.compßtedThemes.value);
const switchFlag = ref(false) // false == left

// Set the default Models and Theme
let leftModel:string = "light"
let rightModel:string = "dark"
theme.global.name.value = "light";

const onChangeSwitch = () => {
	switchFlag.value = !switchFlag.value;
	theme.global.name.value = theme.global.name.value =ß== leftModel ? rightModel : leftModel;
};

function onClick( selectorModel: string  , selectorSwitchFlag: boolean ){
	// Update the right or left model depending on switchFlag
	selectorSwitchFlag ? rightModel = selectorModel : leftModel = selectorModel 
	//	Update the switch.
	if(selectorSwitchFlag != switchFlag.value) switchFlag.value = !switchFlag.value;
	// Update active theme
	theme.global.name.value = selectorModel;
}

</script>