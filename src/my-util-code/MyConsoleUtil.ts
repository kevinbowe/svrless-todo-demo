// export default {
// 	const log = console.log;     // normal log
// 	const warn = console.warn;   // Orange on Brown
// 	const err = console.error;   // Pink on DkRed
// 	const progress = (msg: string, value: any = "") => { console.log(`%c${msg}`, "color: black; background-color:orange;", value) }
// 	const joy =     	(msg: string, value: any = "") => { console.log(`%c${msg}`, "color: pink;", value) }
// 	const info =    	(msg: string, value: any = "") => { console.log(`%c   ${msg}`, "color: cyan;", value) }
// 	const enter =    (msg: string, value: any = "") => { console.log(`%cENTER >>>-->  ${msg}`, "color: yellow;", value) }
// 	const exit =    	(msg: string, value: any = "") => { console.log(`%c<--<<< EXIT - ${msg}`, "color: magenta;", value) }
// 	const success = 	(msg: string, value: any = "") => { console.log(`%c${msg}`, "color: green; background-color:black;", value) }
// 	const bar = 		((msg: string = "", value: any = "") => { console.log(`%c                                 %c ${msg}`, "color: white; background-color:black;", value) })
// 	const whitebar = ((msg: string = "", value: any = "") => { console.log(`%c                                 %c ${msg}`, "color: black; background-color:white;", value) })
// 	const start =    (msg: string, value: any = "") => { console.log(`%cSTART ${msg}`, "color: yellow;", value) }
// 	const fini =    	(msg: string, value: any = "") => { console.log(`%cFINI - ${msg}`, "color: magenta;", value) }

// 	return {log,warn,err,progress,joy,info,enter,exit,success,bar,whitebar,start,fini}
// }


export const log = console.log;     // normal log
export const warn = console.warn;   // Orange on Brown

export const err2 = console.error;   // Pink on DkRed
export const err = (msg: string, value: any = "") => { console.log(`%c   ${msg}`, "color: red;", value) }

export const pass_SAFE = (msg: string, value: any = "") => { console.log(`%c   PASS %c --  ${msg}`, "color: green;", value) }
export const fail_SAFE = (msg: string, value: any = "") => { console.log(`%c   FAIL %c --  ${msg}`, "color: red;", value) }

export const pass = (msg: string, value: any = "") => { console.log(`%c   PASS --  ${msg}`, "color: green;", value) }
export const fail = (msg: string, value: any = "") => { console.log(`%c   FAIL --  ${msg}`, "color: red;", value) }


export const progress = (msg: string, value: any = "") => { console.log(`%c${msg}`, "color: black; background-color:orange;", value) }

export const joy =     	(msg: string, value: any = "") => { console.log(`%c   ${msg}`, "color: pink;", value) }

export const info =    		(msg: string, value: any = "") => { console.log(`%c   ${msg}`, "color: cyan;", value) }
export const infor =    	(msg: string, value: any = "") => { console.log(`%c   ${msg}`, "color: red;", value) }

export const infob =    	(msg: string, value: any = "") => { console.log(`%c   ${msg}`, "color: ltblue;", value) }

export const infog =    	(msg: string, value: any = "") => { console.log(`%c   ${msg}`, "color: chartreuse;", value) }
export const infoy =    	(msg: string, value: any = "") => { console.log(`%c   ${msg}`, "color: yellow;", value) }
export const infoo =    	(msg: string, value: any = "") => { console.log(`%c   ${msg}`, "color: darkorange;", value) }
export const infop =    	(msg: string, value: any = "") => { console.log(`%c   ${msg}`, "color: pink;", value) }
export const infom =    	(msg: string, value: any = "") => { console.log(`%c   ${msg}`, "color: mediumpurple;", value) }

export const info1 =    	(msg: string, value: any = "") => { console.log(`%c   ${msg}`, "color: red;", value) }
export const info2 =    	(msg: string, value: any = "") => { console.log(`%c   ${msg}`, "color: chartreuse;", value) }

export const info3 =    	(msg: string, value: any = "") => { console.log(`%c   ${msg}`, "color: fuchsia;", value) }

export const info4 =    	(msg: string, value: any = "") => { console.log(`%c   ${msg}`, "color: yellow;", value) }
export const info5 =    	(msg: string, value: any = "") => { console.log(`%c   ${msg}`, "color: darkorange;", value) }
export const info6 =    	(msg: string, value: any = "") => { console.log(`%c   ${msg}`, "color: pink;", value) }
export const info7 =    	(msg: string, value: any = "") => { console.log(`%c   ${msg}`, "color: mediumpurple;", value) }



export const enter =    (msg: string, value: any = "") => { console.log(`%c>>>-> ENTER -  ${msg}`, "color: yellow;font-weight:bold;", value) }

export const exit =    	(msg: string, value: any = "") => { console.log(`%c<--<<< EXIT -  ${msg}`, "color: green;font-weight:bold;", value) }

export const success = 	(msg: string, value: any = "") => { console.log(`%c${msg}`, "color: green; background-color:black;", value) }

export const bar =		(msg: string = "", value: any = "") => { console.log(`%c                                 ${msg}`, "color: white; background-color:black;", value) }

export const whitebar = (msg: string = "", value: any = "") => { console.log(`%c                                 %c ${msg}`, "color: black; background-color:white;", value) }


export const whitebar_SAFE = ((msg: string = "", value: any = "") => { console.log(`%c                                 %c ${msg}`, "color: black; background-color:white;", value) })

export const start =    (msg: string, value: any = "") => { console.log(`%c--> START - ${msg}`, "color: yellow;", value) }

export const fini =    	(msg: string, value: any = "") => { console.log(`%c<-- FINI - ${msg}`, "color: magenta;", value) }

