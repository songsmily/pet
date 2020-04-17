<template>
    <div class="col center-part">
        <header class="bg-light lter wrapper-md">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="'#'">社区内容审核</el-breadcrumb-item>
                <el-breadcrumb-item>帖子内容审核</el-breadcrumb-item>
            </el-breadcrumb>
        </header>
        <!--内容页-->
        <div class="wrapper-md pet-manage-content">
            <div style="margin-top: 20px">
                <el-table
                        ref="filterTable"
                        :data="blogList"
                        style="width: 100%"
                        @expand-change="descChange"
                       >
                    <el-table-column type="expand" >
                        <template slot-scope="props">
                            <el-form label-position="left" inline class="demo-table-expand">
                                <el-form-item label="标题:">
                                    <span style="font-size: 18px;">{{ props.row.blogTitle }}</span>
                                </el-form-item>
                                <br>
                                <el-form-item style="display: block" label="正文:">
                                    <div  v-html="props.row.blogContent"></div>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="日期" width="180">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.createdTime | formatDate}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="用户名"
                            prop="name" width="180">
                    </el-table-column>
                    <el-table-column
                            label="标题" >
                        <template slot-scope="scope">
                            <div class="table-content">
                                <span style="margin-left: 10px">{{ scope.row.blogTitle }}</span>
                            </div>

                        </template>
                    </el-table-column>
<!--                    <el-table-column-->
<!--                            label="正文">-->
<!--                        <template slot-scope="scope">-->
<!--                            <div class="table-content">-->
<!--                            <span style="margin-left: 10px">{{ scope.row.blogContent }}</span>-->
<!--                            </div>-->
<!--                        </template>-->
<!--                    </el-table-column>-->
                    <el-table-column label="操作" width="180">
                        <template slot-scope="scope">
                            <el-button
                                    type="primary"
                                    size="mini"
                                    @click="handlePass(scope.$index, scope.row)">通过审核</el-button>
                            <el-button
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
                            :page-size="pageSize"
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
        name: "CheckBlog",
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
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄',
                    tag: '公司'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄',
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄',
                }],
                blogList:[{
                    "blogId": "",
                    "blogType": {
                        type:Number
                    },
                    "blogTitle": "",
                    "blogTag": [],
                    "userId":{
                        type:Number
                    },
                    "blogContent":"",
                    "blogGoods": {
                        type:Number
                    },
                    "blogRead": {
                        type:Number
                    },
                    "blogCollect": {
                        type:Number
                    },
                    "blogComment": {
                        type:Number
                    },
                    "createdTime": {
                        type:Number
                    },
                    "updateTime": {
                        type:Number
                    },
                    "version": 1,
                    "deleted": 0,
                    "name": "",
                    "avatarUrl": "",
                }]
            }
        },
        mounted() {
            this.$Loading.start()
            this.getBlogs()
        },
        methods: {
            getBlogs:function(){
                const that = this
                adminService({
                    method:"post",
                    url:"/api/admin/blCheck/getBlogs",
                    data:{
                        pageSize:that.pageSize,
                        currentPage:that.currentPage
                    }
                }).then(res => {
                    if (res.data.code === 100) {
                        that.dateFilter = []
                        let records = res.data.data.records
                        that.total = res.data.data.total
                        for (let i = 0; i < records.length; i++) {
                            let item = { text: moment(records[i].createdTime).format('YYYY-MM-DD'), value:moment(records[i].createdTime).format('YYYY-MM-DD')}
                            that.dateFilter.push(item)
                            records[i].blogContent = marked(records[i].blogContent)
                        }
                        that.blogList = records
                        that.$Loading.finish()
                    }
                    that.$Loading.finish()
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
                this.currentPage =  currentPage
                this.$Loading.start()
                this.getBlogs()
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
