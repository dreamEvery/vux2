<template>
  <div class="newPassword">
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
</template>

<script>
  export default ({
    name: 'newPassword',
    data () {
      return {
        newNum: '',
        confirm: '',
        num: false
      }
    },
    created () {
    },
    methods: {
      submission () {
        if (this.newNum === this.confirm) {
          this.show = false
        } else if (this.newNum !== this.confirm) {
          this.num = true
        } else {
          this.getVerifyCode()
        }
      },
      getVerifyCode () {
        let num = this.$route.params.phone
        console.log(num)
        this.$http.post('/api/userManage_loginUser.do?method=validMessage',
          {num: num, newPassword: this.newNum}
        ).then(res => {
          // get body data
          this.$router.push({    // 你需要接受路由的参数再跳转
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

  .newPassword {
    padding-top: 0.8rem;
    padding-left: 0.4rem;
    padding-right: 0.4rem;
  }

  /*.password div {*/
  /*text-align: center;*/
  /*}*/

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
