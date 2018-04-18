<template>
  <div>
    <div class="login-img">
      <img src="../assets/img/Game_img_adventure.png" alt="" />
    </div>
    <div class="form-login">
      <div class="form-div">
        <div>
          <img src="../assets/img/my_img_number.png"/>
          <input type="text" v-model="phone" placeholder="账号" maxlength="11"/>
          <!--v-on:input="YZphone(phone)"-->
        </div>
        <p class="form-errTips"><span>{{phone_tips}}</span></p>
      </div>
      <div class="form-div">
        <div>
          <img src="../assets/img/my_img_number.png"/>
          <input type="password" v-model="password"  placeholder="密码" />
          <!--v-on:input="YZpassword(password)-->
        </div>
        <p class="form-errTips"><span>{{password_tips}}</span></p>
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
  import forget from '@/components/forget'
  export default({
    name: 'login',
    data () {
      return {
        phone: '',
        phone_tips: '', /* 账号错误提示 */
        password: '',
        password_tips: '', /* 密码错误提示 */
        btn_type: true,
        data: []
      }
    },
    components: {
      forget
    },
    methods: {
      YZphone (phone) {
        if (!phone) {
          this.phone_tips = '请输入账号'
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
        if (!this.phone) {
          this.phone_tips = '请输入账号'
        } else if (!this.password) {
          this.password_tips = '请输入密码'
        } else {
          let _this = this
          let md5Password = $.md5(_this.password)
          // $.ajax({
          //   type: 'post',
          //   url: '/api/userManage_loginUser.do?method=loginRoleForMobelV3',
          //   data: {
          //     username: _this.phone,
          //     password: md5Password
          //   },
          //   success: function (data) {
          //     let data = JSON.parse(data)
          //     console.log(data)
          //     if (data.error === '用户密码错误！') {
          //       _this.password_tips = '密码错误!'
          //     }
          //     if (data.error === '该帐号没有注册 ') {
          //       _this.phone_tips = '该帐号没有注册'
          //     }
          //     if (data.error === 'success') {
          //       _this.btn_type = false
          //       alert('登录成功')
          //       _this.$router.push({ // 你需要接受路由的参数再跳转
          //         path: '/forget'
          //       })
          //     }
          //   },
          //   error: function () {
          //     console.log('error')
          //   }
          // })
        }
      }
      getPost () {
        this.$http.post('/api/userManage_loginUser.do?method=loginRoleForMobelV3', {
          username: _this.phone,
          password: md5_password
        }).then(response => {
          // get body data
          let data = JSON.parse(data)
          console.log(data)
          if (data.error === '用户密码错误！') {
            _this.password_tips = '密码错误!'
          }
          if (data.error === '该帐号没有注册 ') {
            _this.phone_tips = '该帐号没有注册'
          }
          if (data.error === 'success') {
            _this.btn_type = false
            alert('登录成功')
            _this.$router.push({ // 你需要接受路由的参数再跳转
              path: '/forget'
            })
          }
        }, response => {
          console.log('error')
        })
      }
    }
  })
</script>

<style>
  body{
    background: #f2f2f2;
  }

</style>
