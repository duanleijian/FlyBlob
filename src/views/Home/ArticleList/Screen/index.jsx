import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import PubSub from 'pubsub-js'
import Constant from '@/constant/constant'
import './index.scss'
export default function Screen(props) {
    let { conds } = props
    let [cursor, setCursor] = useState(0)
    const toggleCond = (index) => { 
        setCursor(index)
        PubSub.publish(Constant.ARTICLE_LIST_GET, {sort: conds[index].prop})
    }
    return (
        <div className='screen-cond'>
            {
                conds.map((i, index) => {
                    return  <div key={index} className={classnames('screen-cond_item', {'screen-cond_item__active': cursor === index })} onClick={() => {toggleCond(index)}}>
                                {i.name}
                                <div className='screen-cond_item_mask'></div>
                            </div>
                })
            }            
        </div>
    )
}
Screen.propTypes = {
    conds: PropTypes.array
}
Screen.defaultProps = {
    conds: [{name: '每日推荐', prop: 'default'}, {name: '最热', prop: 'hot'}, {name: '最新', prop: 'new'}]
}
