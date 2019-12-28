<template>
    <div class="col center-part">
        <header class="bg-light lter wrapper-md">
            <h1 class="m-n font-thin text-black l-h">宠物之家</h1>
            <small class="text-muted letterspacing indexWords"></small>
        </header>
        <!--内容页-->
        <div class="wrapper-md" id="post-panel">

        </div>
    </div>

</template>

<script>
    import RightAsideBar from "components/PC/RightAsideBar"

    export default {
        name: "Home",
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
