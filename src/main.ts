// path: src/main.ts
import { createApp, watch } from 'vue';

import './style.css';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';

// Amplify
import { Amplify } from 'aws-amplify'
//import AmplifyVue from '@aws-amplify/ui-vue'
//	NOTE: aws-exports.js had to be renamed to aws-exports.ts
import awsExports from './aws-exports'
Amplify.configure(awsExports)
import { registerLayouts } from './layouts/register';
import { createPinia } from 'pinia';

/* ----------------------------------------------------------------------------- */
import { info, info1, info2 , info3, info4, info5, info6, info7 } from "./my-util-code/MyConsoleUtil"
import { enter, enter0, enter1, enter2, enter3, enter4, enter5, enter6, enter7 } from "./my-util-code/MyConsoleUtil"
import { bar, whitebar, greybar, redbar, greenbar, orangebar } from "./my-util-code/MyConsoleUtil"
/* ----------------------------------------------------------------------------- */

const pinia = createPinia()
const app = createApp(App);

watch (
	pinia.state,
	(pinia_state) => {
		//------------------------------------------------------------------------
		//			This will stringify the WHOLE userPiniaStore and update the LocalStorage, userStore_KEY
		//			EXAMPLE:
		//			userStore_KEY = {"Active_Theme":"light_custom","Inactive_Theme":"dark_custom", ... }
		localStorage.setItem( "userStore_KEY", JSON.stringify(pinia_state.userPiniaStore))	
		//------------------------------------------------------------------------
	},
	{ deep: true }
)

app.use(pinia)
app.use(router);
// app.use(AmplifyVue)
app.use(vuetify);

registerLayouts(app);
app.mount('#app');

/* ----------------------------------------------------------------------------- */
