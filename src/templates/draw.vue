<template>
  <div class="draw">
    <drawAlert v-if="drawAlert" :draw="'drawAlert'">
      <div slot="winning" v-if="alertType==='winning'">
        <div class="mine">
          我的中奖记录
        </div>
        <div class="record">
          <ul>
            <li>
              <p class="name">芭比娃娃</p>
              <p class="state">已领取</p>
            </li>
            <li>
              <p class="name">芭比娃娃</p>
              <p class="state">已领取</p>
            </li>
            <li>
              <p class="name">芭比娃娃</p>
              <p class="state">已领取</p>
            </li>
            <li>
              <p class="name">芭比娃娃</p>
              <p class="state">已领取</p>
            </li>
          </ul>
        </div>
      </div>
      <div slot="LuckDraw" v-if="alertType==='LuckDraw'">
        <div class="mine">
          我的抽奖记录
        </div>
        <div class="record">
          <ul>
            <li>
              <p class="name">芭比娃娃</p>
              <p class="state">已领取</p>
            </li>
            <li>
              <p class="name">芭比娃娃</p>
              <p class="state">已领取</p>
            </li>
            <li>
              <p class="name">芭比娃娃</p>
              <p class="state">已领取</p>
            </li>
            <li>
              <p class="name">芭比娃娃</p>
              <p class="state">已领取</p>
            </li>
          </ul>
        </div>
      </div>
    </drawAlert>
    <div class="back" @click="back">
      <img src="../assets/img/map/Game_icon_fanhui.png" alt="">
    </div>
    <div class="draw-title">
      <p class="luckNum">今天还能抽奖{{luckNum}}次！</p>
      <p class="integral">每次消耗20积分</p>
    </div>
    <div class="draw-main">
      <div class="draw-core">
        <img src="../assets/img/map/BG.png" alt="" :style="`transform: rotate(${rotate}deg)`">
        <div class="wheel-pointer">
          <div class="pointGo" @click="drawBtn" :disabled="isDisable">
            <img src="../assets/img/map/GO.png" alt="">
          </div>
        </div>
        <div class="box">
          <div class="changfangx" :style="`transform: rotate(${45*item}deg)`" v-for="item in items">
            <div class="title">{{item.codeNum}}</div>
            <div class="pic">
              <!--<img :src=img alt="">-->
            </div>
          </div>
        </div>
      </div>
      <div class="award" @click="alertBox('winning')">
        <img src="../assets/img/map/获奖查询_button_n.png" alt="">
      </div>
      <div class="luckDraw" @click="alertBox('LuckDraw')">
        抽奖记录
      </div>
    </div>
    <div class="toast">
      <div>
      </div>
    </div>
  </div>
</template>
<script>
  import drawAlert from '../components/drawAlert'
  export default {
    name: 'draw',
    data () {
      return {
        rotate: 0,
        alertType: null,
        drawNum: 8,
        isDisable: true,
        luckNum: 0,
        items: [
          {
            codeNum: '10积分',
            img: '../assets/img/map/50积分.png'
          },
          {
            codeNum: '10积分',
            img: '../assets/img/map/50积分.png'
          },
          {
            codeNum: '10积分',
            img: '../assets/img/map/50积分.png'
          },
          {
            codeNum: '10积分',
            img: '../assets/img/map/50积分.png'
          },
          {
            codeNum: '10积分',
            img: '../assets/img/map/50积分.png'
          },
          {
            codeNum: '10积分',
            img: '../assets/img/map/50积分.png'
          },
          {
            codeNum: '10积分',
            img: '../assets/img/map/50积分.png'
          },
          {
            codeNum: '10积分',
            img: '../assets/img/map/50积分.png'
          }
        ],
        drawAlert: false
      }
    },
    created () {
    },
    components: {
      drawAlert
    },
    methods: {
      alertBox (type) {
        this.drawAlert = true
        this.alertType = type
      },
      draw () {
        let drawRotate = 360 / this.drawNum // 奖品度数
        let overRotate = this.drawNum * 2 * drawRotate - this.rotate
        console.log(overRotate, '2222')
        let timer = setInterval(res => {
          this.rotate += 1
          if (this.routate > overRotate) {
            clearInterval(timer)
          }
        }, 10)
        console.log(drawRotate)
      },
      drawBtn () {
        this.draw()
      },
      back () {
        this.$router.back(-1)
      }
    }
  }
</script>
<style scoped>
  .draw {
    width: 100%;
    height: 100%;
    background-image: url("../assets/img/map/game-turntable_bg.jpg");
    background-size: 100% 100%;
    position: absolute;
  }

  .draw .back {
    width: 1.2rem;
    height: 0.62rem;
    margin-top: 0.42rem;
    margin-left: 0.22rem;
  }

  .draw-title {
    text-align: center;
    color: #feffff;
    font-size: 0.2rem;
    margin-top: 21%;
  }

  .draw-title .luckNum {
    font-size: 0.34rem;
  }

  .draw-main {
    width: 6.06rem;
    height: 6.06rem;
    background: url("../assets/img/map/发光圆.png") no-repeat center top;
    background-size: 100%;
    margin: 7% auto 0;
  }

  .draw-main .draw-core {
    width: 5.38rem;
    height: 5.38rem;
    position: relative;
    left: 0.34rem;
    top: 0.34rem
  }

  .wheel-pointer {
    width: 2.4rem;
    height: 2.4rem;
    background: url("../assets/img/map/指针.png") no-repeat center top;
    background-size: 100% 100%;
    transform-origin: center 60%;
    position: absolute;
    left: 1.5rem;
    top: 1.42rem;
  }

  .pointGo {
    width: 1.42rem;
    height: 1.42rem;
    position: absolute;
    left: 20%;
    top: 20%;
  }

  .award {
    width: 2.56rem;
    height: 0.76rem;
    margin: 34% auto 0;
  }

  .luckDraw {
    font-size: 0.26rem;
    text-align: center;
    color: #fff;
    margin-top: 5%;
  }

  .box {
    margin-top: 100px;
    position: absolute;
    left: 50%;
    margin-left: -22px;
    top: -36%;
  }

  .changfangx {
    height: 100px;
    transform-origin: center bottom;
    width: 20px;
    background-color: pink;
    position: absolute;
  }
</style>
