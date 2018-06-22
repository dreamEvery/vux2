<template>
  <div class="gift-bg">
    <alert-box v-if='isAlertBox' :showName="'isAlertBox'" :transmission="giftInfo" :giveBtn="typeBtn" :exchangeBtn="false">
      <div slot="gift">
        <div class="alert-top">{{giftInfo.mallitemsname}}</div>
        <div class="alert-gift">
          <div class="gift">
            <img :src=giftInfo.picsummary  alt="">
          </div>
          <div class="gift-introduce">
            <p>{{giftInfo.content}}
            </p>
            <p class="time">{{giftInfo.time}}</p>
          </div>
        </div>
      </div>
    </alert-box>
    <public-top></public-top>
    <Receive v-if="receive" :receiveWin="receive"></Receive>
    <div class="gift-con">
      <router-link to="/home/index" class="backBtn">
        <div class="public-back">
          <img src="../assets/img/map/my_icon_Return.png" alt="">
        </div>
      </router-link>
      <div class="tab-box">
        <ul class="center-ul">
          <li class="tab-ranking" v-for="(item, index, type) in tabs" :class="{ red:changeRed == index}"
              @click="getData(index,item.type)">{{item.text}}
          </li>
        </ul>
        <div class="bg-bg"></div>
        <!--列表-->
        <div class='give-bg'>
          <div class="give-bg-top"></div>
          <div class="give-bg-bottom">
          </div>
          <ul class="give-sel-list">
            <li v-for="(item,index) in message">
              <div @click="showAlert(item)">
                <img :src="item.picsummary"/>
                <span>{{item.count}}</span>
                <p class="gift-type" v-if="tabs[tabsIndex].type === 'all'">
                  <img src="../assets/img/my_img_Received.png" alt="" v-if="item.status === '3'">
                  <img src="../assets/img/my_img_No-collar.png" alt="" v-if="item.status === '1'">
                  <img src="../assets/img/my_img_Send.png" alt="" v-if="item.status === '2'"/>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { Base64 } from 'js-base64'
  import { Grid, GridItem, GroupTitle } from 'vux'
  import publicTop from '../components/publicTop'
  import alertBox from '../components/alertBox'
  import Receive from '../components/Receive'

  export default {
    components: {
      Grid,
      GridItem,
      GroupTitle,
      alertBox,
      publicTop,
      Receive
    },
    name: 'gift',
    data () {
      return {
        tabs: [{
          text: '全部',
          type: 'all'
        },
        {
          text: '未领取',
          type: 'Unreceived'
        },
        {
          text: '送出',
          type: 'Send'
        },
        {
          text: '收到',
          type: 'Received'
        }
        ],
        changeRed: 0,
        tabsIndex: 0,
        isAlertBox: false,
        message: [],
        giftInfo: {},
        typeBtn: true,
        receive: false
      }
    },
    mounted () {
      var self = this
      this.bottomH = document.getElementsByClassName('give-bg')[0].offsetHeight - document.getElementsByClassName('give-bg-top')[0].offsetHeight + 7
      console.log('bottom高', self.bottomH)
      document.getElementsByClassName('give-bg-bottom')[0].style.minHeight = self.bottomH + 'px'
      /* 判断ul的高度 如果大于 bottomMinH的高度 就把ul的高度赋值给bottomMinH */
        /* ul的高度 */
      setTimeout(function () {
        var ulH = document.getElementsByClassName('give-sel-list')[0].offsetHeight
        if (ulH > document.getElementsByClassName('give-bg-bottom')[0].offsetHeight) {
          document.getElementsByClassName('give-bg-bottom')[0].style.minHeight = ulH + 'px'
        }
      }, 1000)
    },
    methods: {
      getData (index, type) {
        let that = this
        that.tabsIndex = index
        that.changeRed = index
        let storageMessage = JSON.parse(sessionStorage.getItem('info'))
        if (type === 'Unreceived') storageMessage.status = 1
        if (type === 'Received') storageMessage.status = 3
        if (type === 'Send') storageMessage.status = 2
        this.$http.get(this.HOST + '/mallItemsManage_listMallItems.do?method=getMyMallItemsList', {
          params: storageMessage
        }).then(res => {
          // 成功的状态
          let successCode = '0'
          // 失败的状态
          let errorCode = '1'
          let body = res.body
          if (body.code === successCode) {
            // 处理数据
            this.message = body.data
            for (let i = 0; i < this.message.length; i++) {
              this.message[i].content = Base64.decode(this.message[i].content)
              this.message[i].mallitemsname = Base64.decode(this.message[i].mallitemsname)
            }
          } else if (body.code === errorCode) {
            // 处理失败
            console.log('错误提示：' + body.msg)
          }
        }, error => {
          // error callback
          console.log(error)
        })
      },
      // 弹框
      showAlert (item) {
        this.giftInfo = item
        if (this.giftInfo.status === '2') {
          this.typeBtn = false
        } else {
          this.typeBtn = true
        }
        console.log(this.giftInfo, 'info')
        this.isAlertBox = true
      }
    },
    created () {
      this.getData(0, this.tabs[0].url)
    }
  }
