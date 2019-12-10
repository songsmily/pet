<template>
    <div id="app" class="app app-aside-fixed container app-header-fixed ">
        <header-bar></header-bar>
        <nav-bar></nav-bar>
        <router-view></router-view>
        <el-dialog v-if="!this.$store.state.isMobile" :visible.sync="$store.state.isShowLogRegDialog" width="40%">
            <log-reg-p-c></log-reg-p-c>
        </el-dialog>
        <el-dialog v-else :visible.sync="$store.state.isShowLogRegDialog" width="330px" >
            <log-reg-p-c></log-reg-p-c>
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
    export default {
        name: 'app',
        components: {
            HeaderBar,
            NavBar,
            LogRegPC,
            LogRegMobile
        },
        data() {
            return {
                centerDialogVisible: false,
                fullHeight: document.documentElement.clientHeight
            }
        },
        created:function(){
            this.isMobile()
        },
        methods: {
            test: function () {

                //     this.$layer.iframe({
                //       content: {
                //         content: Login, //传递的组件对象
                //         parent: this,//当前的vue对象
                //         data:{}//props
                //       },
                //       offset:["100px",'100px'],
                //       area:['800px','600px'],
                //       title: false,
                // // cancel:()=>{//关闭事件
                // //   alert('关闭iframe');
                // // }
                //   });
            },
            isMobile:function () {
                if( navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i) ){
                    this.$store.state.isMobile = true
                }else{
                    this.$store.state.isMobile = false
                }
            }
        },
        mounted() {
            var _this = this;
            window.onresize = function(){ // 定义窗口大小变更通知事件
                console.log("窗口大小变了")
                _this.isMobile()
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

    @import "~vue-layer/lib/vue-layer.css";
    @import "~at-ui-style";
    /*@import "~semantic-ui/dist/semantic.min.css";*/
    @import "~assets/libs/font-awesome-4.7.0 2/css/font-awesome.min.css";
    @import "~assets/css/base.css";


</style>

