<template>
<v-select  v-model="selectModel" :items="props.selectorItems" :label="selectorLabel">	

												<!-- <template #item="{ item, props: {onClick, title, value} }" >
													<v-list-item :title="item.title"  @click="onClick"/>
												</template> -->

	<template v-slot:item="{ item, props: {onClick, title, value} }" >
		<v-list-item :title="item.title"  @click="onClick(); clickIt()">
		</v-list-item>
	</template>

</v-select>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
const emit = defineEmits(['clickSelectorEvent'])
const props = defineProps({
	defaultItem: String,
	selectorLabel: String,
	selectorItems: Array<string|undefined>,
	switchFlagX: Boolean
})
const selectModel = ref(props.defaultItem)

function clickIt(){
	emit('clickSelectorEvent', selectModel.value, props.switchFlagX)
}

</script>