import {reactive} from 'vue'

export const sessionState = reactive({
	// counter:0,	// Debug Only

	connected: false,
	userName: "",
	theme:"",
	themeInactive: "",
	themeDirty: false
})