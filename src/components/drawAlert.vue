<template>
  <div class="drawAlert">
    <div class="masking" @click="close"></div>
    <div class="alert">
      <div class="alert-logo">
        <img src="../assets/img/alert/LOGO.png" alt="">
      </div>
      <div class="alert-main">
        <slot name="winning"></slot>
        <slot name="LuckDraw"></slot>
      </div>
      <div class="paging">
        <p>上一页</p>
        <p><span>第</span> {{page}} <span>页</span></p>
        <p>上一页</p>
      </div>
      <span class="close-btn" @click="close">
        <img src="../assets/img/alert/close.png" alt="">
      </span>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    name: 'drawAlert',
    props: ['draw'],
    // 子组件接收到父组件传过来的 showName
    data () {
      return {
        page: 1,
        storageMessage: null
      }
    },
    components: {},
    methods: {
      close () {
        // 点击关闭按钮 this.$parent 获取到父组件
        // this.$parent[this.showName] 获取父组件中的 isAlertBox
        this.$parent[this.draw] = false
      },
      // 兑换接口
      exchange () {
        this.$parent[this.showName] = false
        this.alertSussce = true
        this.storageMessage.mallitemsid = this.transmission.mallitemsid
        this.storageMessage.vendingmachineid = this.$parent.rawDataTabs[this.$parent.tabsActive].vendingmachineid
        this.$http.post(this.HOST + '/mallItemsManage_updateMallItems.do?method=addExchangeRecord',
          this.storageMessage
        ).then(res => {
          // get body data
          let body = res.body
          let successCode = '0'
          if (successCode !== body.code) {
            this.$parent.failCode = true
          } else {
            this.$parent.exchangeWin = true
            this.$root.eventHub.$emit('changeTop')
          }
        }, res => {
          // error callback
        })
      },
      // 领取物品
      receive () {
        console.log(this.receiveMess, '99')
        for (let i = 0; i < this.receiveMess.length; i++) {
          console.log(this.receiveMess[i].vendingmachineid)
          this.exchangerecordid = this.receiveMess[i].exchangerecordid
          this.vendingmachineid = this.receiveMess[i].vendingmachineid
        }
        this.$http.post(this.HOST + '/exchangeRecordManage_addExchangeRecord.do?method=getGift',
          {
            sid: this.storageMessage.sid,
            userid: this.storageMessage.userid,
            exchangerecordid: this.exchangerecordid,
            vendingmachineid: this.vendingmachineid
          }
        ).then(res => {
          // get body data
          let body = res.body
          let successCode = '0'
          if (successCode === body.code) {
            alert('领取成功')
          } else {
            this.$parent[this.showName] = false
            this.$parent.receive = true
          }
        }, res => {
          // error callback
        })
      }
    },
    created () {
      this.storageMessage = JSON.parse(sessionStorage.getItem('info'))
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .receive {
    width: 1.86rem;
    height: 0.76rem;
    float: left;
    margin-top: 0.3rem;
  }

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
    width: 82%;
    background-image: url("../assets/img/alert/a market_BG.png");
    background-size: 100% 100%;
    position: absolute;
    top: 50%;
    left: 49%;
    transform: translateX(-50%) translateY(-50%);
    z-index: 999;
    padding: 1rem 0.45rem 0.4rem 0.6rem;
  }

  .alert .alert-main {
    background-color: #c79d75;
    border: 1px dashed #c77325;
    border-radius: 10px;
    padding-bottom: 0.4rem;
    position: relative;
  }


  .alert .alert-main .record li {
    font-size: 0.32rem;
    line-height: 0.64rem;
    padding: 0 0.52rem;
    overflow: hidden;
  }

  .alert .alert-main .record li p {
    display: inline-block;
  }
  .record li .name{float: left}
  .record li .state{float: right; color: #9c6848;}

  .alert .close-btn {
    position: absolute;
    top: 0.6rem;
    right: 0.3rem;
    width: 0.8rem;
    height: 0.8rem;
  }

  .alert .close-btn img {
    width: 100%;
    height: 100%;
  }

  .alert-logo {
    position: absolute;
    top: -62px;
    right: 33%;
    z-index: 999;
    width: 2.4rem;
    height: 2.6rem;
  }

  .alert-logo img {
    width: 100%;
    height: 100%;
  }

  .mine {
    font-size: 0.44rem;
    color: #fff;
    font-weight: bold;
    text-align: center;
    width: 67%;
    line-height: 0.8rem;
    background-color: #B27A4B;
    border-radius: 30px;
    margin: 0 auto;
    margin-top: 0.4rem;
    margin-bottom: 0.4rem;

  }
  .paging{display: flex;padding: 0 0.36rem;margin-top: 0.4rem;}
  .paging p{flex: 1;font-size: 0.32rem;}
  .paging p span{color: #b8a282;}
</style>
