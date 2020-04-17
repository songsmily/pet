<template>
    <!--    <div class="col center-part">-->
    <!--        <header class="bg-light lter wrapper-md">-->
    <!--            <el-breadcrumb separator-class="el-icon-arrow-right">-->
    <!--                <el-breadcrumb-item to="#">宠物管理</el-breadcrumb-item>-->
    <!--                <el-breadcrumb-item>宠物审核</el-breadcrumb-item>-->
    <!--            </el-breadcrumb>-->
    <!--        </header>-->
    <!--        <div class="wrapper-md" id="outer-box">-->
    <!--            <div id="panel">-->
    <!--                <div id="intro">-->
    <el-row :gutter="30" style="height: 700px;overflow: scroll;padding-bottom: 20px">

        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <div class="grid-content">
                <div class="image">
                    <!--                                    <el-image-->
                    <!--                                            style="width: 100px; height: 100px"-->
                    <!--                                            :src="petInfo.petImageUrl"-->
                    <!--                                            :preview-src-list="picList">-->
                    <!--                                    </el-image>-->
                    <img :src="petInfoItem.immunityImageUrl" style="height:400px;">
                </div>
                <div class="extra content">
                    <!--                    <at-tag v-if="petInfoItem.petStatus == 0" class="right" color="warning">审核中</at-tag>-->
                    <!--                    <at-tag v-else class="right" color="success">审核通过</at-tag>-->
                    <span>
                                    上传日期：{{petInfoItem.gmtCreate | formatDate}}
                                </span>
                </div>
                <div class="content">
                    <div class="row_content">
                        <span class="labelVal">免疫证书编号：</span>
                        <div class="row_content_input">
                            <at-input size="large" v-model="petInfoItem.cardNumber"
                            >

                            </at-input>
                        </div>
                    </div>
                    <div class="row_content">
                        <span class="labelVal">疫苗类型：</span>
                        <div class="row_content_input">
                            <at-input size="large" v-model="petInfoItem.immunityType"
                            >

                            </at-input>
                        </div>
                    </div>
                    <div class="row_content">
                        <span class="labelVal">疫苗注射日期：</span>
                        <div class="row_content_input">
                            <at-input size="large" v-model="petInfoItem.immunityTime"
                            >

                            </at-input>
                        </div>
                    </div>
                    <div class="row_content">
                        <span class="labelVal">宠物名：</span>
                        <div class="row_content_input">
                            <at-input size="large" v-model="petInfoItem.petName"
                            >
                            </at-input>
                        </div>
                    </div>
                    <div class="row_content">
                        <span class="labelVal">宠物类型：</span>
                        <div class="row_content_input">
                            <at-input size="large" v-model="petInfoItem.petType"
                            >

                            </at-input>
                        </div>
                    </div>

                </div>

            </div>
        </el-col>


    </el-row>
    <!--                </div>-->
    <!--            </div>-->
    <!--        </div>-->
    <!--    </div>-->
</template>

<script>
    import adminService from "network/adminAxios"
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
        Image,


    } from "element-ui"
    import {Tag} from "at-ui"
    import moment from "moment"

    export default {
        name: "PetImmunityReview",
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
            ElImage: Image
            // PicZoom
        },
        data() {
            return {

            }
        },
        props: {
            petInfoItem: {}
        },
        created() {
            this.petInfoItem.immunityTime = this.reverseTime(this.petInfoItem.immunityTime )
            // this.$Loading.start()
        },
        mounted() {
            // this.getPetInfos(this.$route.query.petId)
            // this.getPetInfos(this.petId)

        },
        watch: {},
        computed:{
            reverseTime(){
                return function (time) {
                    return moment(time).format('YYYY-MM-DD')
                }
            }
        },
        methods: {
            getPetInfos: function (id) {
                let url = "/api/admin/petCheck/getPetAndHostInfoById?petId=" + id
                const that = this
                adminService.get(url).then(function (res) {
                    console.log(res)
                    res.data.data.petInfo.petBirthday = moment(parseInt(res.data.data.petInfo.petBirthday)).format('YYYY-MM-DD')
                    that.petInfo = res.data.data.petInfo
                    let picList = []
                    picList.push(res.data.data.petInfo.petImageUrl)
                    that.picList = picList
                    // console.log(res.data.data.petBirthday)
                    // res.data.data.petBirthday = moment(parseInt(res.data.data.petBirthday)).format('YYYY-MM-DD')
                    // console.log(res.data.data.petBirthday)
                    //
                    // that.petInfo = res.data.data
                    // that.$Loading.finish()
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
    .image{
        text-align: center;
        padding-top: 10px;;
        margin-bottom: 10px;

    }
    .image >img{
        border-radius: 10px;
    }
</style>
