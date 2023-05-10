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
						:rules="[value => checkNameLength(value), 
									value => checkApi(value),
									value => checkNameType(value)]"
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
			exit, success, bar, whitebar, fini, start, pass, fail }
	from "../my-util-code/MyConsoleUtil"

const userName = ref<string>("")
const startMark =  new Date(Date.now())
const formattedDateTime = startMark.toLocaleString('en-US');
function now () {
	let d = new Date(Date.now()).toLocaleString('en-US',{
    minute:'2-digit',
    second:'2-digit',
    fractionalSecondDigits: '3'});
	return `NOW == ${d} (d.sec)`
}

function mark() {
	let CurMark = new Date(Date.now() - startMark)
	let fmtSecondsElap = CurMark.getSeconds()
	let fmtMsElap = CurMark.getMilliseconds()
	return `MARK == ${fmtSecondsElap}:${fmtMsElap} ms`
}

function elap() {
	let e = new Date(Date.now() - startMark)
	let fmtSecondsElap = e.getSeconds()
	let fmtMsElap = e.getMilliseconds()
	return `ELAP == ${fmtSecondsElap}:${fmtMsElap} ms`
}

////////////////////////////////////////////////////////////////////////////////

async function myFunctionSubmit (event) {
	bar(`START -- Submit `, now()); 
	
	const t0 = performance.now();
	start(`   (START) (SUBMIT-Waiting) (await event) @ `,now())

	const results = await event
	fini(`   (FINI) (SUBMIT-Waiting) (await event) @ `, now())

	if (!results.valid) {
		fail("Do not continue to perform submission")
	} else {
		pass("(SUBMIT) A-OK -- Continue to perform submission")
	}
	
	info(`(SUBMIT)`, elap() ); 
	bar(`END -- Submit `, now())
} //////////////////////////////////////////////////////////////////////////////

/* This Function is called FIRST */
async function checkNameLength (userName) {
	whitebar("START -- Check Name Length");
	if (userName.length <= 3) {

		fail("check Name Length() -- Too Short ", userName)
		info(``, elap() ); 
		info(``, now() ); 
		whitebar(`FINI -- Check Name Length`, elap()); 
		return 'User name is too short.'
	}

	pass("check Name Length() -- OK ", userName)
	info(``, elap() ); 
	info(``, now() ); 
	whitebar("FINI -- Check Name Length", elap()); 
	return true
} //////////////////////////////////////////////////////////////////////////////

/* This Function is called SECOND */
async function checkApi (userName) {
	whitebar("START -- Check Api");
	if (!userName) {

		fail("Please enter a user name. -- No Name Input", `<empty>`)
		info(``, elap() ); 
		info(``, now() ); 
		whitebar(`FINI -- checkApi`, elap()); 
		return 'Please enter a user name.'
	}
	if (userName === 'kevin') {

		fail("User name already taken. Please try another one.", userName)
		info(``, elap() ); 
		info(``, now() ); 
		whitebar(`FINI -- checkApi`, elap()); 
		return 'User name already taken. Please try another one.'
	}
	pass("Check Api() [empty userName | all ready used userName] -- OK ", userName)

	info(``, elap() ); 
	info(``, now() ); 
	whitebar("FINI - Check Api", elap()); 
	return true
} ////////////////////////////////////////////////////////////////////////////////

/* This Function is called THIRD */
function checkNameType (userName) {
	whitebar("START -- Check Name Type",);
	
	if (userName.match(/\d+/g) !== null) {

		fail("UserName can not contain numbers", userName)
		info(``, elap() )
		info(``, now() ) 
		whitebar("FINI -- Check Name Type", elap()); 
		return 'Username can not contain numbers'
	}

	pass("Check Name Type() -- OK ", userName)
	info(``, elap() ); 
	info(``, now() ); 
	whitebar("FINI -- Check Name Type", elap()); 
	return true
} ///////////////////////////////////////////////////////////////////////////////
</script>

<style>
.amplify-button--link { color: rgb(var(--v-theme-primary)); }
.amplify-button[data-variation='primary'] { background-color: rgb(var(--v-theme-primary)); }
.amplify-tabs-item { color: rgb(var(--v-theme-primary)); }
.amplify-tabs-item:focus { color: rgb(var(--v-theme-primary)); }
.amplify-tabs-item:hover { color: rgb(var(--v-theme-primary)); }
.amplify-tabs-item[data-state=active] { color: rgb(var(--v-theme-primary)); border-color: rgb(var(--v-theme-primary));
}</style>