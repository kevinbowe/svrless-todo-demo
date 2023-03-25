<template>
	<!-- <v-app> -->
	<!-- <v-container class="text-center"> -->
	<div class="text-center">
		<h1 class="text-left">Theme Switcher</h1>
		<v-switch @change="onChangeTheme" :label="`Toggle [${altThemeName}] Theme`" density="compact" :flat="true" inset />

		<!-- REF -- WORKING -->
		<!-- <v-select label="Select Foo Bar Items"
		v-model="valueFooBar" :items="itemsFooBar" multiple class="class=text-left pa-3 ma-3">
			<template v-slot:selection="{ item, index }">
				<v-chip v-if="index < 2"> <span> {{ item.title }} </span> </v-chip>
				<span v-if="index === 2" class="text-grey text-caption align-self-center" >
					(+{{ valueFooBar.length - 2 }} others)
				</span>
			</template>
		</v-select> -->

		<!-- REF -- WORKING -->
		<!-- <p class="text-center" v-if="selectState"><br />
			SELECTED VALUE [ {{ selectState.value.state }} - {{ selectState.value.abbr }} -- [ Disabled: {{ selectState.value.disable }}] ]</p><br />
		<v-select label="Select a State -- GOLD" 
		v-model="selectState" :items="itemsStates"  class="class=text-left pa-3 ma-3">
			<template v-slot:selection="{ item }" SelectedResults> 
				{{ selectState.value.state }}, {{ selectState.value.abbr }} -- {{ selectState.value.disable }} </template>
			<template v-slot:item="item" FormattedOptions>
				<v-list-item @click="toggleState(item)">
					<div>Choose <span style="color: blue">{{ item.props.value.state }}</span></div>
				</v-list-item>
			</template>
		</v-select> -->


		<!-- WORKING -- WIP -->
		<!-- <p class="text-center" v-if="selectTheme__ONE"><br />
			SELECTED VALUE [ {{ selectTheme__ONE.value.state }} ]</p><br />
		<v-select label="Select Theme__ONE" 
		v-model="selectTheme__ONE" :items="itemsTheme__ONE"  class="class=text-left pa-3 ma-3">
			<template v-slot:selection>
				{{ selectTheme__ONE.value.state }} 
			</template>
			<template v-slot:item="item">
				<v-list-item @click="updateTheme__ONE(item)">
					<div>Choose <span style="color: blue">{{ item.props.value.state }}</span></div>
				</v-list-item>
			</template>
		</v-select> -->

		<!-- WORKING -- FINI -->
		<p class="text-center" v-if="selectTheme"><br />
			SELECTED VALUE [ {{ selectTheme.value }} ]</p><br />		
		<v-select label="Select Theme__TWO" 
		v-model="selectTheme" 
		:items="computedThemesKeysValue"  
		class="class=text-left pa-3 ma-3">
			<template v-slot:selection>
				{{ selectTheme.value }} 
			</template>
			<template v-slot:item="item">
				<v-list-item @click="updateTheme(item)">
					{{ item.props.title }}
				</v-list-item>
			</template>
		</v-select>

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


////	DEV -- FINAL -- METHODS-FUNCTIONS
function updateTheme(itemTheme) { 
	selectTheme.value = itemTheme.props;
	setTheme(itemTheme.props.value)
}
////	DEV -- FINAL -- DATA
let selectTheme = ref();

////	DEV -- ONE -- METHODS-FUNCTIONS
// function updateTheme__ONE(itemTheme) { selectTheme__ONE.value = itemTheme.props; }
////	DEV -- DATA
// let selectTheme__ONE = ref();
// const itemsTheme__ONE = [
// 	{ state: "light" },
// 	{ state: "dark" },
// 	{ state: "light_custom" },
// 	{ state: "dark_custom" },
// ];

////	REF -- METHODS-FUNCTIONS
// function toggleState(item) { selectState.value = item.props; }
////	REF -- DATA
// let selectState = ref();
// const itemsStates = [
// 	{ state: "Florida", abbr: "FL", disable: true },
// 	{ state: "Georgia", abbr: "GA", disable: true },
// 	{ state: "Nebraska", abbr: "NE", disable: true },
// 	{ state: "California", abbr: "CA", disable: false },
// 	{ state: "New York", abbr: "NY", disable: false },
// ];

////	REF -- DATA
// const itemsFooBar = ['foo', 'bar', 'fizz', 'buzz', 'fizzbuzz', 'foobar']
// const valueFooBar = ref(['foo', 'bar', 'fizz'])

</script>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
export default defineComponent({
	name: "ThemeChanger",
	components: {},
});
</script>
