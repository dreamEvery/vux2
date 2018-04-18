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
          <div class="ranking-list" v-if="dataArry[0]">
            <div class="frist">
              <div class="ranking-pic blue-bg">
                <img src="" alt="">
              </div>
              <p>{{dataArry[0].studentname}}</p>
              <p class="class">{{dataArry[0].classname}}</p>
              <p class="now-integral">当前积分： {{dataArry[0].currentintegral}}</p>
              <p class="all-integral">总积分： {{dataArry[0].totalintegral}}</p>
            </div>
            <div class="second">
              <div class="ranking-pic yellow-bg">
                <img src="" alt="">
              </div>
              <p>{{dataArry[1].studentname}}</p>
              <p class="class">{{dataArry[1].classname}}</p>
              <p class="now-integral">当前积分： {{dataArry[1].currentintegral}}</p>
              <p class="all-integral">总积分： {{dataArry[1].totalintegral}}</p>
            </div>
            <div class="thrid">
              <div class="ranking-pic brown-bg">
                <img src="" alt="">
              </div>
              <p>{{dataArry[2].studentname}}</p>
              <p class="class">{{dataArry[2].classname}}</p>
              <p class="now-integral">当前积分： {{dataArry[2].currentintegral}}</p>
              <p class="all-integral">总积分： {{dataArry[2].totalintegral}}</p>
            </div>
          </div>
          <table>
            <tr v-for="(student, index) in dataArry" v-if="index > 2">
              <th>{{student.ranking}}</th>
              <th>
                <div class="ranking-small-pic">
                  <img src="" alt="">
                </div>
                <p class="name">{{student.studentname}}</p>
                <p>{{student.classname}}</p>
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
        tabs: [
          {text: '班级', id: 12, type: 'class'},
          {text: '年级', gradeId: 1, type: 'grade'},
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
        let data = {
          userid: 628830418,
          sid: 4,
          studentid: 222
        }
        if (type === 'class') data.class = id
        if (type === 'grade') data.grade = id

        this.$http.get('/api/integralManagementOrder.do?method=getIntegralTeamOrderV31', {
          params: data
        }).then(res => {
          // 成功的状态
          let successCode = 0
          //   // 失败的状态
          let errorCode = 1
          console.log(res, '原始数据')
          let body = res.body
          console.log(body, '后台返回的数据')
          // 先判断状态
          // "code":返回状态码,"data":"应该业务数据","msg":"错误提示"
          // 所以我优先判断 code
          if (body.code === successCode) {
            // 处理数据
            // body.data.classname = Base64.decode(body.data.classname)
            this.dataArry = body.data
            for (let i = 0; i < this.dataArry.length; i++) {
              console.log(this.dataArry[i].classname, '2345')
              this.dataArry[i].classname = Base64.decode(this.dataArry[i].classname)
              this.dataArry[i].studentname = Base64.decode(this.dataArry[i].studentname)
            }
            console.log(this.dataArry, '234')
          } else if (body.code === errorCode) {
            // 处理失败
            console.log('错误提示：' + body.msg)
          }
        }, error => {
          //   // error callback
          console.log(error)
        })
      }
    },
    components: {
      Base64,
      publicTop
    },
    created () {
      this.getData(0)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .among {
    background-image: url("../assets/img/map/ranking lift_bg.jpg");
    background-repeat: no-repeat;
    background-size: 100% 54%;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
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
    margin-top: 2.89rem;
    position: relative;
  }

  .con .back {
    position: absolute;
    left: 0.1rem;
    top: -1.6rem;
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
  }

  .tab-con .tab-main {
    background-color: #FEFBE9;
    border-radius: 0.2rem;
    padding-top: 0.2rem;
  }

  .tab-con .ranking-list {
    display: flex;
    flex-direction: row;
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
    height: 52px;
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
  }

  .tab-con table th:nth-child(2) p.name {
    font-size: 10px;
    padding-top: 0.12rem;
  }

  .tab-con table th:nth-child(2) p {
    font-size: 4px;
    color: #999999;
  }

  .tab-con table th {
    font-size: 0.1rem;
    font-weight: normal;
  }
</style>
