<template>
  <div id="app1">
    <Header></Header>
    <!-- 路由出口 -->
    <router-view></router-view>
    <Footer v-show="this.$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from './components/Header/index.vue'
import Footer from './components/Footer/index.vue'
export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
  mounted() {
    //通知vuex发请求 ，获取数据 存储在仓库中
    this.$store.dispatch('home/getlist')
  },
}
</script>

<style></style>
