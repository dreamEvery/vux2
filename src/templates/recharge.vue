<template>
  <div class="recharge">
    <div class="re-top">
      <div class="re-pic">
        <img src="" alt="">
      </div>
      <div class="re-now">
        154
      </div>
    </div>
    <div class="re-con">
      <p>扫描二维码进行扫描</p>
      <div class="code">二维码</div>
      <div class="button" @click=" arrowChange ">
        <img src="../assets/img/map/recharge_button_start_scanning_n.png" alt="" v-if="isup">
        <img src="../assets/img/map/recharge_button_start-scanning_pre.png" alt="" v-else="!isup">
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'recharge',
    data () {
      return {
        isup: true
      }
    },
    methods: {
      arrowChange: function () {
        this.isup = false
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


  .recharge {
    width: 100%;
    background-image: url("../assets/img/map/recharge_bg.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    position: absolute;
    height: 100%;
  }

  .re-top {
    width: 100%;
    display: inline-block;
    height: 100px;
    padding: 0.3rem 0.3rem;
  }

  .re-pic {
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
    background-color: #797979;
    float: left;
  }

  /*.re-pic img{width: 100%;height: 100%;}*/
  .re-now {
    float: right;
    background-image: url("../assets/img/map/integral.png");
    width: 2.5rem;
    height: 0.8rem;
    background-size: 100% 100%;
    text-align: center;
    color: #fff;
    line-height: 0.8rem;
    margin-top: 0.2rem;
  }

  .re-now span {
    font-size: 18px;
    font-weight: 600;
    margin-right: 10px;
  }

  .re-con {
    text-align: center;
    height: auto;
    flex: 1;
    width: 100%;
  }

  .re-con p {
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 30px;
  }

  .re-con .code {
    width: 220px;
    height: 250px;
    border: 2px dashed skyblue;
    margin: 0 auto;
    margin-bottom: 20px;
  }

  .re-con .button {
    width: 2.6rem;
    height: 0.8rem;
    margin-top: 0.4rem;
    margin: 0 auto;
  }

  .re-con .button img {
    width: 100%;
    height: 100%;
  }
</style>
