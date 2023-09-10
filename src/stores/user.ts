// src/stores/user.ts

import { defineStore as definePiniaStore} from 'pinia'
//					userPiniaStore is the ID of the store.
export const useUserPiniaStore = definePiniaStore("userPiniaStore", {
	state: () => {
		return {
			Active_Theme: localStorage.getItem("Active_Theme_KEY") ? JSON.parse(localStorage.getItem("Active_Theme_KEY")) : 'light',
			Inactive_Theme: localStorage.getItem("Inactive_Theme_KEY") ? JSON.parse(localStorage.getItem("Inactive_Theme_KEY")) : 'dark',

			A_Theme: localStorage.getItem("A_Theme_KEY") ? JSON.parse(localStorage.getItem("A_Theme_KEY")) : 'dark_custom',
			A_ThemeIcon: "",
			A_ThemeColor: "",
			A_ThemeText: "",

			B_Theme: localStorage.getItem("B_Theme_KEY") ? JSON.parse(localStorage.getItem("B_Theme_KEY")) : 'light_custom',
			B_ThemeIcon: "",
			B_ThemeColor: "",
			B_ThemeText: "",

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

