import { info, info1, info2 , info3, info4, info5, info6, info7 } from "../../my-util-code/MyConsoleUtil"
import { enter, enter0, enter1, enter2, enter3, enter4, enter5, enter6, enter7 } from "../../my-util-code/MyConsoleUtil"
import { bar, whitebar, greybar, redbar, greenbar, orangebar } from "../../my-util-code/MyConsoleUtil"
import { log, warn, err, err2, exit, success, pass, fail, fini, start, progress, joy, } from "../../my-util-code/MyConsoleUtil"
/*  */
import { ref } from 'vue'
import { Auth } from 'aws-amplify';

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
export const nicknameFormRef = ref()
export const workingNicknameModel = ref("")
export const nicknameModel = ref("")

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
export const clearNicknameModelValidationError = () => nicknameFormRef.value.resetValidation()

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
export async function submitNickname(event) {
	const results = await event
	if(!results.valid) return
		// 				This will return the user in the user pool (not updated )
		const newuser = await Auth.currentAuthenticatedUser({bypassCache: true });
		await Auth.updateUserAttributes(newuser, {'nickname': workingNicknameModel.value })
		await Auth.currentUserInfo().then(result => {
		nicknameModel.value = result.attributes.nickname
	}) // END_THEN
}	

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
export async function checkNicknameReserved (workingNickname) {
	if (workingNickname === 'kevin') return 'User nickname reserved. Please try another one.'
	return true
}
export async function checkNicknameTooShort (workingNickname) {
	if (workingNickname.length <= 2) return 'User nickname is too short. Please try another one.'
	return true
}
export async function checkNicknameNumericFirstChar (workingNickname) {
	if (!isNaN(workingNickname[0])) return 'User nickname can not begin with a Number. Please try another one.'
	return true
}
export async function checkNicknameFirstChar (workingNickname) {
	//				All special chars must be rejected.
	const match = workingNickname[0].match(/[-\._=+`!@#$%\^&*(){}[\]<>?/|]/)
	if (match) return 'User nickname can begin with any special characters. Please try another one.'
	return true
}
export async function checkNicknameLastChar (workingNickname) {
	//				All special chars must be rejected.
	const match = workingNickname[workingNickname.length-1].match(/[-\._=+`!@#$%\^&*(){}[\]<>?/|]/)
	if (match) {
		return 'User nickname can not end with any special characters. Please try another one.'
	}
	return true
}
export async function checkNicknameSpecialChars (workingNickname) {
	//				These chars are valid.
	//			>>>-->  -  .  _  =  +  ` <--<<<
	const match = workingNickname.match( /[!@#$%\^&*(){}[\]<>?/|]/)
	if(match) {
		return 'User nickname can not contain special characters. Please try another one.'
	}
	return true
}
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
