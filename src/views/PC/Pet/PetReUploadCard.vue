<template>
    <div class="col center-part">
        <header class="bg-light lter wrapper-md">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="#">宠物管理</el-breadcrumb-item>
                <el-breadcrumb-item to="/user/pet/petPrevention">宠物防疫管理</el-breadcrumb-item>
                <el-breadcrumb-item>免疫证书修改</el-breadcrumb-item>
            </el-breadcrumb>
        </header>
        <!--内容页-->
        <div class="wrapper-md" id="post-panel">
            <div class="row_content">
                <el-alert style="margin-top: 20px;margin-bottom: 20px"
                          title="审核未通过"
                          type="error"
                          :closable="false"
                          :description="petInfo.petCard.falseRes"
                          show-icon>
                </el-alert>
            </div>
            <div class="row_content">
                <span class="labelVal">宠物昵称：</span>
                <el-input size="large" v-model="petInfo.petName"
                          class="row_content_input" :disabled="true">

                </el-input>
            </div>
            <div class="row_content">
                <span class="labelVal">免疫证书编号：</span>

                <el-input :class="{'errorType':cardNumberType}" size="large" class="timePick " @change="checkCardNumber"
                          @blur="checkCardNumber"
                          v-model="petInfo.petCard.cardNumber"
                          placeholder="请输入免疫证书编号"
                >
                </el-input>
                <span class="errorNotice">{{cardNumberNotice}}</span>

            </div>
            <div class="row_content">
                <span class="labelVal">疫苗标签：<i>请将免疫证书内页中该支疫苗的标签信息完整拍摄并上传，仅支持JPG、PNG、GIF格式，文件小于2M</i></span>
                <div class="img_container">
                    <div>
                        <img :src="petInfo.petCard.cardImageUrl" alt="">
                    </div>
                    <span class="img_cover" @click="choiceImg">
                        <span class="upload_icon">
                            <svg t="1576639130005" class="icon" viewBox="0 0 1066 1024" version="1.1"
                                 xmlns="http://www.w3.org/2000/svg" p-id="1859" width="40" height="40"><path
                                    d="M806.4 362.666667a38.4 38.4 0 1 1-76.8 0 196.266667 196.266667 0 0 0-392.533333 0 38.4 38.4 0 0 1-76.8 0 273.066667 273.066667 0 1 1 546.133333 0z"
                                    fill="#ffffff" p-id="1860"></path><path
                                    d="M768 882.858667a38.4 38.4 0 0 1 0-76.8 196.266667 196.266667 0 1 0 0-392.533334 38.4 38.4 0 0 1 0-76.8 273.066667 273.066667 0 1 1 0 546.133334zM277.333333 336.725333a38.4 38.4 0 0 1 0 76.8 196.266667 196.266667 0 1 0 0 392.533334 38.4 38.4 0 0 1 0 76.8 273.066667 273.066667 0 1 1 0-546.133334z"
                                    fill="#ffffff" p-id="1861"></path><path
                                    d="M484.266667 664.362667a38.4 38.4 0 0 1 76.8 0V896a38.4 38.4 0 1 1-76.8 0v-231.637333z"
                                    fill="#ffffff" p-id="1862"></path><path
                                    d="M359.509333 691.370667a38.4 38.4 0 0 1-54.613333-53.973334l190.421333-193.024a38.4 38.4 0 0 1 54.698667 0l190.464 193.024a38.4 38.4 0 0 1-54.656 53.973334l-163.157333-165.333334-163.157334 165.333334z"
                                    fill="#ffffff" p-id="1863"></path></svg>

                        </span>
                        <span>上传照片</span>
                    </span>
                    <input :ref="'filElem'" type="file" style="display: none" @change="getImg">
                </div>
                <span class="errorNotice">{{cardImageUrlNotice}}</span>

            </div>
            <div class="row_content">
                <el-button icon="el-icon-circle-check" plain type="primary" size="large" hollow
                           @click="openSureMessage">保存免疫信息
                </el-button>
            </div>

        </div>
    </div>

</template>

