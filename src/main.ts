// path: src/main.ts
import { createApp, watch } from 'vue';

import './style.css';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';

// Amplify
import { Amplify } from 'aws-amplify'
import AmplifyVue from '@aws-amplify/ui-vue'
//	NOTE: aws-exports.js had to be renamed to aws-exports.ts
import awsExports from './aws-exports'
Amplify.configure(awsExports)
import { registerLayouts } from './layouts/register';

// Pinia -- State Management
import { createPinia } from 'pinia';
const pinia = createPinia()

const app = createApp(App);

watch (
	pinia.state,
	(pinia_state) => {
		//				If we get here one of the pinia_state variables has changed.
		//				This will cause the localstorage to be updated based on the state data that is referenced.
		localStorage.setItem( "Active_Theme_KEY", JSON.stringify(pinia_state.userPiniaStore.Active_Theme))
		localStorage.setItem( "Inactive_Theme_KEY", JSON.stringify(pinia_state.userPiniaStore.Inactive_Theme))

		localStorage.setItem( "A_Theme_KEY", JSON.stringify(pinia_state.userPiniaStore.A_Theme))
		localStorage.setItem( "B_Theme_KEY", JSON.stringify(pinia_state.userPiniaStore.B_Theme))

		localStorage.setItem( "connected_KEY", JSON.stringify(pinia_state.userPiniaStore.connected))
		
		localStorage.setItem( "username_KEY", JSON.stringify(pinia_state.userPiniaStore.username))
		localStorage.setItem( "preferred_username_KEY", JSON.stringify(pinia_state.userPiniaStore.preferred_username))
		
		//------------------------------------------------------------------------
		// 	This will return the whole userStore as a single localStorage object.
		//		EXAMPLE: userPiniaStore == {"count":-1,"A_Theme":"dark_custom","connected":false, ...}
		localStorage.setItem( "userStore_KEY", JSON.stringify(pinia_state.userPiniaStore))	
				
		//------------------------------------------------------------------------

	},
	{ deep: true }
)

app.use(pinia)
app.use(router);
app.use(AmplifyVue)
app.use(vuetify);

registerLayouts(app);
app.mount('#app');

/* ----------------------------------------------------------------------------- */
