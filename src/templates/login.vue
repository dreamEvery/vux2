<template>
  <div>
    <div class="login-img">
      <img src="../assets/img/map/icon.png" alt="logo">
    </div>
    <div class="form-login">
      <div class="form-div">
        <div>
          <img src="../assets/img/map/icon_phone.png"/>
          <input type="text" v-model="phone" placeholder="账号" maxlength="11"/>
        </div>
        <p class="form-errTips" v-if="show"><span>
          <i>
            <img src="../assets/img/notice.png" alt="">
          </i>
           请输入账号
        </span>
        </p>
      </div>
      <div class="form-div">
        <div>
          <img src="../assets/img/map/icon_password.png"/>
          <input type="password" v-model="password"  placeholder="密码" />
        </div>
        <p class="form-errTips" v-if="forget"><span>
           <i>
            <img src="../assets/img/notice.png" alt="">
          </i>
           请输入密码
        </span></p>
      </div>
      <div class="forget-div">
        <!--<router-link to='/register' class="register-a">去注册</router-link>-->
        <router-link to='/forgetPassword' class="forget-a">忘记密码?</router-link>
      </div>
      <button class="btn-login" type="button" @click="btn_type && login()">登录</button>
    </div>
    <div class="foot-firm">
      <h3>2015华亿教育(深圳)科技有限公司</h3>
      <h3>客服电话：4006-810-820</h3>
    </div>
    <div>
      <cell @click.native="showModuleAuto" is-link></cell>
    </div>
  </div>
</template>

<script>
  import { AlertModule, Cell } from 'vux'
  export default ({
    name: 'login',
    data () {
      return {
        phone: '',
        phone_tips: '', /* 账号错误提示 */
        password: '',
        password_tips: '', /* 密码错误提示 */
        btn_type: true,
        data: [],
        show: false,
        forget: false,
        userMess: ''
      }
    },
    components: {
      AlertModule,
      Cell
    },
    created () {
      // console.log(this.$md5('Message').toString(), '加密例子')
      this.userMess = JSON.parse(localStorage.getItem('user'))
      console.log(JSON.parse(localStorage.getItem('user')), '9999999')
      this.phone = this.userMess.username
      this.password = this.userMess.password
    },
    methods: {
      showModuleAuto () {
        this.showModule()
        setTimeout(() => {
          AlertModule.hide()
        }, 3000)
      },
      login () {
        if (this.phone === '') {
          this.show = true
        } else if (this.password === '') {
          this.forget = true
        } else {
          this.getPost()
        }
      },
      getPost () {
        let that = this
        let md5Password = this.$md5(that.password).toString()
        this.$http.post(this.HOST + '/userManage_loginUser.do?method=loginRoleForMobelV3', {
          username: that.phone,
          password: md5Password
        }).then(res => {
          // get body data
          let userMess = {username: that.phone, password: that.password}
          localStorage.setItem('user', JSON.stringify(userMess))
          let body = res.body
          that.data = body
          if (body.error !== 'success') {
            this.$vux.alert.show({
              content: body.error,
              onShow () {
                console.log('Plugin: I\'m showing')
              },
              onHide () {
                console.log('Plugin: I\'m hiding')
              }
            })
          }
          if (body.error === 'success') {
            that.btn_type = false
            for (let i = 0; i < that.data.userRoles.length; i++) {
              if (that.data.userRoles.length === 1 && that.data.userRoles[i].roleFlag === 'T') {
                alert('教师不能登录')
              }
              if (that.data.userRoles[i].roleFlag === 'P' && that.data.userRoles[i].status === '1') {
                that.roleid = that.data.userRoles[i].roleid
                this.$http.post(this.HOST + '/userManage_loginUser.do?method=userLoginForMobel', {
                  username: that.phone,
                  password: md5Password,
                  roleid: that.roleid
                }).then(res => {
                  // get body data
                  let body = res.body
                  that.data = body
                  let userInfo = {
                    sid: that.data.students[i].sid,
                    userid: that.data.userid,
                    studentid: that.data.students[i].id,
                    name: that.data.students[i].name,
                    classname: that.data.students[i].classname,
                    school: that.data.students[i].school
                  }
                  let objInfo = JSON.stringify(userInfo)
                  sessionStorage.setItem('info', objInfo)
                }, response => {
                  // error callback
                  alert(this.body.error)
                })
              }
            }
            that.btn_type = false
            that.$router.push({   // 你需要接受路由的参数再跳转
              path: '/home/index'
            })
          }
        }, response => {
          alert(this.body)
        })
      }
    }
  })
</script>

<style scoped>
  body {
    background: #f2f2f2;
  }

  /*登录注册*/
  .login-img,
  .register-img {
    width: 1.8rem;
    height: 1.8rem;
    margin: 1.2rem auto 0.8rem;
    text-align: center;
  }

  .register-img img {
    width: 100%;
    height: 100%;
  }

  .btn-login,
  .btn-register,
  .form-div,
  .forget-div {
    width: 63%;
    margin: 0 auto;
    overflow: hidden;
    border: none;
  }

  .btn-login {
    background-color: #FD8A32;
    color: #ffffff;
    font-size: 0.28rem;
    font-weight: normal;
    letter-spacing: 0.05rem;
  }

  .btn-login,
  .btn-register {
    height: 0.72rem;
    border-radius: 0.36rem;
    text-align: center;
    display: block;
    margin: 0 auto;
    margin-top: 1.4rem;
  }

  .form-errTips span {
    font-size: 0.24rem;
    color: red;
  }

  .form-errTips i {
    display: inline-block;
    width: 0.2rem;
    height: 0.2rem;
    vertical-align: middle;
    margin-top: -0.1rem;
  }

  .form-div {
    margin: 0.08rem auto;
  }

  .form-div div {
    padding: 0.16rem;
    margin-bottom: 0.2rem;
    overflow: hidden;
    border-bottom: 1px solid #d2d2d2;
    padding-left: 0;
  }

  .form-div div img {
    float: left;
    width: 0.4rem;
    height: 0.4rem;
    vertical-align: middle;
  }

  .form-div div input {
    float: left;
    height: 0.4rem;
    margin-left: 0.2rem;
    background: none;
    border: none;
    width: 80%;
  }

  .register-a {
    float: left;
    font-size: 0.24rem;
  }

  .forget-a {
    float: right;
    font-size: 0.24rem;
    color: #FD8A32;
  }

  .foot-firm {
    width: 100%;
    text-align: center;
    color: #666666;
    margin-top: 56%;
  }

  .foot-firm h3 {
    font-size: 0.24rem;
    font-weight: normal;
    margin-bottom: 0.14rem;
  }
  ::-webkit-input-placeholder { /* WebKit browsers */
    color: #c3c2c9;
  }
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #c3c2c9;
  }
  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #c3c2c9;
  }
  :-ms-input-placeholder { /* Internet Explorer 10+ */
    color: #c3c2c9;
  }
</style>
