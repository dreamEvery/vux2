<template>
  <div class="message">
    <public-top></public-top>
    <router-link to="/home/index">
      <div class="public-back">
        <img src="../assets/img/map/my_icon_Return.png" alt="">
      </div>
    </router-link>
    <div class="scroller-box" style="position: relative;height: 80%">
      <scroller :on-refresh="refresh" :on-infinite="infinite" class="scroller">
        <!-- content goes here -->
        <div class="my-scroll">
          <div class="message-state" v-for="(item, index) in items" v-if="index < 5">
            <div class="icon">
              <img src="../assets/img/map/my-news_icon_exchange.png" alt="">
              <!--<img src="" alt="" v-if="item.status==='1'">-->
              <!--<img src="" alt="" v-if="item.status==='2'">-->
              <!--<img src="" alt="" v-if="item.status==='3'||item.status==='4'">-->
            </div>
            <div class="mess-list">
              <p class="mess-list-title">{{item.message}}</p>
              <span class="timer">{{item.exchangetime}}</span>
            </div>
            <div class="delect" @click="deleteMsg('index')">
              <img src="../assets/img/map/my-news_button_Delete_n.png" alt="">
              <img src="../assets/img/map/my_icon_lingqu.png" alt="" v-if="item.status === '0'">
            </div>
            <!--<span class="text">已领取</span>-->
            <!--<span class="text" v-if="true">{{true?'已领取':'未领取'}}</span>-->
            <!--<span class="text">对方未领取</span>-->
            <!--<span class="toReceive" @click="handleSidebar('Gift')">领取</span>-->
          </div>
        </div>
      </scroller>
    </div>
    <div class="footer">
      <div class="all" @click="delectBtn">
        <img src="../assets/img/map/my-news_button_Delete-all_n.png" alt="" v-if="isShow">
        <img src="../assets/img/map/my-news_button_Delete-all_pre.png" alt="" v-else="!isShow">
      </div>
    </div>
  </div>
</template>
<script>
  import publicTop from '../components/publicTop'

  export default {
    name: 'message',
    data () {
      return {
        isShow: true,
        items: [],
        obj: {
          data: [
            {
              message: '成功兑换了 隐形的斗篷1',
              status: '1',
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
        },
        num: 10,
        page: 1
      }
    },
    methods: {
      refresh (done) {
        console.log('refresh')
        this.page = 1
        done(true)
        this.getData(function () {
        })
      },
      infinite (done) {
        console.log('infinite')
        this.page++
         // let that = this
        done(true)
        this.getData(function (data) {
          for (let i = 0; i < data.length; i++) {
            this.items.push(data[i])
          }
        })
      },
      getData (succse) {
        let storageMessage = JSON.parse(sessionStorage.getItem('info'))
        console.log(storageMessage, '34567')
        this.$http.get('/api/mallItemsManage_listMallItems.do?method=getMallMessage', {
          // 你想用
          params: storageMessage
        }).then(res => {
          // 成功的状态
          let successCode = 0
          //   // 失败的状态
          let errorCode = 1
          console.log(res, '原始数据')
          let body = res.body
          console.log(body, '后台返回的数据')
          // 先判断状态
          // "code":返回状态码,"data":"应该业务数据","msg":"错误提示"
          // 所以我优先判断 code
          if (body.code === successCode) {
            // 处理数据
            // if (succse) succse(body.data)
            this.items = body.data
            for (let i = 0; i < this.items.length; i++) {
              console.log(this.items[i].status, '1223')
            }
          } else if (body.code === errorCode) {
            // 处理失败
            console.log('错误提示：' + body.msg)
          }
        }, error => {
          //   // error callback
          console.log(error)
        })
      },
      delectBtn () {
        this.isShow = false
        this.$http.post('/api/mallItemsManage_listMallItems.do?method=deleteAllMallMessage', {
          userid: 628830418,
          studentid: 820,
          sid: 4
        }).then(response => {
          // get body data
          this.items = []
        }, response => {
          // error callback
        })
      },
      deleteMsg: function (index) {
        this.items.splice(index, 1)
      }
    },
    components: {
      publicTop
    },
    created () {
      // this.getData()
    }
  }
</script>

<style scoped>
  .integral {
    background-image: url("../assets/img/map/integral.png");
    background-size: 100% 100%;
    line-height: 0.7rem;
  }

  .gift {
    background-image: url("../assets/img/map/exchange_icon_liwu.png");
    background-size: 100% 100%;
    line-height: 0.7rem;
  }

  .message {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background-image: url("../assets/img/map/message-bg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  .scroller {
    padding: 0.2rem 0.4rem
  }

  .scroller-box {
    position: relative;
  }

  .my-scroll {
    background-color: #f1e3bb;
    padding: 0.2rem 0.1rem 0.05rem;
    border-radius: 10px;
    margin-top: .4rem;
  }

  .icon {
    width: 1rem;
    height: 1rem;
    display: inline-block;
    margin-top: 0.2rem;
    margin-right: 0.1rem;
    float: left;
  }

  .icon img {
    width: 100%;
    height: 100%;
  }

  .mess-list-title {
    font-size: 0.30rem;
    color: #6b3a0f;
    font-weight: bold;
  }

  .message-state {
    overflow: hidden;
    padding: 0 10px;
    background-color: #fffbe8;
    border-radius: 20px;
    margin-bottom: 0.2rem;
  }

  .timer {
    font-size: 0.24rem;
    color: #A6765C;
  }

  .message-state .mess-list {
    margin-top: 0.2rem;
    float: left;
  }

  .message-state .delect {
    float: right;
    width: 1.4rem;
    height: 0.6rem;
    margin-top: 0.75rem;
  }

  .message-state .delect img {
    width: 100%;
    height: 100%;
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
    overflow: hidden;
    bottom: 0;
    left: 0;
    width: 100%;
    position: fixed;
  }

  .footer .all {
    width: 2rem;
    float: right;
  }

  .all img {
    width: 100%;
    height: 100%;
  }


</style>
