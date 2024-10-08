import axios from 'axios'

// 创建axios实例
const service = axios.create({
    baseURL: "/api/",
    // baseURL: "/youtu/api",
    timeout: 5000,
    headers: {
        "Content-type": "application/json;charset=utf-8",
        "Access-Control-Allow-Origin":"*",
        'X-Requested-With': 'XMLHttpRequest',
    }
})

// 请求拦截
service.interceptors.request.use((config) => {
    config.headers = config.headers || {}

    if (localStorage.getItem('token')) {
        config.headers.token = localStorage.getItem('token') || ""
    }

    if(config.method==='post' || config.method==='POST'){
        config.data=JSON.stringify(config.data)
      }

    return config
}, err => {
    console.log(err);
  })

// 响应拦截
service.interceptors.response.use((res) => {
    const code: number = res.data.code
    if (code != 200) {
        return Promise.reject(res.data)

    }

    return res.data
},(err)=>{
console.log(err)

})

export default service