import Vue from 'vue'
import VueRouter from "vue-router"

import Header from "../components/PC/Header"
import loginType from "@/utils/util"
import Login from "../components/PC/Login"
import User from "../views/PC/User/User"
import Register from "../components/PC/Register"
import AdminUser from "../views/PC/Admin/AdminUser"
import constant from "vue-amap/src/lib/utils/constant"
import AdminHome from "../views/PC/Admin/AdminHome"
import PetCheck from "../views/PC/Admin/PetAdmin/PetCheck"
import PetReview from "../views/PC/Admin/PetAdmin/PetReview"
import ReUploadInfo from "../views/PC/Pet/ReUploadInfo"
import PetPrevention from "../views/PC/Pet/PetPrevention"
import SystemNotice from "../views/PC/User/Notice/SystemNotice"
import PetUploadCard from "../views/PC/Pet/PetUploadCard"
import PetUploadImmunity from "../views/PC/Pet/PetUploadImmunity"
import PetCardCheck from "../views/PC/Admin/PetAdmin/PetCardCheck"
import PetReUploadCard from "../views/PC/Pet/PetReUploadCard"
const Home = ()=> import("views/PC/Home")
const Share = ()=> import("views/PC/Share")
const UserManage = ()=> import("views/PC/User/UserManage")
const PetInfo = ()=> import("views/PC/Pet/PetInfo")

const UploadInfo = ()=> import("views/PC/Pet/UploadInfo")
const PetDetail = ()=> import("views/PC/Pet/PetDetail")
Vue.use(VueRouter)

const routes = [
  {
        path:"/",
        redirect:"/login"
    },

    {
        path:"/login",
        component:Login,
        meta:{
            tittle:"登录"
        }
    },
    {
        path:"/regist",
        component:Register,
        meta:{
            tittle:"注册"
        }
    },
    {
        path:"/admin",
        component:AdminUser,
        meta:{
            tittle:"管理员首页"
        },
        children:[
            {
                path:"/",
                redirect:"home"
            },
            {
                path:"home",
                component:AdminHome,
                meta:{
                    tittle:"管理员首页",
                    navBarIndex:"1"
                }
            },
            {
                path:"petCheck",
                component:PetCheck,
                meta:{
                    tittle: "宠物审核",
                    navBarIndex:"1-1"

                }
            },
            {
                path:"petCardCheck",
                component:PetCardCheck,
                meta:{
                    tittle:"免疫证书审核",
                    navBarIndex:"1-2"

                }
            }, {
                path:"petCardCheck",
                component:PetCardCheck,
                meta:{
                    tittle:"免疫证书审核",
                    navBarIndex:"1-3"

                }
            },
            {
                path:"petReview",
                component:PetReview,
                meta:{
                    tittle:"宠物详细信息"
                }
            }

        ]
    },
    {
        path:"/user",
        component:User,
        meta:{
            tittle:"用户主页"
        },
        children:[
            {
                path:"home",
                component:Home,
                meta:{
                    tittle:"主页",
                    navBarIndex:"1"
                }
            },
            {
                path:"share",
                component:Share,
                meta: {
                    tittle:"分享",
                    navBarIndex:"2"

                }
            },
            {
                path: "manage",
                component: UserManage,
                meta: {
                    tittle: "个人信息管理",
                    navBarIndex:"1-2"
                }
            },
            {
                path:"pet/upload",
                component:UploadInfo,
                meta: {
                    tittle:"宠物信息上传",
                    navBarIndex:"2-1"

                }
            },
            {
                path:"pet/petinfo",
                component:PetInfo,
                meta: {
                    tittle:"宠物信息管理",
                    navBarIndex:"2-2"

                }
            },
            {
                path:"pet/petinfo/detail",
                component:PetDetail,
                meta: {
                    tittle:"宠物详细信息",
                    navBarIndex:"2-2"

                },
            },
            {
                path:"pet/petinfo/reUpload",
                name:"reUploadPetInfo",
                component:ReUploadInfo,
                meta:{
                    tittle:"宠物信息上传",
                    navBarIndex:"2-2"

                }
            },
            {
                path:"pet/petPrevention",
                component:PetPrevention,
                meta:{
                    tittle:"宠物防疫管理",
                    navBarIndex:"2-3"

                }
            },
            {
                path:"pet/uploadCard",
                component:PetUploadCard,
                meta:{
                    tittle:"免疫证书上传",
                    navBarIndex:"2-3"
                }
            },
            {
                path:"pet/reUploadCard",
                component:PetReUploadCard,
                meta:{
                    tittle:"免疫证书修改",
                    navBarIndex:"2-3"
                }
            },
            {
                path:"pet/uploadImmunity",
                component:PetUploadImmunity,
                meta:{
                    tittle:"免疫信息上传",
                    navBarIndex:"2-3"
                }
            },
            {
                path:"notice/system",
                component:SystemNotice,
                meta:{
                    tittle:"系统通知",
                    navBarIndex:"3-1"

                }
            }

        ]
    }

]
// const unAuthRoute = ["/user/manage","/pet/upload","/pet/petinfo/detail","/pet/petinfo","/admin/home"]
const unAuthRoute = ["/login"]
const router = new VueRouter({
    routes,
    mode: 'history'
})
router.beforeEach((to,from,next) => {
    // var arr = [];
    // while (arr.length < 5){
    //     let num = Math.floor(Math.random() * 20 + 1)
    //     if(!arr.includes(num)){
    //         arr.push(num)
    //     }
    // }
    // alert(arr.sort())
    sessionStorage.setItem("navBarIndex",to.meta.navBarIndex)
    if (!unAuthRoute.includes(to.path)){
        if (to.path.indexOf("/admin") !== -1){
            if (!sessionStorage.getItem("adminUserInfo")){
                router.replace("/login")
            }
        }else{
            if (!sessionStorage.getItem("userInfo")){
                router.replace("/login")
            }
        }

    }

    document.title = to.meta.tittle
    next()
})
export default router
