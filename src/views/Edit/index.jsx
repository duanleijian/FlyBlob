import React, { useState, useEffect, useRef, Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import style from './index.module.scss'
import { getToken } from '@/utils/auth'
import { getUser } from '@/api/user'
import { addArticle } from '@/api/article'
import RichEditor from '../../components/RichEditor'
import Message from '@/components/Message'

export default function Edit() {
    const nav = useNavigate()
    const ref = useRef()        
    const [form, setForm] = useState({
        userId: '',
        articleTip: '',
        articleTitle: '',
        articleContent: '',
        articleViews: 0,
        articleLikes: 0,
        articleCollects: 0,
        articleComments: 0,
        articleLoves: 0
    })
    const [userInfo, setUserInfo] = useState({})

    useEffect(() => {
        let token = getToken()
        if (token) {
            getUser(token).then(res => {
                res.code === 200 && (setUserInfo(res.data[0]))               
            })
        } else {
            nav('/account', {})
        }
    }, [])

    useEffect(() => {
        ref.current = form        
    }, [form])   

    const titleChange = (e) => {        
        const curVal = e.target.value
        setForm({...form, articleTitle: curVal}) 
    }

    const getContent = () => {                       
        let data = {...form, userId: userInfo.userId}        
        setForm(data)
        addArticle(data).then(res => {
            if (res.code === 200) {
                Message.success('文章发布成功!')
                nav(`/profile/1`, {state: {curActive: "1"}})
            } else {
                Message.error('文章发布失败:' + res.msg)
            }
        })        
    } 
    
    const setText = (payload) => {
        setForm({...form, articleContent: payload.content, articleTip: payload.text})
    }

    return (
        <Fragment>
            <div className={style['edit']}>
                <div className={style['edit-title']}>
                    <input className={style['edit-title_input']} type="text" placeholder='填写文章标题' value={form.articleTitle} onChange={titleChange}/>
                </div>
                <div className={style['edit-content']}>
                    <RichEditor getText={setText} readOnly={false}/>
                </div>
                <div className={style['edit-publish']} onClick={getContent}>
                    <span className='iconfont icon-fabu'></span>
                    <div className={style['edit-publish__text']}>发布</div>
                </div>
            </div>
            
        </Fragment>
    )
}
