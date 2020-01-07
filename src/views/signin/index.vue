<template>
  <div class="login-container">
    <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px"
      class="card-box login-form">
      <h3 class="title">电销管理系统 v1.0</h3>
      <el-form-item prop="name">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user" />
        </span>
        <el-input name="name" type="text" v-model="loginForm.name" autoComplete="on" placeholder="用户名" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"></svg-icon>
        </span>
        <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" placeholder="密码"></el-input>
        <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye" /></span>
      </el-form-item>
      <el-form-item>
        <el-button type="cus" size="medium" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate'
export default {
  name: 'login',
  data() {
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        name: '',
        password: ''
      },
      loginRules: {
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false,
      pwdType: 'password'
    }
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
            this.$router.push({ path: '/telemarketing/tkStatistics'})
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import "~@/styles/mixin.scss";
$bg: #1b93e1;
$dark_gray: #000000;
$light_gray: #eee;
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  // @include bis("login-bg.jpg");
  background-size: cover;
  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px #ffffff inset !important;
    -webkit-text-fill-color: #000000 !important;
  }
  input {
    background: transparent !important;
    border: 0px;
    -webkit-appearance: none;
    border-radius: 0px;
    padding: 12px 5px 12px 15px;
    color: $light_gray;
    height: 47px !important;
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
    width: 35px;
    display: inline-block;
    &_login {
      font-size: 20px;
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
    max-width: 380px;
    padding: 20px 10px 15px;
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
}
</style>
