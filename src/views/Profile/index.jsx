import React, { useState, useEffect } from 'react'
import style from './index.module.scss'
import UserTabs from './UserTabs'
import UserCard from './UserCard'
import TabItem from './UserTabs/TabItem'
import MyDynamic from './MyDynamic'
import MyArticle from './MyArticle'
import MyApproval from './MyApproval'
import MyCollect from './MyCollect'
import MyLove from './MyLove'
import { useNavigate, useLocation } from 'react-router-dom'
export default function Profile() {
	const location = useLocation()
	let { curActive } = location.state	
	const curUser = location.state? location.state.curUser : null	
	return (
		<div className={style['profile']}>						
			<div className={style['profile-content']}>
				<UserCard author={curUser}/>
				<UserTabs activeName={[null, undefined, ''].includes(curActive)? "0" : curActive}>
					<TabItem label="动态" name="0">
						<MyDynamic author={curUser}/>
					</TabItem>
					<TabItem label="文章" name="1">						
						<MyArticle author={curUser}/>
					</TabItem>
					<TabItem label="点赞" name="2">
						<MyApproval author={curUser}/>
					</TabItem>
					<TabItem label="收藏" name="3">
						<MyCollect author={curUser}/>
					</TabItem>
					<TabItem label="喜欢" name="4">
						<MyLove author={curUser}/>
					</TabItem>
				</UserTabs>
			</div>						
		</div>
	)
}
