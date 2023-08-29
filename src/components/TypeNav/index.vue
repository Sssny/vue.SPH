<template>
      <!-- 商品分类导航 -->
        <div class="type-nav">
            <div class="container">
              <!-- 这里用到了事件的委派 -->
              <div  @mouseleave="RemoveColor()" @mouseenter="enter()">
                  <h2 class="all">全部商品分类</h2>
                  <transition name="sort">
                      <div class="sort" v-show="show">
                    <div class="all-sort-list2" @click="goSearch">
                        <div class="item" v-for="(c1,index) in categoryList" :key="c1.categoryId">
                            <h3 @mouseenter="ChangeIndex(index)"  :class="{cur:index==currentIndex}">
                                <a :data-categoryName='c1.categoryName' :data-category1ID='c1.categoryId'>{{c1.categoryName}}</a>
                            </h3>
                            <!-- 二 三级联动 -->
                            <div class="item-list clearfix" :style="{display:index==currentIndex?'block':'none'}">
                                <div class="subitem" v-for="(c2,index) in c1.categoryChild" :key="c2.categoryId">
                                    <dl class="fore">
                                        <dt>
                                            <a :data-categoryname='c2.categoryName' :data-category2ID='c2.categoryId'>{{c2.categoryName}}</a>
                                        </dt>
                                        <dd>
                                            <em v-for="(c3,index) in c2.categoryChild" :key="c3.categoryId">
                                                <a :data-categoryname='c3.categoryName' :data-category3ID='c3.categoryId'>{{c3.categoryName}}</a>
                                            </em>
                                       
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                   
                    </div>
                </div>
                  </transition>
              
              </div>
              

                <nav class="nav">
                    <a href="###">服装城</a>
                    <a href="###">美妆馆</a>
                    <a href="###">尚品汇超市</a>
                    <a href="###">全球购</a>
                    <a href="###">闪购</a>
                    <a href="###">团购</a>
                    <a href="###">有趣</a>
                    <a href="###">秒杀</a>
                </nav>
              
            </div>
        </div>
</template>

<script>
import {lodash} from 'lodash'
import {mapActions} from 'vuex'
import {mapState} from 'vuex'
export default {
name:'TypeNav',
data() {
  return {
    currentIndex:-1,
    //show控制在search组件中是否显示
    show:true
  }
},
methods: {
  // ChangeIndex(index){
  //   //用户行为操作过快 ，会出现卡顿，防抖与节流
  //     this.currentIndex = index
  // },
  ChangeIndex: _.throttle(function(index){
              this.currentIndex = index
  },50),
  goSearch(event){
  //如何知道点击的是a标签 ，可以给a标签添加自定义属性 ，这样的话，可以通过判断是否有这个自定义属性来判断是不是a标签
       let ele = event.target
       let {categoryname,category1id,category2id,category3id} = ele.dataset
  //如何知道是哪一个id 也可以通过绑定自定义属性
     if(categoryname){
       // 整理路由跳转参数
       let location = {name:'sousuo'}
       let query = {categoryName:categoryname}
         if(category1id){
    query.category1ID = category1id
         }else if(category2id){
query.category2ID = category2id
         }else{
query.category3ID = category3id
         }
         console.log(this.$route.params);
      if(this.$route.params){
     location.params = this.$route.params 
     location.query = query
     this.$router.push(location)
     }
     }
     
  },

  RemoveColor(){
    this.currentIndex=-1
    if(this.$route.path!='/home'){
    this.show=false
    }

  },
  enter(){ 
      this.show=true 
  }
},
computed:{
// ...mapState({
//   //对象写法 右侧是一个函数，其中的参数state代表大仓库中的数据  
//   categoryList:(state)=>{ return state.home.categorylist}
// })

//开启命名空间后，要写明白 模块的名字
...mapState('home',{categoryList:'categorylist'})

  //  categoryList= this.$store.state.home.categorylist
},
mounted() {
  //如果在typenav的mounted中写的话，每切换一次组件 都会求情一次，性能不好
  if(this.$route.path!='/home'){
    this.show=false
  }
},
}


</script>
    
<style lang="less" scoped>
.type-nav {
        border-bottom: 2px solid #e1251b;

        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 461px;
                position: absolute;
                background: #fafafa;
                z-index: 999;

                .all-sort-list2 {
                    .item {
                        h3 {
                            line-height: 30px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;

                            a {
                                color: #333;
                            }
                        }

                        .item-list {
                            display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }

                        &:hover {
                            // .item-list {
                            //     display: block;
                            // }
                        }
                    }
                    .cur {
                      background-color:skyblue;
                    }
                }
            }
            // 过渡动画
            .sort-enter {
            height: 0px;
            }
            .sort-enter-to {
              height: 461px;
            }
            .sort-enter-active {
              transition: all .5s linear ;
            }
        }
    }
</style>