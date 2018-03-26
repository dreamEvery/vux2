<template>
  <div class="Among">
    <div class="public-top">
      <div class="public-back" @click="goIndex">返回</div>
      <div class="public-fr">
        <div>礼品</div>
        <div>积分</div>
      </div>
    </div>
    <div class="con">
      <div class="my-message">
        <p>排行榜</p>
      </div>
      <div class="tab">
        <ul class="center-ul">
          <li v-for="(item,index) in tabs" :class="{ red:changeRed == index}" @click="change(index)">{{item.text}}</li>
        </ul>
        <div class="tab-con">
        </div>
      </div>
    </div>
    <div class="among-list">
      <flexbox :gutter="0">
        <flexbox-item>
          <div class="flex-demo">
            <div class="small-pic"></div>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-demo">
            <div class="big-pic"></div>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-demo">
            <div class="small-pic"></div>
            <div>sjxndkdcfks</div>
          </div>
        </flexbox-item>
      </flexbox>
    </div>
  </div>
</template>
<script>
  import { Flexbox, FlexboxItem, Divider } from 'vux'

  export default {
    components: {
      Flexbox,
      FlexboxItem,
      Divider
    },
    name: 'among',
    data () {
      return {
        tabs: [
          {text: '全部'},
          {text: '未领取'},
          {text: '收到'}
        ],
        changeRed: 0
      }
    },
    methods: {
      handleSidebar (name) {
        this.$router.push({path: '/' + name})
      },
      goIndex: function () {
        this.$router.push({path: '/home/index'})
      },
      change: function (index) {
        this.changeRed = index
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .tab .center-ul {
    justify-content: center;
    align-items: center;
  }

  .among-list {
    width: 100%;
    border-top: 1px solid #ccc;
    height: auto;
    background-color: #fff;
  }

  .flex-demo {
    padding: 50px 0;
    vertical-align: bottom;
    position: relative;
  }

  .small-pic {
    width: 60px;
    height: 60px;
    background-color: #797979;
    border-radius: 50%;
    position: absolute;
    bottom: 0;
    margin-left: -30px;
    left: 50%;
  }

  .big-pic {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: #797979;
    position: absolute;
    bottom: 0;
    margin-left: -40px;
    left: 50%;
  }

</style>
