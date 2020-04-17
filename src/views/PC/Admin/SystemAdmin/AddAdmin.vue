<template>
    <el-row :gutter="30" style="height: 700px;overflow: scroll;padding-bottom: 20px">
        <el-divider></el-divider>

        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <a-form-model ref="adminInfo"  :model="adminInfo" :rules="rules"    layout="vertical">
                <a-form-model-item has-feedback label="用户名（用于登录系统）" prop="username"   >
                    <a-input v-model="adminInfo.username" autocomplete="off" placeholder="请输入用户名"/>
                </a-form-model-item>
                <a-form-model-item has-feedback label="真实姓名" prop="realName"   >
                    <a-input v-model="adminInfo.realName" autocomplete="off" placeholder="请输入真实姓名"/>
                </a-form-model-item>
                <a-form-model-item has-feedback label="电话号码" prop="phone"  >
                    <a-input v-model="adminInfo.phone" autocomplete="off" placeholder="请输入电话号码"/>
                </a-form-model-item>
                <p>提示：初始密码与用户名相同！</p>

                <a-form-model-item >
                    <a-button type="primary" @click="submitForm('adminInfo')">
                        保存
                    </a-button>
                    <a-button style="margin-left: 10px" @click="resetForm('adminInfo')">
                        重置
                    </a-button>
                </a-form-model-item>
            </a-form-model>
        </el-col>


    </el-row>

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
    import {FormModel,Input as AInput,Button as AButton} from "ant-design-vue"
    import {Tag} from "at-ui"
    import moment from "moment"

    export default {
        name: "PetReview",
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
            AFormModel:FormModel,
            AFormModelItem:FormModel.Item,
            AInput,AButton,
            ElDivider:Divider
        },
        data() {
            let checkPending;
            //校验电话号码
            let checkPhone = (rule, value, callback) => {
                clearTimeout(checkPending);
                if (!/^1[345789]\d{9}$/.test(value)) {
                    return callback(new Error('请输入正确的电话号码！'));
                } else {
                    callback();
                }
            };
            //校验用户名
            let checkUsername = (rule, value, callback) => {
                if (value.length >= 5 && value.length <= 12 ) {
                    new Promise(resolve => {

                        adminService({
                            methods:"get",
                            url:"/api/admin/system/checkUsername?username=" + value
                        }).then(res => {
                            if (res.data.code === 100) {
                                resolve(true)
                            } else {
                                resolve(false)
                            }
                        })
                    }).then(res => {
                        if (res) {
                            callback();
                        } else {
                            return callback(new Error('该用户名已存在！'));
                        }
                    })

                } else {
                    return callback(new Error('请输入用户名，长度在5-12位！'));
                }


                // clearTimeout(checkPending);
                // if (!/^1[345789]\d{9}$/.test(value)) {
                //     return callback(new Error('请输入正确的电话号码！'));
                // } else {
                //     callback();
                // }
            }
            //校验真实姓名
            let checkRealName = (rule, value, callback) => {
                clearTimeout(checkPending);
                if (value.length < 2) {
                    return callback(new Error('请输入正确的真实姓名！'));
                } else {
                    callback();
                }
            };
            return {
                adminInfo: {
                    username: "",
                    realName: "",
                    phone: "",
                    accountType: {
                        type: Number
                    }
                },
                rules: {
                    phone: [{ validator: checkPhone, trigger: 'change' }],
                    username: [{ validator: checkUsername, trigger: 'change' }],
                    realName: [{ validator: checkRealName, trigger: 'change' }],
                },
                layout: {
                    labelCol: { span: 2 },
                    wrapperCol: { span: 14 },
                },
            };
        },
        props: {
            accountType: {
                type: Number
            }
        },
        methods: {
            submitForm(formName) {

                this.$refs[formName].validate(valid => {

                    if (valid) {
                        this.$Message({
                            message: '保存中....',
                            duration:0
                        });
                        this.adminInfo.accountType = this.accountType

                        const that = this
                        adminService({
                            method: "post",
                            url:"/api/admin/system/addAdmin",
                            data:that.adminInfo
                        }).then(res => {
                            that.$Message.closeAll()
                            if (res.data.code === 100) {
                                that.$Message.success("保存成功")
                            } else {
                                that.$Message.error("保存失败，请重试")
                            }

                        })
                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
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
    .image{
        text-align: center;
        padding-top: 10px;;
        margin-bottom: 10px;

    }
    .image >img{
        border-radius: 10px;
    }
</style>
