<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <breadcrumb></breadcrumb>
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <span>{{name}}</span>
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>
            Home
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span @click="logout" style="display:block;">LogOut</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import { getBrowserInterfaceSize } from '@/utils/mUtils'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  data() {
    return {
      status: false
    }
  },
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'name',
      'sidebar',
      'browser'
    ])
  },
  watch: {
    'browser.col'(val) {
      this.resize()
    }
  },
  mounted() {
    this.resize()
  },
  methods: {
    resize() {
      if (this.status) {
        return
      }
      if (this.browser.col === 'xs') {
        if (this.sidebar.opened) {
          this.$store.dispatch('ToggleSideBar', false)
        }
      } else {
        if (!this.sidebar.opened) {
          this.$store.dispatch('ToggleSideBar', true)
        }
      }
    },
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
      this.status = !this.sidebar.opened
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 50px;
  padding-left: 180px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 20px;
        font-size: 12px;
      }
    }
  }
}
</style>

