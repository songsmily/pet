<template>
    <aside id="aside" class="app-aside hidden-xs bg-white b-r" :class="{'off-screen animated' : $store.state.isMobile && $store.state.isShowNavBarInMobile}">
        <div class="aside-wrap" layout="column">
            <div class="navi-wrap scroll-y" flex="">
                <!-- user -->
                <div class="clearfix hidden-xs text-center  show" id="aside-user">
                    <div class="dropdown wrapper">
                        <div ui-nav="">
                            <a href="index.php/cross.html">
                                <span class="thumb-lg w-auto-folded avatar m-t-sm">
                      <img src="http://www.jijianblog.com/pic/logo.png" class="img-full">
                    </span>
                            </a>
                        </div>
                        <a href="#" >
                <span class="clear">
                  <span class="block m-t-sm">
                    <strong class="font-bold text-lt">-- 游客 --</strong>
                  </span>
                  <span class="text-muted text-xs block">欢迎访问宠物之家...</span>
                </span>
                        </a>

                    </div>
                </div>
                <nav ui-nav="" class="navi clearfix">
                    <ul class="nav">
                        <!--index-->
                        <div class="line dk hidden-folded"></div>
                        <li class="hidden-folded padder m-t m-b-sm text-muted text-xs">
                            <span>社区</span>
                        </li>
                        <!--主页-->
                        <li>
                            <router-link to="/home" class="auto">
                                <i class="fa fa-bookmark"></i>
                                <span>发现</span>
                            </router-link>
                        </li>
                        <!-- /主页 -->
                        <li>
                            <router-link to="/share" class="auto">
                                <i class="fa fa-send-o"></i>
                                <span>分享</span>
                            </router-link>
                        </li>
                        <li>
                            <a target="_blank" href="http://jijianblog.com/index.php/category/3/" class="auto">
                                <i class="fa fa-question-circle-o"></i>
                                <span>答疑</span>
                            </a>
                        </li>
                        <li>
                            <a target="_blank" href="http://jijianblog.com/index.php/category/4/" class="auto">
                                <i class="fa fa-navicon"></i>
                                <span>归类</span>
                            </a>
                        </li>
                        <li class="line dk"></li>
                        <!--Components-->
                        <li class="hidden-folded padder m-t m-b-sm text-muted text-xs">
                            <span>管理</span>
                        </li>
                        <!--分类category-->
                        <li :class="{'active':listShowPos.listOne}" >
                            <a class="auto" @click="listShowPos.listOne = !listShowPos.listOne">
                                <span class="pull-right text-muted">
                                <i class="fontello icon-fw fontello-angle-right text"></i>
                                <i class="fontello icon-fw fontello-angle-down text-active"></i>
                                </span>
                                <i class="glyphicon glyphicon-th"></i>
                                <span>宠物管理</span>
                            </a>
                            <ul class="nav nav-sub dk">
                                <li class="nav-sub-header">
                                    <a>
                                        <span>宠物管理</span>
                                    </a>
                                </li>
                                <!--循环输出分类-->
                                <li>
                                    <a>
                                        <i class="glyphicon glyphicon-th"></i>
                                        <span>宠物信息上传</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="http://jijianblog.com/index.php/category/4/">

                                        <i class="glyphicon glyphicon-th"></i>

                                        <span>宠物信息管理</span>
                                    </a>
                                </li>

                            </ul>
                        </li>
                        <li :class="{'active':listShowPos.listTwo}" >
                            <a class="auto" @click="listShowPos.listTwo = !listShowPos.listTwo">
                                <span class="pull-right text-muted">
                                <i class="fontello icon-fw fontello-angle-right text"></i>
                                <i class="fontello icon-fw fontello-angle-down text-active"></i>
                                </span>
                                <i class="glyphicon glyphicon-file"></i>
                                <span>宠物防疫</span>
                            </a>
                            <ul class="nav nav-sub dk">
                                <li class="nav-sub-header">
                                    <a data-no-instant="">
                                        <span>宠物防疫</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="http://jijianblog.com/index.php/01.html">
                                        <span>防疫信息上传</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="http://jijianblog.com/index.php/cross.html">
                                        <span>防疫信息管理</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </aside>
</template>

<script>
    export default {
        name: "AsideBar",
        data(){
            return{
                listShowPos:{
                    listOne:false,
                    listTwo:false
                }
            }
        },

    }
</script>

<style scoped>

</style>


