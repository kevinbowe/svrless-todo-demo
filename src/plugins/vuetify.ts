// Vuetify
import 'vuetify/styles';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
// import { mdi } from 'vuetify/iconsets/mdi';
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify, ThemeDefinition } from 'vuetify';

const theme10Light: ThemeDefinition = {
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
// const themeSAFElight: ThemeDefinition = {
// 	dark: false,
// 	colors: {
// 		primary:'#F4D03F',
// 		background: '#B71C1C',
// 		surface: '#000',
// 		secondary: '#F4D03F',
// 		error: '#B00020',
// 		info: '#2196F3',
// 		success: '#4CAF50',
// 		warning: '#FB8C00',
// 	}
// }

// const theme1Light: ThemeDefinition = {
// 	dark: false,
// 	colors: {
// 		primary:'#F4D03F',
// 		background: '#B71C1C',
// 		surface: '#000',
// 		secondary: '#F4D03F',
// 		error: '#B00020',
// 		info: '#2196F3',
// 		success: '#4CAF50',
// 		warning: '#FB8C00',
// 	}
// }

// const theme2Dark: ThemeDefinition = {
// 	dark: true,
// 	colors: {
// 		primary:'#E74C3C',
// 		background: '#FF9800', 
// 		surface: '#000000',
// 		secondary: '#8E44AD',
// 		error: '#B00020',
// 		info: '#2196F3',
// 		success: '#4CAF50',
// 		warning: '#FB8C00',
// 	}
// }

// const theme3Dark: ThemeDefinition = {
// 	dark:true,
// 	colors: {
// 		primary: "#33691E",
// 		accent: "#FFCA28",
// 		secondary: "#607D8B",
// 		success: "#FFEB3B",
// 		info: "#2196F3",
// 		warning: "#9C27B0",
// 		error: "#B71C1C",
// 	}
// }



// const vuetify = createVuetify({
export default createVuetify({
	components,
	directives,
	theme: {
		defaultTheme: 'light',
		themes: {
			theme10Light,
			// theme1Light,
			// theme2Dark,
			// theme3Dark
		}
	}
});

// export default vuetify;
