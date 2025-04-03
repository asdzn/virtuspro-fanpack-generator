import globals from 'globals'
import prettierPlugin from 'eslint-plugin-prettier'
import eslintConfigPrettier from 'eslint-config-prettier'
import tsParser from '@typescript-eslint/parser'

/** @type {import('eslint').Linter.Config[]} */
export default [
	{
		plugins: [
			'@typescript-eslint',
			'react',
			'react-hooks',
			'react-refresh',
			'prettier',
		],
		ignores: ['dist', 'node_modules', 'coverage', 'eslint.config.js'],
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
				...globals.es2020,
			},
			parser: tsParser,
			parserOptions: {
				project: ['tsconfig.json', 'tsconfig.node.json'],
				tsconfigRootDir: __dirname,
			},
		},
		rules: {
			...prettierPlugin.configs.recommended.rules,
			...eslintConfigPrettier.rules,
			'no-mixed-spaces-and-tabs': 'off',
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': 'off',
			'react-refresh/only-export-components': [
				'warn',
				{ allowConstantExport: true },
			],
			'prettier/prettier': [
				'warn',
				{
					useTabs: true,
					singleQuote: true,
					semi: false,
				},
			],
		},
		files: ['**/*.{js,jsx,ts,tsx}'],
	},
]
