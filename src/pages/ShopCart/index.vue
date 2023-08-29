<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="(good, index) in cartInfoList"
          :key="index"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="good.isChecked == 1"
              @change="UpdataCartById(good.skuId, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="good.imgUrl" />
            <div class="item-msg">
              {{ good.skuName }}
            </div>
          </li>

          <li class="cart-list-con4">
            <span class="price">{{ good.cartPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handler('minus', -1, good)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              minnum="1"
              class="itxt"
              :value="good.skuNum"
              @change="handler('change', $event.target.value, good)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handler('add', 1, good)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ good.cartPrice * good.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCartById(good.skuId)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllChecked && cartInfoList.length > 0"
          @change="updateAllCheck"
          :disabled="cartInfoList.length == 0"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllChecked">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" @click="goTrade">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { lodash } from 'lodash'
export default {
  name: 'ShopCart',
  mounted() {
    this.$store.dispatch('shopCart/getCartList')
  },
  computed: {
    ...mapGetters('shopCart', { cartList: 'cartList' }),
    cartInfoList() {
      return this.cartList.cartInfoList || []
    },
    //计算总价
    totalPrice() {
      let sum = 0
      this.cartInfoList.forEach((item) => {
        if (item.isChecked == 1) {
          sum += item.cartPrice * item.skuNum
        }
      })
      return sum
    },
    //底部复选框是否勾选
    isAllChecked() {
      //可以用数组的every方法，只要有一项不符合就返回false
      return this.cartInfoList.every((item) => {
        return item.isChecked == 1
      })
    },
  },
  methods: {
    handler: _.throttle(async function (type, changeNum, good) {
      switch (type) {
        case 'add':
          changeNum = 1
          break
        case 'minus':
          changeNum = good.skuNum > 1 ? -1 : 0

          break
        case 'change':
          if (isNaN(changeNum) || changeNum < 1) {
            changeNum = 0
          } else {
            changeNum = parseInt(changeNum) - good.skuNum
          }
          break
      }
      try {
        //这里只代表了 把购物车的商品修改成功了，还需要再次发送请求，获取购物车商品
        await this.$store.dispatch('detail/AddOrUpdateCart', {
          id: good.skuId,
          num: changeNum,
        })
        this.$store.dispatch('shopCart/getCartList')
      } catch (error) {
        console.log(error)
      }
    }, 2000),
    //删除商品
    async deleteCartById(id) {
      try {
        await this.$store.dispatch('shopCart/DeletCartById', id)
        this.$store.dispatch('shopCart/getCartList')
      } catch (error) {
        alert(error.message)
      }
    },
    //修改商品的选中状态
    async UpdataCartById(id, event) {
      let isChecked = event.target.checked ? '1' : '0'
      await this.$store.dispatch('shopCart/UpdataCartById', {
        skuId: id,
        isChecked,
      })
      this.$store.dispatch('shopCart/getCartList')
    },
    //删除全部勾选的产品
    async deleteAllChecked() {
      try {
        await this.$store.dispatch('shopCart/deleteAllChecked')
        this.$store.dispatch('shopCart/getCartList')
      } catch (error) {
        alert(error.message)
      }
    },
    //通过底部全选按钮修改商品的选中状态
    async updateAllCheck(event) {
      try {
        let isChecked = event.target.checked ? '1' : '0'
        await this.$store.dispatch('shopCart/UpdataAllCheck', isChecked)
        this.$store.dispatch('shopCart/getCartList')
      } catch (error) {
        console.log(error.message)
      }
    },
    //结算跳转到购物车
    goTrade() {
      this.$router.push('/trade')
    },
  },
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: 'Microsoft YaHei';
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
