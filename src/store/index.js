import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        isShowLogRegDialog:false,//登录注册栏显示的标志变量
        isShowUserInfoDialog:false,
        isShowNavBarInMobile:false,
        isShowNavInfoInMobile:false,
        isMobile:false,
        loginType:false,
        isShowUserSecret:false,
        userInfo:{
            accountId:'',
            accountType:'',
            id:'',
            avatarUrl:'',
            realName:'',
            bio:'',
            name:'',
            email:'',
            location:'',
            address:'',
            phone:''

        }
    },

    mutations: {
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
            console.log("进入user赋值")
            state.userInfo  = user
        },
        changeLoginType(state,type){
            console.log("进入user logintype赋值")

            state.loginType = type
        }

    },
    actions: {

    },
    getters: {

    },
    modules: {

    }
})
export default store
