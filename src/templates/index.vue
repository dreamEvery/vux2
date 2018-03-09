<template>
  <div class="Index">
    <div class="top">
      <div class="back">
        <p>退出</p>
      </div>
      <div class="header-pic" @click="handleSidebar('head')"></div>
      <div class="introduce">
        <p class="name">童晓雪</p>
        <p class="class">一年级二班</p>
      </div>
    </div>
    <!--top end-->
    <grid>
      <grid-item link="/gift" label="我的礼品">
        <img slot="icon" src="">
        <span slot="label">我的礼品</span>
      </grid-item>
      <grid-item label="排行" link="/among">
        <img slot="icon" src="">
        <span slot="label">排行</span>
      </grid-item>
      <grid-item link="/message">
        <img slot="icon" src="">
        <span slot="label" >消息 <badge text="2"></badge></span>
      </grid-item>
    </grid>
    <!--list end-->
    <div class="central">
      <div class="cen-title">
        <div class="title">
          <span class="fl">我的礼品</span>
          <span class="fr">赠送</span>
        </div>
        <flexbox :gutter="0">
          <flexbox-item>
            <div class="flex-demo">
              <p class="num">2518</p>
              <p class="num-title">积分</p>
            </div>
          </flexbox-item>
          <flexbox-item>
            <div class="flex-demo">
              <p class="num">2518</p>
              <p class="num-title">积分</p>
            </div>
          </flexbox-item>
          <flexbox-item>
            <div class="flex-demo">
              <p class="num">2518</p>
              <p class="num-title">积分</p>
            </div>
          </flexbox-item>
        </flexbox>
      </div>
      <div class="cen-title">
        <div class="title">
          <span class="fl">我的战绩</span>
        </div>
        <flexbox :gutter="0">
          <flexbox-item>
            <div class="flex-demo">
              <p class="num">91%</p>
              <p class="num-title">击败本班人数</p>
            </div>
          </flexbox-item>
          <flexbox-item>
            <div class="flex-demo">
              <p class="num">2518</p>
              <p class="num-title">积分</p>
            </div>
          </flexbox-item>
          <flexbox-item>
            <div class="flex-demo">
              <p class="num">2518</p>
              <p class="num-title">积分</p>
            </div>
          </flexbox-item>
        </flexbox>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    Grid,
    GridItem,
    GroupTitle,
    Flexbox,
    FlexboxItem,
    Divider,
    Badge
  } from 'vux'

  export default {
    components: {
      Grid,
      GridItem,
      GroupTitle,
      Flexbox,
      FlexboxItem,
      Divider,
      Badge
    },
    name: 'Index',
    data () {
      return {}
    },
    methods: {
      handleSidebar (name) {
        this.$router.push({path: '/' + name})
      },
      onHide () {
        console.log('on hide')
      },
      onShow () {
        console.log('on show')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .top {
    width: 100%;
    height: 165px;
    background-color: #ccc;
    overflow: hidden;
    position: relative;
  }

  .back {
    position: absolute;
    width: 60px;
    height: 25px;
    background-color: #4c4c4c;
    border-radius: 5px;
    text-align: center;
    line-height: 25px;
    font-size: 12px;
    color: #fff;
    right: 20px;
    top: 50px;
  }

  .header-pic {
    width: 80px;
    height: 80px;
    background-color: #4e4e4e;
    margin: 20px auto 0;
    border-radius: 50%;
  }

  .introduce {
    text-align: center;
    margin: 0 auto;
  }

  .introduce .name {
    font-size: 18px;
    padding-top: 10px;
    font-weight: 600;
  }

  .weui-grids {
    background-color: #fff;
  }

  .weui-grids .weui-grid:before {
    border-right: none;
  }

  .weui-grids span {
    font-size: 14px;
    margin-top: 20px;
  }

  .central {
    background-color: #fff;
  }

  .central .cen-title {
    margin-bottom: 10px;
  }

  .central .title {
    width: 100%;
    height: 40px;
    border-bottom: 1px solid #e4e4e4;
    line-height: 40px;
    padding: 0 20px;
  }

  .central .flex-demo {
    text-align: center;
    padding: 10px 10px 20px 10px;
    position: relative;
  }

  .central .flex-demo .num {
    font-size: 22px;
    font-weight: bold;
    padding: 8px 10px;
  }
  .weui-grid__label .vux-badge {
    position: absolute;
    top: -6px;
  }

  /*babge style*/

  .flex-demo:before {
    position: absolute;
    content: " ";
    right: 0;
    top: 26px;
    width: 2px;
    bottom: 26px;
    border-right: 2px solid #f1f1f1;
  }

  .central .vux-flexbox {
    border-bottom: 1px solid #f1f1f1;
  }

  tabbar {
    position: fixed;
  }


</style>
