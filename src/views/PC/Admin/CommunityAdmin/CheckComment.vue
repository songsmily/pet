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
                筛选：
                <el-select v-model="commentLevel" placeholder="请选择" style="width: 40%;margin-bottom: 20px"
                           @change="handleLevelChange">
                    <el-option
                            v-for="item in commentLevelOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-table
                        v-if="commentLevel===1"
                        ref="filterTable"
                        :data="commentList"
                        style="width: 100%"
                        @expand-change="descChange"
                       >
                    <el-table-column type="expand" >
                        <template slot-scope="props">
                            <el-form label-position="left" inline class="demo-table-expand">

                                <el-form-item style="display: block" label="评论内容:">
                                    <div  v-html="props.row.commentContent"></div>
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
                            prop="commentUserName" width="180">
                    </el-table-column>
                    <el-table-column
                            label="评论内容" >
                        <template slot-scope="scope">
                            <div class="table-content">
                                <span style="margin-left: 10px" v-html="scope.row.commentContent"></span>
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
                <el-table
                        v-else
                        ref="filterTable"
                        :data="commentList"
                        style="width: 100%"
                        @expand-change="descChange"
                       >
                    <el-table-column type="expand" >
                        <template slot-scope="props">
                            <el-form label-position="left" inline class="demo-table-expand">

                                <el-form-item style="display: block" label="评论内容:">
                                    <div  v-html="props.row.secContent"></div>
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
                            prop="secCommentUserName" width="180">
                    </el-table-column>
                    <el-table-column
                            label="评论内容" >
                        <template slot-scope="scope">
                            <div class="table-content">
                                <span style="margin-left: 10px" v-html="scope.row.secContent"></span>
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
                                    @click="handleSecPass(scope.$index, scope.row)">通过审核</el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleSecDelete(scope.$index, scope.row)">删除</el-button>
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
    import {Breadcrumb, BreadcrumbItem,Table,TableColumn,Pagination,Button,FormItem,Form,Select,Option} from "element-ui"
    import adminService from "../../../../network/adminAxios"
    import moment from 'moment'
    import marked from 'marked'


    export default {
        name: "CheckComment",
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
            ElSelect:Select,
            ElOption:Option

        },
        data() {
            return {
                currentPage:1,
                pageSize:2,
                total:0,
                dateFilter:[],
                commentList:[],
                commentLevel:1,
                commentLevelOptions: [{
                    value: 1,
                    label: '一级评论'
                }, {
                    value: 2,
                    label: '二级评论'
                }],
            }
        },
        mounted() {
            this.$Loading.start()
            this.getComments()
        },
        methods: {
            getComments:function(){
                const that = this
                adminService({
                    method:"post",
                    url:"/api/admin/blCheck/getComments",
                    data:{
                        pageSize:that.pageSize,
                        currentPage:that.currentPage,
                        commentLevel:that.commentLevel
                    }
                }).then(res => {
                    if (res.data.code === 100) {
                        that.dateFilter = []
                        let records = res.data.data.records
                        that.total = res.data.data.total
                        if (that.commentLevel === 1){
                            for (let i = 0; i < records.length; i++) {
                                records[i].commentContent = marked(records[i].commentContent)
                            }
                        }else {

                            for (let i = 0; i < records.length; i++) {

                                records[i].secContent = marked(records[i].secContent)
                            }
                        }


                        that.commentList = records
                        that.$Loading.finish()
                    }
                })
            },
            descChange(row,expandedRows){
                console.log(row)
            },
            //一级评论通过审核
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
                        url:"/api/admin/blCheck/commentPass?commentId=" + row.commentId
                    }).then(res => {
                        if (res.data.code === 100){
                            that.$Message.success("执行成功！")
                            if (that.commentList.length < 2) {
                                that.currentPage = that.currentPage === 1 ? 1 : that.currentPage - 1
                            }
                            that.$Loading.start();
                            that.getComments()
                        }
                    })
                })

            },
            //一级评论删除
            handleDelete(index, row) {
                const that = this;

                this.$msgbox.confirm('确认删除该评论吗？！', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'success',
                }).then(res => {
                    that.$Message.info("操作执行中！")
                    adminService({
                        method:"get",
                        url:"/api/admin/blCheck/commentDelete?commentId=" + row.commentId
                    }).then(res => {
                        if (res.data.code === 100){
                            that.$Message.success("删除成功！")
                            if (that.commentList.length < 2) {
                                that.currentPage = that.currentPage === 1 ? 1 : that.currentPage - 1
                            }
                            that.$Loading.start();
                            that.getComments()
                        }
                    })
                })
            },
            //通过审核
            handleSecPass(index, row) {
                const that = this;

                this.$msgbox.confirm('确认审核通过吗？！', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'success',
                }).then(res => {
                    that.$Message.info("操作执行中！")
                    adminService({
                        method:"get",
                        url:"/api/admin/blCheck/commentSecPass?commentSecId=" + row.secId
                    }).then(res => {
                        if (res.data.code === 100){
                            that.$Message.success("执行成功！")
                            if (that.commentList.length < 2) {
                                that.currentPage = that.currentPage === 1 ? 1 : that.currentPage - 1
                            }
                            that.$Loading.start();
                            that.getComments()
                        }
                    })
                })

            },
            handleSecDelete(index, row) {
                const that = this;

                this.$msgbox.confirm('确认删除该评论吗？！', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'success',
                }).then(res => {
                    that.$Message.info("操作执行中！")
                    adminService({
                        method:"get",
                        url:"/api/admin/blCheck/commentSecDelete?commentSecId=" + row.secId
                    }).then(res => {
                        if (res.data.code === 100){
                            that.$Message.success("删除成功！")
                            if (that.commentList.length < 2) {
                                that.currentPage = that.currentPage === 1 ? 1 : that.currentPage - 1
                            }
                            that.$Loading.start();
                            that.getComments()
                        }
                    })
                })
            },
            handleLevelChange:function(){
                this.currentPage = 1;
                this.total = 0;
                this.getComments()
            },
            changePage:function(currentPage){
                this.currentPage =  currentPage
                this.$Loading.start()
                this.getComments()
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
        width: 80px;
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
