import React from 'react'
import ReactLoading from 'react-loading'
import PropTypes from 'prop-types'
import style from './index.module.scss'
export default function Loading({ show, loadType, loadColor, loadName, width, height }) {
    return (
        <div className={style['loading']} style={{display: show? 'flex': 'none'}}>
            <ReactLoading type={loadType} color={loadColor} height={height} width={width}/>
            <div className={style['loading-tip']} style={{color: loadColor}}>{loadName}</div>
        </div>
    )
}
Loading.propTypes = {
    show: PropTypes.bool,
    loadType: PropTypes.string,
    loadColor: PropTypes.string,
    loadName: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}
Loading.defaultProps = {
    show: false,
    loadType: 'bars',
    loadColor: '#cccccc',
    loadName: '加载中...',
    width: '5%',
    height: '30px'
}
// type: balls, bars, bubbles, cubes, cylon, spin, spinningBubbles, spokes
