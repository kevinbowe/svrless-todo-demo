import { info, info1, info2 , info3, info4, info5, info6, info7 } 
from "../../my-util-code/MyConsoleUtil"

import { enter, enter0, enter1, enter2, enter3, enter4, enter5, enter6, enter7 } 
from "../../my-util-code/MyConsoleUtil"

import { bar, whitebar, greybar, redbar, greenbar, orangebar } 
from "../../my-util-code/MyConsoleUtil"


/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
export async function checkPasswordTooShort (password) {
	if (!password) return "Required"
	if (password.length <= 5) return 'User password is too short. Please try another one.'
	return true
}
/* ----------------------------------------------------------------------------- */
export async function checkPasswordSpecialChars (password) {
	//				These chars are valid.
	//			>>>-->	!  @  #  $  %  ^  &  * <--<<<

	//				Check ALL Special Chars -- REFERENCE -- 7/21/23
	// const rxAll = /[+\-_@\.`~!#$%^&'"*,:;/ {}[\]()<>]/gm

	//				Handle the null condition.
	//				This is not valid but the submit will not work with an empty/null field
	if (!password) return true

	const rxException = /[+\-_\.`~'",:;/ {}[\]()<>]/gm
	const match = password.match(rxException)
	if(match) return 'No Special characters. Exceptions: ! @ # $ % ^ & * '
	return true
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */