<template>
	
	<v-avatar v-if="stat" color="success" size="30">
		<v-icon icon="mdi-check"> </v-icon> 
	</v-avatar>
	
	<v-avatar v-else color="grey" size="30">
		<v-icon icon="mdi-circle-outline"></v-icon> 
	</v-avatar>

</template>

<script setup lang="ts">
const props = defineProps({
	stat: Boolean
})

</script>