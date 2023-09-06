<template>
	<v-container __DESKTOP__>

		<v-row class="mb-5">
			<v-btn class="mx-2" text="Load Saved" color="primary" @click="loadSavedThemes"/>
			<v-btn class="mx-2" text="Factory Reset" color="secondary" @click="factoryThemeReset"/>
			<v-btn text="Save New" class="mx-2" color="primary" @click="submitThemes"/>
		</v-row>

		<v-row >
			<div class="float-md-left">
				<v-btn width="16em" _class="float-md-left" class="mr-3" rounded @click="theme.global.name.value = piniaStore.activeTheme">
					<div class="my-n5">
						<v-icon size="60" color="green" v-if="piniaStore.activeTheme === theme.global.name.value" icon="mdi-toggle-switch"/>
						<v-icon size="60" v-else color="red" icon="mdi-toggle-switch-off"/>
						{{ piniaStore.activeTheme }}
					</div>
				</v-btn>
			</div>
			<div>
				<v-chip v-for="theme in themeVals"
				style="{ theme === piniaStore.activeTheme ? color:black;background-color: yellow; : color:black;background-color:grey;}"
				@click="setActiveTheme(theme)"> 
					{{ theme }} 
				</v-chip>
			</div>
		</v-row>

		<v-row>
			<div class="float-md-left">
				<v-btn width="16em" class="mr-3" rounded @click="theme.global.name.value = piniaStore.inactiveTheme">
					<div class="my-n5">
						<v-icon size="60" color="green" v-if="piniaStore.inactiveTheme === theme.global.name.value" icon="mdi-toggle-switch"/>
						<v-icon size="60" v-else color="red" icon="mdi-toggle-switch-off"/>
						{{ piniaStore.inactiveTheme }}
					</div>
				</v-btn>
			</div>
			<v-div>
				<v-chip v-for="theme in themeVals"
				style="{ theme === piniaStore.inactiveTheme ? color:black;background-color: yellow; : color:black;background-color:grey;}"
				@click="setInactiveTheme(theme)"> 
					{{ theme }} 
				</v-chip>
			</v-div>
		</v-row>
	</v-container>

	<v-container __MOBILE__ class="d-sm-none">
	</v-container>
	
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useTheme } from "vuetify";
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

// Set the default Models and Theme
let leftModel:string = piniaStore.activeTheme
let rightModel:string = piniaStore.inactiveTheme

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

const setInactiveTheme = (themeArg) => { 
	piniaStore.inactiveTheme = themeArg
	theme.global.name.value = themeArg
}

const setActiveTheme = (themeArg) => { 
	piniaStore.activeTheme = themeArg
	theme.global.name.value = themeArg
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
async function saveNew() {
	//... if(BLOCKAPI("submitThemes function ")) { return }

	//				This will return the user in the user pool (not updated )
	await Auth.currentAuthenticatedUser({bypassCache: true /* false */})
	.then(user => {
		Auth.updateUserAttributes(user, {
		'custom:theme': piniaStore.activeTheme, 
		'custom:theme-inactive': piniaStore.inactiveTheme
	})
	.then(result => {
		loadSavedThemes()
	})
	.catch(reason => {
					/** Not Signed in */
		piniaStore.connected = false
	})
})}

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
	})
	.catch((reason) => {
	})
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const factoryThemeReset = async () => {

	theme.global.name.value = 'light'
	//				NOTE:
	//				When piniaStore is updated the localStore will also be updated
	piniaStore.activeTheme = 'light'
	piniaStore.inactiveTheme = 'dark'

	piniaStore.authLightTheme = 'light'
	piniaStore.authDarkTheme = 'dark'

	if(BLOCKAPI("submitThemes function ")) { return }

	//				This will return the user in the user pool (not updated )
	Auth.currentAuthenticatedUser({bypassCache: true /* false */})
	.then(user => {
		Auth.updateUserAttributes(user, {
			'custom:theme': 'light', 
			'custom:theme-inactive': 'dark'
		})
	}).catch(reason => {
					/** Not Signed in */
	})
	//				Auth.user DEBUG code
	//				This will return the user in the user pool (not updated )
	//	const user = await Auth.currentAuthenticatedUser({bypassCache: true /* false */});
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
/**/					const BLOCKAPIFLAG = ref(false)										 /**/
/* 				if(BLOCKAPI("submitEmail function "))return								*/
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const BLOCKAPI = (message:string|null|undefined = null) => {
	if(BLOCKAPIFLAG.value) 
		message ? info7(`${message} -- BLOCKED`) : info7("-- BLOCKED -- ")
	return BLOCKAPIFLAG.value
}
</script>