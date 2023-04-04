import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import classnames from 'classnames'
import style from './index.module.scss'
import Message from '@/components/Message'
import { get, set, remove} from '@/utils/cookie'
import { login, register, getUser } from '@/api/user'
import { setToken, setUser } from '@/utils/auth'
export default function Account() {    
    const nav = useNavigate()
    const [cursor, setCursor] = useState(0)
    const [remember, setRemember] = useState(false)
    const [form, setForm] = useState({ userName: '', userPwd: '', userNickName: ''})
    useEffect(() => {
        const userRem = get()
        userRem? setRemember(true) : setRemember(false)
        userRem && (setForm({...form, userName: JSON.parse(userRem)['userName'], userPwd: JSON.parse(userRem)['userPwd']}))
    }, [])
    const toggleCursor = (index) => {
        setCursor(index)
    }
    const textChange = (e, prop) => {
        setForm({ ...form, [prop]: e.target.value })
    }
    const checkChange = (e) => {
        setRemember(e.target.checked)
        e.target.checked? set(JSON.stringify({ userName: form.userName, userPwd: form.userPwd }), 15) : remove()
    }
    const confirmLogin = () => {
        login(form).then(res => {
            if (res.code === 200) {
                setToken(res.data)
                getUser(res.data).then(result => {                                        
                    result.code === 200 && (setUser(result.data[0]))
                    result.code !== 200 && (Message.error('用户信息获取失败:' + result.msg))
                    nav('/home', {state: {enableUser: true}})
                })                
            }            
            res.code !== 200 && (Message.error(res.msg))
        })
    }
    const confirmRegister = () => {
        register(form).then(res => {
            if (res.code === 200) {
                setToken(res.data)
                getUser(res.data).then(result => {
                    result.code === 200 && (setUser(result.data[0]))
                    result.code !== 200 && (Message.error('用户信息获取失败:' + result.msg))
                    nav('/home', {state: {enableUser: true}})
                })                
            }            
            res.code !== 200 && (Message.error(res.msg))
        })
    }
    return (
        <div className={style['container']}>
            <div className={style['account']}>
                <div className={style['account-header']}>
                    <div className={classnames(style['account-header_item'], { [style['account-header_item__active']]: cursor === 0 })} onClick={() => { toggleCursor(0) }}>登录</div>
                    <div className={style['account-header_dot']}></div>
                    <div className={classnames(style['account-header_item'], { [style['account-header_item__active']]: cursor === 1 })} onClick={() => { toggleCursor(1) }}>注册</div>
                </div>
                <div className={style['account-form']}>
                    {
                        cursor === 1
                            ? <div className={style['account-form_item']}>
                                <div className={style['account-form_item__icon']}>
                                    <span className='iconfont icon-dikuaimingcheng'></span>
                                </div>
                                <input className={style['account-form_item__input']} type="text" value={form.userNickName} placeholder="请输入您的昵称" onChange={(e) => { textChange(e, 'userNickName') }} />
                            </div>
                            : ''
                    }
                    <div className={style['account-form_item']}>
                        <div className={style['account-form_item__icon']}>
                            <span className='iconfont icon-yonghutianchong'></span>
                        </div>
                        <input className={style['account-form_item__input']} type="text" value={form.userName} placeholder="请输入您的账户名称" onChange={(e) => { textChange(e, 'userName') }} />
                    </div>
                    <div className={style['account-form_item']}>
                        <div className={style['account-form_item__icon']}>
                            <span className='iconfont icon-mima'></span>
                        </div>
                        <input className={style['account-form_item__input']} type="password" value={form.userPwd} placeholder="请输入您的密码" onChange={(e) => { textChange(e, 'userPwd') }} />
                    </div>
                    { cursor === 0? <div className={style['account-remember']}>                    
                        <input type="checkbox" checked={remember} onChange={checkChange}/>
                        <span>记住密码</span>
                    </div> : ''}
                    { cursor === 0 ? <button className={style['account-login']} onClick={confirmLogin}>登录</button> : <button className={style['account-register']} onClick={confirmRegister}>注册</button> }
                </div>
            </div>
        </div>
    )
}
