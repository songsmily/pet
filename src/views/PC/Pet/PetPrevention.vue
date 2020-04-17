<template>
    <div class="col center-part">
        <header class="bg-light lter wrapper-md">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="'#'">宠物管理</el-breadcrumb-item>
                <el-breadcrumb-item>宠物防疫管理</el-breadcrumb-item>
            </el-breadcrumb>
        </header>
        <!--内容页-->
        <div class="wrapper-md" id="post-panel">
            <el-row :gutter="30">
                <div class="panel" v-for="(item , i ) in petInfo ">
                    <el-row style="display: flex">
                        <el-col :xs="5" :xm="5" :md="2" :lg="2" :xl="2">
                            <el-avatar :src="item.petImageUrl" fit="cover" size="large">
                            </el-avatar>
                        </el-col>
                        <el-col>
                            <span style="line-height: 40px;font-size: 22px;font-weight: 500;">{{item.petName}}</span>
                        </el-col>
                    </el-row>

                    <el-row style="margin-top: 10px">
                        免疫证书编号：
                        <router-link :to="{path:'/user/pet/uploadCard',query:{petId:item.petId}}"  v-if="item.petCard == null"><el-button size="mini" type="warning">上传免疫证书</el-button></router-link>
                        <el-tag :underline="false" size="mini" type="success" v-else-if="item.petCard.cardStatus === 1"> {{item.petCard.cardNumber}}</el-tag>
                        <el-tag :underline="false" size="mini" type="success" v-else-if="item.petCard.cardStatus === 0"> 已上传，等待管理员审核</el-tag>
<!--                        <router-link :to="{path:'/user/pet/reUploadCard',query:{petId:item.petId,petCardId:item.petCard.petCardId}}"  v-else-if="item.petCard.cardStatus === 2"><el-tag size="mini" type="danger">审核失败，点击查看详情</el-tag></router-link>-->
                        <el-button  @click="toReuploadCard(item)"  v-else-if="item.petCard.cardStatus === 2" size="mini" type="danger">审核失败，点击查看详情</el-button>

                    </el-row>
                    <el-divider>
                        <span style="color: #909399;">宠物免疫信息</span>
                    </el-divider>
                    <el-row>
                        <div style="font-size: 15px;text-align: center">
                            <el-tag v-if="item.petCard == null || item.petCard.cardStatus === 0 || item.petCard.cardStatus === 2"  type="warning" size="mini">未上传免疫证书或审核未通过，暂无宠物免疫信息！</el-tag>
                            <template v-if="item.petCard!= null && item.petCard.cardStatus === 1">

                                <el-table
                                        :data="item.petCard.petImmunities"
                                        border
                                        stripe>
                                    <el-table-column
                                            prop="immunityType"
                                            label="免疫类型"
                                            width="180">
                                    </el-table-column>
                                    <el-table-column
                                            prop="immunityTime"
                                            :formatter="formatTime"
                                            label="免疫时间"
                                            width="180">
                                    </el-table-column>

                                    <el-table-column
                                            prop="gmtCreate"
                                            :formatter="formatCreateTime"
                                            label="提交时间">
                                    </el-table-column>
                                    <el-table-column
                                            label="状态">
                                        <template slot-scope="scope">
                                            <el-link v-if="scope.row.immunityStatus === 0" :underline="false" type="warning">
                                                {{reverseStatus(scope.row.immunityStatus)}}
                                            </el-link>
                                            <el-link v-if="scope.row.immunityStatus === 1" :underline="false" type="success">
                                                {{reverseStatus(scope.row.immunityStatus)}}
                                            </el-link>
                                            <el-link v-if="scope.row.immunityStatus === 2" :underline="false" type="danger">
                                                {{reverseStatus(scope.row.immunityStatus)}}
                                            </el-link>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            label="操作">
                                        <template slot-scope="scope">
                                            <el-button  @click="handleDetailImmunity(scope.row)" type="text" >查看</el-button>
                                            <el-button  v-if="scope.row.immunityStatus  !== 1" @click="handleUpdateImmunity(scope.row)" type="text" >编辑</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <el-col  class="addImmunityButton" >
                                      <router-link  :to="{path:'/user/pet/uploadImmunity',query: {'petCardId':item.petCard.petCardId,'petId':item.petId}}"><el-button size="mini" icon="el-icon-plus" type="info">新增免疫信息</el-button></router-link>
                                </el-col>
                            </template>
                        </div>
                    </el-row>
                </div>

            </el-row>

        </div>
    </div>

</template>

<script>
    import {Breadcrumb, BreadcrumbItem, Col, Row,Button,ButtonGroup,Link,Avatar,Divider,Table,TableColumn,Tag} from "element-ui"
    // import {Tag} from "at-ui"

    import service from "network/axios"
    import moment from "moment"

    export default {
        name: "PetPrevention",
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
            ElTag:Tag
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
                }]
            }
        },
        created() {
            sessionStorage.removeItem("reUploadCardInfo")
            sessionStorage.removeItem("petDetailImmunity")
            this.$Loading.start()
        },
        mounted() {
            this.getPetInfos()
        },
        computed: {
            reverseTime() {
                return function (time) {
                    return moment(time).format('YYYY-MM-DD')
                }
            },
            reverseStatus(){
                return function (val) {
                    switch (val) {
                        case 0:
                            return "待审核"
                        case 1:
                            return  "审核通过"
                        case 2:
                            return  "审核失败"
                    }
                }
            }
        },
        methods: {
            getPetInfos: function () {
                let url = "/api/petCard/returnPetCardImmunityInfos"
                const that = this
                service.get(url).then(function (res) {
                    that.petInfo = Array.from(res.data.data)
                    that.$Loading.finish()
                })
            },
            toReuploadCard:function (item) {
                sessionStorage.setItem("reUploadCardInfo",JSON.stringify(item))
                this.$router.push("/user/pet/reUploadCard")
            },
            formatTime:function (row,column) {
                return this.reverseTime(row.immunityTime)
            },
            formatCreateTime:function (row,column) {
                return this.reverseTime(row.gmtCreate)

            },
            handleDetailImmunity(row) {
                sessionStorage.setItem("petDetailImmunity",JSON.stringify(row))
                this.$router.push("/user/pet/detailImmunity")
            },
            handleUpdateImmunity(row) {
                sessionStorage.setItem("petDetailImmunity",JSON.stringify(row))
                this.$router.push("/user/pet/updateImmunity")
            }


        }
    }
</script>

<style scoped>
    .image > img {
        height: 300px;
    }
    .panel{
        padding:12px 24px;
    }
    .addImmunityButton{
        margin-top: 10px;
    }
</style>
