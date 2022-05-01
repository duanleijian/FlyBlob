
import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import style from './index.module.scss'
import 'draft-js/dist/Draft.css'
import { Editor, EditorState, convertFromRaw, CompositeDecorator, convertFromHTML } from 'draft-js'
import { stateFromHTML } from 'draft-js-import-html';
import { useNavigate, useLocation, useSearchParams, useParams } from 'react-router-dom'
import { customStyleMap, styles, findLinkEntities, getEntityStrategy } from './mixin'
import { dateFormat } from '@/utils/date'
import RelevantArticle from './RelevantArticle'
import Message from '@/components/Message'
import Author from './Author'
import Comment from './Comment'
import Actions from './Actions'
import { getArticle, updateArticleViews } from '@/api/article'
import { addConcat } from '@/api/user'
import { hasToken, getUser, setUser } from '@/utils/auth'
import defaultAvatar from  "@/common/images/default_avatar.png"

// 超链接组件
const Link = (props) => {
    const { url } = props.contentState.getEntity(props.entityKey).getData()
    return (
        <a href={url} style={styles.Link}>{props.children}</a>
    )
}
// 图片组件
const Image = (props) => {
    const { src } = props.contentState.getEntity(props.entityKey).getData()
    return <img src={src} style={styles.Image} alt='' />
}

export default function ShowRich(props) {    
    const nav = useNavigate()
    const [searchParams]= useSearchParams();	
    const location = useLocation()
    const params = useParams()
    const [detail, setDetail] = useState({})
    const [followStatus, setFollowStatus] = useState(false)
    const [editorState, setEditorState] = useState(null)                  
    useEffect(() => {        
        fetchDetail()
    }, [location.key])    
    const fetchDetail = () => {                       
        let id = searchParams.get('id') || params['id'] || location.state.id                               
        getArticle(id).then(res => {
            if(res.code === 200) {
                setDetail(res.data)                
            }            
            res.code !== 200 && (Message.error(`文章信息获取失败：${res.msg}`))
            checkFollowStatus(res.data)
        })
        updateArticleViews(id)
    }
    // const initCont = (article) => {
    //     let contentState = stateFromHTML(article.articleContent)
    //     const editorState = EditorState.createWithContent(contentState, new CompositeDecorator([
    //         {
    //             strategy: findLinkEntities,
    //             component: Link,
    //         },
    //         {
    //             strategy: getEntityStrategy('IMMUTABLE'),
    //             component: Image
    //         }
    //     ]))
    //     setEditorState(editorState)
    // }
    const toProfile = () => {
        nav('/profile/0', {})
    }
    const checkFollowStatus = (curDetail) => {
        if (hasToken()) {
            let userInfo = getUser()
            setFollowStatus(String(userInfo.userRelate).includes(curDetail.userId))                   
        }                 
    }
    const addFollow = () => {
        if (hasToken()) {
            let userInfo = getUser()
            if(!followStatus) {                
                let curIds = userInfo.userRelate? `${userInfo.userRelate},${detail.userId}` : `${detail.userId}`                                                       
                userInfo.userRelate = curIds
                addConcat({ ids: curIds, id: userInfo.userId }).then(res => {                 
                    if (res.code === 200) {
                        setUser(userInfo)
                        setFollowStatus(true)
                        Message.success('关注成功!')
                    }
                    res.code !== 200 && (Message.error('关注失败!'))
                })
            } else {
                let ids = userInfo.userRelate.split(',')                
                let index = ids.findIndex(i => Number(i) === Number(detail.userId))                                                
                let curIds = ids.filter((i, cur) => cur !== index).join(',')
                userInfo.userRelate = curIds
                addConcat({ ids: curIds, id: userInfo.userId}).then(res => {
                    if (res.code === 200) {
                        setUser(userInfo)
                        setFollowStatus(false)
                        Message.success('取消关注成功!')
                    }
                    res.code !== 200 && (Message.error('取消关注失败!'))
                })
            }
            
        } else {
            Message.error('关注前请先注册或登录!')
        }
    }
    return (
        <div className={style['detail']}>
            <div className={style['detail-header']}>
                <h1>{detail.articleTitle ? detail.articleTitle : ""}</h1>
                <div className={style['detail-header_info']}>
                    <div className={style['detail-header_info__avatar']} onClick={toProfile}>
                        <img src={detail.userAvatar ? '/api' + detail.userAvatar : defaultAvatar} alt="" />                        
                    </div>
                    <div className={style['detail-header_info__other']}>
                        <div className={style['detail-header_info__other___name']}>{detail.userNickName}</div>
                        <div className={style['detail-header_info__other___explain']}>
                            <span>{detail.articleDate? dateFormat(detail.articleDate, true) : ''}</span>
                            <span>阅读 {detail.articleViews ? detail.articleViews : 0}</span>
                            <span>字数 {detail.articleTip ? detail.articleTip.length : 0}</span>
                        </div>
                    </div>
                    {
                        detail.articleId ?
                            <div
                                className={classnames(style['detail-header_info__action'], {[style['detail-header_info__action___active']]: followStatus}) }
                                onClick={addFollow}>
                                    <span className={classnames('iconfont', {'icon-duigou': followStatus}, {'icon-jiahao': !followStatus})}></span>
                                    <span>{followStatus? '已关注' : '关注'}</span>                                
                            </div> : ''
                    }
                </div>
            </div>
            <div className={style['detail-cont']}>
                {/* {editorState ? <Editor editorState={editorState} readOnly={true} customStyleMap={customStyleMap}></Editor> : ''} */}
                <div className={style['detail-cont_html']} dangerouslySetInnerHTML={{__html: detail.articleContent}} />
            </div>
            <div className={style['detail-aside']}>
                <Author UserInfo={{ ...detail }}></Author>
                <RelevantArticle top="20px" article={detail}></RelevantArticle>
            </div>
            <Comment articleId={detail.articleId}/>
            <Actions data={detail}/>
        </div>
    )
}
