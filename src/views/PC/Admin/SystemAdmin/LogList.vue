<template>
    <div class="col center-part">
        <header class="bg-light lter wrapper-md">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="'#'">系统管理</el-breadcrumb-item>
                <el-breadcrumb-item>系统日志</el-breadcrumb-item>
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
                                @change="getUsernameAsync"
                                placeholder="用户名查询"
                                @select="handleSelect"
                        >
                            <i slot="prefix" class="el-input__icon el-icon-search"></i>
                        </el-autocomplete>
                        <el-button style="margin-left: 10px"  @click="clearSearch">重置</el-button>

                    </div>
                </div>

                <el-table
                        ref="filterTable"
                        :data="logList"
                        style="width: 100%"
                        stripe
                        border
                       >
                    <el-table-column type="expand" >
                        <template slot-scope="props">
                            <el-form label-position="left"  label-width="100px" class="demo-table-expand">
                                <el-form-item label="请求方法:">
                                    <span style="font-size: 18px;">{{ props.row.logMethod }}</span>
                                </el-form-item>
                                <br>
                                <el-form-item style="display: block" label="请求参数:">
                                    <div >{{ props.row.logParams}}</div>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column

                            width="100"
                            label="ID"  prop="logId">
                    </el-table-column>
                    <el-table-column

                            width="100"

                            label="用户名"  prop="logUsername">
                    </el-table-column>
                    <el-table-column

                            label="操作内容"  prop="logOperate">
                    </el-table-column>
                    <el-table-column

                            label="操作时间" width="180">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.logGmtCreate | formatDate}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column

                            label="目标IP" width="180" prop="logIp">
                    </el-table-column>

<!--                    <el-table-column label="状态" >-->
<!--                        <template slot-scope="scope">-->

<!--                            <a-tag  v-if="scope.row.status === 1" color="blue" >已启用</a-tag>-->
<!--                            <a-tag v-if="scope.row.status === 2" color="red">已禁用</a-tag>-->
<!--                        </template>-->

<!--                    </el-table-column>-->


<!--                    <el-table-column label="操作" width="250" >-->
<!--                        <template slot-scope="scope">-->
<!--                            <el-button v-if="scope.row.status === 2"-->
<!--                                    type="primary"-->
<!--                                    size="mini"-->
<!--                                    @click="handleEnable(scope.$index, scope.row)">启用 </el-button>-->
<!--                            <el-button v-else-if="scope.row.status === 1"-->
<!--                                    size="mini"-->
<!--                                    type="warning"-->
<!--                                    @click="handleDisable(scope.$index, scope.row)">禁用</el-button-->
<!--                            ><el-button-->
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
        name: "LogList",
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
                    pageSize:10,
                    logAdminId:-1
                },
                isShowDesc: false,
                username:"",
                usernameList:[],
                isSearch:false,
                logList:[]
            }
        },
        mounted() {
            this.$Loading.start()
            this.getLogList()
        },
        watch:{
            "isShowDesc":function () {
                if (!this.isShowDesc){
                    this.usernameList =  []
                    this.$Loading.start()
                    this.getLogList()
                }
            }
        },
        methods: {
            getLogList:function(){
                const that = this
                adminService({
                    method:"post",
                    url:"/api/admin/log//getLogList",
                    data:that.pageInfo
                }).then(res => {
                    if (res.data.code === 100) {
                        that.logList = res.data.data.records
                        that.total = res.data.data.total
                        that.$Loading.finish()
                    }
                })
            },
            changePage:function(currentPage){
                this.pageInfo.currentPage =  currentPage
                this.$Loading.start()
                this.getLogList()
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
                            url: "/api/admin/log/getLogUserNameList",
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
                        that.$Message.error("系统中暂无此用户的日志记录！")
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
                console.log(item.id)
                this.pageInfo.logAdminId = item.id

                this.$Loading.start()
                this.getLogList()
                // this.total = 1
                // let arr = [item.adminUser]
                // this.adminList = arr

            },
            clearSearch:function () {
                this.pageInfo.logAdminId = -1
                this.pageInfo.currentPage = 1
                this.total = 0
                this.usernameList = []
                this.username = ""

                this.$Loading.start()
                this.getLogList()
            }
        },
        filters: {
            formatDate: function (value) {
                return moment(value).format('YYYY-MM-DD hh:mm:ss')
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
