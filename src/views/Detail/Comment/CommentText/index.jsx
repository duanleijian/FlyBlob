import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import style from './index.module.scss'
import Message from '@/components/Message'
import PubSub from 'pubsub-js'
import { getNow } from '@/utils/date'
import { getToken, getUser } from '@/utils/auth'
import { addComment } from '@/api/comment'
import defaultAvatar from  "@/common/images/default_avatar.png"
export default function CommentText(props) {    
    const { data, width, height, enableReply, changeShow } = props    
    const [userInfo, setUserInfo] = useState({})
    const [form, setForm] = useState({})
    const [text, setText] = useState('')
    const [textTip, setTextTip] = useState('请输入你的评论...')
    useEffect(() => {        
        getUser() && ( setUserInfo(getUser()) )        
    }, [])
    useEffect(() => {
        if (JSON.stringify(data) !== '{}' && enableReply) {
            setTextTip('@' + data.commentCreater)
        }                
    }, [data])
    const textChange = (e) => {
        let val = e.value || e.target.value
        setText(val)
    }
    const publishComment = () => {        
        if (getToken()) {
            if (data.articleId) {
                let commentForm = {
                    commentCreaterId: userInfo.userId,
                    commentCreater: userInfo.userNickName,
                    commentCreaterProd: userInfo.userIntroduct,
                    commentCreaterAvatar: userInfo.userAvatar,
                    commentReceivcerId: data.commentCreaterId,
                    commentReceivcer: data.commentCreater,
                    commentReceivcerAvatar: data.commentCreaterAvatar,
                    commentCont: text,
                    articleId: data.articleId,
                    commentParentId: enableReply? data.commentParentId :  data.commentId,
                    commentDate: getNow()                  
                }
                setForm(commentForm)            
                setText('')
                addComment(commentForm).then(res => {
                    if (res.code === 200) {
                        Message.success('评论发布成功！')                        
                        PubSub.publish('commentForceUpdate', {})
                    } else {
                        Message.error('评论发布失败: ' + res.msg)
                    }                    
                    changeShow()
                })
            } else {
                Message.warn('等待评论数据加载再操作!')
            }                                              
        } else {
            Message.warn('请先登录再操作!')
        }        
    }
    return <div className={style['comment-keyin']} style={{width, height}}>        
        <div className={style['comment-keyin_cont']}>
            <div className={style['comment-keyin_cont__avatar']}>
                <img src={userInfo.userAvatar ? '/api' + userInfo.userAvatar : defaultAvatar} alt="" />
            </div>
            <div className={style['comment-keyin_cont__input']}>
                <textarea placeholder={textTip} onChange={textChange} value={text}></textarea>
                <div className={style['comment-keyin_cont__input___action']}>
                    <button onClick={publishComment}>发表</button>
                </div>
            </div>
        </div>
    </div>
}
CommentText.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    data: PropTypes.object,
    enableReply: PropTypes.bool,
    changeShow: PropTypes.func
}
CommentText.defaultProps = {
    width: '100%',
    height: 'auto',
    data: {},
    enableReply: false,
    changeShow: PropTypes.func
}
