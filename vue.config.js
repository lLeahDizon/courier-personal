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
  publicPath: NODE_ENV === 'production' ? '/' + process.env.VUE_APP_BASE_NAME + '/' : '/',
  lintOnSave: false,
  crossorigin: 'anonymous',
  configureWebpack: () => {
    // merge到默认设置
    return {
      resolve: {
        alias: {
          src: resolve('src')
        }
      },
      externals: {
        'vue': 'Vue',
        'vue-router': 'VueRouter',
        'axios': 'axios',
        'VConsole': 'vConsole'
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
    // images的limit调整
    config.module.rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(() => {
        return {
          limit: 10240,
          fallback: {
            loader: 'file-loader',
            options: {
              name: 'img/[name].[hash:8].[ext]'
            }
          }
        }
      })
    config.optimization.minimize(true)
    // 代码分包调整
    config.optimization
      .splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // 只打包初始时依赖的第三方
          },
          commons: {
            name: 'chunk-components',
            test: resolve('src/components'), // 将公用业务组件库单独打包
            minChunks: 2, // 最小共用次数
            chunks: 'all',
            priority: 5,
            reuseExistingChunk: true
          }
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
