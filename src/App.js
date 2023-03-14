import React, { Suspense } from 'react';
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { connect } from 'dva'
import './App.css';
import './common/icon/iconfont.css'
import RouterNavigate from '@/router/index.jsx'
import NotFound from '@/views/NotFound';
import Loading from '@/components/Loading';
function App() {
	return (
		<div className="App">
			<HashRouter>
				<Suspense fallback={<Loading boxWidth="100vw" boxHeight="100vh" loadName="页面跳转中..."/>}>
					<RouterNavigate />
				</Suspense>
			</HashRouter>
		</div>
	);
}

export default connect(({ keyword }) => ({ keyword }))(App);
// export default App;
