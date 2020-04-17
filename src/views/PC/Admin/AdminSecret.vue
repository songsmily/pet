<template>
    <el-form :model="ruleForm" :label-position="'left'" status-icon :rules="rules" ref="ruleForm" label-width="82px" class="demo-ruleForm">
        <el-form-item class="s-form-item" label="密码：" prop="pass">
            <el-input size="small" type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item class="s-form-item" label="确认密码：" prop="checkPass">
            <el-input size="small" type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item class="s-form-item">
            <el-button icon="el-icon-circle-check" plain hollow  type="primary" @click="submitForm('ruleForm')">保存</el-button>
            <el-button  icon="el-icon-circle-close" plain hollow @click="resetForm('ruleForm')">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import {Breadcrumb, BreadcrumbItem, Form, FormItem,Input,Button} from "element-ui"
    import axios from "axios"
    export default {
        name: "AdminSecret",
        components:{
            ElBreadcrumb:Breadcrumb,
            ElBreadcrumbItem:BreadcrumbItem,
            ElForm:Form,
            ElFormItem:FormItem,
            ElInput:Input,
            ElButton:Button
        },
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '' || value.length < 6) {
                    callback(new Error('请输入密码，且长度在6 - 12位之间'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm: {
                    pass: '',
                    checkPass: '',
                },
                rules: {
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let url = "/api/admin/adminUser/resetPassword?password=" + this.ruleForm.pass;
                        const that = this
                        axios.get(url).then(function (res) {
                            if (res.data.code === 100){
                                that.$Message({
                                    type:"success",
                                    message:"密码修改成功，请重新登录！"
                                })
                                that.$refs[formName].resetFields();
                                that.$store.state.isShowAdminSecret = false
                                setTimeout(function () {
                                    that.$router.push("/login")
                                },500)
                            }else{
                                that.$Message({
                                    type:"error",
                                    message:"密码修改失败！"
                                })
                            }
                        })

                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {
               this.$store.state.isShowAdminSecret = false
            }
        }
    }
</script>

<style scoped>
    .s-form-item{
        margin-top: 10px;
    }

</style>
