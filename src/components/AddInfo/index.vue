<template>
	<div>
		<el-from autoComplete="on" :model="infoForm" ref="infoForm" label-position="left">
			<el-row :gutter="24">
        <el-col :sm="12" :md="12" :lg="12" :xl="12">
        	<el-form-item prop="" label='公司名称'>
        		<el-input type="text" v-model="infoForm.name" autoComplete="on" placeholder="公司名称" />
		      </el-form-item>
        </el-col>
				<el-col :sm="12" :md="12" :lg="12" :xl="12">
        	<el-form-item prop="" label='法人姓名'>
		        <el-input type="text" v-model="infoForm.name" autoComplete="on" placeholder="法人姓名" />
		      </el-form-item>
		    </el-col>
		    <el-col :sm="12" :md="12" :lg="12" :xl="12">
		    	<el-form-item prop="" label='统一社会信用代码'>
		        <el-input type="text" v-model="infoForm.name" autoComplete="on" placeholder="统一社会信用代码" />
		      </el-form-item>
		    </el-col>
		    <el-col :sm="12" :md="12" :lg="12" :xl="12">
		    	<el-form-item prop="" label='法人身份证'>
		        <el-input type="text" v-model="infoForm.name" autoComplete="on" placeholder="法人身份证" />
		      </el-form-item>
		    </el-col>
		    <el-col :sm="12" :md="12" :lg="12" :xl="12">
		    	<el-form-item prop="" label='返佣比例'>
		        <el-select v-model="infoForm.proportion" filterable placeholder="请选择">
		        	<el-option v-for="(v,k) of proportionList" :key="k" :label="v.name" :value="v.value">
              </el-option>
		        </el-select>
		      </el-form-item>
		    </el-col>
		    <el-col :sm="12" :md="12" :lg="12" :xl="12">
		    	<el-form-item prop="" label='法人手机号'>
		        <el-input type="text" v-model="infoForm.mobile" autoComplete="on" placeholder="法人手机号" />
		      </el-form-item>
		    </el-col>
		    <el-col :sm="12" :md="12" :lg="12" :xl="12">
		    	<el-form-item prop="" label='获客省份'>
		        <el-select v-model="infoForm.city" filterable placeholder="请选择">
		        	<el-option v-for="(v,k) of cityList" :key="k" :label="v.name" :value="v.value">
              </el-option>
		        </el-select>
		      </el-form-item>
		    </el-col>
      </el-row>
      
		</el-from>
	</div>
</template>
<script>
import { isvalidUsername } from '@/utils/validate'

export default {
  name: 'login',
  data() {
  	return(){

  	}
  },
  components: {

  },
  watch:{

  },
  methods: {}
}
</script>
<style rel="stylesheet/scss" lang="scss">
	
</style>