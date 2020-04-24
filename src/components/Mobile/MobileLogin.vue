<template>

        <div  style="height: 100vh">

            <div>
                <div class="sc-1duRon-2 pvvuG" style="margin: 0">
                    <div  class="sm-btn-group sc-1duRon-5 dvRHZl sc-17dnj82-0 dfsiVH" style="z-index: 9999">
                        <span class="switch-tips">没有帐号？请</span>
                        <router-link to="/mobile/regist" class="sm-button  sc-1n784rm-0 sfCUt" type="default"  >注册</router-link>
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
                                <p >登录</p>
                            </div>

                            <div class="sc-3JRwrF-1 khjAih">

                                <div class="form-wrapper">

                                    <div class="sc-2oZUsG bHHvBK">

                                        <div>

                                            <form action="">
                                                <div class="sc-3ksGSP kPTEpp" type="mobileOrEmail"><label class="label">用户名</label>
                                                    <at-input v-model="phone"  :status="phoneType" :icon="''"></at-input>
                                                    <div :class="{'errorTips':phoneType === 'error' , 'successTips':phoneType === 'success'}" id="usernameTip">{{phoneTip}}</div>
                                                </div>
                                                <div class="sc-3ksGSP kPTEpp" type="mobileOrEmail"><label class="label">登录密码</label>

                                                    <at-input v-model="password" type="password"   :status="passwordType" :icon="''"></at-input>
                                                    <div :class="{'errorTips':passwordType === 'error' , 'successTips':passwordType === 'success'}" id="phoneTip">{{passwordTip}}</div>


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
                                                <button class="sm-button submit sc-1n784rm-0 bcuuIb" type="button" @click="userLogin">
                                                    登录</button>
                                            </form>
                                        </div>
