import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import style from './index.module.scss'
import { getUser } from '@/utils/auth'
import { getAllCount } from '@/api/user'
import defaultAvatar from  "@/common/images/default_avatar.png"
export default function UserCard({ author }) {    
    const nav = useNavigate()    
    const [user, setUser] = useState({})
    const [counts, setCounts] = useState({articles: 0, collects: 0, fans: 0, follow: 0, likes: 0, loves: 0})
    useEffect(() => {                
        getUser() && setUser(getUser())
    }, [])
    useEffect(() => {
        JSON.stringify(user) !== "{}" && fetchData()
    }, [user])
    const fetchData = () => {        
        getAllCount(user.userId).then(res => {                                 
            res.code === 200 && (setCounts(res.data))
        })
    }
    const editUserInfo = () => {        
        nav('/person/account', { state: { author } })
    }
    return (
        <div className={style['user-card']}>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <div className={style['user-card_avatar']}>
                    <img className={style['user-card_avatar__img']} src={user.userAvatar? '/api' + user.userAvatar : defaultAvatar} alt="" />
                </div>
                <div className={style['user-card_info']}>
                    <div className={style['user-card_info__name']}>{user.userNickName}</div>
                    <div className={style['user-card_info__count']}>
                        <div className={style['user-card_info__count___item']}>
                            <span className=''>关注</span>
                            <span className=''>{counts.follow}</span>                                
                        </div>
                        <div className={style['user-card_info__count___item']}>
                            <span className=''>粉丝</span>
                            <span className=''>{counts.fans}</span>                                
                        </div>
                        <div className={style['user-card_info__count___item']}>
                            <span className=''>文章</span>
                            <span className=''>{counts.articles}</span>                                
                        </div>
                        <div className={style['user-card_info__count___item']}>
                            <span className=''>点赞</span>
                            <span className=''>{counts.likes}</span>                                
                        </div>
                        <div className={style['user-card_info__count___item']}>
                            <span className=''>收藏</span>
                            <span className=''>{counts.collects}</span>                                
                        </div>
                        <div className={style['user-card_info__count___item']}>
                            <span className=''>喜欢</span>
                            <span className=''>{counts.loves}</span>                                
                        </div>
                    </div>
                </div>
            </div>            
            <div className={style['user-card_profile']} >
                <div className={style['user-card_profile__left']}>
                    <span className={`${style['user-card_profile__left___icon']} iconfont icon-gerenziliao`}></span>
                    <span>个人信息</span>
                </div>
                {
                    JSON.stringify(user) !== "{}"
                    ?   <div className={style['user-card_profile__right']} onClick={editUserInfo}>
                            <span>编辑个人资料</span>
                            <span className={`${style['user-card_profile__left___icon']} iconfont icon-youjiantou`}></span>
                        </div>
                    : ''
                }
            </div>
        </div>
    )
}
UserCard.propTypes = {
    author: PropTypes.object
}
UserCard.defaultProps = {
    author: null
}
