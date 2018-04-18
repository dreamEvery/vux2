<template>
  <div class="alertSuccess">
    <div class="masking" @click="close"></div>
    <div class="successAlert">
      <p class="alert-top">
        <img src="../assets/img/alert/图层-4.png" alt="">
      </p>
      <div class="alert-con">
        <img src="../assets/img/alert/赠送成功.png" alt="">
        <p class="cube">
          <img src="../assets/img/alert/魔方.png" alt="">
        </p>
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
      return {}
    },
    methods: {
      close () {
        // 点击关闭按钮 this.$parent 获取到父组件
        // this.$parent[this.showName] 获取父组件中的 isAlertBox
        this.$parent[this.show] = false
      }
    },
    watch: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .alertSuccess{position: fixed;}
  .masking {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 100;
    transition: all .3s ease-in-out;
  }

  .successAlert {
    width: 100%;
    height: auto;
    z-index: 999;
  }

  .successAlert .alert-top {
    width: 80%;
    margin: 0 auto;
  }
  .cube{width: 4rem;height: 4rem;margin: 0 auto;}
  .cube img{width: 100%;height: 100%;}

</style>
