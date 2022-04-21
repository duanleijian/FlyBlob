import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import style from './index.module.scss'
import { getUsersAndArticles } from '@/api/user'
export default function RecAuthor() {
    const defaultAvatar = 'assets/default/default_avatar.png'
    const nav = useNavigate()
    let [list, setList] = useState([])
    useEffect(() => {
        getUsersAndArticles().then(res => {            
            res.code === 200 && (setList(res.data))
        })
    }, [])
    const toArticleDetail = (e, id) => {
        e.stopPropagation? e.stopPropagation() : e.target.stopPropagation()
        nav(`/detail/${id}`, {})
    }
    const toAuthorDetail = (user) => {
        nav('/profile/0', {state: {curUser: user}})
    }
    return (
        <div className={style['recauthor']}>
            <div className={style['recauthor-list']}>
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
        </div>
    )
}
