<template>
    <div class="col center-part">
        <header class="bg-light lter wrapper-md">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="#">宠物管理</el-breadcrumb-item>
                <el-breadcrumb-item>宠物审核</el-breadcrumb-item>
            </el-breadcrumb>
        </header>
        <!--内容页-->
        <div class="wrapper-md pet-manage-content" >
            <div>
                <div id="intro">
                    <el-col id="filterArea">
                        <span>筛选：</span>
                        <el-cascader ref="location" :options="options" v-model="selectedOptions"
                                     @change="handleAreaChange" style="width: 40%;">
                            <template slot-scope="{ node, data }">
                                <span>{{ data.label }}</span>
                                <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
                            </template>
                        </el-cascader>
                    </el-col>
                    <el-table
                            stripe
                            :data="petList"
                            border
                            style="width: 100%">
                        <el-table-column
                                prop="petName"
                                label="宠物昵称"
                                width="180">
                        </el-table-column>
                        <!--                        <el-table-column-->
                        <!--                                label="宠物昵称"-->
                        <!--                                width="180">-->
                        <!--                            <template slot-scope="scope">-->
                        <!--                                <el-popover trigger="hover" placement="top">-->
                        <!--                                    <p>姓名: {{ scope.row.petName }}</p>-->
                        <!--                                    <p>住址: {{ scope.row.petRaiseAddr }}</p>-->
                        <!--                                    <el-avatar :src="scope.row.petImageUrl"></el-avatar>-->
                        <!--                                    <div slot="reference" class="name-wrapper">-->
                        <!--                                        <el-tag size="large">{{ scope.row.petName }}</el-tag>-->
                        <!--                                    </div>-->
                        <!--                                </el-popover>-->
                        <!--                            </template>-->
                        <!--                        </el-table-column>-->

                        <el-table-column
                                prop="petType"
                                label="宠物类型"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="petRaiseAddr"
                                label="饲养地址">
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button
                                        size="mini"
                                        @click="handleEdit(scope.$index, scope.row)">查看详情
                                </el-button>
                                <!--                                <el-button-->
                                <!--                                        size="mini"-->
                                <!--                                        type="danger"-->
                                <!--                                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
                            </template>
                        </el-table-column>
                    </el-table>
                    <div style="text-align: center;margin-top: 20px">
                        <el-pagination
                                background
                                layout="total,prev, pager, next"
                                :total="total"
                                :page-size="pageSize"
                                @current-change="changePage">
                        </el-pagination>
                    </div>

                </div>
            </div>
        </div>
        <el-dialog title="宠物审核" top="1vh" width="60%" :visible.sync="isShowDesc">
            <pet-review v-if="isShowDesc" :pet-id="petId"></pet-review>
            <span slot="footer" class="dialog-footer">

                 <el-button slot="reference" type="danger" @click="checkFalse">审核失败</el-button>

                <el-button type="success" @click="checkPass">通过审核</el-button>
                <el-button type="primary" @click="isShowDesc=false">返回</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {
        Table,
        TableColumn,
        Button,
        Popover,
        Tag,
        Avatar,
        Breadcrumb,
        BreadcrumbItem,
        Pagination,
        Dialog,
        Popconfirm,
        Col,
        Cascader
    } from "element-ui"
    import adminService from "network/adminAxios"
    import PetReview from "./PetReview"

    export default {
        name: "PetCheck",
        components: {
            ElTable: Table,
            ElTableColumn: TableColumn,
            ElButton: Button,
            ElPopover: Popover,
            ElTag: Tag,
            ElAvatar: Avatar,
            ElBreadcrumb: Breadcrumb,
            ElBreadcrumbItem: BreadcrumbItem,
            ElPagination: Pagination,
            ElDialog: Dialog,
            PetReview,
            ElPopconfirm: Popconfirm,
            ElCol: Col,
            ElCascader: Cascader
        },
        data() {
            return {
                petList: [],
                pages: 0,
                total: 0,
                pageSize: 2,
                isShowDesc: false,
                petId: -1,
                options: [],
                selectedOptions: [-1],
                areaFilter: -1,

            }
        },
        created() {
            this.loadPetListAndGetOptions(1, this.pageSize, this.areaFilter)
        },
        methods: {
            loadPetListAndGetOptions: function (currentPage, pageSize, areaFilter) {
                let that = this
                Promise.all([
                    new Promise((resolve, reject) => {
                        let url = "/api/admin/petCheck/returnUnCheckList?currentPage=" + currentPage + "&pageSize=" + pageSize + "&areaFilter=" + areaFilter
                        adminService.get(url).then(function (res) {
                            that.total = res.data.data.total
                            that.pages = res.data.data.pages
                            that.petList = res.data.data.records
                            resolve(true)
                        })
                    }),
                    new Promise((resolve, reject) => {
                        let url = "/api/admin/plot/getPlotAndBuild"
                        adminService.get(url).then(function (res) {
                            let arr = []
                            arr.push({
                                value: -1,
                                label: "所有区域"
                            })
                            that.options = arr.concat(res.data.data)
                            resolve(true)
                        })
                    })
                ]).then(res => {
                    if (res[0] && res[1]) {
                        that.$Loading.finish()
                    }
                })
            },
            loadPetList: function (currentPage, pageSize, areaFilter) {
                this.$Loading.start()

                this.currentPage = currentPage
                let url = "/api/admin/petCheck/returnUnCheckList?currentPage=" + currentPage + "&pageSize=" + pageSize + "&areaFilter=" + areaFilter

                let that = this

                adminService.get(url).then(function (res) {
                    that.total = res.data.data.total
                    that.pages = res.data.data.pages
                    that.petList = res.data.data.records
                    that.$Loading.finish()

                })
            },
            handleAreaChange: function (val) {
                this.total = 0
                if (this.$refs['location'].getCheckedNodes()[0].pathLabels[1] === undefined) {
                    this.currentPage = 1
                    this.loadPetList(this.currentPage, this.pageSize, "-1")
                } else {
                    this.areaFilter = this.$refs['location'].getCheckedNodes()[0].pathLabels[1]
                    this.currentPage = 1
                    this.loadPetList(this.currentPage, this.pageSize, this.areaFilter)
                }
            },
            changePage: function (currentPage) {
                this.loadPetList(currentPage, this.pageSize,this.areaFilter)
            }
            ,
            checkFalse: function () {
                this.$msgbox.prompt('确认审核失败吗？请填写审核失败原因！', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    inputPattern: /\S/,
                    inputErrorMessage: '请填写审核失败原因！'
                }).then((val) => {
                    Promise.all([
                        new Promise((resolve, reject) => {
                            const that = this
                            let url = "/api/admin/petCheck/checkFalse?petId=" + this.petId + "&falseRes=" + val.value
                            adminService.get(url).then(function (res) {
                                if (res.data.code === 100) {
                                    that.$Message({
                                        type: 'success',
                                        message: '操作成功!'
                                    })
                                    that.isShowDesc = false
                                    that.loadPetList(1, that.pageSize,that.areaFilter)
                                } else {
                                    that.$Message({
                                        type: 'error',
                                        message: '操作失败!'
                                    })
                                }
                            })
                            resolve(true)
                        })
                    ]).then(result => {

                    })

                })

            }
            ,
            checkPass: function () {
                this.$msgbox.confirm('确认审核通过吗？！', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'success',
                }).then((val) => {
                    Promise.all([
                        new Promise((resolve, reject) => {
                            const that = this
                            let url = "/api/admin/petCheck/checkPass?petId=" + this.petId
                            adminService.get(url).then(function (res) {
                                if (res.data.code === 100) {
                                    that.$Message({
                                        type: 'success',
                                        message: '操作成功!'
                                    })
                                    that.isShowDesc = false
                                    that.loadPetList(1, that.pageSize,that.areaFilter)
                                } else {
                                    that.$Message({
                                        type: 'error',
                                        message: '操作失败!'
                                    })
                                }
                            })
                            resolve(true)
                        })
                    ]).then(result => {

                    })

                })

            }
            ,
            handleEdit: function (index, row) {
                // this.$router.push("petReview?petId=" + row.petId)
                this.petId = row.petId
                this.isShowDesc = true
            }
        }
    }
</script>

<style scoped>
    #intro {
        margin-top: 30px;
    }

    #filterArea {
        padding-bottom: 20px;
    }
</style>
