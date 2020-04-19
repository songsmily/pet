<template>
    <div>

        <div class="sc-1duRon-3 cPHJDB">
            <div class="sc-1duRon-4 doAKkT">
                <div class="sc-3JRwrF irtYus">
                    <div class="main" style="width: 100%">
                        <el-row :gutter="30" style="overflow: scroll;padding-bottom: 20px">


                            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                <a-form-model ref="messageInfo" :model="messageInfo" :rules="rules" layout="vertical">
                                    <a-form-model-item has-feedback label="电话号码" prop="phone">
                                        <a-input v-model="messageInfo.phone" autocomplete="off"  :disabled="true"/>
                                    </a-form-model-item>
                                    <a-form-model-item has-feedback label="短信内容：请酌情给出疫苗注射建议！" prop="message">
                                        <a-text-area v-model="messageInfo.message" autocomplete="off" placeholder="请输入短信内容"/>
                                    </a-form-model-item>


                                    <a-form-model-item>
                                        <a-button type="primary" @click="submitForm('messageInfo')">
                                            发送
                                        </a-button>

                                    </a-form-model-item>
                                </a-form-model>
                            </el-col>


                        </el-row>
                    </div>
                </div>
            </div>
        </div>
    </div>


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
        Divider


    } from "element-ui"
    import {FormModel, Input as AInput, Button as AButton, Cascader as ACascader} from "ant-design-vue"
    import {Tag} from "at-ui"
    import moment from "moment"
    import service from "network/axios"
    import axios from "axios"
    export default {
        name: "SendImmunityMessage",
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
            ElImage: Image,
            AFormModel: FormModel,
            AFormModelItem: FormModel.Item,
            AInput, AButton,
            ElDivider: Divider,
            ACascader,
            ATextArea: AInput.TextArea
        },
        props: {
            petInfo: {},
        },
        data() {
            let checkPending
            //校验地址
            let checkMessage = (rule, value, callback) => {
                clearTimeout(checkPending)
                if (value.length < 1 || value.length > 200) {
                    return callback(new Error('请输入信息内容！'))
                } else {
                    callback()
                }
            }
            return {

                rules: {
                    message:[{validator: checkMessage, trigger: 'change'}],
                },
                layout: {
                    labelCol: {span: 2},
                    wrapperCol: {span: 14},
                },
                messageInfo:{
                    phone:this.petInfo.userInfo.phone,
                    message:"",
                    petName:this.petInfo.petInfo.petName
                }
            }
        },
        created(){
            // this.$Loading.start()
            // this.getOptions()
        },
        methods: {
            submitForm(formName) {

                this.$refs["messageInfo"].validate(valid => {

                    if (valid) {
                        this.$Message({
                            message: '发送中....',
                            duration: 0
                        })

                        const that = this
                        service({
                            method: "post",
                            url: "/api/admin/petManage/sendImmunityMessage",
                            data: that.messageInfo
                        }).then(res => {
                            that.$Message.closeAll()
                            if (res.data.code === 100) {
                                that.$Message.success("信息发送成功")
                            } else {
                                that.$Message.error("信息发送失败，请重试")
                            }

                        })
                    } else {
                        return false
                    }
                })
            },
            resetForm(formName) {
                this.$refs[formName].resetFields()
            },
        },
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
        border-radius: 10px;
    }
</style>
