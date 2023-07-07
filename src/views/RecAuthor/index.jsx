import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import classnames from 'classnames'
import style from './index.module.scss'
import { getUser, hasToken } from '@/utils/auth'
import { getUsersAndArticles, addConcat } from '@/api/user'
import defaultAvatar from  "@/common/images/default_avatar.png"
import Message from '@/components/Message'
import RecAuthorSkeleton from './skeleton.jsx'
export default function RecAuthor() {    
    const nav = useNavigate()
    const [fetchData, setFetchData] = useState(false)
    const [user, setUser] = useState({})
    let [list, setList] = useState([])
    useEffect(() => {
        getUsersAndArticles().then(res => {            
            res.code === 200 && (setList(res.data))
            setFetchData(true)
        })
        getUser() && (setUser(getUser()))
    }, [])
    const toArticleDetail = (e, id) => {
        e.stopPropagation? e.stopPropagation() : e.target.stopPropagation()
        nav(`/detail/${id}`, {})
    }
    const toAuthorDetail = (user) => {
        nav('/profile/0', {state: {curUser: user}})
    }
    const toggleFollow = (e, followStatus, targetId) => {
        e.stopPropagation()
        if (!JSON.stringify(user) === "{}") {
            if (hasToken()) {
                let userInfo = getUser()
                if(!followStatus) {                
                    let curIds = userInfo.userRelate? `${userInfo.userRelate},${targetId}` : `${targetId}`                                                       
                    userInfo.userRelate = curIds
                    addConcat({ ids: curIds, id: userInfo.userId }).then(res => {                 
                        if (res.code === 200) {
                            setUser(userInfo)                        
                            Message.success('关注成功!')
                        }
                        res.code !== 200 && (Message.error('关注失败!'))
                    })
                } else {
                    let ids = userInfo.userRelate.split(',')                
                    let index = ids.findIndex(i => Number(i) === Number(targetId))                                                
                    let curIds = ids.filter((i, cur) => cur !== index).join(',')
                    userInfo.userRelate = curIds
                    addConcat({ ids: curIds, id: userInfo.userId}).then(res => {
                        if (res.code === 200) {
                            setUser(userInfo)                        
                            Message.success('取消关注成功!')
                        }
                        res.code !== 200 && (Message.error('取消关注失败!'))
                    })
                }
                
            } else {
                Message.error('关注前请先注册或登录!')
            }
        } else {
            Message.error('操作请先注册或登录!')
        }        
    }
    return (
        <div className={style['recauthor']}>
            {
                !fetchData
                ? <RecAuthorSkeleton />
                : <div className={style['recauthor-list']}>
                {
                    list.map(i => {
                        return <div key={i.userId} className={style['recauthor-list_item']} onClick={() => { toAuthorDetail(i) }}>
                                    <div className={style['recauthor-list_item__avatar']}>
                                        <img src={i.userAvatar ? '/api' + i.userAvatar : defaultAvatar} alt="" />
                                    </div>
                                    <div className={style['recauthor-list_item__info']}>
                                        <h4 className={style['recauthor-list_item__info___name']}>{i.userNickName}</h4>
                                        <div className={style['recauthor-list_item__info___introduct']}>{i.userIntroduct ? i.userIntroduct : '暂无个人简介'}</div>
                                    </div>
                                    <div className={classnames(style['recauthor-list_item__follow'], {[style['recauthor-list_item__follow___active']]: user.userRelate? user.userRelate.includes(i.userId) : false})} onClick={(e) => { toggleFollow(e, user.userRelate? user.userRelate.includes(i.userId) : false, i.userId) }}>
                                        {user.userRelate && user.userRelate.includes(i.userId)? <><span className='iconfont icon-Ok'></span><span>已关注</span></> : <><span className='iconfont icon-jia'></span><span>关注</span></>}                                                                                
                                    </div>
                                    <div className={style['recauthor-list_item__articles']}>
                                        <div className={style['recauthor-list_item__articles___title']}>
                                            <div className={style['recauthor-list_item__articles___title____text']}>最近文章</div>
                                        </div>
                                        {
                                            i.concatArticles.slice(0, 3).map(article => {
                                                return <div key={article.articleId} className={style['recauthor-list_item__articles___tip']} onClick={(e) => { toArticleDetail(e, article.articleId) }}>{article.articleTitle.length > 18 ? article.articleTitle.substr(0, 18) + '...' : article.articleTitle}</div>
                                            })
                                        }
                                    </div>
                                </div>
                    })
                }
                </div>
                
            }
            
        </div>
    )
}
