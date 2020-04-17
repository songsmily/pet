<template>
    <div class="col center-part">
        <header class="bg-light lter wrapper-md">
            <h2>社区状态总览</h2>
        </header>
        <!--内容页-->
        <div class="wrapper-md " style="height: 85vh">
                        <a-descriptions bordered style="margin-top: 20px">
                            <a-descriptions-item label="分享类帖子">{{overViewData.shareCount}}</a-descriptions-item>
                            <a-descriptions-item label="提问类帖子">{{overViewData.questionCount}}</a-descriptions-item>
                            <a-descriptions-item label="合计">{{overViewData.shareCount + overViewData.questionCount}}</a-descriptions-item>
                            <a-descriptions-item label="评论总数" :span="3">{{overViewData.commentCount}}</a-descriptions-item>



                            <a-descriptions-item label="自动内容审核" :span="3">
                                <a-badge status="processing" text="运行中" />
                            </a-descriptions-item>
                            <a-descriptions-item label="筛选违规帖子" :span="3">{{overViewData.reviewBlogCount}}</a-descriptions-item>
                            <a-descriptions-item label="筛选违规评论" :space="3">{{overViewData.reviewCommentCount}}</a-descriptions-item>

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
        name: "CommunityHome",
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
                    url:"/api/admin/community/getOverView",
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
