<template>
  <div class="message">
    <div class="public-top">
      <div class="public-back" @click="handleSidebar('home/index')">返回</div>
      <div class="public-fr">
        <div @click="handleSidebar('gift')">礼品</div>
        <div>积分</div>
      </div>
    </div>
    <div class="my-message">
      <p>我的消息</p>
    </div>
    <div class="message-state" v-for="(item, index) in obj.data">
      <div class="icon">
        <img src="" alt="" class="chongzhi" v-if="item.status==='1'">
        <img src="" alt="" class="duihuan" v-if="item.status==='2'">
        <img src="" alt="" class="liwu" v-if="item.status==='3'||item.status==='4'">
      </div>
      <div class="mess-list" >
        <p class="mess-list-title" v-if="item.status==='1'||item.status==='2'">成功兑换了隐形的斗篷</p>
        <p class="mess-list-title" v-else-if="item.status==='3'&&item.type==='songchu'"><a href="">神秘人物</a> 送你 科学故事书。</p>
        <p class="mess-list-title" v-else-if="item.status==='3'&&item.type==='shouru'">你 送给了 <a href="">刘晓晓</a> 隐形的斗篷 </p>
        <span class="timer">2018.3.7</span>
      </div>
      <div class="delect">
        删除
      </div>
      <span class="text">已领取</span>
      <span class="text" v-if="liwu && fasong">{{isLingqu?'已领取':'未领取'}}</span>
      <span class="text">对方未领取</span>
      <span class="toReceive" @click="handleSidebar('Gift')">领取</span>
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
        items: [
        ],
        obj: {
          data: [
            {
              message: '成功兑换了 隐形的斗篷1',
              status: 'duihuan',
              exchangetime: '2018-03-06 13:47:33',
              studentname: '童雪',
              studentid: 12,
              id: 1
            },
            {
              message: '充值',
              status: 'chongzhi',
              exchangetime: '2018-03-06 13:47:33',
              studentname: '童雪',
              studentid: 12,
              id: 2
            },
            {
              message: '礼物',
              status: 'liwu',
              isSend: false,
              islingqu: false,
              exchangetime: '2018-03-06 13:47:33',
              studentname: '童雪',
              studentid: 12,
              id: 3
            },
            {
              message: '成功兑换了 隐形的斗篷4',
              status: '4',
              exchangetime: '2018-03-06 13:47:33',
              studentname: '童雪',
              studentid: 12,
              id: 4
            }],
          code: 0,
          msg: ''
        }
      }
    },
    methods: {
      handleSidebar (name) {
        this.$router.push({path: '/' + name})
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
        let successCode = 0
        // 失败的状态
        let errorCode = 1
        console.log(res, '原始数据')
        let body = res.body
        console.log(body, '后台返回的数据')
        // 先判断状态
        // "code":返回状态码,"data":"应该业务数据","msg":"错误提示"
        // 所以我优先判断 code
        if (body.code === successCode) {
          // 处理数据
          this.items = body.data
          console.log(this.items, '1111')
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
    background-color: #ffffff;
    overflow: hidden;
    bottom: 0;
    left: 0;
    border-top: 1px solid #ccc;
    padding: 8px 15px 8px 0;
    width: 100%;
    position: fixed;
  }

  .footer .all {
    width: 100px;
    line-height: 40px;
    text-align: center;
    float: right;
    border: 1px solid #999999;
  }


</style>
