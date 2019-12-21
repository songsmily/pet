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
            <!-- search form -->
            <form id="searchform1" class="searchform navbar-form navbar-form-sm navbar-left shift" method="post" role="search">
                <div class="form-group">
                    <div class="input-group rounded bg-light">
                        <input data-status="false"  autocomplete="off" id="search_input" type="search" name="s" class="transparent rounded form-control input-sm no-border padder" required="" placeholder="输入关键词搜索…">
                        <!--搜索提示-->
                        <ul id="search_tips_drop" class="dropdown-menu hide" style="display: block;top: 30px; left: 0px;"></ul>
                        <span id="search_submit" @click="" class="transparent input-group-btn">
                            <button type="button" class="transparent btn btn-sm">
                                <i class="fontello fontello-search" id="icon-search"></i>
                                <i class="animate-spin  fontello fontello-spinner hide" id="spin-search"></i>
                            </button>
                        </span>

                    </div>
                </div>
            </form>
            <a href="" style="display: none" id="searchUrl"></a>
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
                <!--闲言碎语-->
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle">
                    <i>
                        <svg t="1576481500173" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11679" width="20" height="20"><path d="M900.3 689v-0.2c-3.1-37.2-32-69-96.5-106.4V425.1c-1.7-116.2-72.4-219.8-180.1-263.9l-12.9-3.4c-3.2-52.4-46.8-93.5-99.4-93.5h-1c-50.8 0-93.2 39.6-96.7 90.1-113.4 41.1-190.9 149.8-193 270.6v154.1c-80.4 43.6-90.8 80-96.3 99.5l-0.2 0.8c-3.5 24.3 3.6 48.9 19.4 67.5l0.2 0.2c17.7 19.2 57.4 33.8 118.1 43.5 60.6 9.6 143.2 14.5 245.7 14.5 54.2 0 133.8-1.5 205.1-8.8 83.4-8.5 137.9-22.9 161.9-42.8 18.8-15.9 28.4-39.9 25.7-64.5z m-62 25.2c-16.6 13.6-58.2 24.3-123.6 31.7C656.6 752.5 583.8 756 504 756c-75.9 0-147.8-3.4-202.6-9.5C236 739.1 195 728 182.8 714.3c-4.8-5.4-6.5-12.1-5-19.2 5.6-26.9 55.8-61.4 88.2-76.4h0.2c3.2-0.3 5.9-2.6 6.7-5.8l0.2-0.7V425.3c2.8-107.8 78-200.2 183-224.7l0.3-0.1 0.4-0.2c0.3-0.1 6.3-3 6.2-10v-25.9c1.7-25.4 22.2-45.8 47.6-47.6h0.1c12.3-0.5 24.1 4 33 12.4 9 8.5 14.2 19.9 14.6 32v26.4c0 0.3 0.2 6.4 6 8.7l0.2 0.1c0.3 0.1 25.2 7.8 35.6 13.5l0.6 0.3c87.2 36.2 145 120.5 147.3 214.8v187l0.2 0.6c0.7 3.3 3.4 5.6 6.7 5.8 19.9 9.2 41.1 21.7 57 33.6 21.6 16.1 33.3 30.4 34.9 42.6v0.1c1.1 7.5-1.7 14-8.5 19.5zM591.2 826.6h-0.6c-7 0-13.5 2.7-18.3 7.6-5 5-7.7 11.8-7.6 18.7 0.1 14.3-5.6 28.3-15.7 38.5-10.2 10.2-23.7 15.7-38.1 15.7h-0.5c-14.6 0.7-28.5-4.8-38.9-15.1-10.2-10.2-15.7-24.3-15.1-38.8v-0.6c-1.1-13.7-11.9-24.5-25.6-25.8h-1c-13.6 1.2-24.6 12.3-25.6 25.9v0.6c0.1 58.7 47.9 106.4 106.6 106.4S617.2 912 617.3 853.3v-0.5c-1.1-13.8-12.3-25.1-26.1-26.2z" fill="#cdcdcd" p-id="11680"></path><path d="M697.6 392.4c-3.3-22-12.1-43-25.7-60.7l-0.1-0.2c-12.7-19.9-32.2-34.8-54.9-42l-0.3-0.1c-11.2-3.9-22.9-6-35-6.3h-0.6c-13.8 1.1-24.6 11.9-25.8 25.6v1c1.2 13.7 12.5 24.8 26.2 25.6 11.7 0.9 22.7 5.2 31.8 12.6l0.3 0.2c18.1 13.6 29.7 34.4 31.9 56.8v0.7l0.2 0.6c3.3 11.7 14.1 19.9 26.2 19.9 2.3 0 4.5-0.3 6.4-0.8l0.3-0.1c7.2-1.3 13.5-5.5 17.2-11.7 3.8-6.4 4.6-14.1 2.2-21l-0.3-0.1z" fill="#cdcdcd" p-id="11681"></path></svg>                    </i>
                        <span class="visible-xs-inline">
              闲言碎语              </span>
                        <span class="badge badge-sm up bg-danger pull-right-xs"></span>

                    </a>

                </li>
                <!--/闲言碎语-->
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
    import {Tooltip} from "element-ui"

    export default {
        name: "Header",
        data(){
            return {
                listShowPos:false,
            }
        },
        components:{
            SkPlayer,
            Tooltip
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
