<template>
  <el-table 
    :height="tableHeight" 
    :data="list" 
    :show-header="showHeader"
    :minTableHeight="minTableHeight"
    :row-class-name="tableRowClassName"
    element-loading-text="Loading" 
    :stripe="stripe" 
    border 
    fit 
    :expand="expand"
    @selection-change="handleSelectionChange"
    highlight-current-row>
    <slot></slot>
  </el-table>
</template>
<script>
export default {
  name: "AutoTable",
  data() {
    return {
      tableHeight: 300,
      minTableHeight: 120,
      otherHeight: 210
    };
  },
  props: {
    list: {
      type: null
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    expand:{
      type:Boolean,
      default:false
    },
    tableRowClassName:{
      type:Function,
    },
    stripe:{
      type:Boolean,
      default:true
    }
  },
  computed: {
    browser() {
      return this.$store.state.app.browser;
    }
  },
  watch: {
    "browser.col"(val) {
      this.autoTableHeight();
    },
    "browser.y"(val) {
      this.autoTableHeight();
    },
    list() {
      this.autoTableHeight();
    },
    expand(){
      this.autoTableHeight();
    }
  },
  mounted() {
      this.autoTableHeight();
  },
  activated() {
      this.autoTableHeight();
  },
  methods: {
    autoTableHeight() {
      let searchBarHeight = document.getElementById("search-bar")
        ? document.getElementById("search-bar").offsetHeight
        : 0;
      let temp = this.browser.y - this.otherHeight - searchBarHeight;
      this.tableHeight =
        temp < this.minTableHeight || !(this.list && this.list.length > 0)
          ? this.minTableHeight
          : temp;
    },
    handleSelectionChange(val) {
      this.$emit("selection-change",val);
    }
  }
};
</script>
