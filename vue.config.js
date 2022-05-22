const webpack = require('webpack')

module.exports = {
  //引入jquery
  chainWebpack: config => {
    config.plugin('provide').use(webpack.ProvidePlugin, [{
      $: 'jquery',
      jquery: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }])
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/simple-twitter/'        //這邊是 repo 專案名稱
    : '/'
}