<template>
    <div class="col center-part">
        <header class="bg-light lter wrapper-md">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="#">宠物管理</el-breadcrumb-item>
                <el-breadcrumb-item>宠物信息</el-breadcrumb-item>
            </el-breadcrumb>
        </header>
        <!--内容页-->
        <div class="wrapper-md pet-manage-content">
            <div>
                <div id="intro">
                    <el-col class="filter">
                        <span>饲养区域：</span>
                        <el-cascader ref="location" :show-all-levels="false" :options="options"
                                     v-model="selectedOptions"
                                     @change="handleAreaChange" style="width: 40%;">
                            <template slot-scope="{ node, data }">
                                <span>{{ data.label }}</span>
                                <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
                            </template>
                        </el-cascader>
                        <span style="margin-left: 10px">宠物状态：</span>
                        <el-select v-model="petType" placeholder="请选择" style="width: 40%;"
                                   @change="handlePetTypeChange">
                            <el-option
                                    v-for="item in petTypeOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col class="filter">
                        <span>免疫证书：</span>
                        <el-select v-model="petCardType" placeholder="请选择" style="width: 40%"
                                   @change="handlePetCardTypeChange">
                            <el-option
                                    v-for="item in petCardOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        <span style="margin-left: 10px">免疫信息：</span>
                        <el-select v-model="petImmunityType" placeholder="请选择" style="width: 40%"
                                   @change="handlePetImmunityTypeChange">
                            <el-option
                                    v-for="item in petImmunityOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>

                    <el-table
                            stripe
                            :data="petList"
                            border
                            style="width: 100%"
                    >
                        <el-table-column
                                prop="petInfo.petName"
                                label="宠物昵称"
                                align="center"
                        >
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
                                prop="petInfo.petType"
                                label="宠物类型"
                                align="center"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="userInfo.realName"
                                align="center"
                                label="属主">
                        </el-table-column>
                        <el-table-column
                                prop="petInfo.petRaiseAddr"
                                align="center"
                                label="饲养地址">
                        </el-table-column>

                        <el-table-column
                                align="center"
                                label="宠物状态">
                            <template slot-scope="scope">

                                <el-link v-if="scope.row.petInfo.isCancel==1"    :underline="false" type="danger">已注销</el-link>
                                <el-link v-else-if="scope.row.petInfo.petStatus==0"   :underline="false" type="warning">待审核</el-link>
                                <el-link v-else-if="scope.row.petInfo.petStatus==1"   :underline="false" type="success">审核通过</el-link>
                            </template>
                        </el-table-column>

                        <el-table-column
                                align="center"
                                label="免疫证书编号">
                            <template slot-scope="scope">
                                <el-link :underline="false" type="success" v-if="scope.row.petInfo.petCard != null ">
                                    {{scope.row.petInfo.petCard.cardNumber}}
                                </el-link>
                                <el-link :underline="false" v-else type="danger">未上传</el-link>
                            </template>
                        </el-table-column>

                        <el-table-column
                                align="center"
                                prop="petImmunityCount"
                                label="免疫次数">

                        </el-table-column>

                        <el-table-column
                                align="center"
                                label="详情">
                            <template
                                    slot-scope="scope">
                                <el-button
                                        size="mini"
                                        @click="handleEdit(scope.$index, scope.row)">详情
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
        <el-dialog title="宠物详细信息" top="1vh" width="60%" height="100%" :visible.sync="isShowDesc">
            <!--            <pet-review v-if="isShowDesc" :pet-id="petId"></pet-review>-->
            <pet-all-info-detail  :pet-info="petInfoItem"></pet-all-info-detail>
            <!--            <span slot="footer" class="dialog-footer">-->

            <!--                 <el-button slot="reference" type="danger" @click="checkFalse">审核失败</el-button>-->

            <!--                <el-button type="success" @click="checkPass">通过审核</el-button>-->
            <!--                <el-button type="primary" @click="isShowDesc=false">返回</el-button>-->
            <!--            </span>-->
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
        Cascader,
        Select,
        Option,
        Link
    } from "element-ui"
    import adminService from "network/adminAxios"
    import PetAllInfoDetail from "./PetAllInfoDetail"

    export default {
        name: "PetInfoList",
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
            ElCascader: Cascader,
            PetAllInfoDetail,
            ElSelect: Select,
            ElOption: Option,
            ElLink:Link,
        },
        data() {
            return {
                petList: [],
                pages: 0,
                total: 0,
                pageSize: 2,
                isShowDesc: false,
                petId: -1,
                currentPage:1,
                options: [],
                selectedOptions: [-1],
                areaFilter: -1,
                petInfoItem: [],
                petTypeOptions: [{
                    value: -2,
                    label: '所有状态'
                }, {
                    value: 0,
                    label: '待审核'
                }, {
                    value: 1,
                    label: '审核通过'
                },{
                    value: -1,
                    label: '已注销'
                }],
                petType: -2,
                petCardOptions: [{
                    value: -2,
                    label: '所有状态'
                }, {
                    value: -1,
                    label: '待上传'
                }, {
                    value: 0,
                    label: '待审核'
                }, {
                    value: 1,
                    label: '已审核'
                }],
                petCardType: -2,
                petImmunityOptions: [{
                    value: -2,
                    label: '所有状态'
                }, {
                    value: -1,
                    label: '已上传免疫证书且未上传免疫信息'
                }, {
                    value: 1,
                    label: '已上传免疫证书且已上传免疫信息'
                }],
                petImmunityType: -2


            }
        },
        created() {
            this.loadPetListAndGetOptions()
        },
        methods: {
            loadPetListAndGetOptions: function () {
                let that = this
                Promise.all([
                    new Promise((resolve, reject) => {
                        let url = "/api/admin/petManage/returnPetCardImmunityInfoList"
                        adminService({
                            url:url,
                            method:'post',
                            data:{
                                areaFilter:that.areaFilter,
                                currentPage:that.currentPage,
                                pageSize:that.pageSize,
                                petStatus: that.petType,
                                petCardStatus:that.petCardType,
                                petImmunityStatus:that.petImmunityType
                            }
                        }).then(function (res) {
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
            loadPetList: function () {
                this.$Loading.start()
                const that = this
                let url = "/api/admin/petManage/returnPetCardImmunityInfoList"
                adminService({
                    url:url,
                    method:'post',
                    data:{
                        areaFilter:that.areaFilter,
                        currentPage:that.currentPage,
                        pageSize:that.pageSize,
                        petStatus: that.petType,
                        petCardStatus:that.petCardType,
                        petImmunityStatus:that.petImmunityType
                    }
                }).then(function (res) {
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
            handlePetTypeChange: function () {
                switch (this.petType) {
                    case -2:
                        this.petCardOptions = [{
                            value: -2,
                            label: '所有状态'
                        }, {
                            value: -1,
                            label: '待上传'
                        }, {
                            value: 0,
                            label: '待审核'
                        }, {
                            value: 1,
                            label: '已审核'
                        }]
                        this.petImmunityOptions = [{
                            value: -2,
                            label: '所有状态'
                        }, {
                            value: -1,
                            label: '已上传免疫证书且未上传免疫信息'
                        }, {
                            value: 1,
                            label: '已上传免疫证书且已上传免疫信息'
                        }]
                        break
                    case -1:
                    case 0:
                        this.petCardOptions = [{
                            value: -2,
                            label: '所有状态'
                        }]
                        this.petCardType = -2
                        this.petImmunityOptions = [{
                            value: -2,
                            label: '所有状态'
                        }]
                        this.petImmunityType = -2
                        break;
                    case 1:
                        this.petCardOptions = [{
                            value: -2,
                            label: '所有状态'
                        }, {
                            value: -1,
                            label: '待上传'
                        }, {
                            value: 0,
                            label: '待审核'
                        }, {
                            value: 1,
                            label: '已审核'
                        }]
                        this.petImmunityOptions = [{
                            value: -2,
                            label: '所有状态'
                        }, {
                            value: -1,
                            label: '已上传免疫证书且未上传免疫信息'
                        }, {
                            value: 1,
                            label: '已上传免疫证书且已上传免疫信息'
                        }]

                }
                this.currentPage=1
                this.total = 0
                this.loadPetList()
            },
            handlePetCardTypeChange: function () {
                switch (this.petCardType) {
                    case -2:
                        this.petImmunityOptions = [{
                            value: -2,
                            label: '所有状态'
                        }, {
                            value: -1,
                            label: '已上传免疫证书且未上传免疫信息'
                        }, {
                            value: 1,
                            label: '已上传免疫证书且已上传免疫信息'
                        }]
                        break
                    case -1:
                    case 0:
                        this.petImmunityOptions = [{
                            value: -2,
                            label: '所有状态'
                        }]
                        this.petImmunityType = -2
                        break
                    case 1:
                        this.petImmunityOptions = [{
                            value: -2,
                            label: '所有状态'
                        }, {
                            value: -1,
                            label: '已上传免疫证书且未上传免疫信息'
                        }, {
                            value: 1,
                            label: '已上传免疫证书且已上传免疫信息'
                        }]

                }
                this.currentPage=1

                this.total = 0
                this.loadPetList()

            },
            handlePetImmunityTypeChange: function () {
                this.currentPage=1
                this.total = 0
                this.loadPetList()

            },
            changePage: function (currentPage) {
                this.currentPage = currentPage
                this.loadPetList()
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
                                    that.loadPetList(1, that.pageSize, that.areaFilter)
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
                                    that.loadPetList(1, that.pageSize, that.areaFilter)
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
                console.log(row)
                this.petInfoItem = row
                this.isShowDesc = true
            }
        }
    }
</script>

<style scoped>
    #intro {
        margin-top: 30px;
    }

    .filter {
        text-align: center;
        padding-bottom: 20px;
    }
</style>
