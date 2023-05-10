<template>
	<v-layout>
		<v-main>
			<v-app-bar color="blue-grey-darken-1">
				<v-app-bar-nav-icon size="30" icon="mdi-menu" class="d-sm-none">
					<v-icon />
					<v-menu activator="parent">
						<v-list>
							<v-list-Item to="/dev">
								Dev
							</v-list-Item>
							<v-list-item :to="link.url" 
								v-for="link in blogLinks" :key="link.label" :value="link.label"
							>
								<v-list-item-title to="/">
									{{ link.label }}
								</v-list-item-title>
							</v-list-item>
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
				</v-app-bar-nav-icon>
				<v-app-bar-title>
					<a href="/" class="text-decoration-none">
						{{ mainTitle }}
					</a>
				</v-app-bar-title>
				<v-spacer />
				<template v-slot:append>
					<v-btn color="white" variant="plain" class="d-sm-none">
						<v-icon icon="mdi-dots-vertical" />
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
									<v-icon color="secondary" icon="mdi-palette" size="30" />
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
					
					<v-btn to="/dev3" color="white" variant="plain" rounded="xl" 
						class="mx-2 d-none d-sm-flex"
					> 
						Dev 3
					</v-btn>

					<v-btn to="/dev2" color="white" variant="plain" rounded="xl" 
						class="mx-2 d-none d-sm-flex"
					> 
						Dev 2
					</v-btn>

					<v-btn to="/dev" color="white" variant="plain" rounded="xl" 
						class="mx-2 d-none d-sm-flex"
					> 
						Dev
					</v-btn>




					<v-btn color="white" variant="plain" class="mx-2 d-none d-sm-flex"> 
						Blogs
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

					<v-btn color="white" variant="plain" class="mx-2 d-none d-sm-flex"> 
						Account
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
				</template>
			</v-app-bar>

			<!-- |||||| START Content insertion here |||||| -->
			<slot></slot>
			<!-- |||||| END Content insertion here |||||| -->

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
import { ref } from "vue";
import ThemeChanger from "../components/ThemeChanger.vue";
import ThemePreview from "../components/ThemePreview.vue";
// <v-app-bar-title>
const mainTitle: string = "v3-Auth-Form-v0"

const menu = ref(false);
const blogLinks = ref([
	{ label: "Blog 1", url: "/blog1" },
	{ label: "Blog 2", url: "/blog2" },
	{ label: "Article 1", url: "/article1" },
	{ label: "Article 2", url: "/article2" },
]);
const accountLinks = ref([
	{ label: "Profile", url: "/profile" },
	{ label: "Sign In", url: "/signin" },
]);
const footerLinks = ref([
	{ label: "Home", url: "/" },
	{ label: "About Us", url: "/about" },
	{ label: "Profile", url: "/profile" },
]);
</script>
<style>
.v-toolbar-title__placeholder {
	overflow: unset;
}
</style>
