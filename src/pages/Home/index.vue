<template>
  <div>
    <TypeNav />
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <Floor v-for="(floor, index) in floorlist" :key="floor.id" :list="floor" />
    <Brand />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { mapActions } from 'vuex'
import ListContainer from '@/pages/Home/ListContainer'
import Recommend from '@/pages/Home/Recommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'

export default {
  name: 'Home',
  components: { ListContainer, Recommend, Rank, Like, Floor, Brand },
  methods: {},
  computed: {
    ...mapState('home', { floorlist: 'floorlist' }),
  },
  mounted() {
    //获取floor组件数据
    this.$store.dispatch('home/getfloorlist')
  },
}
</script>

<style></style>
