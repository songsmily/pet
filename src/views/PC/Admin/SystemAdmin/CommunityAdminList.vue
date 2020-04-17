<template>
    <div class="col center-part">
        <header class="bg-light lter wrapper-md">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="'#'">用户管理</el-breadcrumb-item>
                <el-breadcrumb-item>社区管理员</el-breadcrumb-item>
            </el-breadcrumb>
        </header>
        <!--内容页-->
        <div class="wrapper-md pet-manage-content">
            <div style="margin-top: 20px">

                <div style="display: flex;justify-content: space-between;margin: 20px">
                    <div>
                        <el-autocomplete
                                v-model="username"
                                :fetch-suggestions="getUsernameAsync"
                                placeholder="用户名查询"
                                @select="handleSelect"

                        >
                            <i slot="prefix" class="el-input__icon el-icon-search"></i>
                        </el-autocomplete>
                        <el-button style="margin-left: 10px"  @click="clearSearch">重置</el-button>

                    </div>
                    <el-button size="medium" round icon="el-icon-edit" @click="isShowDesc = true"> 添加社区管理员
                    </el-button>
                </div>

                <el-table
                        ref="filterTable"
                        :data="adminList"
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

                            label="用户名"  prop="username">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="真实姓名"  prop="realName">
                    </el-table-column>



                    <el-table-column
                            align="center"
                            label="电话" width="180" prop="phone">
                    </el-table-column>
                    <el-table-column label="状态" align="center">
                        <template slot-scope="scope">

                            <a-tag  v-if="scope.row.status === 1" color="blue" >已启用</a-tag>
                            <a-tag v-if="scope.row.status === 2" color="red">已禁用</a-tag>
                        </template>

                    </el-table-column>


                    <el-table-column label="操作" width="250" align="center">
                        <template slot-scope="scope">
                            <el-button v-if="scope.row.status === 2"
                                    type="primary"
                                    size="mini"
                                    @click="handleEnable(scope.$index, scope.row)">启用 </el-button>
                            <el-button v-else-if="scope.row.status === 1"
                                    size="mini"
                                    type="warning"
                                    @click="handleDisable(scope.$index, scope.row)">禁用</el-button
                            ><el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
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

                <el-dialog title="添加社区管理员" top="1vh" width="60%" :visible.sync="isShowDesc">
                    <add-admin v-if="isShowDesc" :account-type="pageInfo.accountType"></add-admin>
<!--                    <span slot="footer" class="dialog-footer">-->

<!--                        <el-button slot="reference" type="danger" @click="checkFalse">审核失败</el-button>-->
<!--    -->
<!--                        <el-button type="success" @click="checkPass">通过审核</el-button>-->
<!--                        <el-button type="primary" @click="isShowDesc=false">返回</el-button>-->
<!--                    </span>-->
                </el-dialog>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        Descriptions as ADescriptions,
        Divider as ADivider,
        Badge as ABadge,
        Tag as ATag,

    } from "ant-design-vue"
    import {Breadcrumb, BreadcrumbItem,Table,TableColumn,Pagination,Button,FormItem,Form,Dialog,Autocomplete} from "element-ui"
    import adminService from "../../../../network/adminAxios"
    import moment from 'moment'
    import marked from 'marked'
    import AddAdmin from "./AddAdmin"


    export default {
        name: "CommunityAdminList",
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
            ElForm:Form,
            ElDialog:Dialog,
            AddAdmin,
            ElAutocomplete:Autocomplete

        },
        data() {
            return {
                currentPage:1,
                pageSize:5,
                total:0,
                dateFilter:[],
                // dateFilter:[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}],
                adminList:[],
                pageInfo:{
                    currentPage:1,
                    pageSize:5,
                    accountType:2
                },
                isShowDesc: false,
                username:"",
                usernameList:[],
                isSearch:false
            }
        },
        mounted() {
            this.$Loading.start()
            this.getAdminList()
        },
        watch:{
            "isShowDesc":function () {
                if (!this.isShowDesc){
                    this.$Loading.start()
                    this.getAdminList()
                }
            }
        },
        methods: {
            getAdminList:function(){
                const that = this
                adminService({
                    method:"post",
                    url:"/api/admin/system//getAdminList",
                    data:that.pageInfo
                }).then(res => {
                    if (res.data.code === 100) {
                        that.adminList = res.data.data.records
                        that.total = res.data.data.total
                        that.$Loading.finish()
                    }
                })
            },
            //启用账号
            handleEnable(index, row) {
                const that = this;

                this.$msgbox.confirm('确认启用该账号吗？！', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'success',
                }).then(res => {
                    that.$Message.info("操作执行中！")
                    adminService({
                        method:"get",
                        url:"/api/admin/system/enableAdmin?id=" + row.id
                    }).then(res => {
                        if (res.data.code === 100){
                            that.$Message.success("执行成功！")
                            if (!that.isSearch){
                                that.$Loading.start();
                                that.getAdminList()
                            } else {
                                that.adminList[0].status = 1
                            }
                            that.usernameList = []

                        }
                    })
                })

            },
            //禁用账号
            handleDisable(index, row) {
                const that = this;

                this.$msgbox.confirm('确认禁用该账号吗？！', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'success',
                }).then(res => {
                    that.$Message.info("操作执行中！")
                    adminService({
                        method:"get",
                        url:"/api/admin/system/disableAdmin?id=" + row.id
                    }).then(res => {
                        if (res.data.code === 100){
                            that.$Message.success("执行成功！")
                            if (!that.isSearch){
                                that.$Loading.start();
                                that.getAdminList()
                            } else {
                                that.adminList[0].status = 2
                            }
                            that.usernameList = []


                        }
                    })
                })

            },
            //删除账号
            handleDelete(index, row) {
                const that = this;

                this.$msgbox.confirm('确认删除该账号吗？！', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'success',
                }).then(res => {
                    that.$Message.info("操作执行中！")
                    adminService({
                        method:"get",
                        url:"/api/admin/system/deleteAdmin?id=" + row.id
                    }).then(res => {
                        if (res.data.code === 100){
                            that.$Message.success("删除成功！")
                            if (that.adminList.length < 2) {
                                that.currentPage = that.currentPage === 1 ? 1 : that.currentPage - 1
                            }
                            that.usernameList = []
                            that.username = ""
                            that.$Loading.start();
                            that.getAdminList()
                        }
                    })
                })
            },
            changePage:function(currentPage){
                this.pageInfo.currentPage =  currentPage
                this.$Loading.start()
                this.getAdminList()
            },
            formatter(row, column) {
                return row.address;
            },
            getUsernameAsync(queryString, cb) {
                const that = this

                new Promise(resolve => {
                    if (that.usernameList.length < 1){
                        adminService({
                            method:"get",
                            url: "/api/admin/system/getUserNameList?accountType=2",
                        }).then(res => {
                            that.usernameList = res.data.data
                            resolve(true)
                        })
                    } else {
                        resolve(true)
                    }

                }).then(res => {
                    let results = queryString ? that.usernameList.filter(this.createStateFilter(queryString)) : that.usernameList;
                    if (results.length <= 0) {
                        that.$Message.error("查无此用户！")
                    }
                    cb(results);
                })


            },
            createStateFilter(queryString) {
                return (state) => {
                    return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            handleSelect(item) {
                this.total = 1
                let arr = [item.adminUser]
                this.adminList = arr
                this.isSearch = true

            },
            clearSearch:function () {
                this.isSearch = false
                this.username = ""

                this.$Loading.start()
                this.getAdminList()
            }
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
