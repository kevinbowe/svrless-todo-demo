<script lang="ts">
	const BLOCKAPIFLAG = ref(false)
</script>

<template >
	<MasterLayout>
		<div style="max-width: 500px;margin: 0 auto;">
			<h1>Todo App -- 10/24/2023 - 9:25 am</h1>
			<h5>svrless-todo-vtfy-v3</h5>
			<v-row class="mb-5">
				<v-col><v-btn @click="getUser(usernameModel)" type="submit" color="black" text="Fetch User" variant="tonal" size="x-large" block /></v-col>
			</v-row>
			<v-form ref="todoFormRef" validate-on="submit" @submit.prevent>

				<v-combobox label="Select User: [ boh | bowe | dabowe | kevin ]"
				variant="outlined" density="compact" class="mb-3"
				v-model="usernameModel" :items="['boh', 'bowe', 'dabowe', 'kevin']"
				ref="usernameModelFieldRef" clearable @click:clear= "clearUsernameModelValidationError"
				required :rules="[
					value => !!value,
					value => value.length <= 2 ? `Username is too short - 3 char min > Length = [ ${value.length} ]` : true
				]"/>

				<v-text-field label="Priority: [ 0-10 ]"
				variant="outlined" density="compact" class="mb-3"
				v-model="priorityModel" type="number" min="0" max="10"
				ref="priorityFieldRef" clearable @click:clear= "clearPriorityModelValidationError"
				required :rules="[
					value => !!value
				]"/>

				<v-select label="Select Status: [ ready | wip | done | hold ]"
				variant="outlined" density="compact" class="mb-3"
				v-model="statusModel" :items="['ready', 'wip', 'done', 'hold']"
				ref="statusModelFieldRef" clearable @click:clear= "clearStatusModelValidationError"
				required :rules="[
					value => !!value
				]" />

				<v-text-field label="Create Todo"
				variant="outlined" density="compact" class="mb-3"
				v-model="todoModel"
				ref="todoModelFieldRef" clearable @click:clear= "clearTodoModelValidationError"
				required :rules="[
					value => !!value,
					value => value.length <= 5 ? `Todo is too short - 6 char min > Length = [ ${value.length} ]` : true
				]" />
				<v-row>
					<v-col><v-btn @click="addTodo" type="submit" color="green" class="mb-2" text="Add" variant="tonal" size="x-large" block /></v-col>
					<v-col><v-btn @click="updateTodo" type="submit" color="primary" class="mb-2" text="Update" variant="tonal" size="x-large" block /></v-col>
					<v-col><v-btn @click="idModel = null" type="reset" color="pink" class="mb-2" text="Clear" variant="tonal" size="x-large" block /></v-col>
				</v-row>
			</v-form>
			<v-container class="pa-2" style="border-bottom:.5em solid #ffffff;background-color: #eee;" no-gutters v-for="todo in todos" :key="todo.id">
				<v-row no-gutters>
					<v-col class="d-flex justify-start"> Status: {{ todo.status }}</v-col>
					<v-divider vertical :thickness="5"></v-divider>
					<v-col class="d-flex justify-start px-2"> Priority: {{ todo.priority }}</v-col>
					<v-divider vertical :thickness="5"></v-divider>
					<v-col cols="6" class="d-flex justify-start px-2"> User Name: {{ todo.username }}</v-col>
				</v-row>
				<v-divider></v-divider>
				<v-row >
					<v-col> Todo: {{ todo.todo }} </v-col>
					<v-col cols="2" class="d-flex justify-end">
						<v-btn text="Edit" color="primary" variant="tonal" size="x-small" class="mr-2" @click="loadTodoForm(todo)"/>
						<!-- This may be causing a Production build problem -->
						<v-btn text="Delete" color="error" variant="tonal" size="x-small" @click="removeTodo(todo.id, todo.username)"/>
					</v-col>
				</v-row>
			</v-container>
		</div>
		<v-container class="text-center">
			<hr class="mb-10">
			<v-row >
				<v-spacer/>
				<v-col cols="8">

					<v-row no-gutters style="color:rgb(var(--v-theme-secondary))">
						<p class="ma-auto text-h4">{{ isSignedIn }} </p> </v-row>

					<v-row no-gutters class="text-h5 mt-5" style="color:rgb(var(--v-theme-secondary))">
						Nick Name:</v-row>
					<v-row no-gutters class="px-10 text-h7">{{ nicknameModel }}</v-row>

					<v-row no-gutters class="text-h5  mt-5" style="color:rgb(var(--v-theme-secondary))">
						Email:</v-row>
					<v-row no-gutters class="px-10 text-h7">{{ emailModel }}</v-row>

					<v-row no-gutters class="text-h5  mt-5"  style="color:rgb(var(--v-theme-secondary))">
						Phone Number:</v-row>
					<v-row no-gutters class="px-10 text-h7">{{ phone_numberModel }}</v-row>
					
					<v-row no-gutters class="text-h5 mt-5"  style="color:rgb(var(--v-theme-secondary))">
						User Name:</v-row>					
					<v-row no-gutters class="px-10 text-h7">{{ usernameModel }}</v-row>

				</v-col>
				<v-spacer/>
			</v-row>

		</v-container>
	</MasterLayout>
