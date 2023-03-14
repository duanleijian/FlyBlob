import React from 'react'
import style from './index.module.scss'
import PropTypes from 'prop-types'

export default function Separate({ size }) {
    return (
        <div className={style['separate']} style={{ height: size }}></div>
    )
}

Separate.propTypes = {
    size: PropTypes.string
}

Separate.defaultProps = {
    size: '25px'
}