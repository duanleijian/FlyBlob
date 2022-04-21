import http from './http.js'

export function getUserAction(articleId, actionUserId) {
    return http({
        url: `/action/count/${articleId}/${actionUserId}`,
        method: 'get'        
    })
}

export function updateUserAction(data) {
    return http({
        url: '/action',
        method: 'put',
        data
    })
}