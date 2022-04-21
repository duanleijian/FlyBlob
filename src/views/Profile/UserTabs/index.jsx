import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import style from './index.module.scss'
export default function UserTabs(props) {
	let { activeName, children } = props
	let tabsProp = children ? children.map(i => i.props) : []
	const [cursor, setCursor] = useState(0)
	useEffect(() => {
		let index = tabsProp.findIndex(i => i.name === activeName)
		index > -1 && (setCursor(index))
	}, [activeName])
	const toggleActive = (cur) => {
		setCursor(cur)
	}
	return (
		<div className={style['user-tabs']}>
			<div className={style['user-tabs_header']}>
				{
					tabsProp.map((i, cur) => {
						return <div
							key={cur}
							onClick={() => { toggleActive(cur) }}
							className={classnames(style['user-tabs_header__item'], { [style['user-tabs_header__item___active']]: cur === cursor })}>
							{i.label}
						</div>
					})
				}
			</div>
			<div className={style['user-tabs_cont']}>
				{children[cursor]}
			</div>
		</div>
	)
}
UserTabs.propTypes = {
	activeName: PropTypes.string
}
UserTabs.defaultProps = {
	activeName: ''
}
