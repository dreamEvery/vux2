<template>
  <div class="Index">
    <!-- showName 向子组件传入一个字符串 ‘isAlertBox’，
    v-if="isAlertBox"这个是控制子组件显示隐藏的变量 -->
    <alert-box v-if="isAlertBox" :showName="'isAlertBox'"></alert-box>
    <div class="top">
      <div class="back">
        <p>退出</p>
      </div>
      <div class="header-pic" @click="handleSidebar('head')">
        <img :src="data.picsummary" alt="">
      </div>
      <div class="introduce">
        <p class="name">{{data.stuname}}</p>
        <p class="class">{{data.classname}}</p>
      </div>
    </div>
    <!--top end-->
    <grid>
      <grid-item link="/gift" label="我的礼品">
        <img slot="icon">
        <span slot="label">我的礼品</span>
      </grid-item>
      <grid-item label="排行" link="/among">
        <img slot="icon" src="">
        <span slot="label">排行</span>
      </grid-item>
      <grid-item link="/message">
        <img slot="icon" src="">
        <span slot="label" >消息 <badge text="2"></badge></span>
      </grid-item>
    </grid>
    <!--list end-->
    <div class="central">
      <div class="cen-title">
        <div class="title">
          <span class="fl">我的礼品</span>
          <span class="fr">赠送</span>
        </div>
        <flexbox :gutter="0">
          <flexbox-item>
            <div class="flex-demo" @click="showAlert">
              <p class="num">{{data.currentintegral}}</p>
              <p class="num-title">积分</p>
            </div>
          </flexbox-item>
          <flexbox-item>
            <div class="flex-demo">
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
          <span class="fl">我的战绩</span>
        </div>
        <flexbox :gutter="0">
          <flexbox-item>
            <div class="flex-demo">
              <p class="num">{{data.classstandings}}</p>
              <p class="num-title">击败本班人数</p>
            </div>
          </flexbox-item>
          <flexbox-item>
            <div class="flex-demo">
              <p class="num">{{data.gradestandings}}</p>
              <p class="num-title">击败本年级人数</p>
            </div>
          </flexbox-item>
          <flexbox-item>
            <div class="flex-demo">
              <p class="num">{{data.schoolstandings}}</p>
              <p class="num-title">击败全校人数</p>
            </div>
          </flexbox-item>
        </flexbox>
      </div>
    </div>
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
    name: 'Index',
    data () {
      return {
        data: {},
        isAlertBox: false
      }
    },
    created: function () {
      this.$http.get('http://192.168.0.227:8080/vendingMachineInventoryManage_listVendingMachineInventory.do?method=getUserInfoForMobilePhoneLogin', {
        params: {
          sid: 4, userid: 533422211, studentid: 222
        }
      }).then(res => {
        // 成功的状态
        let successCode = '0'
        // 失败的状态
        let errorCode = '1'
        console.log(res, '原始数据')
        let body = res.body
        console.log(body, '后台返回的数据')
        // 先判断状态
        // "code":返回状态码,"data":"应该业务数据","msg":"错误提示"
        // 所以我优先判断 code
        if (body.code === successCode) {
          // 处理数据
          console.log(body.stuname)
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
    },
    methods: {
      showAlert () {
        this.isAlertBox = true
        // 使用父组件来控制子组件的显示
      },
      handleSidebar (name) {
        this.$router.push({path: '/' + name})
      },
      onHide () {
        console.log('on hide')
      },
      onShow () {
        console.log('on show')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .top {
    width: 100%;
    height: 165px;
    background-color: #ccc;
    overflow: hidden;
    position: relative;
  }

  .back {
    position: absolute;
    width: 60px;
    height: 25px;
    background-color: #4c4c4c;
    border-radius: 5px;
    text-align: center;
    line-height: 25px;
    font-size: 12px;
    color: #fff;
    right: 20px;
    top: 50px;
  }

  .header-pic {
    width: 80px;
    height: 80px;
    background-color: #4e4e4e;
    margin: 20px auto 0;
    border-radius: 50%;
  }

  .introduce {
    text-align: center;
    margin: 0 auto;
  }

  .introduce .name {
    font-size: 18px;
    padding-top: 10px;
    font-weight: 600;
  }

  .weui-grids {
    background-color: #fff;
  }

  .weui-grids .weui-grid:before {
    border-right: none;
  }

  .weui-grids span {
    font-size: 14px;
    margin-top: 20px;
  }

  .central {
    background-color: #fff;
  }

  .central .cen-title {
    margin-bottom: 10px;
  }

  .central .title {
    width: 100%;
    height: 40px;
    border-bottom: 1px solid #e4e4e4;
    line-height: 40px;
    padding: 0 20px;
  }

  .central .flex-demo {
    text-align: center;
    padding: 10px 10px 20px 10px;
    position: relative;
  }

  .central .flex-demo .num {
    font-size: 22px;
    font-weight: bold;
    padding: 8px 10px;
  }
  .weui-grid__label .vux-badge {
    position: absolute;
    top: -6px;
  }

  /*babge style*/

  .flex-demo:before {
    position: absolute;
    content: " ";
    right: 0;
    top: 26px;
    width: 2px;
    bottom: 26px;
    border-right: 2px solid #f1f1f1;
  }

  .central .vux-flexbox {
    border-bottom: 1px solid #f1f1f1;
  }

  .tabbar {
    position: fixed;
  }
</style>
