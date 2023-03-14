import http from './http.js'
// 获取用户行为
export function getUserAction(articleId, actionUserId) {
    return http({
        url: `/action/count/${articleId}/${actionUserId}`,
        method: 'get'        
    })
}
// 获取用户行为数据统计
export function getAuthorCount(userId) {
    return http({
        url: '/action/author',
        method: 'get',
        params: { userId }
    })
}
// 更新用户行为
export function updateUserAction(data) {
    return http({
        url: '/action',
        method: 'put',
        data
    })
}