// Vuetify
import 'vuetify/styles';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import '@mdi/font/css/materialdesignicons.css'

import { createVuetify, ThemeDefinition } from 'vuetify';

const light: ThemeDefinition = {
	dark: false,
	colors: {
		//background: 'white',
		//surface: 'grey-darken-3',
		//primary:'deep-purple-accent-1',
		// secondary: 'cyan-darken-3',
		// error: 'red-accent-3',
		//info: 'indigo-darken-3',
		//success: 'green-accent-3',
		//warning: 'lime-accent-2',

		background: '#ffffff',
		surface: '#424242',
		primary:'#6F3AB0',
		secondary: '#00838F',
		error: '#FF1744',
		info: '#283593',
		// success: '#00E676',
		success: '#006304',
		// warning: '#EEFF41',
		warning: '#FF9800',
		// // These must be darker 30%
		// on_background: '#B3B3B3',
		// on_surface: '#212121',
		// on_primary:'#bb86fc',
		// on_secondary: '#03DAC5',
		// on_error: '#CF667A',
		// on_info: '#2196F3',
		// on_success: '#4CAF50',
		// on_warning: '#FB8C00',
	},
}
const dark: ThemeDefinition = {
	dark: true,
	colors: {
		// Reference Only

		// background: 'black',
		// surface: 'grey-darken-3',
		// primary:'purple-darken-4',
		// secondary: 'cyan',
		// error: 'red-accent-3',
		// info: 'indigo-darken-3',
		// success: 'green-accent-3',
		// warning: 'lime-accent-2',

		background: '#000000',
		surface: '#424242',
		primary:'#311B92',
		secondary: '#00BCD4',
		error: '#FF1744',
		info: '#283593',
		success: '#00E676',
		//warning: '#00E676',
		warning: '#EEFF41',

		// // These must be darker 30%
		// on_background: '#5F5F5F',
		// on_surface: '#6E6E6E',
		// on_primary:'#6F3AB0',
		// on_secondary: '#008E79',
		// on_error: '#831A2E',
		// on_info: '#004AA7',
		// on_success: '#006304',
		// on_warning: '#AF4000',

	},
}
const light_custom: ThemeDefinition = {
	dark: false,
	colors: {
		// background: '#F44336', 
		background: '#E0E0E0', 
		// surface: '#000000',
		//	surface: '#424242',
		surface: '#424242',
		//primary:'#F4D03F',
		primary:'#FF9800',
		secondary: '#40F576',
		error: '#B00020',
		info: '#2196F3',
		success: '#006304',
		// warning: '#FFFF7F',
		warning: '#FF9800',
		// These must be darker - 30%
		// on_background: '#FF9083',
		// on_surface: '#4D4D4D',
		// on_primary:'#FFFF8C',
		// on_secondary: '#8DFFC3',
		// on_error: '#FD4D6D',
		// on_info: '#6EE3FF',
		// on_success: '#4CAF50',
		// on_warning: '#FFFFCC',
	},
}
const dark_custom: ThemeDefinition = {
	dark: true,
	colors: {
		// background: '#FF9800', 
		background: '#424242', 
		surface: '#000000',
		primary:'#E74C3C',
		secondary: '#8E44AD',
		error: '#B00020',
		info: '#2196F3',
		success: '#4CAF50',
		warning: '#FB8C00',
		// These must be lighter - 30%
		// on_background: '#FFE54D',
		// on_surface: '#4D4D4D',
		// on_primary:'#FF9989',
		// on_secondary: '#DB91FA',
		// on_error: '#FD4D6D',
		// on_info: '#6EE3FF',
		// on_success: '#99FC9D',
		// on_warning: '#FFD94D',
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
