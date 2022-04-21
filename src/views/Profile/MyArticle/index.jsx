import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import style from './index.module.scss'
import { getUser } from '@/utils/auth'
import { getArticlesByUser } from '@/api/article'
import NoData from '@/components/NoData'

export default function MyArticle({ author }) {
    const nav = useNavigate()
    const [list, setList] = useState([])
    useEffect(() => {
        if(author) {
            getArticlesByUser(author.userId).then(res => {                           
                res.code === 200 && (setList(res.data))
            })
        } else {
            let user = getUser()
            if (user) {
                getArticlesByUser(user.userId).then(res => {                           
                    res.code === 200 && (setList(res.data))
                })
            }
        }                
    }, [])
    const toDetail = (id) => {
        nav(`/detail/${id}`, {})
    }
    return (
        <div className={style['myarticle-list']}>
            {list.length ? '' : <NoData />}
            {
                list.map(i => {
                    return <div key={i.articleId} className={style['myarticle-list_item']} onClick={() => { toDetail(i.articleId) }}>
                                <div className={style['myarticle-list_item__title']}>{i.articleTitle}</div>
                                <div className={style['myarticle-list_item__content']}>{i.articleTip.length > 150? i.articleTip.substring(0, 150) + '...' : i.articleTip}</div>
                                <div className={style['myarticle-list_item__info']}>
                                    <div className={style['myarticle-list_item__info___icon']}>
                                        <span className='iconfont icon-zuozhe'></span>
                                        <span>{i.userNickName}</span>
                                    </div>
                                    <div className={style['myarticle-list_item__info___icon']}>
                                        <span className='iconfont icon-liulan'></span>
                                        <span>{i.articleViews}</span>
                                    </div>
                                    <div className={style['myarticle-list_item__info___icon']}>
                                        <span className='iconfont icon-dianzan'></span>
                                        <span>{i.articleLikes}</span>
                                    </div>
                                    <div className={style['myarticle-list_item__info___icon']}>
                                        <span className='iconfont icon-pinglun'></span>
                                        <span>{i.articleComments}</span>
                                    </div>
                                </div>
                            </div>
                })
            }
        </div>
    )
}
MyArticle.propTypes = {
    author: PropTypes.object
}
MyArticle.defaultProps = {
    author: null
}