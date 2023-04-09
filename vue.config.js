const { defineConfig } = require('@vue/cli-service')
module.exports ={
  devServer: {
    proxy: {
      '/api': {
        target: 'https://localhost:7145',
        changeOrigin: true
      }
    }
  }
}, defineConfig({
  transpileDependencies: true
})
