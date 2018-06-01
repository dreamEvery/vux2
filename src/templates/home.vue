<template>
  <div class="home">
    <tabbar>
      <tabbar-item :selected="location==='/home/recharge'" :link="{path:'/home/recharge',replace: true}" >
        <img slot="icon" src="../assets/img/tabBar/recharge_n.png" class="tab-icon">
        <img slot="icon-active" src="../assets/img/tabBar/recharge_s.png" class="tab-active" alt="充值">
      </tabbar-item>
      <tabbar-item :selected="location=== '/home/market'" :link="{path:'/home/market',replace: true}"  >
        <img slot="icon" src="../assets/img/tabBar/a-market_n.png">
        <img slot="icon-active" src="../assets/img/tabBar/a-market_s.png" class="tab-active" alt="市集">
      </tabbar-item>
      <tabbar-item :selected="location=== '/home/interaction'" :link="{path:'/home/interaction',replace: true}" >
        <img slot="icon" src="../assets/img/tabBar/game-interaction_n.png">
        <img slot="icon-active" src="../assets/img/tabBar/game-interaction_s.png" alt="游戏互动" class="tab-active">
      </tabbar-item>
      <tabbar-item :selected="location=== '/home/index'" :link="{path:'/home/index',replace: true}" >
        <img slot="icon" src="../assets/img/tabBar/my_n.png">
        <img slot="icon-active" src="../assets/img/tabBar/my_s.png" alt="我的" class="tab-active">
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
        active: false,
        location:this.$route.path
      }
    },
    components: {
      Tabbar,
      TabbarItem,
      Group,
      Cell
    }
  }
</script>
<style>
  .home .weui-tabbar{background-color: transparent;}
  .weui-tabbar .weui-tabbar__icon {
    width: 0.8rem;
    height: 1rem;
  }
  .weui-tabbar .weui-tabbar__item{padding: 26px 0 0!important;}
  .weui-tabbar .weui-tabbar__item .weui-tabbar__icon{margin-top: 0.3rem}

  .weui-tabbar .weui-bar__item_on .weui-tabbar__icon {
    width: 1.8rem;
    height: 1.5rem;
    margin-top: 0;
  }
  .tab-active {
    animation: mymove  2s linear 2 0s;
  }
  @keyframes mymove {
    0%   {width: 100%;height: 100%;}
    50%  {width: 85%;height: 85%}
    100% {width: 100%;height: 100%}
  }


</style>
