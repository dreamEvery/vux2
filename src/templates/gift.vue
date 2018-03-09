<template>
  <div class="gift">
    <div class="public-top">
      <div class="public-back" @click="goIndex">返回</div>
      <div class="public-fr">
        <div>礼品</div>
        <div>积分</div>
      </div>
    </div>
    <div class="con">
      <div class="my-message">
        <p>我的礼品</p>
      </div>
      <div class="tab">
        <ul>
          <li v-for="(item,index) in tabs" :class="{ red:changeRed == index}" @click="change(index)">{{item.text}}</li>
        </ul>
        <div class="tab-con">
          <grid :cols="3">
            <grid-item v-for="i in 9" :key="i">
              <span class="grid-center">{{i}}</span>
            </grid-item>
          </grid>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { Grid, GridItem, GroupTitle } from 'vux'
  export default {
    components: {
      Grid,
      GridItem,
      GroupTitle
    },
    name: 'gift',
    data () {
      return {
        tabs: [
          {text: '全部'},
          {text: '未领取'},
          {text: '收到'},
          {text: '送出'}
        ],
        changeRed: 0
      }
    },
    methods: {
      goIndex: function () {
        this.$router.push({path: '/home/index'})
      },
      change: function (index) {
        this.changeRed = index
      }
    }
  }
</script>

<style>
  .tab-con {
    background-color: #fff;
    width: 100%;
    height: 100%;
    padding: 20px;
  }

  .tab-con .weui-grid {
    padding: 38px 10px;
  }
</style>
