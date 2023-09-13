<template>
<!-- ---------------------------------------------------------------------------
	START DESKTOP -- Sync this with MOB Below.
-------------------------------------------------------------------------------- -->
<v-btn text="Load Saved" :color="!piniaStore.connected ? 'grey' : 'primary'" 
:disabled="!piniaStore.connected"  class="mx-2 mb-2" @click="loadSavedThemes"/>

<v-btn text="Factory Reset" class="mx-2 mb-2" color="secondary" @click="factoryThemeReset"/>

<v-btn text="Save New" :color="!piniaStore.connected ? 'grey' : 'primary'" 
:disabled="!piniaStore.connected" class="mx-2 mb-2" @click="saveNew"/>

<v-spacer style="height:2em;"></v-spacer>

<v-row v-if="!mobile">
	<v-col class="d-flex justify-center">
			<v-btn width="16em" class="mr-3" rounded @click="toggleTheme('A')">
				<div class="my-n5">
					<v-icon size="60" :color="piniaStore.A_ThemeColor" :icon="piniaStore.A_ThemeIcon"/>
					{{ piniaStore.A_ThemeText }}
				</div>
			</v-btn>
			<v-chip v-for="theme in themeVals" class="ma-1" style="background-color:grey;" @click="setA_Theme(theme)"> {{ theme }} </v-chip>
	</v-col>
</v-row>

<v-row v-if="!mobile">
	<v-col class="d-flex justify-center">
			<v-btn width="16em" class="mr-3" rounded @click="toggleTheme('B')">
				<div class="my-n5">
					<v-icon size="60" :color="piniaStore.B_ThemeColor" :icon="piniaStore.B_ThemeIcon"/>
					{{ piniaStore.B_ThemeText }}
				</div>
			</v-btn>
			<v-chip v-for="theme in themeVals" class="ma-1" style="background-color:grey;" @click="setB_Theme(theme)"> {{ theme }} </v-chip>
	</v-col>
</v-row>

<!-- ---------------------------------------------------------------------------
	START MOBILE -- Get in Synx with DSK Above.
-------------------------------------------------------------------------------- -->
<v-row v-if="mobile">
	<div class="ma-3">
		<v-btn width="16em" rounded @click="toggleTheme('A')">
			<div class="my-n4">
				<v-icon size="60" :color="piniaStore.A_ThemeColor" :icon="piniaStore.A_ThemeIcon"/>
				{{ piniaStore.A_ThemeText }}
			</div>
		</v-btn>
	</div>
	<div class="ma-3">
		<v-chip v-for="theme in themeVals" class="ma-1" style="background-color:grey;" @click="setA_Theme(theme)"> {{ theme }} </v-chip>
	</div>
</v-row>

<v-row v-if="mobile">
	<div class="ma-3">
		<v-btn width="16em" rounded  @click="toggleTheme('B')">
			<div class="my-n4">
				<v-icon size="60" :color="piniaStore.B_ThemeColor" :icon="piniaStore.B_ThemeIcon"/>
				{{ piniaStore.B_ThemeText }}
			</div>
		</v-btn>
	</div>
	<div class="ma-3">
		<v-chip v-for="theme in themeVals" class="ma-1" style="background-color:grey;" @click="setB_Theme(theme)"> {{ theme }} </v-chip>
	</div>
</v-row>

	<!-- <v-spacer style="height:2em;"></v-spacer> -->
	<!-- <v-btn color="secondary" @click="toggleTheme">Toggle Theme</v-btn> -->

</template>

<script setup lang="ts">
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
import { ref } from "vue";
import { useTheme, useDisplay } from "vuetify";
import { Auth } from "aws-amplify";
/* ----------------------------------------------------------------------------- */
import {
	enter, enter0, enter1, bar, 
	greybar, bluebar, whitebar, 
	info, info1, info2 , info3, info4, info5, info6, info7 } 
		from "../my-util-code/MyConsoleUtil"

import { useUserPiniaStore } from "../stores/user"
// I didn't add this --> import { popScopeId } from "vue";

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const piniaStore = useUserPiniaStore(); // initialize the piniaStore

const theme = useTheme();
const themeVals = Object.keys(theme.computedThemes.value);

