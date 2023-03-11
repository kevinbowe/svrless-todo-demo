// Vuetify
import 'vuetify/styles';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
// import { mdi } from 'vuetify/iconsets/mdi';
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify, ThemeDefinition } from 'vuetify';

const theme1: ThemeDefinition = {
	dark: false,
	colors: {
		primary:'#F4D03F',
		xxbackground: '#B71C1C',
		xxsurface: '#000',
		xxsecondary: '#F4D03F',
		xxerror: '#B00020',
		xxinfo: '#2196F3',
		xxsuccess: '#4CAF50',
		xxwarning: '#FB8C00',
	}
}
const theme2: ThemeDefinition = {
	dark: true,
	colors: {
		primary:'#E74C3C',
		xxbackground: '#FF9800', 
		xxsurface: '#000000',
		xxsecondary: '#8E44AD',
		xxerror: '#B00020',
		xxinfo: '#2196F3',
		xxsuccess: '#4CAF50',
		xxwarning: '#FB8C00',
	},
}

const vuetify = createVuetify({
  components,
  directives,
		theme: {
		defaultTheme: 'light',
		themes: {
			theme1,theme2
		}
	}
});

export default vuetify;
