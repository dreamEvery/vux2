<template>
  <div class="alertSuccess">
    <div class="masking" @click="close"></div>
    <div class="successAlert">
      <p class="alert-top">
        <img src="../assets/img/alert/图层-4.png" alt="">
      </p>
      <div class="alert-con">
        <div class="giveWin">
          <img src="../assets/img/alert/赠送成功.png" alt="">
        </div>
        <p class="cube">
          <img src="../assets/img/alert/魔方.png" alt="">
        </p>
        <p class="title">已送出，等待小伙伴接受!</p>
        <router-link class="ok" @click="okBtn()" to="/home/index">
          <img src="../assets/img/alert/well_button_n.png" alt="" v-if="ok">
          <img src="../assets/img/alert/well_button_pre.png" alt=""  v-if="!ok">
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'alertSuccess',
    props: ['show'],
    // 子组件接收到父组件传过来的 showName
    data () {
      return {
        ok: true
      }
    },
    methods: {
      close () {
        // 点击关闭按钮 this.$parent 获取到父组件
        // this.$parent[this.showName] 获取父组件中的 isAlertBox
        this.$parent[this.show] = false
      },
      okBtn: function () {
        this.ok = false
      }
    },
    watch: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .alert-con{width: 100%;height: 5rem;}
  .alert-con .giveWin{width: 6rem;height: 4rem;margin: 0 auto;}
  .masking {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    transition: all .3s ease-in-out;
    z-index: 999;
  }

  .successAlert {
    width: 100%;
    height: auto;
    position: fixed;
    z-index: 1000;
  }

  .successAlert .alert-top {
    width: 80%;
    margin: 0 auto;
  }

  .cube {
    width: 2.93rem;
    height: 2.82rem;
    margin: 0 auto;
    margin-bottom: 0.4rem;
  }

  .cube img {
    width: 100%;
    height: 100%;
    transition: All 0.4s ease-in-out;
    -webkit-transition: All 0.4s ease-in-out;
    -moz-transition: All 0.4s ease-in-out;
    -o-transition: All 0.4s ease-in-out;
    transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
  }
  .alert-con .ok{width: 2.4rem;height: 0.9rem;margin: 0 auto;display: block;}
  .alert-con .title{text-align: center;color: #fff;font-size: 0.32rem;margin-bottom: 0.4rem}
</style>
