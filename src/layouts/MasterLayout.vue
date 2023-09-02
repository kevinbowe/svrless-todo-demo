<template >
	<v-layout>
		<!-- Burger Menu -->
		<v-navigation-drawer v-if="mobile" v-model="drawer" >
			<v-list nav>
				<v-list-item class="justify-start" to="/home"> 
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
					
				<v-list-group v-if="piniaStore.connected" value="Account">
					<template v-slot:activator="{ props }">
						<v-list-Item class="justify-start" _prepend-icon="mdi-account" v-bind="props">
							<v-icon class="mr-3" icon="mdi-account"/>	Account
						</v-list-Item>
					</template>
					<v-list-item :to="acct.url" _:prepend-icon=acct.icon _:title=acct.title class="justify-start" v-for="acct in account">
						<v-icon :icon="acct.icon" class="mr-3"/>{{ acct.title }}
					</v-list-item>
				</v-list-group>
					
				<v-list-item v-if="piniaStore.connected">
					<SignOut/>
				</v-list-item>
				
				<v-list-item v-if="!piniaStore.connected">
					<v-btn to="/user" text="Sign In" rounded="xl" class="my-1" width="10em" color="surface_alt" />
				</v-list-item>

			</v-list>
		</v-navigation-drawer>

		<!-- Debugging Menu Bar DEV ONLY -->
		<v-app-bar color="primary" style="height:75px;padding-top: 5px;" _density="compact" >
			<v-row no-gutters class="ma-5">
				<!-- <v-col > -->
				<v-col align="left" >
					<div v-if="mobile">MOB</div> <div v-if="!mobile">DSK</div>
					<div v-if="piniaStore.connected">
						<p> Signed In -- {{ piniaStore.username }}</p>
						<p>Preferred UID -- {{ piniaStore.preferred_username }}</p>
					</div> 
					<p v-if="!piniaStore.connected">Signed Out</p>
				</v-col>
				<v-col align="left" >
					<p>pS.Theme == [ {{ piniaStore.activeTheme }} ] </p>
					<p>pS.Theme-inactive == [ {{ piniaStore.inactiveTheme }} ]</p>
					<p>Active Theme == [ {{ theme.global.name.value }} ]</p>
				</v-col>
				<v-col align="left" >
				</v-col>
			</v-row>
		</v-app-bar>

		<!-- Main Menu Bar -->	
		<v-app-bar class="my-3" color="blue-grey-darken-1">
			<v-app-bar-nav-icon v-if="mobile" variant="text" @click.stop="drawer=!drawer"></v-app-bar-nav-icon>
		
			<!-- Title -->
			<v-toolbar-title style="text-align:start"> 
				<a v-if="!mobile" href="/home" class="text-decoration-none"> {{ mainTitle }} </a>
				<a v-if="mobile" href="/home" class="text-decoration-none"> ( {{ mainTitle.slice(-3) }} ) </a>	
				<!-- <a v-if="!mobile" href="/" class="text-decoration-none"> {{ mainTitle }} </a>
				<a v-if="mobile" href="/" class="text-decoration-none"> ( {{ mainTitle.slice(-3) }} ) </a>	 -->
				
				<!-- Profile -->
				<v-btn v-if="!mobile" to="/profile" color="white" variant="plain" rounded="xl">Profile</v-btn>
				
				<!-- Dev link -->
				<v-btn text="Dev 1" v-if="!mobile" to="dev1" color="white" variant="plain"/>
				<v-btn text="Dev 2" v-if="!mobile" to="dev2" color="white" variant="plain"/>

				<!-- <v-btn v-if="!mobile" color="white" variant="plain"> Exp
					<v-menu activator="parent">
						<v-list>
							<v-list-item :prepend-icon="link.icon" :title="link.title" :to="link.url" v-for="link in experiment" :key="link.title" :value="link.title"/>
						</v-list>
					</v-menu>
				</v-btn> -->
				
				<!-- Blogs -->
				<!-- <v-btn v-if="!mobile" color="white" variant="plain" > Blogs
					<v-menu activator="parent">
						<v-list>
							<v-list-item :prepend-icon="link.icon" :title="link.title" :to="link.url" v-for="link in blogs" :key="link.title" :value="link.title"/>
						</v-list>
					</v-menu>
				</v-btn> -->
								
			</v-toolbar-title>

			<!-- Account : [ Settings | Theme | Sign Out ] -->
			<div v-if="piniaStore.connected">
				<v-btn color="white" variant="plain"> 
					<v-icon v-if="mobile" icon="mdi-account" size="x-large" /> 
					<p v-else> Account </p>
					<v-menu activator="parent">
						<v-list>
							<v-list-item __ACCOUNT__>
								<v-icon icon="mdi-cog" _class="pa-5"/>
								<v-btn text="Settings" to="/account" variant="plain"/>
							</v-list-item>							
							<v-list-item __SIGN_OUT__>
								<SignOut/>
							</v-list-item>
						</v-list>
					</v-menu>
				</v-btn>
			</div>

			<!-- Sign In -->
			<v-btn class="mx-1" text="Sign In" v-if="!piniaStore.connected" to="/user" color="white" variant="tonal" rounded="xl"/>

			<!-- Theme Switch -->
			<v-icon @click=onChangeSwitch :icon="themeIcon"/>

			<!-- Three Dots -->
			<v-btn style="min-width:2px; max-width: 2px;" class="mx-2">
				<v-icon icon="mdi-dots-vertical" size="x-large"/>
				<v-menu activator="parent">
					<v-list>
						<v-list-item :to="link.url" v-for="link in threeDots" :key="link.label" :value="link.label">
							<v-icon :icon="link.icon" style="padding-bottom:5px;padding-right:5px;" :color="link.color"/> 
							{{ link.label }}
						</v-list-item>

					</v-list>
				</v-menu>
			</v-btn>

		</v-app-bar>

		<!-- |||||| START Content insertion here |||||||||||||||||||||||||||||| -->
		<v-main class="my-5" _class="mb-5">
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

