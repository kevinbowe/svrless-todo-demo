<template>
	<v-layout>
		<!-- Burger Menu -->
		<v-navigation-drawer v-if="mobile" v-model="drawer" >
			<v-list nav>
				<v-list-item class="justify-start" to="/"> 
					<v-icon class="mr-3">mdi-home</v-icon> Home
				</v-list-item>

				<v-list-group value="Blogs">
						<template v-slot:activator="{ props }">
							<v-list-Item class="justify-start" v-bind="props">
								<v-icon class="mr-3" icon="mdi-script"/> Blogs
							</v-list-Item>
						</template>
						<v-list-item _style="margin-left:-2em;" class="justify-start" :to="blog.url" v-for="blog in blogs">
							<v-icon class="mr-3" :icon=blog.icon /> {{ blog.title }}
						</v-list-item>
				</v-list-group>

				<v-list-item class="justify-start" to="/profile"> 
					<v-icon class="mr-3" icon="mdi-information"/> Profile
				</v-list-item>

					<v-list-group value="Experiment">
						<template v-slot:activator="{ props }">
							<v-list-Item class="justify-start" v-bind="props">
								<v-icon class="mr-3" icon="mdi-microscope"/>	Experiment
							</v-list-Item>
						</template>

						<v-list-item _style="margin-left:-2em;" class="justify-start" :to="exp.url" v-for="exp in experiment">
							<v-icon class="mr-3" :icon="exp.icon" /> {{ exp.title }}
						</v-list-item>

					<v-list-group style="width:30em" value="DevActions">
						<template v-slot:activator="{ props }">
							<v-list-Item _style="margin-left:-2em;" class="justify-start" v-bind="props">
								<v-icon class="mr-3" icon="mdi-gesture-tap"/> Dev Actions
							</v-list-Item>
						</template>
					
						<v-list-item _style="margin-left:-2.5em;" class="justify-start" :to="crud.url" v-for="crud in cruds">
							<v-icon class="mr-3" :icon="crud.icon"/> {{ crud.title }}
						</v-list-item>

					</v-list-group>

				</v-list-group>
					
				<v-list-group v-if="sessionState.connected" value="Account">
					<template v-slot:activator="{ props }">
						<v-list-Item class="justify-start" _prepend-icon="mdi-account" v-bind="props">
							<v-icon class="mr-3" icon="mdi-account"/>	Account
						</v-list-Item>
					</template>
					<v-list-item :to="acct.url" _:prepend-icon=acct.icon _:title=acct.title class="justify-start" v-for="acct in account">
						<v-icon :icon="acct.icon" class="mr-3"/>{{ acct.title }}
					</v-list-item>
				</v-list-group>
					
				<v-list-item v-if="sessionState.connected">
					<SignOut/>
				</v-list-item>
				
				<v-list-item v-if="!sessionState.connected">
					<v-btn to="/user" text="Sign In" rounded="xl" class="my-1" width="10em" color="surface_alt" />
				</v-list-item>

			</v-list>
		</v-navigation-drawer>

		<!-- Debugging Menu Bar DEV ONLY -->
		<v-app-bar color="primary" _color="blue-darken-1" density="compact" >
			<v-row no-gutters _style="height:16px;">
				<v-col>
					<p v-if="mobile">MOB</p>
					<p v-if="!mobile">DSK</p>
				</v-col>
				<v-col>
					<p v-if="sessionState.connected">Signed In</p>
					<p v-if="!sessionState.connected">Signed Out</p>
				</v-col>
				<v-col>
					<p v-if="sessionState.userName.length >0">UID: [ {{ sessionState.userName }} ]</p>
					<p v-else> ---</p>
				</v-col>
			</v-row>
		</v-app-bar>

		<!-- Main Menu Bar -->	
		<v-app-bar color="blue-grey-darken-1">
			<v-app-bar-nav-icon v-if="mobile" variant="text" @click.stop="drawer=!drawer"></v-app-bar-nav-icon>
		
			<!-- Title -->
			<v-toolbar-title style="text-align:start"> 
				<a v-if="!mobile" href="/" class="text-decoration-none"> {{ mainTitle }} </a>
				<a v-if="mobile" href="/" class="text-decoration-none"> ( {{ mainTitle.slice(-3) }} ) </a>	
				
				<!-- Profile -->
				<v-btn v-if="!mobile" to="/profile" color="white" variant="plain" rounded="xl">Profile</v-btn>
				
				<!-- Experiment / Dev links -->
				<v-btn v-if="!mobile" color="white" variant="plain"> Exp
					<v-menu activator="parent">
						<v-list>
							<v-list-item :prepend-icon="link.icon" :title="link.title" :to="link.url" v-for="link in experiment" :key="link.title" :value="link.title"/>
						</v-list>
					</v-menu>
				</v-btn>
				
				<!-- Blogs -->
				<v-btn v-if="!mobile" color="white" variant="plain" > Blogs
					<v-menu activator="parent">
						<v-list>
							<v-list-item :prepend-icon="link.icon" :title="link.title" :to="link.url" v-for="link in blogs" :key="link.title" :value="link.title"/>
						</v-list>
					</v-menu>
				</v-btn>
								
			</v-toolbar-title>

			<!-- Account : [ Settings | Theme | Sign Out ] -->
			<div v-if="sessionState.connected">
				<v-btn color="white" variant="plain"> 
					<v-icon v-if="mobile" icon="mdi-account" size="x-large" /> 
					<p v-else> Account </p>
					<v-menu activator="parent">
						<v-list>
							<v-list-item __ACCOUNT__>
								<v-btn to="/account" variant="plain"> Settings </v-btn>
							</v-list-item>

							<v-list-item __THEME_CHANGER__>
								<v-btn variant="plain">
									Theme<v-icon color="secondary" icon="mdi-palette" size="30"/>
									<v-menu v-model="menuThemeChanger" activator="parent" location="end" :close-on-content-click="false">
										<v-card>
											<v-card-actions>
												<v-spacer />
												<v-btn variant="text" @click="menuThemeChanger = false"> Cancel </v-btn>
												<v-btn _color="primary" variant="text" @click="menuThemeChanger = false"> Save </v-btn>
											</v-card-actions>
											<ThemeChanger />
											<ThemePreview />
										</v-card>
									</v-menu>
								</v-btn>
							</v-list-item>
							
							<v-list-item __SIGN_OUT__>
								<SignOut/>
							</v-list-item>
						</v-list>
					</v-menu>
				</v-btn>
			</div>

			<!-- Sign In -->
			<v-btn class="mx-1" text="Sign In" v-if="!sessionState.connected" to="/user" color="white" variant="tonal" rounded="xl"/>

			<!-- Theme Switch -->
			<v-icon @click="onChangeSwitch" :icon="themeIcon"/>
			
			<!-- Three Dots -->
			<v-btn style="min-width:2px; max-width: 2px;" class="mx-2">
				<v-icon icon="mdi-dots-vertical" size="x-large"/>
				<v-menu activator="parent">
					<v-list >
						<v-list-item :to="link.url" v-for="link in threeDots" :key="link.label" :value="link.label">
							<v-list-item-title>
								{{ link.label }}
							</v-list-item-title>
						</v-list-item>
						<v-list-item>
							<v-icon icon="mdi-palette" size="30"/> Theme Changer
							<v-menu v-model="menuThemeChanger" activator="parent" location="end" :close-on-content-click="false">
								<v-card>
									<v-card-actions>
										<v-spacer />
										<v-btn variant="text" @click="menuThemeChanger = false"> Cancel </v-btn>
										<v-btn variant="text" @click="menuThemeChanger = false"> Save </v-btn>
									</v-card-actions>
									<ThemeChanger />
									<ThemePreview />
								</v-card>
							</v-menu>
						</v-list-item>
					</v-list>
				</v-menu>
			</v-btn>

		</v-app-bar>

		<!-- |||||| START Content insertion here |||||||||||||||||||||||||||||| -->
		<v-main class="mb-5">
			<slot></slot>
		</v-main>
		<!-- |||||| END Content insertion here |||||||||||||||||||||||||||||||| -->
		
		<!-- Footer -->
		<v-footer app color="primary" >
			<v-row justify="center" no-gutters>
				<v-btn :to="link.url" color="white" variant="text" rounded="xl" 
				v-for="link in footerLinks" :key="link.label" class="mx-2">
					{{ link.label }}
				</v-btn>
				<v-col cols="12" class="text-center mt-4"> 
					<strong>DaBowe.com</strong> &copy {{ new Date().getFullYear() }}
				</v-col>
			</v-row>
		</v-footer>
	</v-layout>
