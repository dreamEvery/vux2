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
          <div class="message-state" v-for="(item, index) in items">
            <div class="icon">
              <img src="../assets/img/map/my-news_icon_exchange.png" alt="">
            </div>
            <div class="mess-list">
              <p class="mess-list-title">{{item.message}}</p>
              <span class="timer">{{item.exchangetime}}</span>
            </div>
            <div class="delect" @click="singleDelete(item.id, index)">
              <img src="../assets/img/map/my-news_button_Delete_n.png" alt="">
            </div>
          </div>
        </div>
      </scroller>
    </div>
    <div class="footer">
      <div class="all" @click="delectAll">
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
        num: 10,
        page: 1,
        storageMessage: null
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
        this.$http.get(this.HOST + '/mallItemsManage_listMallItems.do?method=getMallMessage', {
          params: storageMessage
        }).then(res => {
          // 成功的状态
          let successCode = 0
          // 失败的状态
          let errorCode = 1
          console.log(res, '原始数据')
          let body = res.body
          console.log(body, '后台返回的数据')
          // 先判断状态
          if (body.code === successCode) {
            // 处理数据
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
      // 全部删除
      delectAll () {
        this.isShow = false
        this.$http.post(this.HOST + '/mallItemsManage_listMallItems.do?method=deleteAllMallMessage',
          {sid: this.storageMessage.sid, userid: this.storageMessage.userid, studentid: this.storageMessage.studentid}
        ).then(response => {
          // get body data
          this.items = []
        }, response => {
          // error callback
        })
      },
      // 单个删除
      singleDelete (id, index) {
        this.$http.post(this.HOST + '/mallItemsManage_listMallItems.do?method=deleteMallMessage',
          {userid: this.storageMessage.userid, sid: this.storageMessage.sid, id: id}
        ).then(response => {
          // get body data
          this.items.splice(index, 1)
        }, response => {
          // error callback
        })
      }
    },
    components: {
      publicTop
    },
    created () {
      // this.getData()
      this.storageMessage = JSON.parse(sessionStorage.getItem('info'))
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
