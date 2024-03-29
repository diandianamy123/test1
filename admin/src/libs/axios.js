import Axios from 'axios' 
import config from '@/config'
import Cookies from 'js-cookie'
import { getToken } from '@/libs/util'
Axios.defaults.timeout = 10000 // 响应时间

Axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro // 配置接口地址


// 添加一个请求拦截器
Axios.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers.common['token'] = getToken();
    }
    // if (config.method === 'post') {
    //   config.data = qs.stringify(config.data)
    // }
    return config
  },
  error => {
    _.toast('错误的传参', 'fail')
    return Promise.reject(error)
  }
)

// 响应拦截器
Axios.interceptors.response.use(
  function (response) {
    if (response.data.state == "401") {
      localStorage.clear()
      Cookies.remove("macc-token");
      alert('登录已过期，请重新登录')
      if (process.env.NODE_ENV == "production") {
        window.location.href = '/macc/index.html#/login';
      } else {
        window.location.href = '/';
      }
      return
    } else {
      return response
    }
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default Axios