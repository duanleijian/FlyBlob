import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Screen from './Screen'
import List from './List'
import Card from './Card'
import Authors from './Authors'
import Articles from './Articles'
import './index.scss'
export default function ArticleList() {
	const [tip, setTip] = useState('共7篇文章上榜')
	const nav = useNavigate()
	const toRecommendAuthors = () => {
		nav('/authors', {})
	}
	const setArticleCount = (count) => {
		setTip(`共${count}文章上榜`)
	}
	return (
		<div className='article-list'>
			<div className='article-list_left'>
				<Screen />
				<List />
			</div>
			<div className='article-list_right'>
				<Card left="20px" contHeight='auto' link='查看完整榜单' click={toRecommendAuthors}>
					<Authors />
				</Card>
				<Card top="20px" left="20px" contHeight='auto' title='热门文章' link={tip} linkNoIcon={false}>
					<Articles setArticleCount={setArticleCount}/>
				</Card>
			</div>			
		</div>
	)
}
