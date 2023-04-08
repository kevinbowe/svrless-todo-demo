<template>
	<v-container class="d-none d-sm-flex" Hide-All--Then-Show-All-SM-And-Larger>
		<v-row no-gutters>
			<v-spacer />
			<v-col cols="5">
				<v-select label="Left Theme" style="width:10em;" class="float-right" 
						v-model="leftModel" :items="themeVals">
					<template v-slot:selection> {{ leftModel }} </template>
					<template v-slot:item="item">
						<v-list-item @click="onClickSelector(item, false /* Left Selector */)"> {{ item.props.title }}
						</v-list-item>
					</template>
				</v-select>			
				<div class="float-right" style="margin:.6em 1em 0em 0em;">
					<StatusIcons :stat="!switchFlag" />
					
				</div>
			</v-col>

			<v-col cols="2" align-self="center" style="margin:0em 0em .8em 0em;">
				<v-switch :model-value="switchFlag"
						style="justify-content:center; display:flex;margin-bottom:1em;" 
						density="compact" :flat="true" inset @change="onChangeSwitch" />
			</v-col>	

			<v-col cols="5">
				<v-select label="Right Theme" style="width:10em;" class="float-left" 
						v-model="rightModel" :items="themeVals">
					<template v-slot:selection> {{ rightModel }} </template>
					<template v-slot:item="item">
						<v-list-item @click="onClickSelector(item, true /* Right Selector */)"> {{ item.props.title }}
						</v-list-item>
					</template>
				</v-select>
				<div class="float-left" style="margin:.7em 0em 0em 1em;">
					<StatusIcons :stat="switchFlag" />

				</div>
			</v-col>
			<v-spacer />
		</v-row>
	</v-container>

	<v-container class="d-sm-none">
		<v-list-item>
			<v-list-item-action>
				<div style="margin:0em 1em 1em 0em;">
					<StatusIcons :stat="!switchFlag" />
	
				</div>
				<v-select label="Left Theme" style="min-width:10em;" v-model="leftModel" :items="themeVals">
					<template v-slot:selection>
						<span class="d-flex justify-center"> {{ leftModel }} </span> </template>
					<template v-slot:item="item">
						<v-list-item @click="onClickSelector(item, false /* Left Selector */)"> {{ item.props.title }}
						</v-list-item> </template>
				</v-select>
			</v-list-item-action>
		</v-list-item>

		<v-row no-gutters style="margin-left:3em;">
			<v-col class="text-right">
				<v-icon icon="mdi-arrow-up-left-bold" size="x-large" style="margin-top: -6px;"></v-icon> </v-col>
			<v-col cols="2">
				<v-switch :model-value="switchFlag" style="justify-content:center;display:flex;" density="compact" :flat="true" inset
					@change="onChangeSwitch" /></v-col>
			<v-col class="text-left">
				<v-icon icon="mdi-arrow-down-right-bold" size="x-large" style="margin-top: 14px;"></v-icon> </v-col>
		</v-row>

		<v-list-item>
			<v-list-item-action>
				<div style="margin:0em 1em 1em 0em;">
					<StatusIcons :stat="switchFlag" />

				</div>
				<v-select label="Right Theme" style="padding-top:6px;min-width:10em;" v-model="rightModel" :items="themeVals">
					<template v-slot:selection>
						<span class="d-flex justify-center"> {{ rightModel }} </span></template>
					<template v-slot:item="item">
						<v-list-item @click="onClickSelector(item, true /* Right Selector */)"> {{ item.props.title }}
						</v-list-item> </template>
				</v-select>
		</v-list-item-action>
		</v-list-item>
	</v-container>

	<ThemePreview />

</template>

<script setup lang="ts">
import { ref } from "vue";
import { useTheme } from "vuetify";
import ThemePreview from "./ThemePreview.vue";
import StatusIcons from "./ThemeParts/StatusIcons.vue"

const theme = useTheme();
const themeVals = Object.keys(theme.computedThemes.value);
const switchFlag = ref(false) //// false == left

// Set the default Models and Theme
let leftModel:string = "light"
let rightModel:string = "dark"
theme.global.name.value = "light";

const onChangeSwitch = () => {
	switchFlag.value = !switchFlag.value;
	theme.global.name.value = theme.global.name.value === leftModel ? rightModel : leftModel;
};

function onClickSelector(itemTheme: { props: { value: string; }; }, selectorSide: boolean) { 
	// Update the selector
	if ( selectorSide /* true -- right */) rightModel = itemTheme.props.value;
	else leftModel = itemTheme.props.value; /* false -- left */

	//	Update the switch.
	if(switchFlag.value != selectorSide ) switchFlag.value = !switchFlag.value;
	
	//	Update active theme
	theme.global.name.value = itemTheme.props.value;
}

</script>