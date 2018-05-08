<template>
  <div class="alertQuit">
    <div class="masking" @click="wait"></div>
    <div class="alert">
      <div class="top">
        退出
      </div>
      <div class="alert-con">
        <p class="con-main">即将退出系统，是否退出？</p>
      </div>
      <div class="btn">
        <div class="backBtn" @click="back">
          <img src="../assets/img/alert/button_sign-out_n.png" alt="" slot="icon">
          <img src="../assets/img/alert/button_aign-out_pre.png" alt="" v-if="active">
        </div>
        <div class="thinkBtn" @click="wait">
          <img src="../assets/img/alert/button_weit-a-moment_n.png" alt="">
          <img src="../assets/img/alert/button_weit-a-moment_pre.png" alt="" v-if="active">
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    name: 'alertQuit',
    props: ['name'],
    // 子组件接收到父组件传过来的 name
    data () {
      return {
        active: false
      }
    },
    methods: {
      wait () {
        // 点击关闭按钮 this.$parent 获取到父组件
        // this.$parent[this.showName] 获取父组件中的 isAlertBox
        this.$parent[this.name] = false
      },
      back () {
        this.active = true
        this.$router.push({path: '/login'})
        // sessionStorage.removeItem('stuMessage')
        // sessionStorage.removeItem('info')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .masking {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 999;
    transition: all .3s ease-in-out;
  }

  .alert {
    text-align: center;
    color: #652411;
    width: 86%;
    height: 3.58rem;
    background-image: url("../assets/img/alert/leave_bg.png");
    background-size: 100% 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    z-index: 999;
    padding: 0 0.4rem;
  }

  .alert .top {
    font-size: 0.47rem;
    color: #6d1f07;
    text-align: center;
    line-height: 1.3rem;
    font-weight: bold;
  }

  .alert-con .con-main {
    text-align: center;
    font-size: 0.34rem;
    font-weight: bold;
    margin-top: 0.4rem;
    margin-left: 0.3rem;
  }
  .btn{padding: 0.19rem 0.4rem;overflow: hidden;}
  .btn .thinkBtn{float: right}
  .btn .backBtn,.thinkBtn{width: 1.6rem;height: 0.7rem;float: left;margin-top: 0.3rem;}
</style>
