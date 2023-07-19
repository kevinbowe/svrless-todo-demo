				/*  */
// import { info, info1, info2 , info3, info4, info5, info6, info7,
// 	log, warn, err, err2, progress, joy, exit,
// 	enter, enter0, enter1, enter2, enter3, enter4, enter5, enter6, enter7, 
// 	success, bar, whitebar, greybar, fini, start, pass, fail  }
// from "../../my-util-code/MyConsoleUtil"
						/*  */
import { info, info1, info2 , info3, info4, info5, info6, info7 }
	from "../../my-util-code/MyConsoleUtil"

import { enter, enter0, enter1, enter2, enter3, enter4, enter5, enter6, enter7 }
	from "../../my-util-code/MyConsoleUtil"

import { bar, whitebar, greybar, redbar, greenbar, orangebar }
	from "../../my-util-code/MyConsoleUtil"

import { log, warn, err, err2, exit, success, pass, fail, fini, start, progress, joy, }
	from "../../my-util-code/MyConsoleUtil"

import { toRefs, ref, Ref, computed } from 'vue'

export const HelloFromNickName = ref("Hello from Nickname.ts")

// export const NicknameTestFunc = (inputStr:string) => {
// 	info("inputStr > ", inputStr)
// 	info("Made it to TestFunc in Nickname.ts")
// 	return "String from TestFunc"
// }