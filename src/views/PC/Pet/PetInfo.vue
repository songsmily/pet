<template>
    <div class="col center-part">
        <header class="bg-light lter wrapper-md">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="'#'">宠物管理</el-breadcrumb-item>
                <el-breadcrumb-item>宠物信息管理</el-breadcrumb-item>
            </el-breadcrumb>
        </header>
        <!--内容页-->
        <div class="wrapper-md" id="post-panel">
            <el-row :gutter="30">
                <el-col v-for="(item , i ) in petInfo " :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <router-link :to="{path:'petinfo/detail', query:{id:item.petId}}">
                        <div class="grid-content" >
                            <div class="image">
                                <img :src="item.petImageUrl">
                            </div>
                            <div class="content">
                                <div class="header">{{item.petName}}</div>
                                <div class="meta">
                                    <a>{{item.petType}}</a>
                                </div>
                                <div class="description">
                                    {{item.petDesc}}
                                </div>
                            </div>
                            <div class="extra content">
                                <at-tag  v-if="item.petStatus == 0" class="right"   color="warning">审核中</at-tag>
                                <at-tag  v-else class="right"   color="success">审核通过</at-tag>
                                <span>
                                    上传日期：{{item.gmtCreate | formatDate}}
                                </span>
                            </div>
                        </div>
                    </router-link>
                </el-col>


            </el-row>
        </div>
    </div>
</template>

<script>
    import {Breadcrumb, BreadcrumbItem, Col, Row} from "element-ui"
    import moment from 'moment'
    import {Tag} from "at-ui"
    import axios from "axios"
    export default {
        name: "PetInfo",
        components:{
            ElBreadcrumb: Breadcrumb,
            ElBreadcrumbItem: BreadcrumbItem,
            ElRow:Row,
            ElCol:Col,
            AtTag:Tag
        },
        data(){
          return{
              petInfo:[]
          }
        },
        created(){
            this.$Loading.start()
        },
        mounted() {
            this.getPetInfos()
        },
        filters:{
            formatDate: function (value) {
                return moment(value).format('YYYY-MM-DD')
            }
        },
        methods:{
            getPetInfos:function () {
                let url = "/api/petinfo/returnPetInfos"
                const that = this
                axios.get(url).then(function (res) {
                    that.petInfo = res.data.data
                    that.$Loading.finish()

                })
            }
        }
    }
</script>

<style scoped>


</style>
