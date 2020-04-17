<template>
    <div class="col center-part">

        <header class="bg-light lter  wrapper-md" id="small_widgets">
            <div v-if="JSON.stringify(information) !== '{}'">
                <h1 class="">
                    {{information.infoTitle}}
                </h1>
                <div  class="blog-baseInfo">

                    <div class="blog-desc">
                        <!--                        &lt;!&ndash;用户名&ndash;&gt;-->
                        <!--                        <i class="fontello fontello-user text-muted"></i>-->
                        <!--                        <span class="m-r-sm">&nbsp;<a>{{blogInfo.name}}&nbsp;</a></span>-->
                        <!--创建时间-->
                        <a class="m-l-sm post-item-comment">
                            <a-icon type="user"></a-icon>&nbsp;管理员
                        </a>
                        <a-divider type="vertical"></a-divider>
                        <a class="m-l-sm post-item-comment">
                            <i class="fontello fontello-clock-o text-muted"></i>&nbsp;{{$util.formatTime(information.createdTime,
                            null)}}
                        </a>
                    </div>
                </div>
            </div>


        </header>
        <!--内容页-->
        <div class="wrapper-md" id="post-panel" style="height: 85vh">
            <!--            <div class="user-detail" itemscope="" >-->
            <!--                <div>-->
            <!--                    <a-avatar shape="square" class="fly-avatar" size="large" :src="blogInfo.avatarUrl" />-->
            <!--                </div>-->
            <!--                <div style="margin-left: 10px;font-size: 20px">-->
            <!--                    <span >{{blogInfo.name}}</span><br>-->
            <!--                    <span>聂启松</span>-->
            <!--                </div>-->

            <!--            </div>-->
            <template v-if="JSON.stringify(information) === '{}'">
                <a-empty description="暂无数据"
                         image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
                         :imageStyle="{height: '150px'}"
                ></a-empty>
            </template>
            <template v-else>

                <div class="breadcrumb bg-white b-a" itemscope="" style="margin-top: 10px">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="'/admin/community/listInfo'">宠物资讯管理</el-breadcrumb-item>
                        <el-breadcrumb-item>详细信息</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <div id="blog-content" v-html="content">

                </div>
                <!--帖子点赞评论操作-->
<!--                <div class="blog-action" v-if="this.blogInfo.userId != this.$store.state.userInfo.id">-->
<!--                    <a-tooltip placement="top">-->
<!--                        <template slot="title">-->
<!--                            <span>{{isBlogGood ? '取消点赞': '点赞'}}</span>-->
<!--                        </template>-->
<!--                        <a href="javascript:void(0);">-->
<!--                            <a-icon :theme="isBlogGood ? 'twoTone': 'outlined'" twoToneColor="#52c41a" type="like" @click="doBlogGood"/>-->
<!--                        </a>-->
<!--                    </a-tooltip>-->
<!--                    <a-tooltip placement="top">-->
<!--                        <template slot="title">-->
<!--                            <span>{{isBlogConnect ? '取消收藏': '收藏'}}</span>-->
<!--                        </template>-->
<!--                        <a href="javascript:void(0);">-->
<!--                            <a-icon :theme="isBlogConnect ? 'twoTone': 'outlined'" twoToneColor="#52c41a" type="star" @click="doBlogConnect"/>-->
<!--                        </a>-->
<!--                    </a-tooltip>-->

<!--                </div>-->
            </template>
<!--            <a-textarea-->
<!--                    @change="contentChange"-->
<!--                    v-model="commentContent"-->
<!--                    @close="onDrawerClose"-->
<!--                    placeholder="请输入评论内容"-->
<!--                    :autoSize="{ minRows: 4, maxRows: 6 }"-->
<!--            />-->
        </div>
    </div>
</template>

<script>
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
    import moment from 'moment'
    import service from "network/axios"
    import marked from 'marked'

    export default {
        name: "AdminInformationDetail",
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
            ElAlert:Alert,
            AEmpty
        },
        data() {
            return {
                //帖子ID
                infoId: this.$route.params.id,
                //帖子信息
                blogInfo: {},
                //评论信息
                commentInfo:{},
                //
                content: "",
                //点赞数
                goods: 0,
                //是否点赞
                isBlogGood: false,
                isBlogConnect:false,
                //格式化工具
                moment,
                //评论内容
                commentContent: '',
                //评论HTMl
                commentHtml: "",
                //是否显示预览
                DrawerVisible:false,
                //表单校验规则
                rules: {

                    commentContent: [
                        {required: true, message: '请输入评论内容', trigger: 'blur'},
                        {min: 1, max: 300, message: '长度在 1 到 300 个字符', trigger: 'blur'}
                    ]
                },
                //表单
                form: {
                    commentContent: ''
                },
                //是否输入二级评论
                isSecond:false,
                //二级评论带 @用户 + 内容
                secondPreview:"",
                //二级评论父ID
                secondCommentParentId:"",
                information:{}

            }
        },
        created() {
            this.$Loading.start()
        },
        mounted() {
            this.getInfoById()
        },
        filters: {
            formatDate: function (value) {
                return moment(value).format('YYYY-MM-DD')
            }
        },
        methods: {

            //查询资讯内容
            getInfoById:function(){
                let url = "/api/admin/information/getInfoById?infoId=" + this.infoId
                const that = this
                service.get(url).then(function (res) {
                    if (res.data.code !== 100){
                        that.$Message.error("资讯内容不存在或已被删除！")
                        setTimeout(function () {
                            that.$router.push("user/blog/information")
                        },500)
                    } else {
                        that.information = res.data.data
                        that.content = marked(that.information.infoContent)
                        that.$Loading.finish()
                    }

                })
            },

        }
    }
</script>

<style scoped>
    .image > img {
        height: 300px;
    }

    #blog-content {
        background-color: white;
        padding: 10px;
        min-height: 30vh;
    }

    .blog-baseInfo {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .blog-tag-title {
        font-weight: 400;
    }

    .user-detail {
        margin-top: 10px;
        position: relative;
        line-height: 20px;
        padding: 15px 15px 15px 15px;
        font-size: 13px;
        background-color: #f8f8f8;
        color: #999;
        display: flex;
    }

    .blog-action {
        margin-top: 5px;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        font-size: 24px;
        padding: 15px 15px 15px 15px;
    }

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

    .blog-good {
        color: #595959;
    }

    .blog-good:hover {
        color: #595959;
    }

    .comment-good {
        color: #595959;
    }

    .comment-good:hover {
        color: #595959;
    }

    .blog-collection {
        color: #595959;
    }

    .blog-collection:hover {
        color: #595959;
    }

    .meta-active {
        /* 标识当前是否已点赞，是否已收藏 */
        color: red;
    }

    .meta-active:hover {
        /* 标识当前是否已点赞，是否已收藏 */
        color: red !important;
    }

</style>
