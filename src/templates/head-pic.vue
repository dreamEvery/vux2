<template>
  <div class="head-pic">
    <div class="head-top">
      <div class="go-back" @click="handleSidebar('home/index')">
        返回
      </div>
      <div class="head-portrait"></div>
      <p>当前头像</p>
    </div>
    <div class="head-content">
      <div class="box">
        <div class="box-title">
          默认头像
        </div>
        <flexbox>
          <flexbox-item>
            <div class="flex-demo">头像</div>
          </flexbox-item>
          <flexbox-item>
            <div class="flex-demo">头像</div>
          </flexbox-item>
          <flexbox-item>
            <div class="flex-demo">头像</div>
          </flexbox-item>
          <flexbox-item>
            <div class="flex-demo">头像</div>
          </flexbox-item>
          <flexbox-item>
            <div class="flex-demo">头像</div>
          </flexbox-item>
        </flexbox>
        <flexbox>
          <flexbox-item>
            <div class="flex-demo">头像</div>
          </flexbox-item>
          <flexbox-item>
            <div class="flex-demo">头像</div>
          </flexbox-item>
          <flexbox-item>
            <div class="flex-demo">头像</div>
          </flexbox-item>
          <flexbox-item>
            <div class="flex-demo">头像</div>
          </flexbox-item>
          <flexbox-item>
            <div class="flex-demo">头像</div>
          </flexbox-item>
        </flexbox>
      </div>
      <div class="box second-box">
        <div class="box-title">
          AR拍照（7）
          <span>去拍照</span>
        </div>
        <flexbox>
          <flexbox-item>
            <div class="flex-demo">头像</div>
          </flexbox-item>
          <flexbox-item>
            <div class="flex-demo">头像</div>
          </flexbox-item>
          <flexbox-item>
            <div class="flex-demo">头像</div>
          </flexbox-item>
          <flexbox-item>
            <div class="flex-demo">头像</div>
          </flexbox-item>
          <flexbox-item>
            <div class="flex-demo">头像</div>
          </flexbox-item>
        </flexbox>
        <flexbox>
          <flexbox-item>
            <div class="flex-demo">头像</div>
          </flexbox-item>
          <flexbox-item>
            <div class="flex-demo">头像</div>
          </flexbox-item>
          <flexbox-item>
            <div class="flex-demo">头像</div>
          </flexbox-item>
          <flexbox-item>
            <div class="flex-demo">头像</div>
          </flexbox-item>
          <flexbox-item>
            <div class="flex-demo">头像</div>
          </flexbox-item>
        </flexbox>
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
        info: {}
      }
    },
    created: function () {
      this.$http.get('http://192.168.0.227:8080/headPortraitManage_listHeadPortrait.do?method=getHeadPortraitList', {
        params: {
          sid: 4, userid: 533422211
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
          this.info = body
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
  .head-top {
    width: 100%;
    height: 195px;
    background-color: #e4e4e4;
    text-align: center;
    overflow: hidden;
    vertical-align: middle;
    position: relative;
  }

  .go-back {
    position: absolute;
    width: 35px;
    height: 35px;
    background-color: #fff;
    border: 1px solid #999999;
    border-radius: 50%;
    font-size: 10px;
    line-height: 35px;
    text-align: center;
    top: 10px;
    left: 20px;
  }

  .head-top .head-portrait {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: #999;
    position: relative;
    top: 50%;
    left: 50%;
    margin-top: -50px;
    margin-left: -50px;
  }

  .head-top p {
    font-size: 10px;
    color: #999;
    margin-top: 104px;
  }

  .box {
    width: 100%;
    background-color: #fff;
    padding-bottom: 20px;
    margin-bottom: 10px;
  }

  .box-title {
    line-height: 45px;
    width: 100%;
    border-bottom: 1px solid #f1f1f1;
    padding: 0 20px;
  }

  .box .vux-flexbox {
    padding: 0 15px;
    margin-top: 20px;
  }

  .box .vux-flexbox-item {
    height: 68px;
    border-radius: 50%;
    background-color: #999999;
    text-align: center;
    color: #fff;
    font-size: 12px;
    line-height: 68px;
  }

  .second-box .vux-flexbox-item {
    border-radius: 0;
  }

  .second-box .box-title span {
    float: right;
  }

</style>
