<template>
  <div class="alertSuccess">
    <div class="masking" @click="close"></div>
    <div class="successAlert">
      <div class="alert-con">
        <div class="exchangeWin">
          <img src="../assets/img/alert/兑换成功.png" alt="">
        </div>
        <p class="cube">
          <img src="../assets/img/alert/魔方.png" alt="">
        </p>
        <p class="title">兑换成功，请到兑换机领取</p>
        <div class="ok" @click="okBtn()">
          <img src="../assets/img/alert/well_button_n.png" alt="" v-if="ok">
          <img src="../assets/img/alert/well_button_pre.png" alt="" v-if="!ok">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'alertSuccess',
    props: ['showExchange'],
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
        this.$parent.exchangeWin = false
      },
      okBtn: function () {
        this.ok = false
        this.$parent.exchangeWin = false
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .alert-con{width: 100%;height: 5rem;margin-top: -1rem}
  .alert-con .exchangeWin{width: 7rem;height: 5rem;margin: 0 auto;}
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
  .alert-con .ok{width: 2.6rem;height: 1rem;margin: 0 auto;display: block;}
  .alert-con .title{text-align: center;font-size: 0.32rem;color: #fff;margin-bottom: 0.3rem}

</style>
