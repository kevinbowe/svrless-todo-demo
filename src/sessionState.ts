import {reactive} from 'vue'

export const sessionState = reactive({
	connected: false,
	userName: "",
})