</template>

<script setup lang="ts" >
import { info, info1, info2 , info3, info4, info5, info6, info7 } from "../my-util-code/MyConsoleUtil"
import { enter, enter0, enter1, enter2, enter3, enter4, enter5, enter6, enter7 } from "../my-util-code/MyConsoleUtil"
import { bar, whitebar, greybar, redbar, greenbar, orangebar } from "../my-util-code/MyConsoleUtil"

/* ----------------------------------------------------------------------------- */
import { useTheme } from "vuetify";
import { ref } from "vue";
import ThemeChanger from "../components/ThemeChanger.vue";
import ThemePreview from "../components/ThemePreview.vue";
import SignOut from "../components/SignOut.vue"
import { Auth } from 'aws-amplify';
import { sessionState } from "../sessionState"

/* ----------------------------------------------------------------------------- */
import { useDisplay } from "vuetify";
const { mobile } = useDisplay()

/* ----------------------------------------------------------------------------- */
const drawer = ref(false)
const experiment = ref([
	{title:'Dev 1', icon:'mdi-hammer-screwdriver', url:'/dev1'},
	{title:'Dev 2', icon:'mdi-hammer-screwdriver', url:'/dev2'},
])
const blogs = ref([
	{title:'Blog 1', icon:'mdi-post-outline', url:'/blog1'},
	{title:'Article 1', icon:'mdi-school', url:'/article1'},
])
const account = ref([
	{title:'Settings', icon:'mdi-cog-outline', url:'/account'},
])
const threeDots = ref([
	{ label: "About Us", url: "/about" },
	{ label: "Terms & Conditions", url: "/tandc" },
]);
const cruds = ref([
	{title:'Create', icon:'mdi-plus-outline',url: "/future" },
	{title:'Read', icon:'mdi-file-outline', url: "/future"},
	{title:'Update', icon:'mdi-update', url: "/future"},
	{title:'Delete', icon:'mdi-delete', url: "/future"},
])
const footerLinks = ref([
	{ label: "Home", url: "/" },
	{ label: "About Us", url: "/about" },
	{ label: "Profile", url: "/profile" },
	{ label: "Terms & Conditions", url: "/tandc" },
	{ label: "Contact", url: "/contact" },
]);

