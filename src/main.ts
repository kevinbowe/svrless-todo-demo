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
		 * 					counterStore.count == 4
		 * 					counterStore.activeTheme = "dark"
		*/
		localStorage.setItem( "counter_KEY", JSON.stringify(state.counterStore.count))
		localStorage.setItem( "activeTheme_KEY", JSON.stringify(state.counterStore.activeTheme))
		
		/**
		 * 				This reference will return the whole counterStore:
		 * 					counterStore == {"count":4,"activeTheme":"dark"}
		 */
		localStorage.setItem( "counterStore_KEY", JSON.stringify(state.counterStore))
	
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
