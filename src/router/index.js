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
import PetDetailImmunity from "../views/PC/Pet/PetDetailImmunity"
import PetUpdateImmunity from "../views/PC/Pet/PetUpdateImmunity"
import PetImmunityCheck from "../views/PC/Admin/PetAdmin/PetImmunityCheck"
import PetInfoList from "../views/PC/Admin/PetAdmin/PetInfoList"
import PetCancel from "../views/PC/Pet/PetCancel"
import adminService from "../network/adminAxios"
import adminUtil from "../utils/adminUtil"
import util from "../utils/util"
import AddBlog from "../views/PC/Blog/AddBlog"
import BlogDetail from "../views/PC/Blog/BlogDetail"
import HotTagBlog from "../views/PC/Blog/HotTagBlog"
import MyBlog from "../views/PC/Blog/MyBlog"
import Question from "../views/PC/Blog/Question"
import MyCollection from "../views/PC/Blog/MyCollection"
import CommunityUser from "../views/PC/Admin/CommunityAdmin/CommunityUser"
import CommunityHome from "../views/PC/Admin/CommunityAdmin/CommunityHome"
import CheckBlog from "../views/PC/Admin/CommunityAdmin/CheckBlog"
import CheckComment from "../views/PC/Admin/CommunityAdmin/CheckComment"
import AddNews from "../views/PC/Admin/CommunityAdmin/AddNews"
import Information from "../views/PC/Blog/Information"
import InformationDetail from "../views/PC/Blog/InformationDetail"
import CommunityInformation from "../views/PC/Admin/CommunityAdmin/CommunityInformation"
import CommunityInformationDetail from "../views/PC/Admin/CommunityAdmin/CommunityInformationDetail"
import AdminManage from "../views/PC/Admin/AdminManage"
import Error from "../views/PC/Error"
import Error404 from "../views/PC/Error404"
import SystemUser from "../views/PC/Admin/SystemAdmin/SystemUser"
import SystemHome from "../views/PC/Admin/SystemAdmin/SystemHome"
import UserList from "../views/PC/Admin/SystemAdmin/UserList"
import CommunityAdminList from "../views/PC/Admin/SystemAdmin/CommunityAdminList"
import PetAdminList from "../views/PC/Admin/SystemAdmin/PetAdminList"
import LogList from "../views/PC/Admin/SystemAdmin/LogList"
const Home = ()=> import("views/PC/Home")
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
        path:"/error",
        component:Error,
        meta:{
            tittle:"出错啦"
        }
    },
    {
        path:"/404",
        component:Error404,
        meta:{
            tittle:"出错啦"
        }
    },

    /**
     * 系统管理员路由
     */
    {
        path:"/admin/system",
        component:SystemUser,
        meta:{
            tittle:"系统管理员首页"
        },
        children:[
            {
                path:"home",
                component:SystemHome,
                meta:{
                    tittle:"系统管理员首页",
                    navBarIndex:"1"
                }
            },
            {
                path:"adminManage",
                component:AdminManage,
                meta:{
                    tittle:"个人信息管理",
                    navBarIndex:"3-2"
                }
            },
            {
                path:"user/user",
                component:UserList,
                meta:{
                    tittle:"社区用户管理",
                    navBarIndex:"1-1"
                }
            },
            {
                path:"user/communityAdmin",
                component:CommunityAdminList,
                meta:{
                    tittle:"社区管理员用户",
                    navBarIndex:"1-2"
                }
            },
            {
                path:"user/petAdmin",
                component:PetAdminList,
                meta:{
                    tittle:"宠物管理员用户",
                    navBarIndex:"1-3"
                }
            },
            {
                path:"log",
                component:LogList,
                meta:{
                    tittle:"系统日志",
                    navBarIndex:"2-1"
                }
            },


        ]
    },

    /**
     * 社区管理员路由
     */
    {
        path:"/admin/community",
        component:CommunityUser,
        meta:{
            tittle:"社区管理员首页"
        },
        children:[
            {
                path:"home",
                component:CommunityHome,
                meta:{
                    tittle:"社区管理员首页",
                    navBarIndex:"1"
                }
            },
            {
                path:"adminManage",
                component:AdminManage,
                meta:{
                    tittle:"个人信息管理",
                    navBarIndex:"3-2"
                }
            },
            {
                path:"checkBlog",
                component:CheckBlog,
                meta:{
                    tittle:"帖子内容审核",
                    navBarIndex:"1-1"
                }
            },
            {
                path:"checkComment",
                component:CheckComment,
                meta:{
                    tittle:"评论内容审核",
                    navBarIndex:"1-2"
                }
            },
            {
                path:"addNews",
                component:AddNews,
                meta:{
                    tittle:"新增宠物资讯",
                    navBarIndex:"2-1"
                }
            },
            {
                path:"listInfo",
                component:CommunityInformation,
                meta:{
                    tittle:"宠物资讯管理",
                    navBarIndex:"2-2"
                }
            },
            {
                path:"detailInfo/:id",
                component:CommunityInformationDetail,
                meta:{
                    tittle:"宠物资讯管理",
                    navBarIndex:"2-2"
                }
            }
        ]
    },
    /**
     * 宠物管理员路由
     */
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
                path:"adminManage",
                component:AdminManage,
                meta:{
                    tittle:"个人信息管理",
                    navBarIndex:"3-2"
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
            },
            {
                path:"petImmunityCheck",
                component:PetImmunityCheck,
                meta:{
                    tittle:"免疫信息审核",
                    navBarIndex:"1-3"

                }
            },
            {
               path:"petInfoList",
               component:PetInfoList,
               meta:{
                   tittle:"宠物信息",
                   navBarIndex:"2-1"
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
    /**
     * 用户社区路由
     */
    {
        path:"/user/blog",
        component:User,
        meta:{
            tittle:"用户主页"
        },
        children:[
            {
                path:"add",
                component:AddBlog,
                meta:{
                    tittle:"发表新帖",
                    navBarIndex:"1"
                }
            },
            {
                path:"detail/:id",
                component:BlogDetail,
                meta:{
                    tittle:"帖子详情",
                    navBarIndex:"1"
                }
            },
            {
                path:"hotTag/:hotTagId",
                component:HotTagBlog,
                meta:{
                    tittle:"热门标签",
                    navBarIndex:"1"
                }
            },
            {
                path:"myBlog",
                component:MyBlog,
                meta:{
                    tittle:"我的帖子",
                    navBarIndex:"1"
                }
            },

            {
                path:"question",
                component:Question,
                meta:{
                    tittle:"提问",
                    navBarIndex:"1"
                }
            },
            {
                path:"myCollection",
                component:MyCollection,
                meta:{
                    tittle:"我的收藏",
                    navBarIndex:"1"
                }
            },
            {
                path:"information",
                component:Information,
                meta:{
                    tittle:"宠物资讯",
                    navBarIndex:"2"
                }
            },
            {
                path:"detailInfo/:id",
                component:InformationDetail,
                meta:{
                    tittle:"资讯详情",
                    navBarIndex:"1"
                }
            },
        ]
    },
    /**
     * 用户路由
     */
    {
        path:"/user",
        component:User,
        meta:{
            tittle:"用户主页"
        },
        children:[
            {
                path:"errorPage",
                component:Error,
                meta:{
                    tittle:"出错了！"
                }
            },
            {
                path:"home",
                component:Home,
                meta:{
                    tittle:"主页",
                    navBarIndex:"1"
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
                path:"pet/cancelPet",
                component:PetCancel,
                meta: {
                    tittle:"宠物信息注销",
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
                path:"pet/detailImmunity",
                component:PetDetailImmunity,
                meta:{
                    tittle:"免疫信息详情",
                    navBarIndex:"2-3"
                }
            },
            {
                path:"pet/updateImmunity",
                component:PetUpdateImmunity,
                meta:{
                    tittle:"免疫信息编辑",
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
    if (to.matched.length === 0) {    //如果未匹配到路由
        from.name ? next({ name:from.name }) : next('/404');
    }
    sessionStorage.setItem("navBarIndex",to.meta.navBarIndex)
    if (!unAuthRoute.includes(to.path)){
        if (to.path.indexOf("/admin") !== -1){
            if (!sessionStorage.getItem("adminUserInfo")){
                adminUtil.getUserInfo(this);
            }
        }else{
            if (!sessionStorage.getItem("userInfo")){
                util.getUserInfo(this)
            }
        }

    }

    document.title = to.meta.tittle
    next()
})
export default router
