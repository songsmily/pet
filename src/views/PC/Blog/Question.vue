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
                        <h3 class="m-t-none text-ellipsis index-post-title" @click="detailBlog(item.blogId)"><a>{{item.blogTitle}}</a>
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
        name: "Question",
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
                activeType: "2",
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
                    "activeType": parseInt(that.activeType),
                    "pageSize": that.pageInfo.pageSize,
                    "currentPage": that.pageInfo.currentPage
                }
                const url = "/api/blBlog/getBlogInType?activeType=" + that.activeType + "&pageSize=" + that.pageInfo.pageSize + "currentPage=" + that.pageInfo.currentPage
                console.log(data)
                service({
                    method: "get",
                    params: data,
                    url: "/api/blBlog/getBlogInType"
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
                }else if(tab.name === "-1"){
                    this.$router.push("/user/blog/myBlog")

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
            test: function () {
                // <div id="mapContainer"></div>
                //
                //         <ul id="my-list"></ul>
                //创建地图
                var map = new AMap.Map('mapContainer', {
                    zoom: 1
                })

                AMapUI.loadUI(['misc/MarkerList'], function (MarkerList) {

                    var markerList = new MarkerList({
                        //关联的map对象
                        map: map,

                        //列表的dom容器的id
                        listContainer: 'my-list',

                        //选中状态（通过点击列表或者marker）时在Marker和列表节点上添加的class，可以借此编写css控制选中时的展示效果
                        selectedClassNames: 'selected',

                        //返回数据项的Id
                        getDataId: function (dataItem, index) {
                            //index表示该数据项在数组中的索引位置，从0开始，如果确实没有id，可以返回index代替
                            return dataItem.id
                        },
                        //返回数据项的位置信息，需要是AMap.LngLat实例，或者是经纬度数组，比如[116.789806, 39.904989]
                        getPosition: function (dataItem) {
                            return dataItem.position
                        },
                        //返回数据项对应的Marker
                        getMarker: function (dataItem, context, recycledMarker) {

                            //marker的标注内容
                            var content = dataItem.markerLabel

                            var label = {
                                offset: new AMap.Pixel(16, 18), //修改label相对于marker的位置
                                content: content
                            }

                            //存在可回收利用的marker
                            if (recycledMarker) {
                                //直接更新内容返回
                                recycledMarker.setLabel(label)
                                return recycledMarker
                            }

                            //返回一个新的Marker
                            return new AMap.Marker({
                                label: label
                            })
                        },
                        //返回数据项对应的infoWindow
                        getInfoWindow: function (dataItem, context, recycledInfoWindow) {

                            var tpl = '<p><%- dataItem.id %>：<%- dataItem.infoWinContent %><p>'

                            //MarkerList.utils.template支持underscore语法的模板
                            var content = MarkerList.utils.template(tpl, {
                                dataItem: dataItem,
                                dataIndex: context.index
                            })

                            if (recycledInfoWindow) {
                                //存在可回收利用的infoWindow, 直接更新内容返回
                                recycledInfoWindow.setContent(content)
                                return recycledInfoWindow
                            }

                            //返回一个新的InfoWindow
                            return new AMap.InfoWindow({
                                offset: new AMap.Pixel(0, -23),
                                content: content
                            })
                        },
                        //返回数据项对应的列表节点
                        getListElement: function (dataItem, context, recycledListElement) {

                            var tpl = '<p><%- dataItem.id %>：<%- dataItem.listDesc %><p>'

                            var content = MarkerList.utils.template(tpl, {
                                dataItem: dataItem,
                                dataIndex: context.index
                            })

                            if (recycledListElement) {
                                //存在可回收利用的listElement, 直接更新内容返回
                                recycledListElement.innerHTML = content
                                return recycledListElement
                            }

                            //返回一段html，MarkerList将利用此html构建一个新的dom节点
                            return '<li>' + content + '</li>'
                        }

                    })

                    //监听选中改变
                    markerList.on('selectedChanged', function (event, info) {
                        //console.log(event, info);
                    })

                    //监听Marker和ListElement上的点击
                    markerList.on('markerClick listElementClick', function (event, record) {
                        //console.log(event, record);
                    })

                    //构建一个数据项数组，数据项本身没有格式要求，但需要支持getDataId和getPosition
                    var data = [{
                        id: 'A',
                        position: [116.020764, 39.904989],
                        markerLabel: 'X_A',
                        infoWinContent: 'Hello! A',
                        listDesc: '店铺 A'
                    }, {
                        id: 'B',
                        position: [116.405285, 39.904989],
                        markerLabel: 'X_B',
                        infoWinContent: 'Hello! B',
                        listDesc: '店铺 B'
                    }, {
                        id: 'C',
                        position: [116.789806, 39.904989],
                        markerLabel: 'X_C',
                        infoWinContent: 'Hello! C',
                        listDesc: '店铺 C'
                    }]

                    //展示该数据
                    markerList.render(data)
                })
                // TMap().then(qq => {
                //     var center = new qq.maps.LatLng(39.916527,116.397128);
                //     var map = new qq.maps.Map(document.getElementById('mapContainer'),{
                //         center: center,
                //         zoom: 13
                //     });
                //
                //     var anchor = new qq.maps.Point(100, 100),
                //         size = new qq.maps.Size(80, 80),
                //         origin = new qq.maps.Point(0, 0),
                //         icon = new qq.maps.MarkerImage('http://jijianblog.com/usr/themes/handsome/usr/img/sj2/9.jpg', size, origin, anchor);
                //     var marker = new qq.maps.Marker({
                //         icon: icon,
                //         map: map,
                //         position:map.getCenter()});
                //
                //
                //
                // })
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
