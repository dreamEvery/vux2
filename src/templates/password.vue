<template>
  <div class="newPassword">
    <heared></heared>
    <div class="newPassword-con">
      <div class="newNum">
        <input type="password" v-model="newNum" placeholder="新的密码">
      </div>
      <div class="againNum">
        <input type="password" v-model="confirm" placeholder=" 确认密码">
        <p class="falseHints" v-if="num"><span>
          <i>
            <img src="../assets/img/notice.png" alt="">
          </i>
           两次密码不一样
        </span>
        </p>
      </div>
      <div class="submission">
        <button @click="submission">提交</button>
      </div>
    </div>
  </div>
</template>
<script>
  import heared from '../components/heared'
  export default ({
    name: 'newPassword',
    data () {
      return {
        newNum: '',
        confirm: '',
        num: false
      }
    },
    components: {
      heared
    },
    created () {
    },
    methods: {
      // 验证两次密码
      submission () {
        if (this.newNum === this.confirm) {
          this.num = false
        } else if (this.newNum !== this.confirm) {
          this.num = true
        } else {
          this.num = false
          this.getNewCode()
        }
      },
      //  提交新密码
      getNewCode () {
        let num = this.$route.params.phoneNum
        console.log(num)
        this.$http.post(this.HOST + '/userManage_loginUser.do?method=validMessage',
          {phone: num, password: this.newNum}
        ).then(res => {
          // get body data
          this.$router.push({
            path: '/login'
          })
        }, res => {
          // error callback
          alert('请重新修改密码')
        })
      }
    }
  })
</script>

<style scoped>
  body {
    background-color: #EAEAEA;
  }
  /*.password div {*/
  /*text-align: center;*/
  /*}*/
  .newPassword-con{
    padding: 1rem 0.4rem
  }
  .newNum input {
    margin-bottom: 0.3rem
  }

  input, button {
    width: 100%;
    height: 1rem;
    border-radius: 0.6rem;
    background-color: #fff;
  }

  input {
    padding-left: 14px;
  }

  .submission button {
    margin-top: 1.2rem;
    background-color: #FD8A32;
    color: #fff;
    border: none;
    font-size: 0.32rem;
  }
  .falseHints span {
    font-size: 0.24rem;
    color: red;
  }

  .falseHints i {
    display: inline-block;
    width: 0.2rem;
    height: 0.2rem;
    vertical-align: middle;
    margin-top: -0.1rem;
  }
</style>
