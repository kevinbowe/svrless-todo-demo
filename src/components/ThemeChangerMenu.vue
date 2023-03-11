<template>
	<v-app>
		<div class="text-center">
			<v-menu v-model="menu" :close-on-content-click="false" location="end">
				<template v-slot:activator="{ props }">
					<v-btn color="indigo" v-bind="props">
						<v-icon size="30" color="primary">mdi-palette</v-icon>
					</v-btn>
				</template>
				<v-card-text>
					<!-- <v-card class="my-2" :disabled="$vuetify.theme.themes.name === theme.name" @click="setTheme(theme)" hover outlined v-for="(theme, index) in themes" :key="index"> -->
					<v-card class="my-2" @click="setTheme(myTheme)" v-for="(myTheme, index) in myThemes" :key="index" >
						<v-list-item>
							<v-list-item-title class="font-weight-bold">
								{{ myTheme.name }}
							</v-list-item-title>
							<v-list-item-action>
								<v-avatar v-if="uTheme.global.name.value === myTheme.name" 
									color="success" size="30">
										<v-icon>mdi-check</v-icon>
								</v-avatar>
							</v-list-item-action>
						</v-list-item>

						<div class="my-2">
							<v-chip v-for="(key, index) in Object.keys(myTheme.dark)" :key="index" 
								:color="key" class="mx-1" label >
									{{ key }}
							</v-chip>
						</div>

						<div class="my-2">
							<v-chip  v-for="(key, index) in Object.keys(myTheme.light)" :key="index"
								:color="key" class="mx-1" label >
									{{ key }}
							</v-chip>
						</div>

					</v-card>
				</v-card-text>
			</v-menu>
		</div>
	</v-app>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useTheme } from "vuetify";
import { computed } from "vue";

const fav = ref(true);
const menu = ref(false);
const uTheme = useTheme();

function toggleDarkMode() {
	uTheme.global.name.value = uTheme.current.value.dark ? "light" : "dark";
}

const switchLabel = computed(() => {
	return uTheme.current.value.dark ? "Light" : "Dark";
});

const myThemes = ref([
	{
		name: "theme1",
		dark: {
			primary: "#21CFF3",
			accent: "#FF4081",
			secondary: "#21dc79",
			success: "#86af3f",
			info: "#f34fc6",
			warning: "#FB8C00",
			error: "#FF5252",
		},
		light: {
			primary: "#22daff",
			accent: "#ff6b99",
			secondary: "#26ff8c",
			success: "#a5d64c",
			info: "#ff53d0",
			warning: "#ff8e00",
			error: "#ff5252",
		},
	},
	{
		name: "theme2",
		dark: {
			primary: "#E65100",
			accent: "#7CB342",
			secondary: "#689F38",
			success: "#4CAF50",
			info: "#6156d8",
			warning: "#1565C0",
			error: "#FF7043",
		},
		light: {
			primary: "#ffa450",
			accent: "#a1e754",
			secondary: "#92de4e",
			success: "#6dff74",
			info: "#7365ff",
			warning: "#2e8ac0",
			error: "#ff5e3c",
		},
	},
	{
		name: "theme3-Fails",
		dark: {
			primary: "#33691E",
			accent: "#FFCA28",
			secondary: "#607D8B",
			success: "#FFEB3B",
			info: "#2196F3",
			warning: "#9C27B0",
			error: "#B71C1C",
		},
		light: {
			primary: "#6ae240",
			accent: "#ffe063",
			secondary: "#7ea4b6",
			success: "#ffea70",
			info: "#229eff",
			warning: "#e239ff",
			error: "#e82424",
		},
	},
	{
		name: "theme2-Copy-Also-Fails",
		dark: {
			primary: "#E65100",
			accent: "#7CB342",
			secondary: "#689F38",
			success: "#4CAF50",
			info: "#6156d8",
			warning: "#1565C0",
			error: "#FF7043",
		},
		light: {
			primary: "#ffa450",
			accent: "#a1e754",
			secondary: "#92de4e",
			success: "#6dff74",
			info: "#7365ff",
			warning: "#2e8ac0",
			error: "#ff5e3c",
		},
	},
]);

function setTheme(myTheme: { name: string; }) {
	console.log("myTheme.name == " + myTheme.name);
	var stat = uTheme.current.value.dark ? "light" : "dark"
	console.log("Enter --> Dark value == " + stat)
	
	uTheme.global.name.value = myTheme.name;

	stat = uTheme.current.value.dark ? "light" : "dark"
	console.log("Exit <-- Dark value == " + stat)
	console.log("<-- fini setTheme");

}
</script>
