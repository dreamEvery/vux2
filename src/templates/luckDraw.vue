<template>
  <div class="container">
    <div class="lucky-wheel">
      <div class="wheel-main">
        <div class="wheel-pointer-box">
          <div class="wheel-pointer" @click="rotate_handle()"
               :style="{transform:rotate_angle_pointer,transition:rotate_transition_pointer}">
            <div class="pointGo">
              <img src="../assets/img/map/GO.png" alt="">
            </div>
          </div>
        </div>
        <div class="wheel-bg">
          <div class="luckBg" :style="{transform:rotate_angle,transition:rotate_transition}">
            <div class="prize-list">
              <div class="prize-item" v-for="(item,index) in prize_list" :key="index">
                <div class="prize-count" v-if="item.count">
                  {{item.count}}
                </div>
                <div class="prize-pic">
                  <img :src="item.icon">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="toast" v-show="toast_control">
      <div class="toast-container">
        <img :src="toast_pictrue" class="toast-picture">
        <div class="close" @click="close_toast()"></div>
        <div class="toast-title">
          {{toast_title}}
        </div>
        <div class="toast-btn">
          <div class="toast-cancel" @click="close_toast">关闭</div>
        </div>
      </div>
    </div>
    <div class="toast-mask" v-show="toast_control"></div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        easejoy_bean: 0,  // 金豆
        lottery_ticket: 0,  // 抽奖次数
        prize_list: [
          {
            icon: require('../assets/img/map/50积分.png'), // 奖品图片
            count: 10,  // 奖品数量
            isPrize: 1  // 该奖项是否为奖品
          },
          {
            icon: require('../assets/img/map/50积分.png'),
            count: 5,
            isPrize: 1
          },
          {
            icon: require('../assets/img/map/50积分.png'),
            count: 10,
            isPrize: 1
          },
          {
            icon: require('../assets/img/map/50积分.png'),
            count: 5,
            isPrize: 1
          },
          {
            icon: require('../assets/img/map/50积分.png'),
            count: 10,
            isPrize: 1
          },
          {
            icon: require('../assets/img/map/50积分.png'),
            count: 10,
            isPrize: 1
          },
          {
            icon: require('../assets/img/map/50积分.png'),
            count: 0,
            isPrize: 0
          },
          {
            icon: require('../assets/img/map/50积分.png'),
            count: 10,
            isPrize: 1
          }
        ],  // 奖品列表
        toast_control: false,  // 抽奖结果弹出框控制器
        hasPrize: false,  // 是否中奖
        start_rotating_degree: 0,  // 初始旋转角度
        rotate_angle: 0,  // 将要旋转的角度
        start_rotating_degree_pointer: 0,  // 指针初始旋转角度
        rotate_angle_pointer: 0,  // 指针将要旋转的度数
        rotate_transition: 'transform 6s ease-in-out',  // 初始化选中的过度属性控制
        rotate_transition_pointer: 'transform 12s ease-in-out',  // 初始化指针过度属性控制
        click_flag: true,  // 是否可以旋转抽奖
        i: 0  // 测试使用
      }
    },
    created () {
      this.init_prize_list()
    },
    computed: {
      toast_title () {
        return this.hasPrize
          ? '恭喜您，获得' + this.prize_list[this.i].count + ' ' + this.prize_list[this.i].name
          : '未中奖'
      },
      toast_pictrue () {
        return this.hasPrize
          ? require('../assets/img/map/50积分.png')
          : require('../assets/img/map/50积分.png')
      }
    },
    methods: {
      // 此方法为处理奖品数据
      init_prize_list (list) {},
      rotate_handle () {
        this.rotating()
        this.i = this.i + 2
      },
      rotating (index) {
        if (!this.click_flag) return
        var type = 0 // 默认为 0  转盘转动 1 箭头和转盘都转动(暂且遗留)
        var duringTime = 5 // 默认为1s
        var random = Math.floor(Math.random() * 7)
        var resultIndex = index || random // 最终要旋转到哪一块，对应prize_list的下标
        var resultAngle = [337.5, 292.5, 247.5, 202.5, 157.5, 112.5, 67.5, 22.5] // 最终会旋转到下标的位置所需要的度数
        var randCircle = 6 // 附加多转几圈，2-3
        this.click_flag = false // 旋转结束前，不允许再次触发
        if (type === 0) {
          // 转动盘子
          var rotateAngle =
            this.start_rotating_degree +
            randCircle * 360 +
            resultAngle[resultIndex] -
            this.start_rotating_degree % 360
          this.start_rotating_degree = rotateAngle
          this.rotateAngle = 'rotate(\' + rotateAngle + \'deg)'
          // // //转动指针
          // this.rotateAngle = "rotate("+this.start_rotating_degree_pointer + 360*randCircle+"deg)";
          // this.start_rotating_degree_pointer =360*randCircle;
          var that = this
          // 旋转结束后，允许再次触发
          setTimeout(function () {
            that.click_flag = true
            that.game_over(this.i)
          }, duringTime * 1000 + 1500) // 延时，保证转盘转完
        } else {
          //
        }
      },
      game_over () {
        this.toast_control = true
        this.hasPrize = this.prize_list[this.i].isPrize
      },
      // 关闭弹窗
      close_toast () {
        this.toast_control = false
      }
    }
  }
