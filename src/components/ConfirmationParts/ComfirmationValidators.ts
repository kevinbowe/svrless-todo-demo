/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
export async function checkConfirmationTooShort (confCode) {
	if (!confCode) return "Required"
	if (confCode.length <= 5) return 'Confirmation Code is too short'
	return true
}
/* ----------------------------------------------------------------------------- */
export async function checkConfirmationSpecialChars (confCode) {
	//				Check ALL Special Chars -- REFERENCE -- 7/21/23
	const rxAll = /[+\-_@\.`~!#$%^&'"*,:;/ {}[\]()<>]/gm

	//				Handle the null condition.
	//				This is not valid but the submit will not work with an empty/null field
	if (!confCode) return true

	const match = confCode.match(rxAll)
	if(match) return 'No Special characters allowed.'
	return true
}
