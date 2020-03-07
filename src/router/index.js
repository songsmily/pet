import Vue from 'vue'
import VueRouter from "vue-router"

import Header from "../components/PC/Header"
import loginType from "@/utils/util"
import Login from "../components/PC/Login"
import User from "../views/PC/User/User"
import Register from "../components/PC/Register"
import AdminHome from "../views/PC/Admin/AdminHome"
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
        path:"/admin/home",
        component:AdminHome,
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
                    tittle:"主页"
                }
            },
            {
                path:"share",
                component:Share,
                meta: {
                    tittle:"分享"
                }
            },
            {
                path: "manage",
                component: UserManage,
                meta: {
                    tittle: "个人信息管理"
                }
            },
            {
                path:"pet/upload",
                component:UploadInfo,
                meta: {
                    tittle:"宠物信息上传"
                }
            },
            {
                path:"pet/petinfo",
                component:PetInfo,
                meta: {
                    tittle:"宠物信息管理"
                }
            },
            {
                path:"pet/petinfo/detail",
                component:PetDetail,
                meta: {
                    tittle:"宠物详细信息"
                },
            }

        ]
    }

]
const authRoute = ["/user/manage","/pet/upload","/pet/petinfo/detail","/pet/petinfo"]
const router = new VueRouter({
    routes,
    mode: 'history'
})
router.beforeEach((to,from,next) => {
    if (authRoute.includes(to.path)){
        if (!sessionStorage.getItem("userInfo")){
            router.push("/")
        }
    }

    document.title = to.meta.tittle
    next()
})
export default router