</script>

<style scoped>
  /*.bg-bg{
        background: #FFFBE8;
    height: 14px;
    z-index: 26;
    left: 0.25rem;
    position: absolute;
    bottom: -10px;
    border-radius: 0.1rem 0.1rem 0 0;
    width: 93%;
    }*/
  .public-top{margin-bottom: 1.7rem}
  .public-back {
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
  }
  .tab-box{padding-top: 8.6%;}
  /*适配手机端*/
  @media screen and (min-width:414px) {
    .tab-box{padding-top: 9.3%;}
  }
  @media screen and (max-width:375px) {
    .tab-box{padding-top: 7.6%;}
  }
  @media screen and (max-width:320px) {
    .tab-box{padding-top: 4.6%;}
  }
  .tab-box .red {
    color: #fff;
    background: #FEFAE7;
    text-shadow: 0 1px #971E03, 1px 0 #971E03, -1px 0 #971E03, 0 -1px #971E03;;
    height: 0.72rem;
    line-height: 0.72rem;
    margin-top: -5px;
  }

  .gift-con {
    padding: 0 0.3rem;
  }
  .gift-con .backBtn{position: absolute;top: 1rem;}

  .tab-con {
    background-color: #fff;
    width: 100%;
    height: 100%;
    padding: 20px;
  }

  .tab-con .weui-grid {
    padding: 38px 10px;
  }

  .gift-bg {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url(../assets/img/My-things_img_beijing.png) no-repeat;
    background-size: 100% 100%;;
  }

  .tab-box > ul {
    height: 0.56rem;
    padding: 0 0.4rem;
  }

  .tab-box > ul li {
    text-align: center;
    float: left;
    width: 23%;
    height: 0.55rem;
    line-height: 0.55rem;
    margin-right: 2.65%;
    background: #FAEC99;
    color: #961D00;
    font-size: 0.23rem;
    font-weight: 600;
    border-radius: 0.2rem 0.2rem 0 0;
  }

  .tab-box ul li:last-child {
    margin-right: 0;
  }

  /*.tab-box{position: relative;}*/

  .gift-type {
    position: absolute;
    width: 0.64rem;
    height: 0.56rem;
    top: -0.2rem;
    right: -0.2rem;
  }

  .gift-type > img {
    width: 100% !important;
    height: 100% !important;
  }

  /*共同的 格子**/

  .give-box {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #FFFBE8;
  }

  .give-bg {
    position: fixed;
    overflow: scroll;
    top: 3.8rem;
    left: 0.45rem;
    right: 0.45rem;
    bottom: 0;
    /*background: url(../assets/img/My-things_img_shujia-.png) no-repeat;*/
    background-size: contain;
    z-index: 22;
  }

  .give-sel-list {
    padding: 0.09rem 0.6rem;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }

  .give-sel-list li {
    width: 30%;
    float: left;
    text-align: center;
    height: 2.17rem;
    margin-top: 0%;
  }

  .give-sel-list li:nth-child(1),
  .give-sel-list li:nth-child(2),
  .give-sel-list li:nth-child(3) {
    margin-top: 0.49rem;
  }

  .give-sel-list li div {
    position: relative;
    width: 1.3rem;
    margin: 0 auto;
  }

  .give-sel-list li:nth-child(3n-1) {
    margin-left: 5%;
    margin-right: 5%;
  }

  .give-sel-list li img {
    width: 1.2rem;
    height: 1.2rem;
  }

  .give-sel-list li span {
    text-align: center;
    line-height: 0.48rem;
    font-weight: 600;
    color: #fff;
    display: block;
    background: url(../assets/img/my_img_number.png) no-repeat;
    width: 0.48rem;
    height: 0.48rem;
    background-size: cover;
    position: absolute;
    bottom: 0;
    left: 0;
  }

  .give-bg-top {
    height: 2.3rem;
    background: url(../assets/img/gift_top2.png) no-repeat;
    background-size: 100% 2.3rem;
  }

  .give-bg-bottom {
    margin-top: -7px;
    background: url(../assets/img/gift_bottom2.png) repeat-y;
    background-size: 100% 2.19rem;
  }
  .gift-introduce .time{margin-top: 0.4rem;font-size: 0.24rem;color: #fff;}
</style>
