export default  {
    isShowLogRegDialog:false,//登录注册栏显示的标志变量
    isShowUserInfoDialog:false,
    isShowNavBarInMobile:false,
    isShowNavInfoInMobile:false,
    isMobile:false,//判断是否移动端
    loginType:false,//普通用户登录状态
    isShowUserSecret:false,//是否显示普通用户密码修改
    isShowAdminSecret:false,//是否显示普通用户密码修改
    /**
     * 普通用户信息
     */
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

    },
    sysPetMessage:{
        limit:0,
        data:[],
        unReadCount:0
    },
    adminLoginType:false,//管理员用户登录状态
    /**
     * 管理员用户信息
     */
    adminUserInfo:{
        username:"",
        accountType: "",
        realName:"",
        phone:"",
        status:""
    },

    /**
     * 热门标签信息
     */
    hotTags:[],
    hotTagChoice:{},
    navBarIndex: 0
}
