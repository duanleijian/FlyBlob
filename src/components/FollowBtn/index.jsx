import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import style from './index.module.scss'
import { getUser } from '@/utils/auth'
import Message from '@/components/Message'
function FollowBtn({ curUser, curUserId, width, click }, ref) {
    const [status, setStatus] = useState(false)    
    useEffect(() => {               
        initFollowStatus()
    }, [])
    useImperativeHandle(ref, () => ({
        refreshStatus
    }))
    const refreshStatus = () => {                        
        initFollowStatus()
    }
    const initFollowStatus = () => {
        if (getUser()) {                                            
            setStatus(getUser().userRelate.includes(curUserId? curUserId : curUser.userId))
        } else {
            Message.error('请先登录再操作!')
        }
    }
    const toggleFollow = () => {
        click()
    }
    return (
        <div
            style={{width}}
            className={classnames(style['follow-btn'], {[style['follow-btn_active']]: status}) }            
            onClick={toggleFollow}>
                <span className={classnames('iconfont', {'icon-duigou': status}, {'icon-jiahao': !status})}></span>
                <span>{status? '已关注' : '关注'}</span>                                
        </div>
    )
}
FollowBtn = forwardRef(FollowBtn)
FollowBtn.displayName = "FollowBtn"
FollowBtn.propTypes = {
    curUser: PropTypes.object,
    curUserId: PropTypes.number,
    width: PropTypes.string,
    click: PropTypes.func
}
FollowBtn.defaultProps = {
    curUser: {},
    curUserId: null,
    width: '100px',
    click: () => {}
}
export default FollowBtn

