import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { getUser } from '@/utils/auth'
import PropTypes from 'prop-types'
import './index.scss'
function TopTabs(props) {
    const nav = useNavigate()
    const { pathname } = useLocation()
    const { tabs, height } = props
    const [cusror, setCursor] = useState(0)
    const [curTabs, setCurTabs] = useState(tabs)    
    useEffect(() => {
        let index = curTabs.findIndex(i => i.name.includes('关注'))
        getUser()
            ? setCurTabs(curTabs.map((i, cur) => {
                cur === index && (i.show = true)
                return i
            }))
            : setCurTabs(curTabs.map((i, cur) => {
                cur === index && (i.show = false)
                return i
            }))
    }, [pathname])
    const toNavigate = (index) => {
        setCursor(index)
        nav(curTabs[index].path)
    }        
    return (
        <div className='top-tabs'>
            <ul className='top-tabs_list' style={{ height: props.height }}>
                {
                    curTabs.map((item, index) => {
                        return item.show ? <li key={index}
                            className={cusror === index ? 'top-tabs_item top-tabs_item_active' : 'top-tabs_item'}
                            onClick={() => { toNavigate(index) }}>
                            {item.name}
                        </li> : ''
                    })
                }
            </ul>
        </div>
    )
}
TopTabs.propTypes = {
    tabs: PropTypes.array,
    height: PropTypes.string
}
TopTabs.defaultProps = {
    tabs: [{ name: '首页', path: '/', show: true }, { name: '关注', path: '/follows', show: false }],
    height: '100%'
}
export default TopTabs