<script>
    import {
        Breadcrumb, BreadcrumbItem, Col, Row, Button, Link, Avatar, Divider, Table, TableColumn, Tag, Input,
        Select, Option, DatePicker,ButtonGroup,Alert
    } from "element-ui"
    import moment from "moment"
    import service from "network/axios"

    export default {
        name: "PetReUploadCard",
        components: {
            ElBreadcrumb: Breadcrumb,
            ElBreadcrumbItem: BreadcrumbItem,
            ElRow: Row,
            ElCol: Col,
            ElButton: Button,
            ElButtonGroup:ButtonGroup,
            ElLink: Link,
            ElAvatar: Avatar,
            ElDivider: Divider,
            ElTable: Table,
            ElTableColumn: TableColumn,
            ElTag: Tag,
            ElInput: Input,
            ElSelect: Select,
            ElOption: Option,
            ElDatePicker: DatePicker,
            ElAlert:Alert
        },
        props: {},
        data() {
            return {
                petInfo: [{
                    petId: "",
                    petNo: "",
                    petTypeId: "",
                    hosteId: "",
                    petName: "",
                    petType: "",
                    gmtCreate: "",
                    gmtModified: "",
                    petSex: "",
                    petHeight: "",
                    petBirthday: "",
                    petHairColor: "",
                    petRaiseAddr: "",
                    petWeight: "",
                    petImageUrl: "",
                    petDesc: "",
                    petStatus: "",
                    petCard:{
                        petCardId: "",
                        petId: "",
                        cardNumber: "",
                        cardStatus: "",
                        gmtCreated: "",
                        gmtModified: "",
                        cardImageUrl:""
                    }
                }],
                options: [],
                petVacs: [],
                value: '',
                petCard: {
                    petId: "",
                    cardNumber: "",
                    cardImageUrl: ""
                },
                cardNumberNotice: "",
                cardNumberType: "",
                cardImageUrlNotice: "",
                cardImageUrlType: ""

            }
        },
        created() {
            this.$Loading.start()
            this.petInfo = JSON.parse(sessionStorage.getItem("reUploadCardInfo"))
        },
        mounted() {
            this.$Loading.finish()

        },
        methods: {
            openSureMessage: function () {
                this.checkCardNumber()
                this.cardImageUrl()
                if (this.checkCardNumber() && this.cardImageUrl()) {
                    this.$msgbox.confirm('确定保存修改吗, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.doUpload()
                    })
                }
            },
            doUpload: function () {
                this.$Message.warning("信息上传中！")
                this.petCard.petId = this.petInfo.petId
                let url = "/api/petCard/reUploadPetCard"
                let that = this

                new Promise((resolve, reject) => {
                    service({
                        "method": "post",
                        "url": url,
                        "data": that.petInfo.petCard
                    }).then(res => {
                        resolve(res.data.code === 100)
                    })
                }).then(res=>{
                    if (res){
                        this.$Message.success("免疫证书信息修改成功,请等待管理员审核！")
                        setTimeout(function () {
                            that.$router.push("/user/pet/petPrevention")
                        },1000)
                    }
                })


            },
            checkCardNumber: function () {
                if (this.petInfo.petCard.cardNumber === undefined || this.petInfo.petCard.cardNumber.length === 0) {
                    this.cardNumberType = true
                    this.cardNumberNotice = "请输入免疫证书编号！"
                    return false
                } else {
                    this.cardNumberType = false
                    this.cardNumberNotice = ""
                    return true
                }
            },
            cardImageUrl: function () {
                if (this.petInfo.petCard.cardImageUrl === undefined || this.petInfo.petCard.cardImageUrl.length === 0) {
                    this.cardImageUrlType = true
                    this.cardImageUrlNotice = "请上传疫苗标签图片！"
                    return false
                } else {
                    this.cardImageUrlType = false
                    this.cardImageUrlNotice = ""
                    return true
                }
            },
            getPetInfos: function (id) {
                const that = this
                Promise.all([
                    new Promise((resolve, reject) => {
                        let url = "/api/petinfo/getPetInfoById?petId=" + id
                        service.get(url).then(function (res) {
                            res.data.data.petInfo.petBirthday = moment(parseInt(res.data.data.petInfo.petBirthday)).format('YYYY-MM-DD')
                            that.petInfo = res.data.data.petInfo
                            if (res.data.data.petInfo.petStatus === -1) {
                                that.petCheckfalse = res.data.data.petCheckfalse
                            }
                            resolve(true)
                        })
                    }).then(res => {
                        if (res) {
                            this.$Loading.finish()
                        }
                    })
                ])

            },
            choiceImg: function () {
                // console.log(this.$store.state)
                this.$refs.filElem.dispatchEvent(new MouseEvent('click'))
            },
            getImg: function () {
                const that = this
                const inputFile = this.$refs.filElem.files[0]
                if (inputFile) {
                    if (inputFile.size > 1024 * 1024 * 2 || inputFile.type !== 'image/jpeg' && inputFile.type !== 'image/png' && inputFile.type !== 'image/gif') {
                        this.$Notify({
                            title: '文件类型错误',
                            message: '仅支持JPG、PNG、GIF格式，且小于2M！',
                            type: "error",
                            duration: 2000
                        })
                        return false
                    }
                } else {
                    return false
                }
                let fileReader = new FileReader()
                fileReader.readAsDataURL(inputFile)
                fileReader.onload = function () {
                    that.petInfo.petCard.cardImageUrl = this.result
                }

            },
        }
    }
</script>

<style scoped>
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
        border-radius: 10px;
        width: 400px;
        height: 300px;
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
        margin-top: 100px;
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

</style>
