<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">

    <div class="login-con-new">
      <div class="c_logincon-main">
        <div class="c_login-tips">
          <!--能100%留评的，只有我们-->
          链接管理平台
        </div>
        <Card icon="log-in" id="cid_login-cont" title="SUPL" :bordered="false"  v-if="shType == 1">
          <div class="form-con">
            <login-form @on-success-valid="handleSubmit"></login-form>
            <p class="login-tip c_register-login"><span @click="switchStatus(3)">忘记密码</span>
              <span @click="switchStatus(2)">注册</span></p>
          </div>
        </Card>
        <Card icon="log-in" title="注册" :bordered="false" v-if="shType == 2" style="width: 400px">
          <div class="form-con">
            <register-form @on-success-register="registerSubmit" :invitation-code="invitationCode"></register-form>
            <p class="login-tip c_register-login" ><span @click="switchStatus(1)">登录</span></p>
          </div>
          <Spin size="large" fix v-if="registerShow"></Spin>
        </Card>
        <Card icon="log-in" title="修改密码" :bordered="false" v-if="shType == 3" style="width: 400px">
          <div class="form-con">
            <forgot-pass @on-success-editpws="switchLogin" :invitation-code="invitationCode"></forgot-pass>
            <p class="login-tip c_register-login" ><span @click="switchStatus(1)">登录</span></p>
          </div>
          <Spin size="large" fix v-if="registerShow"></Spin>
        </Card>
      </div>

      <div class="c_login-footer" >
        <!--<a href="http://www.miibeian.gov.cn/" target="_blank">粤ICP备19017341</a> v-if="shType == 2-->
        <div class="c_footer-joinus">
          <div>
            <span>QQ:1105047533</span>
            <span>E-mail:contact@laipingce.com</span>
          </div>
          <div>
            <a id="loginButton" href="/index.html#/help?type=2"target="_blank">帮助中心</a>
            <a href="/index/privacy.html" target="_blank">隐私协议</a>
          </div>

        </div>
        <p> Copyright &copy; 2019 All Rights Reserved</p>
      </div>
    </div>

  </div>
</template>

<script>
  import { bsRegister } from '@/api/user'
import LoginForm from '_c/login-form'
import RegisterForm from '_c/register-form'
import ForgotPass from '_c/forgotpass'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      registerShow: false,
      registerTof: false,
      shType: 1, // 1 登录 2 注册 3 忘记密码
      invitationCode: ''
    }
  },
  mounted() {
    let code = this.getQueryString('ic')
    let setype = location.hash.indexOf('setype')
    if (setype > 0 || (code && this.$route.params.hasCode !== 'false')) {
      if (code) {
        this.invitationCode = code;
      }
      // this.shType = 2;
      this.gotoRegister(2)
    } else {
      this.invitationCode = '';
      this.shType = 1;
    }
  },
  components: {
    LoginForm,
    RegisterForm,
    ForgotPass
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getSellerTopinfo'
    ]),
    handleSubmit ({ userName, password, sellerId }) {
      this.$Spin.show()
      this.handleLogin({ userName, password, sellerId }).then(res => {
        if (res.code === '200') {
          localStorage.setItem('firseName',password)
          localStorage.setItem('lastName',userName)
          let tempToken = res.result
          this.getSellerTopinfo().then(res => {
            this.$Spin.hide()
            if (res.code === '200') {
              if(res.result.noSetMeal ){
                if (tempToken.indexOf('seller') === 0) {
                  // 去订阅套餐
                  this.$Modal.warning({
                    title: res.result.title||'提示',
                    content: '<p>'+res.result.msg+'</p>',
                    okText: '确认',
                    // cancelText: '以后再说',
                    onOk: () => {
                      this.$router.push({
                        name: 'home'
                      })
                    },
                    onCancel: () => {
                      this.$router.push({
                        name: this.$config.homeName
                      })
                    }
                  });
                } else if (tempToken.indexOf('admin') === 0) {
                  this.$router.push({
                    name: this.$config.homeName
                  })
                }
              }else{
                this.$router.push({
                  name: this.$config.homeName
                })
              }

            } else {
              if (res) {
                this.$Message.error(res.msg)
              }
            }
          })





        }else {
          this.$Spin.hide()
          if (res) {
            this.$Message.error(res.msg)
          }
        }
      }).catch(res => {
        this.$Spin.hide()
        if (res) {
          this.$Message.error(res.msg)
        }
      })
    },
    registerSubmit (formData){
      this.registerShow = true
      this.$Spin.show()
      bsRegister(formData).then(res =>{
        this.$Spin.hide()
        if (res.data.code === '200') {
          this.shType = 1
          this.registerShow = false
          this.$Message.success('注册成功，请登录')
        }else {
          if (res.data) {
            this.registerShow = false
            this.$Message.error(res.data.msg)
          }
        }
      }).catch(res => {
        this.$Spin.hide()
        if (res.data) {
          this.registerShow = false
          this.$Message.error(res.data.msg)
        }
      })
    },
    switchStatus (e) {
      if (e == 2) {
        this.gotoRegister(e)
      } else {
        this.shType = e
      }
    },
    gotoRegister(e){
      if(e == 2){
        this.$router.push({
          name: 'register'
        })
      }
    },
    switchLogin(e){
      if (e) {
        this.shType = 1
      } else {
        this.shType = 3
      }
    },
    forgotPw () {

    },
    getQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    }
  }
}
</script>

<style>
  .login-con{
    left: 0 !important;
    right: 0 !important;
    margin: 0 auto;
  }
  .login-con-new{
    position: absolute;
    left: 0 !important;
    right: 0 !important;
    margin: 0 auto;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    width: 100%;
  }
  .c_logincon-main{
    width: 400px;
    margin: 0 auto;
  }
.login-tip.c_register-login{
  text-align: right;

  color: #5aa0dc;
  margin-right: 20px;
}
.c_register-login span{
  margin-left: 20px;
  cursor: pointer;
  font-size:12px;
}
 .login-tip span:hover{
   color: #337ab7;
   cursor: pointer;
   text-decoration: underline;
 }
  #cid_login-cont .ivu-card-head p{
    display: inline-block;
    text-align: center;
    width: 100%;
    font-size: 20px;
    color:#2d8cf0;
    height: 30px;
    line-height: 30px;
  }
  #cid_login-cont .ivu-card-head span{
    text-align: center;
    width: 100%;
    font-size: 20px;
    color:#2d8cf0;
  }
  .c_login-footer{
    margin-top: 20px;
    text-align: center;
    font-size:12px;
  }
  .c_footer-joinus{
    display: flex;
    margin-bottom: 10px;
    font-size:12px;
  }
  .c_footer-joinus div{
    flex: 1;
  }
  .c_footer-joinus div:first-child{
    text-align: right;
    margin-left: 150px;

  }
  .c_footer-joinus div:first-child span{
    margin-right: 20px;
  }
  .c_footer-joinus div:last-child{
    text-align: left;
  }
  .c_footer-joinus div a{
    margin-left: 20px;
    cursor:pointer;
  }
</style>
