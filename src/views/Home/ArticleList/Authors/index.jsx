import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import classnames from 'classnames'
import style from './index.module.scss'
import Constant from '@/constant/constant'
import Pubsub from 'pubsub-js'
import Message from '@/components/Message'
import { getToken, setUser, getUser, hasToken } from '@/utils/auth'
import { getRecommendUser, addConcat } from '@/api/user'
import Loading from '@/components/Loading'
import defaultAvatar from  "@/common/images/default_avatar.png"
export default function Authors() {	
	const nav = useNavigate()
	const [load, setLoad] = useState(false)
	const [authors, setAuthors] = useState([])	
	const [userRelate, setUserRelate] = useState('')	
	useEffect(() => {
		refresh()						
		fetchData()
	}, [])
	const refresh = () => {
		Pubsub.subscribe(Constant.EXIT_LOGIN, (msg, data) => {
			fetchData()
		})		
	}
	const fetchData = () => {
		getUser() && setUserRelate(getUser()['userRelate'])
		setLoad(true)
		getRecommendUser().then(res => {		
			setLoad(false)	
			res.code === 200 && ( setAuthors(res.data) )
		})
	}
	const toAuthorDetail = (user) => {
		nav('/profile/0', {state: {curUser: user}})
	}
	const toggleFollow = (e, followStatus, targetId) => {
		e.stopPropagation()
		if (hasToken()) {
            let userInfo = getUser()
            if(!followStatus) {                
                let curIds = userInfo.userRelate? `${userInfo.userRelate},${targetId}` : `${targetId}`                                                     
                userInfo.userRelate = curIds
                addConcat({ ids: curIds, id: userInfo.userId }).then(res => {                 
                    if (res.code === 200) {
                        setUser(userInfo)
						setUserRelate(userInfo.userRelate)                           
                        Message.success('关注成功!')
                    }
                    res.code !== 200 && (Message.error('关注失败!'))
                })
            } else {
                let ids = userInfo.userRelate.split(',')                
                let index = ids.findIndex(i => Number(i) === Number(targetId))                                                
                let curIds = ids.filter((i, cur) => cur !== index).join(',')
                userInfo.userRelate = curIds
                addConcat({ ids: curIds, id: userInfo.userId}).then(res => {
                    if (res.code === 200) {
                        setUser(userInfo)
						setUserRelate(userInfo.userRelate)                        
                        Message.success('取消关注成功!')
                    }
                    res.code !== 200 && (Message.error('取消关注失败!'))
                })
            }
            
        } else {
            Message.error('关注前请先注册或登录!')
        }
	}
	return (
		<div className='authors'>
			<Loading show={load} width="15%" loadType="bubbles"/>
			{
				authors.slice(0, 5).map(i => {
					return  <div key={i.userId} className={style['authors-item']} onClick={() => { toAuthorDetail(i) }}>
								<div className={style['authors-item_left']}>
									<img className={style['authors-item_avatar']} src={i.userAvatar? '/api' + i.userAvatar : defaultAvatar} alt="" />
								</div>
								<div className={style['authors-item_center']}>
									<span className=''>{i.userNickName}</span>
									<span className=''>{i.userIntroduct? i.userIntroduct : '暂无个人简介'}</span>
								</div>
								<div className={classnames(style['authors-item_right'], {[style['authors-item_right__active']]: userRelate.includes(i.userId)})}>
									{
										userRelate.includes(i.userId)? <span onClick={(e) => { toggleFollow(e, true, i.userId) }}>已关注</span> : <><span onClick={(e) => { toggleFollow(e, false, i.userId) }}>关注</span><span className='iconfont icon-jia'></span></>
									}									
								</div>
							</div>
				})
			}			
		</div>
	)
}
