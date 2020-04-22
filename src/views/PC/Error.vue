<template>


<div class="404" style="text-align: center;height: 100vh;color: white;background-color: black" >
    <h1 style=";padding-top: 20%;color: white;font-weight: 800;font-size: 80px;margin: 0">500</h1>
    <h2 style="color: white;">服务器内部错误，崩溃啦！</h2>
    <div>
        <a-button ghost style="margin: 10px" @click="returnIndex">返回首页</a-button>
        <a-button ghost @click="$router.back()">后退一步</a-button>

    </div>
    <img src="https://assets.smcdn.cn/assets/images/404_illustration-331b4c7a8a.jpg" alt=""   style="width: 300px;position: absolute;bottom: 0;margin-left: -137px;">
</div>


</template>

<script>
    import {TMap} from '@/api/parking'
    // import AMap from 'AMap' // 引入高德地图
    import {Divider, Breadcrumb, BreadcrumbItem, TabPane, Tabs, Col, Row, Button,Pagination} from "element-ui"
    import {Icon as AIcon,Divider as ADivider,Tag as ATag, Empty as AEmpty,Button as AButton} from "ant-design-vue"
    import service from "network/axios"


    export default {
        name: "Error",
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
            AButton


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
        },
        methods: {
            returnIndex:function () {
                if (sessionStorage.getItem("userInfo")){
                    if (parseInt(sessionStorage.getItem("isMobile")) === 1) {
                        this.$router.push("/mobile/user/home")
                    } else {
                        this.$router.push("/user/home")

                    }
                } else if(sessionStorage.getItem("adminUserInfo")){

                    let adminUserInfo =  JSON.parse(sessionStorage.getItem("adminUserInfo"))
                    if(adminUserInfo.accountType  === 2){
                        this.$router.push("/admin/community/home")
                    }  else if(adminUserInfo.accountType  === 1){
                        this.$router.push("/admin/home")
                    }else {
                        this.$router.push("/admin/system/home")

                    }
                }  else {
                    this.$router.push("/login")
                }
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
