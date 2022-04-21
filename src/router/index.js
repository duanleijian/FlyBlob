import React, { lazy } from 'react'
// 组件懒加载
const lazyLoad = (func, meta) => {
    const Element = lazy(func)
    return <Element meta={meta} />
}
const routes = [
    {
        path: '/',
        element: lazyLoad(() => import('@/views/index'), { title: '首页' }),                
        children: [
            {
                path: 'home',
                element: lazyLoad(() => import('@/views/Home/index'), { title: '文章' })
            },
            {
                path: 'search',
                element: lazyLoad(() => import('@/views/Search/index'), { title: '搜索' })
            },
            {
                path: 'profile/:active',
                element: lazyLoad(() => import('@/views/Profile/index'), { title: '个人中心' })
            },
            {
                path: 'person',
                element: lazyLoad(() => import('@/views/PersonInfo/index'), { title: '编辑个人资料' }),
                children: [
                    {
                        path: 'myinfo',
                        element: lazyLoad(() => import('@/views/PersonInfo/MyInfo/index'), {}),
                    },
                    {
                        path: 'account',
                        element: lazyLoad(() => import('@/views/PersonInfo/AccountConfig/index'), {}),
                    }
                ]
            },
            {
                path: 'edit',
                element: lazyLoad(() => import('@/views/Edit/index'), {title: '编辑文章'})
            },
            {
                path: 'detail/:id',
                element: lazyLoad(() => import('@/views/Detail/index'), {title: '文章详情'})
            },
            {
                path: 'authors',
                element: lazyLoad(() => import('@/views/RecAuthor/index'), {title: '上榜作者'})
            },
            {
                path: 'follows',
                element: lazyLoad(() => import('@/views/Follow/index'), {title: '我的关注'})
            }            
        ]
    },
    {
        path: '/account',
        element: lazyLoad(() => import('@/views/Account/index'), {title: '登录'})
    },
    {
        path: '*',
        element: lazyLoad(() => import('@/views/NotFound/index'), { title: '404' })
    }
]
export default routes