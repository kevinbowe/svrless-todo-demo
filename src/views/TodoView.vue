<script lang="ts">
	const BLOCKAPIFLAG = ref(false)
</script>

<template><v-app><MasterLayout>
		<v-container __MAIN_CONTAINER__ style="max-width: 500px;" class="mt-n7">
			<v-row __TOP_ROW_CONTAINER__ class="mb-3" no-gutters>
				<v-col cols="4">
					<h1 style="color:rgb(var(--v-theme-border))">Ohggi</h1>
				</v-col>

				<v-col>
					<v-row v-if="!showForm" no-gutters>
						<v-col _cols="4">
							<v-btn text="New" 
							variant="tonal" size="x-large" block class="bg-green-lighten-3"  
							type="submit" @click="newTodo()"/>
						</v-col>
					</v-row>
					<v-row v-else no-gutters>
						<v-btn text="Close" 
						variant="tonal" size="x-large" block class="bg-deep-purple-lighten-2" 
						type="submit" @click="showZoom = false; showForm = false" 
						/>
					</v-row>
				</v-col>
			</v-row>

			<v-row v-if="!showForm" no-gutters >
				<v-col _cols="4" class="mx-2">
					<v-btn :text="showZoom ? 'Clost Top' : 'Show Top'"
					variant="tonal" size="x-large" block class="bg-pink-lighten-3" 
					type="submit" @click="getTopTodo()" />
				</v-col>
				<v-col _cols="4">
					<v-btn :text="showAllTodos ? 'Close All' : 'Show All' " 
					variant="tonal" size="x-large" block class="bg-blue-lighten-3" 
					type="submit" @click="getAllTodos()" />
				</v-col>
			</v-row>

			<v-container __ZOOM_CONTAINER__ v-if="showZoom" class="pa-4" no-gutters>
				<v-sheet elevation="20" rounded="lg" border="lg" color="background" class="pa-2">
					<v-row no-gutters style="color:rgb(var(--v-theme-secondary));">

						<v-col cols="3" class="d-flex justify-start text-h5 "> Status:	</v-col>
						<v-col class="d-flex justify-start text-h5 " style="color:rgb(var(--v-theme-border))"> 
							{{ statusModel }}
						</v-col>
						
						<v-col cols="2" class="d-flex justify-end text-h5"> Priority:</v-col>
						<v-col class="d-flex justify-center text-h5" style="color:rgb(var(--v-theme-border))"> 
							{{ priorityModel }}
						</v-col>
						
					</v-row>
					<div class="divide-todo my-4"></div>
					<v-row style="color:rgb(var(--v-theme-secondary));"> 

						<v-col cols="4" class="text-h5 d-flex justify-left"> Fini Ohggi: </v-col>
						<v-col class="text-h6 todo-text" style="color:rgb(var(--v-theme-border))"> 
							{{ todoModel }}
						</v-col>
						
					</v-row>
				</v-sheet>
			</v-container>

			<v-form __FORM_CONTIANER__ ref="todoFormRef" v-if="showForm" validate-on="submit" @submit.prevent>
				<v-row>
					<v-col>
						<v-text-field label="Priority:" hint="Value from 0 to 10"
						ref="priorityModelFieldRef"
						variant="outlined" density="compact" hide-spin-buttons=true clearable 
						bg-color="background" class="mb-3 inputPriority"
						v-model="priorityModel" type="number" min="0" max="10" 
						@click:clear= "clearPriorityModelValidationError"
						required 
						:rules="[
							value => !value ? 'Priority Required [ 0 to 10 ]' : true,
							value => !!value,
							value => value < 0  || value > 10 ? 'Priority range: 0 to 10 -- Required' : true ,
						]"/>
					</v-col>
					<v-col>
						<v-select label="Status:" ref="statusModelFieldRef" 
						variant="outlined" density="compact" clearable 
						bg-color="background" class="mb-3"
						v-model="statusModel" :items="['wip', 'hold', 'ready', 'done']"
						@click:clear= "clearStatusModelValidationError"
						required 
						:rules="[
							value => !value ? 'Status Required' : true,
							value => !!value,
						]"/>
					</v-col>
				</v-row>
				<v-textarea label="Todo:" ref="todoModelFieldRef" 
				variant="outlined" density="compact" auto-grow rows="2" clearable bg-color="background" class="mb-3"
				v-model="todoModel" 
				@click:clear= "clearTodoModelValidationError"
				required 
				:rules="[
					value => !value ? 'Todo is Required' : true,
					value => !!value,
					value => value.length <= 2 ? `Todo is too short - 2 char min > Length = [ ${value.length} ]` : true
				]" />
				<v-row>
					<v-col><v-btn @click="addTodo" type="submit" class="mb-2 bg-green-lighten-3" variant="tonal" text="Add" size="x-large" block /></v-col>
					<v-col><v-btn @click="updateTodo" type="submit" class="mb-2 bg-deep-purple-lighten-2" variant="tonal" text="Update"  size="x-large" block /></v-col>
					<v-col><v-btn @click="idModel = null" type="reset" class="mb-2 bg-pink-lighten-3" variant="tonal" text="Clear" size="x-large" block /></v-col>
				</v-row>
			</v-form>

			<v-container __TODOS_LIST_CONTAINER__ v-if="showAllTodos" class="pa-2 divide-todo"
			no-gutters v-for="todo in todos" :key="todo.id">
				<v-row no-gutters style="color:rgb(var(--v-theme-secondary));">

					<v-col cols="2" class="d-flex justify-start mr-1"> Status: </v-col>
					<v-col class="d-flex justify-start" style="color:rgb(var(--v-theme-border))"> 
						{{ todo.status }} 
					</v-col>
					
					<v-col cols="2" class="d-flex justify-start ml-n1"> Priority: </v-col>

					<v-col class="d-flex justify-start ml-2" style="color:rgb(var(--v-theme-border))"> 
						{{ todo.priority }} 
					</v-col>
					
					<v-spacer></v-spacer>
					<v-col v-if="todo.username === ''" cols="2" class="my-4"></v-col>
					<v-col v-else cols="2" class="d-flex justify-end">
						<v-btn icon="mdi-arrow-expand-all"
						color="secondary" variant="plain" class="mt-n3" 
						@click="loadTodoForm(todo); showZoom = true"/>

						<v-btn text="Edit" 
						variant="tonal" size="x-small" class="mr-2 bg-deep-purple-lighten-2" 
						@click="loadTodoForm(todo); showForm = true"/>

						<v-btn text="Delete" 
						variant="tonal" size="x-small" class="bg-grey-darken-4" 
						@click="removeTodo(todo.id, todo.username)"/>
					</v-col>
				</v-row>

				<v-divider> </v-divider>
				<v-row style="color:rgb(var(--v-theme-secondary));">
					<v-col cols="2" class="text-left mr-1" > Ohggi: </v-col>
					<v-col class="todo-text" style="margin-left:-7px;color:rgb(var(--v-theme-border))">
						 {{ todo.todo }}
					</v-col>

				</v-row>
			</v-container>
		</v-container>

		<v-container __PROFILE_DEBUG_CONTAINER__ class="text-center">
			<!-- <hr class="mb-2">
			<v-row >
				<v-spacer/>
				<v-col cols="8">
					<v-row no-gutters class="text-h6 mt-1" style="color:rgb(var(--v-theme-border))">
						{{ isSignedIn }} </v-row>

					<v-row no-gutters class="text-h9 mt-1" style="color:rgb(var(--v-theme-secondary))">
						Nick Name:</v-row>
					<v-row no-gutters class="px-10 text-h9" style="color:rgb(var(--v-theme-border))">{{ nicknameModel }}</v-row>

					<v-row no-gutters class="text-h9  mt-1" style="color:rgb(var(--v-theme-secondary))">
						Email:</v-row>
					<v-row no-gutters class="px-10 text-h9" style="color:rgb(var(--v-theme-border))" >{{ emailModel }}</v-row>

					<v-row no-gutters class="text-h9  mt-1" style="color:rgb(var(--v-theme-secondary))">
						Phone Number:</v-row>
					<v-row no-gutters class="px-10 text-h9" style="color:rgb(var(--v-theme-border))">{{ phone_numberModel }}</v-row>
					
					<v-row no-gutters class="text-h9 mt-1"  style="color:rgb(var(--v-theme-secondary))">
						Preferred User Name:</v-row>					
					<v-row no-gutters class="px-10 text-h9" style="color:rgb(var(--v-theme-border))" >{{ preferred_usernameModel ? preferred_usernameModel : "{ empty }" }} </v-row>

					<v-row no-gutters class="text-h9 mt-1"  style="color:rgb(var(--v-theme-secondary))">
						(System) User Name:</v-row>					
					<v-row no-gutters class="px-10 text-h9" style="color:rgb(var(--v-theme-border))" >{{ system_usernameModel }}</v-row>

				</v-col>
				<v-spacer/>
			</v-row> -->
		</v-container>
		
		<v-dialog __POPUP_MESSAGE_DIALOG__ v-if="openDialogFlag" v-model="openDialogFlag" persistent >
			<v-card color="background_alt" border="lg" height="8em" width="15em" elevation="24"  class="ma-auto" >
				<v-card-text class="text-center"> <h2>Please Sign In</h2> </v-card-text>
				<v-card-actions>
					<v-row no-gutters>
						<v-spacer/>
						<v-col class="pr-1">
							<v-btn text="Cancel" 
							style="background-color:rgb(var(--v-theme-background_alt))"
							@click="openDialogFlag = false" />
						</v-col>
						<v-col>
							<v-btn text="Sign In" 
							to="/user" color="surface" 
							style="background-color:rgb(var(--v-theme-primary))"
							@click="openDialogFlag = false" />
						</v-col>
						<v-spacer/>
					</v-row>
				</v-card-actions>
 			</v-card>
		</v-dialog>
