<template><v-app><MasterLayout>

<v-col class="d-flex justify-center">
	<v-card width="60%" color="secondary" variant="tonal" class="text-h4 mb-5">About Me</v-card>
</v-col>

<v-row justify="center">
	<v-col sm="8" md="5" lg="4">
		<v-card>
			<v-card-text class="d-flex justify-center">

				<div class="text-h6" style="line-height: 1.6;text-align:left;">
					<p>"Turns out that KNOWING a thing...</p>
					<p style="margin-left:2.5em;">isn't good enough.</p> 
					<p style="margin-left:5em;">You have to GIT GUD"</p>
				</div>
			</v-card-text>
			<v-card-actions>
				<v-list-item>
					<template v-slot:prepend>
						<v-avatar color="grey-darken-3" image="./src/assets/Beard_DaBowe.svg" />
					</template>

					<v-list-item-title>Kevin Bowe (KB)</v-list-item-title>
					<v-list-item-subtitle>Ohggi Creator</v-list-item-subtitle>

					<template v-slot:append>
						<div class="justify-self-end">
							<v-btn icon="mdi-heart" variant="text" :class="fav ? 'text-red' : ''" @click="fav = !fav"/>
						</div>
					</template>

				</v-list-item>
			</v-card-actions>
		</v-card>
	</v-col>
</v-row>

<v-row justify="center" class="ma-5">
	<v-col sm="8" md="5" lg="4">
		
		<v-row class="my-5 text-h6" style="line-height: 1.6;text-align:left;">
			Athletes, artists, warriors and individuals with master level skills all have one thing in common:
		</v-row>

		<span class="text-h5 text-secondary">They all practice.</span>

		<v-row class="my-5 text-h6" style="line-height: 1.6;text-align:left;">
			They train endlessly. They repeat the skills they have been taught until they have reached their peak personal performance. They continue to train to maintain their peak performance.
		</v-row>

		<span class="text-h5 text-secondary">Do you train?</span>

		<v-row class="my-5 text-h6" style="line-height: 1.6;text-align:left;">
			Are you performing the skills you have learned at your peak performance?
		</v-row>

		<span class="text-h5 text-secondary">Probably not.</span>

		<v-row class="my-5 text-h6" style="line-height: 1.6;text-align:left;">
			Do you even know how to train for the skills you have?
		</v-row>

		<span class="my-5 text-h5 text-secondary">Probably not.</span>

		<div class="my-5 text-h6">What are you going to do about it? </div>


		<span class="text-h5 text-secondary">Well?</span>

		<div class="d-flex justify-center my-5 mx-n3  text-h6" style="line-height: 1.6;text-align:left;" >
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		</div>
	</v-col>
</v-row>








	<!-- <v-row justify="center" class="mt-10" >
		<v-divider></v-divider>
		<v-col sm="5" >
			<v-card _style="text-align:left;">
				<v-card-title class="bg-cyan-darken-1 " >
					<span class="white-text">Da Bowe</span>
				</v-card-title>
				<v-list>
					<v-list-item 
					prepend-avatar="./src/assets/Beard_DaBowe.svg" 
					subtitle="Mr Bowe if yo' nasty">
						<v-btn 
						variant="text" 
						:class="fav ? 'text-red' : ''" 
						icon="mdi-heart" 
						@click="fav = !fav">
						</v-btn>
					</v-list-item>
				</v-list>
			</v-card>
		</v-col>
	</v-row> -->
	
</MasterLayout></v-app></template>

<script lang="ts" setup>
import { ref } from "vue";
import { useTheme } from "vuetify";
import { useUserPiniaStore } from "../stores/user"
import MasterLayout from "../layouts/MasterLayout.vue"
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const fav = ref(true);
const theme = useTheme();
const piniaStore = useUserPiniaStore(); //initialize the piniaStore
/* ----------------------------------------------------------------------------- */

theme.global.name.value = piniaStore.Active_Theme
</script>

<style>
	.v-divider {
		color:rgb(var(--v-theme-border));
		border-bottom:.2em solid;
		/* border-bottom-color: #212121; */ /* grey-darken-4 */
		/* border-bottom-color: lightgrey; */
		/* border-bottom-color: deep-purple-lighten-2; */
	}</style>
