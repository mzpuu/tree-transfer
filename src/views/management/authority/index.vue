<template>
  <div id="management-authority" class="app-container" v-loading="containerLoading">
    <el-row>
        <el-col :span="24">
            <el-button type="primary" @click="save">保存</el-button>
        </el-col>
    </el-row>
    <el-tree
      ref="tree"
      :data="routerMap"
      show-checkbox
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
      :render-content="renderContent">
    </el-tree>
  </div>
</template>

<script>
import { saveAuthority } from '@/api/authority'

export default {
    data() {
        return {
            containerLoading: false
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
            filterRouters(routerMap, this.$store.state.permission.asyncRouters)
            return routerMap
        }
    },
    mounted() {
        this.initCheckedRouter()
    },
    methods: {
        renderContent(h, { node, data, store }) {
            return (
                <span class="custom-tree-node">
                    <span>{node.label}</span>
                    <span>
                        <el-tag type={node.checked ? 'success' : 'danger'}>{node.checked ? '启用' : '停用'}</el-tag>
                    </span>
                </span>);
        },
        initCheckedRouter() {
            let routerMap = []
            const filterRouters = (routers) => {
                routers.filter(route => {
                    if (!route.hidden) {
                        if (route.children && route.children.length) {
                            filterRouters(route.children)
                        } else {
                            routerMap.push(route.name)
                        }
                    }
                })
            }
            filterRouters(this.$store.state.permission.addRouters)
            this.$refs.tree.setCheckedKeys(routerMap)
        },
        save() {
            this.$confirm('保存对权限的修改, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.containerLoading = true
                saveAuthority().then(response => {
                    this.containerLoading = false
                    this.$message({
                        type: 'success',
                        message: '保存成功!'
                    });
                })
            });
        }
    }
}
</script>
<style>
#management-authority .el-tree-node__content {
  height: 38px;
}
</style>
