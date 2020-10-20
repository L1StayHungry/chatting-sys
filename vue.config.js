const webpack = require('webpack')
const path = require('path')

function resolve (dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    outputDir: 'dist',
    publicPath: './',
    configureWebpack: {
        // mode: 'production',
        resolve :{
            alias:{
                '@': resolve('src'),
            }
        },
        plugins: [
            new webpack.ProvidePlugin({
                $:"jquery",
                jQuery:"jquery",
                "windows.jQuery":"jquery"
            })
        ]
    },
    // devServer: {
    //     host: '0.0.0.0',
    //     port: '8085',
    //     proxy: {
    //       '/*': {
    //         // 要访问的跨域的域名
    //         target: baseConfig.proxy,
    //         ws: true, // 是否启用websockets
    //         // 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样客户端端和服务端进行数据的交互就不会有跨域问题
    //         changOrigin: true
    //       }
    //     }
    // }
}
