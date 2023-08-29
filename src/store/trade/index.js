import { reqUserAddress, reqOrderInfo } from "@/api"

const actions = {
    //获取用户收货地址
    async GetUserAddress({ commit }) {
        let result = await reqUserAddress()
        if (result.code == 200) {
            commit('GETUSERADDRESS', result.data)
        }
    },
    //获取用户订单信息
    async GetOrderInfo({ commit }) {
        let result = await reqOrderInfo()
        if (result.code == 200) {
            commit('GETORDERINFO', result.data)
        }
    }
}
const mutations = {
    GETUSERADDRESS(state, address) {
        state.address = address
    },
    GETORDERINFO(state, orderinfo) {
        state.orderinfo = orderinfo

    }
}
const state = {
    address: [],
    orderinfo: {}
}
const getters = {

}

export default {
    namespaced: true,
    actions,
    mutations,
    state,
    getters
}