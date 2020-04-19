<template>
    <header id="header" class="app-header navbar" role="menu">

        <!-- navbar header（交集处） -->
        <div class="text-ellipsis navbar-header bg-black">
            <button @click="$store.commit('changeisShowNavInfoInMobile')" class="pull-right visible-xs dk" ui-toggle-class="show animated animated-lento fadeIn" target=".navbar-collapse"> <i class="fontello fontello-gear text-lg"></i>

            </button>
            <button @click="$store.commit('changeisShowNavBarInMobile')" class="pull-left visible-xs" ui-toggle-class="off-screen animated" target=".app-aside" ui-scroll="app"> <i class="fontello fontello-menu text-lg"></i>

            </button>
            <!-- brand -->
            <a href="index.html" class="navbar-brand text-lt"> <i class="iconfont icon-bokeyuan"></i>
                <span class="hidden-folded m-l-xs">宠物之家</span>

            </a>
            <!-- / brand -->
        </div>
        <!-- / navbar header -->
        <div class=""></div>
        <!-- navbar collapse（顶部导航栏） -->
        <div class="collapse pos-rlt navbar-collapse box-shadow bg-black" :class="{'show animated animated-lento fadeIn':$store.state.isShowNavInfoInMobile}">

            <!-- / search form -->
            <ul class="nav navbar-nav navbar-right">
                <li class="music-box hidden-xs hidden-sm">
                    <sk-player v-bind:listShowPos="listShowPos"></sk-player>
                </li>
                <li class="dropdown " @click="listShowPos = !listShowPos">
                    <a class="skPlayer-list-switch dropdown-toggle"><i>
                        <svg t="1576481655411" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="17966" width="20" height="20"><path d="M823.751111 519.964444h-26.168889v-59.164444c0-153.6-125.155556-277.617778-277.617778-277.617778h-25.031111c-153.6 0-277.617778 125.155556-277.617777 277.617778v46.648889h-26.168889v-46.648889c0-167.253333 136.533333-303.786667 303.786666-303.786667h25.031111c167.253333 0 303.786667 136.533333 303.786667 303.786667v59.164444z" fill="#cdcdcd" p-id="17967"></path><path d="M230.968889 871.537778c-51.2 0-93.297778-42.097778-93.297778-93.297778V592.782222c0-51.2 42.097778-93.297778 93.297778-93.297778s93.297778 42.097778 93.297778 93.297778v186.595556c-1.137778 51.2-42.097778 92.16-93.297778 92.16z m0-345.884445c-36.408889 0-67.128889 29.582222-67.128889 67.128889v186.595556c0 36.408889 29.582222 67.128889 67.128889 67.128889 36.408889 0 67.128889-29.582222 67.128889-67.128889V592.782222c0-37.546667-30.72-67.128889-67.128889-67.128889zM778.24 871.537778c-51.2 0-93.297778-42.097778-93.297778-93.297778V592.782222c0-51.2 42.097778-93.297778 93.297778-93.297778s93.297778 42.097778 93.297778 93.297778v186.595556c0 51.2-42.097778 92.16-93.297778 92.16z m0-345.884445c-36.408889 0-67.128889 29.582222-67.128889 67.128889v186.595556c0 36.408889 29.582222 67.128889 67.128889 67.128889 36.408889 0 67.128889-29.582222 67.128889-67.128889V592.782222c0-37.546667-29.582222-67.128889-67.128889-67.128889z" fill="#cdcdcd" p-id="17968"></path><path d="M845.368889 780.515556V593.92l13.653333 1.137778c48.924444 3.413333 87.608889 44.373333 86.471111 94.435555-1.137778 47.786667-38.684444 87.608889-86.471111 91.022223h-13.653333z m26.168889-157.013334v128.568889c27.306667-7.964444 47.786667-32.995556 48.924444-62.577778 0-31.857778-20.48-58.026667-48.924444-65.991111zM162.702222 779.377778l-13.653333-1.137778c-48.924444-3.413333-87.608889-45.511111-86.471111-94.435556 1.137778-47.786667 38.684444-87.608889 86.471111-91.022222l13.653333-1.137778v187.733334z m-25.031111-158.151111c-27.306667 7.964444-47.786667 32.995556-48.924444 62.577777-1.137778 30.72 19.342222 56.888889 47.786666 65.991112l1.137778-128.568889z" fill="#cdcdcd" p-id="17969"></path></svg>
                    </i><span class="visible-xs-inline"></span>
                    </a>
                </li>
                <!--登录管理-->
                <li class="dropdown" id="easyLogin">
                    <a v-if="!this.$store.state.loginType"  data-toggle="dropdown" @click="$store.state.isShowLogRegDialog = true" class="dropdown-toggle clear">
                        <span>
                        <svg t="1576481995007" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="19698" width="20" height="20"><path d="M817.790704 887.369168H511.725232a7.533974 7.533974 0 1 1 0-15.067948h306.065472c30.056124 0 54.510517-24.454393 54.510516-54.510516v-611.581408c0-30.056124-24.454393-54.510517-54.510516-54.510516h-305.790704a7.533974 7.533974 0 1 1 0-15.067948h305.790704c38.370086 0 69.578464 31.217242 69.578464 69.578464v611.572544c0 38.370086-31.217242 69.587328-69.578464 69.587328z" fill="#cdcdcd" p-id="19699"></path><path d="M517.326963 834.392037c-9.413036 0-18.959024-1.94997-28.115018-5.938544-25.775054-11.230053-41.791396-35.675582-41.791396-63.7906v-79.053545c0-30.056124-24.454393-54.510517-54.510517-54.510517H206.209296c-38.370086 0-69.578464-31.217242-69.578464-69.578464V458.960824c0-38.370086 31.217242-69.578464 69.578464-69.578464h186.700736c30.056124 0 54.510517-24.454393 54.510517-54.510517v-54.900511c0-27.574344 15.582031-51.824877 40.665732-63.28538 25.083701-11.460504 53.615303-7.365567 74.462252 10.680516l269.937851 233.677278c14.917268 12.914118 23.674405 31.64269 24.028945 51.372838 0.35454 19.730148-7.737834 38.751216-22.185337 52.197144L564.383277 815.610283c-13.277521 12.346854-29.967489 18.781754-47.056314 18.781754zM206.209296 404.450307c-30.056124 0-54.510517 24.454393-54.510516 54.510517v102.559543c0 30.056124 24.454393 54.510517 54.510516 54.510517h186.700736c38.370086 0 69.578464 31.217242 69.578464 69.578464v79.053545c0 22.025794 12.541851 41.170951 32.732901 49.972405 20.19105 8.792591 42.757518 4.945832 58.889085-10.051207l269.937852-251.005419a54.592061 54.592061 0 0 0 17.381321-40.887319 54.554834 54.554834 0 0 0-18.826072-40.240284L552.674595 238.764927c-16.335428-14.13728-38.680308-17.345867-58.330684-8.367143s-31.855414 27.973202-31.855415 49.573548v54.900511c0 38.370086-31.217242 69.578464-69.578464 69.578464H206.209296z" fill="#cdcdcd" p-id="19700"></path></svg>
                        </span>
                        <!--下三角符号-->
                    </a>
