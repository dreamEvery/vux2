<template>
  <div class="head-pic">
    <div class="head-top">
      <div class="go-back" @click="handleSidebar('home/index')">
      </div>
      <div class="nowPic">
        <div class="head-portrait">
          <img alt="" :src='pic' />
          <!--pic || ',,/assets/img/map/headPic.png'-->
        </div>
        <p>当前头像</p>
      </div>
    </div>
    <div class="head-content">
      <div class="head-box">
        <div class="box frist-box">
          <div class="box-title">
            默认头像
          </div>
          <ul class="defultPic">
            <li v-for="item in data">
              <div class="picBox">
                <img :src="item.picsummary" alt="" @click="confirmBox(item.picsummary)">
              </div>
            </li>
          </ul>
        </div>
        <!--<div class="box second-box">-->
        <!--<div class="box-title">-->
        <!--AR拍照（7）-->
        <!--<span>去拍照</span>-->
        <!--</div>-->
        <!--<flexbox>-->
        <!--<flexbox-item>-->
        <!--<div class="flex-demo">头像</div>-->
        <!--</flexbox-item>-->
        <!--<flexbox-item>-->
        <!--<div class="flex-demo">头像</div>-->
        <!--</flexbox-item>-->
        <!--<flexbox-item>-->
        <!--<div class="flex-demo">头像</div>-->
        <!--</flexbox-item>-->
        <!--<flexbox-item>-->
        <!--<div class="flex-demo">头像</div>-->
        <!--</flexbox-item>-->
        <!--<flexbox-item>-->
        <!--<div class="flex-demo">头像</div>-->
        <!--</flexbox-item>-->
        <!--</flexbox>-->
        <!--<flexbox>-->
        <!--<flexbox-item>-->
        <!--<div class="flex-demo">头像</div>-->
        <!--</flexbox-item>-->
        <!--<flexbox-item>-->
        <!--<div class="flex-demo">头像</div>-->
        <!--</flexbox-item>-->
        <!--<flexbox-item>-->
        <!--<div class="flex-demo">头像</div>-->
        <!--</flexbox-item>-->
        <!--<flexbox-item>-->
        <!--<div class="flex-demo">头像</div>-->
        <!--</flexbox-item>-->
        <!--<flexbox-item>-->
        <!--<div class="flex-demo">头像</div>-->
        <!--</flexbox-item>-->
        <!--</flexbox>-->
        <!--</div>-->
      </div>
    </div>
    <div class="headPic" v-if="show">
      <div class="masking"></div>
      <div class="alert">
        <div class="top">
          更换头像
        </div>
        <div class="alert-con">
          <p class="con-main">是否确认更换头像</p>
        </div>
        <div class="btn">
          <div class="backBtn" @click="confirmBtn">
            <img src="../assets/img/alert/give-button.png" alt="">
          </div>
          <div class="thinkBtn" @click="show=!show">
            <img src="../assets/img/alert/button_weit-a-moment_n.png" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { Flexbox, FlexboxItem, Divider, Grid, GridItem, GroupTitle } from 'vux'

  export default {
    components: {
      Flexbox,
      FlexboxItem,
      Divider,
      Grid,
      GridItem,
      GroupTitle
    },
    name: 'head-pic',
    data () {
      return {
        data: [],
        pic: '',
        mine: null,
        show: false,
        active: false,
        storageMessage: null,
        postPic: ''
      }
    },
    created: function () {
      console.log(this.$route.query.imgUrl)
      let storageMessage = JSON.parse(sessionStorage.getItem('info'))
      this.mine = JSON.parse(sessionStorage.getItem('stuMessage'))
      this.$http.get(this.HOST + '/headPortraitManage_listHeadPortrait.do?method=getHeadPortraitList', {
        params: storageMessage
      }).then(res => {
        // 成功的状态
        let successCode = 0
        // 失败的状态
        let errorCode = 1
        let body = res.body
        if (body.code === successCode) {
          // 处理数据
          this.data = body.data
        } else if (body.code === errorCode) {
          // 处理失败
          console.log('错误提示：' + body.msg)
        }
      }, error => {
        // error callback
        console.log(error)
      })
      // 获取路由头像
      this.pic = this.$route.query.imgUrl
    },
    methods: {
      handleSidebar (name) {
        this.$router.push({path: '/' + name})
      },
      confirmBtn () {
        let storageMessage = JSON.parse(sessionStorage.getItem('info'))
        this.$http.post(this.HOST + '/headPortraitManage_listHeadPortrait.do?method=UpdateDefaultHeadImage',
          {sid: storageMessage.sid, userid: storageMessage.userid, studentid: storageMessage.studentid, picsummary: this.postPic}
        ).then(res => {
          // get body data
          let body = res.body
          let successCode = 0
          if (successCode === body.code) {
            this.show = false
            this.pic = this.postPic
          }
        }, res => {
          // error callback
        })
      },
      confirmBox (pic) {
        this.show = true
        this.postPic = pic
      }
    }
  }
