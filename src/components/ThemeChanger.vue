<template>
	<v-container>
		<v-btn text="Cancel" variant="text" @click="$emit('onThemeChangerFini', false )"/>
		<v-btn text="Save" variant="text" @click="submitThemes"/>
	</v-container>					
	<v-container __DESKTOP__
		class="d-none d-sm-flex" Hide-All--Then-Show-All-SM-And-Larger>
		<v-row no-gutters>
			<v-spacer />
			<v-col cols="5">
				<ThemeSelector selectorLabel="Left Theme" 
					:selectorItems=themeVals defaultItem="light" :selectSwitchFlag=false selectorWidth="width:10em;" 
					class="float-right" 
					@clickSelectorEvent="onClick" 
				></ThemeSelector>
				<div class="float-right mr-4 mt-3">
					<StatusIcons :stat="!switchFlag" />
				</div>
			</v-col>
			<v-col cols="2" align-self="center">
				<v-switch density="compact" :flat="true" inset class="mb-4 d-flex justify-center"
					:model-value="switchFlag"
					@change="onChangeSwitch" 
				></v-switch>
			</v-col>	
			<v-col cols="5">
				<ThemeSelector	selectorLabel="Right Theme" 
					class="float-left"
					:selectorItems=themeVals defaultItem="dark" :selectSwitchFlag=true selectorWidth="width:10em;" 
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
					:selectorItems=themeVals defaultItem="light" :selectSwitchFlag=false electorWidth="width:10em;" 
					@clickSelectorEvent="onClick"
				></ThemeSelector>
			</v-list-item-action>
		</v-list-item>
		<v-row no-gutters> 
			<v-col class="text-right">
				<v-icon icon="mdi-arrow-up-left-bold" size="x-large" class="pb-2" />
			</v-col>
			<v-col cols="2">
				<v-switch density="compact" :flat="true" inset class="d-flex justify-center"
					:model-value="switchFlag" 
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
					class="pt-4"
					:selectorItems=themeVals defaultItem="dark" :selectSwitchFlag=true selectorWidth="width:10em;" 
					@clickSelectorEvent="onClick" 
				></ThemeSelector>
		</v-list-item-action>
		</v-list-item>
	</v-container>
</template>

<script lang="ts">
	export default {inheritAttrs: false}
</script>

<script setup lang="ts">
import { ref } from "vue";
import { useTheme } from "vuetify";
import ThemePreview from "./ThemePreview.vue";
import StatusIcons from "./ThemeParts/StatusIcons.vue"
import ThemeSelector from "./ThemeParts/ThemeSelector.vue"
import { Auth } from "aws-amplify";
/* ----------------------------------------------------------------------------- */
import { info, info1, info2 , info3, info4, info5, info6, info7 } from "../my-util-code/MyConsoleUtil"
import { enter, enter0, enter1, bar, whitebar, greybar, log, warn, err } from "../my-util-code/MyConsoleUtil"

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const theme = useTheme();
const themeVals = Object.keys(theme.computedThemes.value);``
const switchFlag = ref(false) // false == left
const emit = defineEmits()

// Set the default Models and Theme
let leftModel:string = "light"
let rightModel:string = "dark"
theme.global.name.value = "light";

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
async function submitThemes() {
	if(BLOCKAPI("submitThemes function ")) { return }

	const custom_theme = ref(leftModel)
	const custom_themeInactive = ref(rightModel)
	
	//					Which side is 'active' based on the switchFlag?
	//						Switch left == false || Switch right == true
	if(switchFlag.value){
		custom_theme.value = rightModel
		custom_themeInactive.value = leftModel
	}
	
	//				This will return the user in the user pool (not updated )
	const newuser = await Auth.currentAuthenticatedUser({bypassCache: true /* false */});
	await Auth.updateUserAttributes(newuser, {
		'custom:theme': custom_theme.value, 
		'custom:theme-inactive': custom_themeInactive.value
	})
	emit('onThemeChangerFini',  false )
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const onChangeSwitch = () => {
	switchFlag.value = !switchFlag.value;
	theme.global.name.value = theme.global.name.value === leftModel ? rightModel : leftModel;
};

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
function onClick( selectorModel: string  , selectorSwitchFlag: boolean ){
	// Update the right or left model depending on switchFlag
	selectorSwitchFlag ? rightModel = selectorModel : leftModel = selectorModel 
	//	Update the switch.
	if(selectorSwitchFlag != switchFlag.value) switchFlag.value = !switchFlag.value;
	// Update active theme
	theme.global.name.value = selectorModel;
}
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/**/					const BLOCKAPIFLAG = ref(false)										 /**/
/* 				if(BLOCKAPI("submitEmail function "))return								*/
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const BLOCKAPI = (message:string|null|undefined = null) => {
	if(BLOCKAPIFLAG.value) 
		message ? info7(`${message} -- BLOCKED`) : info7("-- BLOCKED -- ")
	return BLOCKAPIFLAG.value
}
</script>