//对axios 进行封装，主要是他的 【请求、响应】拦截器
import axios from 'axios'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
//1、利用create方法 创建一个axios实例
const Mockrequests = axios.create({
        //基础路径，以后发送请求的时候可以不写api
        baseURL: "/mock",
        //超时时间
        timeout: 5000,
    })
    //请求拦截器，可以在发送之前处理一些事情
Mockrequests.interceptors.request.use((config) => {
    //config对象里有一个很重要的属性：headers请求头
    nprogress.start()
    return config
})
Mockrequests.interceptors.response.use((res) => {
    //响应成功的回调
    nprogress.done()
    return res.data
}, (error) => {
    //响应失败的回调
    return Promise.reject(new Error('失败'))
})
export default Mockrequests