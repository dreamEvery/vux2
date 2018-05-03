<template>
  <div class="password">
    <div class="phoneNum">
      <input type="text" placeholder="请输入手机号码" v-model="phoneNum">
      <p class="falseHints" v-if="show"><span>
          <i>
            <img src="../assets/img/notice.png" alt="">
          </i>
           请输入正确的手机号码
        </span>
      </p>
    </div>
    <div class="verificationCode">
      <input type="text" placeholder="请输入验证码" v-model="verificationNum">
      <button class="codeBtn" @click="getVerifyCode" :disabled="disabled">{{btnText}}</button>
      <p class="falseHints" v-if="num"><span>
          <i>
            <img src="../assets/img/notice.png" alt="">
          </i>
           验证码不正确
        </span>
      </p>
    </div>
    <div class="next">
      <rout-link class="nextBtn" :to="{path:'/Numpassword',params:{phone: phoneNum}}">
        <button @click="next">下一步</button>
      </rout-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default ({
    name: 'password',
    data () {
      return {
        phoneNum: '',
        verificationNum: '',
        show: false,
        num: false,
        disabled: false,
        btnText: '获取验证码'
      }
    },
    created () {
    },
    methods: {
      next () {
        let myReg = /^[1][3,4,5,7,8][0-9]{9}$/
        if (this.phoneNum === '' || !myReg.test(this.phoneNum)) {
          this.show = true
        } else if (this.verificationNum === '' || this.verificationNum === true) {
          this.num = true
        } else {
          this.getVerifyCode()
        }
      },
      getVerifyCode () {
        this.$http.post('/api/userManage_loginUser.do?method=retPassWord',
          {num: this.phoneNum}
        ).then(res => {
          // get body data
          this.disabled = true
          let time = 30
          let timer = setInterval(() => {
            if (time <= 0) {
              this.disabled = false
              this.btnText = '重新获取验证码'
              clearInterval(timer)
            } else {
              this.btnText = time + 's'
              time--
            }
          }, 1000)
        }, res => {
          // error callback
          console.log('error.message')
          this.disabled = false
        })
      }
    }
  })
</script>

<style scoped>
  body {
    background-color: #EAEAEA;
  }

  .password {
    padding-top: 0.8rem;
    padding-left: 0.4rem;
    padding-right: 0.4rem;
  }

  /*.password div {*/
    /*text-align: center;*/
  /*}*/

  .password input {
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
  .next .nextBtn{display: block;}
  .next button {
    margin-top: 1.2rem;
    background-color: #FD8A32;
    color: #fff;
    border: none;
    font-size: 0.32rem;
  }

  .verificationCode {
    font-size: 0;
  }

  .verificationCode input {
    width: 64%;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    float: left;display: block;
  }

  .verificationCode .codeBtn {
    display: inline-block;
    font-size: 0.30rem;
    background-color: #ff5858;
    color: #fff;
    width: 36%;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    padding-left: 0;
    border: none;
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