</script>
<style scoped>
  .container {
    width: 100%;
    height: 100%;
    background-image: url("../assets/img/map/game-turntable_bg.jpg");
    background-size: 100% 100%;
    position: absolute;
  }

  .lucky-wheel {
    width: 100%;
    /*background: rgb(252, 207, 133) url("../assets/img/color_pillar.png") no-repeat*/
    /*center bottom;*/
    background-size: 100%;
    padding-top: 3.67rem;
  }

  .wheel-main {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .wheel-bg {
    width: 6.06rem;
    height: 6.06rem;
    background: url("../assets/img/map/发光圆.png") no-repeat center top;
    background-size: 100%;
    color: #fff;
    font-weight: 500;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    transition: transform 3s ease;
  }

  .luckBg {
    background-image: url("../assets/img/map/BG.png");
    background-size: 100% 100%;
    width:5.38rem;
    height: 5.38rem;
    position: relative;
    left: 0.34rem;
  }

  .wheel-pointer-box {
    position: absolute;
    top: 53%;
    left: 50%;
    z-index: 100;
    transform: translate(-50%, -60%);
  }

  .wheel-pointer {
    width: 2.6rem;
    height: 2.6rem;
    background: url("../assets/img/map/指针.png") no-repeat center top;
    background-size: 100% 100%;
    transform-origin: center 60%;
  }

  .wheel-pointer .pointGo {
    width: 1.56rem;
    height: 1.56rem;
    position: absolute;
    left: 20%;
    top: 20%;
  }

  .wheel-bg div {
    text-align: center;
  }

  .prize-list {
    width: 5.34rem;
    height: 5.34rem;
    position: absolute;
    left: -3.64rem;
    top: -2rem;
  }

  .prize-list .prize-item {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
  }

  .prize-list .prize-item:first-child {
    top: 40px;
    left: 5.73rem;
    -webkit-transform: rotate(-3deg);
    transform: rotate(-3deg);
  }

  .prize-list .prize-item:nth-child(2) {
    top: 4.5rem;
    left: 9.8rem;
    -webkit-transform: rotate(85deg);
    transform: rotate(87deg);
  }

  .prize-list .prize-item:nth-child(3) {
    top: 7.4rem;
    left: 8.75rem;
    -webkit-transform: rotate(-218deg);
    transform: rotate(135deg);
  }

  .prize-list .prize-item:nth-child(4) {
    top: 8.59rem;
    left: 5.95rem;
    -webkit-transform: rotate(179deg);
    transform: rotate(179deg)
  }

  .prize-list .prize-item:nth-child(5) {
    top: 7.4rem;
    left: 3rem;
    -webkit-transform: rotate(229deg);
    transform: rotate(229deg);
  }

  .prize-list .prize-item:nth-child(6) {
    top: 4.94rem;
    left: 2rem;
    transform: rotate(-95deg);
  }

  .prize-list .prize-item:nth-child(7) {
    top: 2rem;
    left: 3rem;
    transform: rotate(-47deg);
  }

  .prize-list .prize-item:nth-child(8) {
    top: 100px;
    left: 8.75rem;
    -webkit-transform: rotate(50deg);
    transform: rotate(50deg);
  }

  .prize-item {
    width: 0.875rem;
    height: 0;
  }

  .prize-pic img {
    width: 1rem;
    height: 0.7rem;
    margin-top: 1.5625rem;
  }

  .prize-count {
    font-size: 0.32rem;
    color: #6d121e;
  }

  /*弹框*/
  .toast-mask {
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 10000;
    width: 100%;
    height: 100%;
  }

  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 20000;
    transform: translate(-50%, -50%);
    width: 15.4375rem;
    background: #fff;
    border-radius: 0.3125rem;
    padding: 0.3125rem;
    background-color: rgb(252, 244, 224);
  }

  .toast-container {
    position: relative;
    width: 100%;
    height: 100%;
    border: 1px dotted #fccc6e;
  }

  .toast-picture {
    position: absolute;
    top: -6.5rem;
    left: -1.5rem;
    width: 18.75rem;
    height: 8.5625rem;
  }

  .toast-pictrue-change {
    position: absolute;
    top: -1.5rem;
    left: -1.375rem;
    width: 17.5rem;
    height: 3.125rem;
  }

  .toast-title {
    padding: 2.8125rem 0;
    font-size: 18px;
    color: #fc7939;
    text-align: center;
  }

  .toast-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.9375rem;
  }

  .toast-btn div {
    background-image: -moz-linear-gradient(
      -18deg,
      rgb(242, 148, 85) 0%,
      rgb(252, 124, 88) 51%,
      rgb(252, 124, 88) 99%
    );

    background-image: -ms-linear-gradient(
      -18deg,
      rgb(242, 148, 85) 0%,
      rgb(252, 124, 88) 51%,
      rgb(252, 124, 88) 99%
    );
    background-image: -webkit-linear-gradient(
      -18deg,
      rgb(242, 148, 85) 0%,
      rgb(252, 124, 88) 51%,
      rgb(252, 124, 88) 99%
    );
    box-shadow: 0px 4px 0px 0px rgba(174, 34, 5, 0.7);
    width: 4.6875rem;
    height: 1.875rem;
    border-radius: 1.875rem;
    text-align: center;
    line-height: 1.875rem;
    color: #fff;
  }

  .close {
    position: absolute;
    top: -0.9375rem;
    right: -0.9375rem;
    width: 2rem;
    height: 2rem;
    background-size: 100%;
  }
</style>
