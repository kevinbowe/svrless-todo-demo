<template >
	<v-layout>
		<!-- Burger Menu -->
		<!-- <v-navigation-drawer __DEV_ONLY__ __v-if="mobile" v-model="drawer" > -->
		<v-navigation-drawer v-if="mobile" temporary v-model="drawerLeft" >

			<v-list nav>
				<v-list-item class="justify-start" to="/home"> 
					<v-icon class="mr-3">mdi-home</v-icon> Home
				</v-list-item>

				<v-list-item class="justify-start" to="/todo"> 
					<v-icon class="mr-3" icon="mdi-information"/> Todo
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

		<v-navigation-drawer v-model="drawerRight" _width="10em" temporary location="right">
			<v-list nav>
				<v-list-item class="justify-start"
				:to="link.url" 
				v-for="link in threeDots" 
				:key="link.label" 
				:value="link.label">
					<v-icon 
					:icon="link.icon" 
					style="padding-bottom:5px;padding-right:5px;" 
					:color="link.color"/> 

					{{ link.label }}

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
					<p>pS.A_Theme == [ {{ piniaStore.A_Theme }} ] </p>
					<p>pS.B_Theme == [ {{ piniaStore.B_Theme }} ]</p>
					<p>GLOBAL Theme == [ {{ theme.global.name.value }} ]</p>
				</v-col>
				<v-col align="left" >
					<p>pS.Active_Theme == [ {{ piniaStore.Active_Theme }} ] </p>
					<p>pS.Inactive_Theme == [ {{ piniaStore.Inactive_Theme }} ]</p>
				</v-col>
			</v-row>
		</v-app-bar>

		<!-- Main Menu Bar -->	
		<v-app-bar class="my-3" color="blue-grey-darken-1">

			<!-- <v-app-bar-nav-icon __DEV_ONLY__ __v-if="mobile" variant="text" @click.stop="drawer=!drawer"></v-app-bar-nav-icon> -->
			<v-app-bar-nav-icon v-if="mobile" variant="text" @click.stop="drawerLeft=!drawerLeft"/>

			<!-- Title -->
			<v-toolbar-title style="text-align:start"> 
				<a v-if="!mobile" href="/home" class="text-decoration-none"> {{ mainTitle }} </a>
				<a v-if="mobile" href="/home" class="text-decoration-none"> ( {{ mainTitle.slice(-3) }} ) </a>	

				<!-- Todo -->
				<v-btn v-if="!mobile" to="/todo" color="white" variant="plain" rounded="xl">Todo</v-btn>
				
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
			<v-icon @click=toggleTheme :icon="themeIcon"/>

			<!-- Three Dots -->
			<v-btn icon @click.stop="drawerRight=!drawerRight">
				<v-icon icon="mdi-dots-vertical"/> 
			</v-btn>

		</v-app-bar>

		<!-- |||||| START Content insertion here |||||||||||||||||||||||||||||| -->
		<v-main class="my-5" _class="mb-5">
			<slot></slot>
		</v-main>
		<!-- |||||| END Content insertion here |||||||||||||||||||||||||||||||| -->

		<!-- PopUp Message Dialog -- Modal -->
		<div v-if="showThemeChangerDialog" >
			<v-dialog activator="parent" v-model="showThemeChangerDialog" persistent >

				<v-card color="background_alt" border="lg" class="ma-auto pa-2" _height="10em" _width="20em" elevation="24">
					<v-card-text> 
						<v-row><v-spacer/>
							<v-btn __THIS_IS_THE_X_IN_UPPER_RIGHT__ 
							class="mb-n10" icon="$close" size="large" variant="text" @click="showThemeChangerDialog=false"/>
						</v-row>
						<ThemeChanger></ThemeChanger>
					</v-card-text>
				</v-card>
			</v-dialog>
		</div>
		
		<!-- Footer -->
		<v-footer app color="primary" >
			<v-row justify="center" no-gutters>
				<v-btn :text="link.label" :to="link.url" color="white" variant="text" rounded="xl" 
				v-for="link in footerLinks" :key="link.label" class="mx-2"/>

				<v-col cols="12" class="text-center mt-4"> 
					<v-btn color="white" variant="text" rounded="xl" @click="showThemeChangerDialog = true">
						<v-icon icon="mdi-palette" style="padding-bottom:5px;padding-right:5px;" color="secondary"/> 
						Theme Changer
					</v-btn>
				</v-col>
				<v-col cols="12" class="text-center mt-4"> <strong>DaBowe.com</strong> &copy {{ new Date().getFullYear() }}	</v-col>
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
import SignOut from "../components/SignOut.vue"
import { Auth } from 'aws-amplify';
import { useDisplay } from "vuetify";
import { useUserPiniaStore } from '../stores/user'
import ThemeChanger from '../components/ThemeChanger.vue'
/* ----------------------------------------------------------------------------- */
// <v-app-bar-title>
const mainTitle: string = "v3a-todo-theme-v1"

/* ----------------------------------------------------------------------------- */
const { mobile } = useDisplay()
const piniaStore = useUserPiniaStore()
const drawerLeft = ref(false)
const drawerRight = ref(false)
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
const showThemeChangerDialog = ref(false)

const theme = useTheme();
const themeIcon = computed<string>(() => piniaStore.A_Theme  == 'dark' ? 'mdi-weather-sunny' : 'mdi-weather-night')
/* ----------------------------------------------------------------------------- */
//				This is supports the Icon in the App-Bar.
const toggleTheme = () => {
	theme.global.name.value = piniaStore.Inactive_Theme
	piniaStore.Inactive_Theme = piniaStore.Active_Theme
	piniaStore.Active_Theme = theme.global.name.value

	//			Update the A|B Themes and related buttons.
	piniaStore.A_Theme = piniaStore.Active_Theme
	piniaStore.A_ThemeText = piniaStore.Active_Theme
	piniaStore.A_ThemeIcon = 'mdi-toggle-switch'
	piniaStore.A_ThemeColor = 'green'
	//
	piniaStore.B_Theme =piniaStore.Inactive_Theme
	piniaStore.B_ThemeText = piniaStore.Inactive_Theme
	piniaStore.B_ThemeIcon = 'mdi-toggle-switch-off'
	piniaStore.B_ThemeColor = 'red'
};

/* ----------------------------------------------------------------------------- */
//	Win Listener -- Page -- Load / Reload
window.addEventListener("beforeunload",(event) => { /* Do something here */ }) 

//	Vue Listener -- Page Nav -- Page to Page | !<page> to Home
onBeforeUnmount(() => { /* Do something here */ })

////////////////////////////////////////////////////////////////////////////////
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
