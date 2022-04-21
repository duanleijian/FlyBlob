import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './index.scss'
import PubSub from 'pubsub-js'
import Constant from '@/constant/constant'
import { dateToText } from '@/utils/date'
import { getArticleList } from '@/api/article'
import NoData from '@/components/NoData'
import Message from '@/components/Message'
export default function List() {
	const defaultAvatar = 'assets/default/default_avatar.png'
	const nav = useNavigate()
	const [mode, setMode] = useState('default')
	const [page, setPage] = useState({pageNum: 1, pageSize: 7})
	const [total, setTotal] = useState(0)
	const [list, setList] = useState([])
	useEffect(() => {
		listen()
		getArticleList({sort: mode, ...page}).then(res => {						
			if (res.code === 200) {
				setTotal(res.data.total)
				setList(res.data.list)
			} 
			res.code !== 200 && (Message.error(res.msg))
		})
	}, [])
	const listen = () => {
		PubSub.subscribe(Constant.ARTICLE_LIST_GET, (msg, data) => {
			setMode(data.sort)			
			setPage({pageNum: 1, pageSize: 7})
			getArticleList({sort: data.sort, ...{pageNum: 1, pageSize: 7}}).then(res => {						
				if (res.code === 200) {
					setTotal(res.data.total)
					setList(res.data.list)
				} 
				res.code !== 200 && (Message.error(res.msg))
			})
		})
	}
	const toDetail = (id) => {
		nav(`/detail/${id}`, {})
	}
	const nextPage = () => {
		setPage({...page, pageNum: page.pageNum + 1})
		getArticleList({sort: mode, pageNum: page.pageNum + 1, pageSize: page.pageSize}).then(res => {						
			res.code === 200 && (setList([...list, ...res.data.list]))
			res.code !== 200 && (Message.error(res.msg))
		})
	}
	return (
		<div className='blog-list'>
			{list.length ? '' : <NoData />}
			{				
				list.map((i, cur) => {										
					return  <div key={i.articleId} className='blog-item' onClick={() => { toDetail(i.articleId) }}>
								<div className='blog-item_header'>
									<span>{dateToText(i.articleDate)}</span>
								</div>
								<h1 className='blog-item_title'>
									{i.articleTitle}
								</h1>
								<div className='blog-item_content'>
									<p>{i.articleTip.length > 150? i.articleTip.substring(0, 150) + '...' : i.articleTip}</p>
								</div>
								<div className='blog-item_info'>
									<div className='blog-item_info__user'>
										<img className='blog-item_info__user___avatar' src={i.userAvatar? '/api' + i.userAvatar : defaultAvatar} alt=''/>
										<span className='blog-item_info__user___name'>{i.userNickName}</span>
									</div>
									<div className='blog-item_info__count'>
										<div className='blog-item_info__count___icon'>
											<span className='iconfont icon-liulan'></span>
											<span>{i.articleViews}</span>
											
										</div>
										<div className='blog-item_info__count___icon'>
											<span className='iconfont icon-dianzan'></span>
											<span>{i.articleLikes}</span>											
										</div>
										<div className='blog-item_info__count___icon'>
											<span className='iconfont icon-xiaoxi'></span>
											<span>{i.articleComments}</span>
										</div>
									</div>
								</div>
							</div>							
				})
			}
			{list.length > 0? list.length < total && list.length > 0? <div className='blog-list_more' onClick={nextPage}>加载更多</div> : <div className='blog-list_more' >没有更多了</div> : ""}
		</div>
	)
}
