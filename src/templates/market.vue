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
          <li :class="{active:tabsActive===index}" v-for="(item, index) in rawDataTabs" @click="switchTabs(index)">
            {{item.name}}
          </li>
        </ul>
      </div>
    </div>
    <div class="side-con">
      <div class="sidebar">
        <div v-for="(item, index) in rawData.data">
          <p class="shelves-name" @click="toggleBars(index, item)" :class="{active:index == nowIndex.index}">
            {{item.isleft===1?'左侧货架':'右侧货架'}}</p>
          <ul v-if="nowIndex.index === index">
            <li class="children-text" v-for="(items, indexs) in item.sidedata"
                :class="{change:indexs == nowIndex.indexs}" @click="changelist(index, indexs)">{{items.floor}}
            </li>
          </ul>
        </div>
      </div>
      <div class="main-con">
        <!--<scroller lock-x height="200px" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom"-->
        <!--:scroll-bottom-offst="200" class="main-scroller">-->
        <div class="box2">
          <flexbox>
            <flexbox-item :span="0.5" v-for="item in rawData.data[nowIndex.index].sidedata[nowIndex.indexs].malldata">
              <div class="flex-demo">
                <div class="img" @click="showAlert('id')">
                  <img src="../assets/img/map/exchange_icon_-Checkers.png" alt="">
                </div>
                <p>{{item.mallitemsname}}</p>
                <div class="gold-num">
                  <i class="gold">
                    <img src="../assets/img/map/exchange_icon_-Tiger.png" alt="">
                  </i>
                  {{item.integral}}
                </div>
              </div>
            </flexbox-item>
          </flexbox>
        </div>
        <!--</scroller>-->
      </div>
    </div>
  </div>
