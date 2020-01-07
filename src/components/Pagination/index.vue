<template>
    <div class="pagination">
        <el-pagination
            class="fr"
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="pageSizes"
            :page-size="currentPageSize"
            :layout="layout"
            :total="total">
        </el-pagination>
        <div class="clearfix"></div>
    </div>
</template>

<script>
export default {
    name: 'pagination',
    data() {
        return {
            currentPage: 1,
            currentPageSize: this.pageSize,
            pageSizes: [10, 20, 50, 100],
            layout: this.$store.state.app.browser.col === 'xs' ? 'prev, pager, next' : 'total, sizes, prev, pager, next, jumper'
        }
    },
    props: {
        pageSize: {
            type: Number,
            default: 100
        },
        total: {
            type: Number,
            default: 0
        },
        handlePage: {
            type: Function,
            default: () => { }
        }
    },
    watch: {
        '$store.state.app.browser.col'(val) {
            this.layout = val === 'xs' ? 'prev, pager, next' : 'total, sizes, prev, pager, next, jumper'
        }
    },
    methods: {
        handleSizeChange(val) {
            this.currentPageSize = val
            this.handlePage(this.currentPage, this.currentPageSize)
        },
        handleCurrentChange(val) {
            this.currentPage = val
            this.handlePage(this.currentPage, this.currentPageSize)
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.pagination {
  margin: 10px auto;
}
</style>