</MasterLayout></v-app></template>

<script lang="ts" setup>
/////////////////////////////////////////////////////////////////////////////
import MasterLayout from "../layouts/MasterLayout.vue"
import { Auth } from 'aws-amplify'
import { ref } from 'vue'
import { useUserPiniaStore } from "../stores/user"
import { useTheme } from "vuetify"
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
/////////////////////////////////////////////////////////////////////////////
const piniaStore = useUserPiniaStore()
const theme = useTheme()
const nicknameModel = ref()
const phone_numberModel = ref()
const emailModel = ref()
const system_usernameModel = ref()
const preferred_usernameModel = ref()
const idModel = ref()
/////////////////////////////////////////////////////////////////////////////
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
const todos = ref()
const todoFormRef = ref()
const openDialogFlag = ref(false)
const showForm = ref(false)
const showZoom = ref(false)
const showAllTodos = ref(false)
const isSignedIn = ref()
enum statusEnum { wip = 1, hold = 2, ready = 3, done = 4 } // The key is ALWAYS a string
/////////////////////////////////////////////////////////////////////////////
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
const newTodo = () => {
	//				Make sure Cx is signed in.
	if(!piniaStore.connected) return openDialogFlag.value = true
	//			Clear the models
	statusModel.value = null
	priorityModel.value = null
	todoModel.value = null
	//			Display form
	showForm.value = !showForm.value
}
/////////////////////////////////////////////////////////////////////////////
const getAllTodos = () => {
	//				Make sure Cx is signed in.
	if(!piniaStore.connected) {
		openDialogFlag.value = true
		return
	}
	showAllTodos.value = !showAllTodos.value
}
/////////////////////////////////////////////////////////////////////////////
const getTopTodo = () => {
	//				Make sure Cx is signed in.
	if(!piniaStore.connected) {
		openDialogFlag.value = true
		return
	}
	showZoom.value = !showZoom.value

	//				This is a precaution. -- The data should already be properly sorted.
	sortTodos()
	//				Hydrate the models.
	statusModel.value = todos.value[0].status
	priorityModel.value = todos.value[0].priority
	todoModel.value = todos.value[0].todo
}
/////////////////////////////////////////////////////////////////////////////
const sortTodos = () => {
	todos.value.sort(function(left, right) {
		let leftStatus = statusEnum[left.status]
		let leftPriority = Number(left.priority)

		let rightStatus = statusEnum[right.status]
		let rightPriority = Number(right.priority)

		if(leftStatus === rightStatus){
			//			If we get here, the Statuses are equal.

			//			Check the Priorities.
			if( leftPriority > rightPriority ) return 1
			if( leftPriority < rightPriority ) return -1
			//			If we get here the Prorities are equal
			return
		}
		//				This handles the case where the Statuses are not equal
		if( leftStatus > rightStatus ) return 1

		if( leftStatus < rightStatus ) return -1
	})
}
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
		body: `{"username": "${system_usernameModel.value}"}`
	})
	.then(response => { return response.json() })
	.catch(err => { console.log(`error -> ${err.message}`) })

	//	If we get here, the 'await fetch' has compled.

	if(todos.value.length === 0){
		//			If we get here, there are no todos associated with this account.
		//			Generate 1x placeholder 
		todos.value = [{"username": "", "id": "123XYZ","priority" : "Inspired", "status" : "", "todo": "Coliere Ohggi... Seize Today!"}]
		showAllTodos.value = true
		showZoom.value = false
		return
	}
	//			Sort the results by Status (enum) and then priority (asc)
	sortTodos()
	showAllTodos.value = true
}
/////////////////////////////////////////////////////////////////////////////
const updateTodo = async () => {

	const isValid = await todoFormRef.value.validate()
	.then(response => {return response.valid})

	if (!isValid) {
		console.log(`Validation - updateTodo(~) -- Failed`)
		return
	}

	if(BLOCKAPI("updateTodo(~) function ")) return

	const newTodo = {
		id: idModel.value,
		username: system_usernameModel.value,
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

	//			Add the Update Todo
	todos.value.push(newTodo)

	//			Sort the results by Status (enum) and then priority (asc)
	sortTodos()
}
/////////////////////////////////////////////////////////////////////////////
const addTodo = async () => {

	const isValid = await todoFormRef.value.validate()
	.then(response => {return response.valid})

	if (!isValid) {
		return
	}

	if(BLOCKAPI("addTodo(~) function ")) return

	const newTodo = {
		id: new Date().toISOString(),
		username: system_usernameModel.value,
		todo: todoModel.value,
		priority: priorityModel.value,
		status: statusModel.value
	}

	await fetch("https://ce117ewaci.execute-api.us-east-1.amazonaws.com/AddTodo", {
		method: "put",
		headers: { "Content-Type": "application/json"},
		body: JSON.stringify(newTodo)
	})
	//				Discard the 'blank todo if it exists'
	todos.value = todos.value.filter(e  => {return e.username != ""})
	//				Push the new Todo to the list of todos	
	todos.value.push(newTodo)
	// 			Sort the results by Status (enum) and then priority (asc)
	sortTodos()
}
/////////////////////////////////////////////////////////////////////////////
const removeTodo = async (todoId, todoUsername) => {
	await fetch("https://ce117ewaci.execute-api.us-east-1.amazonaws.com/DeleteTodo", {
		method: "delete",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ id: todoId, username: todoUsername})
	})
	todos.value = todos.value.filter(t => t.id !== todoId)

	if(todos.value.length === 0) getUser(todoUsername)
}
/////////////////////////////////////////////////////////////////////////////
const loadTodoForm = async (todo) => {
		priorityModel.value = todo.priority
		statusModel.value = todo.status
		todoModel.value = todo.todo
		idModel.value = todo.id
}
/////////////////////////////////////////////////////////////////////////////
const BLOCKAPI = (message:string|null|undefined = null) => {

	/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
	/* 				if(BLOCKAPI("submitEmail function "))return							*/
	/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

	if(BLOCKAPIFLAG.value)
		message ? console.log(`${message} -- BLOCKED`) : console.log("-- BLOCKED -- ")
	return BLOCKAPIFLAG.value
}
/* *******  For Debug  *****************************************************
// onMounted(async () => {
// 	todos.value = await fetch("https://ce117ewaci.execute-api.us-east-1.amazonaws.com/ListAll")
// 	.then(response => { return response.json() })
// })
*/

