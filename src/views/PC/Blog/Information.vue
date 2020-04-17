<template>

    <div class="col center-part wrap_content_user">
        <header class="bg-light   wrapper-md blog_choice">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="'#'">宠物资讯</el-breadcrumb-item>
                <el-breadcrumb-item>资讯列表</el-breadcrumb-item>
            </el-breadcrumb>
        </header>
        <!--内容页-->
        <div class="wrap_content_user" style="margin-top: 20px" id="post-panel">


            <div class="blog-post" id="blog-all-content">
                <template v-if="infoList.length < 1">
                    <a-empty description="暂无数据"
                            image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
                            :imageStyle="{height: '150px'}"
                    ></a-empty>
                </template>
                <template v-else>
                    <div class="post-meta wrapper-lg" v-for="(item , i ) in infoList ">
                        <div style="display: flex;">
                            <div style="margin-right: 10px">
                                <img :src="item.infoImage" width="202px" height="100px" alt="">

                            </div>
                            <div style="position: relative;width: 100%;" >
                                <!--标题-->
                                <h3 class="m-t-none text-ellipsis index-post-title" style="width: 80%" @click="detailInfo(item.infoId)">



                                    <a>{{item.infoTitle}}</a>
                                </h3>
                                <p style=" width:200px;position: absolute; bottom: 20px;padding: 0;margin: 0;" class="summary l-h-2x text-muted blog_info">


                                    <!--用户名-->
                                    <i class="fontello fontello-user text-muted"></i>
                                    <span class="m-r-sm">&nbsp;<a>管理员&nbsp;</a></span>
                                    <!--创建时间-->
                                    <i class="fontello fontello-clock-o text-muted"></i>
                                    <span class="m-r-sm">&nbsp;{{$util.formatTime(item.createdTime, null)}}</span>
                                    <!--                            <a-divider type="vertical" />-->
                                    <!--                            &lt;!&ndash;评论数&ndash;&gt;-->
                                    <!--                            <a class="m-l-sm post-item-comment">-->
                                    <!--                                <i class="iconfont icon-comments-o text-muted"></i>&nbsp;{{item.blogComment}}-->
                                    <!--                            </a>-->
                                    <!--                            <a-divider type="vertical" />-->
                                    <!--                            &lt;!&ndash;点赞数&ndash;&gt;-->
                                    <!--                            <a class="m-l-sm post-item-comment">-->
                                    <!--                                <a-icon type="like"></a-icon>&nbsp;{{item.blogGoods}}-->
                                    <!--                            </a>-->
                                    <!--                            <a-divider type="vertical" />-->
                                    <!--                            &lt;!&ndash;收藏数&ndash;&gt;-->
                                    <!--                            <a class="m-l-sm post-item-comment">-->
                                    <!--                                <i class="el-icon-star-off"></i>&nbsp;{{item.blogCollect}}-->
                                    <!--                            </a>-->
                                </p>
                            </div>

                        </div>
                        <div class="line line-lg b-b b-light"></div>


                    </div>
                    <div style="text-align: center;margin-top: 10px;margin-bottom: 10px;">
                        <el-pagination
                                background
                                layout="total,prev, pager, next"
                                :total="pageInfo.total"
                                :page-size="pageInfo.pageSize"
                                @current-change="changePage">
                        </el-pagination>
                    </div>
                </template>

            </div>


        </div>

    </div>

</template>

<script>
    import {TMap} from '@/api/parking'
    // import AMap from 'AMap' // 引入高德地图
    import {Divider, Breadcrumb, BreadcrumbItem, TabPane, Tabs, Col, Row, Button,Pagination} from "element-ui"
    import {Icon as AIcon,Divider as ADivider,Tag as ATag, Empty as AEmpty} from "ant-design-vue"
    import service from "network/axios"


    export default {
        name: "Information",
        components: {
            ElDivider: Divider,
            ElBreadcrumb: Breadcrumb,
            ElBreadcrumbItem: BreadcrumbItem,
            ElTabs: Tabs,
            ElTabPane: TabPane,
            ElCol: Col,
            ElRow: Row,
            ElButton: Button,
            ElPagination:Pagination,
            AIcon,
            ADivider,
            ATag,
            AEmpty


        },
        data() {
            return {
                activeType: "1",
                pageInfo: {
                    pageSize: 5,
                    currentPage: 1,
                    total: 0
                },
                blogInfos:[],
                infoList:[]
            }
        },
        mounted() {
            this.$Loading.start()
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
            changePage:function(currentPage){
                this.pageInfo.currentPage =  currentPage
                this.$Loading.start()
                this.getInfoPage()
            },
            detailInfo:function(infoId){
                this.$router.push({
                    path: "/user/blog/detailInfo/" + infoId
                })
            }

        }

    }
</script>

<style>
    html,
    body {
        width: 100%;
        height: 100%;
        margin: 0px;
    }

    #mapContainer {
        width: 800px;
        height: 800px;
    }

    #outer-box {
        margin-top: 20px;
        height: 100%;
    }

    #container {
        height: 100%;
        width: 100%;
    }

    #panel {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 260px;
        z-index: 999;
    }

    #my-list {
        margin: 0;
        padding: 0;
    }

    #my-list li {
        background: #eee;
        margin: 10px 0;
        list-style: none;
        padding: 0;
        padding: 10px;
        cursor: pointer;
    }

    #my-list li p {
        color: red;
        margin: 5px;
    }

    #my-list li .selected {
        background: green;
        color: #fff;
    }

    .selected .amap-marker-label {
        background: green;
        color: #fff;
        border-color: #ccc;
    }

    #panel h3 {
        margin: 10px 0;
    }

    #panel dd {
        margin: 5px 5px;
    }

    #panel dl {
        margin: 7px 0;
    }

    .wrapper-lg {
        padding: 15px 20px 15px 20px;
    }

    .line {
        margin: 14px 0;
    }

    .blog_info {
        font-size: 12px;
    }

    .blog_choice {
        padding: 10px 20px 10px 20px;
        background-color: #f9f9f9;
    }
    #blog-all-content{
        background-color: white;
        height: 100vh;
    }


</style>
