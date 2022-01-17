module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    jquery: true
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    "no-unused-vars": "off",
    "no-empty": "off",
    "no-cond-assign": "off",
    "no-obj-calls": "off",
    "no-prototype-builtins": "off",
    "no-useless-escape": "off",
    "no-undef": "off",
    "no-self-assign": "off",
    "no-control-regex": "off",
    "vue/no-unused-components": "off",
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  },
  globals: {
    "$": true,
    "jQuery": true
  }
}
