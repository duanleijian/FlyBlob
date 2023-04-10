import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { dateToText } from '@/utils/date'
import style from './index.module.scss'
import CommentText from '../CommentText'
import defaultAvatar from  "@/common/images/default_avatar.png"
export default function Item(props) {
    let { data, width, enableReply } = props        
    const [showComm, setShowComm] = useState(false)
    const toggleComm = () => {
        setShowComm(!showComm)
    }    
    const changeShow = (data) => {
        setShowComm(false)
    }
    return (
        <div className={style['comment-item']} style={{ width }}>
            <div className={style['comment-item-left']}>
                <img className={style['comment-item-left_avatar']} src={data.commentCreaterAvatar ? '/api' + data.commentCreaterAvatar : defaultAvatar} alt="" />                
            </div>
            <div className={style['comment-item-cont']}>
                <div className={style['comment-item-cont_top']}>
                    <div className={style['comment-item-cont_top__info']}>
                        <div className={style['comment-item-cont_top__info___name']}>{data.commentCreater}</div>
                        {
                            enableReply
                            ? <div className={style['comment-item-cont_top__info___replyer']}>
                                 <span>回复</span>
                                 <span>{data.commentReceivcer}</span>
                              </div>
                            : <div className={style['comment-item-cont_top__info___prod']}>{data.commentCreaterProd ? String(data.commentCreaterProd).substring(0, 20) + '...' : '暂无个人简介'}</div>
                        }

                    </div>
                    <div className={style['comment-item-cont_top__date']}>{dateToText(data.commentDate)}</div>
                </div>
                <div className={style['comment-item-cont_text']}>{data.commentCont}</div>
                <div className={style['comment-item-cont_actions']}>
                    <div className={style['comment-item-cont_actions__item']}>
                        <span className='iconfont icon-dianzan'></span>
                        <div>赞</div>
                    </div>
                    <div className={style['comment-item-cont_actions__item']} onClick={toggleComm}>
                        <span className='iconfont icon-xiaoxi'></span>
                        <div>{showComm ? '取消回复' : '回复'}</div>
                    </div>
                </div>
                <div className={style['comment-item-cont_show']} style={{ height: showComm ? '200px' : '0px' }}>
                    <CommentText data={data} enableReply={enableReply} changeShow={changeShow}/>
                </div>
                <div className={style['comment-item-cont_replys']}>
                    {
                        data.children
                            ? data.children.map(i => <Item key={i.commentId} data={i} enableReply={true}/>)
                            : ''
                    }
                </div>
            </div>
        </div>
    )
}
Item.propTypes = {
    data: PropTypes.object,
    width: PropTypes.string,
    enableReply: PropTypes.bool
}
Item.defaultProps = {
    data: {},
    width: '100%',
    enableReply: false
}
