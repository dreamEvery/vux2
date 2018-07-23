<template>
  <div class="draw">
    <!--弹框-->
    <drawAlert v-if="drawAlert" :draw="'drawAlert'">
      <div slot="winning" v-if="alertType==='winning'">
        <div class="mine">
          我的中奖记录
        </div>
        <div class="record">
          <ul>
            <li v-for="item in winingList">
              <p class="name">{{item.note}}</p>
              <p class="state">
                {{item.inputtime}}
              </p>
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
      <div class="wheel-pointer">
        <div class="pointGo" @click="rotate_handle()" :style="{transform:rotate_angle_pointer,transition:rotate_transition_pointer}">
          <img src="../assets/img/map/GO.png" alt="">
        </div>
      </div>
      <div class="luminous" v-if="drawDone">
        <img src="../assets/img/map/外发光.png" alt="">
      </div>
      <div class="draw-core" :style="{transform:rotate_angle,transition:rotate_transition}">
        <div class="prize-list">
          <div class="prize-item" v-for="(item,index) in prizeList" :style="`transform: rotate(${45*index}deg)`">
            <div class="prize-count">
              {{item.prize_name }}
            </div>
            <div class="prize-pic">
              <img :src="item.icon">
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
    <!--中奖弹框-->
    <div class="toast" v-if="toast">
       <div class="toastContent">
          <div class="toastMain">
            <div class="img">
              <img :src='alertMain.picsummary' alt="">
            </div>
            <div class="luckStar">
              <p class="luckTitle">
                幸运指数：
              </p>
              <span>
               <img src="../assets/img/alert/stars_pre.png" alt="">
              </span>
              <span>
               <img src="../assets/img/alert/stars_pre.png" alt="">
              </span>
              <span>
               <img src="../assets/img/alert/stars_pre.png" alt="">
              </span>
              <span>
               <img src="../assets/img/alert/stars_pre.png" alt="">
              </span>
              <span>
                <img src="../assets/img/alert/stars_pre.png" alt="">
              </span>
            </div>
            <div class="again">
              <img src="../assets/img/alert/在抽一次_button_n.png" alt="" @click="againBtn">
              <!--<img src="../assets/img/alert/在抽一次_button_pre.png" alt="">-->
            </div>
          </div>
       </div>
      <div class="masking" @click="close"></div>
    </div>
  </div>
</template>
<script>
  import drawAlert from '../components/drawAlert'
  import { Base64 } from 'js-base64'
  export default {
    name: 'draw',
    data () {
      return {
        index: [1, 2, 3, 4, 5, 6, 7, 8],
        toast: false,
        drawDone: false, // 外发光
        drawAlert: false, // 弹框
        winingList: [], // 中奖纪录
        luckList: [], // 抽奖纪录
        storageMessage: '', // 本地数据
        luckNum: '4',  // 抽奖次数
        prizeList: [], // 奖品列表
        hasPrize: false, // 是否中奖
        start_rotating_degree: 0, // 初始旋转角度
        rotate_angle: 0, // 旋转角度
        clickFlag: true, // 是否可以旋转抽奖
        start_rotating_degree_pointer: 0, // 指针初始旋转角度
        rotate_angle_pointer: 0, // 指针将要旋转的度数
        rotate_transition: 'transform 6s ease-in-out', // 初始化选中的过度属性控制
        rotate_transition_pointer: 'transform 12s ease-in-out', // 初始化指针过度属性控制
        i: 0,  // 测试使用
        alertMain: {} // 随机数据
      }
    },
    created () {
      this.storageMessage = JSON.parse(sessionStorage.getItem('info'))
      this.drawGift()
    },
    components: {
      drawAlert
    },
    methods: {
      alertBox (type) {
        this.drawAlert = true
        this.alertType = type
        if (type === 'winning') {
          this.winningList()
        } else {
          this.luckDraw()
        }
      },
      back () {
        this.$router.back(-1)
      },
      // 抽奖礼品接口
      drawGift () {
        this.$http.get(this.HOST + '/luckyDrawDetailManage_listLuckyDrawDetail.do?method=getLuckyDrawDetailList', {
          params: {sid: this.storageMessage.sid, userid: this.storageMessage.userid, studentid: this.storageMessage.studentid}
        }).then(res => {
          // 成功的状态
          let successCode = 0
          // 失败的状态
          let errorCode = 1
          let body = res.body
          if (body.code === successCode) {
            // 处理数据
            this.prizeList = body.data
            for (let i = 0; i < this.prizeList.length; i++) {
              this.prizeList[i].prize_name = Base64.decode(this.prizeList[i].prize_name)
              console.log(this.prizeList[i].prize_name)
            }
          } else if (body.code === errorCode) {
            // 处理失败
            console.log('错误提示：' + body.msg)
          }
        }, error => {
          // error callback
          console.log(error)
        })
      },
      // 中奖纪录接口
      winningList () {
        this.$http.get(this.HOST + '/winningRecordManage_listWinningRecord.do?method=getWinningRecordList', {
          params: {sid: this.storageMessage.sid, userid: this.storageMessage.userid, studentid: this.storageMessage.studentid}
        }).then(res => {
          // 成功的状态
          let successCode = 0
          // 失败的状态
          let errorCode = 1
          let body = res.body
          if (body.code === successCode) {
            // 处理数据
            this.winingList = body.data
            for (let i = 0; i < this.winingList.length; i++) {
              this.winingList[i].note = Base64.decode(this.winingList[i].note)
            }
          } else if (body.code === errorCode) {
            // 处理失败
            console.log('错误提示：' + body.msg)
          }
        }, error => {
          // error callback
          console.log(error)
        })
      },
      // 抽奖纪录
      luckDraw () {
        this.$http.get(this.HOST + '/luckyDrawDetailManage_listLuckyDrawDetail.do?method=getLuckyDrawDetailList', {
          params: {sid: this.storageMessage.sid, userid: this.storageMessage.userid, studentid: this.storageMessage.studentid}
        }).then(res => {
          // 成功的状态
          let successCode = 0
          // 失败的状态
          let errorCode = 1
          let body = res.body
          if (body.code === successCode) {
            // 处理数据
            this.luckList = body.data
//            this.rawDataTabs.map((value) => {
//              value.name = Base64.decode(value.name)
//            })
          } else if (body.code === errorCode) {
            // 处理失败
            console.log('错误提示：' + body.msg)
          }
        }, error => {
          // error callback
          console.log(error)
        })
      },
      // 添加中奖纪录
      alert () {
        this.$http.post(this.HOST + '/winningRecordManage_listWinningRecord.do?method=addWinningRecord',
          {userid: this.storageMessage.userid, sid: this.storageMessage.sid, luckydrawdetailid: this.alertMain.id,studentid: this.storageMessage.studentid}
        ).then(response => {
          // get body data
        }, response => {
          // error callback
        })
      },
      // 抽奖
      rotate_handle () {
        this.rotating()
        this.i = this.i + 2
      },
      rotating (index) {
        if (!this.clickFlag) return
        let type = 0 // 转盘转动为1
        let during_time = 5 // 默认为5s
        let random = Math.floor(Math.random() * 7)  // Math.random * 7 生成0~7之间的随机数，取整
        let result_index = index || random  // 最终要旋转到哪一块，对应prize_list礼品的下标
        let result_angle = [360, 315, 270, 225, 180, 135, 90, 45]  // 最终会旋转到下标的位置所需要的度数
        let rand_circle = 6   // 圈数
        this.clickFlag = false  // 旋转结束前不允许触发
        if (type === 0) {
          let rotate_angle = this.start_rotating_degree + rand_circle * 360 + result_angle[result_index] - this.start_rotating_degree % 360
          this.alertMain = this.prizeList[result_index]
          console.log(this.alertMain)
          this.alert()  // 获取到的时候添加中奖纪录
          this.start_rotating_degree = rotate_angle
          this.rotate_angle = 'rotate(' + rotate_angle + 'deg)'
          let that = this
          //  旋转结束，再次触发
          setTimeout(function () {
            that.drawDone = true
            that.clickFlag = true
            setTimeout(() => {
              that.toast = true
            }, 1000)
//
          }, during_time * 1000 + 1500)
        }
      },
      // 关闭中奖弹框
      close () {
        this.drawDone = false
        this.toast = false
      },
      // 再次抽奖
      againBtn () {
        this.toast = false
        this.drawDone = false
      }
    },
    computed: {
    }
  }
