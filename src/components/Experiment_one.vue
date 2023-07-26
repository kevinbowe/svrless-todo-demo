<template>
	<h1>Experiment One</h1>
	<v-row no-gutters >
		<v-spacer/>
		<v-col cols="8">
			<v-btn class="mt-3" color="primary" @click="experimentOne">
				Exp One
			</v-btn>
		</v-col>
		<v-spacer/>
	</v-row>
</template>

<script setup lang="ts">
const emit = defineEmits(['onExperimentEmit'])
const experimentOne = () => {
	console.log("Executing --> Experiment_one.vue >  --> experimentOne()")
	const obj = {
		isSignedInFlag:true, 
		username:"Mr_Kranky", 
		phone:"(919) 272-7866"
	}
	emit('onExperimentEmit', obj)
}
</script>