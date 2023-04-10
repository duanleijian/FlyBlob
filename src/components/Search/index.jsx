import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import './index.scss'
function Search(props) {
    let { placeholder, content, dispatch } = props  
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
        nav(`/search?key=${keyVal}&redirect=${parseInt(Math.random() * 100000000000)}`)          
        
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
