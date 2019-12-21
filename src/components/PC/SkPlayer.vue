<template>
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
            <div class="skPlayer-percent">
                <slider :min=0 :max=100 v-bind:per="per"></slider>
            </div>

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
</template>

<script>
    import axios from "axios"
    import Slider from "./Slider"
    export default {
        name: "SkPlayer",
        props:{
            listShowPos:{
                type:Boolean,
                default:false
            }
        },
        components:{
          Slider
        },
        data(){
            return{
                playFlag:false,
                musicData:{},
                keyword:"",
                currentMusic:{
                    position:1,
                    musicUrl:"",
                    picUrl:"",
                    name:""
                },
                per:0,
                startedTime:0,
                interval:""
            }
        },
        methods:{
            runMusic:function(pos){

                const radio = document.getElementById("radio");
                if (pos){
                    this.startedTime = 0;
                    this.per = 0;
                    setTimeout(function () {
                        radio.play();
                        this.runChangePercent(true)
                    },2000)
                    this.playFlag = true
                }else{
                    if (this.playFlag){
                        radio.pause();
                        this.runChangePercent(false)
                        this.playFlag = !this.playFlag
                    }else{
                        radio.play();
                        this.runChangePercent(true)
                        this.playFlag = !this.playFlag
                    }
                }

            },
            loadMusicList:function () {
                const  that = this
                axios.get("/api/music/selectAll").then(function (res) {
                    console.log(res)
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

            },
            runChangePercent:function(pos){
                let audio = document.getElementById("radio")
                if (pos){
                    if(audio.duration >= this.startedTime){
                        const that = this
                         this.interval =  setInterval(function () {
                             if (audio.duration >= that.startedTime){
                                 that.startedTime += 1
                                 that.per = that.startedTime / audio.duration * 100
                             }else{
                                 clearInterval(that.interval)
                                 that.playFlag = false
                             }

                        },1000)
                    }
                }else{
                    clearInterval(this.interval)
                }
            },
            changePercent:function (percent) {
                // let musicLong = (this.)
                let audio = document.getElementById("radio")
                this.startedTime =  audio.currentTime = percent / 100 * audio.duration
                this.per = percent

            }

        },
        model:{

        },
        watch:{
            musicLong:function (newLong,oldLong) {
                console.log(11)
                // this.playLong = (newLong / this.musicLong()) * 100
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
