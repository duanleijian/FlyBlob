import React from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import dva from 'dva'
import {createBrowserHistory as createHistory} from 'history';
import keyword from './models/keyword';
import user from './models/user';

const app = dva({history: createHistory()});
app.model(keyword);
app.model(user);
app.router(props => <App {...props} />);
app.start('#root');
document.title = "飞识技术分享"
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
