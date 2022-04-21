import Mock from 'mockjs'
// 用户信息
Mock.mock('http://localhost:3000/user', {
    code: 200,
    "data" : {
        "id|+1": 1,
        "user_nick_name": "@cname",
        "user_sex|1":["男","女"],
        "user_introduct": "@cparagraph",
        "user_email": "@email",
        "user_avatar": "@image('200x100', @color , @cname)",
    }            
})
// 获取相关文章
Mock.mock('http://localhost:3000/article/list?concat=1&user=1', {
    code: 200,
    "data|5-10": [
        {
            "id|+1": 1,
            "user_nick_name": "@cname",
            "user_avatar": "",                        
            "article_title": "@ctitle(5, 10)",
            "article_content": "@cparagraph",
            "article_date" : "@datetime",
            "article_likes|1-1000": 10,
            "article_comments|1-1000": 10,
            "article_views|1-1000": 10,
        }
    ],
    msg: 'ok'
})
// 文章列表
Mock.mock('http://localhost:3000/article/list', {
    code: 200,
    "data|5-10": [
        {
            "id|+1": 1,
            "user_nick_name": "@cname",
            "user_avatar": "",                        
            "article_title": "@ctitle(5, 10)",
            "article_content": "@cparagraph",
            "article_date" : "@datetime",
            "article_likes|1-1000": 10,
            "article_comments|1-1000": 10,
            "article_views|1-1000": 10,
        }
    ],
    msg: 'ok'
})
// 文章详情
Mock.mock('http://localhost:3000/article/1', {
    code: 200,
    data: {
        "id|+1": 1,
        "user_nick_name": "@cname",
        "user_avatar": "@image('200x100', @color , @cname)",
        "article_title": "@ctitle(5, 20)",
        "article_content": "@cparagraph",
        "article_date" : "@datetime",
        "article_likes|1-1000": 10,
        "article_comments|1-1000": 10,
        "article_views|1-1000": 10,
        "article_fonts|1-100000": 100        
    }
})
// 当前用户点赞的文章
Mock.mock('http://localhost:3000/article/list?userId=1&type=1', {
    code: 200,
    "data|0-2": [
        {
            "id|+1": 1,
            "user_nick_name": "@cname",
            "user_avatar": "@image('200x100', @color , @cname)",                        
            "article_title": "@ctitle(5, 10)",
            "article_content": "@cparagraph",
            "article_date" : "@datetime",
            "article_likes|1-1000": 10,
            "article_comments|1-1000": 10,
            "article_views|1-1000": 10,            
            "approval_person": "@cname"
        }
    ],
    msg: 'ok'
})
// 当前用户写的文章
Mock.mock('http://localhost:3000/article/list?userId=1', {
    code: 200,
    "data|0-2": [
        {
            "id|+1": 1,
            "user_nick_name": "@cname",
            "user_avatar": "@image('200x100', @color , @cname)",                        
            "article_title": "@ctitle(5, 10)",
            "article_content": "@cparagraph",
            "article_date" : "@datetime",
            "article_likes|1-1000": 10,
            "article_comments|1-1000": 10,
            "article_views|1-1000": 10,
        }
    ],
    msg: 'ok'
})
// 检索文章
Mock.mock('http://localhost:3000/article/list?key=1', {
    code: 200,
    "data|8": [
        {
            "id|+1": 1,
            "user_nick_name": "@cname",
            "user_avatar": "",                        
            "article_title": "@ctitle(10, 20)",
            "article_content": "@cparagraph",
            "article_date" : "@datetime",
            "article_likes|1-1000": 10,
            "article_comments|1-1000": 10,
            "article_views|1-1000": 10,
        }
    ],
    msg: 'ok'
})
// 热门文章
Mock.mock('http://localhost:3000/article/list?word=article', {
    code: 200,
    "data|8": [
        {
            "id|+1": 1,
            "user_nick_name": "@cname",
            "user_avatar": "",                        
            "article_title": "@ctitle(10, 20)",
            "article_content": "@cparagraph",
            "article_date" : "@datetime",
            "article_likes|1-1000": 10,
            "article_comments|1-1000": 10,
            "article_views|1-1000": 10,
        }
    ],
    msg: 'ok'
})
// 推荐作者
Mock.mock('http://localhost:3000/user/list?word=author', {
    code: 200,
    "data|5": [
        {
            "id|+1": 1,
            "user_nick_name": "@cname",            
            "user_sex|1":["男","女"],
            "user_avatar": "@image('200x100', @color , @cname)",
            "user_introduct": "@csentence(5)"                                    
        }
    ],
    msg: 'ok'
})
// 获取用户社交账号信息
Mock.mock('http://localhost:3000/user/account', {
    code: 200,
    "data": {
        "id|+1": 1,
        "phone": /\d{5,10}/,
        "email": "@email",
        "password": /\w\W\s\S\d\D/,
        "wx": /\w{5}\d{5}/,
        "qq": /\d{8,11}/
    }
})
// 获取文章评论
Mock.mock('http://localhost:3000/comment/1', {
    code: 200,
    "data|5-10": [{
        "id|+1": 1,
        "comment_creater": "@cname",
        "comment_creater_id|1-10": 1,
        "comment_receivcer": "@cname",
        "comment_receivcer_id|0-10": 0,
        "comment_cont": "@cparagraph(5, 10)",
        "comment_parent_id|0-10": 0,
        "article_id": 1
    }]
})