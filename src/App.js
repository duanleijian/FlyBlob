import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import { connect } from 'dva'
import './App.css';
import './common/icon/iconfont.css'
import RouterNavigate from '@/router/index.jsx'
function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<RouterNavigate />
			</BrowserRouter>
		</div>
	);
}

export default connect(({ keyword }) => ({ keyword }))(App);
