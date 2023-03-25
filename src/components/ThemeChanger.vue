<template>
	<!-- <v-app> -->
	<!-- <v-container class="text-center"> -->
	<div class="text-center">
		<h1 class="text-left">Theme Switcher</h1>
		<v-switch @change="onChangeTheme" :label="`Toggle [${altThemeName}] Theme`" density="compact" :flat="true" inset />

					<!-- REF -- WORKING -->
					<!-- <v-select label="Select Foo Bar Items"
					v-model="valueX" :items="itemsX" multiple class="class=text-left pa-3 ma-3">
						<template v-slot:selection="{ item, index }">
							<v-chip v-if="index < 2"> <span> {{ item.title }} </span> </v-chip>
							<span v-if="index === 2" class="text-grey text-caption align-self-center" >
								(+{{ valueX.length - 2 }} others)
							</span>
						</template>
					</v-select> -->

					<!-- REF -- WORKING -->
					<!-- <v-select label="Select a State -- GOLD" 
					v-model="select" :items="items"  class="class=text-left pa-3 ma-3">
						<template v-slot:selection="{ item }" SelectedResults> 
							{{ select.value.state }}, {{ select.value.abbr }} -- {{ select.value.disable }} </template>
						<template v-slot:item="item" FormattedOptions>
							<v-list-item @click="toggle(item)">
								<div>Choose <span style="color: cyan">{{ item.props.value.state }}</span></div>
							</v-list-item>
						</template>
					</v-select>
					<p class="text-center" v-if="select"><br />
						SELECTED VALUE [ {{ select.value.state }} - {{ select.value.abbr }} -- [ Disabled: {{ select.value.disable }}] ]</p><br /> -->

											<!-- WIP -->
											<!-- <v-select label="Select Theme" 
											v-model="selectTheme" :items="itemsTheme"  class="class=text-left pa-3 ma-3">
												<template v-slot:selection>
													{{ selectTheme.value.state }} 
												</template>
												<template v-slot:item="item">
													<v-list-item @click="updateTheme(item)">
														<div>Choose <span style="color: cyan">{{ item.props.value.state }}</span></div>
													</v-list-item>
												</template>
											</v-select>
											<p class="text-center" v-if="selectTheme"><br />
												SELECTED VALUE [ {{ selectTheme.value.state }} ]</p><br /> -->

		<!-- WIP -->
		<v-select label="Select Theme 2" 
		v-model="selectThemeX" 
		zzz:items="itemsThemeX"  
		:items="computedThemesKeysValue"  
		class="class=text-left pa-3 ma-3">
			<template v-slot:selection>
				{{ selectThemeX.value }} 
			</template>
			<template v-slot:item="item">
				<v-list-item @click="updateThemeXX(item)">
					<!-- <div>Choose <span style="color: cyan">{{ item.props.value.state }}</span></div> -->
					{{ item.props.title }}<br>
					<!-- ZZZ -- {{ item.props.value }}<br>
					AAA -- {{ item.value }}<br>
					BBB -- {{ item.title }}<br>
					CCC -- {{ item }}<br>
					------------------------------------ -->
				</v-list-item>
			</template>
		</v-select>
		<p class="text-center" v-if="selectThemeX"><br />
			SELECTED VALUE [ {{ selectThemeX.value }} ]</p><br />


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


////	DEV -- METHODS-FUNCTIONS
function updateThemeX(itemTheme) { selectThemeX.value = itemTheme.props; }
function updateThemeXX(itemTheme) { 
	selectThemeX.value = itemTheme.props;
	console.log(itemTheme.props.value) 
	setTheme(itemTheme.props.value)
}



////	DEV-X -- DATA
let selectThemeX = ref();
const itemsThemeX = [ "light", "dark", "light_custom", "dark_custom" ]


						////	DEV -- METHODS-FUNCTIONS
						function updateTheme(itemTheme) { selectTheme.value = itemTheme.props; }
						////	DEV -- DATA
						let selectTheme = ref();
						const itemsTheme = [
							{ state: "light" },
							{ state: "dark" },
							{ state: "light_custom" },
							{ state: "dark_custom" },
						];


////	REF -- METHODS-FUNCTIONS
function toggle(item) { select.value = item.props; }
////	REF -- DATA
let select = ref();
const items = [
	{ state: "Florida", abbr: "FL", disable: true },
	{ state: "Georgia", abbr: "GA", disable: true },
	{ state: "Nebraska", abbr: "NE", disable: true },
	{ state: "California", abbr: "CA", disable: false },
	{ state: "New York", abbr: "NY", disable: false },
];

////	REF -- DATA
const itemsX = ['foo', 'bar', 'fizz', 'buzz', 'fizzbuzz', 'foobar']
const valueX = ref(['foo', 'bar', 'fizz'])


</script>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
export default defineComponent({
	name: "ThemeChanger",
	components: {},
});
</script>
