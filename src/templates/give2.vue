<template>
  <div class="give">
    <alert v-if='isSuccess' :show="'isSuccess'">
    </alert>
    <div class="give-parent">
      <div class="public-top">
        <div class="public-back" @click="goIndex">
          <img src="../assets/img/return.png"/>
        </div>
      </div>
      <div class="public-bg">
        <div class="give-con" v-if="this.routerParams === null">
          <div class="give-list">
            <div class="give-gift">
              <span>赠送礼品</span>
              <router-link to='/give/giveSel'>
                <input type="text" readonly placeholder='请选择礼品' v-model="gift_selOn"/>
                <i class="i1">
                  <img src="../assets/img/gift_icon_right.png"/>
                </i>
              </router-link>
            </div>
          </div>
          <div class="give-list">
            <div class="give-gift">
              <span>赠送积分</span>
              <input class="jifen-inp" type="text" placeholder="请输入积分" v-model="jifen_inp"/>
              <!--<em class="jifen-em" v-show="jifen_type">积分</em>-->
              <i class="i1">
                <img src="../assets/img/gift_icon_right.png"/>
              </i>
            </div>
          </div>
        </div>
        <div class="rout-con" v-if="this.routerParams !== null">
          <div class="routGive">
            <div class="routGivepic">
              <img :src=routerParams.picsummary alt="">
            </div>
            <div class="routGivename">
              <p class="giftName">{{routerParams.mallitemsname}}</p>
              <div class="goldCoin">
                <p class="iconCoin">
                  <img src="../assets/img/map/exchange_icon_-Tiger.png" alt="">
                </p>
                <p class="coinNum">{{routerParams.integral}}</p>
              </div>
            </div>
            <div class="rout-integral">
              <span class="nowIntegral">我拥有的积分：{{this.nowNum}}</span>
              <span class="Deduct">扣除积分：{{routerParams.integral}}</span>
            </div>
          </div>
        </div>
        <div class="give-toBox">
          <span>赠送给:</span>
          <div>
            <ul class="toBox-list">
              <li v-for="(zengsongList,index) in zengsongList" :key="zengsongList.id">
                <img :src="zengsongList.img"/>
                <p class="close-img" @click="closes(zengsongList,index)">
                  <img src="../assets/img/close.png"/>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="public-bg">
        <ul class="select-box">
          <li>
            <span>{{school_on}}</span>
            <p @click="select(1)"><img src="../assets/img/gift_icon_lower.png"/></p>
            <ul :class="{'dropdown-list_active':activeType==1}" class="dropdown-list">
              <li @click="schoolOn(school,index)" v-for="(school,index) in schoolList" :key="school.id">
                {{school.name}}
              </li>
            </ul>
          </li>
          <li>
            <span>{{grade_on}}</span>
            <p @click="select(2)"><img src="../assets/img/gift_icon_lower.png"/></p>
            <ul :class="{'dropdown-list_active':activeType==2}" class="dropdown-list">
              <li @click="gradeOn(grade, grade.id)" v-for="(grade,index) in gradeList" :key="grade.id">
                {{grade.name}}
              </li>
            </ul>
          </li>
          <li>
            <span>{{class_on}}</span>
            <p @click="select(3)"><img src="../assets/img/gift_icon_lower.png"/></p>
            <ul :class="{'dropdown-list_active':activeType==3}" class="dropdown-list">
              <li @click="classOn(classList)" v-for="(classList,index) in classList" :key="classList.id">
                {{classList.name}}
              </li>
            </ul>
          </li>
        </ul>
        <ul class="img-list">
          <li v-for="(i,index) in classmateList">
            <img :src=i.picsummary  @click='zengsong(i,index)' :key="i.id"/>
            <p>{{i.studentname}}</p>
          </li>
        </ul>
      </div>
      <div class="public-bg">
        <div class="lately-box">
          <h3>最近赠送人：</h3>
          <ul class="lately-list">
            <li v-for="peopleList in giftPeople">
            </li>
          </ul>
        </div>
        <div class="niming-box">
          <span>匿名模式：</span>
          <div>
            <img :src="swtich" @click='nimingToggle()'/>
            <span @click='nimingToggle()'>{{niming_text}}</span>
          </div>
        </div>
      </div>
      <div class="btn-box">
        <div class="btn-ok" @click="show()">
          <img src="../assets/img/give-button.png" alt=""/>
        </div>
        <div class="btn-no" @click="goIndex()">
          <img src="../assets/img/integral_icon_Think.png" alt=""/>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
  import Alert from '../components/alertSuccess'
  import { Base64 } from 'js-base64'

  export default {
    name: 'give',
    components: {
      Alert
    },
    data () {
      return {
        jifen_type: false,
        giftPeople: [],
        jifen_inp: ' ',
        nowNum: {},
        isSuccess: false,
        routerParams: null,
        items: [{
          text: '赠送礼品',
          choose: '选择礼品'
        },
          {
            text: '赠送积分',
            choose: ' 输入积分'
          }
          // 失败的状态
        ],
        /* 选择礼品 */
        gift_selOn: ' ',
        /* "赠送给"数组 */
        zengsongList: [],
        schoolList: [],
        gradeList: [],
        classList: [],
        classmateList: [],
        school_on: '',
        grade_on: '',
        class_on: '',
        activeType: '',
        /* 匿名 */
        niming_text: '开启',
        swtich: true,
        on: '/src/assets/img/integral_icon_Selected.png',
        off: '/src/assets/img/integral_icon_open.png'

      }
    },
    mounted () {
    },
    created: function () {
      let _this = this
      if (this.swtich === true) {
        this.swtich = this.on
      }
      /* 选择赠送 */
      this.$root.eventHub.$on('zidingyi', function (d) {
        _this.gift_selOn = d
        _this.$vux.toast.show({
          type: 'text',
          text: 'yes',
          position: 'bottom'
        })
      })
      if (this.$route.query.transmission) {
        // 路由传递的参数
        this.routerParams = this.$route.query.transmission
        console.log(this.routerParams, '4567890')
        // 存储总积分
        let stutendMess = JSON.parse(sessionStorage.getItem('stuMessage'))
        this.nowNum = stutendMess.totolintegral
        console.log(this.nowNum, 'pppp')
      }
      this.school()
      let storageMessage = JSON.parse(sessionStorage.getItem('info'))
      this.$http.get(this.HOST + '/vendingMachineInventoryManage_listVendingMachineInventory.do?method=getStudentList', {
        params: storageMessage
      }).then(res => {
        // 成功的状态
        let successCode = 0
        let errorCode = 1
        let body = res.body
        // 先判断状态
        if (body.code === successCode) {
          // 处理数据
          this.classmateList = body.data
        } else if (body.code === errorCode) {
          // 处理失败
          console.log('错误提示：' + body.msg)
        }
      }, error => {
        // error callback
        console.log(error)
      })
      // 最新赠送人
      this.$http.get(this.HOST + '/exchangeRecordManage_listExchangeRecord.do?method=getGiveStudentList', {
        params: storageMessage
      }).then(res => {
        // 成功的状态
        let successCode = '0'
        let errorCode = '1'
        let body = res.body
        // 先判断状态
        if (body.code === successCode) {
          // 处理数据
          this.giftPeople = body.data
        } else if (body.code === errorCode) {
          // 处理失败
          console.log('错误提示：' + body.msg)
        }
      }, error => {
        // error callback
        console.log(error)
      })
    },
    methods: {
      // 学校接口
      school () {
        console.log('获取学校')
        let storageMessage = JSON.parse(sessionStorage.getItem('info'))
        this.$http.get(this.HOST + '/exchangeRecordManage_listExchangeRecord.do?method=getAllSchoolList', {
          params: storageMessage
        }).then(res => {
          // 成功的状态
          let successCode = '0'
          let errorCode = '1'
          let body = res.body
          // 先判断状态
          if (body.code === successCode) {
            // 处理数据
            this.schoolList = body.data
            for (let i = 0; i < this.schoolList.length; i++) {
              this.schoolList[i].name = Base64.decode(this.schoolList[i].name)
              this.school_on = this.schoolList[0].name
            }
            this.schoolOn({name: '华衣教育测试', id: 1}, 1)
            this.activeType = !this.activeType
          } else if (body.code === errorCode) {
            // 处理失败
            console.log('错误提示：' + body.msg)
          }
        }, error => {
          // error callback
          console.log(error)
        })
      },
      goIndex: function () {
        this.$router.push({
          path: '/home/index'
        })
      },
      change: function (index) {
        this.changeRed = index
      },
      show () {
        this.give()
      },
      touch () {

      },
      /* 输入积分 */
      jifens () {
        this.jifen_type = true
        // this.jifen_inp+='积分'
        this.jifen_inp.join('积分')
      },
      select (i) {
        this.activeType = i
        console.log(this.activeType)
      },
      /* 选择学校 */
      schoolOn (school, index) {
        console.log(school, index)
        this.school_on = school.name
        this.activeType = !this.activeType
        let storageMessage = JSON.parse(sessionStorage.getItem('info'))
        storageMessage.sid = index
        this.$http.get(this.HOST + '/mallItemsManage_listMallItemsInfo.do?method=getAllGrade', {
          params: storageMessage
        }).then(res => {
          // 成功的状态
          let successCode = '0'
          let errorCode = '1'
          let body = res.body
          // 先判断状态
          if (body.code === successCode) {
            // 处理数据
            this.gradeList = body.data
            for (let i = 0; i < this.gradeList.length; i++) {
              this.gradeList[i].name = Base64.decode(this.gradeList[i].name)
              this.grade_on = this.gradeList[0].name
            }
            let storageMessage = JSON.parse(sessionStorage.getItem('info'))
            storageMessage.gradeId = this.gradeList[0].id
            this.$http.get(this.HOST + '/exchangeRecordManage_listExchangeRecord.do?method=getAllClassTableList', {
              params: storageMessage
            }).then(res => {
              // 成功的状态
              let successCode = '0'
              let errorCode = '1'
              let body = res.body
              // 先判断状态
              if (body.code === successCode) {
                // 处理数据
                this.classList = body.data
                for (let i = 0; i < this.classList.length; i++) {
                  this.classList[i].name = Base64.decode(this.classList[i].name)
                  this.class_on = this.classList[0].name
                }
              } else if (body.code === errorCode) {
                // 处理失败
                console.log('错误提示：' + body.msg)
              }
            }, error => {
              // error callback
              console.log(error)
            })
          } else if (body.code === errorCode) {
            // 处理失败
            console.log('错误提示：' + body.msg)
          }
        }, error => {
          // error callback
          console.log(error)
        })
      },
      /* 选择年级 */
      gradeOn (grade, id) {
        this.grade_on = grade.name
        this.activeType = !this.activeType
        let storageMessage = JSON.parse(sessionStorage.getItem('info'))
        storageMessage.gradeId = id
        this.$http.get(this.HOST + '/exchangeRecordManage_listExchangeRecord.do?method=getAllClassTableList', {
          params: storageMessage
        }).then(res => {
          // 成功的状态
          let successCode = '0'
          let errorCode = '1'
          let body = res.body
          // 先判断状态
          if (body.code === successCode) {
            // 处理数据
            this.classList = body.data
            for (let i = 0; i < this.classList.length; i++) {
              this.classList[i].name = Base64.decode(this.classList[i].name)
              this.class_on = this.classList[0].name
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
      /* 选择班级 */
      classOn (classList) {
        this.class_on = classList.name
        this.activeType = !this.activeType
      },
      /* 赠送 */
      zengsong (i, index) {
        // this.classmateList.splice(index, 1);
        if (this.zengsongList.length < 3) {
          if (this.zengsongList.indexOf(i) === -1) {
            this.zengsongList.push(i)
          }
        } else {
          this.$vux.toast.show({
            type: 'text',
            text: '最多赠送3位',
            position: 'bottom'
          })
        }
      },
      /* 删除赠送 */
      closes (zengsongList, index) {
        this.zengsongList.splice(index, 1)
        // this.classmateList.push(zengsongList);
      },
      /* 匿名模式切换 */
      nimingToggle () {
        if (this.niming_text === '开启') {
          this.niming_text = ''
          this.swtich = this.off
        } else {
          this.niming_text = '开启'
          this.swtich = this.on
        }
      },
      // 调用赠送接口
      give () {
        this.$http.post('/api/exchangeRecordManage_addExchangeRecord.do?method=giveGift',
          {num: this.phoneNum}
        ).then(res => {
          // get body data
          // this.isSuccess = true
        }, res => {
          // error callback
        })
      }
    },
    beforeDestroy () {
      this.$root.eventHub.$off('zidingyi')
    }
  }
</script>

<style scoped>
  .give{
    background: #FFFBE8;
  }
  .public-bg {
    background: #F1E3BB;
    width: 92%;
    margin: 0 auto 0.2rem;
    border-radius: 0.2rem;
  }

  .public-top {
    padding: 0.2rem 0 0 0;
    background: #FFFBE8;
  }

  .public-top .public-back {
    width: 1.64rem;
    height: 0.84rem;
    border-radius: initial;
    border: none;
  }

  .public-top .public-back > img {
    width: 100%;
    height: 100%;
  }

  .give-con {
    padding: 0;
  }

  .give-list .give-gift {
    color: #4e4e4e;
    margin-right: 0.2rem;
  }

  .give-list {
    line-height: 1rem;
    height: 1rem;
    font-size: 0.24rem;
    position: relative;
    border-bottom: 1px solid #CCB185;
    padding: 0 0.3rem;
  }

  .give-gift input {
    width: 70%;
    height: 1rem;
    background: none;
    float: right;
    text-align: right;
    margin-right: 0.2rem;
    color: #5F5145;
    font-weight: 600;
  }

  .jifen-em {
    font-style: normal;
    color: #5F5145;
    font-weight: 600;
    position: absolute;
    right: 0.7rem;
    top: 50%;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    transform: translateY(-50%);
  }

  .give-list .choose-gift {
    color: #5F5145;
  }

  .give-gift span, .give-toBox > span {
    color: #5F5145;
    font-weight: 600;
    font-size: 0.26rem;
    margin-right: 0.24rem;
    float: left;
  }

  .give-list i {
    position: absolute;
    right: 0.3rem;
  }

  .give-list i.i1 img {
    width: 0.16rem;
    height: 0.28rem;
    margin-top: 0.38rem;
    display: block;
  }

  .give-toBox {
    padding: 0 0.3rem;
    line-height: 1.4rem;
    overflow: hidden;
  }

  .give-toBox > div {
    float: left;
    width: 75%;
    position: relative;
  }

  .toBox-list {
    height: 1.4rem;
    width: 12rem;
    position: absolute;
    top: 0;
    left: 0;
  }

  .toBox-list li {
    height: 1.4rem;
    width: 1rem;
    float: left;
    position: relative;
    margin-right: 0.2rem;

  }

  .toBox-list li > img {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    border: 1px solid red;
    vertical-align: middle;
  }

  .toBox-list li > p {
    position: absolute;
    width: 0.36rem;
    height: 0.36rem;
    border-radius: 50%;
    line-height: 0.36rem;
    top: 32%;
    transform: translateY(-50%);
    right: 0;
    /*z-index: 20;*/
  }

  .toBox-list li > p img {
    width: 100%;
    height: 100%;
  }

  .img-list,
  .lately-list {
    overflow: hidden;
    padding: 0 0.3rem;
  }

  .img-list {
    padding-bottom: 0.15rem;
    height: 3.3rem;
    overflow-y: scroll;
  }

  .img-list li,
  .lately-list li {
    float: left;
    width: 20%;
    margin: 0.1rem 0;
    text-align: center;
  }

  .img-list li img,
  .lately-list li img {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    border: 1px solid red;
  }

  .img-list li p {
    font-size: 0.22rem;
    color: rgb(95, 81, 69);
    font-weight: bold;
  }

  .lately-box {
    padding: 0.2rem 0.4rem;
  }

  .lately-box h3 {
    font-size: 0.28rem;
    margin-bottom: 0.2rem;
  }

  .lately-list {
    padding: 0;
  }

  .niming-box {
    overflow: hidden;
    padding: 0.2rem 0.4rem;
    border-top: 1px solid #CCB185;
  }

  .niming-box span {
    color: #5F5145;
    font-weight: 600;
    font-size: 0.28rem;
    float: left;
  }

  .niming-box > div, .niming-box > div img {
    float: left;
    margin-left: 0.1rem;
  }

  .niming-box > div img {
    margin-right: 0.2rem;
    width: 0.4rem;
    height: 0.4rem;
  }

  .niming-box input {
    -webkit-appearance: radio;
  }

  .btn-box {
    overflow: hidden;
    width: 80%;
    margin: 0 auto;
  }

  .btn-box div {
    width: 2rem;
    height: 0.8rem;
    margin: 0 0 0.4rem;
  }

  .btn-box div img {
    width: 100%;
    height: 100%;
  }

  .btn-ok {
    float: left;
    margin-left: 0.4rem;
  }

  .btn-no {
    float: right;
    margin-right: 0.4rem;
  }

  .select-box {
    padding: 0.1rem;
    height: 0.7rem;
  }

  .select-box > li {
    float: left;
    width: 33%;
    height: 0.7rem;
    line-height: 0.7rem;
  }

  .select-box li {
    position: relative;
  }

  .select-box li > span {
    width: 100%;
    display: block;
    text-align: center;
    color: #5F5145;
    font-weight: 600;
  }

  .select-box li > p {
    position: absolute;
    top: 0;
    right: 0;
    width: 0.4rem;
    height: 100%;
    line-height: 0.7rem;
  }

  .select-box li > p img {
    width: 0.28rem;
    height: 0.16rem;
  }

  .select-box > li:nth-child(2) {
    border-left: none;
    border-right: none;
  }

  .dropdown-list {
    width: 100%;
    text-align: center;
    position: absolute;
    top: 0.72rem;
    left: 0;
    background: #fff;
    border: 1px solid #ccc;
    border-bottom: none;
    border-top: none;
    display: none;
  }

  .dropdown-list li {
    background: #F1E3BB;
    border-bottom: 1px solid #ccc;

  }

  .dropdown-list_active {
    display: block;
  }

  @media only screen and (max-width: 326px) {
    .give-gift input {
      width: 68%;
    }
  }

  @media only screen and (max-width: 329px) {
    .give-toBox > div {
      width: 72%;
    }
  }

  .rout-con {
    padding: 0.2rem;
  }

  .rout-con .routGive .routGivepic {
    width: 1.4rem;
    height: 1.4rem;
    display: inline-block;
  }

  .rout-con .routGive .routGivename {
    display: inline-block;
    vertical-align: top;
    margin-left: 0.2rem;
    margin-top: 0.1rem;
  }

  .routGivename .giftName {
    font-size: 18px;
    font-weight: bold;
  }

  .routGivename .goldCoin {
    font-size: 0.3rem;
    font-weight: 400;
    position: relative;
    padding: 0.2rem 0.62rem;
  }

  .routGivename .goldCoin .iconCoin {
    width: 0.5rem;
    height: 0.5rem;
    display: inline-block;
    position: absolute;
    left: 0.02rem;
  }

  .routGivename .goldCoin .coinNum {
    font-weight: bold;
    font-size: 0.32rem;
  }

  .rout-integral {
    margin-top: 0.2rem;
    font-size: 0.24rem;
    color: #fff;
    text-shadow: 0 1px red, 1px 0 red, -1px 0 red, 0 -1px red;
    border-bottom: 1px dashed #958475;
    padding-bottom: 0.1rem;
  }

  .rout-integral span:nth-child(2) {
    float: right;
  }


</style>