</script>

<style scoped>
  .head-top .nowPic {
    margin-top: 1.6rem
  }

  .head-content {
    padding: 10px 25px;
  }

  .head-box {
    background-color: #FEFBEA;
    border-radius: 10px;
    padding: 10px 8px;
  }

  .head-pic {
    background-image: url("../assets/img/map/head_bg.png");
    background-size: 100% 100%;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }

  .head-top {
    width: 100%;
    min-height: 4rem;
    text-align: center;
    overflow: hidden;
    vertical-align: middle;
    position: relative;
  }
  @media screen and (min-width: 768px) {
    .head-top{margin-top: 0.5rem;}
    .head-content{width: 95%;margin: 0 auto;}
  }
  .go-back {
    position: absolute;
    width: 1.6rem;
    height: 0.8rem;
    top: 1.4rem;
    left: 0.4rem;
    background-image: url("../assets/img/map/Game_icon_fanhui.png");
    background-size: 100% 100%;
  }

  .head-top .head-portrait {
    width: 1.4rem;
    height: 1.4rem;
    border-radius: 50%;
    position: relative;
    top: 40%;
    left: 50%;
    margin-left: -0.7rem;
    background-image: url("../assets/img/map/exchange_head.png");
    background-size: 100% 100%;
    padding: 0.05rem 0.06rem 0.06rem 0.06rem;
  }
  .head-portrait img{border-radius: 50%;}
  .head-top p {
    font-size: 10px;
    color: #fff;
    text-shadow: 0 1px #9D4C4A, 1px 0 #9D4C4A, -1px 0 #9D4C4A, 0 -1px #9D4C4A;
    margin-top: 0.2rem;
  }

  .box {
    width: 100%;
    border-radius: 10px;
    background-color: #EFE3BF;
  }

  .frist-box {
    margin-bottom: 10px;
  }

  .box-title {
    line-height: 45px;
    width: 100%;
    border-bottom: 1px dashed #958475;
    padding: 0 20px;
    font-size: 14px;
    color: #75695B;
  }

  .defultPic {
    height: 4.6rem;
    overflow-y: scroll;
    width: 100%;
    margin-top: 0.2rem;
  }

  .defultPic li {
    width: 20%;
    height: 1.2rem;
    border-radius: 50%;
    float: left;
    display:table-cell;
  }

  .defultPic li .picBox {
    width: 1rem;
    height: 1rem;
    margin: 0 auto;
  }

  .defultPic li img {
    border-radius: 50%;
  }

  .box .vux-flexbox {
    padding: 5px 10px 10px 10px;
  }

  .box .vux-flexbox-item {
    height: 55px;
    border-radius: 50%;
    background-color: #999999;
  }

  .second-box .box-title span {
    float: right;
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

  .btn {
    padding: 0.19rem 0.4rem;
    overflow: hidden;
  }

  .btn .thinkBtn {
    float: right
  }

  .btn .backBtn, .thinkBtn {
    width: 1.6rem;
    height: 0.7rem;
    float: left;
    margin-top: 0.3rem;
  }
</style>
