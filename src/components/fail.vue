<template>
  <div class="fail">
    <div class="masking" @click="failBtn"></div>
    <div class="alert">
      <div class="alert-main">
        <img src="../assets/img/alert/画板-1.gif" alt="">
        <p class="fail-title">兑换失败，请重新兑换</p>
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
    name: 'fail',
    props: ['showName'],
    // 子组件接收到父组件传过来的 showName
    data () {
      return {
        showBtn: true
      }
    },
    components: {},
    created () {
      console.log(this.showName)
    },
    methods: {
      failBtn () {
        this.showBtn = false
        this.$parent[this.showName] = false
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
    margin: 0 auto;
  }
</style>
