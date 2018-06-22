<template>
  <div class="give">
    <alert v-if='isSuccess' :show="'isSuccess'">
    </alert>
    <giveFail v-if="giveFail" :giveName="giveFail" :Erro="erroMess"></giveFail>
    <div class="give-parent">
      <div class="public-top">
        <div class="public-back" @click="goIndex">
          <img src="../assets/img/map/return(2).png"/>
        </div>
      </div>
      <div class="public-bg">
        <div class="give-con" v-if="this.routerParams === null">
          <div class="give-list">
            <div class="give-gift">
              <span>赠送礼品</span>
              <router-link to='/give/giveSel'>
                <!--<input type="text" readonly v-model="$route.query.mallitemsname + $route.query.integral" placeholder="请选择商品"/>-->
                <div class="giftMessage" :class="{changeGift: $route.query.mallitemsname + $route.query.integral}">
                  <!--{{$route.query.mallitemsname + '&nbsp' + $route.query.integral || '请选择商品'}}-->
                  {{rotueMessage || '请选择商品'}}
                </div>
                <i class="i1">
                  <img src="../assets/img/gift_icon_right.png"/>
                </i>
              </router-link>
            </div>
          </div>
          <div class="giveCode" v-if="this.$route.query === null">
            <span class="Deduct">扣除积分:{{this.deleteCode}}</span>
          </div>
          <div class="give-list">
            <div class="give-gift">
              <span>赠送积分</span>
              <input class="jifen-inp" oninput="if(value.length>3) value=value.slice(0,3)" type="number"
                     onkeyup="this.value=this.value.replace(/[^0-9]/g,'')"
                     onafterpaste="this.value=this.value.replace(/[^0-9]/g,'')" placeholder="请输入积分"
                     v-model="jifen_inp"/>
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
              <img :src="routerParams.picsummary" alt="">
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
            <div class="rout-integral" v-if="!this.routerParams.status">
              <span class="nowIntegral">我拥有的积分：{{this.nowNum}}</span>
              <span class="Deduct">扣除积分：{{this.deduction}}</span>
            </div>
          </div>
        </div>
        <div class="give-toBox">
          <span>赠送给:</span>
          <div>
            <ul class="toBox-list">
              <li v-for="(item,index) in zengsongList" :key="item.id">
                <img
                  :src="(item.picsummary&&item.picsummary!=='null')?item.picsummary:require('../assets/img/map/headPic.png')"
                  alt="">
                <span class="stuName">{{item.studentname}}</span>
                <p class="close-img" @click="closes(item,index)">
                  <img src="../assets/img/close.png"/>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="public-bg">
        <ul class="select-box">
            <p class="make" v-if="activeType" @click="activeType=false"></p>
            <li>
            <span>{{school_on.name}}</span>
            <p @click="select(1)"><img src="../assets/img/gift_icon_lower.png"/></p>
            <ul :class="{'dropdown-list_active':activeType==1}" class="listName">
              <li @click="schoolOn(item)" v-for="item in schoolList">
                {{item.name}}
              </li>
            </ul>
          </li>
          <li class="grade">
            <span>{{grade_on.name}}</span>
            <p @click="select(2)"><img src="../assets/img/gift_icon_lower.png"/></p>
            <ul :class="{'dropdown-list_active':activeType==2}" class="dropdown-list listName">
              <li @click="gradeOn(item)" v-for="item in gradeList">
                {{item.name}}
              </li>
            </ul>
          </li>
          <li>
            <span>{{class_on.name}}</span>
            <p @click="select(3)"><img src="../assets/img/gift_icon_lower.png"/></p>
            <ul :class="{'dropdown-list_active':activeType==3}" class="dropdown-list listName">
              <li @click="classOn(item)" v-for="item in classList">
                {{item.name}}
              </li>
            </ul>
          </li>
        </ul>
        <ul class="img-list">
          <li v-for="(i,index) in classmateList">
            <img :src="(i.picsummary&&i.picsummary!=='null')?i.picsummary:require('../assets/img/map/headPic.png')"
                 @click='zengsong(i,index)'/>
            <p>{{i.studentname}}</p>
          </li>
        </ul>
      </div>
      <div class="public-bg">
        <div class="lately-box">
          <h3>最近赠送人：</h3>
          <ul class="lately-list">
            <li v-for="peopleList in giftPeople">
              <img :src='peopleList.picsummary?peopleList.picsummary:require("../assets/img/map/headPic.png")' alt=""/>
              <span>{{peopleList.studentname}}</span>
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
  import giveFail from '../components/giveFail'
  import { Base64 } from 'js-base64'

  export default {
    name: 'give',
    components: {
      Alert,
      giveFail
    },
    data () {
      return {
        inputValue: '',
        erroMess: '',
        tostudentids: null,
        jifen_type: false,
        giveFail: false,
        giftPeople: null,
        jifen_inp: '',
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
        deductionCode: '',
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
        off: '/src/assets/img/integral_icon_open.png',
        storageMessage: null
      }
    },
    mounted () {
    },
    computed: {
      // 计算属性的 getter
      deduction: function () {
        // `this` 指向 vm 实例
        return (this.deductionCode = this.routerParams.integral * this.zengsongList.length)
      },
      deleteCode: function () {
        return (this.deductionCode = this.$route.query.integral * this.zengsongList.length)
      },
      // 选择商品
      rotueMessage: function () {
        let text = this.$route.query.mallitemsname + ' ' + this.$route.query.integral
        if (text !== ' ' && this.$route.query.mallitemsname && this.$route.query.integral) {
          return text
        }
        return undefined
      }
    },
    created: function () {
      console.log(this.$route.query, '0000')
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
        // 存储总积分
        let stutendMess = JSON.parse(sessionStorage.getItem('stuMessage'))
        this.nowNum = stutendMess.currentintegral
      }
      this.storageMessage = JSON.parse(sessionStorage.getItem('info'))
      console.log(this.storageMessage, '11111')
      this.school()
      this.getGradeList()
      this.getGiftPeople()
    },
    methods: {
      // 获取最新赠送人
      getGiftPeople () {
        this.$http.get(this.HOST + '/exchangeRecordManage_listExchangeRecord.do?method=getGiveStudentList', {
          params: {
            userid: this.storageMessage.userid,
            sid: this.storageMessage.sid,
            studentid: this.storageMessage.studentid
          }
        }).then(res => {
          // 成功的状态
          let successCode = '0'
          let errorCode = '1'
          let body = res.body
          // 先判断状态
          if (body.code === successCode) {
            // 处理数据
            if (body.data.length) {
              this.giftPeople = body.data
              console.log(this.giftPeople, '000000000')
            } else {
              this.giftPeople = null
            }
            // console.log(this.giftPeople, 'this.giftPeople')
          } else if (body.code === errorCode) {
            // 处理失败
            console.log('错误提示：' + body.msg)
          }
        }, error => {
          // error callback
          console.log(error)
        })
      },
      // 获取全部学生列表
      getClassmateList () {
        this.$http.get(this.HOST + '/vendingMachineInventoryManage_listVendingMachineInventory.do?method=getStudentList', {
          params: {
            sid: this.school_on.sid,
            userid: this.storageMessage.userid,
            gradeId: this.grade_on.id,
            classid: this.class_on.id
          }
        }).then(res => {
          // 成功的状态
          let successCode = 0
          let errorCode = 1
          let body = res.body
          // 先判断状态
          if (body.code === successCode) {
            // 处理数据
            this.classmateList = body.data
            // 删除自己
            for (let i = 0; i < this.classmateList.length; i++) {
              if (this.storageMessage.studentid == this.classmateList[i].studentid) {
                this.classmateList.splice(i, 1)
              }
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
      // 获取年级
      getGradeList (id) {
        this.$http.get(this.HOST + '/mallItemsManage_listMallItemsInfo.do?method=getAllGrade', {
          params: {
            userid: this.storageMessage.userid,
            sid: id || this.storageMessage.sid
          }
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
              if (this.storageMessage.gradeid == this.gradeList[i].id) {
                this.grade_on = this.gradeList[i]
              }
            }
            this.getClassList()
          } else if (body.code === errorCode) {
            // 处理失败
            console.log('错误提示：' + body.msg)
          }
        }, error => {
          // error callback
          console.log(error)
        })
      },
      // 获取班级
      getClassList (id) {
        this.$http.get(this.HOST + '/exchangeRecordManage_listExchangeRecord.do?method=getAllClassTableList', {
          params: {
            userid: this.storageMessage.userid,
            sid: this.storageMessage.sid,
            gradeId: id || this.grade_on.id
          }
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
              if (this.storageMessage.classname == this.classList[i].name) {
                this.class_on = this.classList[i]
              }
            }
            this.getClassmateList()
          } else if (body.code === errorCode) {
            // 处理失败
            console.log('错误提示：' + body.msg)
          }
        }, error => {
          // error callback
          console.log(error)
        })
      },
      // 学校接口
      school () {
        this.$http.get(this.HOST + '/exchangeRecordManage_listExchangeRecord.do?method=getAllSchoolList', {
          params: {
            userid: this.storageMessage.userid
          }
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
              if (this.storageMessage.sid == this.schoolList[i].sid) {
                this.school_on = this.schoolList[i]
              }
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
      goIndex () {
        this.$router.push({
          path: '/home/index'
        })
      },
      change (index) {
        this.changeRed = index
      },
      show () {
        this.give()
      },
      value () {
        this.inputValue = this.$route.query.content + this.$route.query.integral
      },
      /* 输入积分 */
      jifens () {
        this.jifen_type = true
        // this.jifen_inp+='积分'
        this.jifen_inp.join('积分')
      },
      select (i) {
        this.activeType = i
      },
      /* 选择学校 */
      schoolOn (item) {
        this.school_on = item
        this.activeType = !this.activeType
        console.log(this.activeType, 'activeType')
        this.getGradeList(item.id)
      },
      /* 选择年级 */
      gradeOn (item) {
        this.grade_on = item
        this.activeType = !this.activeType
        this.getClassList(item.id)
      },
      /* 选择班级 */
      classOn (item) {
        this.class_on = item
        this.activeType = !this.activeType
        this.getClassmateList()
      },
      /* 赠送 */
      zengsong (i, index) {
        // console.log(i, index)
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
      // 存储接受人id
      newList () {
        let studentid = []
        if (this.zengsongList) {
          for (let i = 0; i < this.zengsongList.length; i++) {
            studentid.push(this.zengsongList[i].studentid)
          }
          return studentid.join(',')
        }
      },
      // 调用赠送接口
      give () {
        let id = this.newList()
        let obj = {
          sid: this.storageMessage.sid,
          userid: this.storageMessage.userid,
          fromstudentid: this.storageMessage.studentid,
          tostudentids: id
        }
        // this.$route.query 是赠送页赠送的参数
        // this.routerParams 是市集和我的礼品的参数
        // jifen_inp 单独送积分
        // isanonymous = 1 匿名模式参数
        if (this.$route.query.mallitemsid) {
          obj.mallitemid = this.$route.query.mallitemsid
        }
        if (this.routerParams) {
          obj.mallitemid = this.routerParams.mallitemsid
        }
        if (this.routerParams && this.routerParams.status) {
          obj.status = this.routerParams.status
          obj.isgiving = 1
        }
        if (this.jifen_inp) {
          obj.integral = this.jifen_inp
        }
        if (this.niming_text === '开启') {
          obj.isanonymous = 1
        } else {
          obj.isanonymous = ''
        }
        if (JSON.stringify(this.$route.query) === '{}' && this.jifen_inp == '') {
          this.giveFail = true
          this.erroMess = '请选择礼品或积分'
        } else if (this.zengsongList == '') {
          this.giveFail = true
          this.erroMess = '请选择赠送人'
        } else {
          this.$http.post(this.HOST + '/exchangeRecordManage_addExchangeRecord.do?method=giveGift',
            obj
          ).then(res => {
            // get body data
            let body = res.body
            let success = '0'
            if (success === body.code) {
              this.isSuccess = true
            } else {
              // 报错原因
              this.giveFail = true
              this.erroMess = body.msg
            }
          }, res => {
            // error callback
          })
        }
      }
    },
    beforeDestroy () {
      this.$root.eventHub.$off('zidingyi')
    }
  }
</script>

<style scoped>
  .give {
    background: #FFFBE8;
    left: 0;
    position: absolute;
    top: 0;
    right: 0;
    overflow: hidden;
    overflow-y: scroll;
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
    width: 1.4rem;
    height: 0.8rem;
    border-radius: initial;
    border: none;
    margin-bottom: -0.1rem;
  }

  .public-top .public-back > img {
    width: 100%;
    height: 100%;
  }

  .giveCode {
    overflow: hidden;
    padding: 0.1rem 0.2rem;
    color: #fff;
    text-shadow: 0 1px #c34d16, 1px 0 #c34d16, -1px 0 #c34d16, 0 -1px #c34d16;
  }
  .giveCode .Deduct{float: right}
  .give-con {
    padding: 0;
  }

  .give-list .give-gift {
    color: #4e4e4e;
    margin-right: 0.2rem;
  }

  .giftMessage {
    width: 75%;
    display: inline-block;
    overflow: hidden;
    text-align: right;
    color: darkgrey;
    font-size: 0.26rem;
  }
  .changeGift{
    color: #3C3939;
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
    font-size: 0.3rem;
    width: 70%;
    height: 1rem;
    background: none;
    float: right;
    text-align: right;
    margin-right: 0.2rem;
    color: #5F5145;
  }
  /*.dropdown-list{*/
    /*height: 704%;*/
    /*overflow: hidden;*/
    /*overflow-y: scroll;*/
  /*}*/

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
    line-height: 1.6rem;
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
    width: 1.3rem;
    float: left;
    position: relative;
    margin-right: 0.2rem;

  }

  .toBox-list .stuName {
    position: absolute;
    top: 0.56rem;
    text-align: center;
    width: 1rem;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }

  .toBox-list li > img {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    vertical-align: middle;
  }

  .toBox-list li > p {
    position: absolute;
    width: 0.36rem;
    height: 0.36rem;
    border-radius: 50%;
    line-height: 0.36rem;
    top: 25%;
    transform: translateY(-50%);
    right: 0.2rem;
    /*z-index: 20;*/
  }

  .select-box .grade p {
    position: absolute;
    width: 0.36rem;
    height: 0.36rem;
    border-radius: 50%;
    line-height: 0.36rem;
    top: 52%;
    transform: translateY(-50%);
    right: 0.3rem;
  }

  .toBox-list li > p img {
    width: 100%;
    height: 100%;
  }

  .img-list,
  .lately-list {
    overflow: hidden;
    padding: 0 0.3rem;
    height: 2.2rem;
    overflow-y: scroll;
  }

  .img-list {
    padding-bottom: 0.15rem;
    height: 3.3rem;
    overflow-y: scroll;
  }

  .img-list li,
  .lately-list li {
    display: inline-block;
    width: 20%;
    margin: 0.1rem 0;
    text-align: center;
  }
  .lately-list li span{
    overflow: hidden;
    white-space: normal;
    text-overflow: ellipsis;
    display: block;
  }

  .img-list li img,
  .lately-list li img {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
  }

  .img-list li p {
    font-size: 0.22rem;
    color: rgb(95, 81, 69);
    font-weight: bold;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    height: 0.3rem;
    line-height:0.3rem;
  }

  .lately-box {
    padding: 0.3rem 0.2rem;
  }

  .lately-box h3 {
    font-size: 0.28rem;
    color: #5F5145;
    margin-bottom: 0.4rem;
  }

  .lately-list {
    padding: 0;
  }

  .niming-box {
    overflow: hidden;
    padding-left: 0.2rem;
    padding-top: 0.2rem;
    padding-bottom: 0.3rem;
    border-top: 1px dashed #CCB185;
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
    margin-top: -0.03rem;
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
    width: 1.95rem;
    height: 0.76rem;
    margin: 0 0 0.33rem;
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

  .select-box .make {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
  }

  .select-box > li {
    float: left;
    width: 33%;
    height: 0.7rem;
    line-height: 0.7rem;
  }

  .select-box li {
    position: relative;
    padding-right: 0.4rem;
  }

  .select-box li > span {
    width: 100%;
    display: block;
    text-align: center;
    color: #5F5145;
    font-weight: 600;
  }
  @media screen and (min-width: 768px) {
    .select-box li > span {
      font-size: 0.32rem;
    }
  }

  .select-box li > p {
    position: absolute;
    top: 0;
    right: -0.08rem;
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

  .listName {
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

  .listName li {
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
    font-size: 0.3rem;
    font-weight: bold;
    color: #5f5145;
  }

  .routGivename .goldCoin {
    font-size: 0.3rem;
    font-weight: 400;
    position: relative;
    padding: 0.48rem 0.62rem;
  }

  .routGivename .goldCoin .iconCoin {
    width: 0.47rem;
    height: 0.47rem;
    display: inline-block;
    position: absolute;
    left: 0.02rem;
    top: 0.4rem;
  }

  .routGivename .goldCoin .coinNum {
    font-weight: bold;
    font-size: 0.32rem;
  }

  .rout-integral {
    font-size: 0.24rem;
    color: #fff;
    text-shadow: 0 1px #c34d16, 1px 0 #c34d16, -1px 0 #c34d16, 0 -1px #c34d16;
    border-bottom: 1px dashed #CCB185;
    padding-bottom: 0.25rem;
  }

  .rout-integral span:nth-child(2) {
    float: right;
  }

  @media only screen and (min-width: 768px) {
    input::-webkit-input-placeholder {
      font-size: 0.26rem;
    }
  }

</style>
