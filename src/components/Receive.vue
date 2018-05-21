<template>
  <div class="Receive">
    <div class="masking" @click="close"></div>
    <div class="successAlert">
      <div class="alert-con">
        <img src="../assets/img/map/asd.gif" alt="">
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
    name: 'Receive',
    props: ['receiveWin'],
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
        this.$parent.receiveWin = false
      },
      okBtn: function () {
        this.ok = false
        this.$parent.receive = false
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .alert-con {
    margin-top: -1rem;
  }

  .masking {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    transition: all .3s ease-in-out;
    z-index: 999;
  }

  .successAlert {
    width: 100%;
    height: auto;
    position: fixed;
    z-index: 1000;
  }

  .cube {
    width: 3.4rem;
    height: 3.2rem;
    margin: 0 auto;
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

  .alert-con .ok {
    width: 3.1rem;
    height: 1.2rem;
    margin: 0 auto;
    display: block;
    margin-top: 0.2rem;
  }

</style>
