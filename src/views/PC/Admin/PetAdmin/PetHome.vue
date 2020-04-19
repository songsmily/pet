<template>
    <div class="col center-part">
        <header class="bg-light lter wrapper-md">
            <h2>宠物状态总览</h2>
        </header>
        <!--内容页-->
        <div class="wrapper-md " style="height: 85vh">
                        <a-descriptions bordered style="margin-top: 20px">
                            <a-descriptions-item label="已审核宠物" :span="2">{{overViewData.checkPetCount}}</a-descriptions-item>
                            <a-descriptions-item label="待审核宠物" >{{overViewData.unCheckPetCount}}</a-descriptions-item>
                            <a-descriptions-item label="已审核宠物免疫证书信息":span="2" >{{overViewData.checkCardCount}}</a-descriptions-item>
                            <a-descriptions-item label="未审核宠物免疫证书信息" >{{overViewData.unCheckCardCount}}</a-descriptions-item>

<!--                            <a-descriptions-item label="分享类帖子">{{overViewData.shareCount}}</a-descriptions-item>-->
<!--                            <a-descriptions-item label="提问类帖子">{{overViewData.questionCount}}</a-descriptions-item>-->
<!--                            <a-descriptions-item label="合计">{{overViewData.shareCount + overViewData.questionCount}}</a-descriptions-item>-->
<!--                            <a-descriptions-item label="评论总数" :span="3">{{overViewData.commentCount}}</a-descriptions-item>-->



<!--                            <a-descriptions-item label="自动内容审核" :span="3">-->
<!--                                <a-badge status="processing" text="运行中" />-->
<!--                            </a-descriptions-item>-->
<!--                            <a-descriptions-item label="筛选违规帖子" :span="3">{{overViewData.reviewBlogCount}}</a-descriptions-item>-->
<!--                            <a-descriptions-item label="筛选违规评论" :space="3">{{overViewData.reviewCommentCount}}</a-descriptions-item>-->

                            <a-descriptions-item label="已审核宠物疫苗信息" :span="2">{{overViewData.checkImmunityCount}}</a-descriptions-item>
                            <a-descriptions-item label="未审核宠物疫苗信息" >{{overViewData.unCheckImmunityCount}}</a-descriptions-item>

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
        name: "PetHome",
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
                    url:"/api/admin/petManage/getOverView",
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
