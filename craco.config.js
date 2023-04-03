
const path = require('path')
// 引入打包分析工具
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// 提高二次构建的速度
const { whenProd, getPlugin, pluginByName } = require('@craco/craco')
module.exports = {
    webpack: {
        alias: {
            '@': path.join(__dirname, 'src')
        },
        plugins: [
            new BundleAnalyzerPlugin({
                // analyzerMode: 'disabled', 
                // generateStatsFile: true
            })
        ],
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