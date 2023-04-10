import React, { useState, useEffect, useRef } from 'react'
import style from './index.module.scss'
import FormTitle from '../FormTitle'
import Modal from '@/components/Modal'
import Message from '@/components/Message'
import { useLocation } from 'react-router-dom'
import { getUser, setUser, setToken } from '@/utils/auth'
import { sendEmail, verEmail, resetPassword } from '@/api/user'
function AccountConfig() {
    const [account, setAccount] = useState({userEmail: '', userPwd: ''})
    const [emailShow, setEmailShow] = useState(false)
    const [pwdShow, setPwdShow] = useState(false)
    const [email, setEmail] = useState('')
    const [code, setCode] = useState('')
    const [time, setTime] = useState(60)
    const [timeControl, setTimeControl] = useState(null)
    const [editPwd] = useState(false)
    const [password, setPassword] = useState('')
    const timeRef = useRef()    
    const location = useLocation()
    
    useEffect(() => {
        if (location?.state?.author) {
            setAccount(location.state.author)
        } else {
            getUser() && setAccount(getUser())
        }
    }, [])    
    useEffect(() => {              
        timeRef.current = {time}        
        time === 0 && (endCaclTime())
    }, [time])
    const toggleEmailShow = () => {
        setEmailShow(true)
    }
    const triggerClose = (show) => {
        setEmailShow(show)
    }
    const triggerCancel = () => {
        setEmailShow(false)
    }
    const triggerConfirm = () => {
        verEmail({code, time: new Date().getTime()}).then(res => {            
            if (res.code === 200) {
                setUser(res.data)
                Message.success('验证通过!')
            }            
            res.code !== 200 && (Message.error(res.msg))
            setEmailShow(false)
            setEmail('')
            setCode('')
            endCaclTime()
        })
    }    
    const emailChange = (e) => {
        setEmail(e.target.value)
    }
    const codeChange = (e) => {
        setCode(e.target.value)
    }
    const getAuthCode = () => {
        sendEmail({email: email? email : account.userEmail, userId: account.userId}).then(res => {
            startCaclTime()
        })
    }
    const startCaclTime = () => {
        let timer = setInterval(() => {            
            setTime(timeRef.current.time - 1)
        }, 1000)
        setTimeControl(timer)        
    }
    const endCaclTime = () => {
        clearInterval(timeControl)
        setTimeControl(null)
    }
    const toggleEditPwd = () => {
        if(account.userEmail) {
            setPwdShow(true)
        } else {
            Message.error('请先绑定邮箱再继续操作!')
        }        
    }
    const pwdClose = (show) => {
        setPwdShow(show)
    }
    const passwordChange = (e) => {
        setPassword(e.target.value)
    }
    const updatePassword = () => {        
        resetPassword({code, userPwd: password, time: new Date().getTime()}).then(res => {            
            if (res.code === 200) {                
                setUser(res.data.user)
                setToken(res.data.token)
                Message.success('密码修改成功!')
            }            
            res.code !== 200 && (Message.error(res.msg))
            setPwdShow(false)
            setPassword('')            
            setCode('')
            endCaclTime()            
        })        
    }
    return (
        <div className={style['account-config']}>
            <FormTitle title="社交账号"/>            
            <div className={style['account-config__tip']}>社交安全信息、认证信息</div>
            <div className={style['account-config_form']}>
                <div className={style['account-config_form__item']}>
                    <div className={style['account-config_form__item___left']}>
                        <span>邮箱</span>
                        <span>{account.userEmail? account.userEmail : '请绑定'}</span>                        
                    </div>
                    <div className={style['account-config_form__item___right']} onClick={toggleEmailShow}>编辑</div>
                </div>
                <div className={style['account-config_form__item']}>
                    <div className={style['account-config_form__item___left']}>
                        <span>密码</span>
                        {
                            account.userPwd
                            ? <input className={style['account-config_form__item___pwd']} type="password" value={account.userPwd} disabled={!editPwd}/>
                            : <span>请输入</span>
                        }
                    </div>
                    <div className={style['account-config_form__item___right']} onClick={toggleEditPwd}>编辑</div>
                </div>
            </div>
            <Modal open={emailShow} title="邮箱绑定" onClose={triggerClose} onConfirm={triggerConfirm} onCancel={triggerCancel}>
                <div className={style['modal-content']}>
                    <div className={style['modal-content_item']}>
                        <div className={style['modal-content_item__label']}>
                            <span className='iconfont icon-youxiang'></span>
                        </div>
                        <div className={style['modal-content_item__input']}>
                            <input type="text" placeholder='请输入邮箱地址' value={email} onChange={emailChange} />
                        </div>
                    </div>
                    <div className={style['modal-content_input']}>
                        <input className={style['modal-content_input__val']} type="text" value={code} onChange={codeChange}/>
                        <div className={style['modal-content_input__link']} >
                            {!timeControl? <span className={style['modal-content_input__link___get']}  onClick={getAuthCode}>获取验证码</span> : <span className={style['modal-content_input__link___time']}>{time}秒后重新发送</span>}                                                        
                        </div>
                    </div>
                </div>
            </Modal>
            <Modal open={pwdShow} title="修改密码" btnClose={true} onClose={pwdClose} >
                <div className={style['modal-content']}>
                    <div className={style['modal-content_email']}>绑定电子邮箱: {account.userEmail}</div>
                    <div className={style['modal-content_input']}>
                            <input className={style['modal-content_input__val']} type="text" value={code} onChange={codeChange} placeholder="输入验证码"/>
                            <div className={style['modal-content_input__link']} >
                                {!timeControl? <span className={style['modal-content_input__link___get']}  onClick={getAuthCode}>获取验证码</span> : <span className={style['modal-content_input__link___time']}>{time}秒后重新发送</span>}                                                        
                            </div>
                    </div>
                    <div className={style['modal-content_input']}>
                        <input className={style['modal-content_input__val']}  type="password" value={password} onChange={passwordChange} placeholder="请输入重置密码"/>                            
                    </div>
                    <div className={style['modal-content_btn']} onClick={updatePassword}>修改</div>
                </div>
            </Modal>
        </div>
    )
}
export default AccountConfig;

