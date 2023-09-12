// src/stores/user.ts

/* ----------------------------------------------------------------------------- */
import { info, info1, info2 , info3, info4, info5, info6, info7 } from "../my-util-code/MyConsoleUtil"
import { enter, enter0, enter1, enter2, enter3, enter4, enter5, enter6, enter7 } from "../my-util-code/MyConsoleUtil"
import { bar, whitebar, greybar, redbar, greenbar, orangebar } from "../my-util-code/MyConsoleUtil"
/* ----------------------------------------------------------------------------- */
import { ref } from 'vue'
import { defineStore as definePiniaStore} from 'pinia'
//					userPiniaStore is the ID of the store.
bar()
//enter1("user.ts -> Pinia Initialize -> Load/Reload --ONLY--")

//					THIS WORKS
// const activeTheme = localStorage.getItem("Active_Theme_KEY") ? JSON.parse(localStorage.getItem("Active_Theme_KEY")) : 'light_custom'
// const inactiveTheme = localStorage.getItem("Inactive_Theme_KEY") ? JSON.parse(localStorage.getItem("Inactive_Theme_KEY")) : 'dark_custom'

//					THIS WORKS
// const activeTheme = ref()
// let inactiveTheme = ref()
// if(localStorage.getItem("userStore_KEY")){
// 					info("userStore_KEY EXITS")
// 	const parsedUserStore = JSON.parse(localStorage.getItem("userStore_KEY"))
// 					info(`parseUserStore ${parsedUserStore}`)
// 					info2(`parseUserStore - Property Names -> ${Object.getOwnPropertyNames(parsedUserStore)}`)
// 					info4(`parseUserStore.Active_Theme ${parsedUserStore.Active_Theme}`)
// 	activeTheme.value = parsedUserStore.Active_Theme
// 	inactiveTheme.value = parsedUserStore.Inactive_Theme
// } 
// else {
// 					info("userStore_KEY does NOT EXITS")
// 	activeTheme.value = "light_custom"
// 	inactiveTheme.value = "dark_custom"
// 	const emptyUserStore = localStorage.getItem("userStore_KEY") ? JSON.parse(localStorage.getItem("userStore_KEY")) : null
// 				//info(`emptyUserStore -> ${emptyUserStore.result}`) // throws exception
// 				info2(`emptyUserStore -> ${emptyUserStore}`) // returns null
// 				info3(`${emptyUserStore === null}`) // returns true
// 				info4(`${emptyUserStore === undefined}`) // returns false
// }
// 				info(activeTheme.value)
// 				info(inactiveTheme.value)

//					Create the userStoreInit object
//					This sets all of the initial properties to the default values
let userStoreInit = {
	'Active_Theme': 'light_custom',
	'Inactive_Theme': 'dark_custom',

	'A_Theme':  'light_custom',
	'A_ThemeText': 'light_custom',
	'A_ThemeIcon': 'mdi-toggle-switch',
	'A_ThemeColor':'green',

	'B_Theme': 'dark_custom',
	'B_ThemeText': 'dark_custom',
	'B_ThemeIcon': 'mdi-toggle-switch-off',
	'B_ThemeColor': 'red',

	'connected': false,
	'username': 'blank',
	'preferred_username': 'blank'
} 
				// info(`userStore obj -> ${userStoreInit}`)
				// info(`userStore.Active_Theme obj.prop -> ${Object.getOwnPropertyNames(userStoreInit)}`)
				// info(`userStore obj -> ${userStoreInit.Active_Theme}`)

//				Fetch the current userStore in localStorage
if(localStorage.getItem("userStore_KEY")){
					info1("userStore_KEY -- EXITS")
	let userStoreObj = JSON.parse(localStorage.getItem("userStore_KEY"))
					info(`userStore obj -> ${userStoreObj.Active_Theme}`)

	userStoreInit.Active_Theme =  userStoreObj.Active_Theme
	userStoreInit.Inactive_Theme =  userStoreObj.Inactive_Theme

	userStoreInit.A_Theme = userStoreObj.A_Theme
	userStoreInit.A_ThemeText = userStoreObj.A_ThemeText
	userStoreInit.A_ThemeIcon = userStoreObj.A_ThemeIcon
	userStoreInit.A_ThemeColor = userStoreObj.A_ThemeColor

	userStoreInit.B_Theme = userStoreObj.B_Theme
	userStoreInit.B_ThemeText = userStoreObj.B_ThemeText
	userStoreInit.B_ThemeIcon = userStoreObj.B_ThemeIcon
	userStoreInit.B_ThemeColor = userStoreObj.B_ThemeColor

	userStoreInit.connected = userStoreObj.connected
	userStoreInit.username = userStoreObj.username
	userStoreInit.preferred_username = userStoreObj.preferred_username
} 
// 				info(`userStoreInit.Active_Theme ${userStoreInit.Active_Theme}`)
// 				info(`userStoreInit.Inactive_Theme ${userStoreInit.Inactive_Theme}\n`)
// 				
// 				info2(`userStoreInit.A_Theme ${userStoreInit.A_Theme}`)
// 				info2(`userStoreInit.A_ThemeText ${userStoreInit.A_ThemeText}`)
// 				info2(`userStoreInit.A_ThemeIcon ${userStoreInit.A_ThemeIcon}`)
// 				info2(`userStoreInit.A_ThemeColor ${userStoreInit.A_ThemeColor}\n`)
// 	
// 				info4(`userStoreInit.B_Theme ${userStoreInit.B_Theme}`)
// 				info4(`userStoreInit.B_ThemeText ${userStoreInit.B_ThemeText}`)
// 				info4(`userStoreInit.B_ThemeIcon ${userStoreInit.B_ThemeIcon}`)
// 				info4(`userStoreInit.B_ThemeColor ${userStoreInit.B_ThemeColor}\n`)
// 
// 				info6(`userStoreInit.connected ${userStoreInit.connected}`)
// 				info6(`userStoreInit.username ${userStoreInit.username}`)
// 				info6(`userStoreInit.preferred_username ${userStoreInit.preferred_username}`)

