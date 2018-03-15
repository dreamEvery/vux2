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
    <div class="side-con">
      <div class="sidebar">
        <ul v-for="( item, index ) in items" :class="{active:index == nowIndex}" @click="toggleBars(index)">
          <li>{{item.text}}</li>
        </ul>
        <div class="divTab" v-show="nowIndex===0">
          <ul>
            <li v-for="(list, index) in lists" :class="{ change:changeList == index}" @click="changelist(index)">{{list.text}}</li>
          </ul>
        </div>
        <div class="divTab" v-show="nowIndex===1">
          <ul>
            <li class="active">第一层</li>
          </ul>
        </div>
      </div>
      <div class="main-con"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'market',
    data () {
      return {
        tabs: [
          {text: '兑换机'},
          {text: '礼品'},
          {text: '道具'},
          {text: '卡片'},
          {text: 'AR拍照'}
        ],
        changeRed: 0,
        items: [
          {text: '左侧货架'},
          {text: '右侧货架'}
        ],
        lists: [
          {text: '第一层'},
          {text: '第二层'},
          {text: '第三层'},
          {text: '第四层'},
          {text: '第五层'}
        ],
        nowIndex: 1,
        changeList: 0
      }
    },
    methods: {
      change (index) {
        this.changeRed = index
      },
      toggleBars: function (index) {
        this.nowIndex = index
      },
      changelist (index) {
        this.changeList = index
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .change{
    background-color: #fff;
    color: #fff;
  }
  .active{background-color: #999;color: #fff;}
  .market {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
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

  .side-con {
    background-color: #fff;
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .side-con .sidebar {
    width: 18%;
    background-color: #f8f8f8;
    overflow: hidden;
    flex: 1;
  }
  .side-con .sidebar li {
    text-align: center;
    line-height: 45px;
    width: 100%;
    border-bottom: 1px solid #cccccc;
    background-color: #e4e4e4;
  }

</style>
