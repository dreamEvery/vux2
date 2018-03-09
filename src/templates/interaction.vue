<template>
  <div class="interaction">
    <div class="in-top">
      <div class="top-head">
        头像
        <img src="" alt="">
      </div>
      <div class="back">返回</div>
    </div>
    <div class="in-con">
      <div class="my-message">
        <p>游戏互动</p>
      </div>
      <div class="ranking">
        <p>已经击败90%小伙伴</p>
      </div>
      <div class="record">
        <div class="title">
          <span>我的获奖记录（我的战绩）:</span>
          <a href="javascript:;">查看更多</a>
        </div>
        <ul>
          <li v-for="list in lists">{{list.text}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'interaction',
    data () {
      return {
        lists: [
          {text: '获得10积分'},
          {text: '未领取'},
          {text: '收到'}
        ]
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .in-top {
    width: 100%;
    height: 60px;
    background-color: #e4e4e4;
    padding: 10px 20px;
  }

  .top-head {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #797979;
    float: left;
    text-align: center;
  }

  .in-top .back {
    width: 45px;
    height: 20px;
    border-radius: 5px;
    background-color: #999999;
    text-align: center;
    font-size: 12px;
    float: right;
    margin-top: 10px;
  }

  .in-con {
    padding: 0 20px;
  }

  .in-con .ranking {
    margin-top: 10px;
    width: 100%;
    height: 30px;
    background-color: #fff;
    text-align: center;
    line-height: 30px;
    font-size: 14px;
  }

  .record {
    position: absolute;
    bottom: 53px;
    left: 0;
    background-color: #fff;
    width: 100%;
    padding: 0 20px;
  }

  .record .title {
    padding-top: 20px;
    padding-bottom: 5px;
  }

  .record a {
    float: right;
    color: lightskyblue;
  }

  .record li {
    line-height: 30px;
    border-top: 1px solid #ccc;
    font-size: 12px;
  }
</style>
