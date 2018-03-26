<template>
  <div class="alertbox">
    <div class="masking" @click="close"> </div>
    <div class="alert">
      <div class="alert-top">我的积分</div>
      <div class="alert-main">
        <ul>
          <li>
            当前积分： 254
          </li>
          <li>
            消费积分：241
          </li>
        </ul>
      </div>
      <span class="close-btn" @click="close">X</span>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'alertbox',
    props: ['showName'],
    // 子组件接收到父组件传过来的 showName
    data () {
      return {}
    },
    methods: {
      close () {
        // 点击关闭按钮 this.$parent 获取到父组件
        // this.$parent[this.showName] 获取父组件中的 isAlertBox
        this.$parent[this.showName] = false
      }
    },
    watch: {}
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
    z-index: 100;
    transition: all .3s ease-in-out;
  }

  .alert {
    width: 345px;
    height: 310px;
    background-color: #ffffff;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    z-index: 999;
  }

  .alert .alert-top {
    text-align: center;
    font-size: 16px;
    line-height: 30px;
    border-bottom: 1px solid #4c4c4c;
  }

  .alert .alert-main {
    padding: 20px 20px;
    line-height: 20px;
  }
</style>
