<template>

  <div>
    <div id="item1-div" v-show="step1">
      <div class="nav-step">
        <div class="nav-step1 nav-step-active">验证手机</div>
        <div class="nav-step2">获取验证码</div>
        <div class="nav-step3">修改密码</div>
      </div>
      <div style="padding: 15px;">
        <div class="form-yz">
          <div class="form-yz-div">
            <span>手机号码</span><input type="text" v-model="phone" maxlength="11" />
            <!--v-on:input="YZphone(phone)"-->
          </div>
          <p class="yz-tips">{{phone_tips}}</p>
        </div>
      </div>
      <button class="btn-next" type="button" @click="next1()">下一步</button>
    </div>


    <div id="item2-div" v-show="step2">
      <div class="nav-step">
        <div class="nav-step1">验证手机</div>
        <div class="nav-step2 nav-step-active">获取验证码</div>
        <div class="nav-step3">修改密码</div>
      </div>
      <div style="padding: 15px;">
        <div class="form-yz">
          <div class="form-yz-div">
            <span>手机号码</span><input type="text" v-model="phone" maxlength="11"  />
            <!--v-on:input="YZphone(phone)"-->
          </div>
          <p class="yz-tips">{{phone_tips}}</p>
        </div>
        <div class="form-yz">
          <div class="form-yz-div yzm-div">
            <span>验证信息</span>
            <input type="text" v-model="code" :readonly="readonly"  maxlength="4"/>
            <!--v-on:input="YZyzm(code)"-->
            <button class="yzm-btn" @click="GetYzm()" :disabled="disabled">{{yzm_html}}{{s}}</button>
          </div>
          <p class="yz-tips">{{yz_tips}}</p>
        </div>
      </div>
      <button class="btn-next" type="button" @click="next2()">下一步</button>
    </div>

    <div id="item3-div" v-show='step3' class="ani" swiper-animate-effect="fadeInUp" swiper-animate-duration="0.5s" swiper-animate-delay="0.3s">
      <div class="nav-step">
        <div class="nav-step1">验证手机</div>
        <div class="nav-step2">获取验证码</div>
        <div class="nav-step3 nav-step-active">修改密码</div>
      </div>
      <div style="padding: 15px;">
        <div class="form-yz">
          <div class="form-yz-div">
            <span>新的密码</span>
            <input type="password" v-model="mima1"/>
            <!--v-on:input="YZmm1(mima1)"-->
          </div>
          <p class="yz-tips">{{mima1_tips}}</p>
        </div>
        <div class="form-yz">
          <div class="form-yz-div">
            <span>确定密码</span>
            <input type="password" v-model="mima2" :input="YZmm2(mima2)"/>
          </div>
          <p class="yz-tips">{{mima2_tips}}</p>
        </div>
      </div>
      <button class="btn-tijiao" type="button" @click="next3()">提交</button>
      <p class="p-tt">提交成功后自动跳转至登录界面</p>
    </div>

  </div>
