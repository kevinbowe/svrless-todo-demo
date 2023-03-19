<template>
	<v-app>
		<div class="text-center">
			<v-menu v-model="menu" :close-on-content-click="false" location="center">
				<template v-slot:activator="{ props }">
					<v-btn color="indigo" v-bind="props">
						<v-icon size="30" color="primary">mdi-palette</v-icon>
					</v-btn>
				</template>

				<v-card-text>
					<v-card color="blue-grey-darken-1" class="my-2" @click="setTheme(eachThemeName)"
						v-for="(eachThemeName, themeIndex) in Object.keys(uTheme.computedThemes.value)" :key="themeIndex">
						<v-list-item>
							<v-list-item-title class="font-weight-bold">
								Theme Name [ {{ eachThemeName }} ]
							</v-list-item-title>
							<v-list-item-action>
								<v-avatar v-if="uTheme.global.name.value === eachThemeName" color="success" size="30">∏
									<v-icon>mdi-check</v-icon>
								</v-avatar>
							</v-list-item-action>
						</v-list-item>

						<!-- EXPERIMENT BUTTON -->
						<div class="my-2">
							<v-btn @click=loadAllColors__EXPERIMENT__(themeIndex) class="mx-1" label
								color="secondary">EXPERIMENT-{{ themeIndex }}</v-btn>
						</div>

						<!-- Display each Color Name in the Theme -->
						<div class="text-center">
							<span
								v-for="(colorCode, colorName) in Object.entries(uTheme.computedThemes.value)[themeIndex][1].colors">
								<v-chip v-if="!colorName.toString().includes('variant')
									&& !colorName.toString().includes('darken')
									&& !colorName.toString().includes('on-')" :color="colorCode" label class="ma-1 py-6 px-3"
									variant="outlined">

									<strong>{{ colorName }}</strong>
									<!-- <strong>{{ colorName }}<br> [ {{ colorCode }} ]</strong> -->
								</v-chip>
							</span>
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
const menu = ref(false);
const uTheme = useTheme();

function setTheme(myTheme: string) { uTheme.global.name.value = myTheme; }

function loadAllColors__EXPERIMENT__(themeIndex: number) {
	const themes = Object.entries(uTheme.computedThemes.value);
	var tt = themes[themeIndex][1].colors;
	// Display all color names in the theme.
	for (var i = 0; i < Object.entries(themes[themeIndex][1].colors).length; i++) {
		console.log("Color-Name: [" + Object.entries(tt)[i][0] + "] == Code: [" + Object.entries(tt)[i][1] + "]")
	}
	console.log(themes[themeIndex][0]);
}

</script>
