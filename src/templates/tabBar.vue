<template>
  <div class="home">
    <div class="tabBar">
      <div  @click="activeIcon(0)" :class="{'open':show}" class="iconbox">
        <img class="icon" src="../assets/img/tabBar/recharge_n.png" v-show="iconActive">
        <img class="icon-active" src="../assets/img/tabBar/recharge_s.png" alt="充值" v-show="!iconActive">
      </div>
      <div  @click="activeIcon(1)" :class="{'open':show}" class="iconbox">
        <img class="icon" src="../assets/img/tabBar/a-market_n.png" v-show="iconActive">
        <img class="icon-active" src="../assets/img/tabBar/a-market_s.png" alt="市集" v-show="!iconActive">
      </div>
      <div  @click="activeIcon(2)" :class="{'open':show}" class="iconbox">
        <img class="icon" src="../assets/img/tabBar/game-interaction_n.png" v-show="iconActive">
        <img class="icon-active" src="../assets/img/tabBar/game-interaction_s.png" alt="游戏互动" v-show="!iconActive">
      </div>
      <div  @click="activeIcon(3)" :class="{'open':show}" class="iconbox">
        <img class="icon" src="../assets/img/tabBar/my_n.png" v-show="iconActive">
        <img class="icon-active" src="../assets/img/tabBar/my_s.png" alt="我的" v-show="!iconActive">
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        iconActive: true,
        show: false
      }
    },
    name: 'home',
    methods: {
      activeIcon (index) {
        this.iconActive = false
        this.show = !this.show
      }
    }
  }
</script>
<style>
  .tabBar {
    display: flex;
    position: absolute;
    z-index: 500;
    bottom: 0;
    width: 100%;
    flex-direction: row;
    height: 16%;
    margin-top: 0.2rem;
  }
  .home .tabBar .open{padding: 0;}
  .tabBar .iconbox{flex: 1;padding: 0.4rem 0.4rem; touch-action: none;}
  .tabBar div .icon{text-align: center;vertical-align: middle;}
  .tabBar div .icon-active{width: 100%;height: 100%;}
</style>