</template>
<script>
  export default {
    data () {
      return {
        step1: true,
        step2: false,
        step3: false,
        phone: '',
        /* 手机号 */
        phone_tips: '',
        disabled: false,
        readonly: true,
        yzm_html: '获取验证码',
        yz_tips: '',
        mima1_tips: '',
        mima2_tips: '',
        timer: null,
        s: '',
        code: null, // 验证码
        code_yes: '',
        mima1: '',
        mima2: ''
      }
    },
    methods: {
      next1 () {
        // this.step1=false;
        // this.step2=true
        let that = this
        if (!this.phone || !RegPhone.test(this.phone)) {
          this.phone_tips = '请输入正确的手机号'
        } else {
        // 验证手机号是否存在
        //   $.ajax({
        //     type: "post",
        //     url: host + "userManage_loginUser.do?method=checkUserName",
        //     async: true,
        //     data: {
        //       username: _this.phone
        //     },
        //     success: function(data) {
        //       var data = JSON.parse(data)
        //       console.log(data);
        //       if(data.error=='fail'){
        //         _this.phone_tips='该手机号未注册'
        //       }
        //       if(data.error=='success'){
        //         _this.step1= false;
        //         _this.step2= true;
        //       }
        //     }
        //   });
          this.$http.post('/api/userManage_loginUser.do?method=userLoginForMobel', {
            // username: that.phone,
            // password: md5Password,
            roleid: that.roleid
          }).then(res => {
            // get body data
            let body = res.body
            // that.data = JSON.parse(body)
            that.data = body
            console.log(that.data)
            console.log(that.data.sid, '111')
            console.log(that.data.userid, '1112')
            console.log(that.data.stuid, '3456')
            let userInfo = {sid: that.data.sid, userid: that.data.userid, studentid: that.data.stuid}
            let objMessage = JSON.stringify(userInfo)
            sessionStorage.setItem('info', objMessage)
          }, response => {
            // error callback
            console.log('error')
          })
        }
      },
      next2 () {
        let that = this
        if (!this.phone || !RegPhone.test(this.phone)) {
          this.phone_tips = '请输入正确的手机号'
        } else if (!that.code || that.code === '') {
          that.yz_tips = '请输入验证码'
        } else if (that.code !== that.code_yes) {
          // 验证验证码
          that.yz_tips = '验证码错误'
        } else {
          // 成功
          console.log('yes')
          that.step2 = false
          that.step3 = true
        }
      },
      next3 () {
        let that = this
        if (!that.mima1) {
          that.mima1_tips = '请设置密码'
        } else if (that.mima1 !== that.mima2) {
          that.mima2_tips = '两次密码不一致'
        } else {
          // 成功
          // $.ajax({
          //   type: "post",
          //   url: host + "userManage_loginUser.do?method=retPassWord",
          //   async: true,
          //   data: {
          //     phone: _this.phone,
          //     password:_this.mima2
          //   },
          //   success: function(data) {
          //     var data = JSON.parse(data)
          //     console.log(data)
          //     if(data.error=='success'){
          //       console.log('设置成功！');
          //       setTimeout(function(){
          //         _this.$router.push({//你需要接受路由的参数再跳转
          //           path:'/'
          //         });
          //       },800)
          //     }
          //   }
          // });
          this.$http.post('/api/userManage_loginUser.do?method=userLoginForMobel', {
            // username: that.phone,
            // password: md5Password,
            roleid: that.roleid
          }).then(res => {
            // get body data
            let body = res.body
            // that.data = JSON.parse(body)
            that.data = body
            console.log(that.data)
            console.log(that.data.sid, '111')
            console.log(that.data.userid, '1112')
            console.log(that.data.stuid, '3456')
            let userInfo = {sid: that.data.sid, userid: that.data.userid, studentid: that.data.stuid}
            let objMessage = JSON.stringify(userInfo)
            sessionStorage.setItem('info', objMessage)
          }, response => {
            // error callback
            console.log('error')
          })
        }
      },
      // 手机号不正确提示
      YZphone (phone) {
        phone = this.phone
        if (!phone) {
          this.phone_tips = '请输入手机号'
        } else {
          this.phone_tips = ''
        }
      },
      // 设置密码提示
      YZmm1 (mima1) {
        mima1 = this.mima1
        if (!mima1) {
          this.mima1_tips = '请输入密码'
        } else {
          this.mima1_tips = ''
        }
      },
      YZmm2 (mima2) {
        mima2 = this.mima2
        if (!mima2) {
          this.mima2_tips = '请再次输入密码'
        } else {
          this.mima2_tips = ''
        }
      },
      // 验证码不正确提示
      YZyzm (code) {
        code = this.code
        if (!code) {
          this.yz_tips = '请输入验证码'
        } else {
          this.yz_tips = ''
        }
      },
      GetYzm () {
        let that = this
        if (!this.phone || !RegPhone.test(this.phone)) {
          this.phone_tips = '请输入正确的手机号'
        } else {
          this.readonly = false
          this.disabled = true
          this.yzm_html = 60
          this.s = 's'
          // 获取验证码
//           $.ajax({
//             type: "post",
//             url: host + "userManage_loginUser.do?method=validMessage",
// 				 url:'http://192.168.0.218/userManage_loginUser.do?method=validMessage',
//             async: true,
//             data: {
//               phone: _this.phone
//             },
//             success: function(data) {
//               var data = JSON.parse(data)
//               console.log(data)
//               if(data.error=='success'){
//                 _this.code_yes=data.sendcode;
//               }
//             }
//           });
          this.$http.post('/api/userManage_loginUser.do?method=userLoginForMobel', {
            // username: that.phone,
            // password: md5Password,
            roleid: that.roleid
          }).then(res => {
            // get body data
            let body = res.body
            // that.data = JSON.parse(body)
            that.data = body
            console.log(that.data)
            console.log(that.data.sid, '111')
            console.log(that.data.userid, '1112')
            console.log(that.data.stuid, '3456')
            let userInfo = {sid: that.data.sid, userid: that.data.userid, studentid: that.data.stuid}
            let objMessage = JSON.stringify(userInfo)
            sessionStorage.setItem('info', objMessage)
          }, response => {
            // error callback
            console.log('error')
          })
          this.timer = setInterval(() => {
            this.yzm_html--
            if (this.yzm_html === 0) {
              this.s = ''
              this.yzm_html = '重新获取'
              this.disabled = false
              clearInterval(this.timer)
            }
          }, 1000)
        }
      }
    }

  }
</script>

<style>
  body {
    background: #F2F2F2;
  }

  .p-tt {
    width: 80%;
    text-align: right;
    color: #333;
    margin: 0 auto;
    margin-top: 20px;
  }
</style>
