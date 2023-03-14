import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import './index.scss'
import { getStrLen } from '@/utils/util'
import { getRecArticles } from '@/api/article'
import Loading from '@/components/Loading'
export default function Articles({ setArticleCount }) {
	const nav = useNavigate()
	const [load, setLoad] = useState(false)
	const [articles, setArticles] = useState([])
	let colors = ['#FF4040', '#FF7F00', '#FFB90F', '#E5E5E5', '#E5E5E5', '#E5E5E5', '#E5E5E5', '#E5E5E5']
	useEffect(() => {
		fetchData()
	}, [])
	const fetchData = () => {
		setLoad(true)
		getRecArticles().then(res => {
			setLoad(false)
			res.code === 200 && (setArticles(res.data))
			setArticleCount(res.data?.length > 7? 7 : res.data?.length)
		})
	}
	const toDetail = (id) => {
		nav(`/detail/${id}`,{})
	}
	return (
		<div className='articles'>
			<Loading show={load} width="15%" loadType="bubbles"/>
			{
				articles.slice(0, 7).map((i, cur) => {
					return <div key={i.articleId} className='articles-item' onClick={ () => { toDetail(i.articleId) }}>
						<div className='articles-item_num' style={{ backgroundColor: colors[cur] }}>{cur + 1}</div>
						<div className='articles-item_title'>{getStrLen(i.articleTitle) > 14? i.articleTitle.substr(0, 13) + '...' : i.articleTitle}</div>
					</div>
				})
			}

		</div>
	)
}

Articles.propTypes = {
	setArticleCount: PropTypes.func
}

Articles.defaultProps = {
	setArticleCount: () => {}
}
