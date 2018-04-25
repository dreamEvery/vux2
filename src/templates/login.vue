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
          <!--v-on:input="YZphone(phone)"-->
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
          <input type="password" v-model="password" placeholder="密码"/>
          <!--v-on:input="YZpassword(password)-->
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
        <router-link to='/forget' class="forget-a">忘记密码?</router-link>
      </div>
      <button class="btn-login" type="button" @click="btn_type && login()">登录</button>
    </div>

    <div class="foot-firm">
      <h3>2015华亿教育(深圳)科技有限公司</h3>
      <h3>客服电话：4006-810-820</h3>
    </div>
  </div>
</template>

<script>
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
        forget: false
      }
    },
    created () {
      // console.log(this.$md5('Message').toString(), '加密例子')
    },
    methods: {
      YZphone (phone) {
        if (!phone) {
          this.phone_tips = '(../assets/img/notice.png)请输入账号'
        } else {
          this.phone_tips = ''
        }
      },
      YZpassword (password) {
        if (!password) {
          this.password_tips = '请输入密码'
        } else {
          this.password_tips = ''
        }
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
        this.$http.post('/api/userManage_loginUser.do?method=loginRoleForMobelV3', {
          username: that.phone,
          password: md5Password
        }).then(res => {
          // get body data
          let body = res.body
          that.data = body
          // console.log(that.data)
          if (body.error === '用户密码错误！') {
            that.password_tips = '密码错误!'
          }
          if (body.error === '该帐号没有注册 ') {
            that.phone_tips = '该帐号没有注册'
          }
          if (body.error === 'success') {
            that.btn_type = false
            for (let i = 0; i < that.data.userRoles.length; i++) {
              if (that.data.userRoles.length === 1 && that.data.userRoles[i].roleFlag === 'T') {
                alert('教师不能登录')
              }
              if (that.data.userRoles[i].roleFlag === 'P' && that.data.userRoles[i].status === '1') {
                that.roleid = that.data.userRoles[i].roleid
                this.$http.post('/api/userManage_loginUser.do?method=userLoginForMobel', {
                  username: that.phone,
                  password: md5Password,
                  roleid: that.roleid
                }).then(res => {
                  // get body data
                  let body = res.body
                  that.data = body
                  let userInfo = {
                    sid: that.data.sid,
                    userid: that.data.userid,
                    studentid: that.data.stuid,
                    name: that.data.name,
                    classname: that.data.classname
                  }
                  let objInfo = JSON.stringify(userInfo)
                  sessionStorage.setItem('info', objInfo)
                  console.log(userInfo, '233')
                }, response => {
                  // error callback
                  alert('密码错误')
                })
              }
            }
            that.btn_type = false
            alert('登录成功')
            that.$router.push({   // 你需要接受路由的参数再跳转
              path: '/home/index'
            })
          }
        }, response => {
          alert('密码错误')
        })
      }
    }
  })
</script>

<style>
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
  }

  .btn-login,
  .btn-register {
    height: 0.72rem;
    border-radius: 0.36rem;
    text-align: center;
    display: block;
    margin: 0 auto;
    margin-top: 0.6rem;
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
    border: 1px solid #ccc;
    padding: 0.16rem;
    margin-bottom: 0.2rem;
    overflow: hidden;
    background: #EBEBEB;
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
    background: #EBEBEB;
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
    position: fixed;
    bottom: 0.2rem;
    width: 100%;
    text-align: center;
  }

  .foot-firm h3 {
    font-size: 0.24rem;
  }

  /*!*忘记密码*!*/

  /*.yz-tips {*/
  /*color: #f00;*/
  /*height: 0.48rem;*/
  /*line-height: 0.48rem;*/
  /*font-size: 0.24rem;*/
  /*text-align: left;*/
  /*padding-left: 1.48rem;*/
  /*}*/

  /*.btn-next,.btn-tijiao{*/
  /*width: 80%;*/
  /*height: 0.72rem;*/
  /*border: 1px solid #7F7F7F;*/
  /*border-radius: 0.12rem;*/
  /*text-align: center;*/
  /*background: #fff;*/
  /*margin: 0 auto;*/
  /*margin-top: 0.4rem;*/
  /*display: block;*/
  /*}*/

  /*.nav-step {*/
  /*height: 1rem;*/
  /*line-height: 1rem;*/
  /*border-bottom: 1px solid #ccc;*/
  /*padding: 0 0.6rem;*/

  /*.nav-step1 {*/
  /*text-align: left;*/
  /*}*/
  /*.nav-step2 {*/
  /*text-align: center;*/
  /*}*/
  /*.nav-step3 {*/
  /*text-align: right;*/
  /*}*/
  /*.nav-step-active {*/
  /*color: #3333CC;*/
  /*}*/
  /*}*/

  /*.form-yz {*/
  /*background: #fff;*/
  /*padding: 0 0.4rem;*/
  /*height: 1.08rem;*/
  /*.form-yz-div {*/
  /*border-bottom: 1px solid #ccc;*/
  /*overflow: hidden;*/
  /*height: 0.6rem;*/
  /*line-height: 0.6rem;*/
  /*}*/
  /*span {*/
  /*float: left;*/
  /*width: 1.28rem;*/
  /*font-weight: 600;*/
  /*color: #333;*/
  /*}*/
  /*input {*/
  /*width: 75%;*/
  /*height: 0.6rem;*/
  /*line-height: 0.6rem;*/
  /*border: none;*/
  /*}*/
  /*}*/
  /*.form-yz:first-child{*/
  /*padding-top: 0.2rem;*/
  /*}*/
  /*.form-yz:last-child{*/
  /*padding-bottom: 0.2rem;*/
  /*}*/
  /*.yzm-div {*/
  /*position: relative;*/
  /*.yzm-btn {*/
  /*position: absolute;*/
  /*right: 0;*/
  /*top: 0.1rem;*/
  /*height: 0.4rem;*/
  /*font-size: 0.24rem;*/
  /*background: none;*/
  /*}*/
  /*}*/


</style>
