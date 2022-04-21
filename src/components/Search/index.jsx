import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import Constant from '@/constant/constant'
import Pubsub from 'pubsub-js'
import './index.scss'
function Search(props) {
    let { pathname } = useLocation()
    let { placeholder, content, dispatch, keyword } = props        
    let nav = useNavigate()
    let [tip, setTip] = useState(placeholder)
    let [keyVal, setKeyVal] = useState(content)
    let [expend, setExpend] = useState(false)
    const textChange = (e) => {                
        setKeyVal(e.target.value)
    }
    const toggleExpend = () => {
        setExpend(!expend)        
        !expend? setTip('请搜索博文、用户') : setTip(placeholder)
    }
    const redirect = () => {        
        dispatch({type: 'keyword/updateKeyWord', payload: {val: keyVal}})
        // Pubsub.publish(Constant.ARTICLE_SEARCH, {})
        if (!pathname.includes('/search')) {
            nav(`/search?key=${keyVal}`)
        }          
        
    }
    return (
        <div className={expend? 'search search-focus' : 'search'} style={{width: expend? '340px' : '250px'}}>
            <input  className='search-input'
                    type="text"
                    value={keyVal}
                    placeholder={tip}                    
                    onChange={ (e) => { textChange(e) }}
                    onFocus={ () => { toggleExpend(true)} }
                    onBlur={ () => { toggleExpend(false)} }/>
            <div className='search-icon' onClick={ redirect }>
                <span className='iconfont icon-sousuo'></span>
            </div>            
        </div>
    )
}
Search.propTypes = {
    content: PropTypes.string,
    placeholder: PropTypes.string
}
Search.defaultProps = {
    content: '',
    placeholder: '搜索关键字'
}
export default connect(({ keyword }) => ({ keyword }))(Search);
// export default Search;
