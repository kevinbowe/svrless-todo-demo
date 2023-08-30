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
	(state) => {
		/**				
		 * 				If we get here, the count or activeTheme variables in [pinia.state] have changed.
		 * 				These references will return the actual value:
		 * 					userStore.count == 4
		 * 					userStore.activeTheme = "dark"
		*/
		localStorage.setItem( "counter_KEY", JSON.stringify(state.userStore.count))
		localStorage.setItem( "activeTheme_KEY", JSON.stringify(state.userStore.activeTheme))
		
		/**
		 * 				This reference will return the whole userStore:
		 * 					userStore == {"count":4,"activeTheme":"dark"}
		 */
		localStorage.setItem( "userStore_KEY", JSON.stringify(state.userStore))
	
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
