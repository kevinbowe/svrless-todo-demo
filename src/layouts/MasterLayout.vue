<template>
	<v-layout>
		<v-main>
			<v-app-bar color="blue-grey-darken-1">
				<v-app-bar-nav-icon class="d-sm-none" size="30" icon="mdi-menu">
					<v-icon />
					<v-menu activator="parent">
						<v-list>
							<v-list-Item to="/dev">Dev</v-list-Item>
							<v-list-item :to="link.url" v-for="link in blogLinks" :key="link.label" :value="link.label">
								<v-list-item-title to="/">{{ link.label }}</v-list-item-title>
							</v-list-item>
							<v-list-item :to="link.url" :value="link.label" v-for="link in accountLinks" :key="link.label">
								<v-list-item-title>{{ link.label }}</v-list-item-title>
							</v-list-item>
							<v-btn variant="plain">
								<v-tooltip activator="parent" location="bottom">Toggle Theme</v-tooltip>
								<v-icon color="secondary" icon="mdi-palette" size="30" />
								<v-menu activator="parent" location="end" v-model="menu" :close-on-content-click="false">
									<v-card>
										<v-card-actions>
											<v-spacer></v-spacer>
											<v-btn variant="text" @click="menu = false">Cancel</v-btn>
											<v-btn color="primary" variant="text" @click="menu = false">Save</v-btn>
										</v-card-actions>
										<ThemeChanger />
									</v-card>
								</v-menu>
							</v-btn>
						</v-list>
					</v-menu>
				</v-app-bar-nav-icon>
				
				<v-app-bar-title><a style="text-decoration:none;" href="/">{{ mainTitle }}</a></v-app-bar-title>

				<v-spacer />

				<template v-slot:append>
					<v-btn class="d-sm-none" color="white" variant="plain">
						<v-icon icon="mdi-dots-vertical"></v-icon>
						<v-menu activator="parent">
							<v-list>
								<v-list-item :to="link.url" :value="link.label" v-for="link in accountLinks" :key="link.label">
									<v-list-item-title>{{ link.label }}</v-list-item-title>
								</v-list-item>
								<v-btn variant="plain">
									<v-tooltip activator="parent" location="bottom">Toggle Theme</v-tooltip>
									<v-icon color="secondary" icon="mdi-palette" size="30" />
									<v-menu activator="parent" location="end" v-model="menu" :close-on-content-click="false">
										<v-card>
											<v-card-actions>
												<v-spacer></v-spacer>
												<v-btn variant="text" @click="menu = false">Cancel</v-btn>
												<v-btn color="primary" variant="text" @click="menu = false">Save</v-btn>
											</v-card-actions>
											<ThemeChanger />
										</v-card>
									</v-menu>
								</v-btn>
							</v-list>
						</v-menu>
					</v-btn>

					<v-btn class="mx-2 d-none d-sm-flex" color="white" variant="plain" rounded="xl" to="/dev">
						Dev
					</v-btn>

					<v-btn class="mx-2 d-none d-sm-flex" color="white" variant="plain">Blogs
						<v-menu activator="parent">
							<v-list>
								<v-list-item :to="link.url" v-for="link in blogLinks" :key="link.label" :value="link.label">
									<v-list-item-title>{{ link.label }}</v-list-item-title>
								</v-list-item>
							</v-list>
						</v-menu>
					</v-btn>

					<v-btn class="mx-2 d-none d-sm-flex" color="white" variant="plain"> Account
						<v-menu activator="parent">
							<v-list>
								<v-list-item :to="link.url" :value="link.label" v-for="link in accountLinks" :key="link.label">
									<v-list-item-title>{{ link.label }}</v-list-item-title>
								</v-list-item>
								<v-btn variant="plain">
									<v-tooltip activator="parent" location="bottom">Toggle Theme</v-tooltip>
									<v-icon color="secondary" icon="mdi-palette" size="30" />
									<v-menu activator="parent" location="end" v-model="menu" :close-on-content-click="false">
										<v-card>
											<v-card-actions>
												<v-spacer></v-spacer>
												<v-btn variant="text" @click="menu = false">Cancel</v-btn>
												<v-btn color="primary" variant="text" @click="menu = false">Save</v-btn>
											</v-card-actions>
											<ThemeChanger />
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
					<v-btn class="mx-2" color="white" variant="text" rounded="xl" :to="link.url" v-for="link in footerLinks"
						:key="link.label">
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

<script setup lang="ts" >
import { ref } from "vue";
import ThemeChanger from "../components/ThemeChanger.vue";

const mainTitle: string = "Vue MultiTheme v22"

const menu = ref(false);

const blogLinks = ref([
	{ label: "Blog 1", url: "/blog1" },
	{ label: "Blog 2", url: "/blog2" },
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
</script>

<style>
.v-toolbar-title__placeholder {
	overflow: unset;
}</style>

<style>
.v-toolbar-title__placeholder {
	overflow: unset;
}
</style>