</script>
<style scoped>
   /*外发光*/
  .luminous{
    width: 2.9rem;
    height: 2.7rem;
    position: absolute;
    left: 2.3rem;
    z-index: 999;
  }
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
    top: 0.34rem;
    background-image: url("../assets/img/map/BG.png");
    background-size: 100% 100%;
  }

  .wheel-pointer {
    width: 2.4rem;
    height: 2.4rem;
    background: url("../assets/img/map/指针.png") no-repeat center top;
    background-size: 100% 100%;
    transform-origin: center 60%;
    position: absolute;
    left: 2.5rem;
    top: 5.6rem;
    z-index: 99;
  }

  .pointGo {
    width: 1.42rem;
    height: 1.42rem;
    position: absolute;
    left: 20%;
    top: 20%;
  }
  .prize-list{
    position: relative;
    width: 100%;
    height: 100%;
  }
   .prize-list .prize-item {
     width: 1rem;
     height: 2.5rem;
     position: absolute;
     bottom: 50%;
     margin-top: -0.71rem;
     left: 50%;
     margin-left: -0.5rem;
     z-index: 2;
     transform-origin: bottom center;
   }

   .prize-list .prize-item .prize-pic{margin-top: 0.3rem}
   .prize-pic{width: 1rem; height: 0.6rem}
  .prize-count{color: #502c0f;width: 1.5rem;text-align: left;}
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
  .state{width: 2rem;height: 0.48rem;font-size: 0.28rem}
  .state img {margin-top: 0.08rem;}
  /*中奖弹框*/
  .masking{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 999;
    transition: all .3s ease-in-out;
  }
  .toastMain{
    background-image: url('../assets/img/map/toast.png');
    width: 89%;
    height: 68%;
    background-size: 100% 100%;
    position: absolute;
    top: 42%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    z-index: 2000;
  }
  .toastMain .img{
    width: 2.4rem;
    height: 1.6rem;
    position: absolute;
    left: 2.2rem;
    top: 5.1rem;
  }

   /*幸运星星*/
   .luckStar {
     position: absolute;
     left: 1.5rem;
     top: 7rem;
   }
   .luckStar .luckTitle{
     font-size: 0.32rem;
     font-weight: bold;
     color: #6b3a0f;
     display: inline;
   }

   .luckStar span {
     display: inline-block;
     width: 0.3rem;
     height: 0.3rem;
     vertical-align: middle;
   }
   .again{
     width: 2.1rem;
     height: 0.8rem;
     position: absolute;
     top: 7.8rem;
     left: 2.3rem;
   }
</style>
