<template>

	<v-row no-gutters >
		<v-spacer/>
		<v-col cols="8">
			<v-btn class="mt-3" color="primary" @click="experimentOne">
				Exp One & One B
			</v-btn>
		</v-col>
		<v-spacer/>
	</v-row>

	<v-row no-gutters >
		<v-spacer/>
		<v-col cols="8">
			<v-btn class="mt-3" color="primary" @click="experimentOne_B">
				Exp One B -- Only
			</v-btn>
		</v-col>
		<v-spacer/>
	</v-row>
</template>

<script setup lang="ts">
const emit = defineEmits(['onExperimentEmit', 'onExperimentEmit_B'])

const experimentOne = () => {
	console.log("Executing --> Experiment_one.vue >  --> experimentOne()")
	const obj = {
		isSignedInFlag:true, 
		username:"Mr_Kranky", 
		phone:"(919) 272-7866"
	}
	console.log("      Emit -- onExperimentEmit")
	emit('onExperimentEmit', obj)

	const objB = {
		isSignedInFlag:true, 
		username:"DaBoh", 
		phone:"(919) 272-7866"
	}
	console.log("      Emit -- onExperimentEmit_B")
	emit('onExperimentEmit_B', objB)
}

const experimentOne_B = () => {
	console.log("Executing --> Experiment_one.vue >  --> experimentOne_B()")
	const obj = {
		isSignedInFlag:true, 
		username:"DaBoh", 
		phone:"(919) 272-7866"
	}
	emit('onExperimentEmit_B', obj)
}

</script>