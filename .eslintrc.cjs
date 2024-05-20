module.exports = {
   'env': {
      'browser': true,
      'es2021': true
   },
   'extends': [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended'
   ],
   'overrides': [
      {
         'env': {
            'node': true
         },
         'files': [
            '.eslintrc.{js,cjs}'
         ],
         'parserOptions': {
            'sourceType': 'script'
         }
      }
   ],
   'parser': '@typescript-eslint/parser',
   'parserOptions': {
      'ecmaVersion': 'latest',
      'sourceType': 'module'
   },
   'plugins': [
      '@typescript-eslint',
      '@stylistic/js',
      '@stylistic/ts',
      'simple-import-sort'
   ],
   'rules': {
      'indent': ['off', 3],
      '@stylistic/js/indent': ['error', 3, { 'SwitchCase': 1 }],
      'linebreak-style': [
         'error',
         'unix'
      ],
      'quotes': [
         'error',
         'single'
      ],
      'semi': [
         'error',
         'never'
      ],
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@stylistic/js/no-multiple-empty-lines': ['error', { 'max': 1 }],
      'no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      'prefer-const': 'off'
   }
}
