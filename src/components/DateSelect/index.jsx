import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import classname from 'classnames'
import style from './index.module.scss'
import { dateRangle } from '@/utils/date'
export default function DateSelect(props) {
    let { options, current, value, top, left, right, width, sendSelect } = props
    let [show, setShow] = useState(false)
    let [cont, setCont] = useState(options[0].label)
    let [val, setVal] = useState(options[0])
    const toggleShow = () => {
        setShow(!show)
    }
    const selectOptions = (index) => {
        setCont(options[index].label)
        setVal(options[index])
        setShow(!show)
        parseDate(options[index].value)
    }
    const parseDate = (val) => {
        sendSelect(dateRangle(val))
    }
    return (
        <div className={style['date-select']} onClick={toggleShow} style={{ marginLeft: top, marginTop: top, marginRight: right, width }}>
            <div className={style['date-select_cont']}>{cont}</div>
            <div className={classname(style['date-select_icon'], { [style['date-select_icon__active']]: show })}>
                <span className={`${style['date-select_icon__iconfont']} iconfont icon-xiangxia`}></span>
            </div>
            {
                show ? <div className={style['date-select_options']}>
                    {
                        options.map((i, cur) => {
                            return <div key={i.value} className={style['date-select_options__item']} onClick={() => { selectOptions(cur) }}>{i.label}</div>
                        })
                    }
                </div> : ''
            }

        </div>
    )
}
DateSelect.propTypes = {
    options: PropTypes.array,
    current: PropTypes.string,
    value: PropTypes.string,
    left: PropTypes.string,
    top: PropTypes.string,
    right: PropTypes.string,
    width: PropTypes.string,
    sendSelect: PropTypes.func
}
DateSelect.defaultProps = {
    options: [{ label: '时间不限', value: 'no' }, { label: '一天内', value: 'day' }, { label: '一周内', value: 'week' }, { label: '一月内', value: 'month' }],
    current: '',
    value: '',
    left: "0",
    top: "0",
    right: "0",
    width: "150px",
    sendSelect: () => {}
}
