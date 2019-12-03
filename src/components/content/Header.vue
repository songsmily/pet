<template>
    <header id="header" class="app-header navbar" role="menu">
        <!-- navbar header（交集处） -->
        <div class="text-ellipsis navbar-header bg-black">
            <button class="pull-right visible-xs dk" ui-toggle-class="show animated animated-lento fadeIn" target=".navbar-collapse"> <i class="fontello fontello-gear text-lg"></i>

            </button>
            <button class="pull-left visible-xs" ui-toggle-class="off-screen animated" target=".app-aside" ui-scroll="app"> <i class="fontello fontello-menu text-lg"></i>

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
        <div class="collapse pos-rlt navbar-collapse box-shadow bg-black">
            <!-- search form -->
            <form id="searchform1" class="searchform navbar-form navbar-form-sm navbar-left shift" method="post" role="search">
                <div class="form-group">
                    <div class="input-group rounded bg-light">
                        <input data-status="false" v-model=keyword  autocomplete="off" id="search_input" type="search" name="s" class="transparent rounded form-control input-sm no-border padder" required="" placeholder="输入关键词搜索…">
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
                    <div id="skPlayer" :class="{'skPlayer-list-on':listShowPos}">
                        <audio id="radio" class="skPlayer-source"  :src="currentMusic.musicUrl" preload="auto"></audio>
                        <div class="skPlayer-picture">
                            <img class="skPlayer-cover" :class="{'skPlayer-pause':playFlag}" :src="currentMusic.picUrl" alt="">
                        </div>
                        <div class="skPlayer-control">
                            <p class="skPlayer-name">{{currentMusic.name}}</p>
                            <div class="playController">
                                <div @click="prevMusic" class="lastMusic  music-off "><i class="fontello fontello-angle-double-left"></i>
                                </div>
                                <div v-if="!playFlag" class="runMusic music-off skPlayer-play-btn" @click="runMusic(false)">
                                    <i class="fontello fontello-play-circle-o runMusicIcon"></i>
                                </div>
                                <div v-else class="runMusic music-off skPlayer-play-btn skPlayer-pause " @click="runMusic(false)">
                                    <i class="fontello fontello-pause-circle-o runMusicIcon"></i>
                                </div>
                                <div @click="nextMusic" class="nextMusic  music-off "><i class="fontello fontello-angle-double-right"></i>
                                </div>
                            </div>
                            <p class="skPlayer-author">群星</p>


                        </div>
                        <ul class="skPlayer-list  fadeInDown  flipInX " :class="{'animated':listShowPos}">

                            <li v-for="(item,i) in musicData"  :data-index="i + 1" @click="loadMusic (i+1,item.id)" :class="{'skPlayer-curMusic':currentMusic.position==i+1}" >
                                <i class="skPlayer-list-sign"></i>
                                <span class="skPlayer-list-index">{{i + 1}}</span>
                                <span class="skPlayer-list-name" title="初心">{{item.name}}</span>
                                <span class="skPlayer-list-author" title="群星">{{item.author}}</span>
                            </li>



                        </ul>
                    </div>
                </li>
                <li class="dropdown " @click="listShowPos = !listShowPos">
                    <a class="skPlayer-list-switch dropdown-toggle"><i
                        class="fontello fontello-headphones"></i><span class="visible-xs-inline"></span>
                    </a>
                </li>
                <!--闲言碎语-->
                <li class="dropdown">
                    <a href="#" data-toggle="dropdown" class="dropdown-toggle"> <i class="fontello fontello-bell icon-fw"></i>
                        <span class="visible-xs-inline">
              闲言碎语              </span>
                        <span class="badge badge-sm up bg-danger pull-right-xs"></span>

                    </a>
                    <!-- dropdown -->
                    <div class="dropdown-menu w-xl animated fadeInUp">
                        <div class="panel bg-white">
                            <div class="panel-heading b-light bg-light"> <strong>
                                闲言碎语 </strong>

                            </div>
                            <div class="list-group" id="smallRecording"></div>
                        </div>
                    </div>
                </li>
                <!--/闲言碎语-->
                <!--登录管理-->
                <li class="dropdown" id="easyLogin">
                    <a onclick="return false" data-toggle="dropdown" class="dropdown-toggle clear"> <span>登录</span>
                        <b class="caret"></b>
                        <!--下三角符号-->
                    </a>
                    <!-- dropdown(已经登录) -->
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
    export default {
        name: "Index",
        data(){
            return{
                playFlag:false,
                listShowPos:false,
                musicData:{},
                keyword:"",
                currentMusic:{
                    position:1,
                    musicUrl:"",
                    picUrl:"",
                    name:""
                }
            }
        },
        methods:{
            runMusic:function(pos){

                const radio = document.getElementById("radio");
                if (pos){
                    setTimeout(function () {
                        radio.play();
                    },2000)
                    this.playFlag = true
                }else{
                    if (this.playFlag){
                        radio.pause();
                        this.playFlag = !this.playFlag
                    }else{
                        radio.play();
                        this.playFlag = !this.playFlag
                    }
                }

            },
            loadMusicList:function () {
                const  that = this
                axios.get("music/selectAll").then(function (res) {
                    that.musicData = res.data.data;
                    that.currentMusic.position = 1;
                    that.currentMusic.musicUrl = that.musicData[0].musicurl;
                    that.currentMusic.picUrl = that.musicData[0].picurl;
                    that.currentMusic.name = that.musicData[0].name;
                })
            },
            loadMusic:function (position,id) {
                let music = {}
                if (!position){
                    music = this.musicData[this.currentMusic.position - 1]
                }else{
                    music = this.musicData.filter(function (music) {
                        return music.id == id
                    })
                    music = music[0]
                    this.currentMusic.position = position
                }
                console.log(music)

                this.currentMusic.musicUrl = music.musicurl
                this.currentMusic.picUrl = music.picurl
                this.currentMusic.name = music.name
                this.runMusic(true)
            },
            nextMusic:function () {
                if (this.currentMusic.position == this.musicData.length){
                    this.currentMusic.position = 1
                }else{
                    this.currentMusic.position += 1
                }
                console.log(this.currentMusic.position)

                this.loadMusic(false,false)
            },
            prevMusic:function () {
                if (this.currentMusic.position == 1){
                    this.currentMusic.position = this.musicData.length
                }else{
                    this.currentMusic.position -= 1
                }
                console.log(this.currentMusic.position)
                this.loadMusic(false,false)

            }

        },
        computed:{
            listStyle:function () {
                return {
                    display:"block",
                }
            }
        },
        created() {
            this.loadMusicList()


        }
    }
</script>
<style scoped>
</style>
