import Vue from 'vue'
import App from './App.vue'
//引入路由
import router from '@/router'
//引入仓库 vuex
import store from '@/store'
//引入三级联动组件
import TypeNav from '@/components/TypeNav'
//引入轮播图组件
import Carsousel from '@/components/Carsousel'
//分页器
import Pagination from '@/components/Pagination'
//引入图片懒加载
import Vuelazyload from 'vue-lazyload'
import cxk from '@/assets/images/cxk.gif'
import 'element-ui/lib/theme-chalk/index.css';

//注册
Vue.use(Vuelazyload, {
        loading: cxk
    })
    //注册三级联动组件为全局组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carsousel.name, Carsousel)
Vue.component(Pagination.name, Pagination)
    //按需引入elementui
import { Button, Select, MessageBox } from 'element-ui';
Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
//还可以挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
//引入表单校验插件
import "@/plugins/validate"
//引入mock的数据
import '@/mock/mockServe'
//引入swiper样式
import 'swiper/css/swiper.css'
Vue.config.productionTip = false
    //分别暴露
import { getBaseCategoryList } from '@/api'
//统一引入 方便使用
import * as API from '@/api'
getBaseCategoryList()
new Vue({
    render: h => h(App),
    beforeCreate() {
        Vue.prototype.$bus = this
        Vue.prototype.$API = API
    },
    //注册路由
    router,
    //注册仓库
    store
}).$mount('#app')