<template>
    <div style="">
        <van-sticky>
            <van-nav-bar left-text="返回" title="资讯详情" @click-left="returnBack" left-arrow>

            </van-nav-bar>
        </van-sticky>
        <div id="post-panel">
            <div class="blog-header">
                <div class="blog-title">
                    {{information.infoTitle}}
                </div>
                <!--                            底部内容-->
                <div class="blog-item-bottom">
                    <!--                                评论点赞信息-->
                    <div class="blog-desc">
                        <!--                                    发布时间-->
                        <span class="blog-time">
                                         <i class="fontello fontello-clock-o text-muted"></i>
                                        {{$util.formatTime(information.createdTime, null)}}
                                    </span>
                    </div>
                </div>

            </div>
            <van-divider>正文</van-divider>
            <div class="blog-content" v-html="content">

            </div>

        </div>


    </div>
</template>

<script>
    import service from "network/axios"
    import marked from 'marked'
    import moment from "moment"
    import {Breadcrumb, BreadcrumbItem, Col, Row, Popover, Table, TableColumn,Drawer,Form,FormItem,Input,Alert} from "element-ui"
    import {
        Tag as ATag,
        Avatar as AAvatar,
        Icon as AIcon,
        Tooltip as ATooltip,
        Divider as ADivider,
        Comment as AComment,
        Input as AInput,
        Drawer as ADrawer,
        Button as AButton,
        Empty as AEmpty
    } from "ant-design-vue"
    export default {
        name: "MobileInfoDetail",
        components: {
            ElBreadcrumb: Breadcrumb,
            ElBreadcrumbItem: BreadcrumbItem,
            ElRow: Row,
            ElCol: Col,
            ATag,
            AAvatar,
            AIcon,
            ATooltip,
            ADivider,
            AComment,
            ATextarea: AInput.TextArea,
            ElPopover: Popover,
            ElTableColumn: TableColumn,
            ElTable: Table,
            ADrawer,
            AButton,
            ElDrawer:Drawer,
            ElForm:Form,
            ElFormItem:FormItem,
            ElInput:Input,
            AInput,
            ElAlert:Alert,
            AEmpty
        },
        data() {
            return {
                //帖子ID

                infoId: this.$route.query.infoId,
                information:{},
                blogInfo:{},
                content:""

            }
        },
        mounted() {
            this.$Loading.start()
            this.getInfoById()
        },
        methods: {
            //查询资讯内容
            getInfoById:function(){
                let url = "/api/information/getInfoById?infoId=" + this.infoId
                const that = this
                service.get(url).then(function (res) {
                    that.$Loading.finish()
                    if (res.data.code !== 100){
                        that.$Toast.fail("资讯内容不存在或已被删除！")
                        setTimeout(function () {
                            that.$router.push("/mobile/user/blog/information")
                        },500)
                    } else {
                        that.information = res.data.data
                        that.content = marked(that.information.infoContent)
                    }

                })
            },
            //修改是否显示详情
            returnBack() {
                this.$router.back()
            },
        }
    }
</script>

<style scoped>
    #post-panel {
        margin: 0;
        padding: 10px 10px;
        height: 90vh;
        background-color: #ffffff;
        padding-bottom: 60px;
    }
    .blog-header {
    }
    .blog-title {
        color: #4f4f4f;
        font-size: 22px;
        font-weight: 500;
        margin-bottom: 10px;
        line-height: 30px;
    }

    .blog-title > span {
        height: 20px;
        line-height: 20px;
    }

    .blog-tags {
        margin: 10px 0;
    }

    .blog-tags > span {
        margin-right: 10px;
    }

    .blog-item-bottom {
        height: 20px;
        display: flex;
        font-size: 12px;
    }


    .blog-user-avatar > img {
        height: 20px;
        width: 20px;
        border-radius: 50%;
        margin-right: 5px;
    }

    .blog-user-name {
        font-weight: bold;
        margin-right: 10px;
    }

    .blog-desc > span {
        margin-right: 15px;
    }

    .blog-time {

    }
    .blog-content {
        padding-bottom: 10px;
    }
    .blog-handle {
        position: fixed;
        bottom: 0px;
        background-color: #fff;
        width: 100%;
        height: 60px;
        box-shadow: 0 0 0 0 rgba(21,21,23,.15);
        display: flex;
        line-height: 60px;
        justify-content: space-between;
        padding: 0 15px;
    }
    .good-collect {
        line-height: 60px;
        height: 60px;
        font-size: 25px;
    }
    .good-collect > i{
        margin-left: 15px;
    }




/*    评论】*/

    .comment-actions {
        margin-top:2px;
        border: 1px solid #e6e6e6;
        border-radius: 2px 2px 0 0;
        background-color: #FBFBFB;
        min-height: 42px;
        line-height: 42px;
        font-size: 25px;
        margin-bottom: 2px;

    }
    .sec-comment-info {
        color: #303030;
        width: auto;
        margin: 0px auto;
        overflow: hidden;
        position: relative;
        background: #f9f9f9;
        height: 36px;
        line-height: 36px;
        padding: 0px 10px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        font-size: 13px;

    }

    .comment-actions-emojibox {

        border: 1px solid #D9D9D9;
        background-color: #fff;
    }

    .comment-actions-emojibox li {
        cursor: pointer;
        float: left;
        border: 1px solid #e8e8e8;
        height: 22px;
        width: 26px;
        overflow: hidden;
        margin: 2px 2px;
        text-align: center;
    }

    .comment-actions-emojibox li:hover {
        border: 1px solid #eb7350;
        background: #fff9ec;
    }

    .comment-actions-icon {
        cursor: pointer;
        margin-left: 15px;
    }
</style>
