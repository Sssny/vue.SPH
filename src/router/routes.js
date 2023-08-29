import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSucess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import myOrder from '@/pages/Center/myOrder'
import groupOrder from '@/pages/Center/groupOrder'
//路由懒加载示例
const Lazy_home = () => {
    console.log(12332313);
    return import ('@/pages/Home')
}
export default [{
        path: '/Home',
        component: Lazy_home,
        meta: { show: true }
    },
    {
        path: '/Search/:keyword?',
        component: Search,
        meta: { show: true },
        name: 'sousuo'
    },
    {
        path: '/Login',
        component: Login,
        meta: { show: false }
    },
    {
        path: '/Register',
        component: Register,
        meta: { show: false }
    },
    {
        //要带参传给服务器，所以要占位
        path: '/Detail/:skuid',
        component: Detail,
        meta: { show: false }
    },
    {
        path: '/AddCartSucess',
        name: 'addCart',
        component: AddCartSucess,
        meta: { show: false }
    },
    {
        path: '/ShopCart',
        name: 'shopcart',
        component: ShopCart,
        meta: { show: false }
    },
    {
        path: '/Trade',
        name: 'Trade',
        component: Trade,
        meta: { show: false }
    }, {
        path: '/Pay',
        name: 'Pay',
        component: Pay,
        meta: { show: false }
    }, {
        path: '/PaySuccess',
        name: 'PaySuccess',
        component: PaySuccess,
        meta: { show: false }
    },
    {
        path: '/center',
        name: 'center',
        component: Center,
        meta: { show: false },
        children: [{
            path: 'myorder',
            name: 'myOrder',
            component: myOrder,
        }, {
            path: 'grouporder',
            name: 'GroupOrder',
            component: groupOrder,
        }, {
            path: '/center',
            redirect: '/center/myorder'
        }]
    },
    {
        path: '*',
        redirect: "/home"
    }
]