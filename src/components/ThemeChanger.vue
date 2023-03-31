<template>
	<v-container class="d-none d-sm-flex">
		<v-row no-gutters>
			<v-spacer />
			<v-col>
				<v-select style="max-width:10em" label="Left DSK" v-model="selectedThemeModelLeft"
					:items="computedThemesKeysValue">
					<template v-slot:selection> {{ selectedThemeModelLeft }} </template>
					<template v-slot:item="item">
						<v-list-item @click="updateSelectorAndTheme(item, false /* Left Selector */)"> {{ item.props.title }}
						</v-list-item>
					</template>
				</v-select>
			</v-col>
			<v-col align-self="center">
				<v-switch style="justify-content:center; display:flex;" density="compact" :flat="true" inset
					@change="onChangeTheme" />
			</v-col>
			<v-col>
				<v-select style="max-width:10em" label="Right DSK" v-model="selectedThemeModelRight"
					:items="computedThemesKeysValue">
					<template v-slot:selection> {{ selectedThemeModelRight }} </template>
					<template v-slot:item="item">
						<v-list-item @click="updateSelectorAndTheme(item, true /* Right Selector */)"> {{ item.props.title }}
						</v-list-item>
					</template>
				</v-select>
			</v-col>
			<v-spacer />
		</v-row>
	</v-container>

	<v-container class="d-sm-none">
		<v-list-item>
			<v-list-item-action>
				<v-select label="Left Theme-Just sx" v-model="selectedThemeModelLeft" :items="computedThemesKeysValue">
					<template v-slot:selection>
						<span class="d-flex justify-center"> {{ selectedThemeModelLeft }} </span> </template>
					<template v-slot:item="item">
						<v-list-item @click="updateSelectorAndTheme(item, false /* Left Selector */)"> {{ item.props.title }}
						</v-list-item> </template>
				</v-select>
				<v-avatar v-if="!ThemeSwitchFlag" color="success" size="30">
					<v-icon icon="mdi-check"> </v-icon> </v-avatar>
				<v-avatar v-else color="grey" size="30">
					<v-icon icon="mdi-circle-outline"> </v-icon> </v-avatar>
			</v-list-item-action>
		</v-list-item>

		<v-row no-gutters>
			<v-col class="text-right">
				<v-icon icon="mdi-arrow-up-left-bold" size="x-large" style="margin-top: -6px;"></v-icon> </v-col>
			<v-col cols="2">
				<v-switch style="justify-content:center;display:flex;" density="compact" :flat="true" inset
					@change="onChangeTheme" /></v-col>
			<v-col class="text-left">
				<v-icon icon="mdi-arrow-down-right-bold" size="x-large" style="margin-top: 14px;"></v-icon> </v-col>
		</v-row>

		<v-list-item>
			<v-list-item-action>
				<v-select label="Right Theme-Just sx" v-model="selectedThemeModelRight" :items="computedThemesKeysValue"
					style="padding-top:6px;">
					<template v-slot:selection>
						<span class="d-flex justify-center"> {{ selectedThemeModelRight }} </span></template>
					<template v-slot:item="item">
						<v-list-item @click="updateSelectorAndTheme(item, true /* Right Selector */)"> {{ item.props.title }}
						</v-list-item> </template>
				</v-select>
				<v-avatar v-if="ThemeSwitchFlag" color="success" size="30">
					<v-icon icon="mdi-check"> </v-icon> </v-avatar>
				<v-avatar v-else color="grey" size="30">
					<v-icon icon="mdi-circle-outline"></v-icon> </v-avatar>
		</v-list-item-action>
		</v-list-item>
	</v-container>

	<ThemePreview />

</template>

<script setup lang="ts">
import { ref } from "vue";
import { useTheme } from "vuetify";
import ThemePreview from "../components/ThemePreview.vue";
const uTheme = useTheme();
const computedThemesKeysValue = Object.keys(uTheme.computedThemes.value);
const defaultLightTheme: string = "light";
const defaultDarkTheme: string = "dark";
const altThemeName = ref("");

altThemeName.value = defaultDarkTheme;
uTheme.global.name.value = defaultLightTheme;

let ThemeSwitchFlag:Boolean = false //// false == left
let selectedThemeModelLeft:string = "light"
let selectedThemeModelRight:string = "dark"

const onChangeTheme = () => {
	//// toggle the ThemeSwitchFlag
	ThemeSwitchFlag = !ThemeSwitchFlag;
	//// Set the new active theme to the opposit of the current active theme
	uTheme.global.name.value = uTheme.global.name.value === selectedThemeModelLeft ? selectedThemeModelRight : selectedThemeModelLeft;
	//// Update the Toggle Theme lable to display the 'alt' theme.
	altThemeName.value = uTheme.global.name.value === selectedThemeModelLeft ? selectedThemeModelRight : selectedThemeModelLeft;
};

//// This is called when a Option/Item is selected in the v-select Left or Right.
function updateSelectorAndTheme(itemTheme: { props: { value: string; }; }, selectorSide: boolean ) { 
	if (!selectorSide /* false -- left */){
		//// This is going to set the selected left model based on the left item that was selected.
		selectedThemeModelLeft = itemTheme.props.value;

	} else { /* true -- right */
		//// This is going to set the selected right model based on the left item that was selected.
		selectedThemeModelRight = itemTheme.props.value;
	}
	//// This updates the active theme for the whole system.
	UpdateTheme(itemTheme.props.value, selectorSide)
}

//// This updates the Active Theme based on the Switch/Toggle position (left/right).
//// This also sets the Switch/Toggle position label based on the other theme.
const UpdateTheme = (myTheme: string, ThemeSelectorSide: boolean) => {
	//// Which switch is currently active (left or right)?
	if(!ThemeSwitchFlag /* false == left-switch | true == right */) {
		//// If we get here, the switch is set to the left... (false)

		//// Which selected theme (left or right) got passed to this function?
		if(!ThemeSelectorSide /* false == left-selected */) {
			//// If we get here, the active theme should be updated.

			uTheme.global.name.value = myTheme;

		} else {
			//// If we get here, the right-selected was passed in.
			
			//// Update the switch label to be equal to the right-selected value
			altThemeName.value = myTheme;
		}
	} else {
		//// If we get here, the switch is set to the right... (true)

		//// Which theme selector (left or right) got passed to this function?
		if(ThemeSelectorSide /* true == right-selected */){
			//// If we get here, the active theme should be updated.

			uTheme.global.name.value = myTheme;

		} else {
			//// If we get here, the left-selected was passed in.

			//// Update the switch label to be equal to the left-selected value <<VERIFY>>
			altThemeName.value = myTheme;
		}
	}
};
</script>