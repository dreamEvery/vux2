<template>
  <div class="public-top">
    <div class="public-fl">
      <div class="head-pic">
        <img :src="(data.picsummary&&data.picsummary!=='null')?data.picsummary:require('../assets/img/map/headPic.png')" alt="" class="img">
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
  import { Base64 } from 'js-base64'
  export default {
    name: 'publicTop',
    data () {
      return {
        data: {}
      }
    },
    methods: {
      pubilTop () {
        this.storageMessage = JSON.parse(sessionStorage.getItem('info'))
        this.$http.get(this.HOST + '/vendingMachineInventoryManage_listVendingMachineInventory.do?method=getUserInfoForMobilePhoneLogin', {
          params: {
            sid: this.storageMessage.sid,
            userid: this.storageMessage.userid,
            studentid: this.storageMessage.studentid
          }
        }).then(res => {
          let successCode = '0'
          let errorCode = '1'
          let body = res.body
          if (body.code === successCode) {
            // 处理数据
            body.stuname = Base64.decode(body.stuname)
            body.classname = Base64.decode(body.classname)
            this.data = body
          } else if (body.code === errorCode) {
            // 处理失败
            console.log('错误提示：' + body.msg)
          }
        }, error => {
          // error callback
          console.log(error)
        })
      }
    },
    created () {
      let that = this
      that.pubilTop()
      this.$root.eventHub.$on('changeTop', function () {
        that.pubilTop()
      })
      this.$root.eventHub.$off('changeTop', function () {
        that.publicTop()
      })
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
    float: left;
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