</template>

<script lang="ts" setup>
import MasterLayout from "../layouts/MasterLayout.vue";
import { Auth } from 'aws-amplify';
import { ref } from 'vue'
import { useUserPiniaStore } from "../stores/user"
import { useTheme } from "vuetify";
/* ----------------------------------------------------------------------------- */
import { bluebar, info, info1, info2 , info3, info4, info5, info6, info7, infor, pass, fail }
	from "../my-util-code/MyConsoleUtil" // Cant find this in Prod Build

import { enter, enter0, enter1, enter2, enter3, enter4, enter5, enter6, enter7 }
	from "../my-util-code/MyConsoleUtil" // Cant find this in Prod Build

import { bar, whitebar, greybar, redbar, greenbar, orangebar }
	from "../my-util-code/MyConsoleUtil" // Cant find this in Prod Build

import { log, warn, err2, err, progress, joy, infob, infog, infoy, infoo, infop,
		infom, exit, success, start, fini, pause, resume,
		exe, exe1, exe2, exe3, exe4, exe5, exe6, exe7, }
	from "../my-util-code/MyConsoleUtil" // Cant find this in Prod Build
/* -------------------------------------------------------------------------- */

	/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const piniaStore = useUserPiniaStore(); //initialize the piniaStore
const theme = useTheme();
const nicknameModel = ref()
const phone_numberModel = ref()
const emailModel = ref()
const isSignedIn = ref()
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/////////////////////////////////////////////////////////////////////////////
const todos = ref()
/* -------------------------------------------------------------------------- */
const idModel = ref()
/* -------------------------------------------------------------------------- */
const todoModel = ref()
const todoModelFieldRef = ref()
const clearTodoModelValidationError = () => todoModelFieldRef.value.resetValidation()
/* -------------------------------------------------------------------------- */
const statusModel = ref()
const statusModelFieldRef = ref()
const clearStatusModelValidationError = () => statusModelFieldRef.value.resetValidation()
/* -------------------------------------------------------------------------- */
const priorityModel = ref()
const priorityModelFieldRef = ref()
const clearPriorityModelValidationError = () => priorityModelFieldRef.value.resetValidation()
/* -------------------------------------------------------------------------- */
const usernameModel = ref()
const usernameModelFieldRef = ref()
const clearUsernameModelValidationError = () => usernameModelFieldRef.value.resetValidation()
/* -------------------------------------------------------------------------- */
const todoFormRef = ref()

