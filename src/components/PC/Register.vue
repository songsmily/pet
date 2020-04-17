<template>
    <div style="height: 100vh">

        <div>
            <div class="sc-1duRon-2 pvvuG" style="margin: 0">
                <div  class="sm-btn-group sc-1duRon-5 dvRHZl sc-17dnj82-0 dfsiVH" style="z-index: 9999">
                    <span class="switch-tips">已有帐号？请</span>
                    <router-link to="/login" class="sm-button  sc-1n784rm-0 sfCUt" type="default"  >登录</router-link>
                </div>

            </div>
        </div>
        <div class="sc-1duRon-1 sbfRl">
            <p class="sc-1I1iYs-3 kmwMDA" style='font-family: serif;font-size: 18px;color: #41464B;'>宠物之家</p>

        </div>
        <div class="sc-1duRon-3 cPHJDB">
            <div class="sc-1duRon-4 doAKkT">
                <div class="sc-3JRwrF irtYus">
                    <div class="main">
                        <div class="title">
                            <!--                                <img src="http://localhost/exam/resources/views/img/70.png" style="width: 40%">-->
                            <p>注册</p>
                        </div>
                        <div class="sc-3JRwrF-1 khjAih">
                            <div class="form-wrapper">
                                <div class="sc-2oZUsG bHHvBK">
                                    <form id="form">
                                        <div>
                                            <div class="sc-3ksGSP kPTEpp" type="mobileOrEmail"><label class="label">用户名</label>
                                                <at-input v-model="nickname"  :status="nicknameType" :icon="''"></at-input>
                                                <div :class="{'errorTips':nicknameType === 'error' , 'successTips':nicknameType === 'success'}" >{{nicknameTip}}</div>
                                            </div>
                                            <div class="sc-3ksGSP kPTEpp" type="mobileOrEmail"><label class="label">手机号</label>
                                                <at-input v-model="phone"  :status="phoneType" :icon="''"></at-input>
                                                <div :class="{'errorTips':phoneType === 'error' , 'successTips':phoneType === 'success'}" >{{phoneTip}}</div>
                                            </div>

                                            <div class="sc-3ksGSP kPTEpp" type="mobileOrEmail"><label class="label">登录密码</label>

                                                <at-input v-model="password" type="password"   :status="passwordType" :icon="''"></at-input>
                                                <div :class="{'errorTips':passwordType === 'error' , 'successTips':passwordType === 'success'}" id="phoneTip">{{passwordTip}}</div>


                                            </div>
                                            <div  class="sc-3ksGSP kPTEpp" type="mobileOrEmail"><label class="label">确认密码</label>
                                                <at-input v-model="repassword"  type="password" :status="repasswordType" :icon="''"></at-input>

                                                <div :class="{'errorTips':repasswordType === 'error' , 'successTips':repasswordType === 'success'}" id="zhibuTip" class="tips">{{repasswordTip}}</div>

                                            </div>
                                            <div class="sc-3ksGSP kPTEpp" type="password"><label class="label">图形验证码</label>
                                                <at-input v-model="imgYzm"   :status="imgYzmType" :icon="''">
                                                    <template slot="append">
                                                            <span style="width: 80px;cursor: pointer;">
                                                                <img :src="yzmSrc" @click="changeYzmSrc" style="width: 150px;height: 30px" alt="">
                                                            </span>
                                                    </template>
                                                </at-input>

                                                <div :class="{'errorTips':imgYzmType === 'error' , 'successTips':imgYzmType === 'success'}">{{imgYzmTip}}</div>
                                            </div>
                                            <div class="sc-3ksGSP kPTEpp" type="password"><label class="label">短信验证码</label>
                                                <at-input v-model="messageCode"  :status="messageCodeType" :icon="''">
                                                    <template slot="append">
                                                            <span v-if="!messageCodeIsSend" @click="sendMessageCode" style="width: 80px;cursor: pointer;text-align: center">
                                                                获取短信验证码
                                                            </span>
                                                        <span v-else style="width: 80px;cursor: pointer;text-align: center">
                                                                {{reSendMessageText}}
                                                            </span>
                                                    </template>
                                                </at-input>

                                                <div  :class="{'errorTips':messageCodeType === 'error' , 'successTips':messageCodeType === 'success'}" >{{messageCodeTip}}</div>
                                            </div>

                                            <button class="sm-button submit sc-1n784rm-0 bcuuIb" type="button" @click="doRegist">立即注册</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
    import {Input} from "at-ui"
    import {Button} from "at-ui"
    import axios from "axios"
    export default {
        name: "Register",
        data(){
            return{
                yzmSrc:'/api/regist/yzm',//验证码获取地址
                nickname:'',//用户名
                phone:'',//电话
                password:'',//密码
                repassword:'',//重复密码
                imgYzm:'',//图片验证码
                messageCode:'',//短信验证码
                nicknameType:'',//用户名框类型
                phoneType:'',//电话框类型
                passwordType:'',//密码类型
                repasswordType:'',//重复密码类型
                imgYzmType:'',//图片验证码类型
                messageCodeType:'',//短信验证码类型
                nicknameTip:'',//用户名提示
                phoneTip:'',//电话提示
                passwordTip:'',//密码提示
                repasswordTip:'',//重复密码提示
                imgYzmTip:'',//图片验证码提示
                messageCodeTip:'',//短信验证码提示
                messageCodeIsSend:false,//短信验证码是否发送成功
                imgYzmIsRight:'',
                reSendMessageText:'60秒后重新发送',
                checkPhonePos:false
            }
        },
        watch:{
            'imgYzm':function () {

                this.checkImgYzm()
            },
            'phone':function () {
                this.checkPhone()
            },
            "password":function (newValue, oldValue) {
                this.checkPassword()
            },
            "repassword":function () {
                this.checkRepassword()
            },
            "messageCode":function () {
                this.checkMessageCode()
            },
            "nickname":function () {
                this.checkNickname();
            }
        },
        components:{
            AtInput:Input,
            AtButton:Button
        },
        methods:{
            doRegist:function(){
                this.$Message({
                    message: '正在注册中....',
                    duration:0
                });
                let val = false
                let checkPassword = this.checkPassword()
                let checkRePassword = this.checkRepassword()

                Promise.all([
                    new Promise((resolve , reject) =>{
                        const that = this
                        let url = "/api/regist/checkPhone?phone=" + this.phone
                        if((/^1[345789]\d{9}$/.test(this.phone))){
                            axios.get(url).then(function (res) {
                                if (res.data.code === 100){
                                    that.phoneType = "success"
                                    that.phoneTip = "核验通过！"

                                }else{
                                    that.phoneType = 'error'
                                    that.phoneTip = "该手机号已被注册！"
                                }
                                resolve(res)
                            })
                        }else{
                            that.phoneType = 'error'
                            that.phoneTip = "核验失败！"
                            resolve(false)
                        }

                    }),
                    new Promise((resolve , reject) =>{
                        let url = "/api/regist/checkMessageCode?messageCode=" + this.messageCode
                        const that = this
                        if (that.messageCode.length >= 6) {
                            axios.get(url).then(function (res) {
                                if (res.data.code === 100) {
                                    that.messageCodeType = "success"
                                    that.messageCodeTip = "短信验证码匹配成功！"
                                } else {
                                    that.messageCodeType = "error"
                                    that.messageCodeTip = "短信验证码匹配失败！"
                                }
                                resolve(res)
                            })
                        }
                    }),
                    new Promise((resolve , reject) =>{
                        let url = "/api/regist/checkImgYzm?imgYzm=" + this.imgYzm
                        const that = this
                        axios.get(url).then(function (res) {
                            if(res.data.code === 100){
                                that.imgYzmType = "success"
                                that.imgYzmTip = "图片验证码匹配成功！"
                            }else{
                                that.imgYzmType = "error"
                                that.imgYzmTip = "图片验证码匹配失败！"
                            }
                            resolve(res)
                        })
                    }),
                    new Promise((resolve,reject) => {
                        const that = this
                        let url = "/api/regist/checkNickname?nickname=" + this.nickname
                        axios.get(url).then(function (res) {
                            if (res.data.code === 100) {
                                that.nicknameType = "success"
                                that.nicknameTip = "核验通过！"
                            } else {
                                that.nicknameType = 'error'
                                that.nicknameTip = "该用户名已被使用！"
                            }
                            resolve(res)
                        })
                    })]
                ).then(results => {
                    if (checkPassword && checkRePassword && results[0] && results[0].data.code === 100 && results[1].data.code === 100 && results[2].data.code === 100 && results[3].data.code === 100) {
                        let url = "/api/regist/doRegist"
                        let data = {
                            "phone": this.phone,
                            "password": this.password,
                            "name": this.nickname
                        }
                        const that = this
                        axios.post(url, data).then(function (res) {
                            that.$Message.closeAll()
                            if (res.data.code === 100) {
                                that.$Message({
                                    message: '注册成功，请返回登录！',
                                    type: 'success'
                                });
                            } else {
                                that.$Message({
                                    message: '注册失败，请重新注册！',
                                    type: 'warning'
                                });
                            }
                        })
                    }else{
                        this.$Message.closeAll()
                        this.$Message({
                            message: '信息填写错误,请核查！',
                            type:"warning"
                        });
                    }
                })

                // if (check1 && check2 && check3 && check4 && check5){

            },
            sendMessageCode:function(){
                if (this.checkPhone() && this.checkImgYzm()){
                    let url = "/api/regist/sendCode?memPhone=" + this.phone
                    const that = this
                    axios.get(url).then(function (res) {
                        if (res.data.code === 100){
                            that.messageCodeIsSend = true
                            let time = 60
                            let timer = setInterval(function () {
                                time -= 1
                                that.reSendMessageText = time + "秒后重新发送"
                                if (time === 0){
                                    clearInterval(timer)
                                    that.messageCodeIsSend = false
                                }
                            },1000)
                        }else{
                            that.$Message.error("验证码发送失败，请重新点击发送！")
                        }
                    })

                }

            },
            //验证短信验证码
            checkMessageCode:function(){
                let url = "/api/regist/checkMessageCode?messageCode=" + this.messageCode
                const that = this
                if (that.messageCode.length >= 6) {
                    return axios.get(url).then(function (res) {
                        if (res.data.code === 100) {
                            that.messageCodeType = "success"
                            that.messageCodeTip = "短信验证码匹配成功！"
                            return true
                        } else if (res.data.code === 60000){
                            that.messageCodeType = "error"
                            that.messageCodeTip = "短信验证码已过期，请重新发送！"
                        }else {
                            that.messageCodeType = "error"
                            that.messageCodeTip = "短信验证码匹配失败！"
                        }
                    })
                }else{
                    this.messageCodeType = "error"
                    this.messageCodeTip = "短信验证码匹配失败！"
                    return false
                }
            },
            //异步判断电话号码、图片验证码以及短信验证码
            asyncCheck:function(){

            },
            //改变图片验证码
            changeYzmSrc:function () {
                this.yzmSrc = '/api/regist/yzm?now=' + Date.now();
            },
            //判断密码
            checkPassword:function(){
                if (this.password.length >= 6){
                    this.passwordType = 'success'
                    this.passwordTip = "密码强度："  + this.checkStrong(this.password) +  ""
                    return true
                }else{
                    this.passwordType = 'error'
                    this.passwordTip = "密码长度6-12位！"
                    return false
                }
            },
            //判断重复密码
            checkRepassword:function(){
                if (this.password === this.repassword){
                    this.repasswordType = 'success'
                    this.repasswordTip = "匹配成功！"
                    return true
                }else{
                    this.repasswordType = 'error'
                    this.repasswordTip = "两次输入不匹配！"
                    return true
                }
            },
            //判断图片验证码
            checkImgYzm:function () {
                if (this.imgYzm.length >=4){
                    let url = "/api/regist/checkImgYzm?imgYzm=" + this.imgYzm
                    const that = this
                    return axios.get(url).then(function (res) {
                        if(res.data.code === 100){
                            that.imgYzmType = "success"
                            that.imgYzmTip = "图片验证码匹配成功！"
                            return true
                        }else{
                            that.imgYzmType = "error"
                            that.imgYzmTip = "图片验证码匹配失败！"
                            return false
                        }
                    })
                }else {
                    this.imgYzmType = "error"
                    this.imgYzmTip = "图片验证码匹配失败！"
                    return false
                }
            },
            //判断电话号码
            checkPhone:function () {
                if (this.phone.length >= 11){
                    if (!(/^1[345789]\d{9}$/.test(this.phone))){
                        this.phoneType = "error"
                        this.phoneTip = "核验失败！"
                        return false
                    }else{
                        const that = this
                        let url = "/api/regist/checkPhone?phone=" + this.phone
                        axios.get(url).then(function (res) {
                            if (res.data.code === 100){
                                that.phoneType = "success"
                                that.phoneTip = "核验通过！"
                                that.checkPhonePos = true
                            }else{
                                that.phoneType = 'error'
                                that.phoneTip = "该手机号已被注册！"
                                that.checkPhonePos = false
                            }
                        })
                        return this.checkPhonePos

                    }
                }else{
                    this.phoneType = 'error'
                    this.phoneTip = "核验失败！"
                    return false
                }
            },
            //判断用户名
            checkNickname:function () {
                if (this.nickname.length >= 1 && this.nickname.length <= 20) {
                    const that = this
                    let url = "/api/regist/checkNickname?nickname=" + this.nickname
                    axios.get(url).then(function (res) {
                        if (res.data.code === 100) {
                            that.nicknameType = "success"
                            that.nicknameTip = "核验通过！"
                        } else {
                            that.nicknameType = 'error'
                            that.nicknameTip = "该用户名已被使用！"
                        }
                    })
                }else{
                    this.nicknameType = 'error'
                    this.nicknameTip = "用户名长度1-20个字符！"
                    return false
                }

            },
            checkStrong:function(sValue) {
                var modes = 0;
                //正则表达式验证符合要求的
                if(sValue.length < 1) return modes;
                if(/\d/.test(sValue)) modes++; //数字
                if(/[a-z]/.test(sValue)) modes++; //小写
                if(/[A-Z]/.test(sValue)) modes++; //大写
                if(/\W/.test(sValue)) modes++; //特殊字符

                //逻辑处理
                switch(modes) {
                    case 1:
                        return "弱";
                        break;
                    case 2:
                        return "中";
                        break;
                    case 3:
                    case 4:
                        return "强"
                        break;
                }
                return modes;
            }
        }
    }
</script>

<style scoped>
    @import "~assets/css/logres/login.css";
    label{
        text-align: left;
        text-shadow: none;
        font-family: -apple-system,BlinkMacSystemFont,"PingFang SC",Helvetica,Tahoma,Arial,"Microsoft YaHei",微软雅黑,黑体,Heiti,sans-serif,SimSun,宋体,serif;
        display: block;
        padding: 0;
    }
</style>
