const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    publicPath: "/graph-qabot/",
    configureWebpack: {
        externals: {
            jquery: "jQuery"
        }
    }
})

