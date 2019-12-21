<template>
    <div id="content" class="app-content">

        <a class="off-screen-toggle hide"></a>
        <main class="app-content-body ">
            <div class="hbox hbox-auto-xs hbox-auto-sm">
                <div class="col center-part">
                    <header class="bg-light lter wrapper-md">
                        <el-breadcrumb separator-class="el-icon-arrow-right">
                            <el-breadcrumb-item >个人中心</el-breadcrumb-item>
                            <el-breadcrumb-item>个人信息管理</el-breadcrumb-item>
                        </el-breadcrumb>
                    </header>

                    <div class="wrapper-md " :class="{'wrap_content':this.$store.state.isMobile === false,'wrap_content_mobile': this.$store.state.isMobile === true}" id="">
                        <div class="row_content">
                            <span class="labelVal">用户名：</span>
                            <at-input status="error" size="large" :status="nameType"  v-model="userInfo.name" class="row_content_input" @blur="checkName">

                            </at-input>
                            <span class="errorNotice" >{{nameNotice}}</span>
                        </div>
                        <div class="row_content">
                            <span class="labelVal">真实姓名：</span>
                            <at-input size="large" :status="realNameType" @blur="checkRealname"   class="row_content_input" v-model="userInfo.realName"  placeholder="请填写真实姓名并保存"></at-input>
                            <span class="errorNotice" v-if="realNameNotice">请输入正确的姓名</span>

                        </div>
                        <div class="row_content">
                            <span class="labelVal">电话号码：</span>
                            <at-input size="large"   placeholder="请填写电话号码并保存" v-model="userInfo.phone" class="row_content_input" :disabled="true"></at-input>
                        </div>
                        <div class="row_content">
                            <span class="labelVal">邮件地址：</span>
                            <at-input size="large" @blur="checkEmail" :status="emailType"  v-model="userInfo.email" placeholder="请填写邮件地址并保存" class="row_content_input"></at-input>
                            <span class="errorNotice" v-if="emailNotice">请输入正确的邮箱</span>

                        </div>
                        <div class="row_content">
                            <span class="labelVal">地区：</span>
                            <div class="row_content_input">
                                <el-cascader ref="location" :options="options" v-model="selectedOptions" @change="handleAreaChange"  style="width: 100%">
                                    <template slot-scope="{ node, data }">
                                        <span>{{ data.label }}</span>
                                        <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
                                    </template>
                                </el-cascader>
                            </div>
                        </div>
                        <div class="row_content">
                            <span class="labelVal">详细住址：</span>
                            <at-input size="large" :status="addrType" @blur="checkAddr"   placeholder="请填写详细住址并保存" v-model="userInfo.addr" class="row_content_input"></at-input>
                            <span class="errorNotice" v-if="addrNotice">请输入正确的地址</span>

                        </div>


                        <div class="row_content">
                            <span class="labelVal">个性签名：</span>
                            <at-input size="large" @blur="checkBio" :status="bioType"  type="textarea" v-model="userInfo.bio" class="row_content_input"  min-rows="2" max-rows="4" placeholder="这里输入内容，请输入多行"></at-input>
                            <span class="errorNotice"  v-if="bioNotice">请输入正确的个性签名</span>


                        </div>

                        <div class="row_content">
                            <span class="labelVal">头像：<i>仅支持JPG、PNG、GIF格式，文件小于1M</i></span>
                            <div class="img_container">
                                <div>
                                    <img style="width: 140px;height: 140px" :src="userInfo.avatarUrl" alt="">
                                </div>
                                <span class="img_cover" @click="choiceImg">
                                    <span class="upload_icon">
                                        <svg t="1576639130005" class="icon" viewBox="0 0 1066 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1859" width="40" height="40"><path d="M806.4 362.666667a38.4 38.4 0 1 1-76.8 0 196.266667 196.266667 0 0 0-392.533333 0 38.4 38.4 0 0 1-76.8 0 273.066667 273.066667 0 1 1 546.133333 0z" fill="#ffffff" p-id="1860"></path><path d="M768 882.858667a38.4 38.4 0 0 1 0-76.8 196.266667 196.266667 0 1 0 0-392.533334 38.4 38.4 0 0 1 0-76.8 273.066667 273.066667 0 1 1 0 546.133334zM277.333333 336.725333a38.4 38.4 0 0 1 0 76.8 196.266667 196.266667 0 1 0 0 392.533334 38.4 38.4 0 0 1 0 76.8 273.066667 273.066667 0 1 1 0-546.133334z" fill="#ffffff" p-id="1861"></path><path d="M484.266667 664.362667a38.4 38.4 0 0 1 76.8 0V896a38.4 38.4 0 1 1-76.8 0v-231.637333z" fill="#ffffff" p-id="1862"></path><path d="M359.509333 691.370667a38.4 38.4 0 0 1-54.613333-53.973334l190.421333-193.024a38.4 38.4 0 0 1 54.698667 0l190.464 193.024a38.4 38.4 0 0 1-54.656 53.973334l-163.157333-165.333334-163.157334 165.333334z" fill="#ffffff" p-id="1863"></path></svg>

                                    </span>
                                    <span>上传新头像</span>
                                </span>
                                <input :ref="'filElem'" type="file" style="display: none" @change="getImg">
                            </div>
                        </div>
                        <div class="row_content">
                            <el-button icon="el-icon-circle-check" plain  type="primary" size="large" hollow @click="openSureMessage">保存</el-button>
                            <el-button icon="el-icon-circle-close" plain type="warning" size="large" style="margin-left: 20px" hollow @click="reloadUserInfoForm">取消</el-button>
                        </div>


                    </div>
                </div>
                <!--首页右侧栏-->
                <right-aside-bar></right-aside-bar>
            </div>
        </main>
    </div>