/* -------------------------------------------------------------------------- */
// log(`test-log`); warn(`test-warn`); err2(`test-err2`);
// pass(`test-pass`); fail(`test-fail`);
// err(`test-err`); success(`test-sucess`); progress(`test-progress`); joy(`test-joy`);
// infor(`test-infor`); infob (`test-infob`); infog(`test-infog`); infoy(`test-infoy`); infoo(`test-infoo`); infop(`test-infip`); infom (`test-infom`);
// info(`test-info`); info1(`test-info1`); info2 (`test-info2`); info3 (`test-info3`); info4(`test-info4`); info5(`test-info5`); info6 (`test-info6`); info7(`test-info7`);
// enter(`test-enter`); enter0 (`test-enter0`); enter1(`test-enter1`); enter2 (`test-enter2`); enter3(`test-enter3`); enter4 (`test-enter4`); enter5(`test-enter5`); enter6(`test-enter6`); enter7(`test-enter7`);
// start (`test-start`); fini(`test-fini`); exit(`test-exit`); pause(`test-pause`); resume(`test-resume`);
// bar(`test-bar`); greybar(`test-greybar`); whitebar (`test-whitebar`); bluebar(`test-bluebar`); redbar(`test-redbar`); greenbar (`test-greenbar`); orangebar(`test-orangebar`);
// exe(`test-exe`); exe1(`test-exe1`); exe2(`test-exe2`); exe3(`test-exe3`); exe4(`test-exe4`); exe5(`test-exe5`); exe6(`test-exe6`); exe7(`test-exe7`);

/////////////////////////////////////////////////////////////////////////////
const getUser = async (username) => {
	//				Clear the list of todos.
	todos.value = null
	if(!username) {
		todos.value = await fetch("https://ce117ewaci.execute-api.us-east-1.amazonaws.com/ListAll")
		.then(response => { return response.json() })

		//	Sort the results by Username (desc) and priority (asc)
		todos.value.sort(function(a,b) {
			if(a.username === b.username) return (a.priority-b.priority)
					else if(a.username > b.username) return 1
					else if(a.username < b.username) return -1
		})
		return
	}
	//------------------------------------------------------
	//	If we get here, start search for a specific username.

	//				Fetch the filtered todos
	todos.value = await fetch("https://ce117ewaci.execute-api.us-east-1.amazonaws.com/ListByUser", {
		method: "post",
		headers: { "Content-Type": "application/json"},
		body: `{"username": "${username}"}`
	})
	.then(response => {
		//				Return the results for display in Ui
		return response.json()
	})
	.catch(err => {
		console.log(`error -> ${err.message}`)
	})

	//	Sort the results by Username (desc) and priority (asc)
	todos.value.sort(function(a,b) {
		if(a.username === b.username) return (a.priority-b.priority)
		else if(a.username > b.username) return 1
		else if(a.username < b.username) return -1
	})
}

/////////////////////////////////////////////////////////////////////////////
const updateTodo = async () => {

	const isValid = await todoFormRef.value.validate()
	.then(response => {return response.valid})

	if (!isValid) {
		console.log(`Validation - updateTodo(~) -- Failed`);
		return
	}

	if(BLOCKAPI("updateTodo(~) function ")) return

	const newTodo = {
		id: idModel.value,
		username: usernameModel.value,
		todo: todoModel.value,
		priority: priorityModel.value,
		status: statusModel.value
	}

	await fetch("https://ce117ewaci.execute-api.us-east-1.amazonaws.com/UpdateTodo", {
		method: "post",
		headers: { "Content-Type": "application/json"},
		body: JSON.stringify(newTodo)
	})
	//	//	This may be causing Pruduction Build errors
	todos.value = todos.value.filter(e  => { return e.id != newTodo.id })
	// todos.value = todos.value.filter(e  => { return e.id != newTodo.id })
	// todos.value = todos.value.filter((e: { id: any; }) => { return e.id != newTodo.id })

	//	Add the Update Todo
	todos.value.push(newTodo)
	// todoModel.value = ""

	//	Sort the results by Username (desc) and priority (asc)
	todos.value.sort(function(a,b) {
		if(a.username === b.username) return (a.priority-b.priority)
		else if(a.username > b.username) return 1
		else if(a.username < b.username) return -1
	})
}