export const useUserPiniaStore = definePiniaStore("userPiniaStore", {
	state: () => {
		//				INITIALIZE the state: propertied based on the userStoreInit Object properties.
		return {
			Active_Theme: userStoreInit.Active_Theme,
			Inactive_Theme: userStoreInit.Inactive_Theme,

			A_Theme: userStoreInit.A_Theme,
			A_ThemeText: userStoreInit.A_ThemeText,
			A_ThemeIcon: userStoreInit.A_ThemeIcon,
			A_ThemeColor: userStoreInit.A_ThemeColor,

			B_Theme: userStoreInit.B_Theme,
			B_ThemeText: userStoreInit.B_ThemeText,
			B_ThemeIcon: userStoreInit.B_ThemeIcon,
			B_ThemeColor: userStoreInit.B_ThemeColor,

			connected: userStoreInit.connected,
			username: userStoreInit.username,
			preferred_username: userStoreInit.preferred_username
		}
	},
// 	state: () => {
// 		return {
// 			//					This code defines the states and initializes them for the first time.
// 			//					Check localStorage, use if found or set with default value
// 
// 			//					THIS WORKS
// 			// Active_Theme: activeTheme,
// 			// Inactive_Theme: inactiveTheme,
// 			Active_Theme: localStorage.getItem("Active_Theme_KEY") ? JSON.parse(localStorage.getItem("Active_Theme_KEY")) : 'light_custom',
// 			Inactive_Theme: localStorage.getItem("Inactive_Theme_KEY") ? JSON.parse(localStorage.getItem("Inactive_Theme_KEY")) : 'dark_custom',
// 
// 			A_Theme: localStorage.getItem("A_Theme_KEY") ? JSON.parse(localStorage.getItem("A_Theme_KEY")) : 'light_custom',
// 			A_ThemeText: localStorage.getItem("A_ThemeText_KEY") ? JSON.parse(localStorage.getItem("A_ThemeText_KEY")) : 'light_custom',
// 			A_ThemeIcon: localStorage.getItem("A_ThemeIcon_KEY") ? JSON.parse(localStorage.getItem("A_ThemeIcon_KEY")) : 'mdi-toggle-switch',
// 			A_ThemeColor: localStorage.getItem("A_ThemeColor_KEY") ? JSON.parse(localStorage.getItem("A_ThemeColor_KEY")) : 'green',
// 
// 			B_Theme: localStorage.getItem("B_Theme_KEY") ? JSON.parse(localStorage.getItem("B_Theme_KEY")) : 'dark_custom',
// 			B_ThemeText: localStorage.getItem("B_ThemeText_KEY") ? JSON.parse(localStorage.getItem("B_ThemeText_KEY")) : 'dark_custom',
// 			B_ThemeIcon: localStorage.getItem("B_ThemeIcon_KEY") ? JSON.parse(localStorage.getItem("B_ThemeIcon_KEY")) : 'mdi-toggle-switch-off',
// 			B_ThemeColor: localStorage.getItem("B_ThemeColor_KEY") ? JSON.parse(localStorage.getItem("B_ThemeColor_KEY")) : 'red',
// 
// 			connected: false,
// 			username: localStorage.getItem("username_KEY") ? JSON.parse(localStorage.getItem("username_KEY")) : 'blank',
// 			preferred_username: localStorage.getItem("preferred_username_KEY") ? JSON.parse(localStorage.getItem("preferred_username_KEY")) : 'blank',
// 		}
// 	},
	actions: {
		deleteAllDevStores() { 		
// 			localStorage.removeItem('Active_Theme_KEY')
// 			localStorage.removeItem('Inactive_Theme_KEY')
// 
// 			localStorage.removeItem('A_Theme_KEY')
// 			localStorage.removeItem('B_Theme_KEY')
// 			localStorage.removeItem('All_Themes_KEY')

			localStorage.removeItem('userStore_KEY')
// 			localStorage.removeItem('connected_KEY')
// 
// 			localStorage.removeItem('username_KEY')
// 			localStorage.removeItem('preferred_username_KEY')
		},
		// empties the entire storage object for that domain.
		clearAllStores() { localStorage.clear()}
	},
	getters: { 
	}
 });

