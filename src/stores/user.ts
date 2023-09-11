// src/stores/user.ts

import { defineStore as definePiniaStore} from 'pinia'
//					userPiniaStore is the ID of the store.
export const useUserPiniaStore = definePiniaStore("userPiniaStore", {
	state: () => {
		return {
			//					This code defines the states and initializes them for the first time.
			//					Check localStorage, use if found or set with default value
			Active_Theme: localStorage.getItem("Active_Theme_KEY") ? JSON.parse(localStorage.getItem("Active_Theme_KEY")) : 'light_custom',
			Inactive_Theme: localStorage.getItem("Inactive_Theme_KEY") ? JSON.parse(localStorage.getItem("Inactive_Theme_KEY")) : 'dark_custom',

			A_Theme: localStorage.getItem("A_Theme_KEY") ? JSON.parse(localStorage.getItem("A_Theme_KEY")) : 'light_custom',
			A_ThemeText: localStorage.getItem("A_ThemeText_KEY") ? JSON.parse(localStorage.getItem("A_ThemeText_KEY")) : 'light_custom',
			A_ThemeIcon: localStorage.getItem("A_ThemeIcon_KEY") ? JSON.parse(localStorage.getItem("A_ThemeIcon_KEY")) : 'mdi-toggle-switch',
			A_ThemeColor: localStorage.getItem("A_ThemeColor_KEY") ? JSON.parse(localStorage.getItem("A_ThemeColor_KEY")) : 'green',

			B_Theme: localStorage.getItem("B_Theme_KEY") ? JSON.parse(localStorage.getItem("B_Theme_KEY")) : 'dark_custom',
			B_ThemeText: localStorage.getItem("B_ThemeText_KEY") ? JSON.parse(localStorage.getItem("B_ThemeText_KEY")) : 'dark_custom',
			B_ThemeIcon: localStorage.getItem("B_ThemeIcon_KEY") ? JSON.parse(localStorage.getItem("B_ThemeIcon_KEY")) : 'mdi-toggle-switch-off',
			B_ThemeColor: localStorage.getItem("B_ThemeColor_KEY") ? JSON.parse(localStorage.getItem("B_ThemeColor_KEY")) : 'red',

			connected: false,
			username: localStorage.getItem("username_KEY") ? JSON.parse(localStorage.getItem("username_KEY")) : 'blank',
			preferred_username: localStorage.getItem("preferred_username_KEY") ? JSON.parse(localStorage.getItem("preferred_username_KEY")) : 'blank',
		}
	},
	actions: {
		deleteAllStores() { 		
			localStorage.removeItem('Active_Theme_KEY')
			localStorage.removeItem('Inactive_Theme_KEY')

			localStorage.removeItem('A_Theme_KEY')
			localStorage.removeItem('B_Theme_KEY')
			localStorage.removeItem('All_Themes_KEY')

			localStorage.removeItem('userStore_KEY')
			localStorage.removeItem('connected_KEY')

			localStorage.removeItem('username_KEY')
			localStorage.removeItem('preferred_username_KEY')
		},
		// empties the entire storage object for that domain.
		clearAllStores() { localStorage.clear()}
	},
	getters: { 
	}
 });

