<template>
    <div style="padding-bottom: 50px">
        <van-sticky>
            <van-nav-bar title="宠物防疫管理"  >

            </van-nav-bar>
        </van-sticky>
        <div style="">
            <div class="wrapper-md"  >
                <div class="panel" v-for="(item , i ) in petInfo " style="padding: 10px">
                    <div style="margin-bottom: 20px;">
                        <div style="display: flex">
                            <div >
                                <el-avatar :src="item.petImageUrl" fit="cover" size="small">
                                </el-avatar>
                            </div>
                            <div style="padding-left: 10px">
                                <span style="line-height: 28px;font-size: 18px;font-weight: 500;">{{item.petName}}</span>
                            </div>
                        </div>
                        <div v-if="item.petCard != null  && item.petCard.cardStatus != 2" style="padding: 10px 0">
                            <div v-if="item.petCard.cardStatus === 1 " >
                                免疫证书编号：
                                <van-tag mark :underline="false"  type="success" > {{item.petCard.cardNumber}}</van-tag>
                            </div>
                            <div  v-if="item.petCard.cardStatus === 0 ">
                                免疫证书编号：
                                <van-tag mark :underline="false"  type="warning" >等待管理员审核</van-tag>
                            </div>
                        </div>
                    </div>
                    <el-row>
                            <template v-if="item.petCard!= null && item.petCard.cardStatus === 1">
                                <van-cell-group >
                                    <van-cell title="新增免疫信息" icon="add-o" is-link value="新增" @click="$router.push('/mobile/user/pet/uploadImmunity?petCardId=' + item.petCard.petCardId + '&petId=' + item.petId)" :border="true" />
                                    <van-cell title="查看免疫信息" v-if="item.petCard.petImmunities.length > 0" icon="eye-o" is-link value="查看" @click="showImmunityInfo(item)"  :border="true" />
                                </van-cell-group>
                            </template>
                            <template v-else-if="item.petCard != null && item.petCard.cardStatus === 2">
                                <van-cell-group >
                                    <van-cell  @click="$router.push('/mobile/user/pet/reUploadCard?petId=' + item.petId +  '&petName=' + item.petName)"     is-link value="修改" :border="true" >
                                        <template #icon>
                                            <van-icon style="line-height: 24px" name="chat-o" color="#FE976A"/>
                                        </template>
                                        <template #title>
                                            <span  style="margin-left: 5px;color: #FE976A" class="custom-title">证书审核失败</span>
                                        </template>

                                    </van-cell>
                                </van-cell-group>
                            </template>
                            <template v-else-if="item.petCard == null">
                                <van-cell-group >
                                    <van-cell title="上传免疫证书" icon="bookmark-o" @click="$router.push('/mobile/user/pet/uploadCard?petId=' + item.petId +  '&petName=' + item.petName)" is-link value="上传" :border="true" />
                                </van-cell-group>
                            </template>
                    </el-row>
                </div>
<!--                展示宠物防疫信息-->
<!--                <van-popup v-model="isShowImmunityInfo"  position="bottom" title="免疫信息" :style="{ height: '65%' }">-->
<!--                    <div v-show="isShowImmunityInfo" style="padding: 10px">-->
<!--                        <h1>qweqw</h1>-->
<!--                        <h1>qweqw</h1>-->
<!--                        <h1>qweqw</h1>-->
<!--                        <h1>qweqw</h1>-->
<!--                        <h1>qweqw</h1>-->
<!--                        <h1>qweqw</h1>-->
<!--                        <h1>qweqw</h1>-->
<!--                        <h1>qweqw</h1>-->
<!--                        <h1>qweqw</h1>-->
<!--                        <h1>qweqw</h1>-->
<!--                        <h1>qweqw</h1>-->
<!--                        <h1>qweqw</h1>-->
<!--                        <h1>qweqw</h1>-->
<!--                        <h1>qweqw</h1>-->
<!--                        <h1>qweqw</h1>-->
<!--                        <h1>qweqw</h1>-->
<!--                        <h1>qweqw</h1>-->
<!--                        <h1>qweqw</h1>-->
<!--                        <h1>qweqw</h1>-->
<!--                        <h1>qweqw</h1>-->
<!--                    </div>-->

<!--                </van-popup>-->
            </div>

        </div>
    </div>
</template>

<script>
    import moment from 'moment'
    import service from "../../../network/axios"
    import {Breadcrumb, BreadcrumbItem, Col, Row,Button,ButtonGroup,Link,Avatar,Divider,Table,TableColumn,Tag} from "element-ui"
    import {Button as AButton} from  "ant-design-vue"

    export default {
        name: "MobilePetPrevention",
        components: {
            ElBreadcrumb: Breadcrumb,
            ElBreadcrumbItem: BreadcrumbItem,
            ElRow: Row,
            ElCol: Col,
            // AtTag: Tag,
            ElButton:Button,
            ElButtonGroup:ButtonGroup,
            ElLink:Link,
            ElAvatar:Avatar,
            ElDivider:Divider,
            ElTable:Table,
            ElTableColumn:TableColumn,
            ElTag:Tag,
            AButton
        },
        data() {
            return {
                petInfo: [{
                    petId: "",
                    petNo: "",
                    petTypeId: "",
                    hosteId: "",
                    petName: "",
                    petType: "",
                    gmtCreate: "",
                    gmtModified: "",
                    petSex: "",
                    petHeight: "",
                    petBirthday: "",
                    petHairColor: "",
                    petRaiseAddr: "",
                    petWeight: "",
                    petImageUrl: "",
                    petDesc: "",
                    petStatus: "",
                    petCard:{
                        petCardId: "",
                        petId: "",
                        cardNumber: "",
                        cardStatus: "",
                        gmtCreated: "",
                        gmtModified: "",
                        petImmunities:{
                            petImmunityId:"",
                            petId: "",
                            petCardId:"",
                            immunityTime: "",
                            immunityType: "",
                            immunityStatus: '',
                            gmtCreate: "",
                            gmtModified: ""
                        }
                    }
                }],
                isShowImmunityInfo: false,
                immunityData: []
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
            getPetInfos: function () {
                let url = "/api/petCard/returnPetCardImmunityInfos"
                const that = this
                service.get(url).then(function (res) {
                    that.petInfo = Array.from(res.data.data)
                })
            },
            showImmunityInfo(val){
                console.log(val)
                this.$router.push("/mobile/user/pet/petImmunity?petId=" + val.petId)
            },
            returnBack() {
                this.$router.back()
            }
        }
    }
</script>

<style scoped>
    .image >img{
        height: 300px;
    }
</style>
