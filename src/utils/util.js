import axios from "axios"
export  default {
    // initApp(that){
    //     this.isMobile(that)
    //     this.getUserInfo(that);
    //
    // },
    getUserInfo(that){
        const _this = this
        if (!sessionStorage.getItem("userInfo")){
            axios.get("/api/user/returnUserInfo").then(function (res) {
                console.log(res)
                if (res.data.data){
                    sessionStorage.setItem('userInfo',JSON.stringify(res.data.data))
                    that.$store.commit("changeUserInfo",_this.returnUserInfo())
                    that.$store.commit("changeLoginType",true)
                }
            }).catch(function (res) {
                console.log(res)
            })
        }

    },
    replaceUserInfo(that){
        const _this = this
        axios.get("/api/user/returnUserInfo").then(function (res) {
            console.log(res)
            if (res.data.data){
                sessionStorage.setItem('userInfo',JSON.stringify(res.data.data))
                that.$store.commit("changeUserInfo",_this.returnUserInfo())
                that.$store.commit("changeLoginType",true)
                that.reloadUserInfoForm();
            }
        }).catch(function (res) {
            console.log(res)
        })
    },
    setUserInfoAndLoginTypeToStore(that){
        that.$store.commit("changeUserInfo",this.returnUserInfo())
        that.$store.commit("changeLoginType",this.loginType())

    },
    returnUserInfo(){
        return JSON.parse(sessionStorage.getItem("userInfo"))
    },
    isMobile(that){
        if( navigator.userAgent.match(/Android/i)|| navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i) ){
            that.$store.commit('isMobile',true)
            console.log("我是手机")
        }else{
            that.$store.commit('isMobile',false)
        }
    },
    loginType(that){
        return !(null === sessionStorage.getItem("userInfo"))
    },

    logOut (that) {
        const _this = this
        axios.get("/api/user/logOut").then(function (res) {
            that.$Message({
                message: '已退出登录！',
                type:"success"
            });
            sessionStorage.removeItem("userInfo")
            _this.setUserInfoAndLoginTypeToStore(that)
            that.$router.push('/login')
        })
    }
}
