<template>
  <div class="recharge">
    <div class="re-top">
      <div class="re-pic">
        <img src="" alt="">
      </div>
      <div class="re-now">
        当前拥有：<span>154</span>积分
      </div>
    </div>
    <div class="re-con">
      <p>扫描二维码进行扫描</p>
      <div class="code">二维码</div>
      <button>开始扫描</button>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'recharge',
    data () {
      return {}
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  body {
    background-color: #fff;
  }

  .recharge {
    width: 100%;
  }

  .re-top {
    width: 100%;
    display: inline-block;
    background-color: #cccccc;
    height: 100px;
    padding: 0 20px;
  }

  .re-pic {
    width: 75px;
    height: 75px;
    border-radius: 50%;
    background-color: #797979;
    float: left;
    margin-top: 15px;
  }

  /*.re-pic img{width: 100%;height: 100%;}*/
  .re-now {
    float: right;
    line-height: 105px;
  }

  .re-now span {
    font-size: 18px;
    font-weight: 600;
    margin-right: 10px;
  }

  .re-con {
    background-color: #fff;
    padding: 70px 20px 0 20px;
    text-align: center;
    height: auto;
    position: absolute;
    bottom: 0;
    top: 100px;
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
    border: 1px solid #999999;
    margin: 0 auto;
    margin-bottom: 20px;
  }

  .re-con button {
    width: 220px;
    height: 50px;
    text-align: center;
    border: none;
    font-size: 16px;
    color: #4c4c4c;
  }
</style>
