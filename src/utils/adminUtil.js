import axios from "axios"
import router from "../router"
export  default {
    getUserInfo(that){
        const _this = this
        if (!sessionStorage.getItem("adminUserInfo")){
            axios.get("/api/admin/adminUser/returnUserInfo").then(function (res) {
                if (res.data.data){
                    sessionStorage.setItem('adminUserInfo',JSON.stringify(res.data.data))
                    that.$store.commit("changeAdminUserInfo",_this.returnUserInfo())
                    that.$store.commit("changeAdminLoginType",true)
                }else {
                    that.router.replace("/login")

                }
            }).catch(function (res) {
            })
        }

    },
    replaceUserInfo(that){
        const _this = this
        axios.get("/api/admin/adminUser/returnUserInfo").then(function (res) {
            console.log(res)
            if (res.data.code === 100){
                sessionStorage.setItem('adminUserInfo',JSON.stringify(res.data.data))
                that.$store.commit("changeAdminUserInfo",_this.returnUserInfo())
                that.$store.commit("changeAdminLoginType",true)
                // that.reloadAdminUserInfoForm();
            } else {
                that.router.replace("/login")
            }
        }).catch(function (res) {
            console.log(res)
        })
    },
    setUserInfoAndLoginTypeToStore(that){
        that.$store.commit("changeAdminUserInfo",this.returnUserInfo())
        that.$store.commit("changeAdminLoginType",this.loginType())

    },
    returnUserInfo(){
        return JSON.parse(sessionStorage.getItem("adminUserInfo"))
    },
    loginType(that){
        return !(null === sessionStorage.getItem("adminUserInfo"))
    },
    logOut(that){
        const _this = this
        axios.get("/api/user/logOut").then(function (res) {
            that.$Message({
                message: '已退出登录！',
                type:"success"
            });
            sessionStorage.removeItem("adminUserInfo")
            _this.setUserInfoAndLoginTypeToStore(that)
            that.$router.push('/login')
        })
    }
}
