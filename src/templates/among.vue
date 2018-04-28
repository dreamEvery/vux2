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
        <div class="tab-box">
          <div class="ranking-list">
            <div class="frist" v-if="dataArry[1]">
              <div class="ranking-pic blue-bg">
                <img src="" alt="">
              </div>
              <p>{{dataArry[1].studentname}}</p>
              <p class="class">{{dataArry[1].classname}}</p>
              <p class="now-integral">当前积分： {{dataArry[1].currentintegral}}</p>
              <p class="all-integral">总积分： {{dataArry[1].totalintegral}}</p>
            </div>
            <div class="second" v-if="dataArry[0]">
              <div class="ranking-pic yellow-bg">
                <img src="" alt="">
              </div>
              <p>{{dataArry[0].studentname}}</p>
              <p class="class">{{dataArry[0].classname}}</p>
              <p class="now-integral">当前积分： {{dataArry[0].currentintegral}}</p>
              <p class="all-integral">总积分： {{dataArry[0].totalintegral}}</p>
            </div>
            <div class="thrid" v-if="dataArry[2]">
              <div class="ranking-pic brown-bg">
                <img src="" alt="">
              </div>
              <p>{{dataArry[2].studentname}}</p>
              <p class="class">{{dataArry[2].classname}}</p>
              <p class="now-integral">当前积分： {{dataArry[2].currentintegral}}</p>
              <p class="all-integral">总积分： {{dataArry[2].totalintegral}}</p>
            </div>
          </div>
          <div class="rank-stu">
            <table>
              <tr v-for="(student, index) in dataArry" v-if="index > 2 && index < 8">
                <th>{{student.ranking}}</th>
                <th>
                  <div class="ranking-small-pic">
                    <img src="" alt="">
                  </div>
                  <div>
                    <p class="name">{{student.studentname}}</p>
                    <p>{{student.classname}}</p>
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
        <table class="myself-box">
          <tr>
            <th>
              <p>{{myArry.ranking}}</p>
            </th>
            <th>
              <div class="myself-pic">
                <img src="" alt="">
              </div>
              <p>{{myArry.studentname}}</p>
              <p class="class">{{myArry.classname}}</p>
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
        myArry: {},
        tabs: [
          {text: '班级', id: this.$route.query.classId, type: 'class'},
          {text: '年级', id: this.$route.query.gradeId, type: 'grade'},
          {text: '学校'}
        ],
        changeRed: 0
      }
    },
    methods: {
      handleSidebar (name) {
        this.$router.push({path: '/' + name})
      },
      getData (index, id, type) {
        let that = this
        that.changeRed = index
        let storageMessage = JSON.parse(sessionStorage.getItem('info'))
        if (type === 'class') storageMessage.classid = id
        if (type === 'grade') storageMessage.gradeid = id
        this.$http.get('/api/integralManagementOrder.do?method=getIntegralTeamOrderV31', {
          params: storageMessage
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
        console.log(storageMessage.studentid, 'id')
        console.log(this.dataArry.length)
        for (let i = 0; i < this.dataArry.length; i++) {
          if (parseInt(storageMessage.studentid) === this.dataArry[i].studentid) {
            this.myArry = this.dataArry[i]
            console.log(this.myArry, '12345')
          }
        }
      }
    },
    components: {
      Base64,
      publicTop
    },
    computed: {},
    created () {
      this.getData(2)
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
  .among {
    background-image: url("../assets/img/map/ranking lift_bg.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    height: 100%;
  }

  .integral {
    background-image: url("../assets/img/map/integral.png");
    background-size: 100% 100%;
  }

  .gift {
    background-image: url("../assets/img/map/exchange_icon_liwu.png");
    background-size: 100% 100%;
  }

  .blue-bg {
    background-image: url("../assets/img/map/ranking-lift_bule.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }

  .yellow-bg {
    background-image: url("../assets/img/map/ranking-lift_red.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  .brown-bg {
    background-image: url("../assets/img/map/ranking-lift_brown.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  .tab-box {
    margin: 0 0.1rem;
    padding: 0 0.1rem;
    border: 2px solid #6b3a0f;
    border-radius: 0.2rem;
    padding-top: 0.2rem;
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
  }

  .center-ul .red {
    color: #fff;
    background: #FEFAE7;
    text-shadow: 0 1px #971E03, 1px 0 #971E03, -1px 0 #971E03, 0 -1px #971E03;
    height: 0.72rem;
    line-height: 0.72rem;
    border-radius: 0.2rem 0.2rem 0 0;
  }

  .con {
    margin-top: 2.2rem;
    position: relative;
  }

  .con .back {
    position: absolute;
    left: 0.1rem;
    top: -1.2rem;
    width: 1.2rem;
    height: 0.6rem;
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
    height: 90%;
    overflow-y: scroll;
  }

  .tab-con .ranking-list {
    display: flex;
    flex-direction: row;
  }

  .tab-box {
    height: 100%;
    overflow-y: scroll;
  }

  .tab-box table {
    overflow-y: scroll;
  }

  .ranking-list div {
    margin: 0 auto;
    text-align: center;
    flex: 1;
    padding-top: 0.9rem;
  }

  .ranking-list div.second {
    padding-top: 0;
  }

  .ranking-list div .ranking-pic {
    vertical-align: bottom;
    margin-bottom: 10px;
    width: 1.3rem;
    height: 1.5rem;
  }

  .ranking-list .second .ranking-pic {
    width: 2.2rem;
    height: 2.2rem;
  }

  .ranking-list div .class {
    font-size: 4px;
    color: #cccccc;
    margin-bottom: 8px;
  }

  .ranking-list div .now-integral {
    font-size: 4px;
    color: #797979;
  }

  .ranking-list div .all-integral {
    font-size: 0.1rem;
    color: #797979;
  }

  .tab-con table {
    width: 100%;
    margin-top: 20px;
  }

  .tab-con table tr {
    background-image: url("../assets/img/map/exchange_imgn_weixuanzhong.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    width: 100%;
    display: flex;
    margin-bottom: 0.2rem;
  }

  .tab-con table th {
    flex: 3;
    text-align: center;
    line-height: 50px;
  }

  .tab-con table th span {
    color: #C87A40;
  }

  .tab-con table th:nth-child(1) {
    flex: 1
  }

  .tab-con table th:nth-child(2) {
    line-height: 1;
    padding-top: 0.18rem;
  }

  .tab-con table th:nth-child(2) .ranking-small-pic {
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 50%;
    background-color: #4e4e4e;
    float: left;
  }

  .tab-con table th:nth-child(2) p {
    text-align: left;
    white-space: nowrap;
  }

  .tab-con table th:nth-child(2) p {
    font-size: 10px;
    margin-top: 0.06rem;
  }

  .tab-con table th:nth-child(2) p {
    font-size: 4px;
    color: #999999;
  }

  .tab-con table th {
    font-size: 0.1rem;
    font-weight: normal;
  }

  /*myself*/
  .tab-con .myself-box tr {
    background-image: url("../assets/img/map/Ranking-List_img_Selected.png");
    background-size: 100% 100%;
    width: 100%;
    margin-bottom: 0;
    margin-top: 0;
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

  .myself-box .myself-pic {
    float: left;
    width: 0.6rem;
    height: 0.6rem;
    background-color: #797979;
    border-radius: 50%;
  }
  .myself-box p{margin-top: 0.1rem;}

</style>
