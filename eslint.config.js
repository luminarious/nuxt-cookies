// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt()
	.override('nuxt/stylistic', {
		rules: {
			'@stylistic/arrow-parens': ['warn', 'always'],
			'@stylistic/brace-style': ['warn', '1tbs', { allowSingleLine: true }],
			'@stylistic/indent': ['warn', 'tab'],
			'@stylistic/max-len': 'off',
			'@stylistic/max-statements-per-line': 'off',
			'@stylistic/no-tabs': ['warn', { allowIndentationTabs: true }],
			'@stylistic/quotes': ['warn', 'single'],
			'@stylistic/semi': ['warn', 'never'],
		},
	})
	.override('nuxt/vue/rules', {
		rules: {
			'vue/first-attribute-linebreak': 'off',
			'vue/html-closing-bracket-newline': 'off',
			'vue/html-indent': ['warn', 'tab', { baseIndent: 1 }],
			'vue/html-self-closing': 'off',
			'vue/max-attributes-per-line': 'off',
			'vue/multiline-html-element-content-newline': 'off',
			'vue/object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
			'vue/singleline-html-element-content-newline': 'off',
		},
	})
