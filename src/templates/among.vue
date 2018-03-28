<template>
  <div class="Among">
    <div class="public-top">
      <div class="public-back" @click="handleSidebar('home/index')">返回</div>
      <div class="public-fr">
        <div>礼品</div>
        <div>积分</div>
      </div>
    </div>
    <div class="con">
      <div class="my-message">
        <p>排行榜</p>
      </div>
      <div class="tab">
        <ul class="center-ul">
          <li v-for="(item,index) in tabs" :class="{ red:changeRed == index}" @click="change(index)">{{item.text}}</li>
        </ul>
      </div>
    </div>
    <div class="tab-con">
      <div class="ranking-list">
        <div class="frist">
          <div class="ranking-pic">
            <img src="" alt="">
          </div>
          <p>童小雪</p>
          <p class="class">一年级二班</p>
          <p class="now-integral">当前积分： 264</p>
          <p class="all-integral">总积分： 4219</p>
        </div>
        <div class="second">
          <div class="ranking-pic">
            <img src="" alt="">
          </div>
          <p>童小雪</p>
          <p class="class">一年级二班</p>
          <p class="now-integral">当前积分： 264</p>
          <p class="all-integral">总积分： 4219</p>
        </div>
        <div class="thrid">
          <div class="ranking-pic">
            <img src="" alt="">
          </div>
          <p>童小雪</p>
          <p class="class">一年级二班</p>
          <p class="now-integral">当前积分： 264</p>
          <p class="all-integral">总积分： 4219</p>
        </div>
      </div>
      <table>
        <tr>
          <th>4</th>
          <th>
            <div class="ranking-small-pic">
              <img src="" alt="">
            </div>
            <p class="name">童小雪</p>
            <p>一年纪二班</p>
          </th>
          <th>
            <span>当前积分：456</span>
          </th>
          <th>
            <span>总积分：2503</span>
          </th>
        </tr>
        <tr>
          <th>4</th>
          <th>
            <div class="ranking-small-pic">
              <img src="" alt="">
            </div>
            <p class="name">童小雪</p>
            <p>一年纪二班</p>
          </th>
          <th>
            <span>当前积分：456</span>
          </th>
          <th>
            <span>总积分：2503</span>
          </th>
        </tr>
        <tr>
          <th>4</th>
          <th>
            <div class="ranking-small-pic">
              <img src="" alt="">
            </div>
            <p class="name">童小雪</p>
            <p>一年纪二班</p>
          </th>
          <th>
            <span>当前积分：456</span>
          </th>
          <th>
            <span>总积分：2503</span>
          </th>
        </tr>
        <tr>
          <th>4</th>
          <th>
            <div class="ranking-small-pic">
              <img src="" alt="">
            </div>
            <p class="name">童小雪</p>
            <p>一年纪二班</p>
          </th>
          <th>
            <span>当前积分：456</span>
          </th>
          <th>
            <span>总积分：2503</span>
          </th>
        </tr>
        <tr>
          <th>4</th>
          <th>
            <div class="ranking-small-pic">
              <img src="" alt="">
            </div>
            <p class="name">童小雪</p>
            <p>一年纪二班</p>
          </th>
          <th>
            <span>当前积分：456</span>
          </th>
          <th>
            <span>总积分：2503</span>
          </th>
        </tr>
        <tr>
          <th>4</th>
          <th>
            <div class="ranking-small-pic">
              <img src="" alt="">
            </div>
            <p class="name">童小雪</p>
            <p>一年纪二班</p>
          </th>
          <th>
            <span>当前积分：456</span>
          </th>
          <th>
            <span>总积分：2503</span>
          </th>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
  import { Base64 } from 'js-base64'

  export default {
    name: 'among',
    data () {
      return {
        items: {},
        tabs: [
          {text: '班级'},
          {text: '年级'},
          {text: '学校'}
        ],
        changeRed: 0
      }
    },
    methods: {
      handleSidebar (name) {
        this.$router.push({path: '/' + name})
      },
      change (index) {
        this.changeRed = index
      }
    },
    components: {
      Base64
    },
    created: function () {
      this.$http.get('http://192.168.0.218:8080/integralManagementOrder.do?method=getIntegralTeamOrderV31', {
        params: {
          userid: 628830418,
          studentid: 820,
          sid: 4
        }
      }).then(res => {
        // 成功的状态
        let successCode = 0
        // 失败的状态
        let errorCode = 1
        console.log(res, '原始数据')
        let body = res.body
        console.log(body, '后台返回的数据')
        // 先判断状态
        // "code":返回状态码,"data":"应该业务数据","msg":"错误提示"
        // 所以我优先判断 code
        if (body.code === successCode) {
          // 处理数据
          this.items = body.data
          console.log(this.items, '1111')
        } else if (body.code === errorCode) {
          // 处理失败
          console.log('错误提示：' + body.msg)
        }
      }, error => {
        // error callback
        console.log(error)
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .tab .center-ul {
    justify-content: center;
    align-items: center;
  }

  .tab-con {
    background-color: #fff;
    border-top: 1px solid #999999;
  }

  .tab-con .ranking-list {
    display: flex;
    flex-direction: row;
  }

  .ranking-list {
    padding-top: 40px;
  }

  .ranking-list div {
    margin: 0 auto;
    text-align: center;
    flex: 1;
    padding-top: 20px;
  }

  .ranking-list div.second {
    padding-top: 0;
  }

  .ranking-list div .ranking-pic {
    line-height: 200;
    vertical-align: bottom;
    margin-bottom: 10px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #e4e4e4;
  }

  .ranking-list .second .ranking-pic {
    width: 70px;
    height: 70px;
    border-radius: 50%;
  }

  .ranking-list div .class {
    font-size: 4px;
    color: #cccccc;
    margin-bottom: 8px;
  }

  .ranking-list div .now-integral {
    font-size: 4px;
    color: #4e4e4e;
  }

  .ranking-list div .all-integral {
    width: 100px;
    line-height: 22px;
    background-color: #ccc;
    border-radius: 10px;
    text-align: center;
    font-size: 12px;
    margin: 0 auto;
    margin-top: 5px;
  }

  .tab-con table {
    width: 100%;
    margin-top: 20px;
  }

  .tab-con table tr {
    height: 52px;
    border-top: 1px solid #797979;
    width: 100%;
    display: flex;
  }

  .tab-con table th {
    flex: 2;
    text-align: center;
    line-height: 50px;
  }

  .tab-con table th:nth-child(1) {
    flex: 1
  }

  .tab-con table th:nth-child(2) {
    line-height: 1;
    padding-top: 6px;
  }

  .tab-con table th:nth-child(2) .ranking-small-pic {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #4e4e4e;
    float: left;
  }

  .tab-con table th:nth-child(2) p {
    text-align: left;
  }

  .tab-con table th:nth-child(2) p.name {
    font-size: 10px;
  }

  .tab-con table th:nth-child(2) p {
    font-size: 4px;
    color: #999999;
  }

  .tab-con table th {
    font-size: 13px;
    font-weight: normal;
  }
</style>
