import React from 'react'
import { connect } from 'dva'
import { useParams, useSearchParams } from 'react-router-dom'
import QueryList from '@/views/Search/QueryList'
import style from './index.module.scss'
function Search(props) {		
	const [params] = useSearchParams()	
	return (
		<div className={style.search}>			
			<QueryList/>
		</div>
	)
}
export default Search
