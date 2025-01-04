import importPlugin from 'eslint-plugin-import';
import reactPlugin from 'eslint-plugin-react';
import babelParser from '@babel/eslint-parser';

export default [
	{
		files: ['**/*.js', '**/*.jsx'],
		languageOptions: {
			parser: babelParser,
			ecmaVersion: 'latest',
			sourceType: 'module',
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
					classes: true,
				},
			},
			globals: {
				jest: true,
				describe: true,
				it: true,
				beforeEach: true,
				afterEach: true,
				expect: true,
				document: true,
				window: true,
				screen: true,
				beforeAll: true,
				afterAll: true,
				jasmine: true,
				Image: true,
				xprops: true,
				page: true,
				browser: true,
				context: true,
				jestPuppeteer: true,
				Cypress: true,
				cy: true,
				console: true,
				module: true,
				global: true,
				setTimeout: true,
				require: true,
				process: true,
				URLSearchParams: true,
				clearTimeout: true,
				setInterval: true,
				clearInterval: true,
				URL: true,
				TextDecoder: true,
				__dirname: true
			},
		},
		plugins: {
			react: reactPlugin,
			import: importPlugin
		},
		settings: {
			react: {
				version: 'detect',
			},
			'import/resolver': {
				node: {
					extensions: ['.js', '.jsx'],
					paths: ['src', 'config'],
				},
			},
		},
		rules: {
			...reactPlugin.configs.recommended.rules,
			'array-callback-return': 'error',
			'arrow-body-style': ['error', 'as-needed'],
			'arrow-parens': ['error', 'as-needed'],
			'arrow-spacing': 'error',
			'brace-style': 'error',
			camelcase: 'off',
			'consistent-return': 'error',
			'comma-dangle': ['error', 'never'],
			'comma-spacing': ['error', { before: false, after: true }],
			'comma-style': ['error', 'last'],
			'constructor-super': 'error',
			curly: 'error',
			//'customPlugin/no-native-map': 'error',
			'dot-notation': 'error',
			'eol-last': ['error', 'always'],
			eqeqeq: 'error',
			'eslint-comments/no-unused-disable': 'off',
			'eslint-disable': 'off',
			'for-direction': 'error',
			'getter-return': 'error',
			'id-length': ['error', { min: 2, exceptions: ['_'] }],
			indent: ['error', 2],
			'import/no-unresolved': 'warn',
			'jsx-quotes': ['error', 'prefer-double'],
			'key-spacing': ['error', { beforeColon: false, afterColon: true }],
			'keyword-spacing': 'error',
			'max-len': ['error', 120],
			'max-lines': ['error', 200],
			'newline-per-chained-call': 'error',
			'no-async-promise-executor': 'error',
			'no-await-in-loop': 'error',
			'no-case-declarations': 'error',
			'no-class-assign': 'error',
			'no-compare-neg-zero': 'error',
			'no-cond-assign': 'error',
			'no-confusing-arrow': ['error', { allowParens: true }],
			'no-console': ['error', { allow: ['warn'] }],
			'no-const-assign': 'off',
			'no-constant-binary-expression': 'off',
			'no-constant-condition': 'error',
			'no-control-regex': 'error',
			'no-debugger': 'error',
			'no-delete-var': 'error',
			'no-dupe-args': 'error',
			'no-dupe-class-members': 'error',
			'no-dupe-else-if': 'error',
			'no-dupe-keys': 'error',
			'no-duplicate-case': 'error',
			'no-duplicate-imports': 'error',
			'no-else-return': 'error',
			'no-empty': 'error',
			'no-empty-character-class': 'error',
			'no-empty-pattern': 'error',
			'no-empty-static-block': 'error',
			'no-ex-assign': 'error',
			'no-extra-boolean-cast': 'off',
			'no-fallthrough': 'error',
			'no-func-assign': 'error',
			'no-global-assign': 'error',
			'no-import-assign': 'error',
			'no-invalid-regexp': 'error',
			'no-irregular-whitespace': 'error',
			'no-iterator': 'error',
			'no-lone-blocks': 'error',
			'no-loss-of-precision': 'error',
			'no-misleading-character-class': 'error',
			'no-multi-spaces': 'error',
			'no-multiple-empty-lines': ['error', { max: 1 }],
			'no-nested-ternary': 'error',
			'no-new-native-nonconstructor': 'error',
			'no-nonoctal-decimal-escape': 'error',
			'no-obj-calls': 'error',
			'no-octal': 'error',
			'no-param-reassign': ['error', { props: true }],
			'no-plusplus': 'error',
			'no-prototype-builtins': 'off',
			'no-redeclare': 'error',
			'no-regex-spaces': 'error',
			'no-restricted-imports': [ 
				'error', { 
					'paths': [ 
						{ 
							"name": 'immutable/dist/immutable', 
							"message": "Please use 'immutable' instead of 'immutable/dist/immutable'" 
						} 
					] 
				} 
			],
			'no-restricted-syntax': [
				'error',
				'DoWhileStatement',
				'ForStatement',
				'ForInStatement',
				'ForOfStatement',
				'SwitchCase',
				'SwitchStatement',
				'WhileStatement',
				'WithStatement',
				{
					selector: 'UnaryExpression[operator="delete"]',
					message: 'Avoid using `delete` operator',
				},
			],
			'no-return-await': 'error',
			'no-self-assign': 'error',
			'no-setter-return': 'error',
			'no-shadow': 'error',
			'no-shadow-restricted-names': 'error',
			'no-sparse-arrays': 'error',
			'no-this-before-super': 'error',
			'no-trailing-spaces': 'error',
			'no-undef': 'error',
			'no-unexpected-multiline': 'error',
			'no-unneeded-ternary': 'error',
			'no-unreachable': 'error',
			'no-unsafe-finally': 'error',
			'no-unsafe-negation': 'error',
			'no-unused-expressions': ['error', { allowTernary: true }],
			'no-unsafe-optional-chaining': 'error',
			'no-unused-labels': 'error',
			'no-unused-private-class-members': 'error',
			'no-unused-vars': ['error', { caughtErrors: 'none' }],
			'no-useless-constructor': 'error',
			'no-useless-backreference': 'error',
			'no-useless-catch': 'error',
			'no-useless-escape': 'error',
			'no-var': 'error',
			'no-whitespace-before-property': 'error',
			'no-with': 'error',
			'object-curly-spacing': ['error', 'always'],
			'object-shorthand': 'error',
			'padded-blocks': ['error', 'never'],
			'prefer-arrow-callback': 'error',
			'prefer-const': 'error',
			'prefer-rest-params': 'error',
			'prefer-spread': 'error',
			'prefer-template': 'error',
			quotes: ['error', 'single'],
			'quote-props': ['error', 'as-needed'],
			'react/no-danger': 'error',
			'react/prop-types': 'off',
			'require-yield': 'error',
			semi: ['error', 'always'],
			'semi-spacing': ['error', { before: false, after: false }],
			'space-before-blocks': 'error',
			'space-before-function-paren': ['error', 'never'],
			'space-in-parens': 'error',
			'space-infix-ops': 'error',
			'use-isnan': 'error',
			'template-curly-spacing': 'error',
			'valid-typeof': 'error'	
		},
		linterOptions: {
			reportUnusedDisableDirectives: 'off',
		},
		ignores: ['dist/', '__temp__/', 'node_modules/', '**/src/lib/datadog/**']
	}
];