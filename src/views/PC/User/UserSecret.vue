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
<!--<==        Row: 1, 宠物狗, 小型犬, 博美犬-->
<!--<==        Row: 2, 宠物狗, 小型犬, 比熊犬-->
<!--<==        Row: 3, 宠物狗, 小型犬, 雪纳瑞犬-->
<!--<==        Row: 4, 宠物狗, 小型犬, 八哥犬-->
<!--<==        Row: 5, 宠物狗, 小型犬, 贵宾犬-->
<!--<==        Row: 6, 宠物狗, 小型犬, 泰迪犬-->
<!--<==        Row: 7, 宠物狗, 小型犬, 吉娃娃犬-->
<!--<==        Row: 8, 宠物狗, 小型犬, 可卡犬-->
<!--<==        Row: 9, 宠物狗, 小型犬, 喜乐蒂犬-->
<!--<==        Row: 10, 宠物狗, 小型犬, 斗牛犬-->
<!--<==        Row: 11, 宠物狗, 小型犬, 西高地犬-->
<!--<==        Row: 12, 宠物狗, 小型犬, 约克夏犬-->
<!--<==        Row: 13, 宠物狗, 小型犬, 猎狐梗犬-->
<!--<==        Row: 14, 宠物狗, 小型犬, 丝毛梗犬-->
<!--<==        Row: 15, 宠物狗, 小型犬, 蝴蝶犬-->
<!--<==        Row: 16, 宠物狗, 小型犬, 北京犬-->
<!--<==        Row: 17, 宠物狗, 小型犬, 西施犬-->
<!--<==        Row: 18, 宠物狗, 小型犬, 银狐犬-->
<!--<==        Row: 19, 宠物狗, 小型犬, 迷你品犬-->
<!--<==        Row: 20, 宠物狗, 小型犬, 玛尔济斯犬-->
<!--<==        Row: 21, 宠物狗, 中型犬, 金毛-->
<!--<==        Row: 22, 宠物狗, 中型犬, 哈士奇-->
<!--<==        Row: 23, 宠物狗, 中型犬, 萨摩耶-->
<!--<==        Row: 24, 宠物狗, 中型犬, 松狮-->
<!--<==        Row: 25, 宠物狗, 中型犬, 拉布拉多-->
<!--<==        Row: 26, 宠物狗, 中型犬, 边境牧羊犬-->
<!--<==        Row: 27, 宠物狗, 中型犬, 德国牧羊犬-->
<!--<==        Row: 28, 宠物狗, 中型犬, 苏牧-->
<!--<==        Row: 29, 宠物狗, 中型犬, 喜乐蒂-->
<!--<==        Row: 30, 宠物狗, 中型犬, 柯基-->
<!--<==        Row: 31, 宠物狗, 中型犬, 斗牛犬-->
<!--<==        Row: 32, 宠物狗, 中型犬, 比格犬-->
<!--<==        Row: 33, 宠物狗, 中型犬, 巴吉度-->
<!--<==        Row: 34, 宠物狗, 中型犬, 斑点狗-->
<!--<==        Row: 35, 宠物狗, 中型犬, 沙皮犬-->
<!--<==        Row: 36, 宠物狗, 大型犬, 藏獒-->
<!--<==        Row: 37, 宠物狗, 大型犬, 阿拉斯加-->
<!--<==        Row: 38, 宠物狗, 大型犬, 大白熊犬-->
<!--<==        Row: 39, 宠物狗, 大型犬, 古牧-->
<!--<==        Row: 40, 宠物狗, 大型犬, 杜宾犬-->
<!--<==        Row: 41, 宠物狗, 大型犬, 罗威纳-->
<!--<==        Row: 42, 宠物猫, 长毛猫, 波斯猫-->
<!--<==        Row: 43, 宠物猫, 长毛猫, 布偶猫-->
<!--<==        Row: 44, 宠物猫, 长毛猫, 英国长毛猫-->
<!--<==        Row: 45, 宠物猫, 长毛猫, 美国短尾猫-->
<!--<==        Row: 46, 宠物猫, 短毛猫, 狸花猫-->
<!--<==        Row: 47, 宠物猫, 短毛猫, 美国短毛猫-->
<!--<==        Row: 48, 宠物猫, 短毛猫, 苏格兰折耳猫-->
<!--<==        Row: 49, 宠物猫, 短毛猫, 英国短毛猫-->
<!--<==        Row: 50, 宠物猫, 短毛猫, 橘猫-->
<!--<==        Row: 51, 宠物猫, 短毛猫, 暹罗猫-->
<!--<==        Row: 52, 啮齿类, 鼠类, 仓鼠-->
<!--<==        Row: 53, 啮齿类, 鼠类, 龙猫-->
<!--<==        Row: 54, 啮齿类, 鼠类, 松鼠-->
<!--<==        Row: 55, 啮齿类, 兔类, 法国垂耳兔-->
<!--<==        Row: 56, 啮齿类, 兔类, 大耳白兔-->
<!--<==        Row: 57, 啮齿类, 兔类, 英国垂耳兔-->
<!--<==        Row: 58, 啮齿类, 兔类, 标准金吉拉兔-->
<!--<==        Row: 59, 啮齿类, 兔类, 荷兰兔-->

<script>
    import {Breadcrumb, BreadcrumbItem, Form, FormItem,Input,Button} from "element-ui"
    import axios from "axios"
    export default {
        name: "UserAccount",
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
                        let url = "/api/user/resetPassword?password=" + this.ruleForm.pass;
                        const that = this
                        axios.get(url).then(function (res) {
                            if (res.data.code === 100){
                                that.$Message({
                                    type:"success",
                                    message:"密码修改成功！"
                                })
                                setTimeout(function () {
                                    that.$refs[formName].resetFields();
                                    that.$store.state.isShowUserSecret = false

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
               this.$store.state.isShowUserSecret = false
            }
        }
    }
</script>

<style scoped>
    .s-form-item{
        margin-top: 10px;
    }

</style>