import { pass, fail } from "../my-util-code/MyConsoleUtil"

/* ----------------------------------------------------------------------------- */
import { useTheme } from "vuetify";
import { onBeforeUnmount, ref, computed } from "vue";
import ThemeChanger from "../components/ThemeChanger.vue";
import ThemePreview from "../components/ThemePreview.vue";
import SignOut from "../components/SignOut.vue"
import { Auth } from 'aws-amplify';
import { useDisplay } from "vuetify";
import { useUserPiniaStore } from '../stores/user'
/* ----------------------------------------------------------------------------- */
// <v-app-bar-title>
const mainTitle: string = "v3a-theme-pinia-v2"

/* ----------------------------------------------------------------------------- */
const { mobile } = useDisplay()
const piniaStore = useUserPiniaStore()
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
	{ label: "About Us", url: "/about", icon: "mdi-information-outline", color:"info" },
	{ label: "Terms & Conditions", url: "/tandc", icon: "mdi-scale-balance", color:"warning" },
	{ label: "Themes", url: "/theme", icon: "mdi-palette", color:"secondary" },

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
const menuThemeChanger = ref(false);
const theme = useTheme();
const themeIcon = computed<string>(() => piniaStore.activeTheme  == 'dark' ? 'mdi-weather-sunny' : 'mdi-weather-night')
/* ----------------------------------------------------------------------------- */
const onChangeSwitch = () => {
	//				Toggle the light and dark themes based on the piniaStore [ active and inactive ]
	theme.global.name.value = piniaStore.inactiveTheme
	piniaStore.inactiveTheme =	piniaStore.activeTheme
	piniaStore.activeTheme = theme.global.name.value
};

/* ----------------------------------------------------------------------------- */
// const updateEmail = (payload) => { emailModel.value = payload.email }
const handleThemeChangerFini = (payload) => { menuThemeChanger.value = payload }

/* ----------------------------------------------------------------------------- */
//	Win Listener -- Page -- Load / Reload
window.addEventListener("beforeunload",(event) => { /* Do something here */ }) 
	
/* ----------------------------------------------------------------------------- */
//	Vue Listener -- Page Nav -- Page to Page | !<page> to Home
onBeforeUnmount(() => { /* Do something here */ })

/* ----------------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------- */
//				This executes on Page load

	Auth.currentAuthenticatedUser({bypassCache: true })
	.then((user) =>  {
						/** Signed In */
		piniaStore.connected = true
		piniaStore.username = user.username
		piniaStore.preferred_username = user.attributes?.preferred_username
	})
	.catch((reason) => {
						/** Not Signed In */
		piniaStore.connected = false
	})

</script>
<style>
.v-toolbar-title__placeholder {
	overflow: unset;
}
</style>
