import { info, info1, info2 , info3, info4, info5, info6, info7 } from "../../my-util-code/MyConsoleUtil"
import { enter, enter0, enter1, enter2, enter3, enter4, enter5, enter6, enter7 } from "../../my-util-code/MyConsoleUtil"
import { bar, whitebar, greybar, redbar, greenbar, orangebar } from "../../my-util-code/MyConsoleUtil"

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
export const parseEmail = (email) => {
	if (!(!!email)) return null
	const regex = new RegExp('^(?<name>.*)@(?<domain>.*)', 'gm')
	let match = regex.exec(email)
	if (match) return { name: match.groups.name, domain: match.groups.domain }
	return null
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/* Email -- Validation */
/* ----------------------------------------------------------------------------- */
export const checkWorkingEmailSpecialChar = (email) => {

	// enter("checkEmailSpecialChar")

	// DEBUG CODE
	if (email === null) info7("checkEmailSpecialChar(emailArg) > emailArg is Null")

	//				Check ALL Special Chars -- REFERENCE -- 7/21/23
	const rxAll = /[+\-_@\.`~!#$%^&'"*,:;/ {}[\]()<>]/gm

	// 			Exclude these Special Chars ---->  +  -  _  @  .
	const rxExclude = /[`~!#$%^&'"*,:;/ {}[\]()<>]/gm
	const matchExclude = email.match(rxExclude)
	if(matchExclude) return `Special chars are not allowed [ ${matchExclude} ]`

	//				Perform multiple '@'' check
	const rxMultiAtChar = /@{2}|@.*@/gm
	const matchMultiAtChar = email.match(rxMultiAtChar)
	if(matchMultiAtChar) return "Multiple '@' chars are not allowed"

	//				Perform consecutive special char check  ---->  . -  +
	let rxConsecutive = /\.\.|--|\+\+/gm
	const matchConsecutive = email.match(rxConsecutive)
	if ( matchConsecutive) return `Consecutive Special Characters are not allowed. [ ${matchConsecutive} ]`
	return true
}

/* ----------------------------------------------------------------------------- */
export const checkWorkingEmailName = (emailArg) => {

	const parsedEmail = parseEmail(emailArg)
	if (!parsedEmail) return "FAIL checkEmailName() > Invalid Email"

	//				Length check ( long & short ) ---->	64 char
	//				0123456789_123456789_123456789_123456789_123456789_123456789_1234
	let len = parsedEmail.name.length;
	if(len > 64) return "FAIL checkEmailName() > Length Check: Max char allowed = 64 char"
	if(len <= 0) return "FAIL checkEmailName() > Length Check: Min char allowed = 1 char"

	//				Leading and trailing special char check. -- The trailing '_' has been removed from the check.
	//			 	_asd@gmail.com		-asd@gmail.com		asd-@gmail.com
	//				+asd@gmail.com		asd+@gmail.com		.asd@gmail.com		asd.@gmail.com
	const rxLeadTrailChar = /^[-_+\\.]|[-+\\.]$/gm
	let matchLeadTrailChar = parsedEmail.name.match(rxLeadTrailChar)
	if(matchLeadTrailChar) return `[-_+.] can not be the first/last char of email name [ ${matchLeadTrailChar} ]`
	return true
}

/* ----------------------------------------------------------------------------- */
export const checkWorkingEmailDomain = (emailArg) => {

	const emailDomain = parseEmail(emailArg).domain

	//			Length check ( long & short ) ----> 253 char
	//			asd@_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789.com   */
	let len = emailDomain.length;
	if(len > 253) return `Max Valid Domain Length: 253 -- Actual Length: ${emailDomain.length}`
	if(len <= 2) return `Min Valid Domain Length: 3 -- Actual Length: ${emailDomain.length}`

	//			Split the domain and tld and check from both pieces.
	const rxDomainAndTLD = /^(?<domain>.*)[\\.|\\s](?<tld>.*)/m
	let matchDomainAndTLD = emailDomain.match(rxDomainAndTLD)

	//			Check Domain
	if(matchDomainAndTLD?.groups?.domain.length === 0 || matchDomainAndTLD?.groups?.domain === undefined) 
	return `An email domain is required ${emailDomain}`

	//			Check Leading/Trailing Special Char in Domain
	// 		asd@-asd.com	asd@asd-.com	asd@.asd.com	asd@asd..com
	// 		asd@_asd.com	asd@asd_.com	asd@+asd.com	asd@asd+.com
	const rxLeadTrailDomainChar = /^[-_+\\.]|[-_+\\.]$/gm
	let matchLeadTrailDomainChar = matchDomainAndTLD.groups.domain.match(rxLeadTrailDomainChar)
	if(matchLeadTrailDomainChar) return `[-_+.] can not be the first/last char in the domain name [ ${matchLeadTrailDomainChar} ]`

	//			Check	TLD (Top-Level-Domain)
	if(matchDomainAndTLD?.groups.tld.length === 0 || matchDomainAndTLD?.groups.tld === undefined)
	return "FAIL checkEmailDomain() > Domain Check: TopLevelDomain is missing"

	//			Check Leading/Trailing Special Char in TLD
	let matchLeadAndTrailTldChar = matchDomainAndTLD?.groups.tld.match(rxLeadTrailDomainChar)
	if(matchLeadAndTrailTldChar) return `[-_+.] can not be the first/last char in the TLD name [ ${matchLeadAndTrailTldChar} ]`
	return true
}