<script lang="ts">
	const BLOCKAPIFLAG = ref(false)
</script>

<template >
	<MasterLayout>
		<div style="max-width: 500px;margin: 0 auto;">

			<h1 style="color:rgb(var(--v-theme-border))">Todo App -- 10/24/23 - 9:25 am</h1>
			<h5 style="color:rgb(var(--v-theme-border))">svrless-todo-vtfy-v3</h5>
			<v-row class="mb-5">
				<v-col><v-btn class="bg-deep-purple-lighten-2" variant="tonal" 
				@click="getUser(usernameModel)" type="submit" text="Fetch User" size="x-large" block /></v-col>
			</v-row>
			<v-form ref="todoFormRef" validate-on="submit" @submit.prevent>

				<v-text-field					label="Priority: [ 0-10 ]"
				bg-color="background"
				variant="outlined" density="compact" class="mb-3"
				v-model="priorityModel" type="number" min="0" max="10"
				ref="priorityModelFieldRef" clearable @click:clear= "clearPriorityModelValidationError"
				required :rules="[
					value => !value ? 'Priority Required' : true,
					value => !!value,
					value => value < 0  || value > 10 ? 'Priority range: 0 to 10 -- Required' : true ,
				]"/>

				<v-select 						label="Select Status: [ ready | wip | done | hold ]"
				bg-color="background"
				variant="outlined" density="compact" class="mb-3"
				v-model="statusModel" :items="['ready', 'wip', 'done', 'hold']"
				ref="statusModelFieldRef" clearable @click:clear= "clearStatusModelValidationError"
				required :rules="[
					value => !value ? 'Status Required' : true,
					value => !!value,
				]" />

				<v-text-field 					label="Create Todo"
				bg-color="background"
				variant="outlined" density="compact" class="mb-3"
				v-model="todoModel"
				ref="todoModelFieldRef" clearable @click:clear= "clearTodoModelValidationError"
				required :rules="[
					value => !value ? 'Todo is Required' : true,
					value => !!value,
					value => value.length <= 6 ? `Todo is too short - 6 char min > Length = [ ${value.length} ]` : true
				]" />

				<v-row>
					<v-col><v-btn @click="addTodo" type="submit" class="mb-2 bg-green-lighten-3" variant="tonal" text="Add" size="x-large" block /></v-col>
					<v-col><v-btn @click="updateTodo" type="submit" class="mb-2 bg-deep-purple-lighten-2" variant="tonal" text="Update"  size="x-large" block /></v-col>
					<v-col><v-btn @click="idModel = null" type="reset" class="mb-2 bg-pink-lighten-3" variant="tonal" text="Clear" size="x-large" block /></v-col>
				</v-row>
			</v-form>
			<v-container class="pa-2 divide-todo"
			no-gutters v-for="todo in todos" :key="todo.id">
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
						<v-btn text="Edit" cariant="tonal" size="x-small" class="mr-2" @click="loadTodoForm(todo)"/>
						<v-btn text="Delete" variant="tonal" size="x-small" @click="removeTodo(todo.id, todo.username)"/>
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
						<p class="ma-auto text-h4" style="color:rgb(var(--v-theme-border))">{{ isSignedIn }} </p> </v-row>

					<v-row no-gutters class="text-h5 mt-5" style="color:rgb(var(--v-theme-secondary))">
						Nick Name:</v-row>
					<v-row no-gutters class="px-10 text-h7" style="color:rgb(var(--v-theme-border))">{{ nicknameModel }}</v-row>

					<v-row no-gutters class="text-h5  mt-5" style="color:rgb(var(--v-theme-secondary))">
						Email:</v-row>
					<v-row no-gutters class="px-10 text-h7" style="color:rgb(var(--v-theme-border))" >{{ emailModel }}</v-row>

					<v-row no-gutters class="text-h5  mt-5" style="color:rgb(var(--v-theme-secondary))">
						Phone Number:</v-row>
					<v-row no-gutters class="px-10 text-h7" style="color:rgb(var(--v-theme-border))">{{ phone_numberModel }}</v-row>
					
					<v-row no-gutters class="text-h5 mt-5"  style="color:rgb(var(--v-theme-secondary))">
						Preferred User Name:</v-row>					
					<v-row no-gutters class="px-10 text-h7" style="color:rgb(var(--v-theme-border))" >{{ usernameModel }}</v-row>

					<v-row no-gutters class="text-h5 mt-5"  style="color:rgb(var(--v-theme-secondary))">
						System User Name:</v-row>					
					<v-row no-gutters class="px-10 text-h7" style="color:rgb(var(--v-theme-border))" >{{ systemUsernameModel }}</v-row>

				</v-col>
				<v-spacer/>
			</v-row>
		</v-container>
		<!-- PopUp Message Dialog -- Modal -->
		<v-dialog v-if="openDialogFlag" v-model="openDialogFlag" persistent >
			<v-card color="background_alt" border="lg" 
			class="ma-auto" height="8em" width="15em" elevation="24">
				<v-card-text class="text-center"> <h2>Please Sign In</h2> </v-card-text>
				<v-card-actions>
					<v-row no-gutters>
						<v-spacer/>
						<v-col class="pr-1">
							<v-btn text="Cancel" @click="openDialogFlag = false" 
							style="background-color:rgb(var(--v-theme-background_alt))"/>
						</v-col>
						<v-col>
							<v-btn text="Sign In" to="/user" @click="openDialogFlag = false" 
							color="surface" style="background-color:rgb(var(--v-theme-primary))"/>
						</v-col>
						<v-spacer/>
					</v-row>
				</v-card-actions>
 			</v-card>
		</v-dialog>
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
const systemUsernameModel = ref()
/* -------------------------------------------------------------------------- */
const todoFormRef = ref()
const openDialogFlag = ref(false)
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
	//				If no username is available, set flag to display sign in dialog.
	if(!username) { openDialogFlag.value = true; return }
	
	//	If we get here, start search for a specific username.

	//				Fetch the filtered todos
	todos.value = await fetch("https://ce117ewaci.execute-api.us-east-1.amazonaws.com/ListByUser", {
		method: "post",
		headers: { "Content-Type": "application/json"},
		body: `{"username": "${systemUsernameModel.value}"}`
	})
	.then(response => { return response.json() })
	.catch(err => { console.log(`error -> ${err.message}`) })

	//	If we get here, the 'await fetch' has compled.

	//	Sort the results (todos.value) by Username (desc) and priority (asc)
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
	
	todos.value = todos.value.filter(e  => { return e.id != newTodo.id })

	//				Add the Update Todo
	todos.value.push(newTodo)

	//				Sort the results by Username (desc) and priority (asc)
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
		username: systemUsernameModel.value,
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
	
	//	Sort the results by Username (desc) and priority (asc)
	todos.value.sort(function(a,b) {
		if(a.username === b.username) return (a.priority-b.priority)
		else if(a.username > b.username) return 1
		else if(a.username < b.username) return -1
	})
}

/////////////////////////////////////////////////////////////////////////////
const removeTodo = async (todoId, todoUsername) => {
	await fetch("https://ce117ewaci.execute-api.us-east-1.amazonaws.com/DeleteTodo", {
		method: "delete",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ id: todoId, username: todoUsername})
	})
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
			systemUsernameModel.value = user.username
			if (user.attributes?.preferred_username) 
			usernameModel.value = user.attributes?.preferred_username
			piniaStore.connected = true

			//			Load the users Todo's
			getUser(systemUsernameModel.value)
	})
	.catch((error) => {
		isSignedIn.value = "Not Signed In"
		piniaStore.connected = false
	} )
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
getSession()
/* ----------------------------------------------------------------------------- */

theme.global.name.value = piniaStore.Active_Theme
</script>

<style>
	.v-counter { display:none; }
	.divide-todo {
		color:rgb(var(--v-theme-border));
		border-bottom:.2em solid;
		/* border-bottom-color: #212121; */ /* grey-darken-4 */
		/* border-bottom-color: lightgrey; */
		/* border-bottom-color: deep-purple-lighten-2; */
	}
</style>