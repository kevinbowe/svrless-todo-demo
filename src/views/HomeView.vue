<template>


		<v-menu v-model="menu" :close-on-content-click="false" location="end" >
				<template v-slot:activator="{ props }" >
					<v-btn color="indigo" v-bind="props" >
						<v-icon size="30" color="primary" >mdi-palette</v-icon>
					</v-btn>
    		</template>
        <v-card min-width="300">
          <v-list>
            <v-list-item
							prepend-avatar="./src/assets/Beard_DaBowe.svg"
              title="Da Bowe"
              subtitle="Mr Bowe if yo' nasty"
            >
              <template v-slot:append>
                <v-btn
                  variant="text"
                  :class="fav ? 'text-red' : ''"
                  icon="mdi-heart"
                  @click="fav = !fav"
                ></v-btn>
              </template>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-list>
						<v-list-item>
              <v-switch @change="toggleDarkMode" :label="`toggle ${switchLabel} mode`" />
            </v-list-item>
					 <v-divider />
          </v-list>
  
          <v-card-actions>
            <v-spacer></v-spacer>
  
            <v-btn
              variant="text"
              @click="menu = false"
            >
              Cancel
            </v-btn>
            <v-btn
              color="primary"
              variant="text"
              @click="menu = false"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>

		<v-app-bar app color="primary" dark>

	 <v-app-bar-nav-icon to="/"></v-app-bar-nav-icon>
		<v-toolbar-title>Vue Multi Layouts (v2)</v-toolbar-title>
		<v-spacer></v-spacer>
		<v-btn
			v-for="link in links" :key=link.label
			color="white"
			variant="text"
			class="mx-2"
			rounded="xl"
			:to="link.url"
		> 
			{{ link.label }}
		</v-btn>
		<v-btn @click="toggleTheme" text rounded>
				<v-icon size="30" >mdi-palette</v-icon>
			</v-btn>
		</v-app-bar>


		<v-container class="text-center">
			<h1 class="text-primary">Home</h1>
			<v-btn class="pa-3" to="/about">Go To About</v-btn>
			<br />
			<v-btn color="primary" class="ma-3" to="/profile">Go To Profile</v-btn>

			<Sandbox />

		</v-container>


	<v-footer app color="primary" dark fixed>
		<v-row justify="center" no-gutters>
			<v-btn
				v-for="link in footerLinks" :key=link.label
				color="white"
				variant="text"
				class="mx-2"
				rounded="xl"
				:to=link.url
			>
				{{ link.label }}
			</v-btn>
			<v-col class="text-center mt-4" cols="12">
				<strong>DaBowe.com</strong> &copy {{ new Date().getFullYear() }}
			</v-col>
		</v-row>
	</v-footer>

</template>

<script lang="ts" setup>
import { useTheme } from 'vuetify';
import {ref} from 'vue' // import { ref, computed } from 'vue'
import Sandbox from '../components/Sandbox.vue'

// NEW STUFF -- START
//import {ref} from 'vue' 
//	import { useTheme } from 'vuetify';
	import { computed } from "vue";
	
	const fav = ref(true);
	const menu = ref(false);
	//const theme = useTheme();

	function toggleDarkMode () {
		theme.global.name.value = theme.current.value.dark ? 'light' : 'dark';
	};

	const switchLabel = computed( () => {
		return theme.current.value.dark ? 'Light' : 'Dark'
	});



// NEW STUFF -- END



const links = ref( [
				{label: 'Home', url: '/' },
				{label: 'Login', url: '/login'},
				{label: 'Signup',url: '/signup'}]);
const footerLinks = ref( [
				{label: 'Home', url: '/' },
				{label: 'About', url: '/about'},
				{label: 'Profile',url: '/profile'}]);
const theme = useTheme();
const toggleTheme = () => theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';

</script>
