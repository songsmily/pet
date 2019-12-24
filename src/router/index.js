import Vue from 'vue'
import VueRouter from "vue-router"
import Header from "../components/PC/Header"
import loginType from "@/utils/util"
const Home = ()=> import("views/PC/Home")
const Share = ()=> import("views/PC/Share")
const UserManage = ()=> import("views/PC/User/UserManage")
const PetInfo = ()=> import("views/PC/Pet/PetInfo")

const UploadInfo = ()=> import("views/PC/Pet/UploadInfo")
Vue.use(VueRouter)

const routes = [
    {
        path:"/",
        redirect:"/home"
    },
    {
        path:"/home",
        component:Home,
        meta:{
            tittle:"发现"
        }
    },
    {
        path:"/share",
        component:Share,
        meta: {
            tittle:"分享"
        }
    },
    {
        path:"/user/manage",
        component:UserManage,
        meta: {
            tittle:"个人信息管理"
        }
    },
    {
        path:"/pet/upload",
        component:UploadInfo,
        meta: {
            tittle:"宠物信息上传"
        }
    },
    {
        path:"/pet/petinfo",
        component:PetInfo,
        meta: {
            tittle:"宠物信息管理"
        }
    }
]
const router = new VueRouter({
    routes,
    mode: 'history'
})
router.beforeEach((to,from,next) => {
    // this.$uti
    // if (sessionStorage.getItem("loginType")){
    //     console.log(sessionStorage.getItem("loginType"))
    //
    // }else{
    //     console.log("设置sessionstorage")
    //     sessionStorage.setItem("loginType",true);
    // }
    document.title = to.meta.tittle
    next()
})
export default router
