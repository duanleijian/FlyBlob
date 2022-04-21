import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom'
import { connect } from 'dva'
import './App.css';
import './common/iconfont.css'
import RouterNavigate from '@/router/index.jsx'
import NotFound from '@/views/NotFound';

function App(props) {
	let { dispatch, keyword } = props	
	return (
		<div className="App">
			<BrowserRouter>
				<Suspense fallback={<div></div>}>
					<RouterNavigate />
				</Suspense>
			</BrowserRouter>
		</div>
	);
}

export default connect(({ keyword }) => ({ keyword }))(App);
// export default App;