<!--                    <a v-else @click="$store.commit('changeisShowUserInfoDialog')">-->
                    <tooltip v-else placement="bottom" content="退出登录">
                    <a  @click="logOut">
                         <span>
<svg t="1576500513143" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="24612" width="20" height="20"><path d="M991.25 515.938c0.281-1.312 0.75-2.531 0.75-3.844s-0.469-2.625-0.75-3.844c-0.281-1.406-0.281-2.906-0.844-4.312-0.469-1.219-1.5-2.25-2.25-3.469-0.844-1.219-1.406-2.625-2.438-3.75l-130.219-130.969c-8.531-8.531-22.313-8.625-30.844-0.094-8.531 8.531-8.625 22.313-0.094 30.844l93.187 93.75h-340.313c-12.094 0-21.844 9.75-21.844 21.844s9.75 21.844 21.844 21.844h340.219l-93.188 93.75c-8.531 8.531-8.438 22.313 0.094 30.844 4.219 4.219 9.844 6.375 15.375 6.375 5.625 0 11.25-2.156 15.469-6.469l130.219-130.875c1.125-1.125 1.688-2.438 2.438-3.75 0.75-1.125 1.781-2.156 2.25-3.469 0.656-1.5 0.656-3 0.938-4.406zM250.156 577.438c-36.094 0-65.438-29.344-65.438-65.438s29.344-65.438 65.438-65.438 65.438 29.344 65.438 65.438-29.344 65.438-65.438 65.438zM250.156 490.156c-12 0-21.844 9.75-21.844 21.844 0 12 9.75 21.844 21.844 21.844 12 0 21.844-9.75 21.844-21.844 0-12-9.75-21.844-21.844-21.844z" fill="#cdcdcd" p-id="24613"></path><path d="M773.844 446.562v-327.281c0-24.094-19.5-43.594-43.594-43.594h-305.531c0-24.094-19.5-43.594-43.594-43.594l-349.125 87.188v785.438l349.125 87.281c24.094 0 43.594-19.5 43.594-43.594h305.438c24.094 0 43.594-19.5 43.594-43.594v-327.375h-43.594v327.281h-305.438v-785.438h305.438v327.281h43.688zM75.594 870.688v-717.375l305.531-76.313v870l-305.531-76.313z" fill="#cdcdcd" p-id="24614"></path></svg>                         </span>

                    </a>
                    </tooltip>
                    <div class="dropdown-menu w-lg wrapper bg-white animated fadeIn" aria-labelledby="navbar-login-dropdown">
                        <form id="Login_form" action="index.html" method="post">
                            <div class="form-group">
                                <label for="navbar-login-user">用户名</label>
                                <input type="text" name="name" id="navbar-login-user" class="form-control" placeholder="用户名或电子邮箱">
                            </div>
                            <div class="form-group">
                                <label for="navbar-login-password">密码</label>
                                <input type="password" name="password" id="navbar-login-password" class="form-control" placeholder="密码">
                            </div>
                            <button type="submit" id="login-submit" name="submitLogin" class="btn btn-block btn-primary"> <span>登录</span>
                                <span class="text-active">登录中...</span>
                                <span class="banLogin_text">刷新页面后登录</span>
                                <i class="animate-spin  fontello fontello-spinner hide" id="spin-login"></i>
                                <i class="animate-spin fontello fontello-refresh hide" id="ban-login"></i>

                            </button>
                            <input type="hidden" name="referer" value="http://jijianblog.com" data-current-url="value">
                        </form>
                    </div>
                </li>
                <!--/登录管理-->
            </ul>
        </div>
        <!-- / navbar collapse -->
    </header>


</template>
<script>
    import axios from "axios"
    import SkPlayer from "./SkPlayer"
    import {Tooltip,Badge,Dropdown,DropdownItem,DropdownMenu} from "element-ui"

    export default {
        name: "Header",
        data(){
            return {
                listShowPos:false,
            }
        },
        components:{
            SkPlayer,
            Tooltip,
            ElBadge:Badge,
            ElDropdown:Dropdown,
            ElDropdownItem:DropdownItem,
            ElDropdownMenu:DropdownMenu
        },
        computed:{
            loginType:function () {
                return this.$util.loginType()
            }
        },
        methods:{
            logOut:function () {
                this.$util.logOut(this)
            }
        }
    }
</script>
<style scoped>
</style>
