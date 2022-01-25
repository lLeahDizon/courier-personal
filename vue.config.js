const path = require('path')

function resolve (dir) {
  return path.join(__dirname, '.', dir)
}

function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/styles/mixins_fns.styl')
      ]
    })
}

const {
  VUE_APP_API_ROOT
} = process.env

module.exports = {
  publicPath: process.env.NODE_ENV === 'development' ? '/' : '/' + process.env.VUE_APP_BASE_NAME + '/',
  assetsDir: 'static',
  productionSourceMap: false,
  lintOnSave: false,
  crossorigin: 'anonymous',
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
    // 在所有stylus默认注入mixin的方法
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    const stylusRule = config.module.rule('stylus').exclude.add(/(node_modules)/).end()
    types.forEach(type => addStyleResource(stylusRule.oneOf(type)))
    // 移除预加载插件
    config.plugins.delete('prefetch')
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

    // 给异步加载的静态资源标签添加crossorigin属性
    config.output.crossOriginLoading('anonymous')
  },
  devServer: {
    port: 8100,
    proxy: {
      '/api': {
        target: VUE_APP_API_ROOT,
        pathRewrite: { '^/api': '' },
        secure: false,
        changeOrigin: true
      }
    }
  }
}
