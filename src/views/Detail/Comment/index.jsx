import React, { useState, useEffect } from 'react'
import style from './index.module.scss'
import PropTypes from 'prop-types'
import { handleTree } from '@/utils/tree'
import Item from './Item'
import Message from '@/components/Message'
import CommentText from './CommentText'
import { getUser, getToken } from '@/utils/auth'
import { getCommentList, addComment } from '@/api/comment'
import PubSub from 'pubsub-js'
import defaultAvatar from  "@/common/images/default_avatar.png"
export default function Comment(props) {

    let { top, articleId } = props    
    const [text, setText] = useState('')
    const [form, setForm] = useState({})
    const [total, setTotal] = useState(0)
    const [comments, setComments] = useState([])
    const [userInfo, setUserInfo] = useState({})
    
    useEffect(() => {        
        getToken() && ( setUserInfo(getUser()) )        
    }, [])

    useEffect(() => {
        if (articleId) {
            fetchComment(articleId)
            listenUpdate()
        }         
    }, [articleId])

    const fetchComment = (id) => {
        getCommentList(id).then(res => {
            if (res.code === 200) {
                setTotal(res.data.length)
                let comments = res.data.map(i => ({...i, children: []}))                
                let result = handleTree(comments, null, 'commentParentId', 'commentId')                
                setComments(result)
            } else {
                Message.error('评论获取失败: ' + res.msg)
            }
        })
    }

    const textChange = (e) => {
        let val = e.value || e.target.value
        setText(val)
    }

    const publishComment = () => {
        if (getToken()) {
            let commentForm = {
                commentCreaterId: userInfo.userId,
                commentCreater: userInfo.userNickName,
                commentCreaterProd: userInfo.userIntroduct,
                commentCreaterAvatar: userInfo.userAvatar,
                commentReceivcerId: null,
                commentReceivcer: '',
                commentReceivcerAvatar: '',
                commentCont: text,
                articleId: articleId,
                commentParentId: null,
            }
            setForm(commentForm)
            setText('')            
            addComment(commentForm).then(res => {
                if (res.code === 200) {
                    Message.success('评论发布成功！')
                    fetchComment(articleId)
                } else {
                    Message.error('评论发布失败: ' + res.msg)
                }                
            })
        } else {
            Message.warn('请先登录再操作!')
        }        
    }
    
    const listenUpdate = () => {
        PubSub.subscribe('commentForceUpdate', (msg, data) => {
            fetchComment(articleId)
        })
    }

    return (
        <div className={style['comment']} style={{ marginTop: top }}>
            <div className={style['comment-keyin']}>
                <div className={style['comment-keyin_title']}>我的评论</div>
                <div className={style['comment-keyin_cont']}>
                    <div className={style['comment-keyin_cont__avatar']}>
                        <img src={userInfo.userAvatar ? '/api' + userInfo.userAvatar : defaultAvatar} alt="" />                        
                    </div>
                    <div className={style['comment-keyin_cont__input']}>
                        <textarea placeholder='请输入你的评论...' onChange={textChange} value={text}></textarea>
                        <div className={style['comment-keyin_cont__input___action']}>
                            <button onClick={publishComment}>发表</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* {
                articleId ? <CommentText data={{ commentReceivcerId: null, commentReceivcer: '', commentReceivcerAvatar: '', articleId: articleId, commentParentId: null}} enableReply={false}/> : ''
            }             */}
            <div className={style['comment-all']}>
                <div className={style['comment-all_title']}>所有评论({total})</div>
            </div>
            <div className={style['comment-list']}>
                {
                    comments.map(i => {
                        return <Item key={i.commentId} data={i}/>
                    })
                }
            </div>
        </div>
    )
}

Comment.propTypes = {
    top: PropTypes.string,
    articleId: PropTypes.number
}

Comment.defaultProps = {
    top: '20px',
    articleId: null
}
