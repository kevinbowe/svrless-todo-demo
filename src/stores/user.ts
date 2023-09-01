// src/stores/user.ts

import { defineStore as definePiniaStore} from 'pinia'
//					userPiniaStore is the ID of the store.
export const useUserPiniaStore = definePiniaStore("userPiniaStore", {
	state: () => {
		return {
			count: localStorage.getItem("counter_KEY") ? JSON.parse(localStorage.getItem("counter_KEY")) : -1,

			activeTheme: localStorage.getItem("activeTheme_KEY") ? JSON.parse(localStorage.getItem("activeTheme_KEY")) : 'dark_custom',
			inactiveTheme: localStorage.getItem("inactiveTheme_KEY") ? JSON.parse(localStorage.getItem("inactiveTheme_KEY")) : 'light_custom',
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
			
			localStorage.removeItem('activeTheme_KEY')
			localStorage.removeItem('inactiveTheme_KEY')

			localStorage.removeItem('userStore_KEY')
			localStorage.removeItem('connected_KEY')

			localStorage.removeItem('username_KEY')
			localStorage.removeItem('preferred_username_KEY')

		},
		resetAllStores() {
			this.count = 0
			this.activeTheme = "light"
			this.inactiveTheme = "dark"
			this.connected = false
			this.username = "blank"
			this.preferred_username = "blank"
		},
		// empties the entire storage object for that domain.
		clearAllStores() { localStorage.clear()}
	},
	getters: { 
		doubleCount: (state) => { return state.count * 2 },
		squareCount: (state) => { return state.count ** 2 } 
	}
 });

