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
import CompleteInfo from "../views/PC/User/CompleteInfo"
import axios from "axios"
const Home = ()=> import("views/PC/Home")
const UserManage = ()=> import("views/PC/User/UserManage")
const PetInfo = ()=> import("views/PC/Pet/PetInfo")

const UploadInfo = ()=> import("views/PC/Pet/UploadInfo")
const PetDetail = ()=> import("views/PC/Pet/PetDetail")
import store from "../store"
import CompleteInfoAuth from "../views/PC/User/CompleteInfoAuth"
import PetHome from "../views/PC/Admin/PetAdmin/PetHome"
import MobileUser from "../views/Mobile/MobileUser"
import MobileHome from "../views/Mobile/MobileHome"
import MobilePetUploadInfo from "../views/Mobile/Pet/MobilePetUploadInfo"
import MobilePetInfo from "../views/Mobile/Pet/MobilePetInfo"
import MobilePetInfoDetail from "../views/Mobile/Pet/MobilePetInfoDetail"
import MobilePetReUploadInfo from "../views/Mobile/Pet/MobilePetReUploadInfo"
import MobilePetPrevention from "../views/Mobile/Pet/MobilePetPrevention"
import MobilePetImmunityInfo from "../views/Mobile/Pet/MobilePetImmunityInfo"
import MobilePetCardUpload from "../views/Mobile/Pet/MobilePetCardUpload"
import MobilePetCardReUpload from "../views/Mobile/Pet/MobilePetCardReUpload"
import MobileImmunityUpload from "../views/Mobile/Pet/MobileImmunityUpload"
import MobileImmunityReUpload from "../views/Mobile/Pet/MobileImmunityReUpload"
import MobileUserIndex from "../views/Mobile/User/MobileUserIndex"
import MobileUserManage from "../views/Mobile/User/MobileUserManage"
import MobileSysNotice from "../views/Mobile/User/MobileSysNotice"
import MobileBlogDetail from "../views/Mobile/Blog/MobileBlogDetail"
import MobileMyBlog from "../views/Mobile/Blog/MobileMyBlog"
import MobileMyCollection from "../views/Mobile/Blog/MobileMyCollection"
import MobileCompleteInfo from "../views/Mobile/User/MobileCompleteInfo"
import MobileCompleteInfoAuth from "../views/Mobile/User/MobileCompleteInfoAuth"
import MobileInformation from "../views/Mobile/Information/MobileInformation"
import MobileInfoDetail from "../views/Mobile/Information/MobileInfoDetail"
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
    {
        path:"/completeInfo",
        component:CompleteInfo,
        meta:{
            tittle:"完善用户信息"
        }
    },
    {
        path:"/completeInfoAuth",
        component:CompleteInfoAuth,
        meta:{
            tittle:"完善用户信息"
        }
    },
    /**
     * 用户移动端路由
     */
    {
        path:"/mobile/user",
        component:MobileUser,
        meta:{
            tittle:"主页"
        },
        children:[
            {
                path:"home",
                component:MobileHome,
                meta:{
                    tittle: "社区",
                    navBarIndex:0
                },
            },
            {
                path: "pet/upload",
                component:MobilePetUploadInfo,
                meta:{
                    tittle: "新增宠物",
                    navBarIndex:2
                },
            },
            {
                path: "pet/petInfo",
                component:MobilePetInfo,
                meta:{
                    tittle: "宠物信息管理",
                    navBarIndex:2
                },
            },

            {
                path: "pet/petPrevention",
                component:MobilePetPrevention,
                meta:{
                    tittle: "宠物防疫管理",
                    navBarIndex:2
                },
            },
            {
                path: "index",
                component:MobileUserIndex,
                meta:{
                    tittle: "个人中心",
                    navBarIndex:3
                },
            },
            {
                path: "information",
                component:MobileInformation,
                meta:{
                    tittle: "资讯",
                    navBarIndex:1
                },
            }
        ]
    },
    {
        path: "/mobile/user/pet/detail",
        component:MobilePetInfoDetail,
        meta:{
            tittle: "宠物详细信息",
            navBarIndex:-1
        },
    },

    {
        path: "/mobile/user/pet/reUpload",
        component:MobilePetReUploadInfo,
        meta:{
            tittle: "修改宠物信息",
            navBarIndex:-1
        },
    },
    {
        path: "/mobile/user/pet/petImmunity",
        component:MobilePetImmunityInfo,
        meta:{
            tittle: "宠物免疫信息",
            navBarIndex: -1
        },
    },
    {
        path: "/mobile/user/pet/uploadCard",
        component:MobilePetCardUpload,
        meta:{
            tittle: "新增免疫证书",
            navBarIndex: -1
        },
    },
    {
        path: "/mobile/user/pet/reUploadCard",
        component:MobilePetCardReUpload,
        meta:{
            tittle: "修改免疫证书",
            navBarIndex: -1
        },
    },
    {
        path: "/mobile/user/pet/uploadImmunity",
        component:MobileImmunityUpload,
        meta:{
            tittle: "新增免疫信息",
            navBarIndex: -1
        },
    },
    {
        path: "/mobile/user/pet/reUploadImmunity",
        component:MobileImmunityReUpload,
        meta:{
            tittle: "修改免疫信息",
            navBarIndex: -1
        },
    },
    {
        path: "/mobile/user/manage",
        component:MobileUserManage,
        meta:{
            tittle: "我的资料",
            navBarIndex: -1
        },
    },
    {
        path: "/mobile/user/systemNotice",
        component:MobileSysNotice,
        meta:{
            tittle: "系统通知",
            navBarIndex: -1
        },
    },
    {
        path: "/mobile/user/blog/detail",
        component:MobileBlogDetail,
        meta:{
            tittle: "帖子详情",
            navBarIndex: -1
        },
    },
    {
        path: "/mobile/user/blog/myBlog",
        component:MobileMyBlog,
        meta:{
            tittle: "我的分享",
            navBarIndex: -1
        },
    },
    {
        path: "/mobile/user/blog/myCollection",
        component:MobileMyCollection,
        meta:{
            tittle: "我的收藏",
            navBarIndex: -1
        },
    },
    {
        path: "/mobile/completeInfo",
        component:MobileCompleteInfo,
        meta:{
            tittle: "完善个人信息",
            navBarIndex: -1
        },
    },
    {
        path: "/mobile/completeInfoAuth",
        component:MobilePetInfoDetail,
        meta:{
            tittle: "宠物详情",
            navBarIndex: -1
        },
    },
    {
        path: "/mobile/user/blog/detailInfo",
        component:MobileInfoDetail,
        meta:{
            tittle: "资讯详情",
            navBarIndex: -1
        },
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
                component:PetHome,
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
const unAuthRoute = ["/login","/regist","/error","/404"]
const router = new VueRouter({
    routes,
    mode: 'history'
})
router.beforeEach((to,from,next) => {


    if (to.matched.length === 0) {    //如果未匹配到路由
        from.name ? next({ name:from.name }) : next('/404');
    }




    sessionStorage.setItem("navBarIndex",to.meta.navBarIndex)
    store.commit("changeNavBarIndex",to.meta.navBarIndex)
    if (!unAuthRoute.includes(to.path)){
        if (to.path.indexOf("/admin") !== -1){
            if (!sessionStorage.getItem("adminUserInfo")){
                adminUtil.getUserInfo(this);
            }
            document.title = to.meta.tittle
            next()
        }else{

            //判断是否是移动端访问
            let isMobile = sessionStorage.getItem('isMobile');

            if(isMobile == null){
                let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)

                isMobile = flag ? 1 : 0
                sessionStorage.setItem("isMobile", isMobile)
            }

            if (parseInt(isMobile) === 1) {
                if (to.path.indexOf("mobile") === -1) {
                    next('/mobile/user/home');
                }
            }

            //普通用户判断
            if (!sessionStorage.getItem("userInfo")){
                const that = this
                axios.get("/api/user/returnUserInfo").then(function (res) {
                    if (res.data.data) {
                        sessionStorage.setItem('userInfo', JSON.stringify(res.data.data))
                        store.commit("changeUserInfo", util.returnUserInfo())
                        store.commit("changeLoginType", true)
                        let userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
                        if(to.path.indexOf("/completeInfo") === -1) {
                            if (userInfo.accountType === 0){
                                if (userInfo.realName == null || userInfo.address === null || userInfo.phone == null || userInfo.location == null || userInfo.email == null) {
                                    if (parseInt(isMobile) === 1)
                                        router.replace("/mobile/completeInfo")
                                    else
                                        router.replace("/completeInfo")

                                }
                            } else {
                                if( userInfo.phone == null || userInfo.realName == null || userInfo.username == null || userInfo.address === null  || userInfo.phone == null  || userInfo.location == null  || userInfo.email == null  ){
                                    if (parseInt(isMobile) === 1)
                                        router.replace("/mobile/completeInfoAuth")
                                    else
                                        router.replace("/completeInfoAuth")
                                }
                            }

                        }
                        document.title = to.meta.tittle
                        next()

                    } else  {

                        router.replace("/login")

                    }
                })
            } else  {
                if (!store.state.loginType) {
                    store.commit("changeUserInfo", util.returnUserInfo())
                    store.commit("changeLoginType", true)
                }
                let userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
                if(to.path.indexOf("/completeInfo") === -1) {
                    if (userInfo.accountType === 0){
                        if( userInfo.phone == null || userInfo.realName == null || userInfo.address === null  || userInfo.phone == null  || userInfo.location == null  || userInfo.email == null  ){
                            if (parseInt(isMobile) === 1)
                                router.replace("/mobile/completeInfo")
                            else
                                router.replace("/completeInfo")
                        }
                    } else {
                        if( userInfo.phone == null || userInfo.realName == null || userInfo.name == null || userInfo.address === null  || userInfo.phone == null  || userInfo.location == null  || userInfo.email == null  ){
                            if (parseInt(isMobile) === 1)
                                router.replace("/mobile/completeInfoAuth")
                            else
                                router.replace("/completeInfoAuth")
                        }

                    }

                }
                document.title = to.meta.tittle
                next()
            }

        }

    } else {
        document.title = to.meta.tittle
        next()
    }

})
export default router
