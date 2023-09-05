<template>
	<v-container >
		<v-btn class="mx-2" text="Load Saved" color="primary" _variant="text" @click="loadSavedThemes"/>
		<v-btn class="mx-2" text="Factory Reset" color="secondary" _variant="text" @click="factoryThemeReset"/>
		<v-btn text="Save New" class="mx-2" color="primary" _variant="text" @click="submitThemes"/>
		<v-row><v-spacer/>
			<v-col _cols="2">
				<v-icon icon="mdi-weather-sunny" color="green"></v-icon>
			</v-col>
			<v-col cols="3">


				<v-chip-group  v-model="leftSelection" selected-class="text-black bg-yellow">
						<v-chip v-for="theme in themeVals"
						style="{ theme === piniaStore.activeTheme ? color:black;background-color: yellow; : color:black;background-color:grey;}"
						@click="setLeft(theme)"> 
							{{ theme }} 
						</v-chip>
				</v-chip-group>


			</v-col>
			<v-divider vertical/>
			<v-col _cols="2">
				<v-icon icon="mdi-weather-night" color="grey-lighten-2"></v-icon>
			</v-col>
			<v-col cols="3">

		
				<v-chip-group  v-model="rightSelection" selected-class="text-black bg-yellow">
						<v-chip v-for="theme in themeVals"
						style="{ theme === piniaStore.inactiveTheme ? color:black;background-color: yellow; : color:black;background-color:grey;}"
						@click="setRight(theme)"> 
							{{ theme }} 
						</v-chip>
				</v-chip-group>


			</v-col>
			<v-spacer/>
		</v-row>
	
	</v-container>					
	<v-container __DESKTOP__
		class="d-none d-sm-flex" Hide-All--Then-Show-All-SM-And-Larger>
		<v-row no-gutters>
			<v-spacer />
			<v-col cols="5">
				<!-- <ThemeSelector selectorLabel="Left Theme"
					:selectorItems=themeVals 
					:defaultItem="piniaStore.activeTheme" 
					:selectSwitchFlag=false 
					selectorWidth="width:10em;" 
					class="float-right" 
					@onClickSelectorEvent="setClickSelectHandler"
				></ThemeSelector> -->

				<!-- <ThemeSelector :themeList = "themeVals"> </ThemeSelector> -->



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



				<!-- <ThemeSelector
				selectorLabel="Right Theme" 
				class="float-left"
				:selectorItems=themeVals 
				:defaultItem="piniaStore.inactiveTheme" 
				:selectSwitchFlag=true 
				selectorWidth="width:10em;" 
				@onClickSelectorEvent="setClickSelectHandler"
				/> -->


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
				<!-- <ThemeSelector selectorLabel="Left Theme" 
					:selectorItems=themeVals defaultItem="light" :selectSwitchFlag=false electorWidth="width:10em;" 
					@onClickSelectorEvent="setClickSelectHandler"
				></ThemeSelector> -->
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
				<!-- <ThemeSelector selectorLabel="Right Theme" 
					class="pt-4"
					:selectorItems=themeVals defaultItem="dark" :selectSwitchFlag=true selectorWidth="width:10em;" 
					@onClickSelectorEvent="setClickSelectHandler"
				></ThemeSelector> -->
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
import StatusIcons from "./ThemeParts/StatusIcons.vue"
//import ThemeSelector from "./ThemeParts/ThemeSelector.vue"
import { Auth } from "aws-amplify";
/* ----------------------------------------------------------------------------- */
import { bluebar, info, info1, info2 , info3, info4, info5, info6, info7 } from "../my-util-code/MyConsoleUtil"
import { enter, enter0, enter1, bar, whitebar, greybar, log, warn, err } from "../my-util-code/MyConsoleUtil"
import { useUserPiniaStore } from "../stores/user"

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const piniaStore = useUserPiniaStore(); // initialize the piniaStore

const theme = useTheme();
const themeVals = Object.keys(theme.computedThemes.value);
const switchFlag = ref(false) // false == left // Active Theme
const emit = defineEmits()

