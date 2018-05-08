<template>
  <div class="heared">
    <div class="head-tab">
        <span @click="back" class="return">
          <img src="../assets/img/return.png" alt="">
        </span>
      <span>找回密码</span>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'heared',
    data () {
      return {
        data: {}
      }
    },
    methods: {
      back () {
        let vm = this
        vm.$router.go(-1)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .head-tab {
    height: 1rem;
    background-color: #fff;
    text-align: center;
    font-size: 0.32rem;
    color: #000;
    line-height: 1rem;
  }

  .head-tab .return {
    display: block;
    position: absolute;
    left: 0.4rem;
    top: 0.1rem;
    width: 0.2rem;
    height: 0.4rem;
  }
</style>
