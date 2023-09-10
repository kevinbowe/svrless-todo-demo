<template>
<v-app>

	<h1 class="text-primary">About Us Page Content</h1>
	<v-btn class="pa-3 ma-5" to="/">Go To Home</v-btn>
	<v-row justify="center" >
		<v-col  sm="5" >
			<v-card style="text-align:left;">
				<v-card-title class="bg-cyan-darken-1 " >
					<span class="white-text">Da Bowe</span>
				</v-card-title>
				<v-list>
					<v-list-item prepend-avatar="./src/assets/Beard_DaBowe.svg" subtitle="Mr Bowe if yo' nasty">
						<v-btn variant="text" :class="fav ? 'text-red' : ''" icon="mdi-heart" @click="fav = !fav"></v-btn>
					</v-list-item>
				</v-list>
			</v-card>
		</v-col>
	</v-row>
	
</v-app>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useTheme } from "vuetify";
import { useUserPiniaStore } from "../stores/user"
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const fav = ref(true);
const theme = useTheme();
const piniaStore = useUserPiniaStore(); //initialize the piniaStore
/* ----------------------------------------------------------------------------- */

theme.global.name.value = piniaStore.Active_Theme
</script>