// Set the default Models and Theme
let leftModel:string = piniaStore.activeTheme
let rightModel:string = piniaStore.inactiveTheme



/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const leftSelection = ref('light')
const rightSelection = ref('dark')

const setRight = (themeArg) => { 
					enter(`setRight(theme) ${themeArg}`) 
	piniaStore.inactiveTheme = themeArg
					info(`aT -> ${theme.global.name.value}`)
	theme.global.name.value = themeArg
}

const setLeft = (themeArg) => { 
					enter(`setLeft(themeArg) ${themeArg}`) 
	piniaStore.activeTheme = themeArg
					info(`aT -> ${theme.global.name.value}`)
	theme.global.name.value = themeArg
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
async function submitThemes() {
	// if(BLOCKAPI("submitThemes function ")) { return }

	const custom_theme = ref(leftModel)
	const custom_themeInactive = ref(rightModel)
	
	//					Which side is 'active' based on the switchFlag?
	//						Switch left == false || Switch right == true
	if(switchFlag.value){
		custom_theme.value = rightModel
		custom_themeInactive.value = leftModel
	}

	//					Update the active theme and piniaStores
	piniaStore.activeTheme = custom_theme.value
	piniaStore.inactiveTheme = custom_themeInactive.value
	theme.global.name.value = custom_theme.value

	//... if(BLOCKAPI("submitThemes function ")) { return }

	//				This will return the user in the user pool (not updated )
	Auth.currentAuthenticatedUser({bypassCache: true /* false */})
	.then(user => {
		Auth.updateUserAttributes(user, {
		'custom:theme': custom_theme.value, 
		'custom:theme-inactive': custom_themeInactive.value
		})
		info2(`Signed in -- Auth updated.`)
	}).catch(reason => {
					/** Not Signed in */
					info(`Not signed in -- Auth not updated ${reason.message}`)
		piniaStore.connected = false
	})
	//				FINDME FIXME
	emit('onThemeChangerFini',  false )
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const onChangeSwitch = () => {
	//					This will toggle the switch flag
	switchFlag.value = !switchFlag.value;
	//					This will change the display theme 
	theme.global.name.value = 
		theme.global.name.value === leftModel 
			? rightModel 
			: leftModel;
};

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
//						This supports the LEFT and RIGHT v-selector

function setClickSelectHandler( selectorModel: string  , selectorSwitchFlag: boolean ){

					info(`selectorModel - > ${selectorModel}`)
					info2(`selectorSwitchFlag - > ${selectorSwitchFlag}`)

	// Update the right or left model depending on switchFlag
	selectorSwitchFlag ? rightModel = selectorModel : leftModel = selectorModel 
	//	Update the switch.
	if(selectorSwitchFlag != switchFlag.value) switchFlag.value = !switchFlag.value;

	// Update active theme
	theme.global.name.value = selectorModel;
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const loadSavedThemes = async () => {
	//if(BLOCKAPI("submitThemes function ")) { return }

	Auth.currentAuthenticatedUser({bypassCache: true })
	.then((user) =>  {
		//				Set the piniaStores (Update localStorage)
		//				When the piniaStores are updated, the localstorage will also ge updated.
		//				This happens because of the 'watch' on the piniaStores
		piniaStore.activeTheme = user.attributes['custom:theme']
		piniaStore.inactiveTheme = user.attributes['custom:theme-inactive']

		piniaStore.authLightTheme = user.attributes['custom:theme']
		piniaStore.authDarkTheme = user.attributes['custom:theme-inactive']
	
		//				Set the active theme
		theme.global.name.value = user.attributes['custom:theme']
		
		//				Set the left and right selectors.

			/**		CONTINUE WORKING HERE		*/




	})
	.catch((reason) => {
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
 * 				The theme labeled 'default' in vuetify.ts is not set.
 */

	// theme.global.name.value = 'light'
	//	theme.global.name.value = theme.current.value['dark'] ? 'dark' : 'light'
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