<template>
  <div class="alertbox">
    <div class="masking" @click="close"></div>
    <div class="alert">
      <div class="alert-logo">
        <img src="../assets/img/alert/LOGO.png" alt="">
      </div>
      <div class="alert-main">
        <slot name="content"></slot>
        <slot name="market"></slot>
        <slot name="gift"></slot>
      </div>
      <div class="alertBtn" v-if="type">
        <router-link class="giveBtn" :to="{path: '/give', query:{transmission: transmission}}" v-if="isBtn?isBtn:true">
          <img src="../assets/img/give-button.png" alt="">
        </router-link>
        <p class="exchangeBtn" @click="exchange" v-if="type === 'market'">
          <span class="coinNum">
            {{transmission.integral}}
          </span>
        </p>
      </div>
      <span class="close-btn" @click="close">
        <img src="../assets/img/alert/close.png" alt="" class="aniBtn">
      </span>
    </div>
    <Sussce v-if="alertSussce"></Sussce>
    <router-view></router-view>
  </div>
</template>
<script>
  import Sussce from '../components/alertSuccess'
  export default {
    name: 'alertbox',
    props: ['showName', 'type', 'transmission', 'receiveMess', 'isBtn'],
    // 子组件接收到父组件传过来的 showName
    data () {
      return {
        alertSussce: false,
        storageMessage: null,
        exchangerecordid: null,
        vendingmachineid: null
      }
    },
    components: {
      Sussce
    },
    methods: {
      close () {
        // 点击关闭按钮 this.$parent 获取到父组件
        // this.$parent[this.showName] 获取父组件中的 isAlertBox
        this.$parent[this.showName] = false
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
          {sid: this.storageMessage.sid, userid: this.storageMessage.userid, exchangerecordid: this.exchangerecordid, vendingmachineid: this.vendingmachineid}
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
    width: 100%;
    background-image: url("../assets/img/alert/a market_BG.png");
    background-size: 100% 100%;
    position: absolute;
    top: 50%;
    left: 49%;
    transform: translateX(-50%) translateY(-50%);
    z-index: 999;
    padding: 12% 7% 6% 8% ;
  }

  .alert .alert-main {
    background-color: #c79d75;
    border: 1px dashed #c77325;
    border-radius: 10px;
    padding-bottom: 0.4rem;
    position: relative;
  }

  .alert .alert-main .alert-top {
    font-size: 0.42rem;
    color: #fff;
    font-weight: bold;
    text-align: center;
    width: 3.7rem;
    line-height: 0.9rem;
    background-color: #b66e36;
    border-radius: 30px;
    margin: 0 auto;
    margin-top: 0.4rem;
    margin-bottom: 0.1rem;
  }

  .alert .alert-main ul li {

  }

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
  .aniBtn {animation: closeBtn  2s linear 2 0s;}
  @keyframes closeBtn {
    0%   {width: 100%;height: 100%;}
    50%  {width: 85%;height: 85%}
    100% {width: 100%;height: 100%}
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

  .alert-gift {
    overflow: hidden;
    padding: 0.3rem 0.26rem;
  }

  .alert-gift .gift {
    width: 1.8rem;
    height: 1.8rem;
    float: left;
  }

  .alert-gift .gift img {
    width: 100%;
    height: 100%;
  }

  .alert-gift .gift-introduce {
    font-size: 0.28rem;
    color: #661500;
    font-weight: bold;
    text-align: justify;
    line-height: 0.38rem;
    padding-left: 2.3rem;
  }

  .alert-gift .gift-introduce a {
    text-align: right;
    color: #F5DF4B;
    margin-top: 0.4rem;
    display: block;
    float: right;
  }

  .alertBtn .giveBtn {
    width: 1.83rem;
    height: 0.72rem;
    margin-top: 0.3rem;
    display: block;
    float: right;
  }

  .alertBtn .exchangeBtn {
    width: 2.57rem;
    height: 0.75rem;
    margin-top: 0.3rem;
    float: left;
    position: relative;
    background-image: url("../assets/img/alert/exchange-button.png");
    background-size: 100% 100%;
  }

  .alertBtn .exchangeBtn .coinNum {
    font-size: 0.4rem;
    line-height: 0.7rem;
    color: #fff;
    font-weight: bold;
    text-shadow: 0.03rem 0.02rem 0.01rem #797979;
    margin-left: -0.4rem;
  }
</style>
