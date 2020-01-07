<template>
  <div class="home-container">
    欢迎使用
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'home',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.home-container {
  margin: 30px;
  font-size: 22px;
}
</style>
