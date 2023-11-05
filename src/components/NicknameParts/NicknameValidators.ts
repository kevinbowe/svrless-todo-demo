/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/* Validation */

/* ----------------------------------------------------------------------------- */
export async function checkNicknameTooShort (workingNickname) {
	if (workingNickname.length === 1 || workingNickname.length === 2) return 'User nickname is too short. Please try another one.'
	// if (workingNickname.length <= 2) return 'User nickname is too short. Please try another one.'
	return true
}
/* ----------------------------------------------------------------------------- */
export async function checkNicknameReserved (workingNickname) {
	if (workingNickname.length === 0) return true

	if (workingNickname.toLowerCase() === 'kevin') return 'User nickname reserved. Please try another one.'
	return true
}
/* ----------------------------------------------------------------------------- */
export async function checkNicknameNumericFirstChar (workingNickname) {
	if (workingNickname.length === 0) return true
	
	if (!isNaN(workingNickname[0])) return 'User nickname can not begin with a Number. Please try another one.'
	return true
}
/* ----------------------------------------------------------------------------- */
export async function checkNicknameFirstChar (workingNickname) {
	if (workingNickname.length === 0) return true
	
	//				All special chars must be rejected.
	const match = workingNickname[0].match(/[-\._=+`~\\!@#$%\^&*(){}[\]<>?/|]/)
	if (match) return 'User nickname can not begin with any special characters. Please try another one.'
	return true
}
/* ----------------------------------------------------------------------------- */
export async function checkNicknameLastChar (workingNickname) {
	if (workingNickname.length === 0) return true
	
	//				All special chars must be rejected.
	//		/[-\._=+`~\\!@#$%\^&*(){}[\]<>?|]/
	const match = workingNickname[workingNickname.length-1].match(/[-\._=+`~\\!@#$%\^&*(){}[\]<>?|]/)
	if (match) return 'User nickname can not end with any special characters. Please try another one.'
	return true
}
/* ----------------------------------------------------------------------------- */
export async function checkNicknameSpecialChars (workingNickname) {
	if (workingNickname.length === 0) return true
	
	//				These chars are valid.
	//			>>>-->  -  .  _  =  +  ~ <--<<<
	const match = workingNickname.match( /[`\\!@#$%\^&*(){}[\]<>?/|]/)
	if(match) return 'User nickname can not contain special characters. Please try another one.'
	return true
}
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
