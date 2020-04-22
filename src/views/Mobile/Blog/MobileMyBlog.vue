<template>
    <div>
        <van-sticky>
            <van-nav-bar left-text="返回" title="我的分享" @click-left="returnBack" left-arrow>

            </van-nav-bar>
        </van-sticky>
        <div class="blog-item" v-for="(item , i ) in blogInfos "  @click="detailBlog(item.blogId)">
            <!--                            标题-->
            <div class="blog-title van-ellipsis">
                <van-tag plain v-if="item.blogType === 1" type="primary">分享</van-tag>
                <van-tag plain v-if="item.blogType === 2" type="warning">提问</van-tag>
                <span style="margin-left: 5px">
                                    {{item.blogTitle}}
                </span>

            </div>
            <!--                            标签-->
            <div class="blog-tags">
                <van-tag v-for="(tagItem , i ) in item.blogTag " plain mark type="success">{{tagItem.tagName}}</van-tag>
            </div>
            <!--                            底部内容-->
            <div class="blog-item-bottom">
                <!--                                用户信息-->
                <div class="blog-user">
                    <!--                                    用户头像-->
                    <span class="blog-user-avatar">
                                            <img :src="item.avatarUrl" alt="">
                                    </span>
                    <!--                                    用户名-->
                    <span class="blog-user-name">
                                        {{item.name}}
                                    </span>
                </div>
                <!--                                评论点赞信息-->
                <div class="blog-desc">
                    <!--                                    发布时间-->
                    <span class="blog-time">
                                         <i class="fontello fontello-clock-o text-muted"></i>
                                        {{$util.formatTime(item.createdTime, null)}}
                                    </span>
                    <!--                                    评论数-->
                    <span class="blog-comment-count">
                                        <i class="iconfont icon-comments-o text-muted"></i>
                                        {{item.blogComment}}
                                    </span>
                    <!--                                    点赞数-->
                    <span class="blog-good-count">
                                         <a-icon type="like"></a-icon>
                                        {{item.blogGoods}}
                                    </span>
                    <!--                                    收藏数-->
                    <span class="blog-collect-count">
                                         <i class="el-icon-star-off"></i>
                                        {{item.blogCollect}}
                                    </span>
                </div>
            </div>
        </div>
        <div style="text-align: center;margin-top: 10px;margin-bottom: 10px;">
            <el-pagination
                    background
                    layout="total,prev, pager, next"
                    :total="pageInfo.total"
                    :pager-count="5"
                    :page-size="pageInfo.pageSize"
                    @current-change="changePage">
            </el-pagination>
        </div>

    </div>

</template>

<script>
    import { Tab, Tabs } from 'vant'
    import {Icon}  from "ant-design-vue"
    import {Pagination} from "element-ui"
    import service from "network/axios"
    export default {
        name: "MobileMyBlog",
        components: {
            VanTab: Tab,
            VanTabs: Tabs,
            AIcon: Icon,
            ElPagination:Pagination
        },
        data() {
            return {
                active: 0,
                pageInfo: {
                    pageSize: 5,
                    currentPage: 1,
                    total: 1
                },
                blogInfos:[],
                isShowBlog: false,
                detailBlogId: ""
            }
        },
        created(){
            this.getBlogInfoPage()
        },
        methods: {
            changePage:function(currentPage) {
                this.pageInfo.currentPage = currentPage
                this.$Loading.start()
                this.getBlogInfoPage()
            },
            getBlogInfoPage: function () {
                const that = this
                let data = {
                    "pageSize": that.pageInfo.pageSize,
                    "currentPage": that.pageInfo.currentPage
                }
                service({
                    method: "post",
                    data: data,
                    url: "/api/blBlog/getMyBlog"
                }).then(res => {
                    that.$Loading.finish()
                    if(res.data.code === 100){
                        that.blogInfos = res.data.data.records
                        that.pageInfo.total = res.data.data.total
                    }
                })
            },
            changeIsShowBlog:function(){
                this.isShowBlog = false
            },
            detailBlog(blogId) {
                this.$router.push("/mobile/user/blog/detail?blogId=" + blogId)
                // this.detailBlogId = blogId
                // this.isShowBlog = true
            },
            handleChangeType: function () {
                this.pageInfo = {
                    pageSize: 5,
                    currentPage: 1,
                    total: 0
                }
                this.getBlogInfoPage()
            },
            swiperRight(){
                this.isShowBlog = false
            },
            returnBack(){
                this.$router.back()
            }
        }
    }
</script>
<style>
    .van-tabs__line {
        height: 1px;
        background-color: #409EFF;
    }
    .van-popup--right > .wrapper {
        margin: 0;
        padding: 0;
    }
</style>
<style scoped>

    .blog-item {
        background-color: #fff;
        height: 120px;
        border-bottom: 1px #f0f0f0 solid;
        padding: 15px 10px;
    }
    .blog-title {
        color: #4f4f4f;
        font-size: 15px;
        font-weight: 500;
        margin-bottom: 10px;
        height: 30px;
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


    .blog-user-avatar  > img{
        height: 20px;
        width: 20px;
        border-radius: 50%;
        margin-right: 5px;
    }
    .blog-user-name{
        font-weight: bold;
        margin-right: 10px;
    }
    .blog-desc > span {
        margin-right: 15px;
    }
    .blog-time {

    }
</style>
