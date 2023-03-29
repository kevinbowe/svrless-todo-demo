<template>
	<v-container class="text-center">
		<h1 class="text-primary">Dev Page Content</h1>
		<v-btn class="pa-3" to="/">Go To Home</v-btn>
		<div class="text-center">
			<v-card-text>
				<v-card color="blue-grey-darken-1" class="my-2" @click="setTheme(eachThemeName)" 
				v-for="(eachThemeName, themeIndex) in computedThemesKeysValue" :key="themeIndex">
					<v-list-item>
						<v-list-item-action>
							<div>
								<h1 style="display:inline;margin-right:1em;">{{eachThemeName.toUpperCase() }}</h1>
							</div>
							<v-avatar v-if="uTheme.global.name.value === eachThemeName" color="success" size="30">
								<v-icon>mdi-check</v-icon>
							</v-avatar>
						</v-list-item-action>
					</v-list-item>
					<!-- Display each Color Name in the Theme -->
					<div class="text-center">
						<span v-for="colorArrayIndex in allThemesAndColors[themeIndex].colorArray.length">
							<v-chip :color="allThemesAndColors[themeIndex].colorArray[colorArrayIndex-1].code" label class="ma-1 py-6 px-3" >
								<strong>{{ allThemesAndColors[themeIndex].colorArray[colorArrayIndex-1].color }}</strong>
							</v-chip>
						</span>
					</div>
				</v-card>
			</v-card-text>
		</div>
	</v-container>
</template>

