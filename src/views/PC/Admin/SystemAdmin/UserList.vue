<template>
    <div class="col center-part">
        <header class="bg-light lter wrapper-md">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="'#'">用户管理</el-breadcrumb-item>
                <el-breadcrumb-item>社区用户</el-breadcrumb-item>
            </el-breadcrumb>
        </header>
        <!--内容页-->
        <div class="wrapper-md pet-manage-content">
            <div style="margin-top: 20px">
                <el-table
                        ref="filterTable"
                        :data="userList"
                        style="width: 100%"
                        stripe
                        border
                       >

                    <el-table-column
                            align="center"

                            label="ID"  prop="id">
                    </el-table-column>
                    <el-table-column
                            align="center"

                            label="用户名"  prop="name">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="真实姓名"  prop="realName">
                    </el-table-column>

                    <el-table-column
                            align="center"
                            label="注册日期" width="180">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.gmtCreate | formatDate}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="地区" width="180" prop="location">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="住址" width="180" prop="addr">
                    </el-table-column>

                    <el-table-column
                            align="center"
                            label="电话" width="180" prop="phone">
                    </el-table-column>

                    <el-table-column
                            align="center"
                            label="email" width="180" prop="email">
                    </el-table-column>


<!--                    <el-table-column-->
<!--                            label="正文">-->
<!--                        <template slot-scope="scope">-->
<!--                            <div class="table-content">-->
<!--                            <span style="margin-left: 10px">{{ scope.row.blogContent }}</span>-->
<!--                            </div>-->
<!--                        </template>-->
<!--                    </el-table-column>-->
<!--                    <el-table-column label="操作" width="180">-->
<!--                        <template slot-scope="scope">-->
<!--                            <el-button-->
<!--                                    type="primary"-->
<!--                                    size="mini"-->
<!--                                    @click="handlePass(scope.$index, scope.row)">通过审核</el-button>-->
<!--                            <el-button-->
<!--                                    size="mini"-->
<!--                                    type="danger"-->
<!--                                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
<!--                        </template>-->
<!--                    </el-table-column>-->
                </el-table>
                <div style="text-align: center;margin-top: 10px;margin-bottom: 10px;">
                    <el-pagination
                            background
                            layout="total,prev, pager, next"
                            :total="total"
                            :page-size="pageInfo.pageSize"
                            @current-change="changePage">
                    </el-pagination>
                </div>
<!--                <el-table-->
<!--                        ref="filterTable"-->
<!--                        :data="tableData"-->
<!--                        style="width: 100%">-->
<!--                    <el-table-column-->
<!--                            prop="date"-->
<!--                            label="日期"-->
<!--                            sortable-->

<!--                            column-key="date"-->
<!--                            :filters="dateFilter"-->
<!--                            :filter-method="filterHandler"-->
<!--                    >-->
<!--                    </el-table-column>-->
<!--                    <el-table-column-->
<!--                            prop="name"-->
<!--                            label="姓名"-->
<!--                             >-->
<!--                    </el-table-column>-->
<!--                    <el-table-column-->
<!--                            prop="address"-->
<!--                            label="地址"-->
<!--                            :formatter="formatter">-->
<!--                    </el-table-column>-->

<!--                </el-table>-->
            </div>
        </div>
    </div>
</template>

<script>
    import {
        Descriptions as ADescriptions,
        Divider as ADivider,
        Badge as ABadge,
        Tag as ATag
    } from "ant-design-vue"
    import {Breadcrumb, BreadcrumbItem,Table,TableColumn,Pagination,Button,FormItem,Form} from "element-ui"
    import adminService from "../../../../network/adminAxios"
    import moment from 'moment'
    import marked from 'marked'


    export default {
        name: "UserList",
        components: {
            ADescriptions,
            ADescriptionsItem: ADescriptions.Item,
            ADivider,
            ABadge,
            ElBreadcrumb: Breadcrumb,
            ElBreadcrumbItem: BreadcrumbItem,
            ATag,
            ElTable:Table,
            ElTableColumn:TableColumn,
            ElPagination:Pagination,
            ElButton:Button,
            ElFormItem:FormItem,
            ElForm:Form

        },
        data() {
            return {
                currentPage:1,
                pageSize:5,
                total:0,
                dateFilter:[],
                // dateFilter:[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}],
                userList:[],
                pageInfo:{
                    currentPage:1,
                    pageSize:5,
                    areaFilter:null
                }
            }
        },
        mounted() {
            this.$Loading.start()
            this.getUserList()
        },
        methods: {
            getUserList:function(){
                const that = this
                adminService({
                    method:"post",
                    url:"/api/admin/system//getUserList",
                    data:that.pageInfo
                }).then(res => {
                    if (res.data.code === 100) {
                        that.userList = res.data.data.records
                        that.total = res.data.data.total
                        // that.dateFilter = []
                        // let records = res.data.data.records
                        // that.total = res.data.data.total
                        // for (let i = 0; i < records.length; i++) {
                        //     let item = { text: moment(records[i].createdTime).format('YYYY-MM-DD'), value:moment(records[i].createdTime).format('YYYY-MM-DD')}
                        //     that.dateFilter.push(item)
                        //     records[i].blogContent = marked(records[i].blogContent)
                        // }
                        // that.blogList = records
                        that.$Loading.finish()
                    }
                })
            },
            descChange(row,expandedRows){
                console.log(row)
            },
            //通过审核
            handlePass(index, row) {
                const that = this;

                this.$msgbox.confirm('确认审核通过吗？！', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'success',
                }).then(res => {
                    that.$Message.info("操作执行中！")
                    adminService({
                        method:"get",
                        url:"/api/admin/blCheck/blogPass?blogId=" + row.blogId
                    }).then(res => {
                        if (res.data.code === 100){
                            that.$Message.success("执行成功！")
                            if (that.blogList.length < 2) {
                                that.currentPage = that.currentPage === 1 ? 1 : that.currentPage - 1
                            }
                            that.$Loading.start();
                            that.getBlogs()
                        }
                    })
                })

            },
            handleDelete(index, row) {
                const that = this;

                this.$msgbox.confirm('确认删除该帖子吗？！', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'success',
                }).then(res => {
                    that.$Message.info("操作执行中！")
                    adminService({
                        method:"get",
                        url:"/api/admin/blCheck/blogDelete?blogId=" + row.blogId
                    }).then(res => {
                        if (res.data.code === 100){
                            that.$Message.success("删除成功！")
                            if (that.blogList.length < 2) {
                                that.currentPage = that.currentPage === 1 ? 1 : that.currentPage - 1
                            }
                            that.$Loading.start();
                            that.getBlogs()
                        }
                    })
                })
            },
            changePage:function(currentPage){
                this.pageInfo.currentPage =  currentPage
                this.$Loading.start()
                this.getUserList()
            },
            formatter(row, column) {
                return row.address;
            },
        },
        filters: {
            formatDate: function (value) {
                return moment(value).format('YYYY-MM-DD')
            },
            markedContent:function (value) {
                return marked(value)
            }
        }
    }
</script>

<style>
    .ant-descriptions-bordered .ant-descriptions-item-label {
        background-color: aliceblue;
    }
    .table-content{
        width: 100%;
        white-space:nowrap;
        text-overflow:ellipsis;
        -o-text-overflow:ellipsis;
        overflow: hidden;
    }
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 50px;
        font-size: 15px;
        display: block;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
</style>
