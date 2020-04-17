<template>
    <div class="col center-part">
        <header class="bg-light lter wrapper-md">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="'#'">宠物管理</el-breadcrumb-item>
                <el-breadcrumb-item :to="'/user/pet/petinfo'">宠物信息管理</el-breadcrumb-item>
                <el-breadcrumb-item>宠物详细信息</el-breadcrumb-item>
            </el-breadcrumb>
        </header>
        <!--内容页-->
        <div class="wrapper-md" id="post-panel">
            <el-row :gutter="30">
                <el-col v-if="petInfo.petId" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <div class="grid-content">
                        <div class="image">
                            <img :src="petInfo.petImageUrl">
                        </div>
                        <div class="extra content">
                            <!--                                <at-tag  v-if="petInfo.petStatus == 0" class="right"   color="primary">审核中</at-tag>-->
                            <!--                                <at-tag  v-else-if="petInfo.petStatus == 1" class="right"   color="success">审核通过</at-tag>-->
                            <!--                                <at-tag  v-else-if="petInfo.petStatus == -1" class="right"   color="warning">审核失败</at-tag>-->
                            <div v-if="petInfo.isCancel != 1">

                                <div v-if="petInfo.petStatus == -1" style="text-align: center">
                                    <el-button type="danger" size="small" icon="el-icon-delete" style=""
                                               @click="deletePetInfo">删除宠物信息
                                    </el-button>
                                    <el-button type="warning" size="small" icon="el-icon-edit" style=""
                                               @click="reUpload">修改宠物信息
                                    </el-button>
                                </div>
                                <div v-if="petInfo.petStatus == 1" style="text-align: center">
                                    <el-button type="danger" size="small" icon="el-icon-delete" style=""
                                               @click="cancelPet">注销宠物信息
                                    </el-button>
                                    <el-button type="warning" size="small" icon="el-icon-edit" style=""
                                               @click="reUpload">修改宠物信息
                                    </el-button>

                                </div>
                                <el-alert v-if="petInfo.petStatus==-1" style="margin-top: 20px;margin-bottom: 20px"
                                          title="审核未通过"
                                          type="error"
                                          :closable="false"
                                          :description="petCheckfalse.falseRes"
                                          show-icon>
                                </el-alert>
                            </div>
                            <div v-else style="text-align: center">
                                <el-button type="danger" size="small" icon="el-icon-delete" style=""
                                           @click="deletePetInfo">删除宠物信息
                                </el-button>
                                <el-alert  style="margin-top: 20px;margin-bottom: 20px"
                                          title="宠物已注销！"
                                          type="error"
                                          :closable="false"
                                          :description="petCheckfalse.falseRes"
                                          show-icon>
                                </el-alert>
                            </div>



                            <span>
                                    上传日期：{{petInfo.gmtCreate | formatDate}}
                                </span>


                        </div>
                        <div class="content">
                            <div class="row_content">
                                <span class="labelVal">宠物名：</span>
                                <div class="row_content_input">
                                    <at-input size="large" v-model="petInfo.petName"
                                    >

                                    </at-input>
                                </div>
                            </div>
                            <div class="row_content">
                                <span class="labelVal">宠物编号：</span>
                                <div class="row_content_input">
                                    <at-input size="large" v-model="petInfo.petNo"
                                    >

                                    </at-input>
                                </div>
                            </div>

                            <div class="row_content">
                                <span class="labelVal">宠物类型：</span>
                                <div class="row_content_input">
                                    <at-input size="large" v-model="petInfo.petType"
                                    >

                                    </at-input>
                                </div>
                            </div>
                            <div class="row_content">
                                <span class="labelVal">出生日期：</span>
                                <div class="row_content_input">
                                    <at-input size="large" v-model="petInfo.petBirthday"
                                    >

                                    </at-input>
                                </div>
                            </div>
                            <div class="row_content">
                                <span class="labelVal">宠物毛色：</span>
                                <div class="row_content_input">
                                    <at-input size="large" v-model="petInfo.petHairColor"
                                    >

                                    </at-input>
                                </div>
                            </div>
                            <div class="row_content">
                                <span class="labelVal">宠物体重（Kg）：</span>
                                <div class="row_content_input">
                                    <at-input size="large" v-model="petInfo.petWeight"
                                    >

                                    </at-input>
                                </div>
                            </div>
                            <div class="row_content">
                                <span class="labelVal">宠物身高（Cm）：</span>
                                <div class="row_content_input">
                                    <at-input size="large" v-model="petInfo.petWeight"
                                    >

                                    </at-input>
                                </div>
                            </div>
                            <div class="row_content">
                                <span class="labelVal">宠物性别：</span>
                                <div class="row_content_input">
                                    <at-radio v-model="petInfo.petSex" label="1">雄性(公)</at-radio>
                                    <at-radio v-model="petInfo.petSex" label="0">雌性(母)）</at-radio>
                                </div>
                            </div>
                            <div class="row_content">
                                <span class="labelVal">宠物饲养地址：</span>
                                <div class="row_content_input">
                                    <at-input size="large" v-model="petInfo.petRaiseAddr"
                                    >

                                    </at-input>
                                </div>
                            </div>
                            <div class="row_content">
                                <span class="labelVal">宠物描述：</span>
                                <div class="row_content_input">
                                    <at-input size="large" v-model="petInfo.petDesc"
                                    >

                                    </at-input>
                                </div>
                            </div>
                        </div>

                    </div>
                </el-col>


            </el-row>

        </div>

    </div>

