<template>
  <div class="market">
    <alert-box v-if='isAlertBox' :showName="'isAlertBox'">
      <div slot="content">
        <div class="alert-top">{{giftDetail.name}}</div>
        <div class="alert-gift">
          <div class="gift">
            <img src="../assets/img/alert/魔方.png" alt="">
          </div>
          <div class="gift-introduce">
            <p>
              {{giftDetail.text}}
              使用后可以在一天时间内隐藏，老师和同学都不会发现你的存在。
              这意味着你可以不用交作业了哦~~
            </p>
            <a>
              我要打印
            </a>
          </div>
        </div>
      </div>
    </alert-box>
    <public-top></public-top>
    <div class="con">
      <input type="search" class="search" placeholder="搜索">
      <div class="tab">
        <ul>
          <li v-for="(item,index) in tabs" :class="{ red:changeRed == index}" @click="change(index)">{{item.name}}</li>
        </ul>
      </div>
    </div>
    <div class="side-con">
      <div class="sidebar">
        <div v-for="(item, index) in shelves">
          <p class="shelves-name" @click="toggleBars(index, item)" :class="{active:index == nowIndex.index}">
            {{item.name}}</p>
          <ul v-if="nowIndex.index === index">
            <li class="children-text" v-for="(items, indexs) in item.children"
                :class="{change:indexs == nowIndex.indexs}" @click="changelist(index, indexs)">{{items.text}}
            </li>
          </ul>
        </div>
        <!--<ul v-for="( item, index ) in items" :class="{active:index == nowIndex}" @click="toggleBars(index)">-->
        <!--<li>{{item.text}}</li>-->
        <!--</ul>-->
        <!--<div class="divTab" v-show="nowIndex===0">-->
        <!--<ul>-->
        <!--<li v-for="(list, index) in lists" :class="{ change:changeList == index}" @click="changelist(index)">-->
        <!--{{list.text}}-->
        <!--</li>-->
        <!--</ul>-->
        <!--</div>-->
        <!--<div class="divTab" v-show="nowIndex===1">-->
        <!--<ul>-->
        <!--<li class="active">第一层</li>-->
        <!--</ul>-->
        <!--</div>-->
      </div>
      <div class="main-con">
        <!--<scroller lock-x height="200px" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom"-->
        <!--:scroll-bottom-offst="200" class="main-scroller">-->
        <div class="box2">
          <flexbox>
            <flexbox-item>
              <div class="flex-demo" v-for="">
                <div class="img" @click="showAlert('id')">
                  <img src="../assets/img/map/exchange_icon_-Checkers.png" alt="">
                </div>
                <p>跳棋</p>
                <div class="gold-num">
                  <i class="gold">
                    <img src="../assets/img/map/exchange_icon_-Tiger.png" alt="">
                  </i>
                  1200
                </div>
              </div>
            </flexbox-item>
            <flexbox-item>
              <div class="flex-demo">
                <div class="img">
                  <img src="../assets/img/map/exchange_icon_-Checkers.png" alt="">
                </div>
                <p>跳棋</p>
                <div class="gold-num">
                  <i class="gold">
                    <img src="../assets/img/map/exchange_icon_-Tiger.png" alt="">
                  </i>
                  1200
                </div>
              </div>
            </flexbox-item>
          </flexbox>
          <flexbox>
            <flexbox-item>
              <div class="flex-demo">1</div>
            </flexbox-item>
            <flexbox-item>
              <div class="flex-demo">2</div>
            </flexbox-item>
          </flexbox>
          <flexbox>
            <flexbox-item>
              <div class="flex-demo">1</div>
            </flexbox-item>
            <flexbox-item>
              <div class="flex-demo">2</div>
            </flexbox-item>
          </flexbox>
        </div>
        <!--</scroller>-->
      </div>
    </div>
  </div>
