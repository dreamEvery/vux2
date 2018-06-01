<template>
  <div class="password">
    <heared></heared>
    <div class="password-con">
      <div class="phoneNum">
        <input type="text" placeholder="请输入手机号码" v-model="phoneNum" maxlength="11">
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
        <button class="codeBtn" :disabled="disabled" @click="getVerifyCode">{{btnText}}</button>
        <p class="falseHints" v-if="num"><span>
          <i>
            <img src="../assets/img/notice.png" alt="">
          </i>
           验证码不正确
        </span>
        </p>
      </div>
      <div class="next">
        <button @click="next" :disabled="!phoneNum || !verificationNum" :class="{bgColor:(!phoneNum || !verificationNum)}">下一步</button>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import heared from '../components/heared'

  export default ({
    name: 'password',
    data () {
      return {
        phoneNum: '',
        verificationNum: '',
        show: false,
        num: false,
        disabled: false,
        btnText: '获取验证码',
        timer: '',
        sendCode: ''
      }
    },
    components: {
      heared
    },
    created () {
    },
    methods: {
      // 验证手机号码
      isPhone: function (tel) {
        const str = [134, 135, 136, 137, 138, 139, 147, 150, 151, 152, 157, 158, 159, 182, 183, 187, 188, 198, 130, 131, 132, 155, 156, 185, 186, 145, 166, 133, 153, 180, 189, 181, 199, 170].join('|')
        const reg = new RegExp(`^(${str})\\d{8}`, 'gi')
        return reg.test(tel)
      },
      // 验证验证码
      isCode: function (code) {
        const reg = /\d{4}$/
        return reg.test(code)
      },
      // 获取验证码
      time: function () {
        this.disabled = true
        let time = 60
        this.timer = setInterval(() => {
          if (time <= 0) {
            this.disabled = false
            this.btnText = '重新获取验证码'
            clearInterval(this.timer)
          } else {
            this.btnText = time + 's'
            time--
          }
        }, 1000)
      },
      // 验证验证码
      next () {
        if (this.verificationNum !== this.sendCode){
          this.num = true
        } else {
          this.disabled = !this.disabled
          this.$router.push({path: '/newpassword', query: {phoneNum: this.phoneNum}})
        }
      },
      // 验证手机号发送验证码
      getVerifyCode () {
        if (this.isPhone(this.phoneNum)) {
          this.$http.post(this.HOST + '/userManage_loginUser.do?method=checkUserNameAndValidMessage',
            {phone: this.phoneNum}
          ).then(res => {
            // get body data
            let body = res.body
            if (body.error === 'fail') {
              alert('手机号未注册')
            } else {
              this.time()
              this.sendCode = body.sendcode
              console.log(this.sendCode, '334')
            }
          }, res => {
            // error callback
            this.disabled = false
          })
        } else {
           this.show = true
        }
      }
    }
  })
</script>

<style scoped>
  body {
    background-color: #EAEAEA;
  }

  .password {
    background-color: #efeff3;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
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

  .password-con {
    padding: 1rem 0.4rem
  }

  input {
    padding-left: 14px;
  }

  .next .nextBtn {
    display: block;
  }

  .next button {
    margin-top: 1.2rem;
    background-color: #FD8A32;
    color: #fff;
    border: none;
    font-size: 0.32rem;
  }
  .next .bgColor {
    background-color: chocolate;
  }

  .verificationCode {
    font-size: 0;
  }

  .verificationCode input {
    width: 64%;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    float: left;
    display: block;
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
