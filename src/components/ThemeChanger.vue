<template>
	<!-- <v-app> -->
	<!-- <v-container class="text-center"> -->
	<div class="text-center">
		<h1 class="text-left">Theme Switcher</h1>
		<v-switch @change="onChangeTheme" :label="`Toggle [${altThemeName}] Theme`" density="compact" :flat="true" inset />

		<!-- DEV -->
		<v-select label="Choose a Political Party" 
		v-model="selectX" :items="itemsX" class="text-left pa-3 ma-3" >
			<template v-slot:selection="{ item }" SelectedResults>
				<p v-if="item.props.value.disable">{{ item.props.value.state }} -- <span style="color: red">Republican</span></p>
				<p v-else>{{ item.props.value.state }} -- <span style="color: blue">Democrate</span></p>
			</template>

			<template v-slot:item="item" FormattedOptions>
				<v-list-item @click="toggleZ(item)">
					<p v-if="item.props.value.disable">{{ item.props.value.state }} -- <span style="color: pink">Republican</span></p>
					<p v-else>{{ item.props.value.state }} -- <span style="color: cyan">Democrate</span></p>
				</v-list-item>
			</template>
		</v-select>

		<!-- WORKING -->
		<v-select label="Select a State -- GOLD" 
		v-model="selectX" :items="itemsX"  class="class=text-left pa-3 ma-3">
			<template v-slot:selection="{ item }" SelectedResults> {{ selectX.value.state }}, {{ selectX.value.abbr }} -- {{ selectX.value.disable }} </template>
			<template v-slot:item="item" FormattedOptions>
				<v-list-item @click="toggleZ(item)">
					<div>
						Choose <span style="color: cyan">{{ item.props.value.state }}</span>
					</div>
				</v-list-item>
			</template>
		</v-select>

		<p class="text-left" v-if="selectX"><br />
			SELECTED VALUE [ {{ selectX.value.state }} - {{ selectX.value.abbr }} -- [ Disabled: {{ selectX.value.disable }}] ]</p><br />

		<!-- ------------------------------------------------------ -->
		<v-btn @click="computedColors(0)">Debug</v-btn>
		<div class="text-center">
			<v-card-text>
				<v-card color="blue-grey-darken-1" class="my-2" @click="setTheme(eachThemeName)" v-for="(eachThemeName, themeIndex) in computedThemesKeysValue" :key="themeIndex">
					<v-list-item>
						<v-list-item-action>
							<div>
								<h1 style="display: inline; margin-right: 1em">{{ eachThemeName.toUpperCase() }}</h1>
							</div>
							<v-avatar v-if="uTheme.global.name.value === eachThemeName" color="success" size="30">
								<v-icon>mdi-check</v-icon>
							</v-avatar>
						</v-list-item-action>
					</v-list-item>
					<!-- Display each Color Name in the Theme -->
					<div class="text-center">
						<span v-for="colorArrayIndex in allThemesAndColors[themeIndex].colorArray.length">
							<v-chip :style="{ background: allThemesAndColors[themeIndex].colorArray[colorArrayIndex - 1].code }" label class="ma-1" :variant="chipVariant">
								<strong :style="{ color: allThemesAndColors[themeIndex].colorArray[colorArrayIndex - 1].code }"> {{ allThemesAndColors[themeIndex].colorArray[colorArrayIndex - 1].color }}</strong>
							</v-chip>
						</span>
						<br />
						<span v-for="colorArrayIndex in allThemesAndColors[themeIndex].colorArray.length">
							<v-chip :color="allThemesAndColors[themeIndex].colorArray[colorArrayIndex - 1].code" label class="ma-1" :variant="chipVariant">
								<strong>{{ allThemesAndColors[themeIndex].colorArray[colorArrayIndex - 1].color }}</strong>
							</v-chip>
						</span>
					</div>
				</v-card>
			</v-card-text>
		</div>
	</div>
	<!-- </v-container> -->
	<!-- </v-app> -->
</template>

<script setup lang="ts">
import { useTheme } from "vuetify";
///////////////////////////////////////////////////////////
const uTheme = useTheme();
const computedThemesKeysValue = Object.keys(uTheme.computedThemes.value);
const computedThemesEntriesValue = Object.entries(uTheme.computedThemes.value);
const chipVariant: string = "outlined";
const defaultLightTheme: string = "light";
const defaultDarkTheme: string = "dark_custom";
const altThemeName = ref("");
altThemeName.value = defaultDarkTheme;
uTheme.global.name.value = defaultLightTheme;
const onChangeTheme = () => {
	altThemeName.value = uTheme.global.name.value;
	uTheme.global.name.value = uTheme.current.value.dark ? defaultLightTheme : defaultDarkTheme;
};
const generateThemesWithAllColors = () => {
	// Get the total number of themes.
	var themeLength = computedThemesKeysValue.length;
	var themeObjs = [];
	var cArray: { color: string; code: string }[] = [];
	// Create array to store the themes and related VideoColorSpace
	for (var i = 0; i < themeLength; i++) {
		// Fetch the Theme name
		var tName = computedThemesKeysValue[i];
		// Fetch the Color elements
		var tColorProps = computedThemesEntriesValue[i][1].colors;
		Object.entries(tColorProps).forEach((e) => {
			if (e[0].includes("-")) return;
			var o = { color: e[0], code: e[1] };
			cArray.push(o);
		});
		// create the themeObject
		var o = { theme: tName, colors: tColorProps, colorArray: cArray };
		themeObjs.push(o);
		// Clear the cArray for the next theme pass
		cArray = [];
	}
	return themeObjs;
};
const allThemesAndColors = generateThemesWithAllColors();
const setTheme = (myTheme: string) => {
	uTheme.global.name.value = myTheme;
};
//---------------------------------------------------------

//// METHODS-FUNCTIONS
function toggleZ(item) {
	selectX.value = item.props;
}





// THIS WORKS
let selectX = ref();

// THIS WORKS
const itemsX = [
	{ state: "Florida", abbr: "FL", disable: true },
	{ state: "Georgia", abbr: "GA", disable: true },
	{ state: "Nebraska", abbr: "NE", disable: true },
	{ state: "California", abbr: "CA", disable: false },
	{ state: "New York", abbr: "NY", disable: false },
];
</script>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
export default defineComponent({
	name: "ThemeChanger",
	components: {},
});
</script>
