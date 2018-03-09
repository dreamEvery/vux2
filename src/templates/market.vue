<template>
  <div class="market">
    <div class="in-top">
      <div class="top-head">
        头像
        <img src="" alt="">
      </div>
      <div class="back">返回</div>
    </div>
    <div class="con">
      <div class="my-message">
        <p>市集</p>
      </div>
      <input type="search" class="search" placeholder="搜索">
      <div class="tab">
        <ul>
          <li v-for="(item,index) in tabs" :class="{ red:changeRed == index}" @click="change(index)">{{item.text}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'market',
    data () {
      return {
        tabs: [
          {text: '全部'},
          {text: '未领取'},
          {text: '收到'},
          {text: '送出'},
          {text: '送出'}
        ],
        changeRed: 0
      }
    },
    methods: {
      change (index) {
        this.changeRed = index
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

  .search {
    border-radius: 5px;
    width:90%;
    height: 20px;
    line-height: 20px;
    text-align: center;
    background-color: #fff;
    margin: 0 auto;
    margin-top: 10px;
    display: block;
    font-size: 12px;
  }
</style>
