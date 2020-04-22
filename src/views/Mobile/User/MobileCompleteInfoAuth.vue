<template>
    <div style="height: 100vh">

        <div class="sc-1duRon-3 cPHJDB">
            <div class="sc-1duRon-4 doAKkT">
                <div class="sc-3JRwrF irtYus">
                    <div class="main" style="width: 80%">
                        <h1>请完善个人信息</h1>
                        <el-divider></el-divider>
                        <div>
                            <a-steps :current="current">
                                <a-step v-for="item in steps" :key="item.title" :title="item.title" />
                            </a-steps>
                            <div class="steps-content" v-if="current === 0">
                                <el-row :gutter="30" style="overflow: scroll;padding-bottom: 20px;margin-top: 30px;">
                                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                        <a-form-model ref="userInfo" :model="userInfo" :rules="rules" layout="vertical">
                                            <a-form-model-item has-feedback label="用户名(昵称)" prop="username">
                                                <a-input v-model="userInfo.username" autocomplete="off" placeholder="请输入用户名"/>
                                            </a-form-model-item>

                                            <a-form-model-item has-feedback label="真实姓名" prop="realName">
                                                <a-input v-model="userInfo.realName" autocomplete="off" placeholder="请输入真实姓名"/>
                                            </a-form-model-item>
<!--                                            <a-form-model-item has-feedback label="电话号码" prop="phone">-->
<!--                                                <a-input v-model="userInfo.phone" autocomplete="off" placeholder="请输入电话号码"/>-->
<!--                                            </a-form-model-item>-->
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


<!--                                            <a-form-model-item>-->
<!--                                                <a-button type="primary" @click="submitForm('userInfo')">-->
<!--                                                    保存-->
<!--                                                </a-button>-->
<!--                                                <a-button style="margin-left: 10px" @click="resetForm('userInfo')">-->
<!--                                                    重置-->
<!--                                                </a-button>-->
<!--                                            </a-form-model-item>-->
                                        </a-form-model>
                                    </el-col>


                                </el-row>
                            </div>
                            <div class="steps-content" v-if="current === 1">
                                <el-row :gutter="30" style="overflow: scroll;padding-bottom: 20px;margin-top: 30px;">
                                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                        <a-form-model ref="phone" :model="userInfo" :rules="rulesPhone" layout="vertical">

                                            <a-form-model-item has-feedback label="电话号码" prop="phone">
                                                <a-input v-model="userInfo.phone" autocomplete="off" placeholder="请输入电话号码"/>
                                            </a-form-model-item>

                                            <a-form-model-item label="短信验证码">
<!--                                                <a-input-search placeholder="" @search="getMessageCode">-->
<!--                                                    <a-button  slot="enterButton" @click="getMessageCode">{{reSendMessageText}}</a-button>-->
<!--                                                </a-input-search>-->
                                                <a-input placeholder="" v-model="userInfo.messageCode" >
                                                    <a-button  slot="suffix" style="position: relative;left: 12px"    @click="getMessageCode">{{reSendMessageText}}</a-button>
                                                </a-input>
                                            </a-form-model-item>
<!--                                            <a-form-model-item has-feedback label="电子邮箱" prop="email">-->
<!--                                                <a-input v-model="userInfo.email" autocomplete="off" placeholder="请输入邮箱地址"/>-->
<!--                                            </a-form-model-item>-->

