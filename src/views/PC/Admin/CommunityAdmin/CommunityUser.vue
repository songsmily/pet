<template>
    <div  class="app app-aside-fixed container app-header-fixed ">
        <header-bar></header-bar>
        <community-nav-bar></community-nav-bar>
        <div id="content" class="app-content">
            <a class="off-screen-toggle hide"></a>
            <main class="app-content-body " style="height: 100vh">
                <div class="hbox hbox-auto-xs hbox-auto-sm">
                    <router-view></router-view>
                    <!--首页右侧栏-->
<!--                    <right-aside-bar></right-aside-bar>-->
                </div>
            </main>
        </div>

        <el-dialog  v-if="!this.$store.state.isMobile" width="30%" title="账户密码修改" :visible.sync="$store.state.isShowAdminSecret">
            <admin-secret></admin-secret>
        </el-dialog>
        <el-dialog v-else  width="100%" title="账户密码设置" :visible.sync="$store.state.isShowAdminSecret">
            <admin-secret></admin-secret>
        </el-dialog>



    </div>
</template>

<script>

    import Swal from "sweetalert2"
     import "assets/js/core"
    import axios from "axios"
    import RightAsideBar from "components/PC/Admin/AdminRightAsideBar"
    import HeaderBar from "components/PC/Admin/AdminHeader"
    import CommunityNavBar from "components/PC/Admin/CommunityNavBar"
    import AdminSecret from "../AdminSecret"

    export default {
        name: 'CommunityUser',
        components: {
            HeaderBar,
            CommunityNavBar,
            AdminSecret,
            RightAsideBar
        },
        data() {
            return {
                centerDialogVisible: false,
                fullHeight: document.documentElement.clientHeight
            }
        },
        created:function(){
            if (!this.$adminUtil.loginType(this)){
                this.$adminUtil.getUserInfo(this)
            }
            if (this.$adminUtil.loginType(this)){
                this.$adminUtil.setUserInfoAndLoginTypeToStore(this)
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

