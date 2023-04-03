import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import style from './index.module.scss'
import { getUser } from '@/utils/auth'
import TopTabs from '@/components/TopTabs'
import Search from '@/components/Search'
import User from '@/components/User'
import Message from '@/components/Message'
export default function TopHeader(props) {
    const { content } = props, nav = useNavigate()
    const { state, pathname } = useLocation()
    const [ userInfo, setUserInfo ] = useState({})
    useEffect(() => {        
        getUser() && (setUserInfo(getUser()))
    }, [])
    useEffect(() => {
        getUser() && (setUserInfo(getUser()))
    }, [pathname])        
    const editArticle = () => {
        if (JSON.stringify(userInfo) !== "{}") {
            nav('/edit', {})
        } else {
            Message.error('请先登录再操作!')
        }        
    }
    return (
        <div className={style['top-header']}>
            <div className={style['top-header_logo']}>
                <span className={style['top-header_logo__text']}>飞识</span>
            </div>
            <TopTabs/>
            <Search content={content}/>
            <div className={style['create-article']} onClick={editArticle}>
                <span className='iconfont icon-yongyan'></span>
                <span className={style['create-article_text']}>写博文</span>
            </div>
            <User enabledHttp={state? state['enableUser'] : false}/>
        </div>
    )
}
TopHeader.propTypes = {
    content: PropTypes.string
}
TopHeader.defaultProps = {
    content: ''
}
