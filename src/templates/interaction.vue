<template>
  <div class="interaction">
    <public-top></public-top>
    <router-link class="go-back" to="/home/index">
      <img src="../assets/img/map/Game_icon_fanhui.png"/>
    </router-link>
    <div class="in-con">
      <h3 class="ranking">已经击败80%的小伙伴</h3>
      <div class="game-box">
        <router-link class="game-1" href="javascript:;" :to="{path:'/drawDom'}">
          <img src="../assets/img/map/lucky_turntable.png"/>
          <p>幸运大转盘</p>
        </router-link>
        <a class="game-2" href="javascript:;">
          <img src="../assets/img/Game_img_adventure.png"/>
          <p>奇幻冒险</p>
        </a>
      </div>
      <div class="record">
        <div class="record-title">
          <span>我的获奖记录:</span>
          <a href="javascript:;">
            <img src="../assets/img/Game_icon_See.png"/>
          </a>
        </div>
        <ul>
          <li v-for="list in lists">
            <span class="record-text">{{list.text}}</span>
            <span class="record-time">{{list.time}}</span>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
  import publicTop from '../components/publicTop'
  export default {
    name: 'interaction',
    data () {
      return {
        lists: []
      }
    },
    components: {
      publicTop
    },
    methods: {
      handleSidebar (name) {
        this.$router.push({
          path: '/' + name
        })
      }
    },
    created: function () {
      let storageMessage = JSON.parse(sessionStorage.getItem('info'))
      this.$http.get(this.HOST + '/winningRecordManage_listWinningRecord.do?method=getWinningRecordList', {
        params: storageMessage
      }).then(res => {
        // 成功的状态
        let successCode = 0
        // 失败的状态
        let errorCode = 1
        let body = res.body
        if (body.code === successCode) {
          // 处理数据
          this.items = body.data
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
  .interaction {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url(../assets/img/map/game_bg.png) no-repeat;
    background-size: 100% 100%;
  }

  .integral {
    background-image: url("../assets/img/map/integral.png");
    background-size: 100% 100%;
  }

  .gift {
    background-image: url("../assets/img/map/exchange_icon_liwu.png");
    background-size: 100% 100%;
  }

  .go-back {
    position: fixed;
    top: 12%;
    left: 0.3rem;
    width: 1.28rem;
    height: 0.64rem;
  }

  .go-back img {
    width: 100%;
    height: 100%;
  }

  .in-con {
    padding: 0 0.4rem;
    margin-top: 33%;
  }

  .in-con .ranking {
    width: 60%;
    background: #F5F5E3;
    border-radius: 0.2rem;
    margin: 0 auto;
    height: 0.36rem;
    text-align: center;
    line-height: 0.36rem;
    font-size: 0.16rem;
    color: #333;
  }

  .game-box {
    overflow: hidden;
    width: 60%;
    margin: 0.6rem auto 0;
  }

  .game-box a.game-1 {
    text-align: center;
    float: left;
    color: #3C3939;
    font-weight: 600;
  }

  .game-box a.game-2 {
    text-align: center;
    float: right;
    color: #3C3939;
    font-weight: 600;
  }

  .game-box a img {
    width: 1.52rem;
    height: 1.56rem;
  }

  .game-box a.game-2 img {
    width: 1.78rem;
  }

  .record {
    position: absolute;
    bottom: 53px;
    left: 0;
    width: 100%;
    padding: 0.6rem 0.8rem;
  }

  .record-title {
    padding-bottom: 0.24rem;
    color: #3C3939;
    font-size: 0.28rem;
    font-weight: 600;
  }

  .record-title a {
    float: right;
    width: 1rem;
    height: 0.4rem;
  }

  .record-title a img {
    width: 100%;
    height: 100%;
    vertical-align: middle;
  }

  .record li {
    overflow: hidden;
    line-height: 0.6rem;
    border-top: 2px dashed #D2B0A8;
    font-size: 0.28rem;
    font-weight: 600;
    color: #3C3939;
  }

  .record-text {
    float: left;
  }

  .record-time {
    float: right;
    font-size: 0.24rem;
  }
</style>
