import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import style from './index.module.scss'
import { getAuthorCounts } from '@/api/user'
import defaultAvatar from  "@/common/images/default_avatar.png"
export default function Author(props) {    
    const { UserInfo } = props    
    const [user, setUser] = useState({})
    const [count, setCount] = useState({articles: 0, follows: 0, likes: 0})           
    useEffect(() => {                     
        setUser(() => {            
            Object.keys(UserInfo).length && getCount()            
            return UserInfo
        })                                       
    }, [UserInfo])
    const getCount = () => {
        getAuthorCounts(UserInfo.userId).then(res => {
            res.code === 200 && (setCount(res.data))
        })                
    }
    return (
        <div className={style['author-card']}>
            <div className={style['author-card_header']}>
                <div className={style['author-card_header__avatar']}>
                    <img src={user.userAvatar? '/api' + user.userAvatar : defaultAvatar} alt="" />
                </div>
                <div className={style['author-card_header__info']}>
                    <span className=''>{user.userNickName}</span>
                    <span className=''>{user.userIntroduct? String(user.userIntroduct).substring(0, 10) + '...' : '暂无个人简介'}</span>
                </div>
            </div>
            <div className={style['author-card_cont']}>
                <div className={style['author-card_cont__item']}>发布{count.articles}篇文章</div>
                <div className={style['author-card_cont__item']}>拥有{count.follows}名关注者</div>
                <div className={style['author-card_cont__item']}>点赞了{count.likes}篇文章</div>
            </div>
        </div>
    )
}
Author.propTypes = {
    UserInfo: PropTypes.object
}
Author.defaultProps = {
    UserInfo: {}
}
