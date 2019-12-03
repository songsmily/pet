<template>
  <div id="app" class="app app-aside-fixed container app-header-fixed ">
    <index></index>
<!--    <div id="skPlayer"></div>-->
  </div>
</template>

<script>
import Index from "./components/content/Header"
import skPlayer from "assets/js/music"
export default {
  name: 'app',
  components: {
    Index
  },
  methods:{
    initPlayer(){
      // new skPlayer({
      //   music:{
      //     src:'http://o9vplcp9o.bkt.clouddn.com/music.mp3',//音乐文件，必填
      //     name:'打呼',//歌曲名称，必填
      //     author:'潘玮柏&杨丞琳',//歌手，必填
      //     cover:'http://o9vplcp9o.bkt.clouddn.com/cover.jpg'//专辑封面，必填
      //   },
      //   //loop:true 是否单曲循环，选填
      //   //theme:'red' 切换red主题，选填
      // });

    }
  },
  created() {
    this.initPlayer()
  }
}

</script>

<style>
  @import "~assets/css/base.css";

</style>

