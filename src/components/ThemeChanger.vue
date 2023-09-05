<template>
	<v-container __DESKTOP__>

		<v-row class="mb-5">
			<v-btn class="mx-2" text="Load Saved" color="primary" @click="loadSavedThemes"/>
			<v-btn class="mx-2" text="Factory Reset" color="secondary" @click="factoryThemeReset"/>
			<v-btn text="Save New" class="mx-2" color="primary" @click="submitThemes"/>
		</v-row>
	
		<v-row class="mb-5">

			<v-btn width="16em" class="mr-3" rounded @click="toggleTheme(piniaStore.activeTheme)">
				<div class="my-n5">
					<v-icon size="60" color="green" v-if="piniaStore.activeTheme === theme.global.name.value" icon="mdi-toggle-switch"/>
					<v-icon size="60" v-else color="red" icon="mdi-toggle-switch-off"/>
					{{ piniaStore.activeTheme }}
				</div>
			</v-btn>
			
			<v-chip-group class="my-n1" v-model="leftSelection" >
				<v-chip v-for="theme in themeVals"
				style="{ theme === piniaStore.activeTheme ? color:black;background-color: yellow; : color:black;background-color:grey;}"
				@click="setLeft(theme)"> 
					{{ theme }} 
				</v-chip>
			</v-chip-group>

		</v-row>
			
		<v-row>
			<v-btn width="16em" class="mr-3" rounded @click="toggleTheme(piniaStore.inactiveTheme)">
				<div class="my-n5">
					<v-icon size="60" color="green" v-if="piniaStore.inactiveTheme === theme.global.name.value" icon="mdi-toggle-switch"/>
					<v-icon size="60" v-else color="red" icon="mdi-toggle-switch-off"/>
					{{ piniaStore.inactiveTheme }}
				</div>
			</v-btn>
		
			<v-chip-group class="my-n1" v-model="rightSelection" >
				<v-chip v-for="theme in themeVals"
				style="{ theme === piniaStore.inactiveTheme ? color:black;background-color: yellow; : color:black;background-color:grey;}"
				@click="setRight(theme)"> 
					{{ theme }} 
				</v-chip>
			</v-chip-group>
		</v-row>

	</v-container>

	<v-container __MOBILE__ class="d-sm-none">
	</v-container>
	
</template>

<script lang="ts">
	export default {inheritAttrs: false}
</script>

<script setup lang="ts">
import { ref } from "vue";
import { useTheme } from "vuetify";
import StatusIcons from "./ThemeParts/StatusIcons.vue"
import { Auth } from "aws-amplify";
/* ----------------------------------------------------------------------------- */
import {
	enter, enter0, enter1, bar, 
	greybar, bluebar, whitebar, 
	info, info1, info2 , info3, info4, info5, info6, info7 } 
		from "../my-util-code/MyConsoleUtil"
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

const toggleTheme = (themeArg) => {
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

	/**			DEBUG CODE ONLY 				*/
	/**		Set the active theme.
	 * 			Expect the theme to change
	 * 		----------------------------------------------------
	 * 		Set the left and right chip
	 * 			The highlighted chip will be updated.
	 * 		----------------------------------------------------		
	 * 		The debug App-Bar will reflect the expected results.
	 * 		----------------------------------------------------	*/

	 //				WORKS
	 theme.global.name.value = 'dark_custom'

	 piniaStore.inactiveTheme = 'dark_custom'
	 piniaStore.activeTheme = 'light_custom'

	 leftSelection.value = 'left_custom'
	 rightSelection.value = 'dark_custom'

	 //if(BLOCKAPI("submitThemes function ")) { return }

	//				This will return the user in the user pool (not updated )
	// const user = await Auth.currentAuthenticatedUser({bypassCache: true /* false */});
	//				This will delete the two attributes listed below.
	// await Auth.deleteUserAttributes(user, ['custom:theme', 'custom:theme-inactive']);

// 	bar()
// 	info(`${Object.getOwnPropertyNames(theme)}`)
// 	//				This will display a theme name like 'dark_custom'
// 	//				This is the name of the ACTIVE theme.
// 	info1(`name.value --> ${Object.getOwnPropertyNames(theme.name)}`)
// 	info1(`name.value --> ${theme.name.value}`)
//  
// 	info2(`current --> ${Object.getOwnPropertyNames(theme.current)}`)
// 	info2(`current.value --> ${Object.getOwnPropertyNames(theme.current.value)}`)
// 	info2(`current.value['dark'] --> ${theme.current.value['dark']}`)
//  
// 	info3(`current.value['colors'] --> ${Object.getOwnPropertyNames(theme.current.value['colors'])}`)
// 	info3(`current.value['colors'] --> ${theme.current.value['colors']}`)
//  	
// 	info4(`current.value['variables'] --> ${Object.getOwnPropertyNames(theme.current.value['variables'])}`)
// 	info4(`current.value['variables'] --> ${theme.current.value['variables']}`)
//  
// 	bluebar()
// 	info4(`current.global --> ${Object.getOwnPropertyNames(theme.global)}`)
// 	bar()				// This will display the Current Theme.
// 	info5(`global['name']' PROP-NAMES --> ${Object.getOwnPropertyNames(theme.global['name'])}`)
// 	info5(`global['name'].value --> ${theme.global[`name`].value}`)
// 	info(``)
// 	info6(`global['current']' PROP-NAMES --> ${Object.getOwnPropertyNames(theme.global['current'])}`)
// 	info6(`global['current'].value --> ${theme.global[`current`].value}`)
//  	
// 	info(``)
// 	info7(`theme.global['current'].value  PROP-NAMES --> ${Object.getOwnPropertyNames(theme.global['current'].value)}`)
// 	info1(`global['current'].value['dark'] --> ${theme.global[`current`].value['dark']}`)
//  
// 	info2(`theme.global['current'].value  PROP-NAMES --> ${Object.getOwnPropertyNames(theme.global[`current`].value['colors']) }`)
// 	info2(`global['current'].value['colors'].primary --> ${theme.global[`current`].value['colors'].primary}`)
//  
// 	info3(`theme.global['current'].value['variables']  PROP-NAMES --> ${Object.getOwnPropertyNames(theme.global[`current`].value['variables']) }`)
// 	info3(`global['current'].value['variables']['theme-code'] --> ${theme.global[`current`].value['variables']['theme-code']}`)
// 
// 	info(`--> ${Object.getOwnPropertyNames(theme)}`)
// 	info(`--> ${Object.getOwnPropertyNames(theme.themes.value)}`)
// 
// 	whitebar()
// 	info(`theme.current.value['dark'] > ${theme.current.value['dark']}`)

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