<template>
  <div class="message">
    <div class="public-top">
      <div class="public-back" @click="goIndex">返回</div>
      <div class="public-fr">
        <div>礼品</div>
        <div>积分</div>
      </div>
    </div>
    <div class="my-message">
      <p>我的消息</p>
    </div>
    <div class="message-state">
      <div class="icon"></div>
      <div class="mess-list">
        <p>{{items.message}}</p>
        <span>{{items.exchangetime}}</span>
      </div>
      <div class="delect">
        删除
      </div>
    </div>
    <div class="message-state">
      <div class="icon"></div>
      <div class="mess-list">
        <p>成功兑换了隐形的斗篷</p>
        <span>2018.3.7</span>
      </div>
      <div class="delect">
        删除
      </div>
    </div>
    <div class="message-state">
      <div class="icon"></div>
      <div class="mess-list">
        <p>成功兑换了隐形的斗篷</p>
        <span>2018.3.7</span>
      </div>
      <div class="delect">
        删除
      </div>
    </div>
    <div class="message-state">
      <div class="icon"></div>
      <div class="mess-list">
        <p>成功兑换了隐形的斗篷</p>
        <span>2018.3.7</span>
      </div>
      <div class="delect">
        删除
      </div>
      <div class="toReceive" @click="goGift">领取</div>
    </div>
    <div class="footer">
      <div class="all">全部删除</div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'message',
    data () {
      return {
        items: []
      }
    },
    methods: {
      goIndex: function () {
        this.$router.push({path: '/home/index'})
      },
      goGift: function () {
        this.$router.push({path: '/gift'})
      }
    },
    created: function () {
      this.$http.get('http://192.168.0.227:8080/mallItemsManage_listMallItems.do?method=getMallMessage', {
        // 你想用
        params: {
          userid: 628830418,
          studentid: 820,
          sid: 4
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
          this.items = body.bodyText
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
</script>

<style scoped>
  .my-message {
    text-align: center;
    font-size: 16px;
    line-height: 40px;
  }

  .icon {
    width: 35px;
    height: 35px;
    background-color: #4c4c4c;
    display: inline-block;
    margin: 20px;
    float: left;
  }

  .message-state {
    background-color: #fff;
    overflow: hidden;
    padding: 0 10px;
    border-bottom: 1px solid #cccccc;
  }

  .message-state .mess-list {
    margin-top: 20px;
    float: left;
  }

  .message-state .delect {
    float: right;
    padding: 2px 12px;
    margin-top: 40px;
    border: 1px solid #797979;
    font-size: 12px;
  }

  .message-state .toReceive {
    float: right;
    padding: 2px 12px;
    margin-top: 40px;
    border: 1px solid #797979;
    margin-right: 10px;
    font-size: 12px;
  }

  .footer {
    position: absolute;
    bottom: 0;
    left: 0;
    border-top: 1px solid #ccc;
    padding: 15px 15px 15px 0;
    width: 100%;
  }

  .footer .all {
    width: 100px;
    line-height: 40px;
    text-align: center;
    float: right;
    border: 1px solid #999999;
  }


</style>
