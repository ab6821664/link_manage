<template>
  <Form ref="RegisterForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
    <FormItem prop="sellerName">
      <i-input v-model="form.sellerName" placeholder="请输入英文用户名，作为来评测的店铺名">
        <span slot="prepend">
          <Icon :size="16" type="ios-person"></Icon>
        </span>
      </i-input>
    </FormItem>
    <FormItem prop="email">
      <i-input v-model="form.email" placeholder="请输入邮箱">
        <span slot="prepend">
          <Icon :size="16" type="md-mail"></Icon>
        </span>
        <!--<Select v-model="emailAppend" slot="append" style="width: 120px">-->
          <!--<Option value="@gmail.com">@gmail.com</Option>-->
          <!--<Option value="@outlook.com">@outlook.com</Option>-->
        <!--</Select>-->
      </i-input>
    </FormItem>
    <FormItem prop="password">
      <i-input type="password" v-model="form.password" placeholder="请输入密码">
      <span slot="prepend">
          <Icon :size="14" type="md-lock"></Icon>
        </span>
      </i-input>
    </FormItem>
    <FormItem prop="code">
      <div class="c_login-fixed">
        <div class="c_login-inp">
          <i-input v-model="form.code" placeholder="请输入邮箱验证码" :maxlength="10">
          <span slot="prepend">
              <Icon :size="16" type="ios-bulb"></Icon>
            </span>
          </i-input>
        </div>
        <div class="c_login-txt">
          <Button @click="getCode" :type="codeType" :disabled="codeDisabled">{{codeText}}</Button>
        </div>
      </div>
    </FormItem>
    <FormItem prop="mobile">
      <i-input v-model="form.mobile" placeholder="请输入手机号" :maxlength="11">
        <span slot="prepend">
          <Icon :size="16" type="md-phone-portrait"></Icon>
        </span>
      </i-input>
    </FormItem>
    <FormItem prop="qq">
      <i-input v-model="form.qq" placeholder="请输入QQ">
        <span slot="prepend">
          <Icon :size="16" type="ios-chatbubbles"></Icon>
        </span>
      </i-input>
    </FormItem>
 <!--   <FormItem>
      <i-input v-model="form.amazonSellerId" placeholder="选填,亚马逊Seller ID">
        <span slot="prepend">
          <Icon :size="16" type="logo-instagram"></Icon>
        </span>
      </i-input>
    </FormItem>-->

    <!--<FormItem>-->
      <!--<i-input type="text" v-model="form.invitationCode" placeholder="请输入邀请码">-->
        <!--<span slot="prepend">-->
          <!--<Icon :size="14" type="ios-redo"></Icon>-->
        <!--</span>-->
      <!--</i-input>-->
    <!--</FormItem>-->
    <FormItem>
      <Button @click="handleSubmit" type="primary" long>注册</Button>
    </FormItem>
    <div class="c_register-footer">
      注册即表示同意 <a href="/index/privacy.html">用户协议</a>
    </div>
  </Form>
</template>
<script>
  import {getFormatData, getDateDiff, getFormatNumber} from '@/libs/util'
  import * as userPost from '@/api/user'
export default {
  name: 'RegisterForm',
  props: {
    usernameRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ]
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    },
    code: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '验证码不能为空', trigger: 'blur' }
        ]
      }
    },
    emailRules: {
      type: Array,
      default: () => {
        return [{validator: (rule, value, callback) => {
            if(!value){
              return callback(new Error("请正确填写邮箱"))
            }else if(!/^[A-Za-z\d]+([-_.]*[A-Za-z\d]+)+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)){
              return callback(new Error("请输入有效的邮箱"))
            }else{
              callback()
            }
          },trigger: 'blur'}]

      }
    },
    mobileRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '手机号不能为空', trigger: 'blur' }
        ]
      }
    },
    qqRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: 'QQ号不能为空', trigger: 'blur' }
        ]
      }
    },
    amazonSellerIdRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '亚马逊sellerId不能为空', trigger: 'blur' }
        ]
      }
    },
    invitationCode: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      emailAppend: '@gmail.com',
      codeText:'获取验证码',
      codeType:'primary',
      codeDisabled:false,
      codeTime:60,
      idxCodeTime:'',
      form: {
        sellerName: '',
        email: '',
        emailBf: '',
        mobile: '',
        qq: '',
        amazonSellerId: '',
        password: ''
      }
    }
  },
  mounted() {
    if (this.invitationCode) {
      this.form.invitationCode = this.invitationCode;
    }
  },
  computed: {
    rules () {
      return {
        sellerName: this.usernameRules,
        email: this.emailRules,
        mobile: this.mobileRules,
        qq: this.qqRules,
        amazonSellerId: this.amazonSellerIdRules,
        password: this.passwordRules,
        code: this.code
      }
    }
  },
  watch: {
    'form.mobile' (e) {
      setTimeout(() => {
        let tempNum = getFormatNumber(e, 2)
        this.$set(this.form, 'price', tempNum)
      }, 0)
    },
    'form.sellerName' (e) {
      setTimeout(() => {
        let tempNum = e.replace(/[\W]/g,'')
        this.$set(this.form, 'sellerName', tempNum)
      }, 0)
    },
    'form.qq' (e) {
      setTimeout(() => {
        let tempNum = getFormatNumber(e, 2)
        this.$set(this.form, 'qq', tempNum)
      }, 0)
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.RegisterForm.validate((valid) => {
        if (valid) {
          // this.form.email = this.form.emailBf + this.emailAppend
          this.$emit('on-success-register', this.form)
        }
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
<style>
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
    font-size: 12px;
  }
</style>
