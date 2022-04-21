import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import style from './index.module.scss'
import { getUser } from '@/utils/auth'
import { getArticlesByAction } from '@/api/article'
import NoData from '@/components/NoData'
export default function MyCollect({ author }) {
    const nav = useNavigate()
    const [userInfo, setUserInfo] = useState({})
    const [list, setList] = useState([])
    useEffect(() => {
        if (author) {
            getArticlesByAction(author.userId, 'action_collect').then(res => {                
                res.code === 200 && (setList(res.data))
            })
        } else {
            let user = getUser()
            setUserInfo(user)
            if (user) {
                getArticlesByAction(user.userId, 'action_collect').then(res => {                
                    res.code === 200 && (setList(res.data))
                })
            }
        }          
    }, [])
    const toDetail = (id) => {
        nav(`/detail/${id}`, {})
    }
    return (
        <div className={style['mycollect-list']}>
            {list.length ? '' : <NoData />}
            {
                list.map(i => {
                    return <div key={i.articleId} className={style['mycollect-list_item']} onClick={() => { toDetail(i.articleId) }}>
                        <div className={style['mycollect-list_item__title']}>{i.articleTitle}</div>
                        <div className={style['mycollect-list_item__content']}>{i.articleTip.length > 150? i.articleTip.substring(0, 150) + '...' : i.articleTip}</div>
                        <div className={style['mycollect-list_item__info']}>
                            <div className={style['mycollect-list_item__info___left']}>
                                <div className={style['mycollect-list_item__info___icon']}>
                                    <span className='iconfont icon-zuozhe'></span>
                                    <span>{i.userNickName}</span>
                                </div>
                                <div className={style['mycollect-list_item__info___icon']}>
                                    <span className='iconfont icon-liulan'></span>
                                    <span>{i.articleViews}</span>
                                </div>
                                <div className={style['mycollect-list_item__info___icon']}>
                                    <span className='iconfont icon-dianzan'></span>
                                    <span>{i.articleLikes}</span>
                                </div>
                                <div className={style['mycollect-list_item__info___icon']}>
                                    <span className='iconfont icon-pinglun'></span>
                                    <span>{i.articleComments}</span>
                                </div>
                            </div>
                            <div className={style['mycollect-list_item__info___right']}>
                                <span>{userInfo.userNickName}</span>
                                <span>收藏了这篇文章</span>
                            </div>                                                        
                        </div>
                        <div className={style['mycollect-list_item__info___collect']}>
                                <span className='iconfont icon-shoucang1'></span>
                            </div>
                    </div>
                })
            }
        </div>
    )
}
MyCollect.propTypes = {
    author: PropTypes.object
}
MyCollect.defaultProps = {
    author: null
}