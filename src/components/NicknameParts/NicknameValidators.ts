/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/* Validation */
/* ----------------------------------------------------------------------------- */
export async function checkNicknameReserved (workingNickname) {
	if (workingNickname.toLowerCase() === 'kevin') return 'User nickname reserved. Please try another one.'
	return true
}
/* ----------------------------------------------------------------------------- */
export async function checkNicknameTooShort (workingNickname) {
	if (workingNickname.length <= 2) return 'User nickname is too short. Please try another one.'
	return true
}
/* ----------------------------------------------------------------------------- */
export async function checkNicknameNumericFirstChar (workingNickname) {
	if (!isNaN(workingNickname[0])) return 'User nickname can not begin with a Number. Please try another one.'
	return true
}
/* ----------------------------------------------------------------------------- */
export async function checkNicknameFirstChar (workingNickname) {
	//				All special chars must be rejected.
	const match = workingNickname[0].match(/[-\._=+`~\\!@#$%\^&*(){}[\]<>?/|]/)
	if (match) return 'User nickname can not begin with any special characters. Please try another one.'
	return true
}
/* ----------------------------------------------------------------------------- */
export async function checkNicknameLastChar (workingNickname) {
	//				All special chars must be rejected.
	//		/[-\._=+`~\\!@#$%\^&*(){}[\]<>?|]/
	const match = workingNickname[workingNickname.length-1].match(/[-\._=+`~\\!@#$%\^&*(){}[\]<>?|]/)
	if (match) return 'User nickname can not end with any special characters. Please try another one.'
	return true
}
/* ----------------------------------------------------------------------------- */
export async function checkNicknameSpecialChars (workingNickname) {
	//				These chars are valid.
	//			>>>-->  -  .  _  =  +  ~ <--<<<
	const match = workingNickname.match( /[`\\!@#$%\^&*(){}[\]<>?/|]/)
	if(match) return 'User nickname can not contain special characters. Please try another one.'
	return true
}
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
