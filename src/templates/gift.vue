<template>
  <div class="gift">
    <div class="public-top">
      <div class="public-back" @click="goIndex">返回</div>
      <div class="public-fr">
        <div>礼品</div>
        <div>积分</div>
      </div>
    </div>
    <div class="con">
      <div class="my-message">
        <p>我的礼品</p>
      </div>
      <div class="tab">
        <ul>
          <li v-for="(item,index) in tabs" :class="{ red:changeRed == index}" @click="change(index)">{{item.text}}</li>
        </ul>
        <div class="tab-con">
          <grid :cols="3">
            <grid-item v-for="i in 9" :key="i">
              <span class="grid-center">{{i}}</span>
            </grid-item>
          </grid>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { Grid, GridItem, GroupTitle } from 'vux'
  export default {
    components: {
      Grid,
      GridItem,
      GroupTitle
    },
    name: 'gift',
    data () {
      return {
        tabs: [
          {text: '全部'},
          {text: '未领取'},
          {text: '收到'},
          {text: '送出'}
        ],
        changeRed: 0,
        message: {}
      }
    },
    created: function () {
      this.$http.get('http://192.168.0.227:8080/mallItemsManage_listMallItems.do?method=getMyMallItemsList', {
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
          this.message = body
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
      goIndex: function () {
        this.$router.push({path: '/home/index'})
      },
      change: function (index) {
        this.changeRed = index
      }
    }
  }
</script>

<style>
  .tab-con {
    background-color: #fff;
    width: 100%;
    height: 100%;
    padding: 20px;
  }

  .tab-con .weui-grid {
    padding: 38px 10px;
  }
</style>