</template>

<script>

    import RightAsideBar from "components/PC/RightAsideBar"
    import {Breadcrumb, BreadcrumbItem, Button, Cascader, Form, FormItem} from "element-ui"
    import axios from "axios"
    import {Input} from "at-ui"

    export default {
        name: "UserManage",
        components:{
            RightAsideBar,
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
                userInfo:{
                    avatarUrl:this.$store.state.userInfo.avatarUrl,
                    accountId:this.$store.state.userInfo.accountId,
                    accountType:this.$store.state.userInfo.accountType,
                    id:this.$store.state.userInfo.id,
                    name:this.$store.state.userInfo.name,
                    bio:this.$store.state.userInfo.bio,
                    realName:this.$store.state.userInfo.realName,
                    email:this.$store.state.userInfo.email,
                    // email:"test@qq.com",
                    location:this.$store.state.userInfo.location,
                    addr:this.$store.state.userInfo.address,
                    phone:this.$store.state.userInfo.phone
                },
                nameType:'',
                nameNotice:'',
                realNameType:'',
                realNameNotice:false,
                emailType:'',
                emailNotice:false,
                addrType:'',
                addrNotice:false,
                bioType:'',
                bioNotice:false,
                options:[],
                selectedOptions: []
            }
        },
        mounted(){
            this.getOptions()
            if (this.userInfo.location){
                this.getUserLocationArray();
            }
        },
        methods:{
            checkName:function(){
                if (this.userInfo.name != undefined && this.userInfo.name.length >= 1){
                    let url = "/api/user/isRepeatName?name=" + this.userInfo.name
                    const that = this
                    return axios.get(url).then(function (res) {
                        if(res.data.data){
                            that.nameType = ""
                            that.nameNotice = ""
                            return true
                        }else{
                            that.nameType = "error"
                            that.nameNotice = "用户名已被使用！"
                            return false
                        }
                    })
                }else {
                    this.nameType = "error"
                    this.nameNotice = "请输入正确的昵称！"
                    return false
                }
            },
            checkRealname:function(){
                if (this.userInfo.realName != undefined  && this.userInfo.realName.length >= 2){
                    this.realNameType = ""
                    this.realNameNotice = false
                    return true
                }else {
                    this.realNameType = "error"
                    this.realNameNotice = true
                    return false
                }
            },
            checkAddr:function(){
                if (this.userInfo.addr != undefined && this.userInfo.addr.length >= 1){
                    this.addrType = ""
                    this.addrNotice = false
                    return true
                }else {
                    this.addrType = "error"
                    this.addrNotice = true
                    return false
                }
            },
            checkBio:function(){
                if (this.userInfo.bio != undefined && this.userInfo.bio.length >= 1){
                    this.bioType = ""
                    this.bioNotice = false
                    return true
                }else {
                    this.bioType = "error"
                    this.bioNotice = true
                    return false
                }
            },
            checkEmail:function(){
                var regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
                if (this.userInfo.email != '' && regEmail.test(this.userInfo.email)) {
                    this.emailType = ""
                    this.emailNotice = false
                    return true
                }else {
                    this.emailType = "error"
                    this.emailNotice = true
                    return false
                }
            },
            choiceImg:function (){
                // console.log(this.$store.state)
                this.$refs.filElem.dispatchEvent(new MouseEvent('click'))
            },
            doUpdate:function(){
                let checkName = false
                if(this.userInfo.name != ''){
                    checkName = true
                }
                let checkRealname = this.checkRealname()
                let checkEmail = this.checkEmail()
                let checkAddr = this.checkAddr()
                let checkBio = this.checkBio()
                const that = this
                that.$Message({
                    message: '正在保存中......',
                    type:"success",
                    iconClass:"el-icon-loading"
                });
                Promise.all([
                    new Promise((resolve,reject) => {
                        if (checkName){
                            let url = "/api/user/isRepeatName?name=" + this.userInfo.name
                            const that = this
                            return axios.get(url).then(function (res) {
                                console.log(res)

                                if(res.data.data){
                                    that.nameType = ""
                                    that.nameNotice = ""
                                    resolve(true)
                                }else{
                                    that.nameType = "error"
                                    that.nameNotice = "用户名已被使用！"
                                    resolve(false)
                                }
                            })
                        }else{
                            that.nameType = "error"
                            that.nameNotice = "请填写正确的用户名！"
                            resolve(false)
                        }
                    })
                ]).then(results => {
                    console.log(results)
                    if (results[0] && checkRealname && checkBio && checkAddr && checkEmail){
                        let url = "/api/user/doUpdate"
                        const that = this
                        let data =  this.userInfo
                        axios({
                            "method":"post",
                            "url":url,
                            "data":data
                        }).then(function (res) {
                            that.$util.replaceUserInfo(that)
                            that.$Message.closeAll()
                            that.$Notify({
                                title: '信息保存成功',
                                message: '信息保存成功！',
                                type: "success",
                                duration:2000
                            })
                        })
                    }else{
                        that.$Message.closeAll()
                        this.$Notify({
                            title: '信息填写错误',
                            message: '请更正后保存！',
                            type: "error",
                            duration:2000
                        })
                    }
                })

            },
            openSureMessage:function(){
                this.$msgbox.confirm('确定保存修改吗, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.doUpdate()
                })
            },
            getOptions:function(){
                let url = "/api/plot/getPlotAndBuild"
                const that = this
                axios.get(url).then(function (res) {
                    that.options = res.data.data
                })
            },
            getUserLocationArray:function(){
                let url = "/api/build/getUserLocationArray?build_name=" + this.userInfo.location
                const that = this;
                axios.get(url).then(function (res) {
                    let options = [res.data.data.plotId,res.data.data.buildId]
                    that.selectedOptions = options
                })
            },
            handleAreaChange:function(val){
                this.userInfo.location = this.$refs['location'].getCheckedNodes()[0].pathLabels[1]
                // console.log(this.$refs['location'].getCheckedNodes()[0].pathLabels)
                // console.log(locations)
            },
            getImg:function () {
                const that = this
                const inputFile = this.$refs.filElem.files[0]
                if(inputFile){
                    if( inputFile.size > 1024 * 1024 || inputFile.type !== 'image/jpeg' && inputFile.type !== 'image/png' && inputFile.type !== 'image/gif'){
                        this.$Notify({
                            title: '文件类型错误',
                            message: '仅支持JPG、PNG、GIF格式，且小于1M！',
                            type: "error",
                            duration:2000
                        })
                        return false;
                    }
                }else{
                    return false;
                }
                let fileReader = new FileReader()
                fileReader.readAsDataURL(inputFile)
                fileReader.onload = function () {
                    that.userInfo.avatarUrl = this.result
                    console.log(this.result)
                }

            },
            reloadUserInfoForm:function () {
                this.userInfo.avatarUrl = this.$store.state.userInfo.avatarUrl
                this.userInfo.accountId = this.$store.state.userInfo.accountId
                this.userInfo.accountType = this.$store.state.userInfo.accountType
                this.userInfo.id = this.$store.state.userInfo.id
                this.userInfo.name = this.$store.state.userInfo.name
                this.userInfo.bio = this.$store.state.userInfo.bio
                this.userInfo.realName = this.$store.state.userInfo.realName
                this.userInfo.email = this.$store.state.userInfo.email
                this.userInfo.location = this.$store.state.userInfo.location
                this.userInfo.addr = this.$store.state.userInfo.address
                this.userInfo.phone = this.$store.state.userInfo.phone
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




















