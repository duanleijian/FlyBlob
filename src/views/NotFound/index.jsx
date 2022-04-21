import React from 'react'
import './index.scss'
export default function NotFound() {
	return (
		<div className='not-found'>
			<img className='not-found_img' src="assets/404_images/404.png" alt="无法显示该图片" />
			<div className="not-found_oop">
				404错误!
			</div>
			<div className="not-found_info">
                对不起，您正在寻找的页面不存在。尝试检查URL的错误，然后按浏览器上的刷新按钮或尝试在我们的应用程序中找到其他内容。
            </div>
			<div className='not-found_home'>
				返回首页
			</div>
		</div>
	)
}
