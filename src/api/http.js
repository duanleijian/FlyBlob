import axios from 'axios'
import { hasToken, delToken, delUser } from '@/utils/auth'
// 创建实例
const service = axios.create({
	baseURL: '/api',
	timeout: 10000
})
// request拦截器
service.interceptors.request.use(config => {
	// 是否需要设置 token  
	return config
}, error => {
	console.log(error)
	Promise.reject(error)
})
export default service
// 响应拦截器
service.interceptors.response.use(res => {
	// 未设置状态码则默认成功状态
	const code = res.data.code || 200;

	if (code === 401) {	
		if (hasToken()) {
			delToken()
			delUser()
		}
		// window.location.href = '/account'		
	}
	return res.data
},
	error => {
		console.log('err' + error)
		let { message } = error;
		if (message.includes("Network Error")) {
			message = "后端接口连接异常";
		}
		else if (message.includes("timeout")) {
			message = "系统接口请求超时";
		}
		else if (message.includes("Request failed with status code")) {
			message = "系统接口" + message.substr(message.length - 3) + "异常";
		}
		return Promise.reject(error)
	}
)