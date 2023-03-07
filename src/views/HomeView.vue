<template>
		<v-app-bar app color="primary" dark>
			<v-app-bar-nav-icon to="/"></v-app-bar-nav-icon>
			<v-toolbar-title>Vuetify-Base-2 Dashboard</v-toolbar-title>
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
			<v-btn @click="toggleTheme" text rounded>Toggle Theme</v-btn>
			</v-app-bar>

    <v-container class="text-center">
        <h1>Home</h1>
        <v-btn class="pa-3" to="/about">Go To About</v-btn>
        <br />
        <v-btn color="primary" class="ma-3" to="/profile">Go To Profile</v-btn>
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
