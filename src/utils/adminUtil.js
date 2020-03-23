import axios from "axios"
export  default {
    getUserInfo(that){
        const _this = this
        if (!sessionStorage.getItem("adminUserInfo")){
            axios.get("/api/admin/adminUser/returnUserInfo").then(function (res) {
                console.log(res)
                if (res.data.data){
                    sessionStorage.setItem('adminUserInfo',JSON.stringify(res.data.data))
                    that.$store.commit("changeAdminUserInfo",_this.returnUserInfo())
                    that.$store.commit("changeAdminLoginType",true)
                }
            }).catch(function (res) {
                console.log(res)
            })
        }

    },
    replaceUserInfo(that){
        const _this = this
        axios.get("/api/admin/adminUser/returnUserInfo").then(function (res) {
            console.log(res)
            if (res.data.data){
                sessionStorage.setItem('adminUserInfo',JSON.stringify(res.data.data))
                that.$store.commit("changeAdminUserInfo",_this.returnUserInfo())
                that.$store.commit("changeAdminLoginType",true)
                // that.reloadAdminUserInfoForm();
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
