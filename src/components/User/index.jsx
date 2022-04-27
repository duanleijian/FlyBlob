import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './index.scss'
import PropTypes from 'prop-types'
import { getUser } from '@/api/user'
import { getToken, delToken, setUser, delUser } from '../../utils/auth'
import Message from '@/components/Message'
export default function User(props) {
    let { menu, avatar, isLogin, enabledHttp } = props
    let nav = useNavigate()
    let { pathname } = useLocation()
    let [userInfo, setUserInfo] = useState({ avatar })
    let [hasLogin, setHasLogin] = useState(isLogin)    
    useEffect(() => {        
        fetchData()
    }, [pathname])
    const fetchData = () => {
        const token = getToken()                   
        if (token) {
            getUser(token).then(res => {
                console.log('user-cpn', res)
                if (res.code === 200) {                    
                    setUserInfo(res.data[0])
                    setUser(res.data[0])
                    setHasLogin(true)
                } else {
                    Message.error(res.msg)
                }
            })
        }
    }
    const confirmLogin = () => {        
        nav('/account', {})
    }
    const runCase = (name) => {
        switch (name) {
            case '个人中心':
                nav(`/profile/${0}`, {state: {curActive: "0"}})
                break
            case '我点赞的博文':
                nav(`/profile/${1}`, {state: {curActive: "2"}})
                break
            case '我喜欢的博文':
                nav(`/profile/${2}`, {state: {curActive: "4"}})
                break
            case '我收藏的博文':
                nav(`/profile/${3}`, {state: {curActive: "3"}})
                break            
            case '设置':
                nav('/person/account', {})
                break
            case '退出':
                delToken()
                delUser()
                setHasLogin(false)
                nav('/', {})
                break
            default: break
        }
    }
    if (hasLogin) {
        return (
            <div className='user-avatar'>
                <div className='user-avatar_img'>
                    <img src={userInfo.userAvatar? '/api' + userInfo.userAvatar : avatar} alt="" />
                </div>
                <div className='user-menu'>
                    {
                        menu.map((item, index) => {
                            return <div key={index} className='user-menu_item' onClick={() => { runCase(item.name) }}>
                                <span className={`iconfont ${item.icon}`}></span>
                                <span className='user-menu_item_text'>{item.name}</span>
                                {/* {item.count ? <div className='user-menu_item__count'>{item.count}</div> : ''} */}
                            </div>
                        })
                    }
                </div>
            </div>
        )
    } else {
        return (
            <div className='login-btn' onClick={confirmLogin}>登录</div>
        )
    }


}
User.propTypes = {
    menu: PropTypes.array,
    avatar: PropTypes.string,
    isLogin: PropTypes.bool,
    enabledHttp: PropTypes.bool
}
User.defaultProps = {
    menu: [
        { icon: 'icon-yonghu', name: '个人中心', count: 0 },
        // { icon: 'icon-xiaoxi', name: '我的消息中心', count: 1 },
        { icon: 'icon-dianzan', name: '我点赞的博文', count: 0 },
        { icon: 'icon-xihuan', name: '我喜欢的博文', count: 0 },
        { icon: 'icon-shoucang', name: '我收藏的博文', count: 0 },
        { icon: 'icon-shezhi', name: '设置' },
        { icon: 'icon-h', name: '退出' }],
    avatar: 'assets/default/default_avatar.png',
    isLogin: false,
    enabledHttp: false
}
