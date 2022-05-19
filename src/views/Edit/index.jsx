import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import style from './index.module.scss'
import { getToken } from '@/utils/auth'
import { getUser } from '@/api/user'
import { addArticle } from '@/api/article'
import { html_encode } from '@/utils/encode'
import RichText from '@/components/RichText'
import Message from '@/components/Message'
export default function Edit() {
    let enableSubmit = false
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
    const getContent = (payload) => {                       
        let data = null        
        payload.mode.includes('json') && ( data = {...form, articleContent: html_encode(payload.content), userId: userInfo.userId} )                                                     
        payload.mode.includes('html') && ( data = {...form, articleContent: payload.content, userId: userInfo.userId, articleTip: payload.text} )
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
    return (
        <div className={style['edit']}>
            <div className={style['edit-title']}>
                <input className={style['edit-title_input']} type="text" placeholder='填写文章标题' value={form.articleTitle} onChange={titleChange}/>
            </div>
            <RichText sendContent={getContent}/>           
        </div>
    )
}