/////////////////////////////////////////////////////////////////////////////
async function getSession(){
		//			Check to see if there is an active session.
		await Auth.currentAuthenticatedUser({bypassCache: true /* false */})
		.then((user) => {
			isSignedIn.value = "Signed In"
			emailModel.value = user.attributes?.email
			nicknameModel.value = user.attributes?.nickname
			phone_numberModel.value =  user.attributes?.phone_number
			system_usernameModel.value = user.username
			preferred_usernameModel.value = user.attributes?.preferred_username
			piniaStore.connected = true
			//		Load the users Todo's
			getUser(system_usernameModel.value)
	})
	.catch((error) => {
		isSignedIn.value = "Not Signed In"
		piniaStore.connected = false

		//			Show the blank Todo
		todos.value = [{"username": "", "id": "123XYZ","priority" : "Inspiration", "status" : "", "todo": "Coliere Ohggi... Seize Today!"}]
		showAllTodos.value = true
		showZoom.value = false
		return

	} )
}
////////////////////////////////////////////////////////////////////////////
getSession()

theme.global.name.value = piniaStore.Active_Theme

</script>

<style>
	.v-counter { display: none; }
	.divide-todo {
		color:rgb(var(--v-theme-border));
		border-bottom:.2em solid;
		/* border-bottom-color: #212121; */ /* grey-darken-4 */
		/* border-bottom-color: lightgrey; */
		/* border-bottom-color: deep-purple-lighten-2; */
	}
	.todo-text {
		display:inline-block; 
		text-align:left; 
		line-height: 1.6; 
		white-space: pre-wrap; 
		color: initial;
	}
	/* --------------------------------------------------------------------------
	This block hides the numeric spinner in the  Priority <v-text-field> element */
	.inputPriority input[type='number'] { -moz-appearance:textfield; appearance: textfield; }
	.inputPriority input::-webkit-outer-spin-button,
	.inputPriority input::-webkit-inner-spin-button { -webkit-appearance: none; }
	/* -------------------------------------------------------------------------- */
</style>