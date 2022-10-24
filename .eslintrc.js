module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	extends: ['plugin:prettier/recommended', 'react-app'],
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	plugins: ['react'],
	rules: {
		'react/prop-types': 0,
		'comma-dangle': ['warn', 'never'],
		quotes: [
			'warn',
			'single',
			{
				allowTemplateLiterals: true
			}
		]
	}
};
