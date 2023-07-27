<template>
	<v-row no-gutters >
		<v-spacer/>
		<v-col cols="8">
			<v-btn class="mt-3" color="primary" @click="signOutUser">
				Sign Out
			</v-btn>
		</v-col>
		<v-spacer/>
	</v-row>
</template>

<script lang="ts">
	export default {inheritAttrs: false}
</script>

<script setup lang="ts">
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
import { info, info1, info2 , info3, info4, info5, info6, info7 } from "../my-util-code/MyConsoleUtil"
import { enter, enter0, enter1, enter2, enter3, enter4, enter5, enter6, enter7 } from "../my-util-code/MyConsoleUtil"
import { bar, whitebar, greybar, redbar, greenbar, orangebar } from "../my-util-code/MyConsoleUtil"
import { log, warn, err, err2, exit, success, pass, fail, fini, start, progress, joy, } from "../my-util-code/MyConsoleUtil"
/* ----------------------------------------------------------------------------- */
import { Auth } from 'aws-amplify';

import {ref, defineEmits} from "vue"
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

const emit = defineEmits()

const signOutUser = async () => {
	try { await Auth.signOut()
		.then(result => {
			// isSession.value = false
			emit('onSignOut', { isSessionFlag:false, myModel:'MyString' })
		})
	}
	catch (error) { console.log('error signing out: ', error);}
}

</script>