<template>
	<v-container >
		<v-btn class="mx-2" text="Reload Saved" color="primary" _variant="text" @click="reloadSavedThemes"/>
		<v-btn class="mx-2" text="Factory Reset" color="secondary" _variant="text" @click="factoryThemeReset"/>
		<v-btn class="mx-2" text="Cancel" _variant="text" @click="$emit('onThemeChangerFini', false )"/>
		<v-btn class="mx-2" text="Save New" color="primary" _variant="text" @click="submitThemes"/>
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
import { bluebar, info, info1, info2 , info3, info4, info5, info6, info7 } from "../my-util-code/MyConsoleUtil"
import { enter, enter0, enter1, bar, whitebar, greybar, log, warn, err } from "../my-util-code/MyConsoleUtil"

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const theme = useTheme();
const themeVals = Object.keys(theme.computedThemes.value);``
const switchFlag = ref(false) // false == left
const emit = defineEmits()

// Set the default Models and Theme
let leftModel:string = "light"
let rightModel:string = "dark"

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
	//				This performs that update
	await Auth.updateUserAttributes(newuser, {
		'custom:theme': custom_theme.value, 
		'custom:theme-inactive': custom_themeInactive.value
	})
	//				FINDME FIXME
	emit('onThemeChangerFini',  false )
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const onChangeSwitch = () => {
	enter(`onChangeSwitch`)
	switchFlag.value = !switchFlag.value;
	//					This will change the display theme 
	// theme.global.name.value = 
	// 	theme.global.name.value === leftModel 
	// 		? rightModel 
	// 		: leftModel;
};

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
//						This supports the LEFT and RIGHT v-selector

function onClick( selectorModel: string  , selectorSwitchFlag: boolean ){
	// Update the right or left model depending on switchFlag
	selectorSwitchFlag ? rightModel = selectorModel : leftModel = selectorModel 
	//	Update the switch.
	if(selectorSwitchFlag != switchFlag.value) switchFlag.value = !switchFlag.value;

	// Update active theme
	// theme.global.name.value = selectorModel;
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const reloadSavedThemes = async () => {
	enter("reloadSavedThemes")
	if(BLOCKAPI("submitThemes function ")) { return }

	Auth.currentAuthenticatedUser({bypassCache: true })
	.then((user) =>  {


		//themeIcon.value = ['dark'] ? 'mdi-weather-sunny' : 'mdi-weather-night'
	})
	
	.catch((reason) => {

		//themeIcon.value = 'mdi-weather-night'
	})
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const factoryThemeReset = async () => {
	//if(BLOCKAPI("submitThemes function ")) { return }

	//				This will return the user in the user pool (not updated )
	const user = await Auth.currentAuthenticatedUser({bypassCache: true /* false */});
	//				This will delete the two attributes listed below.
	await Auth.deleteUserAttributes(user, ['custom:theme', 'custom:theme-inactive']);

	bar()
	info(`${Object.getOwnPropertyNames(theme)}`)
	//				This will display a theme name like 'dark_custom'
	//				This is the name of the ACTIVE theme.
	info1(`name.value --> ${Object.getOwnPropertyNames(theme.name)}`)
	info1(`name.value --> ${theme.name.value}`)
 
	info2(`current --> ${Object.getOwnPropertyNames(theme.current)}`)
	info2(`current.value --> ${Object.getOwnPropertyNames(theme.current.value)}`)
	info2(`current.value['dark'] --> ${theme.current.value['dark']}`)
 
	info3(`current.value['colors'] --> ${Object.getOwnPropertyNames(theme.current.value['colors'])}`)
	info3(`current.value['colors'] --> ${theme.current.value['colors']}`)
 	
	info4(`current.value['variables'] --> ${Object.getOwnPropertyNames(theme.current.value['variables'])}`)
	info4(`current.value['variables'] --> ${theme.current.value['variables']}`)
 
	bluebar()
	info4(`current.global --> ${Object.getOwnPropertyNames(theme.global)}`)
	bar()				// This will display the Current Theme.
	info5(`global['name']' PROP-NAMES --> ${Object.getOwnPropertyNames(theme.global['name'])}`)
	info5(`global['name'].value --> ${theme.global[`name`].value}`)
	info(``)
	info6(`global['current']' PROP-NAMES --> ${Object.getOwnPropertyNames(theme.global['current'])}`)
	info6(`global['current'].value --> ${theme.global[`current`].value}`)
 	
	info(``)
	info7(`theme.global['current'].value  PROP-NAMES --> ${Object.getOwnPropertyNames(theme.global['current'].value)}`)
	info1(`global['current'].value['dark'] --> ${theme.global[`current`].value['dark']}`)
 
	info2(`theme.global['current'].value  PROP-NAMES --> ${Object.getOwnPropertyNames(theme.global[`current`].value['colors']) }`)
	info2(`global['current'].value['colors'].primary --> ${theme.global[`current`].value['colors'].primary}`)
 
	info3(`theme.global['current'].value['variables']  PROP-NAMES --> ${Object.getOwnPropertyNames(theme.global[`current`].value['variables']) }`)
	info3(`global['current'].value['variables']['theme-code'] --> ${theme.global[`current`].value['variables']['theme-code']}`)

	info(`--> ${Object.getOwnPropertyNames(theme)}`)
	info(`--> ${Object.getOwnPropertyNames(theme.themes.value)}`)


	whitebar()
	info(`theme.current.value['dark'] > ${theme.current.value['dark']}`)

/**
 * 	The theme labeled 'default' in vuetify.ts is not avaiable.
 */


	// theme.global.name.value = 'light'
	//theme.global.name.value = theme.current.value['dark'] ? 'dark' : 'light'
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/**/					const BLOCKAPIFLAG = ref(true)										 /**/
/* 				if(BLOCKAPI("submitEmail function "))return								*/
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const BLOCKAPI = (message:string|null|undefined = null) => {
	if(BLOCKAPIFLAG.value) 
		message ? info7(`${message} -- BLOCKED`) : info7("-- BLOCKED -- ")
	return BLOCKAPIFLAG.value
}
</script>