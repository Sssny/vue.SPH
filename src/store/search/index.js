//search 仓库
import { reqGetSearchInfo } from "@/api"
const actions = {
    async getSearchList({ commit }, params = {}) {
        let result = await reqGetSearchInfo(params)
            // console.log(params);
            // console.log(result);
        if (result.code == 200) {
            commit('GETSEARCHLIST', result.data)
        }
    }
}
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList
    }
}
const state = {
        searchList: {}
    }
    //getters相当于计算属性
    //getters作用：简化数据
    //可以把在组件中用到的数据简化一下 ，将来用的时候方便一些
const getters = {
    // state为当前仓库的state 
    goodsList(state) {
        // '||[]'的作用是为了防止没网络时返回的是undefined，导致遍历出错
        return state.searchList.goodsList || []
    },
    attrsList(state) {
        return state.searchList.attrsList || []
    },
    trademarkList(state) {
        return state.searchList.trademarkList || []

    }

}
export default {
    namespaced: true,
    actions,
    mutations,
    state,
    getters
}