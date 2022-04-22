import React from 'react'
import { useNavigate } from 'react-router-dom'
import style from './index.module.scss'
import noPicture from '@/common/images/404.png'
export default function NotFound() {
	const nav = useNavigate()
	const toHome = () => {
		nav('/', {})
	}
	return (
		<div className={style['not-found']}>
			<img className={style['not-found_img']} src={noPicture} alt="无法显示该图片" />
			<div className={style['not-found_oop']}>
				404错误!
			</div>
			<div className={style['not-found_info']}>
                对不起，您正在寻找的页面不存在。尝试检查URL的错误，然后按浏览器上的刷新按钮或尝试在我们的应用程序中找到其他内容。
            </div>
			<div className={style['not-found_home']} onClick={toHome}>返回首页</div>
		</div>
	)
}
