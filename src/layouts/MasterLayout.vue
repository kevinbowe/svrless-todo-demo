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
		<v-app-bar color="primary" style="height:75px;padding-top: 5px;" _density="compact" >
			<v-row no-gutters class="ma-5">
				<!-- <v-col > -->
				<v-col align="left" >
					<div v-if="mobile">MOB</div>
					<div v-if="!mobile">DSK</div>
					<p v-if="sessionState.connected">Signed In</p>
					<p v-if="!sessionState.connected">Signed Out</p>
					<div v-if="sessionState.userName.length >0">UID == [ {{ sessionState.userName }} ]</div>
					<div v-else> --- </div>
				</v-col>
				<v-col align="left" >
					<br>
					<p>SS.Theme == [ {{ sessionState.theme }} ]</p>
					<p>SS.Theme-inactive == [ {{ sessionState.themeInactive }} ]</p>
				</v-col>
				<v-col align="left" >
					<p>themeDirty flag == {{ sessionState.themeDirty }}</p>
					<!-- <p>SessionState.counter == {{ sessionState.counter }}</p> -->
					<p> GLOBAL name value == {{ theme.global.name.value }}</p>
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

				<!-- <v-btn v-if="!mobile" color="white" variant="plain"> Exp
					<v-menu activator="parent">
						<v-list>
							<v-list-item :prepend-icon="link.icon" :title="link.title" :to="link.url" v-for="link in experiment" :key="link.title" :value="link.title"/>
						</v-list>
					</v-menu>
				</v-btn> -->
				
				
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
			<v-icon :color="sessionState.connected ? '' : 'grey-darken-1'" 
			v-on="sessionState.connected ? {click: onChangeSwitch} : {}" :icon="themeIcon"/>
			
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
							<p :class="sessionState.connected ? '' :  'text-grey-lighten-1'">
								<v-icon :color="sessionState.connected ? '' : 'grey-lighten-1'" :icon="themeIcon"/>
								Theme Changer 
							</p>
							<v-menu :disabled="!sessionState.connected" v-model="menuThemeChanger" activator="parent" location="end" :close-on-content-click="false">
								<v-card>
									<ThemeChanger @onThemeChangerFini="handleThemeChangerFini"/>
									<ThemePreview />
								</v-card>
							</v-menu>
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
import { ref} from "vue";
import ThemeChanger from "../components/ThemeChanger.vue";
import ThemePreview from "../components/ThemePreview.vue";
import SignOut from "../components/SignOut.vue"
import { Auth } from 'aws-amplify';
import { sessionState } from "../sessionState"
import { useDisplay } from "vuetify";

import { onBeforeUnmount } from "vue"

/* ----------------------------------------------------------------------------- */
// <v-app-bar-title>
const mainTitle: string = "v3a-theme-pinia-v2"

/* ----------------------------------------------------------------------------- */
const { mobile } = useDisplay()

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
const menuThemeChanger = ref(false);
const theme = useTheme();
const themeIcon = ref('mdi-weather-night')
/* ----------------------------------------------------------------------------- */
const onChangeSwitch = () => {
					enter(`onChangeSwitch`)
	//				Toggle the light and dark themes based on the theme.current.value['dark'] which is a bool
	//				Any theme name can be used. 
	const themeCurrentDark = theme.current.value['dark']
	theme.global.name.value = themeCurrentDark ? 'light' : 'dark'

	//				Update the sessionState themes
	//				Then check the sessionState on page reload.
	// sessionState.theme = themeCurrentDark ? 'light' : 'dark'
	// sessionState.themeInactive = !themeCurrentDark ? 'light' : 'dark'
	
	//				Toggle the themeDirty flag
	sessionState.themeDirty = !sessionState.themeDirty
	// updateAuthenticatedUserThemes("onChangeSwitch")
};

/* ----------------------------------------------------------------------------- */
// const updateEmail = (payload) => { emailModel.value = payload.email }
const handleThemeChangerFini = (payload) => { menuThemeChanger.value = payload }

