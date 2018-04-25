<template>
  <div class="home">
    <tabbar>
      <tabbar-item link="/home/recharge" >
          <img slot="icon" src="../assets/img/map/tab_recharge_n.png" class="tab-icon">
          <img slot="icon-active" src="../assets/img/map/tab_recharge_pre.png" class="tab-active"alt="充值">
      </tabbar-item>
      <tabbar-item link="/home/market">
        <img slot="icon" src="../assets/img/map/tab_a-market_n.png">
        <img slot="icon-active" src="../assets/img/map/tab_a-market_pre.png" class="tab-active" alt="市集">
      </tabbar-item>
      <tabbar-item link="/home/interaction">
        <img slot="icon" src="../assets/img/map/tab_game-interaction_n.png">
        <img slot="icon-active" src="../assets/img/map/tab_game-interaction_pre.png" alt="游戏互动" class="tab-active">
      </tabbar-item>
      <tabbar-item selected link="/home/index">
        <img slot="icon" src="../assets/img/map/tab_my_n.png">
        <img slot="icon-active" src="../assets/img/map/tab_my_pre.png" alt="我的" class="tab-active">
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
        active: false
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
<style>
  .weui-tabbar .weui-tabbar__icon {
    width: 1.4rem;
    height: 1.4rem;
  }
</style>
