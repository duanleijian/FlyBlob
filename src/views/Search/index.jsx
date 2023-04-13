import React from 'react'
import QueryList from '@/views/Search/QueryList'
import style from './index.module.scss'
function Search(props) {		
	return (
		<div className={style.search}>			
			<QueryList/>
		</div>
	)
}
export default Search
