import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'
//使用插件
Vue.use(VueRouter)

let router = new VueRouter({
        //注意路径中的路由都是小写
        routes,
        scrollBehavior(to, from, savedPosition) {
            //y=0代表滚动到最上方
            return { y: 0 }
        }
    })
    //全局路由守卫
router.beforeEach(async(to, from, next) => {
    let token = store.state.user.token
    let name = store.state.user.userinfo.name
    if (token) { // 有token代表用户已经登录过了
        if (to.path == '/login') {
            next('/')
        } else {
            //登陆了 但不是去的login
            if (name) {
                next()
            } else { // 这里代表的情况是比如跳转到了search 刷新了网页后，
                //vuex中的userinfo没有了，但是token存到本地了还有，所以要发送请求根据token获取用户信息
                try {
                    await store.dispatch('user/GetUserInfo')
                    next()
                } catch (error) {
                    //这里的情况是 登陆了，有token了但是token过期了 所以获取不到用户信息了，需要重新登录
                    //1、清除token
                    await store.dispatch('user/userLogOut')
                    next('/login')
                }
            }
        }
    } else {
        //未登录还没处理
        //未登录不能去支付相关的、个人中心、
        let topath = to.path
        if (topath.indexOf('pay') != -1 || topath.indexOf('trade') != -1 || topath.indexOf('center') != -1) {
            next('/login?redirect=' + topath)
        } else {
            next()
        }
    }
})
export default router