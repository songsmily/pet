<template>
    <div style="height: 100vh">

        <div class="sc-1duRon-3 cPHJDB">
            <div class="sc-1duRon-4 doAKkT">
                <div class="sc-3JRwrF irtYus">
                    <div class="main" style="width: 50%">
                        <el-row :gutter="30" style="overflow: scroll;padding-bottom: 20px">
                            <h1>请完善个人信息</h1>
                            <el-divider></el-divider>

                            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                <a-form-model ref="userInfo" :model="userInfo" :rules="rules" layout="vertical">
                                    <a-form-model-item has-feedback label="真实姓名" prop="realName">
                                        <a-input v-model="userInfo.realName" autocomplete="off" placeholder="请输入真实姓名"/>
                                    </a-form-model-item>
                                    <a-form-model-item has-feedback label="电子邮箱" prop="email">
                                        <a-input v-model="userInfo.email" autocomplete="off" placeholder="请输入邮箱地址"/>
                                    </a-form-model-item>
                                    <a-form-model-item has-feedback label="地区" prop="location">
                                        <a-cascader ref="location" :options="options" @change="handleAreaChange"
                                                    placeholder="请选择地区"/>
                                    </a-form-model-item>
                                    <a-form-model-item has-feedback label="详细住址" prop="addr">
                                        <a-input v-model="userInfo.addr" autocomplete="off" placeholder="请输入详细地址"/>
                                    </a-form-model-item>


                                    <a-form-model-item>
                                        <a-button type="primary" @click="submitForm('userInfo')">
                                            保存
                                        </a-button>
                                        <a-button style="margin-left: 10px" @click="resetForm('userInfo')">
                                            重置
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
    import service from "../../../network/axios"
    import axios from "axios"
    export default {
        name: "CompleteInfo",
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
            ACascader
        },
        data() {
            let checkPending
            //校验地址
            let checkAddr = (rule, value, callback) => {
                clearTimeout(checkPending)
                if (value.length < 5 || value.length > 200) {
                    return callback(new Error('请输入正确的详细地址！'))
                } else {
                    callback()
                }
            }
            //校验电子邮件地址
            let checkEmail = (rule, value, callback) => {
                clearTimeout(checkPending)
                if (!/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value)) {
                    return callback(new Error('请输入正确的电子邮箱！'))
                } else {
                    callback()
                }
            }
            //检验地区
            let checkLocation = (rule, value, callback) => {
                if (value.length < 1) {
                    return callback(new Error('请选择地区！'))
                }
                callback()
            }
            //校验真实姓名
            let checkRealName = (rule, value, callback) => {
                clearTimeout(checkPending)
                if (value.length < 2) {
                    return callback(new Error('请输入正确的真实姓名！'))
                } else {
                    callback()
                }
            }
            return {
                userInfo: {
                    realName: "",
                    location: "",
                    email: "",
                    addr: "",
                },
                rules: {
                    addr: [{validator: checkAddr, trigger: 'change'}],
                    email: [{validator: checkEmail, trigger: 'change'}],
                    location: [{validator: checkLocation, trigger: 'change'}],
                    realName: [{validator: checkRealName, trigger: 'change'}],
                },
                layout: {
                    labelCol: {span: 2},
                    wrapperCol: {span: 14},
                },
                options: []
            }
        },
        props: {
            accountType: {
                type: Number
            }
        },
        created(){
            this.$Loading.start()
            this.getOptions()
        },
        methods: {
            submitForm(formName) {

                this.$refs[formName].validate(valid => {

                    if (valid) {
                        this.$Message({
                            message: '保存中....',
                            duration: 0
                        })
                        this.userInfo.accountType = this.accountType

                        const that = this
                        service({
                            method: "post",
                            url: "/api/user/completeUserInfo",
                            data: that.userInfo
                        }).then(res => {
                            that.$Message.closeAll()
                            if (res.data.code === 100) {
                                that.$Message.success("保存成功")
                                axios.get("/api/user/returnUserInfo").then(function (res) {
                                    if (res.data.data) {
                                        sessionStorage.setItem('userInfo', JSON.stringify(res.data.data))
                                        that.$store.commit("changeUserInfo", that.$util.returnUserInfo())
                                        that.$store.commit("changeLoginType", true)
                                        that.$router.push("/user/home")
                                    }
                                })
                            } else {
                                that.$Message.error("保存失败，请重试")
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
            handleAreaChange(value) {
                let data = this.options[value[0] - 1].children
                for (let i = 0; i < data.length; i++) {
                    if (data[i].value === value[1]) {
                        this.userInfo.location = data[i].label
                        break
                    }
                }
            },
            getOptions:function () {
                let url = "/api/plot/getPlotAndBuild"
                const that = this
                service.get(url).then(function (res) {
                    that.options = res.data.data
                    that.$Loading.finish()
                })
            }
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
