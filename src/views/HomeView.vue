<template>
  <v-app-bar app color="primary" dark>
    <v-app-bar-nav-icon to="/"></v-app-bar-nav-icon>
    <v-toolbar-title>Vue Multi Layouts (v2)</v-toolbar-title>
    <v-spacer></v-spacer>

		<!-- Blogs -->
		<v-menu>
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
        >
          Blogs
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="link in blogLinks"
          :key="link.label"
          :value="link.label"
					:to="link.url"
        >
          <v-list-item-title>{{ link.label }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

		<!-- Articles -->
		<v-menu>
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
        >
          Articles
				</v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="link in articleLinks"
          :key="link.label"
          :value="link.label"
					:to="link.url"
        >
          <v-list-item-title>{{ link.label }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

		<!-- Accounts -->
		<v-menu>
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
        >
          Account
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="link in accountLinks"
          :key="link.label"
          :value="link.label"
					:to="link.url"
        >
          <v-list-item-title>{{ link.label }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

		<!-- About Us -->
		<v-btn
      color="white"
      variant="text"
      class="mx-2"
      rounded="xl"
      to="/about"
    >
      About Us
    </v-btn>

		<!-- Icon:Palette -->
		<v-menu v-model="menu" :close-on-content-click="false" location="end">

			<template v-slot:activator="{ props }">
				<v-btn v-bind="props" color="red">
					<v-icon icon="mdi-palette" size="30" />
				</v-btn>
			</template>

			<v-card min-width="300">
				<v-list>
					<!-- Avatar & Fave-Heart -->
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
				
				<!-- Dark/Light Switch -->
				<v-list>
					<v-list-item>
						<v-switch
							@change="toggleDarkMode"
							:label="`toggle ${switchLabel} mode`"
						/>
					</v-list-item>
					<v-divider />
				</v-list>

				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn variant="text" @click="menu = false">Cancel</v-btn>
					<v-btn color="primary" variant="text" @click="menu = false">Save</v-btn>
				</v-card-actions>

			</v-card>

  	</v-menu>
	</v-app-bar>

	<!-- Main Content w/ <Sandbox> -->
  <v-container class="text-center">

    <h1 class="text-primary">Home</h1>
    <v-btn class="pa-3" to="/about">Go To About</v-btn>
    <br />
    <v-btn color="primary" class="ma-3" to="/profile">Go To Profile</v-btn>

    <Sandbox />

  </v-container>

	<!-- Footer -->
  <v-footer app color="primary" dark fixed>
    <v-row justify="center" no-gutters>
      <!-- List of Menu Buttons -->
			<v-btn
        v-for="link in footerLinks" :key="link.label"
        color="white" variant="text" class="mx-2"
        rounded="xl" :to="link.url"
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
import { useTheme } from "vuetify";
import { ref } from "vue"; // import { ref, computed } from 'vue'
import Sandbox from "../components/Sandbox.vue";

// NEW STUFF -- START
//import {ref} from 'vue'
//	import { useTheme } from 'vuetify';
import { computed } from "vue";

const fav = ref(true);
const menu = ref(false);
//const theme = useTheme();

function toggleDarkMode() {
  theme.global.name.value = theme.current.value.dark ? "light" : "dark";
}

const switchLabel = computed(() => {
  return theme.current.value.dark ? "Light" : "Dark";
});

// NEW STUFF -- END

const links = ref([
  { label: "Home", url: "/" },
  { label: "About Us", url: "/about" },
]);

const blogLinks = ref([
  { label: "Blog 1", url: "/" },
  { label: "Blog 2", url: "/" },
]);

const articleLinks = ref([
  { label: "Article 1", url: "/" },
  { label: "Article 1", url: "/" },
]);




const accountLinks = ref([
  { label: "Profile", url: "/profile" },
  { label: "Signup", url: "/signup" },
	{ label: "Login", url: "/login" },
]);

const footerLinks = ref([
  { label: "Home", url: "/" },
  { label: "About Us", url: "/about" },
  { label: "Profile", url: "/profile" },
]);
const theme = useTheme();
const toggleTheme = () =>
  (theme.global.name.value = theme.global.current.value.dark
    ? "light"
    : "dark");
</script>