/* ----------------------------------------------------------------------------- */
// <v-app-bar-title>
const mainTitle: string = "v3-Auth-Vtfy3-v14"
const menuThemeChanger = ref(false);

const theme = useTheme();
const themeIcon = ref('mdi-weather-night')
const onChangeSwitch = () => {
	switch(theme.global.name.value){
		//				DEBUG
		case "dark" : 
			theme.global.name.value = "light"; 
			themeIcon.value = 'mdi-weather-sunny'
			break

		case "light" : theme.global.name.value = "dark"; 
			themeIcon.value = 'mdi-weather-night'
			break
		// 			These cases below will be ignored because of debug above
		case "light" : theme.global.name.value = "light_custom"; break
		case "light_custom" : theme.global.name.value = "dark"; break
		case "dark" : theme.global.name.value = "dark_custom"; break
		case "dark_custom" : theme.global.name.value = "light"; break
	}
};

//				This executes on Page load
	Auth.currentAuthenticatedUser({bypassCache: true })
	.then((user) =>  {
		sessionState.connected = true 
		sessionState.userName = user.attributes.preferred_username 
					? user.attributes.preferred_username
					: user.username
	})
	
	.catch((reason) => {
		sessionState.connected = false 
		sessionState.userName = ""
	})

</script>
<style>
.v-toolbar-title__placeholder {
	overflow: unset;
}
</style>
