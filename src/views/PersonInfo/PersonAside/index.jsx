import React from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import style from './index.module.scss'
import AvatarUpload from '@/components/AvatarUpload'
export default function PersonAside(props) {
    let { width, height, top, left, asideList } = props
    const nav = useNavigate()
    const toRirect = (path) => {        
        nav(path, {})
    }
    return (
        <div className={style['person-aside']} style={{width, height, marginLeft: left, marginTop: top}}>
            <div className={style['person-aside_avatar']}>
                <AvatarUpload />
            </div>            
            <div className={style['person-aside_list']}>
                {
                    asideList.map((i, cur) => {
                        return  <div key={cur} className={style['person-aside_list__item']} onClick={() => { toRirect(i.path) }}>
                                    <span className={`iconfont ${i.icon}`}></span>
                                    <span>{i.name}</span>
                                </div>
                    })
                }                
            </div>        
        </div>
    )
}
PersonAside.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    top: PropTypes.string,
    left: PropTypes.string,
    asideList: PropTypes.array
}
PersonAside.defaultProps = {
    width: 'auto',
    height: 'auto',
    top: 'auto',
    left: 'auto',
    asideList: [
        {icon: 'icon-shujuzhongxin', name: '数据中心', path: '/person/datacenter'},
        {icon: 'icon-gerenziliao', name: '个人资料', path: '/person/myinfo'},
        {icon: 'icon-group52', name: '账号设置', path: '/person/account'},
        
    ]
}
