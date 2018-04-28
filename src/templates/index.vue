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
    <div class="top">
      <div class="back">
        <router-link to="/login">
          <img src="../assets/img/map/my_button_return.png" alt="">
        </router-link>
      </div>
      <div class="header-pic" @click="handleSidebar('head')">
        <img :src="data.picsummary" alt="" :onerror="imgError">
      </div>
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
            <router-link :to="{path:'/among',query:{classId: this.data.classid, gradeId: this.data.gradeid, aaa: '123'}}">
              <img src="../assets/img/map/my_icon_ranking--list.png" alt="">
            </router-link>
          </div>
          <div>
            <router-link to='/message'>
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
                  <p class="num">{{data.level}}</p>
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
      alertBox
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
        alertBox: {},
        isAlertBox: false,
        alertType: null,  // 我的积分 myIntegral 我的等级 myLv
        imgError: 'this.src="' + require('../assets/img/map/icon.png') + '"'
      }
    },
    created: function () {
      let storageMessage = JSON.parse(sessionStorage.getItem('info'))
      console.log(storageMessage, '34567')
      this.$http.get('/api/vendingMachineInventoryManage_listVendingMachineInventory.do?method=getUserInfoForMobilePhoneLogin', {
        params: storageMessage
        // sid: 4, userid: 533422211, studentid: 222
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
            totolintegral: this.data.totolintegral,
            itemsnum: this.data.itemsnum
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
    },
    methods: {
      showAlert (type) {
        this.isAlertBox = true
        this.alertType = type
        if (type === 'myLv') {
          this.getGrade()
        }
      },
      handleSidebar (name) {
        this.$router.push({path: '/' + name})
      },
      onHide () {
        console.log('on hide')
      },
      onShow () {
        console.log('on show')
      },
      getGrade () {
        let storageMessage = JSON.parse(sessionStorage.getItem('info'))
        console.log(storageMessage, '34567')
        this.$http.get('/api/medalManage_listMedal.do?method=getAllMedalList', {
          params: storageMessage
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
            console.log(this.gradeData, 'lv')
          } else if (body.code === errorCode) {
            // 处理失败
            console.log('错误提示：' + body.msg)
          }
        }, error => {
          // error callback
          console.log(error)
        })
      }
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
    height: 165px;
    position: relative;
    padding-right: 0.76rem;
    padding-left: 0.76rem;
    padding-top: 1.38rem;

  }

  .back {
    position: absolute;
    width: 0.6rem;
    right: 0.8rem;
    top: 1.2rem;
  }

  .back img {
    width: 100%;
    height: 100%
  }

  .header-pic {
    width: 1.36rem;
    height: 1.36rem;
    margin: 0 auto;
    border-radius: 50%;
    overflow: hidden;
  }

  .introduce {
    text-align: center;
    margin-top: 0.1rem;
  }

  .introduce .name, .class {
    font-size: 0.36rem;
    font-weight: 600;
    color: #fff;
    text-shadow: 0 1px #9D4C4A, 1px 0 #9D4C4A, -1px 0 #9D4C4A, 0 -1px #9D4C4A;
  }

  .introduce .class {
    font-size: 0.24rem;
  }

  .central-box {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    margin-top: 0.35rem;
  }

  .central-main {
    background-color: #fffbe8;
    border-radius: 10px;
    margin-top: 1.4rem;
    padding: 0.4rem 0.15rem 0.1rem 0.15rem;
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
    height: 0.6rem
  }

  .my-title {
    font-size: 0.26rem;
    color: #5f5145;
    padding-top: 0.12rem;
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
    font-size: 0.4rem;
    font-weight: bold;
    padding: 2px 10px;
  }

  .central-main .flex-demo .num-title{
    font-size: 0.22rem;
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
    width: 1.2rem;
    height: 1.2rem;
    margin: 0 auto;
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
</style>
