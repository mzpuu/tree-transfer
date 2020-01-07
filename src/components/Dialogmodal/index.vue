<template>
  <div class="dialog-container">
    <el-dialog  :title="title" :visible.sync="visible" @close="$emit('update:show', false)" :width="width" :show="show" :top="top">
      <slot></slot>
      <span slot="footer" class="dialog-footer">
    <el-button @click="cancel">取 消</el-button>
    <el-button type="primary" @click="makesure">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name:'dialogmodal',
  data() {
    return {
      visible: this.show
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '30%'
    },
    title:{
      type:String,
      default:'标题'
    },
    top:{
      type: String,
      default: '5vh'
    },
  },
  watch: {
    show() {
      this.visible = this.show;
    }
  },
  methods:{
      makesure(){
        this.$emit("makeOk");
        this.visible = false
      },
      cancel(){
        this.$emit("makeNo");
        this.visible = false
      }
  }
};

</script>
