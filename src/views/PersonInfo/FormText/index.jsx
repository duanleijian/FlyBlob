import React, { useState, useEffect } from 'react'
import style from './index.module.scss'
import classnames from 'classnames'
import PropTypes from 'prop-types'
export default function FormText(props) {
    let { label, value, tip, sendValue, width, height,  model, top, left, labelWidth, inline } = props
    const [val, setVal] = useState(value)
    const [focus, setFocus] = useState(false)
    useEffect(() => {                
        setVal(value)
    }, [value])
    const textChange = (e) => {
        let curVal = e.value || e.target.value
        setVal(curVal)
        sendValue({key: model, val: curVal})
    }
    const textFocus = () => {
        setFocus(!focus)
    }    
    return (
        <div className={style['form-textarea']} style={{width, height, marginTop: top, marginLeft: left}}>
            <div className={style['form-textarea_label']} style={{width: labelWidth}}>{label}</div>
            <textarea 
                value={val}  
                placeholder={tip} 
                className={classnames(style['form-textarea_value'], {[style['form-textarea_value__focus']]: focus})} 
                style={{width: `calc(100% - ${labelWidth})`}}
                onFocus={textFocus}
                onBlur={textFocus}                              
                onChange={(e) => { textChange(e) }}>
            </textarea>		
        </div>
    )
}
FormText.propTypes = {
    model: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    labelWidth: PropTypes.string,
    label: PropTypes.string,
    tip: PropTypes.string,
    value: PropTypes.string,
    top: PropTypes.string,
    left: PropTypes.string,
    inline: PropTypes.bool
}
FormText.defaultProps = {
    model: '',
    width: '100%',
    height: '200px',
    labelWidth: '20%',
    label: '表单项',
    value: '',
    tip: '请输入表单项',
    top: '0',
    left: '0',
    inline: false
}
