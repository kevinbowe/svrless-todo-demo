<template>
	<v-layout>
		<v-main>
			<v-app-bar color="blue-grey-darken-1">

			<!-- |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| -->
			<!-- ||||||  START Mobile Burger Menu Layout  -->

				<v-app-bar-nav-icon size="30" icon="mdi-menu" class="d-sm-none">
					<v-icon />
					<v-menu activator="parent">
						<v-list>

							<v-list-Item to="/dev">
								Dev
							</v-list-Item>

							<v-list-item :to="link.url" v-for="link in devLinks" :key="link.label" :value="link.label">
								<v-list-item-title to="/"> 
									{{ link.label }} 
								</v-list-item-title>
							</v-list-item>

							<v-list-item :to="link.url" v-for="link in blogLinks" :key="link.label" :value="link.label">
								<v-list-item-title to="/">
									{{ link.label }}
								</v-list-item-title>
							</v-list-item>

							<v-list-item :to="link.url" v-for="link in accountLinks" :key="link.label" :value="link.label">
								<v-list-item-title>
									{{ link.label }}
								</v-list-item-title>
							</v-list-item>

							<v-btn variant="plain">
								<v-tooltip activator="parent" location="bottom">
									Toggle Theme
								</v-tooltip>
								<v-icon color="secondary" icon="mdi-palette" size="30"/>
								<v-menu v-model="menu" activator="parent" location="end" :close-on-content-click="false">
									<v-card>
										<v-card-actions>
											<v-spacer />
											<v-btn variant="text" @click="menu = false">
												Cancel
											</v-btn>
											<v-btn color="primary" variant="text" @click="menu = false">
												Save
											</v-btn>
										</v-card-actions>
										<ThemeChanger />
										<ThemePreview />
									</v-card>
								</v-menu>
							</v-btn>

						</v-list>
					</v-menu>
				</v-app-bar-nav-icon>

				<!-- |||||| END Mobile Burger Menu Layout -->
				<!-- |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| -->

				<v-app-bar-title>
					<a href="/" class="text-decoration-none"> {{ mainTitle }} </a>
				</v-app-bar-title>
				<v-spacer />
				<template v-slot:append>

					<!-- //////	START Mobile dots-verticle Menu ////// -->

					<v-btn color="white" variant="plain" class="d-sm-none">
						<v-icon icon="mdi-dots-vertical" />
						<v-menu activator="parent">
							<v-list>
								<!-- Profile | Sign In -->
								<v-list-item :to="link.url" v-for="link in accountLinks" :key="link.label" :value="link.label" >
									<v-list-item-title>
										{{ link.label }}
									</v-list-item-title>
								</v-list-item>
								
								<!-- Palette / Theme -->
								<v-btn variant="plain">
									<v-tooltip activator="parent" location="bottom">
										Toggle Theme
									</v-tooltip>
									<v-icon color="secondary" icon="mdi-palette" size="30" />
									<v-menu v-model="menu" activator="parent" location="end" :close-on-content-click="false">
										<v-card>
											<v-card-actions>
												<v-spacer />
												<v-btn variant="text" @click="menu = false">
													Cancel
												</v-btn>
												<v-btn color="primary" variant="text" @click="menu = false">
													Save
												</v-btn>
											</v-card-actions>

											<ThemeChanger />
											<ThemePreview />
										
										</v-card>
									</v-menu>
								</v-btn>
							</v-list>
						</v-menu>
					</v-btn>

					<!-- //////	END Mobile dots-verticle Menu -->
					<!-- |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| -->
					<!-- //////	START Desktop Menu -->

					<!-- Menu [ Profile | Dev | Devs | Blogs | Account ] -->
					<!-- Theme switch -->
					<v-switch class="mt-6" density="compact" :flat="true" inset @change="onChangeSwitch" ></v-switch>

					<!-- Profile -->
					<v-btn to="/profile" color="white" variant="plain" rounded="xl" class="mx-2 d-none d-sm-flex">Profile</v-btn>

					<!-- Dev -->
					<v-btn to="/dev6" color="white" variant="plain" rounded="xl" class="mx-2 d-none d-sm-flex">Dev 6</v-btn>

					<!-- Devs -->
					<v-btn color="white" variant="plain" class="mx-2 d-none d-sm-flex"> Develope
						<v-menu activator="parent">
							<v-list>
								<v-list-item :to="link.url" v-for="link in devLinks" :key="link.label" :value="link.label">
									<v-list-item-title>
										{{ link.label }}
									</v-list-item-title>
								</v-list-item>
							</v-list>
						</v-menu>
					</v-btn>

					<!-- Blogs -->
					<v-btn color="white" variant="plain" class="mx-2 d-none d-sm-flex"> Blogs
						<v-menu activator="parent">
							<v-list>
								<v-list-item :to="link.url" 
									v-for="link in blogLinks" :key="link.label" :value="link.label"
								>
									<v-list-item-title>
										{{ link.label }}
									</v-list-item-title>
								</v-list-item>
							</v-list>
						</v-menu>
					</v-btn>

					<!-- Account : [ Profile | Sign In | Palette ] -->
					<v-btn color="white" variant="plain" class="mx-2 d-none d-sm-flex"> Account
						<v-menu activator="parent">
							<v-list>
								<v-list-item :to="link.url" 
									v-for="link in accountLinks" :key="link.label" :value="link.label" 
								>
									<v-list-item-title>
										{{ link.label }}
									</v-list-item-title>
								</v-list-item>
								<v-btn variant="plain">
									<v-tooltip activator="parent" location="bottom">
										Toggle Theme
									</v-tooltip>
									<v-icon color="secondary" icon="mdi-palette" size="30"
									></v-icon>
									<v-menu v-model="menu" activator="parent" location="end" 
										:close-on-content-click="false"
									>
										<v-card>
											<v-card-actions>
												<v-spacer />
												<v-btn variant="text" @click="menu = false"> 
													Cancel
												</v-btn>
												<v-btn color="primary" variant="text" @click="menu = false"> 
													Save
												</v-btn>
											</v-card-actions>
											<ThemeChanger />
											<ThemePreview />
										</v-card>
									</v-menu>
								</v-btn>
							</v-list>
						</v-menu>
					</v-btn>


					<!-- //////	END Desktop Menu -->
					<!-- |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| -->
				
				</template>
			</v-app-bar>

			<!-- |||||| START Content insertion here |||||||||||||||||||||||||||||| -->
			<slot></slot>
			<!-- |||||| END Content insertion here |||||||||||||||||||||||||||||||| -->

			<v-footer app color="primary" dark fixed>
				<v-row justify="center" no-gutters>
					<v-btn :to="link.url" color="white" variant="text" rounded="xl" 
						v-for="link in footerLinks" :key="link.label" class="mx-2"
					>
						{{ link.label }}
					</v-btn>
					<v-col cols="12" class="text-center mt-4"> 
							<strong>DaBowe.com</strong> &copy {{ new Date().getFullYear() }}
					</v-col>
				</v-row>
			</v-footer>

		</v-main>
	</v-layout>
