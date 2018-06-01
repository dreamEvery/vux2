<template>
  <div class="message">
    <public-top></public-top>
    <router-link to="/home/index">
      <div class="public-back">
        <img src="../assets/img/map/my_icon_Return.png" alt="">
      </div>
    </router-link>
    <div class="scroller-box" style="position: relative;height: 70%">
      <scroller :on-refresh="refresh" :on-infinite="infinite" class="scroller">
        <div class="my-scroll">
          <div class="message-state" v-for="(item, index) in items">
            <div class="icon">
              <img src="../assets/img/map/my-news_icon_exchange.png" alt="" v-if="item.type === '1' ">
              <img src="../assets/img/map/my-news_icon_gift.png" alt="" v-if="item.type === '5' "/>
              <img src="../assets/img/map/my-news_icon_recharge.png" alt="" v-if="item.type === '2' || item.type === '0'"/>
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
      <div class="all" @click="delectBtn()">
        <img src="../assets/img/map/my-news_button_Delete-all_n.png" alt="" v-if="isShow">
        <img src="../assets/img/map/my-news_button_Delete-all_pre.png" alt="" v-else="!isShow">
      </div>
    </div>
    <!--弹框-->
    <div class="deleteAll" v-if="deleteAll">
      <div class="masking"></div>
      <div class="alert">
        <div class="top">
          全部删除
        </div>
        <div class="alert-con">
          <p class="con-main">确定要删除全部信息吗？</p>
        </div>
        <div class="btn">
          <div class="backBtn" @click="sureBtn">
            <img src="../assets/img/alert/give-button.png" alt="" slot="icon">
          </div>
          <div class="thinkBtn" @click="wait">
            <img src="../assets/img/alert/button_weit-a-moment_n.png" alt="">
          </div>
        </div>
      </div>
      <router-view></router-view>
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
        ipage: 1,
        storageMessage: null,
        deleteAll: false
      }
    },
    methods: {
      // 全部删除
      delectBtn () {
        this.deleteAll = true
      },
      sureBtn () {
        let storageMessage = JSON.parse(sessionStorage.getItem('info'))
        this.isShow = false
        this.$http.post(this.HOST + '/mallItemsManage_listMallItems.do?method=deleteAllMallMessage',
          {sid: storageMessage.sid, userid: storageMessage.userid, studentid: storageMessage.studentid}
        ).then(response => {
          // get body data
          let success = 0
          let body = response.body
          if (success === body.code) {
            this.items = []
            this.deleteAll = false
          }
        }, response => {
          // error callback
        })
      },
      // 下拉刷新
      refresh (done) {
        console.log('refresh')
        this.ipage = 1
        this.getData(done)
      },
      infinite (done) {
        this.ipage = this.ipage + 1
//        done(true)
//        this.getData(function (data) {
//          for (let i = 0; i < data.length; i++) {
//            this.items.push(data[i])
//          }
//        })
        this.getData(done, function (data) {
          for (let i = 0; i < data.length; i++) {
            this.items.push(data[i])
          }
        })
      },
      getData (done) {
        let storageMessage = JSON.parse(sessionStorage.getItem('info'))
//        if (per_page) {
//          this.storageMessage.ipage = per_page
//        } else {thia.storageMessage.ipage = 1}
        this.$http.get(this.HOST + '/mallItemsManage_listMallItems.do?method=getMallMessage', {
          params: {
            sid: this.storageMessage.sid,
            userid: this.storageMessage.userid,
            studentid: this.storageMessage.studentid,
            pageIndexName  : this.ipage
          }
        }).then(res => {
          // 成功的状态
          let successCode = 0
          // 失败的状态
          let errorCode = 1
          let body = res.body
          // 先判断状态
          if (body.code === successCode) {
            // 处理数据
            this.items = body.data
            for (let i = 0; i < this.items.length; i++) {
              console.log(this.items[i].type, '1223')
            }
            if (done) {
              done(true)
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
      },
      wait () {
        this.deleteAll = false
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
    padding: 0.2rem 0.4rem;
  }
  @media screen and (min-width: 768px) {
   .my-scroll {margin-top: 4%}
  }
  @media screen and (min-width: 1024px) {
    .my-scroll {margin-top: 12.4%}
  }

  .scroller-box {
    position: relative;
    margin-top: .7rem;
  }

  .my-scroll {
    background-color: #f1e3bb;
    padding: 0.2rem 0.1rem 0.05rem;
    border-radius: 10px;
  }

  .icon {
    width: 0.84rem;
    height: 0.84rem;
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
    font-size: 0.28rem;
    color: #6b3a0f;
    font-weight: bold;
    margin-bottom: 0.16rem;
  }

  .message-state {
    overflow: hidden;
    background-color: #fffbe8;
    border-radius: 15px;
    margin-bottom: 0.08rem;
    border: 1px solid #FD8A32;
    position: relative;
  }

  .timer {
    font-size: 0.24rem;
    color: #A6765C;
  }

  .message-state .mess-list {
    margin-top: 0.2rem;
    float: left;
    margin-bottom: 0.3rem;
    width: 84%;
  }

  .message-state .delect {
    float: right;
    width: 1.25rem;
    height: 0.5rem;
    position: absolute;
    right:0.02rem;
    bottom: 0.02rem;
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
    padding-right: 0.5rem;
    margin-bottom: 0.1rem;
  }

  .all img {
    width: 100%;
    height: 100%;
  }
  .masking {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 999;
    transition: all .3s ease-in-out;
  }

  .alert {
    text-align: center;
    color: #652411;
    width: 86%;
    height: 3.58rem;
    background-image: url("../assets/img/alert/leave_bg.png");
    background-size: 100% 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    z-index: 999;
    padding: 0 0.4rem;
  }

  .alert .top {
    font-size: 0.47rem;
    color: #6d1f07;
    text-align: center;
    line-height: 1.3rem;
    font-weight: bold;
  }

  .alert-con .con-main {
    text-align: center;
    font-size: 0.34rem;
    font-weight: bold;
    margin-top: 0.4rem;
    margin-left: 0.3rem;
  }
  .btn{padding: 0.19rem 0.4rem;overflow: hidden;}
  .btn .thinkBtn{float: right}
  .btn .backBtn,.thinkBtn{width: 1.6rem;height: 0.7rem;float: left;margin-top: 0.3rem;}
  ._v-container>._v-content>.pull-to-refresh-layer .spinner-holder .text{line-height: 17px;}

</style>
