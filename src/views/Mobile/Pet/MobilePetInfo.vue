<template>
    <div style="padding-bottom: 50px">
        <van-sticky>
            <van-nav-bar title="宠物信息管理" left-text="返回" @click-left="returnBack" left-arrow>
                <template #right>
                    <van-icon name="search" size="18"/>
                </template>
            </van-nav-bar>
        </van-sticky>
        <div style="">
            <div class="wrapper-md" >

                        <router-link   v-for="(item , i ) in petInfo "  :to="{path:'/mobile/user/pet/detail', query:{id:item.petId}}">
                            <div class="grid-content" >
                                <div class="image">
                                    <img :src="item.petImageUrl">
                                </div>
                                <div class="content">
                                    <div class="header">{{item.petName}}</div>
                                    <div class="meta">
                                        <van-tag plain type="primary">{{item.petType}}</van-tag>
                                    </div>
                                    <div class="description">
                                        {{item.petDesc}}
                                    </div>
                                </div>
                                <div class="extra content">
                                    <van-tag mark v-if="item.isCancel== 1" class="right" type="danger" >已注销</van-tag>
                                    <van-tag mark  v-else-if="item.petStatus == 0" class="right"   type="primary">审核中</van-tag>
                                    <van-tag mark  v-else-if="item.petStatus == 1" class="right"   type="success">审核通过</van-tag>
                                    <van-tag mark  v-else-if="item.petStatus == -1" class="right"   type="warning">审核失败</van-tag>
                                    <span>
                                    上传日期：{{item.gmtCreate | formatDate}}
                                </span>
                                </div>
                            </div>
                        </router-link>
            </div>

        </div>
    </div>
</template>

<script>
    import moment from 'moment'
    import service from "../../../network/axios"
    export default {
        name: "MobilePetInfo",
        data() {
            return {
                petInfo:[]
            }
        },
        created() {
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
                service.get(url).then(function (res) {
                    that.petInfo = res.data.data
                })




            },
            returnBack() {

            }
        }
    }
</script>

<style scoped>
    .image >img{
        height: 300px;
    }
</style>
