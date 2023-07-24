
import { info, info1, info2 , info3, info4, info5, info6, info7 } from "../../my-util-code/MyConsoleUtil"
import { enter, enter0, enter1, enter2, enter3, enter4, enter5, enter6, enter7 } from "../../my-util-code/MyConsoleUtil"
import { bar, whitebar, greybar, redbar, greenbar, orangebar } from "../../my-util-code/MyConsoleUtil"
import { ref } from "vue"

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/* Phone number Validation */
/* ----------------------------------------------------------------------------- */
/** Strips these characters -- 'sp', '+', '-', '(', ')'
 *	 If a Country code is missing, add '1' (North America)
 */
export const stripPhone_numberFmt = (phone_numberArg) => {
	//				Cast the input Arg to the proper type.
	let phone_numberStr:String = typeof phone_numberArg === "object" ? phone_numberArg.value : phone_numberArg
	if (typeof phone_numberStr !== "string" )	throw new Error('Parameter is unexpected type!')

	let expStrip = /\+|\s+|\-|\(|\)|\+1/g
	let strippedPhone_numberStr = phone_numberStr.replace(expStrip, '')
	//				If a Country code is missing, add '1' (North America)
	if (strippedPhone_numberStr.length == 10)
		strippedPhone_numberStr = `1${strippedPhone_numberStr}`
	//				Return a reference
	return ref(strippedPhone_numberStr)
}

/* ----------------------------------------------------------------------------- */
export function checkPhone_number (workingPhone_number) {
	let pNum = stripPhone_numberFmt(workingPhone_number)
		
	//				Check length
	if (pNum.value.length < 11) return `Incomplete phone number == char count == ${pNum.value.length} == ${pNum.value}`

	//				Check for alpha characters
	let rxAtoZ = /[A-Za-z]/
	let matchAtoZ = pNum.value.match(rxAtoZ)
	if (matchAtoZ !== null ) return `Alphabetical characters are invalid == [${matchAtoZ}] == ${pNum.value}`
	
	//				Check for special characters
	let rxSpecChar = /[!@#$%\^&*(){}[\]<>?/|\\]/
	let matchSpecChar = pNum.value.match(rxSpecChar)
	if (matchSpecChar !== null) return `Special characters are invalid == [${matchSpecChar}] == ${pNum.value}`
		return true
	}

/* ----------------------------------------------------------------------------- */
const InvalidCounteryCodes = {
   7 : "Russia",  53 : "Cuba",    591 : "Bolivia", 
	9 : "Unknown", 99 : "Unknown", 999 : "Unknown",  0 : "Unknown",
}
/* ----------------------------------------------------------------------------- */
const countryCodeMap = new Map(Object.entries(InvalidCounteryCodes))
/* ----------------------------------------------------------------------------- */
export function checkPhone_numberInvalidCountryCode (workingPhone_number) {
	const strippedPhone_number = stripPhone_numberFmt(workingPhone_number)
	// 			Compare each value in the InvalidCounteryCodes array to the strippedPhone_number
	let validationMessage:any = true
	//				The countryCodeMap is based on a KVP object InvalidCountryCodes
	for (const [key,value] of countryCodeMap) {
		const rxCountry = new RegExp(`^${key}`, "g")
		const matchCountry = strippedPhone_number.value.match(rxCountry)
		if (matchCountry !== null) {
			validationMessage = `Invalid Country Code: ${key} [ ${value} ]`
			break
		}
	}
	return validationMessage
}
