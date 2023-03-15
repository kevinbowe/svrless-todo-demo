// Vuetify
import 'vuetify/styles';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
//import { mdi } from 'vuetify/iconsets/mdi';
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify, ThemeDefinition } from 'vuetify';

const light_custom: ThemeDefinition = {
	dark: false,
	colors: {
		primary:'#F4D03F',
		background: '#B71C1C',
		surface: '#000',
		secondary: '#F4D03F',
		error: '#B00020',
		info: '#2196F3',
		success: '#4CAF50',
		warning: '#FB8C00',
	}
}
const dark_custom: ThemeDefinition = {
	dark: true,
	colors: {
		primary:'#E74C3C',
		background: '#FF9800', 
		surface: '#000000',
		secondary: '#8E44AD',
		error: '#B00020',
		info: '#2196F3',
		success: '#4CAF50',
		warning: '#FB8C00',
	}
}
export default createVuetify({
	components,
	directives,
	theme: {
		defaultTheme: 'light',
		themes: {
			light_custom,
			dark_custom,
		}
	}
});
