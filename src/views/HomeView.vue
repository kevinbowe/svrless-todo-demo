<template>
<v-app>
<MasterLayout>
	<v-row class="my-5" justify="center">

			<v-sheet width="300" color="background" class="mx-auto">
				<h1>EXPERIMENT</h1>
				
				<v-btn color="blue" @click="testClick" block class="mt-2">Submit -- Experiment</v-btn>

				<p v-if="test.wordEvenOdd" class="my-5">{{ `Got: ${test.value}, ${test.wordEvenOdd} `  }}</p>
				<p v-if="testMsg.msg" class="my-5">{{ `Error: [${testMsg.msg}] -- [${testMsg.cause}] `  }}</p>
			</v-sheet>


	</v-row>
</MasterLayout>
</v-app>
</template>

<script setup lang="ts">
import MasterLayout from "../layouts/MasterLayout.vue";
import {ref} from "vue"
import  { log, warn, err , progress, joy, info, enter, exit, success, bar, whitebar, fini, start } from "../my-util-code/MyConsoleUtil"
// import "../my-util-code/MyConsoleUtil"

const test = ref({})
const testMsg = ref({})
const testClick = (input:string) => {
																											whitebar(" <--<<< START"); 
																											// bar()
																											// start("Ptest")
	let rtn = PTest()
																											// fini("PTest")
}



// To experiment with error handling, "threshold" values cause errors randomly
const THRESHOLD_A = 4 //0 //8 // can use zero 0 to guarantee error

function tetheredGetNumber(resolve: (arg0: number) => void, reject: (arg0: string) => void) {
																											// bar()
																											// enter("tethered  GetNumber")
	setTimeout( 
		() => {
			const randomInt = Date.now();
			const value = randomInt % 10;
																											info(`Random value == ${value} Threshold == ${THRESHOLD_A}`)
			if (value < THRESHOLD_A) {
																											// info("resolve == ", value)
				resolve(value);
			} else {
																											// info("reject == ", value)
				reject(`Too large: ${value}`);
			}
		}, 
		500
	); // End of setTimeout()
																											// exit("tethered  GetNumber")
}

function determineParity(value: number) {
																											// bar()
																											// enter("determine  Parity")
	const isOdd = value % 2 === 1;
																											// info("isOdd == ", isOdd)
																											// exit("determine  Parity")
	return { value, isOdd };
}

function troubleWithGetNumber(reason: any) {
																											bar()
																											enter("trouble  With  GetNumber")
	const err = new Error("Trouble getting number", { cause: reason });
																											console.error(err);
																											exit("trouble  With  GetNumber")
	throw err;
}

function promiseGetWord(parityInfo: unknown) {
																											// bar()
																											// enter("promise  Get  Word")
	return new Promise((resolve, reject) => {
		const { value, isOdd } = parityInfo;
		if (value >= THRESHOLD_A - 1) {
			reject(`Still too large: ${value}`);
		} else {
			parityInfo.wordEvenOdd = isOdd ? "odd" : "even";
			resolve(parityInfo);
		}	
																											// exit("promise  Get  Word")
	});
}

function PTest() { 
																											// bar()
																											// enter("PTest")
	var prtn = new Promise(tetheredGetNumber)
	
		.then(determineParity, troubleWithGetNumber)

		.then(promiseGetWord)

		.then((infoArg) => {
																											bar()
																											enter("final 'then'")
																											// console.log(`Got: ${info.value}, ${info.wordEvenOdd}`);
																											info(`Got: ${infoArg.value}, ${infoArg.wordEvenOdd}`);
			test.value = {value:infoArg.value, wordEvenOdd: infoArg.wordEvenOdd}
			testMsg.value = {}
																											exit("final 'then'")
			return infoArg;
		})  

		.catch((reasonArg) => {
																											bar()
																											enter("Catch == ", reasonArg)
			let catchMsg: unknown = {}
			if (reasonArg.cause) {
				catchMsg = {msg: "Had previously handled error", cause:"value == ThreshHold" }
																											console.error("Had previously handled error");
			} else {
				catchMsg = {msg: `Trouble with promiseGetWord()` , cause: reasonArg}
																											console.error(`Trouble with promiseGetWord(): ${reasonArg}`);
			}
			test.value = {}
			testMsg.value = catchMsg;

			// const testMsg = ref({msg:"Init Msg",cause:"Init Cause"})

			
																											exit("Catch")
		})

		.finally(() => {
																											bar(" >>>--> END")
																											// whitebar()													
		});

	return prtn

}

</script>

<style>
/* Documentation Example
	.amplify-button[data-variation='primary'] 
	{ background: linear-gradient( to right, var(--amplify-colors-green-80), var(--amplify-colors-orange-40) );} */

.amplify-button--link {
	color: rgb(var(--v-theme-primary));
}

.amplify-button[data-variation='primary'] {
	background-color: rgb(var(--v-theme-primary));
}

.amplify-tabs-item {
	color: rgb(var(--v-theme-primary));
}

.amplify-tabs-item:focus {
	color: rgb(var(--v-theme-primary));
}

.amplify-tabs-item:hover {
	color: rgb(var(--v-theme-primary));
}

.amplify-tabs-item[data-state=active] {
	color: rgb(var(--v-theme-primary));
	border-color: rgb(var(--v-theme-primary));
}</style>