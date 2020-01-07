<template>
  <div class="login-container">
    <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px"
      class="card-box login-form">
      <!-- <h3 class="title">代理商管理平台</h3> -->
      <img class="logo" src="/static/img/logo.png" alt="">
      <el-form-item prop="mobile">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="mobile" />
        </span>
        <el-input name="mobile" type="text" v-model.trim="loginForm.mobile" autoComplete="on" placeholder="手机号" />
        <el-button size="medium" class="button-color" type="cus" :loading="smsloading" @click.native.prevent="sliderImg" :disabled="smsDisabled">
          {{smsText}}
        </el-button>
      </el-form-item>
      <el-form-item prop="code">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="message" />
        </span>
        <el-input name="sms" @keyup.enter.native="handleLogin" v-model.trim="loginForm.sms_code" placeholder="验证码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="cus" class="button-color" size="medium" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
          登录
        </el-button>
      </el-form-item>
    </el-form>
    <dialogmodal :show.sync="rangeShow" :width="rangeWidth" title='' top="155px" class="dialogmodal">
      <range
        :callback="getSms"
        :isfinish.sync="isfinish"
      ></range>
    </dialogmodal>
  </div>
</template>

<script>
import Dialogmodal from "@/components/Dialogmodal";
import Range from "@/components/Range";
import { validateMobilNum } from '@/utils/validate';
import { message } from "@/utils/mUtils";
import { sendScode } from "@/api/login";

export default {
  name: 'login',
  data() {
    // const validateUsername = (rule, value, callback) => {
    //   if (!validateMobilNum(value)) {
    //     callback(new Error('请输入正确的用户名'))
    //   } else {
    //     callback()
    //   }
    // }
    // const validatePass = (rule, value, callback) => {
    //   if (value.length < 5) {
    //     callback(new Error('密码不能小于5位'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      loginForm: {
        mobile: '',
        sms_code: ''
      },
      mobile:"",
      loginRules: {
        // mobile: [{ required: true, trigger: 'blur', validator: validateUsername }],
        // sms_code: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false,
      pwdType: 'password',
      smsloading:false,
      smsDisabled:false,
      countNum: 60,
      smsText:'获取验证码',
      rangeShow:false,
      rangeWidth:'320px',
      isfinish:0,
    }
  },
  components: {
    Dialogmodal,
    Range
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: '/' })
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    calculate(){
      // 验证码倒计时
      setTimeout(()=>{
        if(this.countNum-- > 0){
          this.smsDisabled = true
          this.smsText= this.countNum+'秒'
          this.calculate()
        }else{
          this.smsDisabled = false
          this.smsText="获取验证码"
        }
      },1000)
    },
    sliderImg(){
      // 获取验证码
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.rangeShow=true
        }
      })
    },
    getSms(position){
      let json = {
        mobile: this.loginForm.mobile,
        image_code: position,
        type: 2
      };
      // 滑动拼图
      sendScode(json).then(response =>{
        if(response.code == 0){
          this.isfinish = 1;
          this.mobile = response.data.mobile;
          setTimeout(()=>{
            this.rangeShow=false;
          },400)
          this.calculate()
        }else{
          this.isfinish = 2;
          this.smsText="获取验证码";
        }
      })
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: $bg;
  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
    -webkit-text-fill-color: #fff !important;
  }
  input {
    background: transparent;
    border: 0px;
    -webkit-appearance: none;
    border-radius: 0px;
    padding: 12px 5px 12px 15px;
    color: $light_gray;
    height: 52px;
  }
  .el-form-item__content {
    display: flex;
  }
  .el-input {
    display: inline-block;
    flex: 1;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
  }
  .svg-container {
    padding: 6px 5px 6px 10px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 24px;
    }
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    max-width: 400px;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
  .logo{
    width: 330px;
    margin-bottom: 20px;
  }
}
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
.dialogmodal {
  /deep/ .el-dialog__body{
    padding: 0
  }
  /deep/ .el-el-dialog__header,/deep/ .el-dialog__footer{
    display: none;
  }
  /deep/ .el-dialog__headerbtn{
    top: 10px;
    right: 10px;
  }
}
</style>