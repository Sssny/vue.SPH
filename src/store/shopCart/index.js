//search 仓库

import { reqCarList, reqDeletCartById, reqUpdataCartById } from "@/api"
const actions = {
    async getCartList({ commit }) {
        let result = await reqCarList()
        if (result.code == 200) {
            commit('GETCARLIST', result.data)
        }
    },
    //删除商品
    async DeletCartById({ commit }, skuid) {
        let result = await reqDeletCartById(skuid)
        if (result.code == 200) {
            return 'delete ok'
        } else {
            return Promise.reject(new Error('delete faile'))
        }
    },
    //切换商品选中状态
    async UpdataCartById({ commit }, { skuId, isChecked }) {
        let result = await reqUpdataCartById(skuId, isChecked)
        if (result.code == 200) {
            return 'update ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //删除所有选中的产品
    deleteAllChecked({ commit, getters, dispatch }) {
        //context 对象相当于是一个小仓库，里面有getters dispatch state等
        //我们可以通过getters拿到数据 遍历数据
        //通过promise.all方法判断是否所有的删除操作都成功
        let promiseAll = []
        let goods = getters.cartList.cartInfoList
        goods.forEach(item => {
            let promise = item.isChecked == 1 ? dispatch('DeletCartById', item.skuId) : ''
            promiseAll.push(promise)
        });
        console.log(Promise.all(promiseAll));
        return Promise.all(promiseAll)
    },
    //通过底部全选 控制商品的选中状态
    UpdataAllCheck({ commit, getters, dispatch }, isChecked) {
        let goods = getters.cartList.cartInfoList || []
        console.log(goods);
        let promiseAll = []

        goods.forEach((item) => {
            let promise = dispatch('UpdataCartById', { skuId: item.skuId, isChecked })
            promiseAll.push(promise)
        });
        return Promise.all(promiseAll)
    }
}
const state = {
    cartList: []
}
const mutations = {
    GETCARLIST(state, cartList) {
        state.cartList = cartList

    },
}

const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    },
    cartInfoList(state) {}
}
export default {
    namespaced: true,
    actions,
    mutations,
    state,
    getters
}