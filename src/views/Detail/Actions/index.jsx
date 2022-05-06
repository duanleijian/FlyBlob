import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import style from './index.module.scss'
import { getUser } from '@/utils/auth'
import { updateArticleAction } from '@/api/article'
import { getUserAction, updateUserAction } from '@/api/action'
import Message from '@/components/Message'
export default function Actions(props) {
    let { data } = props
    const [actions, setActions] = useState({likes: 0, loves: 0, collects: 0})
    const [userInfo, setUserInfo] = useState({})
    const [count, setCount] = useState({likes: 0, loves: 0, collects: 0})
    const [load, setLoad] = useState(false)
    useEffect(() => {
        const user = getUser()
        user && setUserInfo(user)
    }, [])
    useEffect(() => {
        if (JSON.stringify(data) !== '{}') {
            setCount({
                likes: data.articleLikes,
                loves: data.articleLoves,
                collects: data.articleCollects
            })
            fetchData()
        }         
    }, [data])
    const fetchData = () => {        
        if (userInfo) {
            getUserAction(data.articleId, userInfo.userId).then(res => {                
                res.code === 200 && ( setActions(res.data) )
                setLoad(true)
            })
        }
    }
    const actionChange = (type) => {
        if(JSON.stringify(userInfo) !== "{}") {
            switch(type) {
                case 'like':
                    updateUserAction({actionLike: actions.likes? 0 : 1, articleId: data.articleId, actionUserId: userInfo.userId}).then(res => {                    
                        res.code === 200 && ( setActions(res.data) )
                    })
                    updateArticleAction({articleId: data.articleId, articleLikes: actions.likes? count.likes - 1 : count.likes + 1}).then(res => {                    
                        res.code === 200 && (setCount(res.data))
                    })
                    break
                case 'collect':
                    updateUserAction({actionCollect: actions.collects? 0 : 1, articleId: data.articleId, actionUserId: userInfo.userId}).then(res => {                    
                        res.code === 200 && ( setActions(res.data) )
                    })
                    updateArticleAction({articleId: data.articleId, articleCollects: actions.collects? count.collects - 1 : count.collects + 1}).then(res => {                    
                        res.code === 200 && (setCount(res.data))
                    })
                    break
                case 'love':
                    updateUserAction({actionLove: actions.loves? 0 : 1, articleId: data.articleId, actionUserId: userInfo.userId}).then(res => {                    
                        res.code === 200 && ( setActions(res.data) )
                    })
                    updateArticleAction({articleId: data.articleId, articleLoves: actions.loves? count.loves - 1 : count.loves + 1}).then(res => {                    
                        res.code === 200 && (setCount(res.data))
                    })
                    break
                default: 
                    break
            }
        } else {
            Message.error('请先登录再操作!')
        }        
    }
    return (
        <div className={style['action']} style={{display: load? 'block' : 'none'}}>
            <div className={classnames(style['action-item'], {[style['action-item_active']] : actions.likes})} onClick={() => { actionChange('like') }}>
                <span className='iconfont icon-dianzan1'></span>
                <div className={style['action-item_count']}>{count.likes}</div>
            </div>
            <div className={classnames(style['action-item'], {[style['action-item_active']] : actions.collects})} onClick={() => { actionChange('collect') }}>
                <span className='iconfont icon-shoucang1'></span>
                <div className={style['action-item_count']}>{count.collects}</div>
            </div>
            <div className={classnames(style['action-item'], {[style['action-item_active']] : actions.loves})} onClick={() => { actionChange('love') }}>
                <span className='iconfont icon-shixin'></span>
                <div className={style['action-item_count']}>{count.loves}</div>
            </div>
        </div>
    )
}

Actions.propTypes = {
    data: PropTypes.object
}

Actions.defaultProps = {
    data: {}
}