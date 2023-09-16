<template> 
	<v-select  v-model="selectorModel" :items="props.selectorItems" :label="selectorLabel" :style="props.selectorWidth">	

		<!-- <template v-slot:item="{ item, props: {onClick, title, value} }" >
			<v-list-item :title="item.title"  @click="onClick(); clickIt()">
			</v-list-item>
		</template> -->

		<!-- <template v-slot:item="{ item, props: {onClick} }" >
			<v-list-item :title="item.title"  @click="onClick(); clickIt()">
			</v-list-item>
		</template> -->

		<!-- <template v-slot:item="{ item, props: {onClick} }" >
			<v-list-item :title="item.title"  @click="onClick(); clickIt()">
			</v-list-item>
		</template> -->

		<!-- <template v-slot:item="{ props }" >
			<v-list-item v-bind="props" @click="clickIt()">
			</v-list-item>
		</template> -->

		<!-- <template v-slot:item="{ props }" >
			<v-list-item v-bind="props" 
				@click="$emit('clickSelectorEvent', selectorModel, props.selectSwitchFlag)">
			</v-list-item>
		</template> -->

		<!-- /**				The Template wraps the list item 
							The template and list item are NOT required to display the themes in ':items' 		
							The template adds the desited 'behavior' when a theme is selected in the DDL   */ -->
		<template v-slot:item="{ item, props: {onClick} }" >
			
			<!-- /**			The 'onClick() controls displaying the selected item'
							The '$emit()' fires an event and passes the selected item (selectorModel) and the selectSwitchFlag.
							You need both.			 */				 -->
			<v-list-item :title="item.title" @click="$emit('onClickSelectorEvent', selectorModel, props.selectSwitchFlag)"/>
			<!-- <v-list-item :title="item.title" @click="onClick(); $emit('onClickSelectorEvent', selectorModel, props.selectSwitchFlag)"/> -->

		</template>

	</v-select>

	<!--					This will display the currently selected theme in selectorModel. --DEBUG ONLY-- */ -->
	<!-- selectorModel - > {{ selectorModel }} -->
	<!-- {{ selectorModel }} -->

</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { enter, info } from "../../my-util-code/MyConsoleUtil";
const emit = defineEmits(['onClickSelectorEvent'])
const props = defineProps({
	defaultItem: String,
	selectorLabel: String,
	selectorItems: Array<string|undefined>,
	selectSwitchFlag: Boolean,
	selectorWidth: String,
})
//const selectorModel = ref()
const selectorModel = ref(props.defaultItem)

//					This doesn't seem to get executed.
// function clickIt(){
// 				enter(`enter clickit`)
// 	emit('clickSelectorEvent', selectorModel.value, props.selectSwitchFlag)
// 	selectorModel.value = ''
// }

</script>