import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import style from './index.module.scss'
import Message from '@/components/Message'
import { getUser } from '@/utils/auth'
export default function FollowBtn({ curUser, width, click }) {
    const [status, setStatus] = useState(false)
    useEffect(() => {        
        if (getUser()) {
            const flag = getUser().userRelate.includes(curUser.userId)
            setStatus(flag)
        }
    }, [])
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
FollowBtn.propTypes = {
    curUser: PropTypes.object,
    width: PropTypes.string,
    click: PropTypes.func
}
FollowBtn.defaultProps = {
    curUser: {},
    width: '100px',
    click: () => {}
}
