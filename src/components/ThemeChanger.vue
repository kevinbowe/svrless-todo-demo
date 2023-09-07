<template>
<!-- ---------------------------------------------------------------------------
	START DESKTOP 
-------------------------------------------------------------------------------- -->
<v-btn text="Load Saved" class="mx-2 mb-2"  color="primary" @click="loadSavedThemes"/>
<v-btn text="Factory Reset" class="mx-2 mb-2" color="secondary" @click="factoryThemeReset"/>
<v-btn text="Save New" class="mx-2 mb-2" color="primary" @click="saveNew"/>

<v-spacer style="height:2em;"></v-spacer>

<v-row v-if="!mobile">
	<v-col class="d-flex justify-center">
			<v-btn width="16em" class="mr-3" rounded @click="toggleTheme">
				<div class="my-n5">
					<v-icon size="60" color="green" v-if="piniaStore.A_Theme === theme.global.name.value" icon="mdi-toggle-switch"/>
					<v-icon size="60" v-else color="red" icon="mdi-toggle-switch-off"/>
					{{ piniaStore.A_Theme }}
				</div>
			</v-btn>
			<v-chip v-for="theme in themeVals" class="ma-1" style="background-color:grey;" @click="setA_Theme(theme)"> {{ theme }} </v-chip>
	</v-col>
</v-row>

<v-row v-if="!mobile">
	<v-col class="d-flex justify-center">
			<v-btn width="16em" class="mr-3" rounded @click="toggleTheme">
				<div class="my-n5">
					<v-icon size="60" color="green" v-if="piniaStore.B_Theme === theme.global.name.value" icon="mdi-toggle-switch"/>
					<v-icon size="60" v-else color="red" icon="mdi-toggle-switch-off"/>
					{{ piniaStore.B_Theme }}
				</div>
			</v-btn>
			<v-chip v-for="theme in themeVals" class="ma-1" style="background-color:grey;" @click="setB_Theme(theme)"> {{ theme }} </v-chip>
	</v-col>
</v-row>

<!-- ---------------------------------------------------------------------------
	START MOBILE 
-------------------------------------------------------------------------------- -->

<v-row v-if="mobile">
	<div class="ma-3">
		<v-btn width="16em" rounded @click="toggleTheme">
			<div class="my-n4">
				<v-icon size="60" color="green" v-if="piniaStore.A_Theme === theme.global.name.value" icon="mdi-toggle-switch"/>
				<v-icon size="60" v-else color="red" icon="mdi-toggle-switch-off"/>
				{{ piniaStore.A_Theme }}
			</div>
		</v-btn>
	</div>
	<div class="ma-3">
		<v-chip v-for="theme in themeVals" class="ma-1" style="background-color:grey;" @click="setA_Theme(theme)"> {{ theme }} </v-chip>
	</div>
</v-row>

<v-row v-if="mobile">
	<div class="ma-3">
		<v-btn width="16em" rounded  @click="toggleTheme">
			<div class="my-n4">
				<v-icon size="60" color="green" v-if="piniaStore.B_Theme === theme.global.name.value" icon="mdi-toggle-switch"/>
				<v-icon size="60" v-else color="red" icon="mdi-toggle-switch-off"/>
				{{ piniaStore.B_Theme }}
			</div>
		</v-btn>
	</div>
	<div class="ma-3">
		<v-chip v-for="theme in themeVals" class="ma-1" style="background-color:grey;" @click="setB_Theme(theme)"> {{ theme }} </v-chip>
	</div>
</v-row>


</template>

<script setup lang="ts">
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

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const piniaStore = useUserPiniaStore(); // initialize the piniaStore

const theme = useTheme();
const themeVals = Object.keys(theme.computedThemes.value);
const { mobile } = useDisplay()

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const toggleTheme = () => {
	//				Toggle the light and dark themes based on the piniaStore [ active and B ]
	theme.global.name.value = piniaStore.B_Theme
	piniaStore.B_Theme =	piniaStore.A_Theme
	piniaStore.A_Theme = theme.global.name.value
}


/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

const setB_Theme = (themeArg) => { 
	piniaStore.B_Theme = themeArg
	theme.global.name.value = themeArg
}

const setA_Theme = (themeArg) => { 
	piniaStore.A_Theme = themeArg
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
		piniaStore.A_Theme = user.attributes['custom:theme']
		piniaStore.B_Theme = user.attributes['custom:theme-inactive']

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
	piniaStore.A_Theme = 'light'
	piniaStore.Bheme = 'dark'

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
</script>