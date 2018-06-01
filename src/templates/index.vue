<template>
  <div class="index">
    <!-- showName 向子组件传入一个字符串 ‘isAlertBox’，
    v-if="isAlertBox"这个是控制子组件显示隐藏的变量 -->
    <!--弹框-->
    <alert-box v-if='isAlertBox' :showName="'isAlertBox'">
      <div slot="content">
        <div v-if="alertType==='myIntegral'">
          <div class="mine">
            我的积分
          </div>
          <div class="alert-body">
            <div class="integral">
              <ul>
                <li>当前积分：</li>
                <li>消费积分：</li>
                <li>总积分：</li>
              </ul>
            </div>
            <div class="integral-num">
              <ul>
                <li>{{data.currentintegral}}</li>
                <li>{{data.totolintegral - data.currentintegral}}</li>
                <li>{{data.totolintegral}}</li>
              </ul>
            </div>
          </div>
        </div>
        <div v-if="alertType==='myLv'">
          <div class="mine">
            我的等级
          </div>
          <div class="alert-body">
            <div class="integral">
              <ul>
                <li v-for="item in gradeData">
                  {{item.name}}：
                  {{item.integral}}
                </li>
              </ul>
            </div>
            <!--<div class="integral-num" v-for="item in gradeData">-->
            <!--<ul>-->
            <!--<li>{{item.integral}}</li>-->
            <!--<li>{{'data.currentintegral' - 'data.totolintegral'}}</li>-->
            <!--<li>{{data.totolintegral}}</li>-->
            <!--</ul>-->
            <!--</div>-->
          </div>
        </div>
      </div>
    </alert-box>
    <alert-quit v-if="isAlertQuit" :name="isAlertQuit"></alert-quit>
    <div class="top">
      <div class="back">
        <span @click="back">
          <img src="../assets/img/map/my_button_return.png" alt="">
        </span>
      </div>
      <router-link class="header-pic" :to="{path: '/head', query:{imgUrl:data.picsummary}}">
        <div class="head-main">
          <img :src='data.picsummary?data.picsummary:require("../assets/img/map/headPic.png")' alt="" :onerror="imgError"/>
        </div>
      </router-link>
      <div class="introduce">
        <p class="name">{{data.stuname}}</p>
        <p class="class">{{data.classname}}</p>
      </div>
    </div>
    <!--top end-->
    <div class="central-box">
      <div class="central-main">
        <div class="list-icon">
          <div>
            <router-link to='/gift'>
              <img src="../assets/img/map/my_icon_my--gift.png" alt="">
            </router-link>
          </div>
          <div>
            <router-link
              :to="{path:'/among',query:{studentid: this.data.studentid, classId: this.data.classid, gradeId: this.data.gradeid, sid: this.data.sid, userid: this.data.userid}}">
              <img src="../assets/img/map/my_icon_ranking--list.png" alt="">
            </router-link>
          </div>
          <div>
            <router-link to='/message' class="message">
              <img src="../assets/img/map/my_icon_information.png" alt="">
            </router-link>
          </div>
        </div>
        <!--list end-->
        <div class="my-main">
          <div class="cen-title cen-border">
            <div class="title">
              <span class="fl my-title">我的</span>
              <router-link to='/give'>
                <span class="fr icon-give">
                   <img src="../assets/img/map/my_button-give_n.png" alt="">
                </span>
              </router-link>
            </div>
            <flexbox :gutter="0">
              <flexbox-item>
                <div class="flex-demo" @click="showAlert('myIntegral')">
                  <p class="num">{{data.currentintegral}}</p>
                  <p class="num-title">积分</p>
                </div>
              </flexbox-item>
              <flexbox-item>
                <div class="flex-demo" @click="showAlert('myLv')">
                  <p class="num">{{data.level || 0}}</p>
                  <p class="num-title">等级</p>
                </div>
              </flexbox-item>
              <flexbox-item>
                <div class="flex-demo">
                  <p class="num">{{data.itemsnum}}</p>
                  <p class="num-title">礼品</p>
                </div>
              </flexbox-item>
            </flexbox>
          </div>
          <div class="cen-title">
            <div class="title">
              <span class="fl my-title">战绩</span>
            </div>
            <flexbox :gutter="0">
              <flexbox-item>
                <div class="flex-demo">
                  <p class="num">{{data.classstandings}}</p>
                  <p class="num-title">击败本班</p>
                </div>
              </flexbox-item>
              <flexbox-item>
                <div class="flex-demo">
                  <p class="num">{{data.gradestandings}}</p>
                  <p class="num-title">击败本年级</p>
                </div>
              </flexbox-item>
              <flexbox-item>
                <div class="flex-demo">
                  <p class="num">{{data.schoolstandings}}</p>
                  <p class="num-title">击败全校</p>
                </div>
              </flexbox-item>
            </flexbox>
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
  import { Base64 } from 'js-base64'
  import alertBox from '../components/alertBox'
  import alertQuit from '../components/alertQuit'
  import {
    Grid,
    GridItem,
    GroupTitle,
    Flexbox,
    FlexboxItem,
    Divider,
    Badge
  } from 'vux'

  export default {
    components: {
      Grid,
      GridItem,
      GroupTitle,
      Flexbox,
      FlexboxItem,
      Divider,
      Badge,
      alertBox,
      alertQuit
    },
    name: 'index',
    watch: {
      alertType (value) {
        console.log(value)
      }
    },
    data () {
      return {
        data: {},
        gradeData: {},
        isAlertQuit: false,
        alertBox: {},
        isAlertBox: false,
        alertType: null,  // 我的积分 myIntegral 我的等级 myLv
        imgError: 'this.src="' + require('../assets/img/map/icon.png') + '"',
        storageMessage: null
      }
    },
    methods: {
      showAlert (type) {
        this.isAlertBox = true
        this.alertType = type
        if (type === 'myLv') {
          this.getGrade()
        }
      },
      onHide () {
        console.log('on hide')
      },
      onShow () {
        console.log('on show')
      },
      getGrade () {
        this.$http.get(this.HOST + '/medalManage_listMedal.do?method=getAllMedalList', {
          params: {
            sid: this.storageMessage.sid,
            userid: this.storageMessage.userid
          }
        }).then(res => {
          // 成功的状态
          let successCode = '0'
          // 失败的状态
          let errorCode = '1'
          // console.log(res, '原始数据')
          let body = res.body
          // console.log(body, '后台返回的数据')
          // 先判断状态
          // "code":返回状态码,"data":"应该业务数据","msg":"错误提示"
          // 所以我优先判断 code
          if (body.code === successCode) {
            // 处理数据
            // body.stuname = Base64.decode(body.stuname)
            // body.classname = Base64.decode(body.classname)
            this.gradeData = body.data
            for (let i = 0; i < this.gradeData.length; i++) {
              this.gradeData[i].name = Base64.decode(this.gradeData[i].name)
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
      back () {
        this.isAlertQuit = true
      },
      mineMess () {
        this.storageMessage = JSON.parse(sessionStorage.getItem('info'))
        this.$http.get(this.HOST + '/vendingMachineInventoryManage_listVendingMachineInventory.do?method=getUserInfoForMobilePhoneLogin', {
          params: {
            sid: this.storageMessage.sid,
            userid: this.storageMessage.userid,
            studentid: this.storageMessage.studentid
          }
        }).then(res => {
          // 成功的状态
          let successCode = '0'
          // 失败的状态
          let errorCode = '1'
          // console.log(res, '原始数据')
          let body = res.body
          // console.log(body, '后台返回的数据')
          // 先判断状态
          // "code":返回状态码,"data":"应该业务数据","msg":"错误提示"
          // 所以我优先判断 code
          if (body.code === successCode) {
            // 处理数据
            body.stuname = Base64.decode(body.stuname)
            body.classname = Base64.decode(body.classname)
            this.data = body
            let stutent = {
              stuname: this.data.stuname,
              classname: this.data.classname,
              currentintegral: this.data.currentintegral,
              itemsnum: this.data.itemsnum,
              picsummary: this.data.picsummary
            }
            let stuMessage = JSON.stringify(stutent)
            sessionStorage.setItem('stuMessage', stuMessage)
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
    created: function () {
      let that = this
      setTimeout(function () {
        that.mineMess()
      }, 100)
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .index {
    background-image: url("../assets/img/map/my_bg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    height: 100%;
    right: 0;
  }

  .top {
    width: 100%;
    position: relative;
    padding-right: 0.76rem;
    padding-left: 0.76rem;
    padding-top: 18%;
    min-height: 3.5rem;
  }
  @media screen and (max-width: 768px) {
    .top {
      padding-top: 1.4rem;
    }
  }
  .back {
    position: absolute;
    width: 0.7rem;
    right: 0.7rem;
    top: 1.2rem;
  }
  @media screen and (min-width: 768px) {
    .back {
     right: 0.9rem;
      margin-right: 2%;
      margin-top: 2%;
    }
  }

  .back img {
    width: 100%;
    height: 100%
  }

  .header-pic {
    display: block;
    padding: 0.054rem 0.04rem;
    width: 1.4rem;
    height: 1.4rem;
    margin: 0 auto;
    border-radius: 50%;
    overflow: hidden;
    background-image: url("../assets/img/map/exchange_head.png");
    background-size: 100% 100%;
  }

  .header-pic .head-main {
    width: 1.26rem;
    height: 1.26rem;
    margin-left: 0.03rem;
  }

  .header-pic .head-main img {
    border-radius: 50%;
  }

  .introduce {
    text-align: center;
    margin-top: 0.1rem;
    min-height: 0.2rem;
    padding-top: 0.12rem;
  }

  .introduce .name, .class {
    font-size: 0.32rem;
    font-weight: 600;
    color: #fff;
    text-shadow: 0 1px #9D4C4A, 1px 0 #9D4C4A, -1px 0 #9D4C4A, 0 -1px #9D4C4A;
  }

  .introduce .class {
    font-size: 0.21rem;
    margin-top: 0.1rem;
  }

  .central-box {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    margin-top: 8%;
  }

  .central-main {
    background-color: #fffbe8;
    border-radius: 10px;
    padding: 0.4rem 0.15rem 0.3rem 0.15rem;
  }

  .central-main .cen-title {
    padding-bottom: 0.32rem;
    padding-top: 0.28rem;
  }

  .central-main .cen-border {
    border-bottom: 1px dashed #E0D4B1;
  }

  .central-main .title {
    width: 100%;
    padding: 0 0.4rem;
  }

  .icon-give {
    width: 1.18rem;
    height: 0.52rem
  }

  .my-title {
    font-size: 0.24rem;
    color: #5f5145;
    padding-top: 0.12rem;
    font-weight: bold;
  }

  .icon-give img {
    width: 100%;
    height: 100%
  }

  .central-main .flex-demo {
    text-align: center;
    position: relative;
  }

  .central-main .flex-demo .num {
    font-size: 0.42rem;
    font-weight: bold;
    padding: 2px 10px;
  }

  .central-main .flex-demo .num-title {
    font-size: 0.23rem;
    margin-top: 0.06rem;
  }

  .list-icon {
    display: flex;
    flex-direction: row;
    margin-bottom: 0.5rem;
  }

  .list-icon div {
    flex: 1;
    text-align: center;
  }

  .list-icon a {
    display: block;
    width: 1.28rem;
    height: 1.46rem;
    margin: 0 auto;
  }

  .list-icon .message {
    width: 1.4rem;
    height: 1.4rem;
  }

  .list-icon a img {
    width: 100%;
    height: 100%;
  }

  .my-main {
    background-color: #f1e3bb;
    border-radius: 0.2rem;
  }

  .tabbar {
    position: fixed;

  }

  /*弹框*/
  .mine {
    font-size: 0.44rem;
    color: #fff;
    font-weight: bold;
    text-align: center;
    width: 60%;
    line-height: 0.8rem;
    background-color: #B27A4B;
    border-radius: 30px;
    margin: 0 auto;
    margin-top: 0.4rem;
    margin-bottom: 0.1rem;
  }

  .alert-body .integral {
    display: inline-block;
  }

  .alert-body .integral-num {
    display: inline-block;
    font-size: 16px;
    font-weight: bold;
    line-height: 0.8rem;
    text-align: left;
  }

  .integral ul li {
    font-size: 16px;
    font-weight: bold;
    line-height: 0.8rem;
    text-align: left;
  }

  .title {
    overflow: hidden;
    margin-bottom: 0.3rem;
  }
</style>
