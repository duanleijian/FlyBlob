import React from 'react'
import style from './index.module.scss'
import PersonAside from './PersonAside'
import PersonContent from './PersonContent'
export default function PersonInfo() {
    return (
        <div className={style['person-info']}>            
            <div className={style['person-info_cont']}>
                <PersonAside width='240px' height='800px' left='0' top='0'/>
                <PersonContent width='800px' height='800px' left='20px' top='0'/>
            </div>            
        </div>
    )
}
