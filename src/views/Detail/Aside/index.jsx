import React from 'react'
import style from './index.module.scss'
export default function Aside(props) {
    return (
        <div className={style['aside']}>{props.children}</div>
    )
}
