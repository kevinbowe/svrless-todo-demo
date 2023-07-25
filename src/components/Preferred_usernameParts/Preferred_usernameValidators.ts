/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
export async function checkPreferred_usernameTooShort (workingPreferred_usernameModel) {
	if (workingPreferred_usernameModel.length > 0 && workingPreferred_usernameModel.length <= 2) {
		return 'User name is too short. Please try another one.'
	}
	return true
}
/* ----------------------------------------------------------------------------- */
export async function checkPreferred_usernameFirstChar (workingPreferred_usernameModel) {
	if (!isNaN(workingPreferred_usernameModel[0])) {
		return 'User name can not begin with a Number. Please try another one.'
	}
	return true
}

/* ----------------------------------------------------------------------------- */
export async function checkPreferred_usernameSpecialCharExceptions (workingPreferred_usernameModel) {
	//				REF -- ALL Special Chars: /[-_.*\[\]@!#$%^\'"*,:;|/ {}<>()\\]/
		//				Special Char with exceptions: <hyphen> <under_bar> and <period>
		// let regexSpecialChar = /[*\[\]@!#$%^\'"*,:;|{}<>()\\\/]/
		//				Add <space>
		let regexSpecialChar = /[\s*\[\]@!#$%^\'"*,:;|{}<>()\\\/]/
		const match = workingPreferred_usernameModel.match(regexSpecialChar)
		// 				Check the format
		if(match) {
			return 'Only period, hyphen and underbar are allowed special characters. Try again.'
		}
		return true
}
