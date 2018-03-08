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
        <div>
          <p>成功兑换了隐形的斗篷</p>
          <span>2018.3.7</span>
        </div>
    </div>
    <div class="message-state">
      <div class="icon"></div>
      <div>
        <p>成功兑换了隐形的斗篷</p>
        <span>2018.3.7</span>
      </div>
    </div>
    <div class="message-state">
      <div class="icon"></div>
      <div>
        <p>成功兑换了隐形的斗篷</p>
        <span>2018.3.7</span>
      </div>
    </div>
    <div class="message-state">
      <div class="icon"></div>
      <div>
        <p>成功兑换了隐形的斗篷</p>
        <span>2018.3.7</span>
      </div>
    </div>
    <div class="footer">
       <div class="all">全部删除</div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'message',
    data(){
      return {}
    },
    methods:{
      goIndex:function () {
        this.$router.push({ path: '/home/index' })
      },
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
  .message-state div{margin-top: 20px;}
  .footer{position: absolute;bottom: 0;left: 0;border-top: 1px solid #ccc;padding:15px 15px 15px 0;width: 100%;}
  .footer .all{width: 100px;line-height: 40px;text-align: center;float: right;border: 1px solid #999999;}


</style>
