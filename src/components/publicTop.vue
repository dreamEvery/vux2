<template>
  <div class="public-top">
    <div class="public-fl">
      <div class="head-pic">
      </div>
      <div class="introduce">
        <p class="name">童小雪</p>
        <p class="class"> 一年级二班</p>
      </div>
    </div>
    <div class="public-fr">
      <div @click="handleSidebar('gift')" class="gift">58
      </div>
      <div class="integral">
        45667
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'publicTop',
    data () {
      return {}
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .integral {
    background-image: url("../assets/img/map/integral.png");
    background-size: 100% 100%;
  }

  .gift {
    background-image: url("../assets/img/map/exchange_icon_liwu.png");
    background-size: 100% 100%;
  }

  .public-top {
    width: 100%;
    padding: 10px 20px;
    overflow: hidden;
    position: relative;
  }

  .public-top .public-fr {
    float: right;
    display: inline-block;
  }

  .public-fr div {
    float: left;
    width: 1.8rem;
    height: 0.7rem;
    box-sizing: border-box;
    margin-left: 0.16rem;
    text-align: center;
    border-radius: 0.3rem;
    font-size: 0.24rem;
    font-weight: 400;
    position: relative;
    color: #f1e3bb;
    line-height: 0.7rem;
  }

  .public-fl {
    float: left;
    overflow: hidden;
  }

  .public-fl .head-pic {
    width: 0.6rem;
    height: 0.6rem;
    background-color: #F8E99E;
    border-radius: 50%;
    display: inline-block;
  }

  .public-fl .introduce {
    font-size: 0.24rem;
    color: #fff;
    display: inline-block;
    text-shadow: 0 1px #652411, 1px 0 #652411, -1px 0 #652411, 0 -1px #652411;
  }
</style>