</template>

<script>

    import {
        Breadcrumb,
        Radio,
        BreadcrumbItem,
        Button,
        Cascader,
        DatePicker,
        InputNumber,
        Input,
        Autocomplete,
        Table, TableColumn, Row, Col,
        Alert

    } from "element-ui"
    import {Tag} from "at-ui"
    import service from "network/axios"
    import moment from 'moment'

    export default {
        name: "UploadInfo",
        components: {
            ElBreadcrumb: Breadcrumb,
            ElBreadcrumbItem: BreadcrumbItem,
            AtInput: Input,
            ElInputNumber: InputNumber,
            ElDatePicker: DatePicker,
            ElCascader: Cascader,
            ElButton: Button,
            AtRadio: Radio,
            ElAutocomplete: Autocomplete,
            ElTable: Table,
            ElTableColumn: TableColumn,
            ElRow: Row,
            ElCol: Col,
            AtTag: Tag,
            ElAlert: Alert
        },
        data() {
            return {
                petInfo: [],
                petCheckfalse: []
            }
        },
        created() {
            this.$Loading.start()
        },
        mounted() {
            this.getPetInfos(this.$route.query.id)

        },
        watch: {},
        methods: {
            getPetInfos: function (id) {
                let url = "/api/petinfo/getPetInfoById?petId=" + id
                const that = this
                service.get(url).then(function (res) {
                    res.data.data.petInfo.petBirthday = moment(parseInt(res.data.data.petInfo.petBirthday)).format('YYYY-MM-DD')
                    that.petInfo = res.data.data.petInfo
                    if (res.data.data.petInfo.petStatus === -1) {
                        that.petCheckfalse = res.data.data.petCheckfalse
                    }
                    that.$Loading.finish()
                })
            },
            cancelPet: function () {
                this.$router.push("/user/pet/cancelPet?id=" + this.petInfo.petId)
            },
            deletePetInfo: function () {
                this.$msgbox.confirm('确定删除宠物信息吗, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let url = "/api/petinfo/deletePetInfoById?petId=" + this.petInfo.petId
                    const that = this
                    service.get(url).then(function (res) {
                        if (res.data.code === 100) {
                            that.$Message.success("宠物信息删除成功！")
                            setTimeout(function () {
                                that.$router.push("/user/pet/petinfo")
                            }, 1000)

                        }
                        res.data.data.petInfo.petBirthday = moment(parseInt(res.data.data.petInfo.petBirthday)).format('YYYY-MM-DD')
                        that.petInfo = res.data.data.petInfo
                        if (res.data.data.petInfo.petStatus === -1) {
                            that.petCheckfalse = res.data.data.petCheckfalse
                        }
                        that.$Loading.finish()
                    })
                })
            },
            reUpload: function () {
                sessionStorage.setItem("reUploadPetId", this.petInfo.petId)
                this.$router.push({
                    name: "reUploadPetInfo"
                })
            }
        },
        filters: {
            formatDate: function (value) {
                return moment(value).format('YYYY-MM-DD')
            }
        }

    }
</script>
<style>
    .errorType input {
        border: red 1px solid;
    }

    .errorType > textarea {
        border: red 1px solid;
    }
</style>
<style scoped>

    .page-navigator > li > a, .page-navigator > li > span {
        line-height: 1.42857143;
        padding: 6px 12px;
    }

    .row_content {
        margin-top: 30px;
    }

    .row_content > .labelVal {
        font-size: 13px;
        line-height: 1;
        color: gray;
    }

    .row_content > span > i {
        font-size: 10px;
    }

    .img_container {
        margin-top: 10px;
        border-radius: 50%;
        width: 140px;
        height: 140px;
        background: #0a0f30;
        overflow: hidden;
        position: relative;
        cursor: pointer;
    }

    .img_container:hover .img_cover {
        display: block;
    }

    .img_cover {
        display: none;
        height: 100%;
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background: rgba(0, 0, 0, .7);
        text-align: center;
        color: #fff;
        font-size: 14px;
        cursor: pointer;
    }

    .img_cover > .upload_icon {
        display: block;
        text-align: center;
        margin-top: 38px;
    }

    .hide {
        display: block;
    }

    .row_content_input {
        padding-top: 8px;
        width: 100%;
    }

    .errorNotice {
        color: #FF4949;
        font-size: 12px;
        line-height: 1;
    }

    .timePick {
        width: 100%;
        margin-top: 10px;
    }


    .el-input__inner {
        color: red;
    }

    .image {
        text-align: center;
        padding-top: 10px;;
        margin-bottom: 10px;

    }

    .image > img {
        height: 400px;
        border-radius: 10px;
    }

</style>
