<template>
  <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
    <FormItem prop="email">
      <i-input v-model="form.email" placeholder="邮箱">
        <span slot="prepend">
          <Icon :size="16" type="ios-person"></Icon>
        </span>
      </i-input>
    </FormItem>
    <FormItem prop="code">
      <div class="c_login-fixed">
        <div class="c_login-inp">
          <i-input v-model="form.code" placeholder="请输入验证码" :maxlength="10">
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
    <FormItem prop="newPass">
      <i-input type="password" v-model="form.newPass" placeholder="密码">
        <span slot="prepend">
          <Icon :size="14" type="md-lock"></Icon>
        </span>
      </i-input>
    </FormItem>
    <FormItem>
      <Button @click="handleSubmit" type="primary" :loading="loading" long>修改密码</Button>
    </FormItem>
  </Form>
</template>
<script>
  import * as userPost from '@/api/user'
export default {
  name: 'LoginForm',
  props: {
    userNameRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ]
      }
    },
    codeRules: {
      type:Array,
      default: () =>{
        return [
          { required: true, message: '验证码不能为空', trigger: 'blur' }
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
    }
  },
  data () {
    return {
      loading: false,
      codeText:'获取验证码',
      codeType:'primary',
      codeDisabled:false,
      codeTime:60,
      idxCodeTime:'',
      form: {
        email: '',
        newPass: '',
        code:''
      }
    }
  },
  computed: {
    rules () {
      return {
        email: this.userNameRules,
        newPass: this.passwordRules,
        code:this.codeRules
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$Spin.show()
          userPost.sellerForget(this.form).then(res=>{
            this.$Spin.hide()
            if(res.data.code === '200'){
             this.$Message.success('修改成功，请用新密码登录')
              this.$emit('on-success-editpws', true)
            }else {
              this.$emit('on-success-editpws', false)
              this.$Message.error(res.data.msg)
            }
          }).catch(res=>{
            this.$Spin.hide()
            this.$emit('on-success-editpws', false)
            if (res.data) {
              this.$Message.error(res.data.msg)
            }
          })
          // sellerForget
        }
      })
    },getCode(){
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
  .c-login-tips{
    color:#bbb;font-size:12px;margin-left: 20px;height: 25px;
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
  }
</style>
