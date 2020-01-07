<template>
  <div id="management-user" class="app-container" v-loading="containerLoading">
    <el-row>
        <el-col :span="24">
            <el-button type="primary" @click="dialogAddUserFormVisible=true">添加</el-button>
        </el-col>
    </el-row>    
    <el-form ref="searchForm" :model="searchForm" :label-width="dialogFormLabelWidth">
        <el-row :gutter="20">            
            <el-col :sm="8" :md="6" :lg="4">
                <el-form-item label="用户名">
                    <el-input v-model="searchForm.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
            </el-col>
            <el-col :sm="8" :md="6" :lg="4">
                <el-form-item label="姓名">
                    <el-input v-model="searchForm.accountname" placeholder="请输入姓名"></el-input>
                </el-form-item>
            </el-col>
            <el-col :sm="8" :md="12" :lg="16">
                <el-button type="primary" @click="searchSubmit">提交</el-button>
                <el-button @click="searchReset">重置</el-button>
            </el-col>
        </el-row>
    </el-form>
    <el-table :data="list" element-loading-text="Loading" size="mini" stripe border fit highlight-current-row>
      <el-table-column fixed align="center" label='ID' width="80">
        <template slot-scope="scope">
          {{scope.row.id}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="用户名" >
        <template slot-scope="scope">
          {{scope.row.username}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="姓名" >
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="手机号" >
        <template slot-scope="scope">
          {{scope.row.mobile}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="身份证" >
        <template slot-scope="scope">
          {{scope.row.idcard}}
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        align="center"
        width="100"
        :filters="[{ text: '可用', value: 1 }, { text: '不可用', value: 0 }]"
        :filter-method="filterStatus"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{statusDesc[scope.row.status]}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        align="center"
        width="220">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="openSetRole(scope.row.id)">设置角色</el-button>
          <el-button type="text" size="small" @click="changeStatus(scope.row.status,scope.row.id)">{{scope.row.status===0?'启用':'停用'}}</el-button>          
          <el-button type="text" size="small" @click="changePassword(scope.row.id)">重置密码</el-button>
          <router-link :to="'authority/'+scope.row.id">跳转</router-link>          
        </template>
      </el-table-column>
    </el-table>
    <pagination :page-size="10" :total="list?list.length:0" :handle-page="handlePage"></pagination>    
    <el-dialog title="添加用户" :visible.sync="dialogAddUserFormVisible" width="500px">
        <el-form :model="addUserForm">
            <el-form-item label="用户名" :label-width="dialogFormLabelWidth">
                <el-input v-model="addUserForm.username" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" :label-width="dialogFormLabelWidth">
                <el-input v-model="addUserForm.password" type="password" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="姓名" :label-width="dialogFormLabelWidth">
                <el-input v-model="addUserForm.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="手机号" :label-width="dialogFormLabelWidth">
                <el-input v-model="addUserForm.mobile" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="身份证" :label-width="dialogFormLabelWidth">
                <el-input v-model="addUserForm.idcard" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogAddUserFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="AddUserSubmit" :loading="btnLoading">确 定</el-button>
        </div>
    </el-dialog>
    <el-dialog title="设置角色" :visible.sync="dialogSetRoleFormVisible" width="500px">
        <el-form :model="setRoleForm">
            <el-form-item label="角色名称" label-width="120px">
                <el-select v-model="setRoleForm.roleid" placeholder="请选择">
                    <el-option v-for="(v,k) of roles" :key="k" :label="v" :value="k"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogSetRoleFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="setRoleSubmit" :loading="btnLoading">确 定</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { getUserList, addUser } from '@/api/user'

export default {
    data() {
        return {
            searchForm: {
                username: '',
                accountname: ''
            },
            list: null,
            containerLoading: true,
            statusDesc: {
                1: '可用',
                0: '不可用'
            },
            dialogFormLabelWidth: '60px',
            dialogAddUserFormVisible: false,
            dialogLoading: false,
            btnLoading: false,
            addUserForm: {
                username: '',
                password: '',
                name: '',
                mobile: '',
                idcard: ''
            },
            dialogSetRoleFormVisible: false,
            setRoleForm: {
                uid: '',
                roleid: '2',
            },
            roles: { 1: '超级管理员', 2: '信审人员' }
        }
    },
    filters: {
        statusFilter(status) {
            const statusMap = {
                1: 'success',
                0: 'danger'
            }
            return statusMap[status]
        }
    },
    components: {
        Pagination
    },
    created() {
        this.fetchData()
    },
    methods: {
        AddUserSubmit() {
            this.btnLoading = true
            addUser(this.addUserForm).then(response => {
                this.btnLoading = false
                this.dialogAddUserFormVisible = false
                this.$message({
                    message: '添加用户成功',
                    type: 'success'
                });
            })
        },
        searchSubmit() {
            this.fetchData();
        },
        searchReset() {
            this.searchForm.username = ''
            this.searchForm.accountname = ''
            this.fetchData()
        },
        openSetRole(id) {
            this.dialogSetRoleFormVisible = true
            this.setRoleForm.uid = id
        },
        setRoleSubmit() {
            this.dialogSetRoleFormVisible = false
            this.$message({
                message: '设置角色成功',
                type: 'success'
            });
        },
        changeStatus(status, id) {
            let msg = status === 0 ? '启用' : '停用';
            this.$confirm(`${msg}该角色, 是否继续?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: `${msg}成功!`
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: `已取消${msg}`
                });
            });
        },
        changePassword(id) {
            this.$prompt('请输入密码（6-20位字母数字组合）', '重置密码', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /^[A-Za-z0-9]{6,20}$/,
                inputErrorMessage: '密码格式不正确'
            }).then(({ value }) => {
                this.$message({
                    type: 'success',
                    message: '你的密码是: ' + value
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消输入'
                });
            });
        },
        filterStatus(value, row) {
            return row.status === value
        },
        handlePage(currentPage, currentPageSize) {
            this.searchForm.currentPage = currentPage
            this.searchForm.currentPageSize = currentPageSize
            this.fetchData()
        },
        fetchData() {
            this.containerLoading = true
            getUserList(this.searchForm).then(response => {
                this.list = response.data.userlist
                this.containerLoading = false
            })
        }
    }
}
</script>