/////////////////////////////////////////////////////////////////////////////
const addTodo = async () => {

	const isValid = await todoFormRef.value.validate()
	.then(response => {return response.valid})

	if (!isValid) {
		console.log(`Validation - addTodo(~) -- Failed`);
		return
	}

	if(BLOCKAPI("addTodo(~) function ")) return

	const newTodo = {
		id: new Date().toISOString(),
		username: usernameModel.value,
		todo: todoModel.value,
		priority: priorityModel.value,
		status: statusModel.value
	}

	await fetch("https://ce117ewaci.execute-api.us-east-1.amazonaws.com/AddTodo", {
		method: "put",
		headers: { "Content-Type": "application/json"},
		body: JSON.stringify(newTodo)
	})
	todos.value.push(newTodo)
	// todoModel.value = ""
	
	//	Sort the results by Username (desc) and priority (asc)
	todos.value.sort(function(a,b) {
		if(a.username === b.username) return (a.priority-b.priority)
		else if(a.username > b.username) return 1
		else if(a.username < b.username) return -1
	})
}

/////////////////////////////////////////////////////////////////////////////
//	// This function may be causing Production Build errors
const removeTodo = async (todoId, todoUsername) => {
	await fetch("https://ce117ewaci.execute-api.us-east-1.amazonaws.com/DeleteTodo", {
		method: "delete",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ id: todoId, username: todoUsername})
	})
		//	This may be causing Pruduction Build errors
	todos.value = todos.value.filter(t => t.id !== todoId)
}

/////////////////////////////////////////////////////////////////////////////
const loadTodoForm = async (todo) => {
		usernameModel.value = todo.username
		priorityModel.value = todo.priority
		statusModel.value = todo.status
		todoModel.value = todo.todo
		idModel.value = todo.id
}

/////////////////////////////////////////////////////////////////////////////
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/* 				if(BLOCKAPI("submitEmail function "))return							*/
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
	// This seems to be causing a Production Build Issue
	// Resolve this later
// const BLOCKAPI = (message = null) => {
const BLOCKAPI = (message:string|null|undefined = null) => {
	if(BLOCKAPIFLAG.value)
		message ? console.log(`${message} -- BLOCKED`) : console.log("-- BLOCKED -- ")
	return BLOCKAPIFLAG.value
}

/////////////////////////////////////////////////////////////////////////////
////				Keep for debugging
// onMounted(async () => {
// 	todos.value = await fetch("https://ce117ewaci.execute-api.us-east-1.amazonaws.com/ListAll")
// 	.then(response => { return response.json() })
// });

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/* GetSession Decl */
async function getSession(){
		//				Check to see if there is an active session.
		await Auth.currentAuthenticatedUser({bypassCache: true /* false */})
		.then((user) => {
			isSignedIn.value = "Signed In"
			emailModel.value = user.attributes?.email
			phone_numberModel.value =  user.attributes?.phone_number
			nicknameModel.value = user.attributes?.nickname
			
			usernameModel.value = user.username
			if (user.attributes?.preferred_username) 
			usernameModel.value = user.attributes?.preferred_username
			piniaStore.connected = true
	})
	.catch((error) => {
		isSignedIn.value = "Not Signed In"
		piniaStore.connected = false
	} )
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
getSession()
/* ----------------------------------------------------------------------------- */

//				Do I need this ??? -- What is this here ???
//theme.global.name.value = piniaStore.A_Theme
theme.global.name.value = piniaStore.Active_Theme
</script>

<style>
	.v-counter { display:none; }
</style>