export default {
    changeisMobile(state){
        state.isMobile = ! state.isMobile
    },
    changeisShowLogRegDialog(state){
        state.isShowLogRegDialog = ! state.isShowLogRegDialog
    },
    changeisShowUserInfoDialog(state){

        state.isShowUserInfoDialog = ! state.isShowUserInfoDialog
    },
    changeisShowNavBarInMobile(state){
        state.isShowNavBarInMobile = ! state.isShowNavBarInMobile
    },
    changeisShowNavInfoInMobile(state){
        state.isShowNavInfoInMobile = ! state.isShowNavInfoInMobile
    },
    isMobile(state,val){
        state.isMobile = val
    },
    changeUserInfo(state,user){
        state.userInfo  = user
    },
    changeLoginType(state,type){

        state.loginType = type
    }

}
