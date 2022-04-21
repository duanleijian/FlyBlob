import http from './http.js'

// 获取用户列表
export function getUserList(query) {
    return http({
        url: '/user/list',
        method: 'get',
        params: query
    })
}


// 获取推荐作者
export function getRecommendUser() {
    return http({
        url: '/user/recommend',
        method: 'get'
    })
}

// 获取作者信息统计数据
export function getAuthorCounts(id) {
    return http({
        url: `/user/countAuthor/${id}`,
        method: 'get'
    })
}

// 获取当前关注人
export function getConcatUser(ids) {
    return http({
        url: `/user/multiple?userRelate=${ids}`,
        method: 'get'
    })
}
// 发送邮件验证码
export function sendEmail(data) {
    return http({   
        url: '/user/email',
        method: 'post',
        data
    })
}
// 验证邮件验证码
export function verEmail(data) {
    return http({
        url: '/user/verEmail',
        method: 'post',
        data
    })
}
// 修改密码
export function resetPassword(data) {
    return http({
        url: '/user/resetPwd',
        method: 'post',
        data
    })
}

// 获取推荐作者并获取关联的作品
export function getUsersAndArticles() {
    return http({
        url: '/user/concatArticle',
        method: 'get'
    })
}

// 获取用户信息
export function getUser(token) {
    return http({
        url: '/user/getInfo',
        method: 'post',
        headers: {
            Authorization: token
        }
    })
}

// 根据id获取用户信息
export function getUserById(id) {
    return http({
        url: `/user/${id}`,
        method: 'get',        
    })
}

// 更新用户数据
export function updateUser(data) {
    return http({
        url: '/user',
        method: 'put',
        data: data
    })
}

// 更新用户关注
export function updateUserRelate(data) {
    return http({
        url: '/user/editRelate',
        method: 'put',
        data
    })
}

// 更新用户头像
export function uploadUserAvatar(data) {
    return http({
        url: `/user/upload`,
        method: 'post',
        data,
        headers: {'Content-Type': 'multipart/form-data'}
    })
}

// 获取账号信息
export function getAccount(query) {
    return http({
        url: '/user/account',
        method: 'get',
        params: query
    })
}

// 登录
export function login(data) {
    return http({
        url: '/user/login',
        method: 'post',
        data: data        
    })
}

// 注册
export function register(data) {
    return http({
        url: '/user/register',
        method: 'post',
        data: data    
    })
}

//添加关注
export function addConcat(data) {
    return http({
        url: '/user/relate',
        method: 'post',
        data: data    
    })
}

//获取当前被关注人员
export function getFollowed(id) {
    return http({
        url: `/user/follow/${id}`,
        method: 'get'
    })
}

//获取当前用户统计数据
export function getAllCount(id) {
    return http({
        url: `/user/count/all/${id}`,
        method: 'get'
    })
}
