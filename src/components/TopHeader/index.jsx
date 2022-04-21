import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useNavigate, useLocation } from 'react-router-dom'
import './index.scss'
import TopTabs from '@/components/TopTabs'
import Search from '@/components/Search'
import User from '@/components/User'
export default function TopHeader(props) {
    const { content } = props, nav = useNavigate()
    const { state } = useLocation()
    useEffect(() => {        
                
    }, [])        
    const editArticle = () => {        
        nav('/edit', {})
    }
    return (
        <div className='top-header'>
            <TopTabs/>
            <Search content={content}/>
            <div className='create-article' onClick={editArticle}>
                <span className='iconfont icon-yongyan'></span>
                <span className='create-article_text'>写博文</span>
            </div>
            <User enabledHttp={state? state['enableUser'] : false}/>
        </div>
    )
}
TopHeader.propTypes = {
    content: PropTypes.string
}
TopHeader.defaultProps = {
    content: ''
}
