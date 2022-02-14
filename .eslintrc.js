module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: false,
    jquery: true,
    worker: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 11,
    sourceType: 'module'
  },
  plugins: [
    // 此插件用来识别.html 和 .vue文件中的js代码
    'vue'
  ],
  globals: {
    wx: true,
    VConsole: true
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
