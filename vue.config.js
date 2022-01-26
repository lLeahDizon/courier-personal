const path = require('path')

function resolve(dir) {
  return path.join(__dirname, '.', dir)
}

const {
  NODE_ENV,
  VUE_APP_API_ROOT
} = process.env

module.exports = {
  outputDir: 'courier-personal',
  publicPath: NODE_ENV === 'production' ?  '/' + process.env.VUE_APP_BASE_NAME + '/' : '/',
  lintOnSave: false,
  configureWebpack: () => {
    // merge到默认设置
    return {
      resolve: {
        alias: {
          src: resolve('src')
        }
      }
    }
  },
  chainWebpack: config => {
    // 替换svg的loader，mobile版使用
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .include
      .add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .tap(() => {
        return {
          symbolId: 'icon-[name]'
        }
      })
  },
  devServer: {
    port: 8100,
    proxy: {
      '/api': {
        target: VUE_APP_API_ROOT,
        pathRewrite: {'^/api': ''},
        secure: false,
        changeOrigin: true
      }
    }
  }
}
