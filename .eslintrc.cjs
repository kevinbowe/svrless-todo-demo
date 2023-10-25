/* eslint-env node */
module.exports = {
	extends: [
		'eslint:recommended', 
		'plugin:@typescript-eslint/recommended'
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	root: true,
	parserOptions: {
		project: true,
		tsconfigRootDir: __dirname
	},
	rules : {
		"@typescript-eslint/no-explicit-any": "off" ,
		"no-undef" : "off",
		"@typescript-eslint/no-unused-vars": "off",
		"@typescript-eslint/no-this-alias": "off",
		"no-prototype-builtins": "off",
		"no-setter-return": "off",
		"no-empty": "off",
		"no-cond-assign": "off",
		"@typescript-eslint/no-var-requires": "off"
	}
}