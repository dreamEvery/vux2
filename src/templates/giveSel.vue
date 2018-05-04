<template>
  <div class="give-box">
    <div class="public-top">
      <div class="public-back" @click="back()">
        <img src="../assets/img/map/return(2).png"/>
      </div>
    </div>
    <div class='give-bg'>
      <div class="give-bg-top"></div>
      <div class="give-bg-bottom">
      </div>
      <ul class="give-sel-list">
        <li v-for="( item, index ) in giftSelList">
          <div>
            <img :src="item.picsummary" @click="gift_sel(item,index)"/>
            <span>{{item.count}}</span>
          </div>
        </li>
      </ul>

    </div>

  </div>
</template>

<script>
  export default {
    name: 'gift_sel',
    data () {
      return {
        giftSelList: []
      }
    },
    created () {
      this.getGive()
    },
    components: {
    },
    mounted () {
      /* Max 屏幕的高度 赋值给 give-bg 最大容器 */
      var MaxH = window.innerHeight
      console.log(MaxH)
      document.getElementsByClassName('give-bg')[0].style.height = MaxH + 'px'
      var clearH = document.getElementsByClassName('public-top')[0].offsetHeight + document.getElementsByClassName('give-bg-top')[0].offsetHeight
      /* clearH 是give-bg-top的高度+头部(返回)的高度 */
      var bottomMinH = MaxH - clearH
      /* bottom是把屏幕高度 - 多余高度 的give-bg-bottom */
      document.getElementsByClassName('give-bg-bottom')[0].style.minHeight = bottomMinH + 'px'

      /* 判断ul的高度 如果大于 bottomMinH的高度 就把ul的高度赋值给bottomMinH */
      /* ul的高度 */
      var ulH = document.getElementsByClassName('give-sel-list')[0].offsetHeight
      if (ulH > document.getElementsByClassName('give-bg-bottom')[0].offsetHeight) {
        document.getElementsByClassName('give-bg-bottom')[0].style.minHeight = ulH + 'px'
      }
    },
    methods: {
      gift_sel (item, index) {
        let vm = this
        console.log(item.name)
        let giftOn = item.name
        vm.$root.eventHub.$emit('zidingyi', giftOn)
        vm.$router.go(-1)
      },
      back () {
        let vm = this
        vm.$router.go(-1)
      },
      getGive () {
        let storageMessage = JSON.parse(sessionStorage.getItem('info'))
        this.$http.get(this.HOST + '/mallItemsManage_listMallItems.do?method=getMyMallItemsList', {
          params: storageMessage
        }).then(res => {
          // 成功的状态
          let successCode = '0'
          // 失败的状态
          let errorCode = '1'
          let body = res.body
          // 先判断状态
          if (body.code === successCode) {
            // 处理数据
            this.giftSelList = body.data
            console.log(this.giftSelList, '6678')
          } else if (body.code === errorCode) {
            // 处理失败
          }
        }, error => {
          // error callback
          console.log(error)
        })
      }
    }
  }
</script>

<style scoped>
  .give-box {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #FFFBE8;
  }
  .give-box .public-back{
    width: 1.64rem;
    height: 0.84rem;
  }

  .give-bg {
    position: fixed;
    overflow: scroll;
    top: 0.68rem;
    left: 0.3rem;
    right: 0.3rem;
    bottom: 0;
    background-size: contain;
    z-index: 22;
    margin-top: 0.44rem;
  }

  .give-sel-list {
    padding: 0 0.6rem;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
  }

  .give-sel-list li {
    width: 30%;
    float: left;
    text-align: center;
    height: 2.19rem;
    margin-top: 0%;
  }

  .give-sel-list li:nth-child(1),
  .give-sel-list li:nth-child(2),
  .give-sel-list li:nth-child(3) {
    margin-top: 0.49rem;
  }

  .give-sel-list li div {
    position: relative;
    width: 1.3rem;
    margin: 0 auto;
  }

  .give-sel-list li:nth-child(3n-1) {
    margin-left: 5%;
    margin-right: 5%;
  }

  .give-sel-list li img {
    width: 1.2rem;
    height: 1.2rem;
  }

  .give-sel-list li span {
    text-align: center;
    line-height: 0.48rem;
    font-weight: 600;
    color: #fff;
    display: block;
    background: url(../assets/img/my_img_number.png) no-repeat;
    width: 0.48rem;
    height: 0.48rem;
    background-size: cover;
    position: absolute;
    bottom: 0;
    left: 0;
  }

  .give-bg-top {
    height: 2.3rem;
    background: url(../assets/img/gift_top1.png) no-repeat;
    background-size: 100% 2.3rem;
  }

  .give-bg-bottom {
    background: url(../assets/img/gift_bottom1.png) repeat-y;
    background-size: 100% 2.19rem;
  }

  @media only screen and (max-width: 360px) {
    .give-bg {
      top: 0.78rem;
    }
  }
</style>
