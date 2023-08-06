<template>
	<v-row justify="center">
		<v-dialog __Step_1__ 
		v-if="step == 1" activator="parent" v-model="showDialog" persistent >
			<v-card class="mx-auto" width="21em" color="background_alt" border="lg" elevation="24">
				<v-form validate-on="submit" @submit.prevent="submitSignal" >
					<v-card-title>
						<v-row>
							<v-col >
								<p class="text-h4">Reset Password</p>
							</v-col>
							<v-col cols="1" class="justify-end">
								<v-btn style="padding-bottom:3em;"
								icon="$close" size="large" variant="text" 
								@click="exit"/>
							</v-col>
						</v-row>
					</v-card-title>
					<v-card-text>
						<v-text-field __User_Name__
						v-model="usernameModel" ref="usernameFieldRef"
						clearable @click:clear="clearUsernameModelValidationError"
						:rules="[
							value => !!value,
							value => checkWorkingUsernameTooShort(value),
							value => checkWorkingUsernameFirstChar(value),
							value => checkWorkingUsernameSpecialCharExceptions(value)
						]" 
						density="compact" variant="outlined" label="Username" required />
					</v-card-text>
					<v-card-actions>

						<v-btn text="OK" type="submit" :disabled="!usernameModel" block color="surface" 
						style="background-color:rgb(var(--v-theme-primary))"/> 
					</v-card-actions>
				</v-form>
			</v-card>
		</v-dialog>

		<v-dialog __Step_2__ 
		v-if="step == 2" activator="parent" v-model="showDialog" persistent >
			<v-card class="mx-auto" width="21em" color="background_alt" border="lg" elevation="24">
				<v-form validate-on="submit" @submit.prevent="submitSignal">
					<v-card-title>
						<v-row>
							<v-col >
								<p class="text-h4">Reset Password</p>
							</v-col>
							<v-col cols="1" class="justify-end">
								<v-btn style="padding-bottom:3em;"
								icon="$close" size="large" variant="text" 
								@click="exit"/>
							</v-col>
						</v-row>
					</v-card-title>
					<v-card-text>
						<v-row __User_Code__ >
							<v-text-field label="Confirmation Code" v-model="confcodeModel"
							ref="confcodeFieldRef" 
							clearable @click:clear="clearConfcodeModelValidationError"
							:rules="[ 
								value => value.length <= 5 ? `Invalid Code > Length = [ ${value.length} ]` : true,
						 	]"
							placeholder="Enter your code" variant="outlined" density="compact"/>
						</v-row>
						<v-row __New_Password__>
							<v-text-field label="New Password" v-model="passwordModel" 
							:append-inner-icon="showIcon ? 'mdi-eye' : 'mdi-eye-off'" 
							prepend-inner-icon="mdi-lock-outline" :type="showIcon ? 'text' : 'password'"  
							@click:append-inner="showIcon = !showIcon"
							ref=passwordFieldRef							
							clearable @click:clear="clearPasswordModelValidationError"
							:rules="[ 
								// value => !!value || 'Required',
								value => !!value,
								value => checkPasswordTooShort(value),
								value => checkPasswordSpecialChars(value),
							]"
							variant="outlined" density="compact" />
						</v-row>
					</v-card-text>
					<v-card-actions>
						<v-btn text="OK" type="submit" :disabled="!confcodeModel || !passwordModel" 
						block color="surface" style="background-color:rgb(var(--v-theme-primary))"/> 
					</v-card-actions>
				</v-form>
			</v-card>
		</v-dialog>

		<v-overlay _Step_3__
		v-if="step == 3" v-model="showOverlay"
		class="align-center justify-center">
			<v-card width="21em" class="pa-2 text-center" color="background_alt" border="lg" elevation="24">
				<p class="text-h4"> Reset Success </p>
				<p> Your Password has been Updated. </p>
				<v-btn text="OK" class="mt-7" block color="primary" @click="nextStep"/> 
			</v-card>
		</v-overlay>
	</v-row>

	<!-- Update Failed -- Oops -->
	<v-overlay v-if="showOops" v-model="showOverlay" class="align-center justify-center">
		<v-card width="21em" class="pa-2 text-center" color="background_alt" border="lg" elevation="24">
			<p class="ma-2 text-h4"> Oops </p>
			<p> Your confirmation code was not accepted. Try again. </p>
			<v-btn text="OK" class="mt-7" block color="primary" @click="step = 2; showOops=false"/> 
		</v-card>
	</v-overlay>