</template>
<script>
  // import { Base64 } from 'js-base64'
  import { Flexbox, FlexboxItem } from 'vux'
  import alertBox from '../components/alertBox'
  import publicTop from '../components/publicTop'

  export default {
    name: 'market',
    components: {
      Flexbox,
      FlexboxItem,
      alertBox,
      publicTop
    },
    data () {
      return {
        giftDetail: {
          name: '隐身斗篷',
          text: 'adasdadasda',
          img: ''
        },
        tabs: [
          // {text: '兑换机'},
          // {text: '礼品'},
          // {text: '道具'},
          // {text: '卡片'},
          // {text: 'AR拍照'}
        ],
        changeRed: 0,
        mrenxs: null,
        shelves: [
          {
            name: '左侧货架',
            id: 'left',
            children: [
              {text: '第一层', id: 'diyiceng', data: [{name: ''}]},
              {text: '第二层'},
              {text: '第三层'},
              {text: '第四层'},
              {text: '第五层'}
            ]
          },
          {
            name: '右侧货架',
            children: [
              {text: '第一层'}
            ]
          }
        ],
        nowIndex: {
          index: 1,
          indexs: 0
        },
        changeList: 0,
        data: [],
        dataArry: [],
        isAlertBox: false,
        alert: true
      }
    },
    methods: {
      change (index) {
        let that = this
        that.changeRed = index
      },
      toggleBars: function (index) {
        let that = this
        that.nowIndex.index = index
      },
      getData () {
        this.$http.get('/api/vendingMachineInventoryManage_listVendingMachineInventory.do?method=getMallItemsList', {
          params: {
            userid: 628830418,
            sid: 4,
            vendingmachineid: this.ven
          }
        }).then(res => {
          // 成功的状态
          let successCode = '0'
          //   // 失败的状态
          let errorCode = '1'
          console.log(res, '原始数据')
          let body = res.body
          console.log(body, '后台返回的数据')
          // 先判断状态
          // "code":返回状态码,"data":"应该业务数据","msg":"错误提示"
          // 所以我优先判断 code
          if (body.code === successCode) {
            // 处理数据
            this.dataArry = body.data
            console.log(this.dataArry, '888')
          } else if (body.code === errorCode) {
            // 处理失败
            console.log('错误提示：' + body.msg)
          }
        }, error => {
          //   // error callback
          console.log(error)
        })
      },
      changelist (index, indexs) {
        this.nowIndex.index = index
        this.nowIndex.indexs = indexs
        this.getData()
        // getData(this.shelves[index].id, this.shelves[index].children[indexs].id)
      },
      // getData (indexId, indexsId) {
      //   this.$http.get({
      //     url: ''
      //     data: {
      //       indexId: indexId,
      //       indexsId: indexsId
      //     }
      //     }
      //   )
      // },
      handleSidebar (name) {
        this.$router.push({path: '/' + name})
      },
      onHide () {
        console.log('on hide')
      },
      onShow () {
        console.log('on show')
      },
      showAlert (id) {
        this.isAlertBox = true
        // 使用父组件来控制子组件的显示
        // getGift () {
        //   this.$http.get(url,function () {
        //   })
        // }
        // this.giftDetail = this.data.
      }
    },
    created: function () {
      this.$http.get('/api/vendingmachinemanage_listVendingMachine.do?method=getVendingMachineList', {
        params: {
          // sid: 4, userid: 533422211, studentid: 222, malltypeid: 573, vendingmachineid: 1
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
          this.tabs = body.data
          for (let i = 0; i < this.tabs.length; i++) {
            // this.tads[i].name = Base64.decode(this.tads[i].name)
            // console.log(this.tabs[i].name, '22')
          }
          this.ven = this.tabs[0].vendingmachineid
          // console.log(this.ven, '345')
          // console.log(this.tabs, '1111')
          this.getData()
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
  .market {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-image: url("../assets/img/map/market-bg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  .con {
    margin-top: 1.8rem;
  }

  .search {
    border-radius: 5px;
    width: 90%;
    height: 20px;
    line-height: 20px;
    text-align: center;
    background-color: #fff;
    margin: 0 auto;
    margin-top: 10px;
    display: block;
    font-size: 12px;
  }

  .side-con {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    flex: 1;
    padding: 0 0.4rem;

  }

  .side-con .sidebar {
    width: 18%;
    overflow: hidden;
    padding-top: 0.2rem;
  }

  .side-con .sidebar .shelves-name {
    text-align: center;
    line-height: 45px;
    width: 100%;
    background-image: url("../assets/img/map/exchange_icon_you.png");
    background-size: 118% 100%;
    background-repeat: no-repeat;
  }

  .side-con .sidebar .active {
    color: #fff;
    background-image: url("../assets/img/map/exchange_icon_zuo2.png");
    background-size: 118% 100%;
    background-repeat: no-repeat;
    z-index: 999;
    text-shadow: 0 1px #9D4C4A, 1px 0 #9D4C4A, -1px 0 #9D4C4A, 0 -1px #9D4C4A;
  }

  .side-con .children-text {
    text-align: center;
    line-height: 45px;
    width: 100%;
    background-image: url("../assets/img/map/exchange_icon_zuo1.png");
    background-size: 118% 100%;
    color: #652411;
  }

  .side-con .change {
    color: #fff;
    background-image: url("../assets/img/map/exchange_icon_Selected.png");
    background-size: 118% 100%;
    background-repeat: no-repeat;
    text-shadow: 0 1px #9D4C4A, 1px 0 #9D4C4A, -1px 0 #9D4C4A, 0 -1px #9D4C4A;
  }

  .main-con {
    flex: 1;
    background-color: #F3EDD7;
    border-radius: 0.2rem;
    padding-top: 0.2rem;
    height: 84%;
    padding-left: 0.4rem;
    padding-right: 0.4rem;
    overflow-x: hidden;
    overflow-y: scroll;
  }

  .main-con::-webkit-scrollbar {
    display: none;
  }

  .vux-flexbox-item {
    height: 3.3rem;
    background-color: #E0CC95;
    border-radius: 0.16rem;
  }

  .tab ul li {
    background-image: url("../assets/img/map/a-market_button_n.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    margin-bottom: 0.2rem;
    font-weight: bold;
  }

  .tab .red {
    background-image: url("../assets/img/map/a-market_button_pre.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }

  .vux-flexbox {
    margin-bottom: 0.1rem;
  }

  .flex-demo .img {
    width: 1.65rem;
    height: 1.65rem;
    margin: 0.2rem auto 0;
  }

  .flex-demo .img img {
    width: 100%;
    height: 100%;
  }

  .flex-demo p {
    text-align: center;
    font-size: 0.28rem;
    margin-top: 0.25rem;
    color: #6b3a0f;
    font-weight: bold;
  }

  /* 金币数量 */
  .flex-demo .gold-num {
    background-image: url("../assets/img/map/exchange_icon_-shape.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    height: 0.6rem;
    line-height: 0.55rem;
    font-weight: bold;
    color: #fff;
    text-align: center;
    text-shadow: red;
    font-size: 0.32rem;
    margin-top: 0.1rem;
    position: relative;
    padding-left: 0.2rem;
  }

  .gold-num .gold {
    width: 0.5rem;
    height: 0.5rem;
    display: block;
    position: absolute;
    left: 0.2rem;
    top: 0;
  }

  .gold-num .gold img {
    width: 100%;
    height: 100%;
  }
</style>
