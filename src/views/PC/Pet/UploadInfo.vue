<template>
    <div id="content" class="app-content">
        <!--loading animate-->
        <div id="loading" class="butterbar active hide">
            <span class="bar"></span>
        </div>  <!-- / aside -->

        <!-- <div id="content" class="app-content"> -->
        <a class="off-screen-toggle hide"></a>
        <main class="app-content-body ">
            <div class="hbox hbox-auto-xs hbox-auto-sm">
                <div class="col center-part">
                    <header class="bg-light lter wrapper-md">
                        <h1 class="m-n font-thin text-black l-h">宠物之家</h1>
                        <small class="text-muted letterspacing indexWords"></small>
                    </header>
                    <!--内容页-->
                    <div class="wrapper-md" id="post-panel">
                        宠物信息上传
                    </div>
                </div>
                <!--首页右侧栏-->
                <right-aside-bar></right-aside-bar>
            </div>
        </main>
        <!-- footer -->
    </div>
</template>

<script>
    import RightAsideBar from "components/PC/RightAsideBar"

    export default {
        name: "UploadInfo",
        components:{
            RightAsideBar
        }

    }
</script>

<style scoped>


    .page-navigator>li>a, .page-navigator>li>span{
        line-height: 1.42857143;
        padding: 6px 12px;
    }
</style>