<script setup lang="ts">
	import SandBox from "../components/SandBox.vue";
	import ThemeChangerMenu from "../components/ThemeChangerMenu.vue";
	import { ThemeInstance, useTheme } from "vuetify";
	const uTheme = useTheme();
	const themeMap = new Map();
	const colorMap = new Map();
	const computedThemesKeysValue = Object.keys(uTheme.computedThemes.value)
	const computedThemesEntriesValue = Object.entries(uTheme.computedThemes.value)
	const themeLength = computedThemesKeysValue.length
	const generateThemesWithAllColors = () => {
		// Get the total number of themes.
		var themeLength = computedThemesKeysValue.length
		
		var themeObjs = []
		var cArray: { color: string; code: string; }[] = []
		
		// Create array to store the themes and related VideoColorSpace
		for(var i=0; i < themeLength; i++)
		{
			// Fetch the Theme name
			var tName = computedThemesKeysValue[i]
			
			// Fetch the Color elements
			var tColorProps =	computedThemesEntriesValue[i][1].colors

			Object.entries(tColorProps).forEach((e) => {
				if (e[0].includes('-')) return;
			 	var o ={"color":e[0], "code":e[1]}
			 	cArray.push(o)
			})

			// create the themeObject
			var o = {"theme": tName, "colors": tColorProps, "colorArray":cArray}
			themeObjs.push(o);

			// Clear the cArray for the next theme pass
			cArray = [];
		}

		return themeObjs
	}
	const allThemesAndColors = generateThemesWithAllColors()
	const computedColors = (themeIndex:number) => {
		// Comment
		/* Comment */
		var x = "double-quote"
		var y = 'single-quote'
		var z = `back tick`

		console.log("----------------------------------------- New Theme")
		var colorObj

		// colorObj = computedThemesKeysValue
		// console.log(colorObj)

		// colorObj = computedThemesKeysValue[0]
		// console.log(colorObj)
		// colorObj = computedThemesKeysValue[1]
		// console.log(colorObj)
		// colorObj = computedThemesKeysValue[2]
		// console.log(colorObj)
		// colorObj = computedThemesKeysValue[3]
		// console.log(colorObj)

		// colorObj = computedThemesKeysValue.length
		// // Returns the total number of themes in the Theme object.
		// //	Use this like an index from [ThemeIndex]



		// colorObj = computedThemesKeysValue.entries()
		// console.log(colorObj.next().value)
		// console.log(colorObj.next().value)
		// console.log(colorObj.next().value)
		// console.log(colorObj.next().value)
		// // This code block displays the theme names.


		// colorObj = computedThemesEntriesValue[themeIndex][1].colors;
		// console.log("Theme Index ==> ",themeIndex) 						
		// displays All Colors for a theme


		// colorObj = computedThemesEntriesValue[themeIndex][1].colors.background			
		// // displays the "background color" - Hex Code for a theme


		// colorObj = computedThemesEntriesValue[themeIndex][1].dark							
		// // displays the Dark Flag <bool> for a theme


		// colorObj = computedThemesEntriesValue[themeIndex][1].variables					
		// // DEBUG Unusable property data for a theme


		// //	Object.entries
		// colorObj = Object.entries(computedThemesEntriesValue[themeIndex][1].colors)			
		// colorObj.forEach((e)=> {
		// 	console.log("---------")
		// 	console.log(e[0]);
		// 	console.log(e[1]);
		// }) 
		// 	// returns all property keys and values, EG: ['background','#ffffff'], 
		// 	//	as an object that can be iterated over
		// 	// This isn't practical because of the forEach()


		// //	Object.entries
		// colorObj = Object.entries(computedThemesEntriesValue[themeIndex][0]) 
		// 	/// Useless: Returns a string array of the theme name in each theme


		// //	Object.entries
		// colorObj = Object.entries(computedThemesEntriesValue[themeIndex][1]) 
		// 	// Returns all of the toplevel properties associated with a theme: [dark, colors, variables]


		// //	Object.entries
		// colorObj = Object.entries(computedThemesEntriesValue[themeIndex][1].colors) 
		// 	// Returns all of the color property key/values as array elements, for a themes


		// //	Object.entries
		// var colorPropIndex = 0 // Index of the desired color
		// const topLevelPropsIndex = 1 // Don't change this value
		// var colorObj1 = Object.entries(computedThemesEntriesValue[themeIndex][topLevelPropsIndex].colors)
		// var colorObj2 = colorObj1[colorPropIndex].values()
		// console.log("Property name == ",colorObj2.next()) // This will return the property name
		// console.log("Property value == ",colorObj2.next()) // The will return the property value

			
		// //	Object.entries
		// var ColorPropIndex = 0
		// colorObj = Object.entries(computedThemesEntriesValue[themeIndex][1].colors)[ColorPropIndex]		
		// 	// returns a property key and value by index
		// 	// ['background','#ffffff'] 
		// 	// Each pair is an element


		// //	Object.entries
		// colorObj =  Object.entries(computedThemesEntriesValue[themeIndex][1].colors)[0].length	
		// 	// Returns the number of elements in the property index


		// //	Object.entries
		// var ColorPropIndex = 0
		// colorObj =  Object.entries(computedThemesEntriesValue[themeIndex][1].colors)[ColorPropIndex]
		// for(const val of colorObj) 
		// 	 console.log(val)
		// 	//	The Object.entries returns the key and value associated with the color at ColorPropIndex.
		// 	//	The for() iterates over the object, returning the key and value as separate values.


		// //	Object.keys
		// colorObj = Object.entries(computedThemesEntriesValue[themeIndex][1].colors.background)			
		// // Useless: char array of background - Hex Code /// Not useful


		// //	Object.keys
		// colorObj = Object.keys(computedThemesEntriesValue[themeIndex][1].colors)			
		// // returns all of color proper names in a theme


		// /* Useful */
		// //	Object.keys
		// colorObj = Object.keys(computedThemesEntriesValue[themeIndex][1].colors)[0]			
		// 	// returns property a property name by index in a theme


		// //	Object.keys
		// colorObj = Object.keys(computedThemesEntriesValue[themeIndex][1].colors.background)			
		// 	// Useless: keys to each char in the color


		// //	Object.values
		// colorObj = Object.values(computedThemesEntriesValue[themeIndex][1].colors)			
		// 	// returns all of the color hex codes for a theme color		


		// //	Object.getOwnPropertyNames
		// colorObj = Object.getOwnPropertyNames(computedThemesEntriesValue[themeIndex][1].colors)			
		// 	// returns the property names for all colors in each theme


		// colorObj = computedThemesEntriesValue[themeIndex][1].dark			
		// 	// Dark Flag <bool>
		// colorObj = computedThemesEntriesValue[themeIndex][1].variables
		// 	// Nothing interesting
		// colorObj = computedThemesEntriesValue[themeIndex][0] 					
		// 	// List of Themes
		// colorObj = computedThemesEntriesValue	
		// 	//... Error

		// console.log(colorObj)


		/*
			****************************************
			****************************************
		*/


		// var population = { male: 4, female: 93, others: 10 };
		// let numbers = Object.values(population);
		// let populationArr = Object.entries(population);
		// const obj = { pizzas: 1, donuts: 2, potatoes: 3 };


		// // Iterate through the object
		// for (const key in population) { 
		// 	if (population.hasOwnProperty(key)) { 
		// 		console.log(`${key}: ${population[key]}`); 
		// 	}}
		// 		// male: 4
		// 		// female: 93
		// 		// others: 10


		// /* ----------------- */
		// /* Using Object.keys */
		// /* ----------------- */


		// let genders = Object.keys(population);
		// console.log(genders);
		// 	// (3) ['male', 'female', 'others']


		// // var genders = Object.keys(population);
		// genders.forEach((gender) => console.log(gender));
		// 	// male
		// 	// female
		// 	// others


		// // var genders = Object.keys(population);
		// genders.forEach((gender) => {
		//   console.log(`There are ${population[gender]} ${gender}`); 
		// }) 
		// 		//   "There are 4 male"
		// 		// 	"There are 93 female"
		// 		// 	"There are 10 others"


		// /* ------------------- */
		// /* Using Object.values */
		// /* ------------------- */


		// // let numbers = Object.values(population);
		// console.log(numbers); 
		// 	// [4,93,10]

		// // let numbers = Object.values(population);
		// numbers.forEach((number) => console.log(number));
		// 	// 4
		// 	// 93
		// 	// 10

		// /* -------------------- */
		// /* Using Object.entries */
		// /* -------------------- */

		// // let populationArr = Object.entries(population);
		// console.log(populationArr);
		// // 		// (3) [Array(2), Array(2), Array(2)]
		// // 		// 	0: (2) ['male', 4]
		// // 		// 	1: (2) ['female', 93]
		// // 		// 	2: (2) ['others', 10]
		// // 		// 	length: 3


		// for (var array of populationArr){
		// 	  console.log(array);
		// }
		// 			// (2) ['male', 4]
		// 			// 	0: "male"
		// 			// 	1: 4
		// 			// 	length: 2


		// for (const [key, value] of Object.entries(population)) {
		// 	  console.log(`${key}: ${value}`);
		// }
		// 			// male: 4
		// 			// female: 93
		// 			// others: 10


		// //	const obj = { pizzas: 1, donuts: 2, potatoes: 3 };
		// for (const key in obj) {
		// 	console.log(obj[key]);
		// }
		// 		// 1
		// 		// 2
		// 		// 3


		// 	// const obj = { pizzas: 1, donuts: 2, potatoes: 3 };
		// Object.keys(obj).forEach(key => {
		// 	  console.log(key);
		// })
		// 		// Returns 
		// 		// 	pizzas
		// 		// 	donuts
		// 		// 	potatoes


		// 	// const obj = { pizzas: 1, donuts: 2, potatoes: 3 };
		// Object.values(obj).forEach(value => {
		// 	  console.log(value);
		// })
		// // 		// 1
		// // 		// 2
		// // 		// 3


		// 	// const obj = { pizzas: 1, donuts: 2, potatoes: 3 };
		// const entries = Object.entries(obj);
		// console.log(entries);
		// 		// (3) [Array(2), Array(2), Array(2)]
		// 		// 	0: (2) ['pizzas', 1]
		// 		// 	1: (2) ['donuts', 2]
		// 		// 	2: (2) ['potatoes', 3]
		// 		// 	length: 3


		// 	// const obj = { pizzas: 1, donuts: 2, potatoes: 3 };
		// for (const [key, value] of Object.entries(obj)) {
		// 	console.log(`${key}: ${value}`);
		// }
		// 		// This returns a discreat key and value from each entry
		// 		// pizzas: 1
		// 		// donuts: 2
		// 		// potatoes: 3

return colorObj
	}
	const setTheme = (myTheme: string) => { uTheme.global.name.value = myTheme; };
</script>

<script lang="ts">
	import { defineComponent } from "vue";
	export default defineComponent({
		name: "DevView",
		components: {
			SandBox,
			ThemeChangerMenu,
		},
	});
</script>
