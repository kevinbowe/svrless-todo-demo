<template>
<v-app>
<MasterLayout>
<h1>Home</h1>
<v-row class="my-5" justify="center">
<v-sheet width="300" color="background" class="mx-auto">
<h1>EXPERIMENT</h1>
<div class="my-5"><hr></div>

				<v-form validate-on="submit" @submit.prevent="myFunctionSubmit">
					<v-text-field
						v-model="userName"
						label="User name"
						:rules="[value => callPromises3(value)]"
					></v-text-field>
					<v-btn type="submit" block class="mt-2">Submit</v-btn>
				</v-form>

</v-sheet>
</v-row>
</MasterLayout>
</v-app>
</template>

<script setup lang="ts">
import MasterLayout from "../layouts/MasterLayout.vue";
import {ref} from "vue"
import  { log, warn, err , progress, joy, info, enter,
			exit, success, bar, whitebar, fini, start }
	from "../my-util-code/MyConsoleUtil"

const userName = ref<string>("")
////////////////////////////////////////////////////////////////////////////////

async function myFunctionSubmit (event) {
	whitebar("Start Submit");
	const results = await event

	if (!results.valid)
		err("Do not continue to perform submission")
	else
		joy("A-OK -- Continue to perform submission")
	whitebar("End Submit")
} //////////////////////////////////////////////////////////////////////////////


const callPromises2 = (userName: string) => {
	bar( "Start Validation"); info("Promise 2()")
	// This return sends the Promise results to the submit method [ myFunctionSubmit ]
	return Promise.all( [
		checkNameLengthPromise(userName),
		checkApiPromise(userName),
		checkNameTypePromise (userName)
	]).then (result => {
		// result is an <string>[] when using Promise.all()
		log("Inside validation .Then() -- ",result)
		for(let i = 0; i <= result.length; i++) {
			if (typeof result[i] == 'string'){
				// This return exits the '.then'
				return result[i]
			}
		}
		// This return exists the '.then'
		// Do this when no string was found (validation found no errors)
		return true
	} ) // END_.then()

}
////////////////////////////////////////////////////////////////////////////////

const callPromises3 = (userName: string) => {
	bar( "Start Validation"); info("Promise 2()")
	// This return sends the Promise results to the submit method [ myFunctionSubmit ]
	return Promise.all( [
		checkNameLengthPromise(userName),
		checkApiPromise(userName),
		checkNameTypePromise (userName),
	]).then (resultArray => {
		// This return exists all the way to the return Promise.all()
		return checkValidationResults(resultArray)
	} ) // END_.then()
}
////////////////////////////////////////////////////////////////////////////////

function checkValidationResults(resultsArray) {
		// result is an <string>[] when using Promise.all()
		log("checkResults()",resultsArray)
		for(let i = 0; i <= resultsArray.length; i++) {
			if (typeof resultsArray[i] == 'string'){
				// This return exits the '.then'
				return resultsArray[i]
			}
		}
		return true
} //////////////////////////////////////////////////////////////////////////////

/* This Promise is called FIRST */
async function checkNameLengthPromise (userName) {
	info("check Name Length Promise()")
	// whitebar(); start("checkNameLength() - Arg0 == ", userName)
	return new Promise(resolve => {

		if (userName.length <= 3) {
			// fini("checkNameLength() - User Name is too short -- in-valid ", userName)
			return resolve('User name is too short.')
		}
		// fini("checkNameLength() - User Name -- valid ", userName)
		return resolve(true)}
	)
} ////////////////////////////////////////////////////////////////////////////////

/* This Promise is called SECOND */
async function checkApiPromise (userName) {
	info("check Api Promise()")
	// bar(); start("checkApi() - Arg0 == ", userName)
	return new Promise(resolve => {

		if (!userName) {
				// fini("checkApi() - User Name is empty -- in-valid ", userName)
				return resolve('Please enter a user name.')
			}
			if (userName === 'kevin') {
				// fini("checkApi() - User Name 'kevin' -- in-valid ", userName)
				return resolve('User name already taken. Please try another one.')
			}
			// fini("checkApi() - User Name -- valid ", userName)
			return resolve(true)
	})
} ////////////////////////////////////////////////////////////////////////////////

/* This Promise is called THIRD */
async function checkNameTypePromise (userName) {
	info("check Name Type Promise()")
	// whitebar();
	// start("checkNameLength() - Arg0 == ", userName)
	return new Promise(resolve => {

		if (userName.match(/\d+/g) !== null) {
			return resolve('Username can not contain numbers')
		}
		// fini("checkNameLength() - User Name -- valid ", userName)
		return resolve(true)}
	)
} ////////////////////////////////////////////////////////////////////////////////


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