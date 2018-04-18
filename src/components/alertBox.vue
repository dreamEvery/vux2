<template>
  <div class="alertbox">
    <div class="masking" @click="close"></div>
    <div class="alert">
      <div class="alert-logo">
        <img src="../assets/img/alert/LOGO.png" alt="">
      </div>
      <div class="alert-main">
        <slot name="content"></slot>
        <!--<slot name="A">-->
          <!--<div class="alert1">-->
            <!--<div class="alert-top">我的积分</div>-->
            <!--<ul>-->
              <!--<li>-->
                <!--当前积分： 254-->
              <!--</li>-->
              <!--<li>-->
                <!--消费积分：241-->
              <!--</li>-->
              <!--<li>-->
                <!--总积分： 377-->
              <!--</li>-->
            <!--</ul>-->
          <!--</div>-->
        <!--</slot>-->
        <!--<slot name="B">-->
          <!--<div class="alert2">-->
            <!--<div class="alert-top">我的等级</div>-->
            <!--<ul>-->
              <!--<li>-->
                <!--等级1：总积分 1-10-->
              <!--</li>-->
              <!--<li>-->
                <!--等级1：总积分 20-40-->
              <!--</li>-->
              <!--<li>-->
                <!--等级1：总积分 1-20-->
              <!--</li>-->
            <!--</ul>-->
          <!--</div>-->
        <!--</slot>-->
        <!--<slot name="c">-->
          <!--<div class="alert3">-->
            <!--<div class="alert-top">隐身斗篷</div>-->
            <!--<div class="alert-gift">-->
              <!--<div class="gift">-->
                <!--<img src="../assets/img/alert/魔方.png" alt="">-->
              <!--</div>-->
              <!--<div class="gift-introduce">-->
                <!--<p>-->
                  <!--使用后可以在一天时间内隐藏，老师和同学都不会发现你的存在。-->
                  <!--这意味着你可以不用交作业了哦~~-->
                <!--</p>-->
                <!--<a>-->
                  <!--我要打印-->
                <!--</a>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</slot>-->
      </div>
      <span class="close-btn" @click="close">
        <img src="../assets/img/alert/close.png" alt="">
      </span>

    </div>
  </div>
</template>
<script>
  export default {
    name: 'alertbox',
    props: ['showName'],
    // 子组件接收到父组件传过来的 showName
    data () {
      return {}
    },
    methods: {
      close () {
        // 点击关闭按钮 this.$parent 获取到父组件
        // this.$parent[this.showName] 获取父组件中的 isAlertBox
        this.$parent[this.showName] = false
      }
    },
    watch: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .masking {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 100;
    transition: all .3s ease-in-out;
  }

  .alert {
    text-align: center;
    color: #652411;
    width: 100%;
    background-image: url("../assets/img/alert/a market_BG.png");
    background-size: 100% 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    z-index: 999;
    padding: 1.4rem 0.65rem 0.8rem 0.8rem;
  }

  .alert .alert-main {
    background-color: #C19E7A;
    border: 1px dashed #6b3a0f;
    border-radius: 10px;
    padding-bottom: 0.4rem;
    position: relative;
  }

  .alert .alert-main .alert-top {
    font-size: 0.44rem;
    color: #fff;
    font-weight: bold;
    text-align: center;
    width: 60%;
    line-height: 0.8rem;
    background-color: #B27A4B;
    border-radius: 30px;
    margin: 0 auto;
    margin-top: 0.4rem;
    margin-bottom: 0.1rem;
  }

  .alert .alert-main ul li {

  }

  .alert .close-btn {
    position: absolute;
    top: 0.6rem;
    right: 0.3rem;
    width: 0.8rem;
    height: 0.8rem;
  }

  .alert .close-btn img {
    width: 100%;
    height: 100%;
  }

  .alert-logo {
    position: absolute;
    top: -38px;
    right: 36%;
    z-index: 999;
    width: 2.4rem;
    height: 2.4rem;
  }

  .alert-logo img {
    width: 100%;
    height: 100%;
  }

  .alert-gift {
    display: inline-block;
    overflow: hidden;
    padding: 0.4rem 0.2rem;
  }

  .alert-gift .gift {
    width: 2rem;
    height: 2rem;
    float: left;
  }

  .alert-gift .gift img {
    width: 100%;
    height: 100%;
  }

  .alert-gift .gift-introduce {
    font-size: 0.30rem;
    color: #6b3a0f;
    font-weight: bold;
    text-align: justify;

  }

  .alert-gift .gift-introduce a {
    text-align: right;
    color: #F5DF4B;
    margin-top: 0.4rem;
    display: block;
    float: right;
  }
</style>
