module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'node': true
  },
  'globals': {
    // 不可重写
    'jQuery': false
  },
  'extends': [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended'
  ],
  'overrides': [
  ],
  'parser': 'vue-eslint-parser',
  'parserOptions': {
    'parser': '@typescript-eslint/parser',
    'ecmaVersion': 'latest',
    'sourceType': 'module'
  },
  'plugins': [
    'vue',
    '@typescript-eslint'
  ],
  'rules': {
    '@typescript-eslint/ban-ts-comment': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'windows'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ],
    'no-cond-assign': [
      'error',
      'always'
    ]
  }
}
