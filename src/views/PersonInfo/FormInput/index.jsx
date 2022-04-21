import React, { useState, useEffect } from 'react'
import style from './index.module.scss'
import classnames from 'classnames'
import PropTypes from 'prop-types'
export default function FormInput(props) {
    let { label, value, tip, sendValue, width, model, top, left, labelWidth } = props    
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
        <div className={style['form-input']} style={{width, marginTop: top, marginLeft: left}}>
            <div className={style['form-input_label']} style={{width: labelWidth}}>{label}</div>
			<input
                type="text"
                value={val}  
                placeholder={tip} 
                className={classnames(style['form-input_value'], {[style['form-input_value__focus']]: focus})} 
                style={{width: `calc(100% - ${labelWidth})`}}
                onFocus={textFocus}
                onBlur={textFocus}                              
                onChange={(e) => { textChange(e) }}/>
        </div>
    )
}
FormInput.propTypes = {
    model: PropTypes.string,
    width: PropTypes.string,
    labelWidth: PropTypes.string,
    label: PropTypes.string,
    tip: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    top: PropTypes.string,
    left: PropTypes.string,
    inline: PropTypes.bool
}
FormInput.defaultProps = {
    model: '',
    width: '100%',
    labelWidth: '20%',
    label: '表单项',
    value: '',
    tip: '请输入表单项',
    top: '0',
    left: '0',
    inline: false
}