<!--        授权登录-->
                                        <div class="sc-2oZUsG-1 krkGsR">
                                            <tooltip placement="bottom" content="Github登录">
                                                <a @click="GithubAuth">
                                                    <div class="wechat">
                                                        <svg t="1575521212818" class="icon" viewBox="0 0 1049 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2141" width="24" height="24"><path d="M524.979332 0C234.676191 0 0 234.676191 0 524.979332c0 232.068678 150.366597 428.501342 358.967656 498.035028 26.075132 5.215026 35.636014-11.299224 35.636014-25.205961 0-12.168395-0.869171-53.888607-0.869171-97.347161-146.020741 31.290159-176.441729-62.580318-176.441729-62.580318-23.467619-60.841976-58.234462-76.487055-58.234463-76.487055-47.804409-32.15933 3.476684-32.15933 3.476685-32.15933 53.019436 3.476684 80.83291 53.888607 80.83291 53.888607 46.935238 79.963739 122.553122 57.365291 152.97411 43.458554 4.345855-33.897672 18.252593-57.365291 33.028501-70.402857-116.468925-12.168395-239.022047-57.365291-239.022047-259.012982 0-57.365291 20.860106-104.300529 53.888607-140.805715-5.215026-13.037566-23.467619-66.926173 5.215027-139.067372 0 0 44.327725-13.906737 144.282399 53.888607 41.720212-11.299224 86.917108-17.383422 131.244833-17.383422s89.524621 6.084198 131.244833 17.383422C756.178839 203.386032 800.506564 217.29277 800.506564 217.29277c28.682646 72.1412 10.430053 126.029806 5.215026 139.067372 33.897672 36.505185 53.888607 83.440424 53.888607 140.805715 0 201.64769-122.553122 245.975415-239.891218 259.012982 19.121764 16.514251 35.636014 47.804409 35.636015 97.347161 0 70.402857-0.869171 126.898978-0.869172 144.282399 0 13.906737 9.560882 30.420988 35.636015 25.205961 208.601059-69.533686 358.967656-265.96635 358.967655-498.035028C1049.958663 234.676191 814.413301 0 524.979332 0z" fill="#1296db" p-id="2142"></path><path d="M199.040177 753.571326c-0.869171 2.607513-5.215026 3.476684-8.691711 1.738342s-6.084198-5.215026-4.345855-7.82254c0.869171-2.607513 5.215026-3.476684 8.691711-1.738342s5.215026 5.215026 4.345855 7.82254z m-6.953369-4.345856M219.900283 777.038945c-2.607513 2.607513-7.82254 0.869171-10.430053-2.607514-3.476684-3.476684-4.345855-8.691711-1.738342-11.299224 2.607513-2.607513 6.953369-0.869171 10.430053 2.607514 3.476684 4.345855 4.345855 9.560882 1.738342 11.299224z m-5.215026-5.215027M240.760389 807.459932c-3.476684 2.607513-8.691711 0-11.299224-4.345855-3.476684-4.345855-3.476684-10.430053 0-12.168395 3.476684-2.607513 8.691711 0 11.299224 4.345855 3.476684 4.345855 3.476684 9.560882 0 12.168395z m0 0M269.443034 837.011749c-2.607513 3.476684-8.691711 2.607513-13.906737-1.738342-4.345855-4.345855-6.084198-10.430053-2.607513-13.037566 2.607513-3.476684 8.691711-2.607513 13.906737 1.738342 4.345855 3.476684 5.215026 9.560882 2.607513 13.037566z m0 0M308.555733 853.526c-0.869171 4.345855-6.953369 6.084198-13.037566 4.345855-6.084198-1.738342-9.560882-6.953369-8.691711-10.430053 0.869171-4.345855 6.953369-6.084198 13.037566-4.345855 6.084198 1.738342 9.560882 6.084198 8.691711 10.430053z m0 0M351.145116 857.002684c0 4.345855-5.215026 7.82254-11.299224 7.82254-6.084198 0-11.299224-3.476684-11.299224-7.82254s5.215026-7.82254 11.299224-7.82254c6.084198 0 11.299224 3.476684 11.299224 7.82254z m0 0M391.126986 850.049315c0.869171 4.345855-3.476684 8.691711-9.560882 9.560882-6.084198 0.869171-11.299224-1.738342-12.168395-6.084197-0.869171-4.345855 3.476684-8.691711 9.560881-9.560882 6.084198-0.869171 11.299224 1.738342 12.168396 6.084197z m0 0" fill="#1296db" p-id="2143"></path></svg>
                                                    </div>
                                                </a>
                                            </tooltip>

                                            <div class="wework">
                                            <tooltip placement="bottom" content="QQ登录">
                                                <a @click="QQAuth">
                                                <svg t="1575521468259" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4902" width="24" height="24"><path d="M512 0C229.668571 0 0 229.668571 0 512s229.668571 512 512 512 512-229.668571 512-512S794.331429 0 512 0z m0 987.428571C250.148571 987.428571 36.571429 773.851429 36.571429 512S250.148571 36.571429 512 36.571429 987.428571 250.148571 987.428571 512 773.851429 987.428571 512 987.428571z" fill="#3783DD" p-id="4903"></path><path d="M731.428571 504.685714c-8.777143-5.851429-13.165714-16.091429-13.165714-26.331428v-40.96c-2.925714-8.777143-7.314286-16.091429-13.165714-20.48-7.314286-13.165714 0-35.108571-7.314286-40.96-7.314286-36.571429-26.331429-68.754286-52.662857-93.622857-26.331429-26.331429-73.142857-61.44-131.657143-61.44-51.2 1.462857-98.011429 23.405714-131.657143 61.44-39.497143 36.571429-61.44 87.771429-59.977143 141.897142-13.165714 13.165714-13.165714 35.108571-13.165714 61.44-13.165714 26.331429-46.811429 61.44-52.662857 106.788572 0 26.331429 0 74.605714 26.331429 80.457143 20.48 0 26.331429-35.108571 39.497142-40.96 4.388571 26.331429 17.554286 51.2 39.497143 67.291428-20.48 13.165714-59.977143 20.48-52.662857 54.125715 7.314286 48.274286 118.491429 54.125714 172.617143 35.108571 13.165714-7.314286 20.48-20.48 33.645714-20.48 24.868571 16.091429 51.2 27.794286 78.994286 35.108571 52.662857 7.314286 118.491429-7.314286 127.268571-48.274285 0-35.108571-33.645714-40.96-52.662857-54.125715 21.942857-16.091429 35.108571-40.96 39.497143-67.291428 13.165714 7.314286 20.48 40.96 39.497143 40.96 20.48 0 26.331429-48.274286 20.48-80.457143-2.925714-33.645714-23.405714-68.754286-36.571429-89.234286z" fill="#3783DD" p-id="4904"></path></svg>
                                                </a>
                                            </tooltip>
                                            </div>

                                        </div>

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

    import {Tooltip} from "element-ui"
    import {Input} from "at-ui"
    import axios from "axios"
    export default {
        name: "MobileLogin",
        components:{
            Tooltip,
            AtInput:Input
        },
        data(){
          return{
              yzmSrc:'/api/regist/yzm',//验证码获取地址
              phone:'',//电话
              password:'',//密码
              imgYzm:'',//图片验证码
              phoneType:'',//电话框类型
              passwordType:'',//密码类型
              imgYzmType:'',//图片验证码类型
              phoneTip:'',//电话提示
              passwordTip:'',//密码提示
              imgYzmTip:'',//图片验证码提示
              imgYzmIsRight:'',
          }
        },
        watch:{
          "phone":function () {
              this.checkPhone()
          },
          "password":function () {
              this.checkPassword()
          },
          "imgYzm":function () {
                this.checkImgYzm()
          }
        },
        created(){
            this.changeYzmSrc()
            sessionStorage.clear()
        },
        methods:{
            userLogin:function(){
                let uri = "/api/login/doLogin?name=" + this.phone + "&password=" + this.password
                let redirect = "/user/home";
                this.doLogin(uri,redirect)
            },
            doAdminLogin:function(){
                let uri = "/api/login/adminLogin?username=" + this.phone + "&password=" + this.password
                let redirect = "/admin/home";
                this.doLogin(uri,redirect)
            },
            doLogin:function(uri,redirect){
                this.$Toast.loading({
                    message: '登录中...',
                    forbidClick: true,
                });
                let checkPhone =  this.checkPhone()
                let checkPassword =  this.checkPassword()
                this.checkImgYzm()
                const that = this
                Promise.all([new Promise((resolve , reject) => {
                    if (this.imgYzm.length >= 4){
                        let url = "/api/regist/checkImgYzm?imgYzm=" + this.imgYzm
                        const that = this
                        return axios.get(url).then(function (res) {
                            if(res.data.code === 100){
                                that.imgYzmType = "success"
                                that.imgYzmTip = "图片验证码匹配成功！"
                                resolve(true)
                            }else{
                                that.imgYzmType = "error"
                                that.imgYzmTip = "图片验证码匹配失败！"
                                resolve(false)
                            }
                        })
                    }else{
                        resolve(false)
                    }
                })]).then(function (results) {
                    if (results[0] && checkPhone  && checkPassword ){
                        axios.get(uri).then(function (res) {
                            that.$Toast.clear()

                            if (res.data.code === 100){
                                that.$Toast.success("登录成功！")
                                if (redirect === "/user/home"){
                                    if (!sessionStorage.getItem("userInfo")) {
                                        axios.get("/api/user/returnUserInfo").then(function (res) {
                                            if (res.data.data) {
                                                sessionStorage.setItem('userInfo', JSON.stringify(res.data.data))
                                                that.$store.commit("changeUserInfo", that.$util.returnUserInfo())
                                                that.$store.commit("changeLoginType", true)
                                                that.$router.push(redirect)
                                            }
                                        })
                                    }
                                }else{
                                    that.$adminUtil.getUserInfo(that)
                                    if (res.data.data.accountType === 1){
                                        that.$router.push(redirect)
                                    } else if (res.data.data.accountType === 2) {
                                        that.$router.push("/admin/community/home")
                                    } else {
                                        that.$router.push("/admin/system/home")
                                    }
                                }

                            }else if (res.data.code === 60004){
                                that.$Toast.fail("当前账号已被禁止登录，请联系管理员！")


                            } else {
                                that.$Toast.fail("用户名或密码填写错误！！")
                            }
                        })
                    }else{
                        that.$Toast.clear()
                        that.$Toast.fail("信息填写错误！！")
                    }
                })
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
            //改变图片验证码
            changeYzmSrc:function () {
                this.yzmSrc = '/api/regist/yzm?now=' + Date.now();
            },
            //判断用户名
            checkPhone:function () {
                if (this.phone.length >= 6){

                    this.phoneType = "success"
                    this.phoneTip = "核验通过！"
                    return true

                }else{
                    this.phoneType = 'error'
                    this.phoneTip = "核验失败！"
                    return false
                }
            },
            //判断密码
            checkPassword:function () {
                if (this.password.length >= 6){
                    this.passwordType = "success"
                    this.passwordTip = "核验通过！"
                    return true
                }else{
                    this.passwordType = 'error'
                    this.passwordTip = "密码长度最少6位！"
                    return false
                }
            },
            // GithubAuth:function () {
            //     let url = "https://github.com/login/oauth/authorize?client_id=4523142b190f9a6fec47&redirect_uri=http://www.songsmily.cn:8099/GithubCallback&scope=user&state=1"
            //     window.location.href = url
            // },
            // QQAuth:function () {
            //     let url = "https://graph.qq.com/oauth2.0/show?which=Login&display=pc&client_id=101826131&response_type=code&scope=get_info%2Cget_user_info&redirect_uri=http://127.0.0.1:8099/QQCallBack&state=2"
            //     window.location.href = url
            // },
            GithubAuth:function () {
                let url = "https://github.com/login/oauth/authorize?client_id=4523142b190f9a6fec47&redirect_uri=http://www.songsmily.cn:8099/GithubCallback&scope=user&state=1"
                window.location.href = url
            },
            QQAuth:function () {
                let url = "https://graph.qq.com/oauth2.0/show?which=Login&display=pc&client_id=101868669&response_type=code&scope=get_info%2Cget_user_info&redirect_uri=http://www.songsmily.cn:8099/qqCallBack&state=2"
                window.location.href = url
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
    .main{
        margin-top: 100px;
    }
    .title > p{
        font-size: 0.7em;
    }
    .adminButton{
        background-color: white;
        margin-top: 40px;
    }
    .submit >svg{
        width: 18px;
        height: 18px;
        margin-right: 10px;
        vertical-align: middle;
    }


</style>
