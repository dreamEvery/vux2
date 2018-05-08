<template>
  <div class="public-top">
    <div class="public-fl">
      <div class="head-pic">
        <img src="../assets/img/map/headPic.png" alt="" class="img">
      </div>
      <div class="introduce">
        <p class="name">{{data.stuname}}</p>
        <p class="class"> {{data.classname}}</p>
      </div>
    </div>
    <div class="public-fr">
      <div @click="handleSidebar('gift')" class="gift">{{data.itemsnum}}
      </div>
      <router-link to="/home/recharge">
        <div class="integral">
          {{data.currentintegral}}
        </div>
      </router-link>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    name: 'publicTop',
    data () {
      return {
        data: {}
      }
    },
    created () {
      let stuMessage = JSON.parse(sessionStorage.getItem('stuMessage'))
      console.log(stuMessage)
      this.data = stuMessage
      console.log(this.data, '本地')
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
   .public-top{height: 55px;}
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
    padding: 5px 10px;
    overflow: hidden;
    position: relative;
  }

  .public-top .public-fr {
    float: right;
    display: inline-block;
  }

  .public-fr div {
    float: left;
    width: 1.67rem;
    box-sizing: border-box;
    margin-left: 0.16rem;
    text-align: center;
    border-radius: 0.3rem;
    font-size: 0.24rem;
    font-weight: 400;
    position: relative;
    height: 0.65rem;
    color: #f1e3bb;
    line-height: 0.7rem;
  }
  .public-fr .integral{width: 2.1rem;}

  .public-fl {
    float: left;
    overflow: hidden;
  }

  .public-fl .head-pic {
    width: 0.9rem;
    height: 0.9rem;
    border-radius: 50%;
    display: inline-block;
    background-image: url("../assets/img/map/exchange_head.png");
    background-size: 100% 100%;
    padding: 0.01rem;
    text-align: center;
  }
  .public-fl .head-pic .img{width: 94%;height: 94%;text-align: center;margin-top: 0.02rem}
  .public-fl .introduce {
    vertical-align: super;
    font-size: 0.24rem;
    color: #fff;
    display: inline-block;
    text-shadow: 0 1px #652411, 1px 0 #652411, -1px 0 #652411, 0 -1px #652411;
  }
  .public-fl .introduce .name{font-size: 0.28rem;margin-bottom: 0.16rem}
   .public-fl .introduce .class{font-size: 0.24rem}
</style>