const { mobile } = useDisplay()

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const toggleTheme = (ab) => {

	if(ab==='A')
	{
		//				Toggle Icon and Color
		if( piniaStore.A_ThemeColor==='red' ) {
			piniaStore.A_ThemeColor = 'green'
			piniaStore.A_ThemeIcon = 'mdi-toggle-switch'
			piniaStore.B_ThemeColor = 'red'
			piniaStore.B_ThemeIcon = 'mdi-toggle-switch-off'
		}
		//				Tobble GLOBAL Theme
		if( piniaStore.A_Theme !== theme.global.name.value ) {
			theme.global.name.value = piniaStore.A_Theme
			piniaStore.Active_Theme = piniaStore.A_Theme
			piniaStore.Inactive_Theme = piniaStore.B_Theme
		}
		return
	}

	//				Toggle Icons and Color
	if( piniaStore.A_ThemeColor==='green') {
			piniaStore.B_ThemeColor = 'green'
			piniaStore.B_ThemeIcon = 'mdi-toggle-switch'
			piniaStore.A_ThemeColor = 'red'
			piniaStore.A_ThemeIcon = 'mdi-toggle-switch-off'
	}
	//				Toggle the GLOBAL theme 
	if( piniaStore.B_Theme !== theme.global.name.value ) {
			theme.global.name.value = piniaStore.B_Theme
			piniaStore.Active_Theme = piniaStore.B_Theme
			piniaStore.Inactive_Theme = piniaStore.A_Theme
	}
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const setA_Theme = (themeArg) => { 
	piniaStore.A_Theme = themeArg
	piniaStore.A_ThemeText = themeArg
	piniaStore.Inactive_Theme = piniaStore.Active_Theme
	piniaStore.Active_Theme = themeArg

	piniaStore.A_ThemeIcon = "mdi-toggle-switch-off"
	piniaStore.A_ThemeColor = "red"

	piniaStore.A_ThemeIcon = "mdi-toggle-switch"
	piniaStore.A_ThemeColor = "green"
	
	piniaStore.B_ThemeIcon = "mdi-toggle-switch-off"
	piniaStore.B_ThemeColor = "red"
	
	theme.global.name.value = themeArg
}
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const setB_Theme = (themeArg) => { 

	piniaStore.B_Theme = themeArg
	piniaStore.B_ThemeText = themeArg

	piniaStore.Inactive_Theme = piniaStore.Active_Theme
	piniaStore.Active_Theme = themeArg

	piniaStore.B_ThemeIcon = "mdi-toggle-switch"
	piniaStore.B_ThemeColor = "green"
	
	piniaStore.A_ThemeIcon = "mdi-toggle-switch-off"
	piniaStore.A_ThemeColor = "red"

	theme.global.name.value = themeArg
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
async function saveNew() {
	//... if(BLOCKAPI("submitThemes function ")) { return }

	//				This will return the user in the user pool (not updated )
	await Auth.currentAuthenticatedUser({bypassCache: true /* false */})
	.then(user => {
		Auth.updateUserAttributes(user, {
		'custom:theme': piniaStore.A_Theme, 
		'custom:theme-inactive': piniaStore.B_Theme
	})
	.then(() => {
		loadSavedThemes()
	})
	.catch(() => {
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
		piniaStore.Active_Theme = user.attributes['custom:theme']
		piniaStore.A_Theme = user.attributes['custom:theme']
		piniaStore.A_ThemeText = user.attributes['custom:theme']
		piniaStore.A_ThemeIcon = 'mdi-toggle-switch'
		piniaStore.A_ThemeColor = 'green'
		//
		piniaStore.Inactive_Theme = user.attributes['custom:theme-inactive']
		piniaStore.B_Theme = user.attributes['custom:theme-inactive']
		piniaStore.B_ThemeText = user.attributes['custom:theme-inactive']
		piniaStore.B_ThemeIcon = 'mdi-toggle-switch-off'
		piniaStore.B_ThemeColor = 'red'

		//				Set the C theme
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
	piniaStore.Active_Theme = 'light'
	piniaStore.A_Theme = 'light'
	piniaStore.A_ThemeText = 'light'
	piniaStore.A_ThemeIcon = 'mdi-toggle-switch'
	piniaStore.A_ThemeColor = 'green'
	//
	piniaStore.Inactive_Theme = 'dark'
	piniaStore.B_Theme = 'dark'
	piniaStore.B_ThemeText = 'dark'
	piniaStore.B_ThemeIcon = 'mdi-toggle-switch-off'
	piniaStore.B_ThemeColor = 'red'

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

////////////////////////////////////////////////////////////////////////////////
//				Initialize the page on reload.

</script>