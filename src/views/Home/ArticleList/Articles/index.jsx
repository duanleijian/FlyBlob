import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './index.scss'
import { getRecArticles } from '@/api/article'
export default function Articles() {
	const nav = useNavigate()
	let [articles, setArticles] = useState([])
	let colors = ['#FF4040', '#FF7F00', '#FFB90F', '#E5E5E5', '#E5E5E5', '#E5E5E5', '#E5E5E5', '#E5E5E5']
	useEffect(() => {
		getRecArticles().then(res => {
			res.code === 200 && (setArticles(res.data))
		})
	}, [])
	const toDetail = (id) => {
		nav(`/detail/${id}`,{})
	}
	return (
		<div className='articles'>
			{
				articles.slice(0, 7).map((i, cur) => {
					return <div key={i.articleId} className='articles-item' onClick={ () => { toDetail(i.articleId) }}>
						<div className='articles-item_num' style={{ backgroundColor: colors[cur] }}>{cur + 1}</div>
						<div className='articles-item_title'>{i.articleTitle.length > 15? i.articleTitle.substr(0,15) + '...' : i.articleTitle}</div>
					</div>
				})
			}

		</div>
	)
}
