// src/stores/user.ts

import { defineStore as definePiniaStore} from 'pinia'
//					userPiniaStore is the ID of the store.
export const useUserPiniaStore = definePiniaStore("userPiniaStore", {
	state: () => {
		return {
			count: localStorage.getItem("counter_KEY") ? JSON.parse(localStorage.getItem("counter_KEY")) : -1,

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
		increment(value = 1) { this.count += value },
		decrement(value = 1) { this.count -= value },
		reset() { this.count = 0 },
		deleteCounterKeyStore() { localStorage.removeItem('counter_KEY')},
		deleteAllStores() { 
			localStorage.removeItem('counter_KEY')
			
			localStorage.removeItem('A_Theme_KEY')
			localStorage.removeItem('B_Theme_KEY')
			localStorage.removeItem('All_Themes_KEY')

			localStorage.removeItem('userStore_KEY')
			localStorage.removeItem('connected_KEY')

			localStorage.removeItem('username_KEY')
			localStorage.removeItem('preferred_username_KEY')
		},
		resetAllStores() {
			this.count = 0
			this.A_Theme = "light"
			this.B_Theme = "dark"
		},
		// empties the entire storage object for that domain.
		clearAllStores() { localStorage.clear()}
	},
	getters: { 
		doubleCount: (state) => { return state.count * 2 },
		squareCount: (state) => { return state.count ** 2 } 
	}
 });

