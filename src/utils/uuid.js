import { v4 as uuidv4 } from 'uuid';
//向服务器获取购物车数据时，我们得带上身份才知道是谁的购物车

export const getUUid = () => {
    let uuidtoken = localStorage.getItem('UUIDTOKEN')
        //如果本地中没有uuid 则创建一个  因为这个id不能一直变 所以存储在本地，
    if (!uuidtoken) {
        uuidtoken = uuidv4()
        localStorage.setItem('UUIDTOKEN', uuidtoken)
    }
    //不要忘记返回值啊！！！！
    return uuidtoken
}