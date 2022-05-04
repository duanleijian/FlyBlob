import React,{ useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import style from './index.module.scss'
import { getUser } from '@/utils/auth'
import { updateArticle } from '@/api/article'
import RichText from '@/components/RichText'
import Message from '@/components/Message'
export default function UpdateArt() {
    const nav = useNavigate()
    const location = useLocation()    
    const [form, setForm] = useState({
        articleId: '',
        articleTip: '',
        articleTitle: '',
        articleContent: '',        
    })
    const [userInfo, setUserInfo] = useState({})
    const { state } = location
    useEffect(()=> {        
        const user = getUser()
        if (user) {                    
            let { articleId, articleTip, articleTitle, articleContent  } = state['detail']
            setUserInfo(user)
            setForm({...form, articleId, articleTip, articleTitle, articleContent})
        } else {
            Message.error('未登录用户无法操作!')
            nav('/account', {}) 
        }
    }, [])
    const titleChange = (e) => {        
        const curVal = e.target.value
        setForm({...form, articleTitle: curVal}) 
    }
    const getContent = (payload) => {                       
        let data = null                
        payload.mode.includes('html') && ( data = {...form, articleContent: payload.content, userId: userInfo.userId, articleTip: payload.text} )
        setForm(data)
        updateArticle(data).then(res => {
            if (res.code === 200) {
                Message.success('文章更新成功!')
                nav(`/profile/${1}`, {state: {curActive: "1"}})
            } else {
                Message.error('文章更新失败:' + res.msg)
            }
        })        
    } 
    return (
        <div className={style['update-art']}>
            <div className={style['update-art_title']}>
                <input className={style['update-art_title__input']} type="text" placeholder='填写文章标题' value={form.articleTitle} onChange={titleChange}/>
            </div>
            {form.articleContent? <RichText sendContent={getContent} html={form.articleContent}/> : ''}            
        </div>
    )
}
