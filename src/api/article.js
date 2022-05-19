import http from './http.js'
// 获取文章列表
export function getArticleList(query) {
    return http({
        url: '/article/list',
        method: 'get',
        params: query
    })
}
// 检索文章
export function getSearchArticles(query) {
    return http({
        url: '/article/search',
        method: 'get',
        params: query
    })
}
// 相关文章
export function getConcatArticles(id) {
    return http({
        url: `/article/concat/${id}`,
        method: 'get'        
    })
}

// 获取推荐文章
export function getRecArticles() {
    return http({
        url: '/article/recommend',
        method: 'get'
    })
}
// 获取用户发表的文章
export function getArticlesByUser(id) {
    return http({
        url: `/article/list/${id}`,
        method: 'get'        
    })    
}
// 获取操作过的文章
export function getArticlesByAction(id, type) {
    return http({
        url: `/article/action/${id}/${type}`,
        method: 'get'
    })
}
// 获取文章详细
export function getArticle(id) {
    return http({
        url: `/article/${id}`,
        method: 'get',        
    })
}
// 添加文章
export function addArticle(data) {
    return http({
        url: '/article',
        method: 'post',
        data
    })
}
// 更新文章
export function updateArticle(data) {
    return http({
        url: '/article',
        method: 'put',
        data
    })
}
// 统计文章
export  function countArticles(id) {
    return http({
        url: `/article/count/${id}`,
        method: 'get',        
    })
}
// 更新文章操作
export function updateArticleAction(data) {
    return http({
        url: '/article/action',
        method: 'post',
        data
    })
}
// 更新文章阅读数
export function updateArticleViews(id) {
    return http({
        url: `/article/views/${id}`,
        method: 'get'     
    })
}

// 删除文章
export function delArticle(id) {
    return http({
        url: `/article/${id}`,
        method: 'delete'
    })
}

