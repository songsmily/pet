import axios from "axios"
import service from "../network/axios"
export default {
    // initApp(that){
    //     this.isMobile(that)
    //     this.getUserInfo(that);
    //
    // },
    /**
     * 获取用户信息
     * @param that
     */
    getUserInfo(that) {
        const _this = this
        if (!sessionStorage.getItem("userInfo")) {
            axios.get("/api/user/returnUserInfo").then(function (res) {
                console.log(res)
                if (res.data.data) {
                    sessionStorage.setItem('userInfo', JSON.stringify(res.data.data))
                    that.$store.commit("changeUserInfo", _this.returnUserInfo())
                    that.$store.commit("changeLoginType", true)
                }
            }).catch(function (res) {
                console.log(res)
            })
        }

    },
    /**
     * 替换用户信息
     * @param that
     */
    replaceUserInfo(that) {
        const _this = this
        axios.get("/api/user/returnUserInfo").then(function (res) {
            console.log(res)
            if (res.data.data) {
                sessionStorage.setItem('userInfo', JSON.stringify(res.data.data))
                that.$store.commit("changeUserInfo", _this.returnUserInfo())
                that.$store.commit("changeLoginType", true)
                that.reloadUserInfoForm()
            }
        }).catch(function (res) {
            console.log(res)
        })
    },
    /**
     * 获取用户消息和系统通知
     */
    returnMessage(that,status=false){
        if (that.$store.state.sysPetMessage.limit === 0){
            that.$store.state.sysPetMessage.limit +=  10
        }else{
            that.$store.state.sysPetMessage.limit +=  3
        }
        let url = "/api/sysPetNotice/getMessage?topNumber=" + that.$store.state.sysPetMessage.limit
        service.post(url).then(function (res) {
            that.$store.state.sysPetMessage.data = res.data.data.list
            that.$store.state.sysPetMessage.unReadCount = res.data.data.unReadCount
        })
        if (status){
            that.$Loading.finish()
        }

    },
    setUserInfoAndLoginTypeToStore(that) {
        that.$store.commit("changeUserInfo", this.returnUserInfo())
        that.$store.commit("changeLoginType", this.loginType())

    },
    returnUserInfo() {
        return JSON.parse(sessionStorage.getItem("userInfo"))
    },
    isMobile(that) {
        if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
            that.$store.commit('isMobile', true)
            console.log("我是手机")
        } else {
            that.$store.commit('isMobile', false)
        }
    },
    loginType(that) {
        return !(null === sessionStorage.getItem("userInfo"))
    },

    logOut(that) {
        const _this = this
        axios.get("/api/user/logOut").then(function (res) {
            that.$Message({
                message: '已退出登录！',
                type: "success"
            })
            sessionStorage.removeItem("userInfo")
            _this.setUserInfoAndLoginTypeToStore(that)
            that.$router.push('/login')
        })
    },
    returnUrl() {
        return window.location.protocol + "//" + window.location.host
    },



}
