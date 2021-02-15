const {
    GenerateSW
} = require("workbox-webpack-plugin");

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ?
        '/promptpay-creator/' :
        '/',
    runtimeCompiler: true,
    configureWebpack: {
        plugins: [new GenerateSW()]
    }
}