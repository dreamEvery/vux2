<template>
  <div class="giveFail">
    <div class="masking" @click="failBtn"></div>
    <div class="alert">
      <div class="alert-main">
        <img src="../assets/img/map/赠送失败.gif" alt="">
        <p class="fail-title">{{Erro}}</p>
      </div>
      <div class="alertBtn">
        <img src="../assets/img/map/know-n.png" alt="" v-if="showBtn" @click="failBtn">
        <img src="../assets/img/map/know-pre.png" alt="" v-if="!showBtn">
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    name: 'giveFail',
    props: ['giveName', 'Erro'],
    // 子组件接收到父组件传过来的 showName
    data () {
      return {
        showBtn: true
      }
    },
    created () {
      console.log(this.giveName)
    },
    methods: {
      failBtn () {
        this.showBtn = false
        this.$parent.giveFail = false
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
    background: rgba(0, 0, 0, 0.6);
    z-index: 999;
    transition: all .3s ease-in-out;
  }

  .alert {
    text-align: center;
    color: #652411;
    width: 100%;
    background-size: 100% 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    z-index: 999;
    padding: 1rem 0.45rem 0.4rem 0.6rem;
  }

  .alert-main .fail-title {
    font-size: 0.32rem;
    color: #fff;
    text-align: center;
    margin-bottom: 0.6rem;
  }

  .alert .alertBtn {
    width: 2.6rem;
    height: 0.9rem;
    margin: 0 auto;
  }
</style>
