<template>
	<h1>Experiment Two</h1>
	<v-row no-gutters >
		<v-spacer/>
		<v-col cols="8">
			<v-btn class="mt-3" color="primary" @click="experimentTwo">
				Exp Two
			</v-btn>
		</v-col>
		<v-spacer/>
	</v-row>
</template>

<script setup lang="ts">
const emit = defineEmits(['onExperimentEmit'])
const experimentTwo = () => {
	console.log("Executing --> Experiment_two.vue > experimentTwo()")
	const obj = {
		isSignedInFlag:false, 
		username:"Miz_Glenda"
	}
	emit('onExperimentEmit', obj)
}
</script>
