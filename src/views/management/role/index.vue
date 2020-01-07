<template>
  <div id="management-role" class="app-container" v-loading="containerLoading">
    <el-row>
        <el-col :span="24">
            <el-button type="primary" @click="dialogAddRoleFormVisible=true">添加</el-button>
        </el-col>
    </el-row>    
    <el-form ref="searchForm" :model="searchForm" :label-width="dialogFormLabelWidth">
        <el-row :gutter="20">            
            <el-col :sm="8" :md="6" :lg="4">
                <el-form-item label="角色名称">
                    <el-input v-model="searchForm.name" placeholder="请输入角色名称"></el-input>
                </el-form-item>
            </el-col>
            <el-col :sm="8" :md="6" :lg="4">
                <el-form-item label="角色代码">
                    <el-input v-model="searchForm.code" placeholder="请输入角色代码"></el-input>
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
      <el-table-column align="center" label="角色名称" >
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="角色代码" >
        <template slot-scope="scope">
          {{scope.row.code}}
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
          <el-button type="text" size="small" @click="openSetAuthority(scope.row.id)">分配权限</el-button>
          <el-button type="text" size="small" @click="changeStatus(scope.row.status,scope.row.id)">{{scope.row.status===0?'启用':'停用'}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :page-size="10" :total="list?list.length:0" :handle-page="handlePage"></pagination>    
    <el-dialog title="添加角色" :visible.sync="dialogAddRoleFormVisible" width="500px">
        <el-form :model="addRoleForm">
            <el-form-item label="角色名称" :label-width="dialogFormLabelWidth">
                <el-input v-model="addRoleForm.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="角色代码" :label-width="dialogFormLabelWidth">
                <el-input v-model="addRoleForm.code" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogAddRoleFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="AddRoleSubmit" :loading="btnLoading">确 定</el-button>
        </div>
    </el-dialog>
    <el-dialog title="分配权限" :visible.sync="dialogSetAuthorityFormVisible" width="500px">
        <el-tree
            :data="routerMap"
            show-checkbox
            node-key="id"
            default-expand-all>
        </el-tree>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogSetAuthorityFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="setAuthoritySubmit" :loading="btnLoading">确 定</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { getRoleList, addRole } from '@/api/role'

export default {
    data() {
        return {
            searchForm: {
                name: '',
                code: ''
            },
            list: null,
            containerLoading: true,
            statusDesc: {
                1: '可用',
                0: '不可用'
            },
            dialogFormLabelWidth: '70px',
            dialogAddRoleFormVisible: false,
            dialogLoading: false,
            btnLoading: false,
            addRoleForm: {
                name: '',
                code: ''
            },
            dialogSetAuthorityFormVisible: false,
            setAuthorityForm: {
                roleid: '',
            }
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
    computed: {
        routerMap() {
            let routerMap = []
            const filterRouters = (obj, routers) => {
                routers.filter(route => {
                    if (!route.hidden) {
                        let node = {
                            id: route.name,
                            label: route.meta.title
                        }
                        if (route.children && route.children.length) {
                            node.children = []
                            filterRouters(node.children, route.children)
                        }
                        obj.push(node)
                    }
                })
            }
            filterRouters(routerMap, this.$store.state.permission.addRouters)
            return routerMap
        }
    },
    components: {
        Pagination
    },
    created() {
        this.fetchData()
    },
    methods: {
        AddRoleSubmit() {
            this.btnLoading = true
            addRole(this.addRoleForm).then(response => {
                this.btnLoading = false
                this.dialogAddRoleFormVisible = false
                this.$message({
                    message: '添加角色成功',
                    type: 'success'
                });
            })
        },
        searchSubmit() {
            this.fetchData();
        },
        searchReset() {
            this.searchForm.name = ''
            this.searchForm.code = ''
            this.fetchData()
        },
        openSetAuthority(id) {
            this.dialogSetAuthorityFormVisible = true
            this.setAuthorityForm.roleid = id
        },
        setAuthoritySubmit() {
            this.dialogSetAuthorityFormVisible = false
            this.$message({
                message: '权限分配成功',
                type: 'success'
            });
        },
        changeStatus(status, id) {
            let msg = status === 0 ? '启用' : '停用';
            this.$confirm(`${msg}该权限, 是否继续?`, '提示', {
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
            getRoleList(this.searchForm).then(response => {
                this.list = response.data.rolelist
                this.containerLoading = false
            })
        }
    }
}
</script>
