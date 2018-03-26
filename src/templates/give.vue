<template>
  <div class="give">
    <div class="public-top">
      <div class="public-back" @click="goIndex">返回</div>
    </div>
    <div class="give-con">
      <div class="give-list" v-for="item in items">
        <div class="give-gift">
          <span class="give-gift">{{item.text}}</span>
          <span class="choose-gift">{{item.choose}}</span>
          <i> > </i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'give',
    data () {
      return {
        items: [
          { text: '赠送礼品', choose: '选择礼品' },
          // 失败的状态
          { text: '赠送积分', choose: ' 输入积分' }
        ]
      }
    },
    created: function () {
      this.$http.get('http://192.168.0.227:8080/mallItemsManage_listMallItems.do?method=getMyMallItemsList', {
        params: {
          sid: 4, userid: 533422211, studentid: 222
        }
      }).then(res => {
        // 成功的状态
        let successCode = 0
        let errorCode = 1
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
  body {
    background-color: #fff;
  }
  .give-con{padding: 0 20px;}
  .give-list {
    line-height: 45px;
    height: 45px;
    font-size: 12px;
    position: relative;
    border-bottom: 1px solid #cccccc;
  }

  .give-list .give-gift {
    color: #4e4e4e;
    margin-right: 10px;
  }
  .give-list .choose-gift{color: #cccccc;}
  .give-list i{position: absolute;right: 3px;}



</style>
