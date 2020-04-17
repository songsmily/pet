<template>

    <div class="col center-part">
        <header class="bg-light lter wrapper-md">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="'#'">个人中心</el-breadcrumb-item>
                <el-breadcrumb-item>个人信息管理</el-breadcrumb-item>
            </el-breadcrumb>
        </header>

        <div class="wrapper-md " :class="{'wrap_content':this.$store.state.isMobile === false,'wrap_content_mobile': this.$store.state.isMobile === true}"  id="post-panel">
            <div class="row_content">
                <span class="labelVal">用户名：</span>
                <at-input status="error" size="large" :status="nameType"  v-model="adminUserInfo.username" class="row_content_input"  :disabled="true">

                </at-input>
                <span class="errorNotice" >{{nameNotice}}</span>
            </div>
            <div class="row_content">
                <span class="labelVal">真实姓名：</span>
                <at-input size="large" :status="realNameType" @blur="checkRealname"   class="row_content_input" v-model="adminUserInfo.realName"  placeholder="请填写真实姓名并保存"></at-input>
                <span class="errorNotice" v-if="realNameNotice">请输入正确的姓名</span>

            </div>
            <div class="row_content">
                <span class="labelVal">电话号码：</span>
                <at-input size="large"  :status="phoneType"   placeholder="请填写电话号码并保存" @blur="checkPhone" v-model="adminUserInfo.phone" class="row_content_input" ></at-input>
                <span class="errorNotice" v-if="phoneNotice">请输入正确的手机号</span>
            </div>


            <div class="row_content">
                <el-button icon="el-icon-circle-check" plain  type="primary" size="large" hollow @click="openSureMessage">保存</el-button>
                <el-button icon="el-icon-circle-close" plain type="warning" size="large" style="margin-left: 20px" hollow @click="reloadUserInfoForm">取消</el-button>
            </div>


        </div>
    </div>

</template>

<script>

    import {Breadcrumb, BreadcrumbItem, Button, Cascader, Form, FormItem} from "element-ui"
    import axios from "axios"
    import {Input} from "at-ui"
    import service from "network/axios"

    export default {
        name: "AdminManage",
        components:{
            ElBreadcrumb:Breadcrumb,
            ElBreadcrumbItem:BreadcrumbItem,
            AtInput:Input,
            ElButton:Button,
            ElCascader:Cascader,
            ElForm:Form,
            ElFormItem:FormItem
        },
        data(){

            return{
                adminUserInfo:{
                    username:this.$store.state.adminUserInfo.username,
                    realName:this.$store.state.adminUserInfo.realName,
                    phone:this.$store.state.adminUserInfo.phone
                },
                nameType:'',
                nameNotice:'',
                realNameType:'',
                realNameNotice:false,
                phoneType:'',
                phoneNotice:false,
                addrType:'',
                addrNotice:false,
                bioType:'',
                bioNotice:false,
                options:[],
                selectedOptions: []
            }
        },
        created(){
        },
        mounted(){

        },
        methods:{
            checkRealname:function(){
                if (this.adminUserInfo.realName != undefined  && this.adminUserInfo.realName.length >= 2){
                    this.realNameType = ""
                    this.realNameNotice = false
                    return true
                }else {
                    this.realNameType = "error"
                    this.realNameNotice = true
                    return false
                }
            },

            checkPhone:function(){
                var regPhone = /^1(3|4|5|6|7|8|9)\d{9}$/
                if (this.adminUserInfo.phone != '' && regPhone.test(this.adminUserInfo.phone)) {
                    this.phoneType = ""
                    this.phoneNotice = false
                    return true
                }else {
                    this.phoneType = "error"
                    this.phoneNotice = true
                    return false
                }
            },
            doUpdate:function(){
                this.$Message({
                    message: '正在保存中......',
                    type:"success",
                    iconClass:"el-icon-loading"
                });
                let url = "/api/admin/adminUser/doUpdate"
                const that = this
                let data =  this.adminUserInfo
                service({
                    "method":"post",
                    "url":url,
                    "data":data
                }).then(function (res) {
                    that.$adminUtil.replaceUserInfo(that)
                    that.$Message.closeAll()
                    that.$Notify({
                        title: '信息保存成功',
                        message: '信息保存成功！',
                        type: "success",
                        duration:2000
                    })
                })

            },
            openSureMessage:function(){
                let checkA = this.checkRealname();
                let checkB = this.checkPhone();
                if (checkA && checkB){
                    this.$msgbox.confirm('确定保存修改吗, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.doUpdate()
                    })
                }

            },

            reloadUserInfoForm:function () {
                    this.adminUserInfo.username = this.$store.state.adminUserInfo.username
                    this.adminUserInfo.realName = this.$store.state.adminUserInfo.realName
                    this.adminUserInfo.phone = this.$store.state.adminUserInfo.phone
            }
        }

    }
</script>

<style scoped>

    .page-navigator>li>a, .page-navigator>li>span{
        line-height: 1.42857143;
        padding: 6px 12px;
    }
    .row_content{
        margin-top: 30px;
    }
    .row_content > .labelVal{
        font-size: 13px;
        line-height: 1;
        color: gray;
    }
    .row_content >span > i{
        font-size: 10px;
    }

    .img_container{
        margin-top: 10px;
        border-radius: 50%;
        width: 140px;
        height: 140px;
        background: #0a0f30;
        overflow: hidden;
        position: relative;
        cursor: pointer;
    }
    .img_container:hover .img_cover{
        display: block;
    }
    .img_cover{
        display: none;
        height: 100%;
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background: rgba(0,0,0,.7);
        text-align: center;
        color: #fff;
        font-size: 14px;
        cursor: pointer;
    }
    .img_cover > .upload_icon{
        display: block;
        text-align: center;
        margin-top: 38px;
    }
    .hide{
        display: block;
    }
    .row_content_input{
        padding-top: 8px;
    }
    .errorNotice{
        color: #FF4949;
        font-size: 12px;
        line-height: 1;
    }

</style>
