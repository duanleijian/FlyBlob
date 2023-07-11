import React, { useState, useEffect, memo } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import style from './index.module.scss'
import { getUser } from '@/utils/auth'
import { updateArticleAction } from '@/api/article'
import { getUserAction, updateUserAction } from '@/api/action'
import Message from '@/components/Message'
function Actions(props) {
    let { data } = props
    const [state, setState] = useState({
        load: false,
        userInfo: null,
        count: {
            likes: 0,
            loves: 0,
            collects: 0
        },
        actions: {
            likes: 0,
            loves: 0,
            collects: 0
        }
    })
    
    useEffect(() => {
        const user = getUser()
        user &&  setState({ ...state, userInfo: user })
    }, [])
    useEffect(() => {
        if (data && JSON.stringify(data) !== '{}') {
            setState({ ...state, count: {
                likes: data.articleLikes,
                loves: data.articleLoves,
                collects: data.articleCollects
            }})
            fetchData()
        }         
    }, [data])
    const fetchData = () => {        
        getUserAction(data.articleId, data.userId).then(res => {                
            setState({ ...state, load: true, actions: res.data })
        })
    }
    const actionChange = (type) => {
        if (state.userInfo && JSON.stringify(state.userInfo) !== "{}") {
            switch(type) {
                case 'like':
                    updateUserAction({actionLike: data.actions.likes? 0 : 1, articleId: data.articleId, actionUserId: state.userInfo?.userId }).then(res => {                    
                        res.code === 200 && ( setState({ ...state, actions: res.data}) )
                    })
                    updateArticleAction({articleId: data.articleId, articleLikes: state.actions.likes? state?.count.likes - 1 : state.count.likes + 1}).then(res => {                    
                        res.code === 200 && ( setState({ ...state, count: res.data}) )
                    })
                    break
                case 'collect':
                    updateUserAction({actionCollect: state?.actions.collects? 0 : 1, articleId: data.articleId, actionUserId: state?.userInfo?.userId}).then(res => {                    
                        res.code === 200 && ( setState({ ...state, actions: res.data}) )
                    })
                    updateArticleAction({articleId: data.articleId, articleCollects: state.actions.collects? state.count.collects - 1 : state.count.collects + 1}).then(res => {                    
                        res.code === 200 && ( setState({ ...state, count: res.data}) )
                    })
                    break
                case 'love':
                    updateUserAction({actionLove: state.actions.loves? 0 : 1, articleId: data.articleId, actionUserId: state.userInfo?.userId}).then(res => {                    
                        res.code === 200 && ( setState({ ...state, actions: res.data}) )
                    })
                    updateArticleAction({articleId: data.articleId, articleLoves: state.actions.loves? state.count.loves - 1 : state.count.loves + 1}).then(res => {                    
                        res.code === 200 && ( setState({ ...state, count: res.data}) )
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
        <div className={style['action']}>
            <div className={classnames(style['action-item'], {[style['action-item_active']] : state.actions.likes})} onClick={() => { actionChange('like') }}>
                <span className='iconfont icon-dianzan1'></span>
                <div className={style['action-item_count']}>{state.count.likes}</div>
            </div>
            <div className={classnames(style['action-item'], {[style['action-item_active']] : state.actions.collects})} onClick={() => { actionChange('collect') }}>
                <span className='iconfont icon-shoucang1'></span>
                <div className={style['action-item_count']}>{state.count.collects}</div>
            </div>
            <div className={classnames(style['action-item'], {[style['action-item_active']] : state.actions.loves})} onClick={() => { actionChange('love') }}>
                <span className='iconfont icon-shixin'></span>
                <div className={style['action-item_count']}>{state.count.loves}</div>
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

export default memo(Actions)