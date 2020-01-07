<template>
	<div id="uploadcomp" :model="form" style="width:380px;height:440px;float:left;">
    <div class="">
    	<el-upload class="upload-demo" drag :action="form.url" :data="form.dataUpload" :limit="form.limitNum" :on-exceed="handleExceed" :before-upload="beforeUpload" :on-success="successUpload" :on-error="errorUpload" :file-list='form.fileList' list-type="picture"  multiple accept=".jpeg,.jpg,.png">
	      <i class="el-icon-upload"></i>
	      <div class="el-upload__text">
          <em class="upload-tip">
            扩展名:jpg,jpeg,png
          </em>
        </div>
	      <!-- <div class="el-upload__tip" slot="tip">只支持 "" 的文件扩展名.</div> -->
	    </el-upload>
    </div>
	</div>
</template>
<script>
import Upload from '@/components/Upload'
import { message } from '@/utils/mUtils'
import { baseUrl } from '@/utils/env' 
import { signGenerator } from '@/api/platform/signature'
export default {
	name:'uploadfile',
	data(){
	  return {
      form:{
      	url:'',
      	limitNum:1,
      	dataUpload:{
      		application_id:'',
          img_type:this.filetypes,
      	},
      	fileList:[],
      	generate:false,
      	filedownshow:false,
      },
      imgUrl:[],
      setsealUrl:'',
      filedownlinks:'',
	  }
	},
	props: ["id",'prompt','size','filetypes','sealurl'],
  components: {
    Upload
  },
	created() {
    this.form.url=baseUrl +'/company/sign_upload'
  },
  watch: {
  },
	methods: {
		handleExceed(files, fileList) {
      //文件限制提示
      this.$message.warning(`当前限制选择 ${this.form.limitNum} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeUpload(){
      //上传前判断
    },
    successUpload(response, file, fileList, $event){
      //是否上传成功
      if(response.code ==0){
      	this.imgUrl=file.response.data
      }else{
        let options = response.desc
        message(options)
      }
    },
    errorUpload(err, file, fileList){
      //上传失败提示
      let options = err
      message(options)
    },
	}
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.upload-tip{
  display:block;
  height:14px;
  line-height:14px;
  font-size:12px;
}
</style>