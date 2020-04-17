<template>
    <div class="col center-part">
        <header class="bg-light lter wrapper-md">
            <h2>系统状态总览</h2>
        </header>
        <!--内容页-->
        <div class="wrapper-md " style="height: 85vh">
                        <a-descriptions bordered style="margin-top: 20px">
                            <a-descriptions-item label="社区注册用户">{{overViewData.registUserTotal}}</a-descriptions-item>
                            <a-descriptions-item label="社区QQ授权用户">{{overViewData.qqUserTotal}}</a-descriptions-item>
                            <a-descriptions-item label="社区Github授权用户">{{overViewData.githubUserTotal }}</a-descriptions-item>
                            <a-descriptions-item label="社区用户总数" :span="3">{{overViewData.githubUserTotal +  overViewData.registUserTotal + overViewData.qqUserTotal}}</a-descriptions-item>

                            <a-descriptions-item label="社区管理员用户" :span="2">{{overViewData.communityAdminTotal}}</a-descriptions-item>
                            <a-descriptions-item label="已禁用社区管理员" >{{overViewData.communityAdminDisable}}</a-descriptions-item>

                            <a-descriptions-item label="宠物管理员用户" :span="2">{{overViewData.petAdminTotal}}</a-descriptions-item>
                            <a-descriptions-item label="已禁用宠物管理员" >{{overViewData.petAdminDisable}}</a-descriptions-item>

                            <a-descriptions-item label="已记录日志" :span="3">{{overViewData.logCount}}条</a-descriptions-item>



<!--                            <a-descriptions-item label="自动内容审核" :span="3">-->
<!--                                <a-badge status="processing" text="运行中" />-->
<!--                            </a-descriptions-item>-->
<!--                            <a-descriptions-item label="筛选违规帖子" :span="3">{{overViewData.reviewBlogCount}}</a-descriptions-item>-->
<!--                            <a-descriptions-item label="筛选违规评论" :space="3">{{overViewData.reviewCommentCount}}</a-descriptions-item>-->

                        </a-descriptions>
        </div>
<!--        <div class="wrapper-md" id="outer-box">-->

<!--        </div>-->

    </div>
</template>

<script>
    import {Descriptions as ADescriptions,Divider as ADivider,Badge as ABadge} from "ant-design-vue"
    import adminService from "../../../../network/adminAxios"
    export default {
        name: "SystemHome",
        components:{
            ADescriptions,
            ADescriptionsItem:ADescriptions.Item,
            ADivider,
            ABadge
        },
        data(){
            return {
                overViewData:[]
            }
        },
        mounted() {
            this.$Loading.start()
            this.getOverView()
        },
        methods: {
            getOverView: function () {
                const that = this
                adminService({
                    url:"/api/admin/system/getOverView",
                    method:"post"
                }).then(res => {
                    if (res.data.code === 100) {
                        that.overViewData  =  res.data.data
                    }
                    that.$Loading.finish()
                })
            }
        }
    }
</script>

<style>
    .ant-descriptions-bordered .ant-descriptions-item-label{
        background-color: aliceblue;
    }
</style>