</template>

<!-- %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% -->
<script lang="ts">
	export default {inheritAttrs: false}
</script>

<script setup lang="ts">

import { info, info1, info2 , info3, info4, info5, info6, info7 } from "../my-util-code/MyConsoleUtil"
import { enter, enter0,} from "../my-util-code/MyConsoleUtil"
import { bar, whitebar, greybar, } from "../my-util-code/MyConsoleUtil"
import { err } from "../my-util-code/MyConsoleUtil"

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
import { Auth } from 'aws-amplify';
import { ref } from 'vue'
/* ----------------------------------------------------------------------------- */

import  { checkWorkingUsernameTooShort, checkWorkingUsernameFirstChar, checkWorkingUsernameSpecialCharExceptions}
	from "../components/UsernameParts/UsernameValidators"

import { checkPasswordSpecialChars, checkPasswordTooShort } from "../components/PasswordParts/PasswordValidators"

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

const showIcon = ref(false)
const showDialog = ref(true)
const showOverlay = ref(true)
const step = ref(1) //	[ Done/Ready == 0 | Request == 1 | Confirm == 2 | Fini == 3 ]
const showOops = ref(false)

const emit = defineEmits()

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

const passwordModel = ref("")
const passwordFieldRef = ref("")
const clearPasswordModelValidationError = () => passwordFieldRef.value.resetValidation()

const usernameModel = ref("")
const usernameFieldRef = ref("")
const clearUsernameModelValidationError = () => usernameFieldRef.value.resetValidation()

const confcodeModel = ref("")
const confcodeFieldRef = ref("")
const clearConfcodeModelValidationError = () => confcodeFieldRef.value.resetValidation()

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
async function submitSignal (event) {
	if(BLOCKAPI("submitPassword function ")) return

	const results = await event
	if(!results.valid) return /* Cancel Submission if validation FAILED */

	nextStep()
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const nextStep = () => {
	switch (step.value) {
		
		case 1:					//info1(`passwordResetNextStep > Case 1 -- UID`)
			// 					Collect the UID and send to Cognito. -- This will generate a confirmation code.
			try { Auth.forgotPassword(usernameModel.value) } 
			catch(err) { console.log(err);}
			break;
		case 2:					//info2(`passwordResetNextStep > Case 2 -- Conf Code & PID`)
			try { Auth.forgotPasswordSubmit(	usernameModel.value, confcodeModel.value, passwordModel.value)
					.catch(error => {
						//			Display a 'Oops... Something went wrong dialog.'
						showOops.value = true
					})
			} catch(err) { console.log(err); }
			break;
		case 3:			//info3(`passwordResetNextStep > Case 3 -- Msg`)
			exit()
			break;
	}

	step.value = step.value <= 2 ? ++step.value : 0 
	showDialog.value = step.value == 0 ? false : true
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const exit = () => {
	emit( 'onExit', {state: false})
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/**/					const BLOCKAPIFLAG = ref(false)										 /**/
/* 				if(BLOCKAPI("submitEmail function "))return								*/
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const BLOCKAPI = (message:string|null|undefined = null) => {
	if(BLOCKAPIFLAG.value) 
		message ? info7(`${message} -- BLOCKED`) : info7("-- BLOCKED -- ")
	return BLOCKAPIFLAG.value
}

</script>