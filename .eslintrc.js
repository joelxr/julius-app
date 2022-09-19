module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['vue', '@typescript-eslint', 'prettier'],
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
