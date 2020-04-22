<template>
    <div style="margin-bottom: 10px">
        <van-sticky>
            <van-nav-bar title="宠物详细信息" left-text="返回" @click-left="returnBack" left-arrow>

            </van-nav-bar>
        </van-sticky>
        <div style="">
            <div id="post-panel">

                <div v-if="petInfo.petId" style="padding: 10px;padding-bottom: 20px">
                    <div class="image">
                        <img :src="petInfo.petImageUrl">
                    </div>
                    <div class="extra content">
                        <div v-if="petInfo.isCancel != 1">

                            <div v-if="petInfo.petStatus == -1" style="text-align: center">
                                <el-button type="danger" size="small" icon="el-icon-delete" style=""
                                           @click="deletePetInfo">删除宠物信息
                                </el-button>
                                <el-button type="warning" size="small" icon="el-icon-edit" style=""
                                           @click="reUpload">修改宠物信息
                                </el-button>
                            </div>
                            <div v-if="petInfo.petStatus == 1" style="text-align: center;padding-bottom: 20px">
                                <el-button type="danger" size="small" icon="el-icon-delete" style=""
                                           @click="isShowCancelPet = true">注销宠物信息
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
                        <div v-else style="text-align: center;">
                            <el-button type="danger" size="small" icon="el-icon-delete" style=""
                                       @click="deletePetInfo">删除宠物信息
                            </el-button>
                            <el-alert style="margin-top: 20px;margin-bottom: 20px"
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
<!--                宠物注销弹窗-->
                <van-popup v-model="isShowCancelPet" round position="bottom" :style="{ height: '25%' }">
                    <div style="margin-top: 20px">
                        <van-form @failed="onFailed" :colon="true" :validate-first="false" @submit="doCancelUpload">
                            <van-field v-model="cancelData.cancelType" ref="petType" label="注销类型 "
                                       @click="isShowPetCancelType = true" placeholder="请选择注销类型"
                                       :rules="[{ validator: checkCancelType, message: '请选择宠注销型！' }]">
                            </van-field>
                            <van-popup v-model="isShowPetCancelType" position="bottom">
                                <van-picker show-toolbar :columns="cancelTypeoptions"
                                            @cancel="isShowPetCancelType = false" @confirm="selectCancelType"/>
                            </van-popup>

                            <van-field v-model="cancelData.cancelRes" label="描述" placeholder="请输入注销原因"
                                       :rules="[{ validator: checkCancelRes, message: '请输入注销原因，长度2-100！' }]">
                            </van-field>
                            <div style="margin: 16px;">
                                <van-button round block type="info" native-type="submit">
                                    提交
                                </van-button>
                            </div>
                        </van-form>

                    </div>

                </van-popup>
            </div>

        </div>
    </div>
</template>

<script>
    import moment from 'moment'
    import service from "../../../network/axios"
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

    export default {
        name: "MobilePetInfoDetail",
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
                petCheckfalse: [],
                isShowCancelPet: false,
                isShowPetCancelType: false,
                cancelData: {
                    cancelType: "",
                    cancelRes: "",
                    petId: "",
                    petHosteId: ""
                },
                cancelTypeoptions: [{
                    text: '丢失',
                    label: '丢失'
                }, {
                    text: '正常死亡',
                    label: '正常死亡'
                }, {
                    text: '疾病死亡',
                    label: '疾病死亡'
                }],
            }
        },
        mounted() {
            this.getPetInfos(this.$route.query.id)
        },
        filters: {
            formatDate: function (value) {
                return moment(value).format('YYYY-MM-DD')
            }
        },
        methods: {
            //校验宠物注销类型
            checkCancelType: function (val) {
                return (val.length > 0)
            },
            //校验注销原因
            checkCancelRes: function (val) {
                return (val.length >= 2 && val.length <= 100)
            },
            getPetInfos: function (id) {
                let url = "/api/petinfo/getPetInfoById?petId=" + id
                const that = this
                service.get(url).then(function (res) {
                    res.data.data.petInfo.petBirthday = moment(parseInt(res.data.data.petInfo.petBirthday)).format('YYYY-MM-DD')
                    that.petInfo = res.data.data.petInfo
                    if (res.data.data.petInfo.petStatus === -1) {
                        that.petCheckfalse = res.data.data.petCheckfalse
                    }
                })
            },
            cancelPet: function () {
                this.$router.push("/user/pet/cancelPet?id=" + this.petInfo.petId)
            },
            deletePetInfo: function () {
                this.$VanDialog.confirm({
                    message: '确定删除宠物信息吗？是否继续？',
                }).then(() => {
                    this.$Toast.loading({
                        message: '正在执行中...',
                        forbidClick: true,
                    });

                    let url = "/api/petinfo/deletePetInfoById?petId=" + this.petInfo.petId
                    const that = this
                    service.get(url).then(function (res) {
                        that.$Toast.clear()
                        if (res.data.code === 100) {
                            that.$VanNotify({ type: 'success', message: '宠物信息删除成功，页面即将跳转！',duration: 1500});
                            setTimeout(function () {
                                that.$router.push("/mobile/user/pet/petInfo")
                            }, 1500)
                        } else {
                            that.$VanNotify({ type: 'warning', message: '操作失败，请重试！',duration: 1000});
                        }
                    })
                }).catch(() => {
                })
            },
            reUpload: function () {
                this.$router.push("/mobile/user/pet/reUpload?reUploadPetId=" + this.petInfo.petId)
            },
            //上传注销信息
            doCancelUpload: function () {
                this.$VanDialog.confirm({
                    message: '确认注销该宠物吗？',
                }).then(() => {
                    this.$Toast.loading({
                        message: '正在执行中...',
                        forbidClick: true,
                    });
                    this.cancelData.petId = this.petInfo.petId
                    this.cancelData.petHosteId = this.petInfo.hosteId
                    const that = this
                    let url = "/api/petCancel/doCancel"
                    service({
                        "method": "post",
                        "url": url,
                        "data": that.cancelData
                    }).then(function (res) {
                        that.$Message.closeAll()
                        if (res.data.code === 100){
                            that.$Toast.clear()
                            that.isShowCancelPet = false
                            that.$VanNotify({ type: 'success', message: '注销成功，页面即将跳转！',duration: 1000});
                            setTimeout(function () {
                                that.$router.push("/mobile/user/pet/petInfo")
                            },1000)
                        }else{
                            that.$VanNotify({ type: 'warning', message: '操作失败，请重试！',duration: 1000});
                        }
                    })
                })


            },
            //返回上一步
            returnBack() {
                this.$router.back()
            },
            //表单校验失败
            onFailed(errorInfo) {
                this.$Toast.fail("请正确填写所有信息！")
            },
            selectCancelType(value) {
                this.cancelData.cancelType = value.text
                this.isShowPetCancelType = false
            },
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

    .image {
        text-align: center;
        padding-top: 10px;;
        margin-bottom: 10px;

    }

    .image > img {
        height: 300px;
        border-radius: 10px;
    }
</style>
