import React, { Fragment } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Home  from './Home/index'
import TopHeader from '@/components/TopHeader'
export default function Index(props) {
	const loaction = useLocation()		
	return (
		<Fragment>			
			<TopHeader />
			{loaction.pathname.endsWith('/')? <Home/> : <Outlet />}			
		</Fragment>
	)
}
