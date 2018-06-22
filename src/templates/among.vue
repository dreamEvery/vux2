<template>
  <div class="among">
    <public-top></public-top>
    <div class="con">
      <router-link class="back" to="/home/index">
        <img src="../assets/img/map/Game_icon_fanhui.png" alt="">
      </router-link>
      <div class="tab">
        <ul class="center-ul">
          <li class="tab-ranking" v-for="(item, index) in tabs" :class="{ red:changeRed == index}"
              @click="getData(index,item.id,item.type)">{{item.text}}
          </li>
        </ul>
      </div>
    </div>
    <div class="tab-con">
      <div class="tab-main">
        <div :class=" this.myArry ? 'tabHight' : 'tab-box' ">
          <div class="ranking-list">
            <div class="frist" v-if="dataArry[1]">
              <div class="ranking-pic blue-bg">
                <img :src="dataArry[1].picsummary" alt="" v-if="dataArry[1].picsummary !== ''"/>
                <img src="../assets/img/map/headPic.png" alt="" v-else/>
              </div>
              <p class="name">{{dataArry[1].studentname}}</p>
              <p class="className">{{dataArry[1].classname}}</p>
              <p class="now-integral">当前积分:{{dataArry[1].currentintegral}}</p>
              <p class="all-integral">总积分:{{dataArry[1].totalintegral}}</p>
            </div>
            <div class="second" v-if="dataArry[0]">
              <div class="ranking-pic yellow-bg">
                <img :src="dataArry[0].picsummary" alt="" v-if="dataArry[0].picsummary !== ''"/>
                <img src="../assets/img/map/headPic.png" alt="" v-else/>
              </div>
              <p class="name">{{dataArry[0].studentname}}</p>
              <p class="className">{{dataArry[0].classname}}</p>
              <p class="now-integral">当前积分:{{dataArry[0].currentintegral}}</p>
              <p class="all-integral">总积分:{{dataArry[0].totalintegral}}</p>
            </div>
            <div class="thrid" v-if="dataArry[2]">
              <div class="ranking-pic brown-bg">
                <img :src="dataArry[2].picsummary" alt="" v-if="dataArry[2].picsummary !== ''"/>
                <img src="../assets/img/map/headPic.png" alt="" v-else/>
              </div>
              <p class="name">{{dataArry[2].studentname}}</p>
              <p class="className">{{dataArry[2].classname}}</p>
              <p class="now-integral">当前积分:{{dataArry[2].currentintegral}}</p>
              <p class="all-integral">总积分:{{dataArry[2].totalintegral}}</p>
            </div>
          </div>
          <div class="rank-stu">
            <table>
              <tr v-for="(student, index) in dataArry" v-if="index > 2 && index < 15"
                  class="rank" :class="{myRank:(storageMessage.studentid==student.studentid)}">
                <th :class="(index == 3 || index == 4) ? 'cur' : 'numColor' ">{{student.ranking}}</th>
                <th>
                  <div class="ranking-small-pic">
                    <img :src="student.picsummary" alt="" v-if="student.picsummary !== ''"/>
                    <img src="../assets/img/map/headPic.png" alt="" v-else/>
                  </div>
                  <div>
                    <p class="name">{{student.studentname}}</p>
                    <p class="classname">{{student.classname}}</p>
                  </div>
                </th>
                <th>
                  <span>当前积分:{{student.currentintegral}}</span>
                </th>
                <th>
                  <span>总积分：{{student.totalintegral}}</span>
                </th>
              </tr>
            </table>
          </div>
        </div>
        <table class="myself-box" v-if="this.myArry">
          <tr>
            <th class="numColor">
              <p>{{myArry.ranking}}</p>
            </th>
            <th class="myself-th">
              <div class="myself-pic">
                <img src="../assets/img/map/headPic.png" alt="">
              </div>
              <p class="name">{{myArry.studentname}}</p>
              <p class="classname">{{myArry.classname}}</p>
            </th>
            <th><p class="now-integral">当前积分： {{myArry.currentintegral}}</p></th>
            <th><p class="all-integral">总积分： {{myArry.totalintegral}}</p></th>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
  import { Base64 } from 'js-base64'
  import publicTop from '../components/publicTop'

  export default {
    name: 'among',
    data () {
      return {
        dataArry: [],
        myArry: null,
        tabs: [
          {text: '班级'},
          {text: '年级'},
          {text: '学校'}
        ],
        changeRed: 0,
        storageMessage: null
      }
    },
    methods: {
      handleSidebar (name) {
        this.$router.push({path: '/' + name})
      },
      getData (index) {
        let that = this
        this.myArry = null
        that.changeRed = index
        let parameter = {
          sid: this.$route.query.sid,
          userid: this.$route.query.userid,
          studentid: this.$route.query.studentid,
          classid: this.$route.query.classId
        }
        if (index === 1) {
          parameter.gradeid = this.$route.query.gradeId
          parameter.classid = ''
        }
        if (index === 2) { parameter.classid = '' }
        this.$http.get(this.HOST + '/integralManagementOrder.do?method=getIntegralTeamOrderV31', {
          params: parameter
        }).then(res => {
          // 成功的状态
          let successCode = 0
          // 失败的状态
          let errorCode = 1
          let body = res.body
          // 先判断状态
          if (body.code === successCode) {
            // 处理数据
            this.dataArry = body.data
            this.dataArry.map((value) => {
              value.classname = Base64.decode(value.classname)
              value.studentname = Base64.decode(value.studentname)
            })
          } else if (body.code === errorCode) {
            // 处理失败
          }
        }, error => {
          // error callback
          console.log(error)
        })
      },
      mySelf () {
        let storageMessage = JSON.parse(sessionStorage.getItem('info'))
        for (let i = 0; i < this.dataArry.length; i++) {
          if (parseInt(storageMessage.studentid) === this.dataArry[i].studentid) {
            if (this.dataArry[i].ranking > 15) {
              this.myArry = this.dataArry.shift()
              console.log(this.myArry, '1999999')
            }
          }
        }
      }
    },
    components: {
      Base64,
      publicTop
    },
    computed: {
      // classObj: function () {
      //   for (let y = 0; y < this.dataArry.length; y++) {
      //     if (parseInt(this.storageMessage.studentid) === this.dataArry[y].studentid) {
      //       this.myRank = true
      //     }
      //   }
      // }
    },
    created () {
      console.log(this.$route.query, '000')
      this.getData(0)
      this.storageMessage = JSON.parse(sessionStorage.getItem('info'))
    },
    watch: {
      'dataArry' (value) {
        this.mySelf()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  img{border-radius: 50%;}
  .among {
    background-image: url("../assets/img/map/rankingBg.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    height: 100%;
  }

  .cur {
    color: #fff000;
    font-size: 0.32rem;
    text-shadow: 0 1px #e35b3a, 1px 0 #e35b3a, -1px 0 #e35b3a, 0 -1px #e35b3a;
  }

  .numColor {
    color: #ff4000;
    text-shadow: 0 1px #fff, 1px 0 #fff, -1px 0 #fff, 0 -1px #fff;
  }

  .integral {
    background-image: url("../assets/img/map/integral.png");
    background-size: 100% 100%;
  }

  .gift {
    background-image: url("../assets/img/map/exchange_icon_liwu.png");
    background-size: 100% 100%;
  }

  .tab-box {
    margin: 0 0.1rem;
    padding: 0 0.1rem;
    border: 2px solid #b17238;
    border-radius: 0.2rem;
    padding-top: 0.2rem;
    height: 100%;
    overflow-y: scroll;
  }

  .tabHight {
    margin: 0 0.1rem;
    padding: 0 0.1rem;
    border: 2px solid #b17238;
    border-radius: 0.2rem;
    padding-top: 0.2rem;
    overflow-y: scroll;
    height: 92%;
  }

  .tab .ul .tab-ranking {
    width: 28%;
  }

  .tab .center-ul {
    justify-content: center;
    align-items: center;
  }

  .center-ul li {
    background-color: #F8E99E;
    color: #A63A26;
    font-weight: bold;
    width: 28%;
  }

  .center-ul .red {
    color: #fff;
    background: #FEFAE7;
    text-shadow: 0 1px #971E03, 1px 0 #971E03, -1px 0 #971E03, 0 -1px #971E03;
    height: 0.86rem;
    line-height: 0.86rem;
    border-radius: 0.2rem 0.2rem 0 0;
  }

  .con {
    margin-top: 2.2rem;
    position: relative;
  }

  .con .back {
    position: absolute;
    left: 0.13rem;
    top: -2rem;
    width: 1.25rem;
    height: 0.64rem;
    display: block;
  }

  .con .back img {
    width: 100%;
    height: 100%;
  }

  .tab-con {
    padding: 0 0.4rem 0 0.4rem;
    overflow: hidden;
    margin-top: -0.2rem;
    height: 70%;
  }

  .tab-con .tab-main {
    background-color: #FEFBE9;
    border-radius: 0.2rem;
    padding-top: 0.2rem;
    height: 100%;
    overflow-y: scroll;
    padding-bottom: 0.2rem;
  }

  .tab-con .ranking-list {
    display: flex;
    flex-direction: row;
  }

  .tab-box table {
    overflow-y: scroll;
  }

  .ranking-list div {
    margin: 0 auto;
    text-align: center;
    flex: 1;
  }

  .ranking-list .name {
    margin-bottom: 0.06rem;
  }

  .ranking-stu .name {
    font-size: 0.28rem;
  }

  .ranking-list div img {
    width: 1rem;
    height: 1rem;
    margin-top: .36rem;
  }

  .ranking-list .frist {
    margin-top: 0.76rem;
  }

  .ranking-list .thrid {
    margin-top: 0.76rem;
  }

  .ranking-list div.second {
    padding-top: 0;
  }

  .ranking-list .name {
    font-size: 0.3rem;
  }

  .ranking-list p {
    margin-bottom: 0.1rem;
  }

  .ranking-list div .ranking-pic {
    vertical-align: bottom;
    margin-bottom: 10px;
    width: 1.22rem;
    height: 1.56rem;
    position: relative;
  }

  .ranking-list div .blue-bg:before {
    content: '';
    position: absolute;
    width: 1.22rem;
    height: 1.56rem;
    background-image: url("../assets/img/map/ranking-lift_bule.png");
    background-size: 100% 100%;
    left: 0.01rem

  }

  .ranking-list div .yellow-bg:before {
    content: '';
    position: absolute;
    width: 2.02rem;
    height: 2.11rem;
    background-image: url("../assets/img/map/ranking-lift_red.png");
    background-size: 100% 100%;
    left: 0.01rem;

  }

  .ranking-list div .brown-bg:before {
    content: '';
    position: absolute;
    width: 1.22rem;
    height: 1.56rem;
    background-image: url("../assets/img/map/ranking-lift_brown.png");
    background-size: 100% 100%;
    left: 0.01rem
  }

  .ranking-list div .yellow-bg img {
    width: 1.28rem;
    height: 1.28rem;
    margin-top: 0.46rem;
  }

  .ranking-list .second .ranking-pic {
    width: 2.02rem;
    height: 2.11rem;
  }

  .ranking-list div .class {
    font-size: 4px;
    color: #cccccc;
    margin-bottom: 8px;
  }

  .ranking-list div .now-integral {
    font-size: 0.26rem;
    color: #7a7571;
  }

  .ranking-list div .all-integral {
    font-size: 0.26rem;
    color: #7a7571;
  }

  .tab-con table {
    width: 100%;
    margin-top: 8px;
  }

  .tab-con table .rank {
    background-image: url("../assets/img/map/exchange_imgn_weixuanzhong.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    width: 100%;
    display: flex;
    margin-bottom: 0.2rem;
  }

  .tab-con table .myRank {
    background-image: url("../assets/img/map/ranking-list.png");
    background-size: 100% 100%;
  }

  .tab-con table th {
    flex: 3;
    text-align: center;
    line-height: 50px;
  }

  .tab-con table th .classname {
    color: #7e726a;
  }

  .tab-con table th span {
    color: #C87A40;
  }

  .tab-con table th:nth-child(1) {
    flex: 1
  }

  table th:nth-child(2) {
    line-height: 1;
    padding-top: 0.19rem;
    flex: 4;
  }

  @media screen and (max-width: 320px) {
    /*.tab-con table th {flex: 2.5}*/
    .tab-con table th:nth-child(2) {
      flex: 3
    }

  }

  .tab-con table th:nth-child(2) .ranking-small-pic {
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 50%;
    float: left;
    overflow: hidden;
  }

  .tab-con table th:nth-child(2) p {
    white-space: nowrap;
    margin-top: 0.06rem;
  }

  .tab-con table th {
    font-weight: normal;
  }

  .tab-con table th .name {
    color: #494645;
  }

  .second .name {
    color: #ff5870;
  }

  .second .className {
    color: #ff5870;
  }

  .frist .name {
    color: #76cbe3;
  }

  .frist .className {
    color: #76cbe3
  }

  .thrid .name {
    color: #e59f79;
  }

  .thrid .className {
    color: #e59f79
  }

  /*myself*/
  .tab-con .myself-box tr {
    background-image: url("../assets/img/map/Ranking-List_img_Selected.png");
    background-size: 100% 100%;
    width: 100%;
    margin-bottom: 0;
    margin-top: 0;
    display: flex;
  }

  .myself-box {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .myself-box p:nth-child(1) {
    flex: 1
  }

  .myself-box {
    display: flex;
    text-align: center;
  }

  .myself-box .numColor p {
    font-size: 0.3rem;
  }

  .myself-box .myself-pic {
    float: left;
    width: 0.7rem;
    height: 0.7rem;
    background-color: #797979;
    border-radius: 50%;
    margin-right: 0.2rem;
  }

  .myself-pic .name {
    color: #4c4846;
  }

  .myself-pic .classname {
    color: #7c706d;
  }

  .myself-box p {
    margin-top: 0.1rem;
    color: #d06d25;
  }

  .myself-box tr .myself-th {
    flex: 4
  }

  .mysele-th .name {
    margin-top: 0.14rem;
  }

  @media screen and (min-width: 768px) {
    .tab-con table th{
      padding-top: 0.1rem;
    }
    .tab-con table th div:nth-child(2){
      margin-top: 0.12rem;
    }
  }
  @media screen and (min-width: 768px) {
    .con{margin-top: 2.8rem;}
    .tab ul li {height: 32px;line-height: 32px;}
  }
</style>