</template>
<script>
  import { Base64 } from 'js-base64'
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
        tabs: [],
        tabsActive: 0,
        mrenxs: null,
        sideData: [],
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
        dataArry: [],
        dataMain: [],
        isAlertBox: false,
        alert: true,
        rawDataTabs: [
          {id: 1, name: '兑换机1'},
          {id: 2, name: '兑换机2'},
          {id: 3, name: '兑换机3'},
          {id: 4, name: '兑换机4'},
          {id: 5, name: '兑换机5'}
        ],
        rawData: {
          'data': [{
            'isleft': 1,
            'sidedata': [
              {
                'floor': 1,
                'malldata': [
                  {
                    'content': '6L+Z5piv5LiA5byg5Y2h54mH', // 礼品说明
                    // 'col': 9, // 列数
                    'mallitemsname': '第一层第一个', // 礼品名称
                    // 'floor': 1, // 层数
                    // 'isleft': '1', // 1：左边 0：右边
                    'mallitemsid': 4, // 礼品id
                    'picsummary': 'http://hyjy.oss-cn-shenzhen.aliyuncs.com/4/731353944/image/20180306/20180306161754727694.jpg', // 图片
                    'integral': 3 // 所需积分
                  }, {
                    'content': '6L+Z5piv5LiA5byg5Y2h54mH', // 礼品说明
                    // 'col': 9, // 列数
                    'mallitemsname': '第一层第二个', // 礼品名称
                    // 'floor': 1, // 层数
                    // 'isleft': '1', // 1：左边 0：右边
                    'mallitemsid': 4, // 礼品id
                    'picsummary': 'http://hyjy.oss-cn-shenzhen.aliyuncs.com/4/731353944/image/20180306/20180306161754727694.jpg', // 图片
                    'integral': 3 // 所需积分
                  }, {
                    'content': '6L+Z5piv5LiA5byg5Y2h54mH', // 礼品说明
                    // 'col': 9, // 列数
                    'mallitemsname': '第一层第三个', // 礼品名称
                    // 'floor': 1, // 层数
                    // 'isleft': '1', // 1：左边 0：右边
                    'mallitemsid': 4, // 礼品id
                    'picsummary': 'http://hyjy.oss-cn-shenzhen.aliyuncs.com/4/731353944/image/20180306/20180306161754727694.jpg', // 图片
                    'integral': 3 // 所需积分
                  }
                ]
              },
              {
                'floor': 2,
                'malldata': [
                  {
                    'content': '6L+Z5piv5LiA5byg5Y2h54mH', // 礼品说明
                    // 'col': 9, // 列数
                    'mallitemsname': '第二层第一个', // 礼品名称
                    // 'floor': 1, // 层数
                    // 'isleft': '1', // 1：左边 0：右边
                    'mallitemsid': 4, // 礼品id
                    'picsummary': 'http://hyjy.oss-cn-shenzhen.aliyuncs.com/4/731353944/image/20180306/20180306161754727694.jpg', // 图片
                    'integral': 3 // 所需积分
                  }, {
                    'content': '6L+Z5piv5LiA5byg5Y2h54mH', // 礼品说明
                    // 'col': 9, // 列数
                    'mallitemsname': '第二层第二个', // 礼品名称
                    // 'floor': 1, // 层数
                    // 'isleft': '1', // 1：左边 0：右边
                    'mallitemsid': 4, // 礼品id
                    'picsummary': 'http://hyjy.oss-cn-shenzhen.aliyuncs.com/4/731353944/image/20180306/20180306161754727694.jpg', // 图片
                    'integral': 3 // 所需积分
                  }, {
                    'content': '6L+Z5piv5LiA5byg5Y2h54mH', // 礼品说明
                    // 'col': 9, // 列数
                    'mallitemsname': '第二层第三个', // 礼品名称
                    // 'floor': 1, // 层数
                    // 'isleft': '1', // 1：左边 0：右边
                    'mallitemsid': 4, // 礼品id
                    'picsummary': 'http://hyjy.oss-cn-shenzhen.aliyuncs.com/4/731353944/image/20180306/20180306161754727694.jpg', // 图片
                    'integral': 3 // 所需积分
                  }
                ]
              }
            ]
          }, {
            'isleft': 0,
            'sidedata': [{
              'floor': 1,
              'malldata': []
            }]
          }],
          'code': '0',
          'datatype': [{
            'istakepictures': 2,
            'typeid': 1,
            'name': '5Yqo54mp'
          }, {
            'istakepictures': 1,
            'typeid': 2,
            'name': '6YGT5YW3'
          }, {
            'istakepictures': 1,
            'typeid': 3,
            'name': '5Y2h54mH'
          }, {
            'istakepictures': 1,
            'typeid': 7,
            'name': 'c2RmYXNk'
          }],
          'msg': ''
        }
      }
    },
    methods: {
      switchTabs (index) {
        let that = this
        that.tabsActive = index
        this.getMallItemsList('传入id')
      },
      toggleBars: function (index) {
        let that = this
        that.nowIndex.index = index
      },
      // 切换 货架层数
      changelist (index, indexs) {
        this.nowIndex.index = index
        this.nowIndex.indexs = indexs
      },
      // 获取 tabs 数据
      getTabs (id) {
        // TODO: 在这里调用 api /api/vendingmachinemanage_listVendingMachine.do?method=getVendingMachineList
        // this.rawDataTabs = 你接口获取
        this.getMallItemsList('默认传入第一个id')
      },
      // 获取底部数据
      getMallItemsList (id) {
      },
      onHide () {
        console.log('on hide')
      },
      onShow () {
        console.log('on show')
      },
      showAlert (id) {
        this.isAlertBox = true
      }
    },
    created: function () {
      this.getTabs('获取到的id传进去')

      // let storageMessage = JSON.parse(sessionStorage.getItem('info'))
      // console.log(storageMessage, '34567')
      // this.$http.get('/api/vendingmachinemanage_listVendingMachine.do?method=getVendingMachineList', {
      //   params: storageMessage
      // }).then(res => {
      //   // 成功的状态
      //   let successCode = 0
      //   // 失败的状态
      //   let errorCode = 1
      //   console.log(res, '原始数据')
      //   let body = res.body
      //   console.log(body, '后台返回的数据')
      //   // 先判断状态
      //   if (body.code === successCode) {
      //     // 处理数据
      //     this.tabs = body.data
      //     this.tabs.map((value) => {
      //       value.name = Base64.decode(value.name)
      //     })
      //     this.ven = this.tabs[0].vendingmachineid
      //     this.$http.get('/api/vendingMachineInventoryManage_listVendingMachineInventory.do?method=getMallItemsList', {
      //       params: {
      //         userid: 628830418,
      //         sid: 4,
      //         vendingmachineid: this.ven
      //       }
      //     }).then(res => {
      //       // 成功的状态
      //       let successCode = '0'
      //       //   // 失败的状态
      //       let errorCode = '1'
      //       console.log(res, '原始数据')
      //       let body = res.body
      //       console.log(body, '后台返回的数据')
      //       // 先判断状态
      //       // "code":返回状态码,"data":"应该业务数据","msg":"错误提示"
      //       // 所以我优先判断 code
      //       if (body.code === successCode) {
      //         // 处理数据
      //         this.dataArry = body.data
      //         console.log(this.dataArry, '888')
      //         for (let i = 0; i < this.dataArry.length; i++) {
      //           this.dataMain = this.dataArry[i].sidedata
      //           for (let i = 0; i < this.dataMain.length; i++) {
      //             // console.log(this.dataMain[i].malldata, '111')
      //           }
      //         }
      //       } else if (body.code === errorCode) {
      //         // 处理失败
      //         console.log('错误提示：' + body.msg)
      //       }
      //     }, error => {
      //       //   // error callback
      //       console.log(error)
      //     })
      //   } else if (body.code === errorCode) {
      //     // 处理失败
      //     console.log('错误提示：' + body.msg)
      //   }
      // }, error => {
      //   // error callback
      //   console.log(error)
      // })
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
    height: 84%;
    overflow-y: scroll;
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

  .tab .active {
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
