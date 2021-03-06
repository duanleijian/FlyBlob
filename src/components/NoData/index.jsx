import React from 'react'
import PropTypes from 'prop-types'
import style from './index.module.scss'
import defaultAvatar from '@/common/images/no_data.png'
export default function NoData(props) {
	let { width, height } = props
	return (
		<div className={style['no-data']} style={{width, height}}>
			<img className={style['no-data_img']} src={defaultAvatar} alt="无法显示" />
			<div className={style['no-data_tip']}>暂无数据~</div>
		</div>
	)
}
NoData.propTypes = {
	width: PropTypes.string,
	height: PropTypes.string
}
NoData.defaultProps = {
	width: '100%',
	height: '300px'
}
