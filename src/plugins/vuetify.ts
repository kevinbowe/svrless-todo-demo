// Vuetify
import 'vuetify/styles';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import '@mdi/font/css/materialdesignicons.css'

import { createVuetify, ThemeDefinition } from 'vuetify';

const light: ThemeDefinition = {
	dark: false,
	colors: {
		background: '#ffffff',
		surface: '#424242',
		primary:'#6F3AB0',
		secondary: '#00838F',
		error: '#FF1744',
		info: '#283593',
		success: '#006304',
		warning: '#FF9800',
		important: '#795548',
	},
}
const dark: ThemeDefinition = {
	dark: true,
	colors: {
		background: '#000000',
		surface: '#424242',
		primary:'#311B92',
		secondary: '#00BCD4',
		error: '#FF1744',
		info: '#283593',
		success: '#00E676',
		warning: '#EEFF41',
		important: '#795548',
	},
}
const light_custom: ThemeDefinition = {
	dark: false,
	colors: {
		background: '#E0E0E0', 
		surface: '#424242',
		primary:'#FF9800',
		secondary: '#40F576',
		error: '#B00020',
		info: '#2196F3',
		success: '#006304',
		warning: '#FF9800',
		important: '#795548',
	},
}
const dark_custom: ThemeDefinition = {
	dark: true,
	colors: {
		background: '#424242', 
		surface: '#000000',
		primary:'#E74C3C',
		secondary: '#8E44AD',
		error: '#B00020',
		info: '#2196F3',
		success: '#4CAF50',
		warning: '#FB8C00',
		important: '#795548',
	}
}

export default createVuetify({
	components,
	directives,
	theme: {
		defaultTheme: 'light',
		themes: {
			light,
			dark,
			light_custom,
			dark_custom,
		}
	}
});
