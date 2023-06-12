import axios from 'axios'
import { refreshAuthToken } from '@/api/user'
import { hasToken, delToken, delUser, delRefreshToken, getToken, setToken, getRefreshToken } from '@/utils/auth'
// 是否正在刷新token
let isRefreshing = false
// 请求列表
let requests = []
// 创建实例
const service = axios.create({
	baseURL: '/api',
	timeout: 10000
})
// request拦截器
service.interceptors.request.use(config => {
	// 是否需要设置 token  
	const headerToken = getToken()
	if (!config.url.includes('?v=')) {
		config.url += `?v=${new Date().getTime()}`
	}
	if (headerToken) {
		!config.headers && (config.headers = {})
		config.headers.Authorization = headerToken
	}
	return config
}, error => {
	console.log(error)
	Promise.reject(error)
})
export default service
// 响应拦截器
service.interceptors.response.use(response => {
	console.log('response', response);
	// 未设置状态码则默认成功状态
	const code = response.data.code || 200;

	// if (code === 401) {	
	// 	if (hasToken()) {
	// 		delToken()
	// 		delUser()
	// 	}
	// 	window.location.href = '/account'		
	// }

	if (code === 402) {
		if (!isRefreshing) {
			let authToken = getToken()
			let refreshToken = getRefreshToken()
			refreshAuthToken({authToken, refreshToken}).then(res => {
				if (res.code === 200) {
					let { authToken } = res.data
					authToken && setToken(authToken)
					response.headers.Authorization = authToken
					requests.forEach((cb) => cb(authToken))
          			requests = [] // 重新请求完清空
					// return service(response.config)
				} else {
					delToken()
					delUser()
					delRefreshToken()
					window.location.href = '#/account'
					return Promise.reject(res.msg)
				}
			}).finally(() => {
				isRefreshing = false
			})
			return new Promise(resolve => {
				requests.push(token => {
					response.headers.Authorization = token
					resolve(service(response.config))
				})
			})
		} else {
			return new Promise(resolve => {
				// 用函数形式将 resolve 存入，等待刷新后再执行
				requests.push(token => {
					response.headers.Authorization = token
					resolve(service(response.config))
				})
			})
		}
	} else {
		return response.data
	}
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