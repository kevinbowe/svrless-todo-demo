// Vuetify 
import 'vuetify/styles';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify, ThemeDefinition } from 'vuetify';
//import colors from 'vuetify/lib/util/colors'

// import colors from 'vuetify/lib/util/colors';
/* Cannot find module 'vuetify/lib/util/colors' or its corresponding type declarations.ts(2307) 
 * The file exists here: /node_modules/vuetify/lib/util/colors.mjs  */

const light: ThemeDefinition = {
	dark: false,
	colors: {
		background: '#ffffff',
		border: '#000000', 
		border_alt: '#ffffff',
		surface: '#E0E0E0',
		surface_alt: '#ffffff',
		primary:'#6F3AB0',
		secondary: '#00838F',
		error: '#FF1744',
		info: '#283593',
		success: '#006304',
		warning: '#FF9800',
		important: '#795548',
		minor: '#FFCDD2', 
		major: '#FF80AB',
		link:   '#0D47A1' 
	},
}
const dark: ThemeDefinition = {
	dark: true,
	colors: {
		background: '#000000',
		border: '#ffffff', 
		border_alt: '#000000', 
		surface: '#e0e0e0', 
		surface_alt: '#F5F5F5',
		primary:'#392056',
		secondary: '#00BCD4',
		error: '#FF1744',
		info: '#283593',
		success: '#00E676',
		warning: '#EEFF41',
		important: '#795548',
		minor: '#FFCDD2', 
		major: '#FF80AB',
		link: '#2196F3'
	},
}
const light_custom: ThemeDefinition = {
	dark: false,
	colors: {
		background: '#ffffff', // WHITE
		border: '#000000', // BLACK
		border_alt: '#ffffff', // WHITE
		surface: '#E0E0E0', // GREY-LIGHTEN-2
		surface_alt: '#ffffff', // WHITE
		primary:'#36653b', // GREEN
		secondary: '#5171a4', // BLUE
		error: '#FF1744',
		info: '#283593',
		success: '#006304',
		warning: '#FF9800',
		important: '#795548',
		minor: '#a4519b', // PURPLE
		major: '#a48451', // GOLD
		link:   '#0D47A1' 
	},
}
const dark_custom: ThemeDefinition = {
	dark: true,
	colors: {
		background: '#000000', // BLACK
		border: '#FFFFFF', // WHITE
		border_alt: '#000000', // BLACK
		surface: '#E0E0E0', // GREY-LIGHTEN-2
		surface_alt: '#ffffff', // WHITE
		primary:'#36653b', // GREEN
		secondary: '#5171a4', // BLUE
		error: '#FF1744',
		info: '#283593',
		success: '#006304',
		warning: '#FF9800',
		important: '#795548',
		minor: '#a4519b', // PURPLE
		major: '#a48451', // GOLD
		link:   '#0D47A1' 
	}
}

export default createVuetify({
	display: { mobileBreakpoint: 'sm' },
	components,
	directives,
	theme: {
		// defaultTheme: 'light',
		// defaultTheme: 'dark',
		themes: {
			light,
			dark,
			light_custom,
			dark_custom,
		}
	}
});
