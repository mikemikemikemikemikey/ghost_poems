module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2020: true,
    node: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 11,
  },
  rules: {
    semi: [
      'error',
      'never',
    ],
    'linebreak-style': [
      0,
    ],
  },
}