</template>
<script setup lang="ts" >
import { useTheme } from "vuetify";
import { ref } from "vue";
import ThemeChanger from "../components/ThemeChanger.vue";
import ThemePreview from "../components/ThemePreview.vue";
// <v-app-bar-title>
const mainTitle: string = "v3-Auth-Vtfy3-v1"

const menu = ref(false);
const devLinks = ref([
	{ label: "Dev 65", url: "/dev6" },
	{ label: "Dev 5", url: "/dev5" },
	{ label: "Dev 4", url: "/dev4" },
	{ label: "Dev 3", url: "/dev3" },
	{ label: "Dev 2", url: "/dev2" },
	{ label: "Dev 1", url: "/dev1" },
]);
const blogLinks = ref([
	{ label: "Blog 1", url: "/blog1" },
	{ label: "Blog 2", url: "/blog2" },
	{ label: "Article 1", url: "/article1" },
	{ label: "Article 2", url: "/article2" },
]);
const accountLinks = ref([
	{ label: "Profile", url: "/profile" },
	{ label: "Sign In", url: "/signin" },
	{ label: "Terms & Conditions", url: "/tandc" },
]);
const footerLinks = ref([
	{ label: "Home", url: "/" },
	{ label: "About Us", url: "/about" },
	{ label: "Profile", url: "/profile" },
	{ label: "Terms & Conditions", url: "/tandc" },
]);

const theme = useTheme();
//const themeVals = Object.keys(theme.computedThemes.value);
const onChangeSwitch = () => {
	switch(theme.global.name.value){
		case "light" : theme.global.name.value = "light_custom"; break
		case "light_custom" : theme.global.name.value = "dark"; break
		case "dark" : theme.global.name.value = "dark_custom"; break
		case "dark_custom" : theme.global.name.value = "light"; break
	}
};

</script>
<style>
.v-toolbar-title__placeholder {
	overflow: unset;
}
</style>