/* ----------------------------------------------------------------------------- */
const updateAuthenticatedUserThemes = async (activeTheme) => {

	if (!sessionState.themeDirty) { info(`Theme is NOT DIRTY`); return }
	info1(`Theme is DIRTY`)
	info1(`activeTheme Arg -- > ${activeTheme}`)

	//				This will return the user in the user pool (not updated )
	const user = await Auth.currentAuthenticatedUser({bypassCache: true /* false */})
	//				This performs that update
	await Auth.updateUserAttributes(user, {
		'custom:theme': activeTheme, 
		'custom:theme-inactive': activeTheme === 'dark' ? 'light' : 'dark'
	}).catch((error) => { info1("ERROR -- Auth.updateUserAttributes") })

	//					We need a NEW user to check the current Auth values.
	const newuser = await Auth.currentAuthenticatedUser({bypassCache: true /* false */})
	theme.global.name.value = newuser.attributes['custom:theme']

	info5(`NEWUSER`)
	info5(`newuser.attributes['custom:theme'] == > ${newuser.attributes['custom:theme']}`)
	info5(`newuser.attributes['custom:theme-inactive'] == > ${newuser.attributes['custom:theme-inactive']}`)
}

/* ----------------------------------------------------------------------------- */
	/**	Win Listener -- Page -- Load / Reload
				Home reload -- called 1x
				Profile reload -- called 1x
				Nav from Profile to Home -- called 2x
				Nav from Home to Profile (typical) -- Never called		<---<<< Note
		*/
	window.addEventListener("beforeunload",(event) => {
		updateAuthenticatedUserThemes(theme.global.name.value)
		// ++sessionState.counter
	}) 


	
// /* ----------------------------------------------------------------------------- */
// 	/**	Win Listener -- Page -- Load / Reload
// 				Home reload -- called 1x
// 				Profile reload -- called 1x
// 				Nav from Profile to Home -- called 2x
// 				Nav from Home to Profile (typical) -- Never called		<---<<< Note
// 		*/
// 		window.addEventListener("beforeunload", event => { 
// 		//				This is getting called TWICE
// 		if (sessionState.themeDirty) {
// 			//			If we get here, update Auth
// 			fail('RED -- DIRTY -- Win -- |||||||||||||||||||||')
// 			updateAuthenticatedUserThemes("WIN")
// 		} else pass('GREEN -- CLEAN -- Win -- ||||||||||||||||||||||')
// 
// 		++sessionState.counter
// 	})
/* ----------------------------------------------------------------------------- */
	/**	Vue Listener -- Page Nav -- Page to Page | !<page> to Home
				Home reload -- Never called 
				Profile reload -- Never called
				Nav from Profile to Home -- Never called		<---<<< Note
				Nav from Home to Profile (typical) -- called once
				Nav from Profile to Exp > Dev 1 (typical) -- called once
				Nav from Exp > Dev 1 to Profile (typical) -- called once
		*/
	onBeforeUnmount(() => { updateAuthenticatedUserThemes(theme.global.name.value) })

/* ----------------------------------------------------------------------------- */
	// /**	Vue Listener -- Page Nav -- Page to Page | !<page> to Home
	// 			Home reload -- Never called 
	// 			Profile reload -- Never called
	// 			Nav from Profile to Home -- Never called		<---<<< Note
	// 			Nav from Home to Profile (typical) -- called once
	// 			Nav from Profile to Exp > Dev 1 (typical) -- called once
	// 			Nav from Exp > Dev 1 to Profile (typical) -- called once
	// 	*/
	// onBeforeUnmount(() => {
	// 	if (sessionState.themeDirty) {
	// 		//			If we get here, update Auth
	// 		fail('RED -- DIRTY - Vue -- |||||||||||||||||||||')
	// 		updateAuthenticatedUserThemes(theme.global.name.value)
	// 	} else pass('GREEN -- CLEAN -- Vue -- ||||||||||||||||||||||')
	// })
/* ----------------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------- */
//				This executes on Page load
enter(`Page Load Code`)

info(`sessionState.themeDirty --> ${sessionState.themeDirty}`)
info(`theme.global.name.value --> ${theme.global.name.value}`)

	// 				This is the defualt setting.
	//					It must ALWAYS be set to default on page load/reload/nav
	sessionState.themeDirty = false

	Auth.currentAuthenticatedUser({bypassCache: true })
	.then((user) =>  {
						/** Signed In */
		sessionState.connected = true 
		sessionState.userName = user.attributes.preferred_username ? user.attributes.preferred_username : user.username

		sessionState.theme = ""
		sessionState.themeInactive = ""
		theme.global.name.value = user.attributes['custom:theme']
	})
	.catch((reason) => {
						/** Not Signed In */
		sessionState.connected = false 
		sessionState.userName = ""
	})

</script>
<style>
.v-toolbar-title__placeholder {
	overflow: unset;
}
</style>
