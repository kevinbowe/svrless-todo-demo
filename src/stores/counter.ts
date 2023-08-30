// src/stores/counter.ts

import { ref, computed } from 'vue'
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
		reset() { this.count = 0 }
	},

	getters: { 
		doubleCount: (state) => { return state.count * 2 },
		squareCount: (state) => { return state.count ** 2 } 
	}
 });

