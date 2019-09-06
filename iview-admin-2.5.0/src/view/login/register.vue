<template>
  <div class="register-main">
    <div class="tj-header">
      <h1>
        <a href="/" target="_blank">
          SUPL
        </a>
      </h1>
      <span>链接管理平台 </span>
    </div>
    <div class="content">
     <!-- <div class="progress-container">
        <ul class="progress-steps">
          <li :class="{active: showType >= 1}"><p>邮箱验证</p></li>
          <li :class="{active: showType >= 2}"><p>完善信息</p></li>
          <li :class="{active: showType >= 3}"><p>注册成功</p></li>
        </ul>
        <div style="clear:both"></div>
      </div>-->
      <div class="main-login main-center">
        <div class="form-horizontal" novalidate="novalidate">
          <div class="register_first" v-show="showType == 1">
            <Form ref="firstForm" :model="form" :rules="rules" label-position="top">
              <FormItem prop="username"  label="用户名">
                <i-input v-model="form.username" placeholder="请输入英文用户名，作为来评测的店铺名">
                  <span slot="prepend">
                    <Icon :size="16" type="ios-person"></Icon>
                  </span>
                </i-input>
              </FormItem>
              <FormItem prop="mobile" label="手机号">
                <i-input v-model="form.mobile" placeholder="请输入手机号" :maxlength="11">
                  <span slot="prepend">
                    <Icon :size="16" type="md-phone-portrait"></Icon>
                  </span>
                </i-input>
              </FormItem>
              <FormItem prop="email"  label="邮箱">
                <i-input v-model="form.email" placeholder="请输入邮箱">
                  <span slot="prepend">
                    <Icon :size="16" type="md-mail"></Icon>
                  </span>
                </i-input>
              </FormItem>
              <FormItem prop="password" label="密码">
                <i-input type="password" v-model="form.password" placeholder="请输入密码">
                  <span slot="prepend">
                      <Icon :size="14" type="md-lock"></Icon>
                  </span>
                </i-input>
              </FormItem>
              <FormItem prop="qq"  label="QQ号">
                <i-input v-model="form.qq" placeholder="请输入QQ" >
                      <span slot="prepend">
                        <Icon :size="16" type="ios-chatbubbles"></Icon>
                      </span>
                </i-input>
              </FormItem>
              <FormItem prop="code"  label="验证码">
                <div class="c_login-fixed">
                  <div class="c_login-inp">
                    <i-input v-model="form.code" placeholder="请输入邮箱验证码" :maxlength="10">
                      <span slot="prepend">
                          <Icon :size="16" type="ios-bulb"></Icon>
                      </span>
                    </i-input>
                  </div>
                  <div class="c_login-txt">
                    <Button @click="getCode" type="primary" :disabled="codeDisabled">{{codeText}}</Button>
                  </div>
                </div>
              </FormItem>
              <FormItem>
                <Button @click="firstSubmit('firstForm')" type="primary" long>下一步</Button>
              </FormItem>
            </Form>
           <!-- <div class="register_secr" v-show="showType == 1">
              <Form ref="secForm" :model="form" :rules="rules" label-position="top">
                <FormItem prop="sellerName"  label="用户名">
                  <i-input v-model="form.sellerName" placeholder="请输入英文用户名，作为来评测的店铺名">
                  <span slot="prepend">
                    <Icon :size="16" type="ios-person"></Icon>
                  </span>
                  </i-input>
                </FormItem>
                <FormItem prop="mobile" label="手机号">
                  <i-input v-model="form.mobile" placeholder="请输入手机号" :maxlength="11">
                  <span slot="prepend">
                    <Icon :size="16" type="md-phone-portrait"></Icon>
                  </span>
                  </i-input>
                </FormItem>
                <FormItem prop="qq"  label="QQ号">
                  <i-input v-model="form.qq" placeholder="请输入QQ" >
                      <span slot="prepend">
                        <Icon :size="16" type="ios-chatbubbles"></Icon>
                      </span>
                  </i-input>
                </FormItem>
                <FormItem >
                  <div style="width:100%;display:flex;">
                    <div style="flex: 1;margin-right: 15px">
                      <Button @click="fnPareStep" type="primary" long>上一步</Button>
                    </div>
                    <div style="flex: 1;margin-left: 15px">
                      <Button @click="fnSecNext('secForm')" type="primary" long>下一步</Button>
                    </div>
                  </div>
                </FormItem>
              </Form>

            </div>-->
            <div class="form-group">
              <p style="text-align: center;margin-top:5px;font-size:12px">注册即表示同意 <a style="font-size:12px" href="/index/privacy.html" target="_blank">隐私政策</a> </p>
            </div>
          </div>

          <div class="register_thr" v-show="showType == 3">
            <div class="tj-title"><Icon type="md-checkmark" /><span>恭喜你，注册成功！</span></div>
            <Button @click="gotoLogin" type="primary" long>立即登录</Button>
          </div>

        </div>
      </div>
    </div>
    <div class="c_login-footer">
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
</template>

