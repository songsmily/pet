<template>

    <div class="col center-part wrap_content_user">
        <header class="bg-light   wrapper-md blog_choice">
            <el-row>
                <el-col :span="24" :xs="24">
                    <el-tabs v-model="activeType" @tab-click="handleChangeType">
                        <el-tab-pane name="1">
                            <span slot="label" style="font-size: 14px"><i class="el-icon-share"></i> 分享</span>
                        </el-tab-pane>
                        <el-tab-pane name="2">
                            <span slot="label" style="font-size: 14px"><i class="el-icon-question"></i> 提问</span>
                        </el-tab-pane>
<!--                        <el-tab-pane name="3">-->
<!--                            <span slot="label" style="font-size: 14px"><i class="el-icon-discover"></i> 讨论</span>-->
<!--                        </el-tab-pane>-->
                        <el-tab-pane name="-1">
                            <span slot="label" style="font-size: 14px"><i class="el-icon-discover"></i> 我的分享</span>
                        </el-tab-pane>
                        <el-tab-pane name="-2">
                            <span slot="label" style="font-size: 14px"><i class="el-icon-discover"></i> 我的收藏</span>
                        </el-tab-pane>
                    </el-tabs>
                </el-col>
            </el-row>
            <el-row>
                <el-col style="text-align: right">
                    <el-button size="medium" round icon="el-icon-edit" @click="$router.push('/user/blog/add')"> 发表新帖
                    </el-button>

                </el-col>
            </el-row>

        </header>
        <!--内容页-->
        <div class="wrap_content_user" id="post-panel">


            <div class="blog-post" id="blog-all-content">
                <template v-if="blogInfos.length < 1">
                    <a-empty description="暂无数据"
                            image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
                            :imageStyle="{height: '150px'}"
                    ></a-empty>
                </template>
                <template v-else>

                    <div class="post-meta wrapper-lg" v-for="(item , i ) in blogInfos ">
                        <div class="item-meta-ico bg-ico-code">
                            <img :src="item.avatarUrl" alt="">
                        </div>
                        <!--标题-->
                        <h3 class="m-t-none text-ellipsis index-post-title" @click="detailBlog(item.blogId)">

                            <a-tag v-if="item.blogType === 1" color="green">分享</a-tag>
                            <a-tag v-if="item.blogType === 2" color="orange">提问</a-tag>
                            <a>{{item.blogTitle}}</a>

                        </h3>

                        <p class="summary l-h-2x text-muted blog_info">
                            <!-- 标签 -->
                            <a-tag color="blue" v-for="(tagItem , i ) in item.blogTag ">{{tagItem.tagName}}</a-tag>

                            <!--用户名-->
                            <i class="fontello fontello-user text-muted"></i>
                            <span class="m-r-sm">&nbsp;<a>{{item.name}}&nbsp;</a></span>
                            <!--创建时间-->
                            <i class="fontello fontello-clock-o text-muted"></i>
                            <span class="m-r-sm">&nbsp;{{$util.formatTime(item.createdTime, null)}}</span>
                            <a-divider type="vertical" />
                            <!--评论数-->
                            <a class="m-l-sm post-item-comment">
                                <i class="iconfont icon-comments-o text-muted"></i>&nbsp;{{item.blogComment}}
                            </a>
                            <a-divider type="vertical" />
                            <!--点赞数-->
                            <a class="m-l-sm post-item-comment">
                                <a-icon type="like"></a-icon>&nbsp;{{item.blogGoods}}
                            </a>
                            <a-divider type="vertical" />
                            <!--收藏数-->
                            <a class="m-l-sm post-item-comment">
                                <i class="el-icon-star-off"></i>&nbsp;{{item.blogCollect}}
                            </a>
                        </p>
                        <el-dropdown trigger="click" style="float: right">
                        <span class="el-dropdown-link">
                                  <i class="el-icon-arrow-down el-icon-more"></i>
                              </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item icon="el-icon-delete" @click.native="deleteBlog(item.blogId)">删除帖子</el-dropdown-item>
                        </el-dropdown-menu>
                        </el-dropdown>
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
    import {Divider, Breadcrumb, BreadcrumbItem, TabPane, Tabs, Col, Row, Button,Pagination,Dropdown,DropdownMenu,DropdownItem} from "element-ui"
    import {Icon as AIcon,Divider as ADivider,Tag as ATag, Empty as AEmpty} from "ant-design-vue"
    import service from "network/axios"


    export default {
        name: "MyBlog",
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
            AEmpty,
            ElDropdownMenu:DropdownMenu,
            ElDropdownItem:DropdownItem,
            ElDropdown:Dropdown


        },
        data() {
            return {
                activeType: "-1",
                pageInfo: {
                    pageSize: 5,
                    currentPage: 1,
                    total: 0
                },
                blogInfos:[]
            }
        },
        mounted() {
            this.$Loading.start()
            this.getBlogInfoPage()
        },
        methods: {
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
                    if(res.data.code === 100){
                        that.blogInfos = res.data.data.records
                        that.$Loading.finish()
                        that.pageInfo.total = res.data.data.total
                    }
                })
            },
            changePage:function(currentPage){
                this.pageInfo.currentPage =  currentPage
                this.$Loading.start()
                this.getBlogInfoPage()
            },
            handleChangeType: function (tab, event) {
                if(tab.name === "1"){
                    this.$router.push("/user/home")
                }else if(tab.name === "2"){
                    this.$router.push("/user/blog/question")

                }else if (tab.name === "-2") {
                    this.$router.push("/user/blog/myCollection")
                }
                this.activeType = tab.name;
                if (tab.name > 0){
                    this.pageInfo.currentPage = 1;
                }
                this.$Loading.start()
                this.getBlogInfoPage()
            },
            detailBlog:function(blogId){
                this.$router.push({
                    path: "/user/blog/detail/" + blogId
                })
            },
            deleteBlog:function (blogId) {
                const that = this
                this.$msgbox.confirm('确认删除该帖子吗？！', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'success',
                }).then(res => {
                    service({
                        method:"get",
                        url:"/api/blBlog/deleteBlog?blogId=" + blogId,
                    }).then(res => {
                        if (res.data.code === 100) {
                            that.$Message.success("删除成功！");
                            if (that.blogInfos.length < 2) {
                                that.pageInfo.currentPage = 1
                            }
                            that.$Loading.start()
                            that.getBlogInfoPage()
                        } else {
                            that.$Message.success("删除失败！");
                        }
                    })
                }).catch(res => {

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
