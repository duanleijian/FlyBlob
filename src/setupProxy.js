// 旧版本代理设置(导致项目资源无法访问)
// const proxy  = require('http-proxy-middleware')
// module.exports = (app) => {
//     app.use(proxy('/api', {
//         target: 'http://localhost:5000',
//         changeOrigin: true, // 是否欺骗目标服务器
//         pathRewrite: {'^/api': ''}
//     }))
// }
// 新版本代理设置
const { createProxyMiddleware } = require("http-proxy-middleware")
module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api",{
      //配置转发目标地址(能返回数据的服务器地址)
      // target: 'http://localhost:5000',
      target: "http://175.24.165.205:5000", 
      changeOrigin: true, //控制服务器接收到的请求头中host字段的值
      pathRewrite: { "^/api": "" }
    })    
  )
}