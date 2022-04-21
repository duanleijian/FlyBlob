import React, { useState, useEffect } from 'react'
import style from './index.module.scss'
import classname from 'classnames'
import PropTypes from 'prop-types'
import { dateFormat } from '@/utils/date'
import { getUser } from '@/utils/auth'
import { getArticlesByAction } from '@/api/article'
import NoData from '@/components/NoData'
export default function MyDynamic({ author }) {
    const defaultAvatar = 'assets/default/default_avatar.png'
    const [userInfo, setUserInfo] = useState({})
    const [list, setList] = useState([])
    useEffect(() => {
        if(author) {
            setUserInfo(author)
            getArticlesByAction(author.userId, 'all').then(res => {                                           
                res.code === 200 && (setList(res.data))
            })    
        } else {
            let user = getUser()
            setUserInfo(user)
            if (user) {
                getArticlesByAction(user.userId, 'all').then(res => {                             
                    res.code === 200 && (setList(res.data))
                })
            }
        }          
    }, [])
    return (
        <div className={style['myarticle-list']}>
            { list.length? '' : <NoData />}
            {
                list.map(i => {
                    return  <div key={i.articleId} className={style['myarticle-list_item']}>
                                <div className={style['myarticle-list_item__top']}>
                                    <div className={style['myarticle-list_item__top___info']}>
                                        <img className={style['myarticle-list_item__top___info____avatar']} src={i.userAvatar? '/api' + i.userAvatar : defaultAvatar} alt="" />
                                        <div className={style['myarticle-list_item__top___info____other']}>
                                            <span>{i.userNickName}</span>
                                            <span>{i.articleDate? dateFormat(i.articleDate) : ""}</span>                                                                                        
                                        </div>
                                    </div>
                                    <div className={style['myarticle-list_item__top___follow']}>
                                        <span>关注</span>
                                        <span className={`${style['myarticle-list_item__top___follow____icon']} iconfont icon-jiahao` }></span>
                                    </div>
                                </div>
                                <div className={style['myarticle-list_item__title']}>{i.articleTitle}</div>
                                <div className={style['myarticle-list_item__cont']}>{i.articleTip.length > 150? i.articleTip.substring(0, 150) + '...' : i.articleTip}</div>
                                <div className={style['myarticle-list_item__actions']}>
                                    <div className={classname(style['myarticle-list_item__actions___item'], {[style['myarticle-list_item__actions___item____active']] : i.action_like})}>
                                        <span className='iconfont icon-dianzan'></span>
                                        <span>点赞</span>
                                    </div>
                                    <div className={classname(style['myarticle-list_item__actions___item'], {[style['myarticle-list_item__actions___item____active']] : i.action_love})}>
                                        <span className='iconfont icon-xihuan'></span>
                                        <span>喜欢</span>
                                    </div>
                                    <div className={classname(style['myarticle-list_item__actions___item'], {[style['myarticle-list_item__actions___item____active']] : i.action_collect})}>
                                        <span className='iconfont icon-shoucang'></span>
                                        <span>收藏</span>
                                    </div>
                                </div>
                            </div>
                })
            }
        </div>
    )
}
MyDynamic.propTypes = {
    author: PropTypes.object
}
MyDynamic.defaultProps = {
    author: null
}
