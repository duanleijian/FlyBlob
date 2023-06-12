
const path = require('path')
// 引入打包分析工具
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CompressionPlugin = require("compression-webpack-plugin");
// 提高二次构建的速度
const { whenProd, whenDev, getPlugin, pluginByName } = require('@craco/craco');
const getMode = () => {
    let mode = ''
    whenDev(() => mode = 'development')
    whenProd(() => mode = 'production')
    return mode
}
const isDev = getMode() === 'development'
const getEslintOptions = () => {
    const options = {
        enable: false,
    }
    isDev && (options.enable = true)
    !isDev && (options.enable = false)
    return options
}


module.exports = {
    eslint: {
        ...getEslintOptions()
    },
    webpack: {
        alias: {
            '@': path.join(__dirname, './src')
        },
        plugins: [
            // isDev? new BundleAnalyzerPlugin({}) : null,
            new CompressionPlugin({
                test: /\.js$|\.css$|\.html$/, // 对哪些资源进行压缩
                filename: "[path][base].gz",
                threshold: 8192, // 超过多大的资源会被压缩，单位bytes
                minRatio: 0.8, // 压缩过后体积减少到80%以下的文件会被压缩
            })
        ].filter(plugin => plugin),
        configure: (webpackConfig) => {
            let cdn = {
                js: [],
                css: []
            }
            // 对webpack进行配置
            whenProd(() => {
                // 只会在生产环境执行
                webpackConfig.externals = {
                    'react': 'React',
                    'react-dom': 'ReactDOM',
                }

                cdn = {
                    js: [
                        'https://cdn.bootcdn.net/ajax/libs/react/17.0.2/umd/react.production.min.js',
                        'https://cdn.bootcdn.net/ajax/libs/react-dom/17.0.2/umd/react-dom.production.min.js',
                    ],
                    css: []
                }
            })

            const { isFound, match } = getPlugin(
                webpackConfig,
                pluginByName('HtmlWebpackPlugin')
            )
            if (isFound) {
                // 找到了html的插件                
                match.userOptions.cdn = cdn
            }
            // 开启缓存
            webpackConfig.cache.type = "filesystem"
            return webpackConfig
        }
    }
}