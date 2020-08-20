import axios from 'axios'
import store from '../store/index.js'
import route from '../router'
let instance = axios.create({
  baseURL: "/api",//最终会跟传进来的url进行拼接
  timeout: "5000" //请求过期时间
})

//请求拦截
instance.interceptors.request.use((config) => {
  // console.log(config)
  // let token = localStorage.getItem('token')
  // if (token) {
    config.headers.authorization = store.state.user.token
  // }
  return config
}, (err) => {
  Promise.reject(err)
})

instance.interceptors.response.use((res)=>{
  if(res.data.code == "403"){
    route.push('/login')
  }
  return res
},error => {
  Promise.reject(err)
})

function get(url, params) {
  return instance.get(url, {
    params
  })
}

function post(url, data) {
  return instance.post(url, data)
}

export default {
  get,
  post
}
