<template>
  <div class="market">
    <alert-box v-if='isAlertBox' :showName="'isAlertBox'" :type="'market'" :transmission="giftDetail">
      <div slot="market">
        <div class="alert-top">{{giftDetail.mallitemsname}}</div>
        <div class="alert-gift">
          <div class="gift">
            <img :src=giftDetail.picsummary  alt="">
          </div>
          <div class="gift-introduce">
              <p>{{giftDetail.content}}
              </p>
          </div>
        </div>
      </div>
    </alert-box>
    <public-top></public-top>
    <div class="con">
      <div class="tab">
        <ul>
          <li :class="{active:tabsActive===index}" v-for="(item, index) in rawDataTabs" :key="item.id"
              @click="switchTabs(index, item.vendingmachineid)">
            {{item.name}}
          </li>
        </ul>
      </div>
    </div>
    <div class="side-con">
      <div class="sidebar">
        <div v-for="(item, index) in rawData" :key="item.id">
          <p class="shelves-name" @click="toggleBars(index, item)" :class="{active:index == nowIndex.index}">
            {{item.isleft===1?'左侧货架':'右侧货架'}}</p>
          <ul v-if="nowIndex.index === index">
            <li class="children-text" v-if="item" v-for="(items, indexs) in item.sidedata"
                :class="{change:indexs == nowIndex.indexs}" @click="changelist(index, indexs)">{{items.floor | capitalize}}
            </li>
          </ul>
        </div>
      </div>
      <div class="main-con">
        <!--<scroller lock-x height="200px" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom"-->
        <!--:scroll-bottom-offst="200" class="main-scroller">-->
        <div class="box2" v-if="rawData[nowIndex.index]">
            <div class="flexbox" v-if="rawData[nowIndex.index].sidedata[nowIndex.indexs]"
                          v-for="item in rawData[nowIndex.index].sidedata[nowIndex.indexs].malldata" :key="item.id">
              <div class="flex-demo">
                <div class="img" @click="showAlert(item)">
                  <img :src=item.picsummary  alt="">
                </div>
                <p>{{item.mallitemsname}}</p>
                <div class="gold-num">
                  <i class="gold">
                    <img src="../assets/img/map/exchange_icon_-Tiger.png" alt="">
                  </i>
                  {{item.integral}}
                </div>
              </div>
            </div>
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
        giftDetail: {},
        tabs: [],
        tabsActive: 0,
        mrenxs: null,
        sideData: [],
        nowIndex: {
          index: 1,
          indexs: 0
        },
        changeList: 0,
        isAlertBox: false,
        alert: true,
        rawDataTabs: [],
        rawData: {}
      }
    },
    filters: {
      capitalize: function (value) {
      }
    },
    methods: {
      switchTabs (index, id) {
        let that = this
        that.tabsActive = index
        this.getMallItemsList(id)
        this.nowIndex = {
          index: 1,
          indexs: 0
        }
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
      // base64
      transcoding () {
        for (let i = 0; i < this.rawData.length; i++) {
          for (let j = 0; j < this.rawData[i].sidedata.length; j++) {
            if (this.rawData[i].sidedata[j].malldata.length) {
              for (let k = 0; k < this.rawData[i].sidedata[j].malldata.length; k++) {
                this.rawData[i].sidedata[j].malldata[k].mallitemsname = Base64.decode(this.rawData[i].sidedata[j].malldata[k].mallitemsname)
                this.rawData[i].sidedata[j].malldata[k].content = Base64.decode(this.rawData[i].sidedata[j].malldata[k].content)
              }
            }
          }
        }
      },
      // 获取 tabs 数据
      getTabs () {
        // TODO: 在这里调用 api /api/vendingmachinemanage_listVendingMachine.do?method=getVendingMachineList
        let storageMessage = JSON.parse(sessionStorage.getItem('info'))
        console.log(storageMessage, '34567')
        this.$http.get(this.HOST + '/vendingmachinemanage_listVendingMachine.do?method=getVendingMachineList', {
          params: storageMessage
        }).then(res => {
          // 成功的状态
          let successCode = 0
          // 失败的状态
          let errorCode = 1
          let body = res.body
          // console.log(body, '后台返回的tab数据')
          // 先判断状态
          if (body.code === successCode) {
            // 处理数据
            this.rawDataTabs = body.data
            this.rawDataTabs.map((value) => {
              value.name = Base64.decode(value.name)
            })
            this.getMallItemsList(this.rawDataTabs[0].vendingmachineid)
          } else if (body.code === errorCode) {
            // 处理失败
            console.log('错误提示：' + body.msg)
          }
        }, error => {
          // error callback
          console.log(error)
        })
      },
      // 获取底部数据
      getMallItemsList (id) {
        let storageMessage = JSON.parse(sessionStorage.getItem('info'))
        let userid = storageMessage.userid
        let sid = storageMessage.sid
        this.$http.get(this.HOST + '/vendingMachineInventoryManage_listVendingMachineInventory.do?method=getMallItemsList', {
          params: {
            userid: userid,
            sid: sid,
            vendingmachineid: id
          }
        }).then(res => {
          // 成功的状态
          let successCode = '0'
          // 失败的状态
          let errorCode = '1'
          let body = res.body
          // 先判断状态
          // "code":返回状态码,"data":"应该业务数据","msg":"错误提示"
          // 所以我优先判断 code
          if (body.code === successCode) {
            // 处理数据
            this.rawData = body.data
            // base64
            this.transcoding()
          } else if (body.code === errorCode) {
            // 处理失败
            console.log('错误提示：' + body.msg)
          }
        }, error => {
          //   // error callback
          console.log(error)
        })
      },
      onHide () {
        console.log('on hide')
      },
      onShow () {
        console.log('on show')
      },
      showAlert (item) {
        this.giftDetail = item
        this.isAlertBox = true
      }
    },
    created: function () {
      this.getTabs()
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

  /*.search {*/
    /*border-radius: 5px;*/
    /*width: 90%;*/
    /*height: 20px;*/
    /*line-height: 20px;*/
    /*text-align: center;*/
    /*background-color: #fff;*/
    /*margin: 0 auto;*/
    /*margin-top: 10px;*/
    /*display: block;*/
    /*font-size: 12px;*/
  /*}*/

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

  .flexbox {
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
    padding: 0 0.07rem;
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
