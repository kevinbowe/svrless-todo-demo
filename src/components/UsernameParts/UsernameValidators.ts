
import { info, info1, info2 , info3, info4, info5, info6, info7 } from "../../my-util-code/MyConsoleUtil"
import { enter, enter0, enter1, enter2, enter3, enter4, enter5, enter6, enter7 } from "../../my-util-code/MyConsoleUtil"
import { bar, whitebar, greybar, redbar, greenbar, orangebar } from "../../my-util-code/MyConsoleUtil"


/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/* Username Validation */
/* ----------------------------------------------------------------------------- */
//				Put functions here
export async function checkWorkingUsernameTooShort (workingPreferred_usernameModel) {
	if (!workingPreferred_usernameModel) return "Required"

	if (workingPreferred_usernameModel.length > 0 && workingPreferred_usernameModel.length <= 2) 
		return 'User name is too short. Please try another one.'
	return true
}
/* ----------------------------------------------------------------------------- */
export async function checkWorkingUsernameFirstChar (workingPreferred_usernameModel) {
		if (!isNaN(workingPreferred_usernameModel[0]))
			return 'User name can not begin with a Number. Please try another one.'
		return true
}
/* ----------------------------------------------------------------------------- */
export async function checkWorkingUsernameSpecialCharExceptions (workingPreferred_usernameModel) {
		//				REF -- ALL Special Chars: /[-_.*\[\]@!#$%^\'"*,:;|/ {}<>()\\]/
		//				Special Char with exceptions: <hyphen> <under_bar> and <period>
		// let regexSpecialChar = /[*\[\]@!#$%^\'"*,:;|{}<>()\\\/]/
		//				Add <space>
		let regexSpecialChar = /[\s*\[\]@!#$%^\'"*,:;|{}<>()\\\/]/
		const match = workingPreferred_usernameModel.match(regexSpecialChar)
		// 				Check the format
		if(match) return 'Only period, hyphen and underbar are allowed special characters. Try again.'
		return true
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
