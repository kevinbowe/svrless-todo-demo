<template>
  <v-layout>
    <v-main>
      <v-app-bar app color="primary" dark>
        <v-app-bar-nav-icon to="/" icon="mdi-home" size="30"></v-app-bar-nav-icon>
        <v-toolbar-title>Vue Multi Themes (v11)</v-toolbar-title>
        <v-spacer></v-spacer>
				
				<v-btn color="white" variant="plain" class="mx-2" rounded="xl" to="/dev" >
					Dev
				</v-btn>

				<v-btn color="white" variant="plain">Blogs
					<v-menu activator="parent">
						<v-list>
							<v-list-item v-for="link in blogLinks" :key="link.label" :value="link.label" :to="link.url" >
								<v-list-item-title>{{ link.label }}</v-list-item-title>
							</v-list-item>
						</v-list>
					</v-menu>
				</v-btn>
				
				<v-btn color="white" variant="plain">Articles
					<v-menu activator="parent">
						<v-list>
							<v-list-item v-for="link in articleLinks" :key="link.label" :value="link.label" :to="link.url" >
								<v-list-item-title>{{ link.label }}</v-list-item-title>
							</v-list-item>
						</v-list>
					</v-menu>
				</v-btn>
				
				<v-btn color="white" variant="plain"> Account
					<v-menu activator="parent">
						<v-list>
							<v-list-item v-for="link in accountLinks" :key="link.label" :value="link.label" :to="link.url" >
								<v-list-item-title>{{ link.label }}</v-list-item-title>
							</v-list-item>
						</v-list>
					</v-menu>
				</v-btn>

				<v-btn color="white" variant="plain" class="mx-2" rounded="xl" to="/about" >
					About Us
				</v-btn>

				<v-btn variant="plain">
					<v-tooltip activator="parent" location="bottom">Toggle Theme</v-tooltip>
					<v-icon color="secondary" icon="mdi-palette" size="30" />
					<v-menu v-model="menu" activator="parent" :close-on-content-click="false" location="end">
						<v-card min-width="300">
							<v-card-actions>
								<v-spacer></v-spacer>
								<v-btn variant="text" @click="menu = false">Cancel</v-btn>
								<v-btn color="primary" variant="text" @click="menu = false">Save</v-btn>
							</v-card-actions>
							<v-divider></v-divider>
							<v-list>
								<v-list-item>
									<v-switch @change="toggleDarkMode" :label="`toggle ${switchLabel} mode`" />
								</v-list-item>
								<v-divider />
							</v-list>


							<!-- Put the Theme Picker below here -->
							<ThemeChanger />


						</v-card>
					</v-menu>
				</v-btn>
      </v-app-bar>

      <!-- |||||| START Content is insertio |||||| -->
			<slot></slot>
      <!-- |||||| START Content is insertio |||||| -->

      <v-footer app color="primary" dark fixed>
        <v-row justify="center" no-gutters>
          <v-btn
            v-for="link in footerLinks"
            :key="link.label"
            color="white"
            variant="text"
            class="mx-2"
            rounded="xl"
            :to="link.url"
          >
            {{ link.label }}
          </v-btn>

          <v-col class="text-center mt-4" cols="12">
            <strong>DaBowe.com</strong> &copy {{ new Date().getFullYear() }}
          </v-col>
        </v-row>
      </v-footer>
    </v-main>
  </v-layout>
</template>

<script lang="ts">
export default {
    name: "MasterLayout",
    components: { 
		ThemeChanger 
	}
};
</script>

<script lang="ts" setup>
import { useTheme } from "vuetify";
import { ref,  computed } from "vue";
import ThemeChanger from "../components/ThemeChanger.vue";

const fav = ref(true);
const menu = ref(false);

function toggleDarkMode() {
  theme.global.name.value = theme.current.value.dark ? "light" : "dark";
}

const switchLabel = computed(() => {
  return theme.current.value.dark ? "Light" : "Dark";
});

const blogLinks = ref([
  { label: "Blog 1", url: "/blog1" },
  { label: "Blog 2", url: "/blog2" },
]);

const articleLinks = ref([
  { label: "Article 1", url: "/article1" },
  { label: "Article 2", url: "/article2" },
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
