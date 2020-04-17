<template>
    <div class="col center-part">
        <header class="bg-light lter wrapper-md">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="#">宠物管理</el-breadcrumb-item>
                <el-breadcrumb-item>免疫证书审核</el-breadcrumb-item>
            </el-breadcrumb>
        </header>
        <!--内容页-->
        <div class="wrapper-md pet-manage-content">
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
                            :data="petCardList"
                            border
                            style="width: 100%">
                        <el-table-column
                                prop="petName"
                                label="宠物昵称"
                                width="180">
                        </el-table-column>

                        <el-table-column
                                prop="petType"
                                label="宠物类型"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="petCard.cardNumber"
                                label="免疫证书编号">
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
                        <el-pagination v-if="pageNationPos"
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
                <el-dialog title="宠物免疫证书审核" top="1vh"  width="60%" :visible.sync="isShowDesc">
                    <pet-card-review v-if="isShowDesc" :pet-info="petInfo"></pet-card-review>
                    <span slot="footer" class="dialog-footer">

                         <el-button  slot="refere   nce" type="danger" @click="checkFalse">审核失败</el-button>

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
        Col, Row, Cascader
    } from "element-ui"
    import adminService from "network/adminAxios"
    import PetCardReview from "./PetCardReview"

    export default {
        name: "PetCardCheck",
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
            ElPopconfirm: Popconfirm,
            ElCol: Col,
            ElRow: Row,
            ElCascader: Cascader,
            PetCardReview

        },
        data() {
            return {
                petCardList: [],
                pages: 0,
                total: 0,
                pageSize: 2,
                isShowDesc: false,
                petId: -1,
                options: [],
                selectedOptions: [-1],
                areaFilter: -1,
                pageNationPos: true,
                petInfo:[]
            }
        },
        created() {
            this.loadPetCardListAndGetOptions(1, this.pageSize, this.areaFilter)
        },
        methods: {
            loadPetCardListAndGetOptions: function (currentPage, pageSize, areaFilter) {
                this.$Loading.start()
                this.currentPage = currentPage
                const that = this
                Promise.all([
                    new Promise((resolve, reject) => {
                        let url = "/api/admin/petCheck/returnUnCheckCardPetInfo?currentPage=" + currentPage + "&pageSize=" + pageSize + "&areaFilter=" + areaFilter
                        adminService.get(url).then(function (res) {
                            that.total = res.data.data.total
                            that.pages = res.data.data.pages
                            // let arr =[]
                            // for(let i = 0;i < res.data.data.records.petCard.length;i++){
                            //     res.data
                            // }
                            that.petCardList = res.data.data.records
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
            loadPetCardList: function (currentPage, pageSize, areaFilter) {
                this.$Loading.start()
                this.currentPage = currentPage
                let url = "/api/admin/petCheck/returnUnCheckCardPetInfo?currentPage=" + currentPage + "&pageSize=" + pageSize + "&areaFilter=" + areaFilter
                let that = this
                adminService.get(url).then(function (res) {
                    that.total = res.data.data.total
                    that.pages = res.data.data.pages
                    that.petCardList = res.data.data.records
                    that.$Loading.finish()

                })
            },
            handleAreaChange: function (val) {
                this.total = 0
                if (this.$refs['location'].getCheckedNodes()[0].pathLabels[1] === undefined) {
                    this.currentPage = 1
                    this.loadPetCardList(this.currentPage, this.pageSize, "-1")
                } else {
                    this.areaFilter = this.$refs['location'].getCheckedNodes()[0].pathLabels[1]
                    this.currentPage = 1
                    this.loadPetCardList(this.currentPage, this.pageSize, this.areaFilter)
                }
            },
            getOptions: function () {
                let url = "/api/admin/plot/getPlotAndBuild"
                const that = this
                adminService.get(url).then(function (res) {
                    let arr = []
                    arr.push({
                        value: "-1",
                        label: "所有区域"
                    })
                    that.options = arr.concat(res.data.data)
                })
            },
            changePage: function (currentPage) {
                this.loadPetCardList(currentPage, this.pageSize, this.areaFilter)
            },
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
                            let url = "/api/admin/petCheck/checkCardFalse"
                            adminService({
                                url:url,
                                method: "post",
                                data:{
                                    'petCardId':this.petInfo.petCard.petCardId,
                                    'petId':this.petInfo.petId,
                                    'falseRes':val.value
                                }
                            }).then(function (res) {
                                if (res.data.code === 100) {
                                    that.$Message({
                                        type: 'success',
                                        message: '操作成功!'
                                    })
                                    that.isShowDesc = false
                                    that.loadPetCardList(1, that.pageSize,that.areaFilter)
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

            },
            checkPass: function () {
                this.$msgbox.confirm('确认审核通过吗？！', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'success',
                }).then((val) => {
                    Promise.all([
                        new Promise((resolve, reject) => {
                            const that = this
                            let url = "/api/admin/petCheck/checkCardPass"
                            adminService({
                                url:url,
                                method: "post",
                                data:{
                                    'petCardId':this.petInfo.petCard.petCardId,
                                    "petId":this.petInfo.petId,
                                    'falseRes':val.value
                                }
                            }).then(function (res) {
                                if (res.data.code === 100) {
                                    that.$Message({
                                        type: 'success',
                                        message: '操作成功!'
                                    })
                                    that.isShowDesc = false
                                    that.loadPetCardList(1, that.pageSize,that.areaFilter)
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

            },
            handleEdit: function (index, row) {
                // this.$router.push("petReview?petId=" + row.petId)
                this.petInfo = row
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
