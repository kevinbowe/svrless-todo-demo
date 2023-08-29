import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// 		ref()s become state properties
// 		computed()s become getters
// 		function()s become actions

export const useUserStore = defineStore('user', () => {
	// const dirty = ref(false)

	//				Debug/Experimental Code
	const count = ref(0)
	const name = ref('Mista Boh')
	const doubleCount = computed(() => count.value * 2)
	function increment() {
	  count.value++
	}
	return { /* dirty, */ count, name, doubleCount, increment }
 })
