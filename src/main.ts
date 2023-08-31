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
		/**				
		 * 				If we get here, the count or activeTheme variables in [pinia_state] have changed.
		 * 				These references will return the actual value:
		 * 					userPiniaStore.count == 4
		 * 					userPiniaStore.activeTheme = "dark"
		*/
		localStorage.setItem( "counter_KEY", JSON.stringify(pinia_state.userPiniaStore.count))
		localStorage.setItem( "activeTheme_KEY", JSON.stringify(pinia_state.userPiniaStore.activeTheme))
		localStorage.setItem( "connected_KEY", JSON.stringify(pinia_state.userPiniaStore.connected))

		localStorage.setItem( "username_KEY", JSON.stringify(pinia_state.userPiniaStore.username))
		localStorage.setItem( "preferred_username_KEY", JSON.stringify(pinia_state.userPiniaStore.preferred_username))
	
		/**
		 * 				This reference will return the whole userStore:
		 * 					userPiniaStore == {"count":-1,"activeTheme":"dark_custom","connected":false}
		 */
		localStorage.setItem( "userStore_KEY", JSON.stringify(pinia_state.userPiniaStore))	
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
