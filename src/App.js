import React, { Suspense } from 'react';
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { connect } from 'dva'
import './App.css';
import './common/icon/iconfont.css'
import RouterNavigate from '@/router/index.jsx'
import NotFound from '@/views/NotFound';

function App(props) {
	let { dispatch, keyword } = props	
	return (
		<div className="App">
			<HashRouter>
				<Suspense fallback={<div></div>}>
					<RouterNavigate />
				</Suspense>
			</HashRouter>
		</div>
	);
}

export default connect(({ keyword }) => ({ keyword }))(App);
// export default App;