<!--                                            <a-form-model-item>-->
<!--                                                <a-button type="primary" @click="submitForm('userInfo')">-->
<!--                                                    保存-->
<!--                                                </a-button>-->
<!--                                                <a-button style="margin-left: 10px" @click="resetForm('userInfo')">-->
<!--                                                    重置-->
<!--                                                </a-button>-->
<!--                                            </a-form-model-item>-->
                                        </a-form-model>
                                    </el-col>


                                </el-row>
                            </div>
                            <div class="steps-action">
                                <a-button v-if="current < steps.length - 1" type="primary" @click="next">
                                    下一步
                                </a-button>
                                <a-button
                                        v-if="current == steps.length - 1"
                                        type="primary"
                                        @click="submitForm('phone')"
                                >
                                    提交
                                </a-button>
                            </div>
                        </div>
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
    import {FormModel, Input as AInput, Button as AButton, Cascader as ACascader,Steps} from "ant-design-vue"
    import {Tag} from "at-ui"
    import moment from "moment"
    import service from "../../../network/axios"
    import axios from "axios"
    export default {
        name: "MobileCompleteInfoAuth",
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
            AInputSearch:AInput.Search,
            ElDivider: Divider,
            ACascader,
            ASteps:Steps,
            AStep:Steps.Step
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
            //校验电话号码
            let checkPhone = (rule, value, callback) => {
                clearTimeout(checkPending)
                if (!/^1[345789]\d{9}$/.test(value)) {
                    return callback(new Error('请输入正确的电话号码！'))
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
            //检验用户名
            let checkUsername = (rule, value, callback) => {
                if (value.length < 1 || value.length > 12) {
                    return callback(new Error('请输入正确的用户名，长度1-12位！'))
                } else{
                    let url = "/api/regist/checkNickname?nickname=" + value
                    axios.get(url).then(function (res) {
                        if (res.data.code === 100) {
                            callback()
                        } else {
                            return callback(new Error('用户名已存在！'))
                        }
                    })
                }
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
                    username:"",
                    phone:"",
                    messageCode:""
                },
                reSendMessageText:"获取短信验证码",
                messageCodeIsSend:false,
                rules: {
                    addr: [{validator: checkAddr, trigger: 'change'}],
                    email: [{validator: checkEmail, trigger: 'change'}],
                    location: [{validator: checkLocation, trigger: 'change'}],
                    realName: [{validator: checkRealName, trigger: 'change'}],
                    username: [{validator: checkUsername, trigger: 'change'}],
                },
                rulesPhone: {
                    phone: [{validator: checkPhone, trigger: 'change'}],
                },
                layout: {
                    labelCol: {span: 2},
                    wrapperCol: {span: 14},
                },
                options: [],
                current: 0,
                steps: [
                    {
                        title: '基本信息',
                        content: 'First-content',
                    },
                    {
                        title: '电话号码',
                        content: 'Second-content',
                    }
                ],
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
            next() {
                this.$refs["userInfo"].validate(valid => {

                    if (valid) {
                        this.$msgbox.confirm('请确定信息填写无误？！', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'success',
                        }).then(res => {
                            this.current++;
                        }).catch(res => {

                        })
                    }
                })
            },
            getMessageCode:function(value){

                this.$refs["phone"].validate(valid => {
                    if (valid) {
                        if (!this.messageCodeIsSend) {
                            let url = "/api/regist/sendCode?memPhone=" + this.userInfo.phone
                            const that = this
                            axios.get(url).then(function (res) {
                                if (res.data.code === 100) {
                                    that.messageCodeIsSend = true
                                    let time = 60
                                    let timer = setInterval(function () {
                                        time -= 1
                                        that.reSendMessageText = time + "秒后重新发送"
                                        if (time === 0) {
                                            clearInterval(timer)
                                            that.reSendMessageText = "获取短信验证码"
                                            that.messageCodeIsSend = false
                                        }
                                    }, 1000)
                                } else {
                                    that.$Message.error("验证码发送失败，请重新点击发送！")
                                }
                            })
                        }

                    }
                })
            },
            submitForm(formName) {
                this.$refs["phone"].validate(valid => {
                    if (valid) {
                        let url = "/api/regist/checkMessageCode?messageCode=" + this.userInfo.messageCode
                        const that = this
                        if (that.userInfo.messageCode.length >= 6) {
                            axios.get(url).then(function (res) {
                                if (res.data.code === 100) {
                                    let userInfo ={
                                        realName: that.userInfo.realName,
                                        location: that.userInfo.location,
                                        email: that.userInfo.email,
                                        addr: that.userInfo.addr,
                                        name: that.userInfo.username,
                                        phone: that.userInfo.phone,
                                    }
                                    service({
                                        method: "post",
                                        url: "/api/user/completeUserInfo",
                                        data: userInfo
                                    }).then(res => {
                                        that.$Message.closeAll()
                                        if (res.data.code === 100) {
                                            that.$Message.success("保存成功")
                                            axios.get("/api/user/returnUserInfo").then(function (res) {
                                                if (res.data.data) {
                                                    sessionStorage.setItem('userInfo', JSON.stringify(res.data.data))
                                                    that.$store.commit("changeUserInfo", that.$util.returnUserInfo())
                                                    that.$store.commit("changeLoginType", true)
                                                    that.$router.push("/mobile/user/home")
                                                }
                                            })
                                        } else {
                                            that.$Message.error("保存失败，请重试")
                                        }

                                    })
                                } else if (res.data.code === 60000){
                                    that.$Message.warning("验证码已过期，请重新发送！")
                                }else {
                                    that.$Message.warning("验证码匹配失败！")
                                }
                            })
                        }else{
                            that.$Message.warning("请输入验证码，长度为6位！")
                        }
                    }
                })
                // this.$refs[formName].validate(valid => {
                //
                //     if (valid) {
                //         this.$Message({
                //             message: '保存中....',
                //             duration: 0
                //         })
                //         this.userInfo.accountType = this.accountType
                //
                //         const that = this
                //         service({
                //             method: "post",
                //             url: "/api/user/completeUserInfo",
                //             data: that.userInfo
                //         }).then(res => {
                //             that.$Message.closeAll()
                //             if (res.data.code === 100) {
                //                 that.$Message.success("保存成功")
                //                 axios.get("/api/user/returnUserInfo").then(function (res) {
                //                     if (res.data.data) {
                //                         sessionStorage.setItem('userInfo', JSON.stringify(res.data.data))
                //                         that.$store.commit("changeUserInfo", that.$util.returnUserInfo())
                //                         that.$store.commit("changeLoginType", true)
                //                         that.$router.push("/user/home")
                //                     }
                //                 })
                //             } else {
                //                 that.$Message.error("保存失败，请重试")
                //             }
                //
                //         })
                //     } else {
                //         return false
                //     }
                // })
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
    .ant-input-affix-wrapper .ant-input-suffix{
        right: 0;
    }
</style>
