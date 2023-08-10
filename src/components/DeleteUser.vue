<template>
	<v-row justify="center">
		<v-col :sm="8" :md="6" :lg="4" class="ma-5" >
			<v-row class="justify-start">
				<v-label class="text-h5 mb-5" :text="`Delete User: [ ${usernameModel}]`" />
				<p align="left" class="mb-5">
					You are about to <strong> DELETE</strong> your account. 
					This deletion is <strong>PERMANENT</strong>. 
					The deletion can not be <strong>UNDONE</strong>. 
					Your account and all associated data will be <strong>LOST</strong>.
				</p>
			</v-row>
			<v-row class="justify-end">
				<v-btn class="mx-1" color="surface" @click="emit('onCancelDeleteUser', false )"> Cancel </v-btn>
				<v-btn color="error" @click="deleteUser"> Continue Delete </v-btn>
			</v-row>
		</v-col>
	</v-row>
</template>

<script lang="ts">
	export default {inheritAttrs: false}
</script>

<script setup lang="ts">
import { err, info, info1, info2 , info3, info4, info5, info6, info7 } from "../my-util-code/MyConsoleUtil"
import { enter, enter0, enter1, enter2, enter3, enter4, enter5, enter6, enter7 } from "../my-util-code/MyConsoleUtil"
import { bar, whitebar, greybar} from "../my-util-code/MyConsoleUtil"
/* ----------------------------------------------------------------------------- */
import { ref, } from 'vue'
import { Auth } from 'aws-amplify';

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const emit = defineEmits()

const props = defineProps({usernameModel: { type: String }})
const usernameModel = ref("")
usernameModel.value = props.usernameModel

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const deleteUser = async () => {
	if(BLOCKAPI("deleteUser function ")){
		emit('onCancelDeleteUser', false)
		return
	}

  try {
    const result = await Auth.deleteUser();
    console.log(result);
  } catch (error) {
    console.log('Error deleting user', error);
  }
	emit('onCancelDeleteUser', false)
}



/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/**/					const BLOCKAPIFLAG = ref(true)										 /**/
/* 				if(BLOCKAPI("submitEmail function "))return								*/
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const BLOCKAPI = (message:string|null|undefined = null) => {
	if(BLOCKAPIFLAG.value) 
		message ? info7(`${message} -- BLOCKED`) : info7("-- BLOCKED -- ")
	return BLOCKAPIFLAG.value
}
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
</script>