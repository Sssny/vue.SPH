import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.config.devtools = true
    //     //state: 仓库存储数据的地方
    // const state = {}
    //     //mutations：修改state的唯一方法
    // const mutations = {}
    //     //actions：可以进行逻辑的处理，还可以处理异步
    // const actions = {}
    //     //getters：相当于计算属性 ，用于简化仓库数据
    // const getters = {}
import home from './home'
import search from './search'
import detail from './detail'
import shopCart from './shopCart'
import user from './user'
import trade from './trade'
//对外暴露vuex
export default new Vuex.Store({
    modules: {
        home,
        search,
        detail,
        shopCart,
        user,
        trade
    }

})