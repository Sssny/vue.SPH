//detail 仓库
import { reqGoodsInfo } from "@/api"
import { reqAddOrUpdateCar } from "@/api"
import { getUUid } from '@/utils/uuid'
const actions = {
    async getGoodInfo({ commit }, id) {
        let result = await reqGoodsInfo(id)
        if (result.code == 200) {
            commit('GETGOODINFO', result.data)
        }
    },
    //async 函数返回的是一个promise 对象，并且Promise还有state和result，如果async函数中有返回值
    //当调用该函数时，内部会调用Promise.resolve()方法把它转化成一个promise对象作为返回，
    //但如果内部抛出错误呢？ 那么就会调用Promise.reject() 返回一个promise 对象

    //diapatch等发请求时只能携带两个参数，所以如果多参数时要写成一个对象的形式
    async AddOrUpdateCart({ commit }, { id, num }) {
        //把参数发送给服务器后 只返回了成功或失败，并没有其他的数据
        //所以不需要三连环存储数据
        let result = await reqAddOrUpdateCar(id, num)
        if (result.code == 200) {
            return 'okl'
        } else {
            return Promise.reject('失败')
        }
    }
}
const mutations = {
    GETGOODINFO(state, goodinfo) {
        state.goodinfo = goodinfo
    }
}
const state = {
        goodinfo: {},
        uuid: getUUid()
    }
    //getters相当于计算属性
    //getters作用：简化数据
    //可以把在组件中用到的数据简化一下 ，将来用的时候方便一些
const getters = {
    categoryView(state) {
        // [] 作用是为了防止服务器还没返回数据时，导致state.goodinfo为一个空对象进而导致.categoryView为undefined
        return state.goodinfo.categoryView || {}
    },
    skuInfo(state) {
        return state.goodinfo.skuInfo || {}
    },
    spuSaleAttrList(state) {
        return state.goodinfo.spuSaleAttrList || []
    }

}

export default {
    namespaced: true,
    actions,
    mutations,
    state,
    getters
}