<template>
  <div class="alertSuccess">
    <div class="masking" @click="close"></div>
    <div class="successAlert">
      <div class="alert-con">
        <div class="exchangeWin">
          <img src="../assets/img/alert/兑换成功.png" alt="">
        </div>
        <div class="cube">
          <img src="../assets/img/alert/魔方.png" alt="">
          <div class="animation">
            <p class="long">
              <img src="../assets/img/alert/长光束.png" alt="">
            </p>
            <p class="short">
              <img src="../assets/img/alert/短光束.png" alt="">
            </p>
            <i class="fristStar bigStar">
              <img src="../assets/img/alert/形状-5-拷贝-2.png" alt="">
            </i>
            <i class="secondStar smallStar">
              <img src="../assets/img/alert/形状-5-拷贝-6.png" alt="">
            </i>
            <i class="thridStar bigStar">
              <img src="../assets/img/alert/形状-5-拷贝-2.png" alt="">
            </i>
            <i class="fourthStar smallStar">
              <img src="../assets/img/alert/形状-5-拷贝-6.png" alt="">
            </i>
            <i class="littleSmall fifthStar">
              <img src="../assets/img/alert/形状-5-拷贝-10.png" alt="">
            </i>
            <i class="sixthStar bigStar">
              <img src="../assets/img/alert/形状-5-拷贝-2.png" alt="">
            </i>
            <i class="seventhStar smallStar">
              <img src="../assets/img/alert/形状-5-拷贝-6.png" alt="">
            </i>
            <i class="littleSmall eighthStar">
              <img src="../assets/img/alert/形状-5-拷贝-10.png" alt="">
            </i>
            <i class="ninthStar smallStar">
              <img src="../assets/img/alert/形状-5-拷贝-6.png" alt="">
            </i>
            <i class="tenStar bigStar">
              <img src="../assets/img/alert/形状-5-拷贝-2.png" alt="">
            </i>
            <i class="elevenStar bigStar">
              <img src="../assets/img/alert/形状-5-拷贝-2.png" alt="">
            </i>\
            <i class="littleSmall twelveStar">
              <img src="../assets/img/alert/形状-5-拷贝-10.png" alt="">
            </i>
            <i class="thirteenStar smallStar">
              <img src="../assets/img/alert/形状-5-拷贝-6.png" alt="">
            </i>
          </div>
        </div>
        <p class="title">积分-{{integral}}</p>
        <p class="title">兑换成功，请到兑换机领取</p>
        <div class="ok" @click="okBtn()">
          <img src="../assets/img/alert/well_button_n.png" alt="" v-if="ok">
          <img src="../assets/img/alert/well_button_pre.png" alt="" v-if="!ok">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'alertSuccess',
    props: ['showExchange', 'integral'],
    // 子组件接收到父组件传过来的 showName
    data () {
      return {
        ok: true
      }
    },
    methods: {
      close () {
        // 点击关闭按钮 this.$parent 获取到父组件
        this.$parent.exchangeWin = false
      },
      okBtn: function () {
        this.ok = false
        this.$parent.exchangeWin = false
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .alert-con{width: 100%;height: 5rem;margin-top: -1rem}
  .alert-con .exchangeWin{width: 7rem;height: 5rem;margin: 0 auto;}
  .masking {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    transition: all .3s ease-in-out;
    z-index: 999;
  }

  .successAlert {
    width: 100%;
    height: auto;
    position: fixed;
    z-index: 1000;
  }

  .successAlert .alert-top {
    width: 80%;
    margin: 0 auto;
  }

  .cube {
    width: 2.93rem;
    height: 2.82rem;
    margin: 0.3rem auto 1.4rem;
    position: relative;
  }

  .cube img {
    width: 100%;
    height: 100%;
    transition: All 0.4s ease-in-out;
    -webkit-transition: All 0.4s ease-in-out;
    -moz-transition: All 0.4s ease-in-out;
    -o-transition: All 0.4s ease-in-out;
    transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
  }
  .alert-con .ok{width: 2.6rem;height: 1rem;margin: 0 auto;display: block;}
  .alert-con .title{text-align: center;font-size: 0.32rem;color: #fff;margin-bottom: 0.3rem}
  /*动画*/
  .animation {
    position: absolute;
    z-index: -1;
    top: -1rem;
    left: -0.5rem;
  }

  .animation .long {
    width: 5.4rem;
    height: 5.4rem;
    position: absolute;
    top: -0.4rem;
    left: -0.5rem;
    animation: longLight 5s linear infinite;
  }
  @keyframes longLight{from{transform: rotate(0deg)}
    to{transform: rotate(359deg)}
  }

  .animation .short {
    width: 4rem;
    height: 4.6rem;
    position: absolute;
    top: 0;
    left: 0;
    animation: shortLight 4s linear infinite;
  }
  @keyframes shortLight{from{transform: rotate(359deg)}
    to{transform: rotate(0deg)}
  }

  .animation i {
    display: block;
    position: absolute;
  }

  .animation .bigStar {
    width: 0.7rem;
    height: 0.7rem;
    animation: starOne 2s linear infinite;
  }

  .animation .smallStar {
    width: 0.4rem;
    height: 0.4rem;
    position: absolute;
    animation: starTwo 1s linear 4s infinite;
  }

  .animation .littleSmall {
    width: 0.4rem;
    height: 0.4rem;
    animation: starThree 1.5s linear 4s infinite;
  }
  @keyframes starThree {
    0% {
      transform: scale(0.3);
    }
    25% {
      transform: scale(0.6);
    }
    50% {
      transform: scale(0.8);
    }
    75% {
      transform: scale(0.6);
    }
    100% {
      transform: scale(0.5);
    }
  }

  .animation .fristStar {
    top: 0.3rem;
    left: 2rem;
  }
  @keyframes starOne {
    0% {
      transform: scale(0.8);
    }
    25% {
      transform: scale(0.3);
    }
    50% {
      transform: scale(0.6);
    }
    75% {
      transform: scale(0.9);
    }
    100% {
      transform: scale(1);
    }
  }

  .animation .secondStar {
    left: 1.3rem;
    top: 0.5rem;
  }

  @keyframes starTwo {
    0% {
      transform: scale(1);
    }
    25% {
      transform: scale(0.8);
    }
    50% {
      transform: scale(0.4);
    }
    75% {
      transform: scale(0.7);
    }
    100% {
      transform: scale(0.8);
    }
  }

  .animation .thridStar {
    top: 0.6rem;
    left: 0.2rem;
  }

  .animation .fourthStar {
    top: 1.6rem;
    left: -0.1rem;
  }

  .animation .fifthStar {
    top: 2.1rem;
    left: 0.3rem
  }

  .animation .sixthStar {
    top: 2.3rem;
    left: -0.3rem
  }

  .animation .seventhStar {
    top: 3.7rem;
    left: 0.3rem;
  }

  .animation .eighthStar {
    top: 3.5rem;
    left: 1.2rem;
  }

  .animation .ninthStar {
    top: 4rem;
    left: 1.4rem;
  }

  .animation .tenStar {
    top: 3.5rem;
    left: 2.4rem;
    width: 0.5rem;
    height: 0.5rem;
  }

  .animation .elevenStar {
    left: 3.34rem;
    top: 1.8rem;
  }

  .animation .twelveStar {
    left: 3.4rem;
    top: 1rem;
  }

  .animation .thirteenStar {
    left: 3.4rem;
    top: 14em;
  }

</style>
