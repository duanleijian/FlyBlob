import React, { Fragment, useEffect } from 'react'
import ArticleList from './ArticleList'
import { useLocation } from 'react-router-dom'
export default function Home() {		
	return (
		<Fragment>			
			<ArticleList />			
		</Fragment>
	)
}
