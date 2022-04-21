import http from './http.js'

export function getCommentList(id) {
    return http({
        url: `/comment/list`,
        method: 'get',   
        params: {id}       
    })
}

export function addComment(data) {
    return http({
        url: '/comment',
        method: 'post',
        data: data
    })
}