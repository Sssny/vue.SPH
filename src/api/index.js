import requests from "./request";
import MockRequests from "./mockAjax"
//获取商品分类数据
export const getBaseCategoryList = () => {
    //axios的函数写法  返回的是一个Promise对象
    return requests({ url: '/product/getBaseCategoryList', method: 'get' })
}

export const getListBanner = () => {
        return MockRequests({ url: '/banner', method: 'get' })
    }
    //获取floor数据
export const getFloor = () => {
    return MockRequests({ url: '/floor', method: 'get' })
}

//获取搜索模块的数据，要带参数  注意，请求带参数的时候 参数至少是一个空对象才可以发送请求成功
export const reqGetSearchInfo = (params) => {
        return requests({ url: '/list', method: 'post', data: params })
    }
    //获取商品详情信息 ，需要带产品的id参数
export const reqGoodsInfo = (id) => {
        return requests({ url: `/item/${id}`, method: 'get' })
    }
    //将产品添加到购物车or更新产品的个数
export const reqAddOrUpdateCar = (skuId, skuNum) => {
        return requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })

    }
    //向服务器获取购物车数据
export const reqCarList = () => {
        return requests({ url: '/cart/cartList', method: 'get' })

    }
    //删除购物车产品
export const reqDeletCartById = (skuId) => {
        return requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })
    }
    //修改商品状态
export const reqUpdataCartById = (skuId, isChecked) => {
        return requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' })

    }
    //获取验证码
export const reqGetCode = (phone) => {
        return requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' })

    }
    //用户注册
export const reqUserRegister = (data) => {
        return requests({ url: `/user/passport/register`, data: data, method: 'post' })

    }
    //用户登录
export const reqUserLogin = (data) => {
        return requests({ url: `/user/passport/login`, data: data, method: 'post' })
    }
    //根据token获取用户信息
export const reqGetUserInfo = () => {
        return requests({ url: `/user/passport/auth/getUserInfo`, method: 'get' })
    }
    //退出登录
export const reqLogOut = () => {
        return requests({ url: `/user/passport/logout`, method: 'get' })
    }
    //获取用户收货地址
export const reqUserAddress = () => {
        return requests({ url: `/user/userAddress/auth/findUserAddressList`, method: 'get' })
    }
    //获取购物车商品清单
export const reqOrderInfo = () => {
        return requests({ url: `/order/auth/trade`, method: 'get' })
    }
    //提交订单 携带query 交易编号 通过data携带其他的信息
export const reqSubmitOrder = (tradeNo, data) => {
        return requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'post' })
    }
    //根据订单号获取支付信息
export const reqPayInfo = (OrderId) => {
        return requests({ url: `/payment/weixin/createNative/${OrderId}`, method: 'get' })
    }
    //向后台一直发送请求，获取支付是否成功
export const reqPayStatus = (OrderId) => {
        return requests({ url: `/payment/weixin/queryPayStatus/${OrderId}`, method: 'get' })
    }
    //获取我的订单数据
export const reqMyOrderList = (page, limit) => {
    return requests({ url: `/order/auth/${page}/${limit}`, method: 'get' })
}