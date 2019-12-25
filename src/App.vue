<template>
    <div id="app" class="app app-aside-fixed container app-header-fixed ">
        <header-bar></header-bar>
        <nav-bar></nav-bar>
        <div id="content" class="app-content">

            <a class="off-screen-toggle hide"></a>
            <main class="app-content-body ">
                <div class="hbox hbox-auto-xs hbox-auto-sm">
                    <router-view></router-view>
                    <!--首页右侧栏-->
                    <right-aside-bar></right-aside-bar>
                </div>
            </main>
        </div>

        <el-dialog v-if="!this.$store.state.isMobile" :visible.sync="$store.state.isShowLogRegDialog" width="40%">
            <log-reg-p-c></log-reg-p-c>
        </el-dialog>
        <el-dialog v-else :visible.sync="$store.state.isShowLogRegDialog" width="330px" >
            <log-reg-p-c></log-reg-p-c>
        </el-dialog>
        <el-dialog v-if="!this.$store.state.isMobile" :visible.sync="$store.state.isShowUserInfoDialog" width="40%">
            <user-info-pc></user-info-pc>
        </el-dialog>
        <el-dialog v-else :visible.sync="$store.state.isShowUserInfoDialog" width="330px" >
            <log-reg-p-c></log-reg-p-c>
        </el-dialog>
        <el-dialog  v-if="!this.$store.state.isMobile" width="30%" title="账户密码修改" :visible.sync="$store.state.isShowUserSecret">
            <user-secret></user-secret>
        </el-dialog>
        <el-dialog v-else  width="100%" title="账户密码设置" :visible.sync="$store.state.isShowUserSecret">
            <user-secret></user-secret>
        </el-dialog>



    </div>
</template>

<script>
    import HeaderBar from "./components/PC/Header"
    import NavBar from "./components/PC/NavBar"
    import Swal from "sweetalert2"
    import Login from "./components/PC/Login"
    import LogRegPC from "./components/PC/LogReg"
    import LogRegMobile from "./components/Mobile/LogReg"
    import $ from "assets/libs/jquery/jquery.min"
    import "assets/js/core"
    import axios from "axios"
    import UserInfo from "./components/PC/UserInfo"
    import UserSecret from "views/PC/User/UserSecret"
    import RightAsideBar from "components/PC/RightAsideBar"

    export default {
        name: 'app',
        components: {
            HeaderBar,
            NavBar,
            LogRegPC,
            LogRegMobile,
            UserInfoPc:UserInfo,
            UserSecret,
            RightAsideBar
        },
        data() {
            return {
                centerDialogVisible: false,
                fullHeight: document.documentElement.clientHeight
            }
        },
        created:function(){
            if (!this.$util.loginType(this)){
                this.$util.getUserInfo(this)
            }
            if (this.$util.loginType(this)){
                this.$util.setUserInfoAndLoginTypeToStore(this)
            }
            this.$util.isMobile(this)
        },
        methods: {
        },
        mounted() {
            const _this = this;
            window.onresize = function(){ // 定义窗口大小变更通知事件
                console.log("窗口大小变了")
                _this.$util.isMobile(_this);
            };
        }
    }

</script>

<style>
    /*
TabBar样式重写
 */
    .at-tabs-nav{
        width: 100%;
        display: flex;
        text-align: center;
    }
    .at-tabs-nav >div{
        flex: 1;
    }

    .at-input__original{
        font-size: 14px;
        color: #606266;
    }

    @import "~vue-layer/lib/vue-layer.css";
    @import "~at-ui-style";
    /*@import "~semantic-ui/dist/semantic.min.css";*/
    /*@import "~assets/libs/font-awesome-4.7.0 2/css/font-awesome.min.css";*/
    @import "~assets/css/base.css";


</style>

