module.exports = {
  root: true,
  env: {
    node: true,
    'vue/setup-compiler-macros': true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/typescript/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    complexity: [2, 12],
    'max-statements': [2, 35],
    'no-shadow-restricted-names': 2,
    radix: 2,
    'space-infix-ops': 2,
    strict: 0,
    '@typescript-eslint/no-explicit-any': 'off',
    'prettier/prettier': ['error'],
    '@typescript-eslint/no-unused-vars': ['error', { args: 'none' }],
    'no-console': 'off',
    'no-debugger': 'off',
    'vue/define-macros-order': [
      'error',
      {
        order: ['defineProps', 'defineEmits'],
      },
    ],
  },
}
