import React,{ useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import style from './index.module.scss'
import { getUser } from '@/utils/auth'
import { updateArticle } from '@/api/article'
import RichEditor from '@/components/RichEditor'
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
    const getContent = () => {             
        let uuid = new Date().getTime()          
        let data = {...form, userId: userInfo.userId}               
        setForm(data)
        updateArticle(data).then(res => {
            if (res.code === 200) {
                Message.success('文章更新成功!')
                nav(`/profile/${1}?no=${uuid}`, {state: {curActive: "1"}})
            } else {
                Message.error('文章更新失败:' + res.msg)
            }
        })        
    } 

    const setText = (payload) => {
        setForm({...form, articleContent: payload.content, articleTip: payload.text})
    }

    return (
        <div className={style['update-art']}>
            <div className={style['update-art_title']}>
                <input className={style['update-art_title__input']} type="text" placeholder='填写文章标题' value={form.articleTitle} onChange={titleChange}/>
            </div>
            {form.articleContent? <RichEditor getText={setText} html={form.articleContent} readOnly={false}/> : ''}     
            <div className={style['update-btn']} onClick={getContent}>
                <span className='iconfont icon-bianji'></span>
                <div className={style['update-btn__text']} >更新</div>
            </div>       
        </div>
    )
}
