// src/stores/counter.ts

import { defineStore } from 'pinia'
// 		ref()s become state properties
// 		computed()s become getters
// 		function()s become actions

//					counterStore is the ID of the store.
export const useCounterStore = defineStore("counterStore", {
	state: () => {
		return {
			count: localStorage.getItem("counter_KEY") ?
					JSON.parse(localStorage.getItem("counter_KEY")) : -1,

			activeTheme: localStorage.getItem("activeTheme_KEY") ?
					JSON.parse(localStorage.getItem("activeTheme_KEY")) : 'dark_custom' 
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
			localStorage.removeItem('counterStore_KEY')
		},
		resetAllStores() {
			this.count = 0
			this.activeTheme = "light"
		},
		// empties the entire storage object for that domain.
		clearAllStores() { localStorage.clear()}
	},

	getters: { 
		doubleCount: (state) => { return state.count * 2 },
		squareCount: (state) => { return state.count ** 2 } 
	}
 });