<script>
  import { register } from '@/api/user'
  import {getFormatData, getDateDiff, getFormatNumber} from '@/libs/util'
  import * as userPost from '@/api/user'
  export default {
    data () {
      return {
        emailAppend: '@gmail.com',
        codeText:'获取验证码',
        codeType:'primary',
        codeDisabled:false,
        codeTime:60,
        idxCodeTime:'',
        showType: 1,
        form:{
          email: '',
          password: '',
          code: '',
          username: '',
          mobile: '',
          qq: '',
        },
        rules:{
          username: [
            //
            {validator: (rule, value, callback) => {
                if(!value){
                  return callback(new Error("请正确填写用户名"))
                }else if(!/^[A-Za-z0-9]+$/.test(value)){
                  return callback(new Error("用户名只能输入英文和数字"))
                }else{
                  callback()
                }
              },trigger: 'blur'}
          ],
          email: [
            {validator: (rule, value, callback) => {
                if(!value){
                  return callback(new Error("请正确填写邮箱"))
                }else if(!/^[A-Za-z\d]+([-_.]*[A-Za-z\d]+)+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)){
                  return callback(new Error("请输入有效的邮箱"))
                }else{
                  callback()
                }
              },trigger: 'blur'}],
          mobile:  [
            {validator: (rule, value, callback) => {
                if(!value){
                  return callback(new Error("手机号不能为空"))
                }else if(!/^1\d{10}$/.test(value)){
                  return callback(new Error("手机号错误"))
                }else{
                  callback()
                }
              },trigger: 'blur',required: true,}
          ],
          qq:  [
            {validator: (rule, value, callback) => {
              if(!value){
                return callback(new Error("QQ号输入错误"))
              }else if(!/^[0-9]*$/.test(value)){
                return callback(new Error("QQ号只能是数字"))
              }else{
                callback()
              }
            },trigger: 'blur',required: true,}
          ],
          amazonSellerId: [
            { required: true, message: '亚马逊sellerId不能为空', trigger: 'blur' }
          ],
          password:  [
            { required: true, message: '密码不能为空', trigger: 'blur' }
          ],
          code: [
            { required: true, message: '验证码不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    components: {

    },
    methods: {
      firstSubmit(name){
        this.$refs[name].validate((valid) => {
          console.log(valid)
          if (valid) {
            this.showType = 2
          //  history.pushState({}, "", "/#/register?sec");
            this.registerSubmit()
          }else{

          }
        })
      },
      fnPareStep(){
        this.showType = 1
        history.replaceState(null, "", "/#/register");
      },
      fnSecNext (name) {
        this.$refs[name].validate((valid) => {
          console.log(valid)
          if (valid) {
            this.registerSubmit()
          }else{

          }
        })
      },
      registerSubmit (){
        this.$Spin.show()
        register(this.form).then(res =>{
          this.$Spin.hide()
          if (res.data.code === '200') {
            this.showType = 3
          }else {
            if (res.data) {
              this.$Message.error(res.data.msg)
              return
            }
          }
        }).catch(res => {
          this.$Spin.hide()
          if (res.data) {
            this.$Message.error(res.data.msg)
          }
        })
      },
      gotoLogin(){
        this.$router.push({
          name: 'login'
        })
      },
      getCode(){
        if(this.form.email){
          userPost.sellerCode(this.form.email).then(res=>{
            if(res.data.code === '200'){
              this.$Message.success('发送成功')
              this.switchBut(2)
            }
          }).catch(res=>{

          })
        }else{
          this.$Message.error('请输入邮箱')
        }
      },
      // 切换按钮状态
      switchBut(ctype){
        switch (ctype){
          case 1:
            this.codeText='获取验证码'
            this.codeDisabled = false
            this.codeTime = 60
            break
          case 2:
            this.codeText='60s后重新获取'
            this.codeDisabled = true
            this.refreshCodeTime()
            break
        }
      },
      // 倒计时重新获取验证码
      refreshCodeTime(){
        clearTimeout(this.idxCodeTime)
        this.idxCodeTime = setTimeout(()=>{
          this.codeTime-=1
          if(this.codeTime>0){
            this.codeText=this.codeTime+'s后重新获取'
            this.refreshCodeTime()
          }else{
            this.switchBut(1)
          }
        },1000)
      }
    }
  }
</script>

<style lang="less" scoped>
  .register-main{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: #f0f3f4;
    overflow-y: auto;
  }
  .tj-header {
    text-align: center;
    margin-top: 60px;
    a {
      font-size: 40px;
      font-weight: normal;
    }
    span {
      color: #888;
    }
  }
  .content {
    border: 1px solid #c7c7c7;
    background: #fff;
    padding: 20px;
    margin: 30px auto;
    width: 1080px;
    .progress-container {
      width: 98%;
      margin: 50px 1% 0 1%;
      .progress-steps {
        counter-reset: step;
        padding: 0;
        li {
          list-style-type: none;
          width: 33.333%;
          float: left;
          font-size: 14px;
          position: relative;
          text-align: center;
          color: #999;
          &:before {
            width: 30px;
            height: 30px;
            content: counter(step);
            counter-increment: step;
            line-height: 22px;
            border: 4px solid #999;
            display: block;
            text-align: center;
            margin: 0 auto 10px auto;
            border-radius: 50%;
            background-color: white;
            font-weight: bold;
            position: inherit;
            z-index: 2;
          }
          &:after {
            width: 100%;
            height: 4px;
            content: '';
            position: absolute;
            background-color: #999;
            top: 13px;
            left: -50%;
            z-index: 1;
          }
          &:first-child:after {
            content: none;
          }
        }
        li.active {
          color: #fff;
          &:before {
            border-color: #2b85e4;
            background-color: #2b85e4;
            position: inherit;
            z-index: 2;
          }
          & p{
            color: #2b85e4;
          }
          &:after {
            background-color: #2b85e4;
          }
        }
      }
      .progress-steps li.active + li:after {
        background-color: #2b85e4;
      }
    }
  }
  .c_login-fixed {
    display: flex;
  }

  .c_login-inp {
    flex: 1;
    margin-right: 10px;
  }
  .c_register-footer{
    text-align: center;
    width: 100%;
    font-size: 10px;
  }
  .form-horizontal{
    width: 450px;
    margin: 50px auto;
  }
  .c_login-footer{
    text-align: center;
    width: 1080px;
    margin: 20px auto;
    font-size:12px;
  }
  .c_footer-joinus{
    /*display: flex;*/
    margin-bottom: 10px;
  }
  .c_footer-joinus div{
    display: inline-block;
  }
  .c_footer-joinus span{
    margin-right: 20px;
  }

  .c_footer-joinus div a{
    margin-left: 20px;
    cursor:pointer;
  }
  .tj-title {
    margin: 50px;
    text-align: center;
    color: #555;
    font-size: 30px;
  }
  .tj-title i {
    color: #019c58;
    padding-right: 10px;
  }
</style>
