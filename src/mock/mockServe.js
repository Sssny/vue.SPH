import Mock from 'mockjs'

//把json格式引入   (为什么json没暴露 可以直接引入)
// webpack会默认暴露 图片、json数据格式
import banner from './banner.json'
import floor from './floor.json'
//mock方法接受两个参数 请求地址 请求的数据
Mock.mock("/mock/banner", { code: 200, data: banner })
Mock.mock("/mock/floor", { code: 200, data: floor })