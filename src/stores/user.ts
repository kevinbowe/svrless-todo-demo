// src/stores/user.ts

import { defineStore } from 'pinia'
// 		ref()s become state properties
// 		computed()s become getters
// 		function()s become actions

//					userStore is the ID of the store.
export const useUserStore = defineStore("userStore", {
	state: () => {
		return {
			count: localStorage.getItem("counter_KEY") ?
					JSON.parse(localStorage.getItem("counter_KEY")) : -1,

			activeTheme: localStorage.getItem("activeTheme_KEY") ?
					JSON.parse(localStorage.getItem("activeTheme_KEY")) : 'dark_custom',
					
			connected: false 
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
			localStorage.removeItem('userStore_KEY')
			localStorage.removeItem('connected_KEY')
		},
		resetAllStores() {
			this.count = 0
			this.activeTheme = "light"
			this.connected = false
		},
		// empties the entire storage object for that domain.
		clearAllStores() { localStorage.clear()}
	},

	getters: { 
		doubleCount: (state) => { return state.count * 2 },
		squareCount: (state) => { return state.count ** 2 } 
	}
 });

