import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import style from './index.module.scss'

export default function MessageCont(props) {    
    const icons = {success: {icon: 'icon-Ok', color: 'green'}, error: {icon: 'icon-cuowu', color: 'red'}, warn: {icon: 'icon-a-gantanhao3x', color: 'yellow'}}
    const { type, content, preTop } = props        
    const [cssStyle, setCssStyle] = useState({})
    useEffect(() => {
        setTimeout(() => {
            setCssStyle({top: preTop === 0? '10%' : `calc(${preTop + 60}px)`, opacity: '1.0'})
        }, 100)        
    }, [])
    return (
        <div className={style['message-cont']} style={cssStyle}>
            <div className={style['message-cont-icon']} style={{backgroundColor: icons[type].color}}>
                <span className={`iconfont ${icons[type].icon}`}></span>
            </div>
            <div className={style['message-cont-text']}>{content}</div>
        </div>
    )
}

MessageCont.propTypes = {
    type: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    len: PropTypes.number.isRequired,
    preTop: PropTypes.number
}

MessageCont.defaultProps = {
    type: 'success',
    content: 'this is a message box!',
    len: 1,
    preTop: 0
}


