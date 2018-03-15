<template>
  <div class="home">
    <tabbar>
      <tabbar-item link="/home/recharge">
        <img slot="icon" >
        <span slot="label">充值</span>
      </tabbar-item>
      <tabbar-item  link="/home/market">
        <img slot="icon" >
        <span slot="label">市集</span>
      </tabbar-item>
      <tabbar-item link="/home/interaction">
        <img slot="icon">
        <span slot="label">游戏互动</span>
      </tabbar-item>
      <tabbar-item badge="2" link="/home/index">
        <img slot="icon">
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
    <router-view></router-view>
  </div>
</template>
<script>
  import { Tabbar, TabbarItem, Group, Cell } from 'vux'
  export default {
    data () {
      return {
      }
    },
    components: {
      Tabbar,
      TabbarItem,
      Group,
      Cell
    },
    name: 'home'
  }
</script>
<style scoped>

</style>
