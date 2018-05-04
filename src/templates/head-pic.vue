<template>
  <div class="head-pic">
    <div class="head-top">
      <div class="go-back" @click="handleSidebar('home/index')">
      </div>
      <div class="nowPic">
        <div class="head-portrait">
          <img alt="">
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
            <li v-for="item in info">
              <div class="picBox">
                <img :src="item.picsummary" alt="">
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
        info: {},
        pic: ' ',
        mine: null
      }
    },
    created: function () {
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
          this.info = body.data
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
      handleSidebar (name) {
        this.$router.push({path: '/' + name})
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
    height: 195px;
    text-align: center;
    overflow: hidden;
    vertical-align: middle;
    position: relative;
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
    background-color: #999;
    position: relative;
    top: 40%;
    left: 50%;
    margin-left: -0.7rem;
  }

  .head-top p {
    font-size: 10px;
    color: #999;
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
    /*display: flex;*/
    /*flex-direction: row;*/
    /*flex-wrap: wrap;*/
    /*justify-content: space-between;*/
    /*align-content: center;*/
    margin-top: 0.2rem;
    overflow: hidden;
  }

  .defultPic li {
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
    float: left;
  }
  .defultPic li .picBox{width: 1rem;height: 1rem;margin: 0 auto;}

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

</style>
