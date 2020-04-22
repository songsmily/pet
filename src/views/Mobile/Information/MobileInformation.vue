<template>
    <div>

<!--        <div class="blog-item" v-for="(item , i ) in blogInfos "  @click="detailBlog(item.blogId)">-->
        <div class="blog-item" v-for="(item , i ) in infoList " @click="detailInfo(item.infoId)" >
            <!-- 左对齐 -->
            <van-row type="flex" gutter="10">
                <van-col span="5">
                    <div style="line-height: 60px" >
                        <img :src="item.infoImage" alt="" style="line-height: 200px;height: 50px">

                    </div>
                </van-col>
                <van-col span="19">
                    <div>
                        <div>
                            <!--                            标题-->
                            <div class="blog-title van-ellipsis">
                 <span  >
                                    {{item.infoTitle}}
                 </span>

                            </div>
                            <!--                            标签-->
                            <div class="blog-tags">
                                <van-tag v-for="(tagItem , i ) in item.blogTag " plain mark type="success">{{tagItem.tagName}}</van-tag>
                            </div>
                            <!--                            底部内容-->
                            <div class="blog-item-bottom">
                                <!--                                评论点赞信息-->
                                <div class="blog-desc">
                                    <!--                                    发布时间-->
                                    <span class="blog-time">
                                         <i class="fontello fontello-clock-o text-muted"></i>
                                        {{$util.formatTime(item.createdTime, null)}}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </van-col>
            </van-row>



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
    import service from "network/axios"
    import {Pagination} from "element-ui"

    export default {
        name: "MobileInformation",
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
                detailBlogId: "",
                infoList:[]
            }
        },
        created(){
            this.getInfoPage()
        },
        methods: {
            getInfoPage: function () {
                const that = this
                let data = {
                    "pageSize": that.pageInfo.pageSize,
                    "currentPage": that.pageInfo.currentPage
                }

                service({
                    method: "post",
                    data: data,
                    url: "/api/information/getInfos"
                }).then(res => {
                    if(res.data.code === 100){
                        that.infoList = res.data.data.records
                        that.$Loading.finish()
                        that.pageInfo.total = res.data.data.total
                    }
                })
            },
            changePage:function(currentPage) {
                this.pageInfo.currentPage = currentPage
                this.$Loading.start()
                this.getBlogInfoPage()
            },
            detailInfo:function(infoId){
                this.$router.push({
                    path: "/mobile/user/blog/detailInfo?infoId=" + infoId
                })
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
        height: 100px;
        border-bottom: 1px #f0f0f0 solid;
        padding: 15px 10px;
    }
    .blog-title {
        color: #4f4f4f;
        font-size: 13px;
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
