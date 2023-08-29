//home 仓库
import requests from "@/api/request"
import { getBaseCategoryList } from '@/api'
import { getListBanner, getFloor } from '@/api'
const actions = {
    async getlist({ commit }) {
        let result = await getBaseCategoryList()
            //console.log(result);
        if (result.code === 200) {
            commit('GETLIST', result.data)
        }
    },
    //获取floor数据
    async getfloorlist({ commit }) {
        let result = await getFloor()
        if (result.code === 200) {
            commit('GETFLOORLIST', result.data)
        }
    },
    //轮播图数据
    async getbanner({ commit }) {
        let result = await getListBanner()
        if (result.code === 200) {
            commit('GETBANNER', result.data)
        }

    }
}
const mutations = {
    GETLIST(state, categorylist) {
        state.categorylist = categorylist
    },
    GETBANNER(state, bannerlist) {
        state.bannerlist = bannerlist
    },
    GETFLOORLIST(state, floorlist) {
        state.floorlist = floorlist
    }

}
const state = {
    categorylist: [],
    bannerlist: [],
    floorlist: []
}

export default {
    namespaced: true,
    actions,
    mutations,
    state
}