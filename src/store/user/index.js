//用户注册登录 仓库
import { reqGetCode, reqUserRegister, reqUserLogin, reqGetUserInfo, reqLogOut } from "@/api"
const actions = {
    async GetCode({ commit }, phone) {
        let result = await reqGetCode(phone)
        if (result.code == 200) {
            commit('GETCODE', result.data)
            return 'ok'
        } else {
            return new Promise.reject(new Error('send faile'))
        }
    },
    async UserRegister({ commit }, user) {
        let result = await reqUserRegister(user)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('注册失败'))
        }
    },
    //登陆业务【token】
    async UserLogin({ commit }, user) {
        let result = await reqUserLogin(user)
        if (result.code == 200) {
            commit('USERLOGIN', result.data.token)
            localStorage.setItem('TOKEN', result.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error('登录失败'))
        }
    },
    //根据token获取用户信息
    async GetUserInfo({ commit }) {
        let result = await reqGetUserInfo()
        if (result.code == 200) {
            commit('GETUSERINFO', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('获取用户信息失败'))
        }
    },
    //退出登录
    async userLogOut({ commit }) {
        //向服务器发起请求 通知服务器清除token
        let result = await reqLogOut()
        if (result.code == 200) {
            //成功的话我们要清除本地的用户信息，但是不能在actions里操作state
            commit('CLEAR')
            return 'ok'
        } else {
            return Promise.reject(new Error('退出失败'))
        }
    }
}
const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    USERLOGIN(state, token) {
        state.token = token
    },
    GETUSERINFO(state, userinfo) {
        state.userinfo = userinfo
    },
    CLEAR(state) {
        state.token = '',
            state.userinfo = ''
        localStorage.removeItem('TOKEN')
    }
}
const state = {
    code: '',
    token: localStorage.getItem('TOKEN') || '',
    userinfo: ''
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