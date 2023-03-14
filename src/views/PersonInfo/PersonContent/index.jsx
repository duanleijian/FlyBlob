import React from 'react'
import { Outlet } from 'react-router-dom'
import PropTypes from 'prop-types'
import style from './index.module.scss'
export default function PersonContent(props) {
    let { width, height, top, left } = props
    return (
        <div className={style['person-content']} style={{width, minHeight: height, marginLeft: left, marginTop: top}}>
            <Outlet />
        </div>
    )
}
PersonContent.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    top: PropTypes.string,
    left: PropTypes.string    
}
PersonContent.defaultProps = {
    width: 'auto',
    height: 'auto',
    top: 'auto',
    left: 'auto'    
}
