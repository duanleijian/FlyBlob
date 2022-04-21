import React from 'react'
import PropTypes from 'prop-types'
import style from './index.module.scss'
export default function FormTitle(props) {
    let { title } = props
    return (
        <div className={style['form-title']}>{title}</div>
    )
}
FormTitle.propTypes = {
    title: PropTypes.string
}
FormTitle.defaultProps = {
    title: ''
}
