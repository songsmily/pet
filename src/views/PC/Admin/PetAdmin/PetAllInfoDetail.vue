<template>
    <!--内容页-->
    <el-row :gutter="30" style="height: 700px;overflow: scroll;padding-bottom: 20px">

        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <div class="grid-content">
                <div class="image">
                    <!--                                    <el-image-->
                    <!--                                            style="width: 100px; height: 100px"-->
                    <!--                                            :src="petInfo.petImageUrl"-->
                    <!--                                            :preview-src-list="picList">-->
                    <!--                                    </el-image>-->
                    <img :src="petInfo.petInfo.petImageUrl" style="height:400px;">
                </div>

                <div class="extra content">
                    <!--                    <el-tag v-if="petInfo.petStatus == 0" class="right" color="warning">审核中</el-tag>-->
                    <!--                    <el-tag v-else class="right" color="success">审核通过</el-tag>-->
                    <span v-if="petInfo.petInfo.isCancel!==1">
                                    上传日期：{{ reverseTime(petInfo.petInfo.gmtCreate)}}
                    </span>
                    <span v-if="petInfo.petInfo.isCancel==1">
                                    注销日期：{{ reverseTime(petInfo.petCancel.gmtCreate)}}
                    </span>
                </div>
                <div class="content">
                    <el-alert v-if="petInfo.petInfo.isCancel==1"
                              :closable="false"
                              :title="'宠物信息已注销【' + petInfo.petCancel.cancelType + '】'"
                              type="error"
                              :description="petInfo.petCancel.cancelRes"
                              show-icon>
                    </el-alert>
                    <el-collapse @change="handleChange">
                        <el-collapse-item name="1">
                            <template slot="title">
                                <el-link type="default" :underline="false">{{openCollapse}}<i
                                        class="header-icon el-icon-add-location"></i></el-link>
                            </template>
                            <div class="row_content">
                                <span class="labelVal">宠物名：</span>
                                <div class="row_content_input">
                                    <el-input size="large" v-model="petInfo.petInfo.petName"
                                    >

                                    </el-input>
                                </div>
                            </div>
                            <div class="row_content">
                                <span class="labelVal">宠物类型：</span>
                                <div class="row_content_input">
                                    <el-input size="large" v-model="petInfo.petInfo.petType"
                                    >

                                    </el-input>
                                </div>
                            </div>
                            <div class="row_content">
                                <span class="labelVal">出生日期：</span>
                                <div class="row_content_input">
                                    <el-input size="large" v-model="petInfo.petInfo.petBirthday"
                                    >

                                    </el-input>
                                </div>
                            </div>
                            <!--                                <div class="row_content">-->
                            <!--                                    <span class="labelVal">宠物毛色：</span>-->
                            <!--                                    <div class="row_content_input">-->
                            <!--                                        <el-input size="large" v-model="petInfo.petInfo.petHairColor"-->
                            <!--                                        >-->

                            <!--                                        </el-input>-->
                            <!--                                    </div>-->
                            <!--                                </div>-->
                            <!--                                <div class="row_content">-->
                            <!--                                    <span class="labelVal">宠物体重（Kg）：</span>-->
                            <!--                                    <div class="row_content_input">-->
                            <!--                                        <el-input size="large" v-model="petInfo.petInfo.petWeight"-->
                            <!--                                        >-->

                            <!--                                        </el-input>-->
                            <!--                                    </div>-->
                            <!--                                </div>-->
                            <!--                                <div class="row_content">-->
                            <!--                                    <span class="labelVal">宠物身高（Cm）：</span>-->
                            <!--                                    <div class="row_content_input">-->
                            <!--                                        <el-input size="large" v-model="petInfo.petInfo.petWeight"-->
                            <!--                                        >-->

                            <!--                                        </el-input>-->
                            <!--                                    </div>-->
                            <!--                                </div>-->
                            <div class="row_content">
                                <span class="labelVal">宠物性别：</span>
                                <div class="row_content_input">
                                    <el-radio v-model="petInfo.petInfo.petSex" label="1">雄性(公)</el-radio>
                                    <el-radio v-model="petInfo.petInfo.petSex" label="0">雌性(母)）</el-radio>
                                </div>
                            </div>
                            <div class="row_content">
                                <span class="labelVal">宠物饲养地址：</span>
                                <div class="row_content_input">
                                    <el-input size="large" v-model="petInfo.petInfo.petRaiseAddr"
                                    >

                                    </el-input>
                                </div>
                            </div>
                            <div class="row_content">
                                <span class="labelVal">宠物描述：</span>
                                <div class="row_content_input">
                                    <el-input size="large" v-model="petInfo.petInfo.petDesc"
                                    >

                                    </el-input>
                                </div>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                    <el-col style="margin-top: 10px">
                    </el-col>
                    <template v-if="petInfo.petInfo.isCancel!==1">
                        <el-divider>
                            <span style="color: #909399;">宠物免疫信息</span>
                        </el-divider>
                        <el-row style="margin-top: 10px;margin-bottom: 10px">
                            免疫证书编号：
                            <el-link size="mini" type="warning" v-if="petInfo.petInfo.petCard == undefined">待上传
                            </el-link>
                            <el-link :underline="false" size="mini" type="success"
                                     v-else-if="petInfo.petInfo.petCard.cardStatus === 1">
                                {{petInfo.petInfo.petCard.cardNumber}}
                            </el-link>
                            <el-link :underline="false" size="mini" type="warning"
                                     v-else-if="petInfo.petInfo.petCard.cardStatus === 0"> 待审核
                            </el-link>

                        </el-row>

                        <div style="font-size: 15px;text-align: center;padding-bottom: 20px">
                            <el-tag v-if="petInfo.petInfo.petCard == null || petInfo.petInfo.petCard.cardStatus === 0 || petInfo.petInfo.petCard.cardStatus === 2"
                                    type="warning" size="mini">未上传免疫证书或审核未通过，暂无宠物免疫信息！
                            </el-tag>
                            <template v-if="petInfo.petInfo.petCard!= null && petInfo.petInfo.petCard.cardStatus === 1">

                                <el-table
                                        :data="petInfo.petImmunityInfo"
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
                                            <el-link v-if="scope.row.immunityStatus === 0" :underline="false"
                                                     type="warning">
                                                {{reverseStatus(scope.row.immunityStatus)}}
                                            </el-link>
                                            <el-link v-if="scope.row.immunityStatus === 1" :underline="false"
                                                     type="success">
                                                {{reverseStatus(scope.row.immunityStatus)}}
                                            </el-link>
                                            <el-link v-if="scope.row.immunityStatus === 2" :underline="false"
                                                     type="danger">
                                                {{reverseStatus(scope.row.immunityStatus)}}
                                            </el-link>
                                        </template>
                                    </el-table-column>
                                    <!--                                    <el-table-column-->
                                    <!--                                            label="操作">-->
                                    <!--                                        <template slot-scope="scope">-->
                                    <!--                                            <el-button  @click="handleDetailImmunity(scope.row)" type="text" >查看</el-button>-->
                                    <!--                                            <el-button  v-if="scope.row.immunityStatus  !== 1" @click="handleUpdateImmunity(scope.row)" type="text" >编辑</el-button>-->
                                    <!--                                        </template>-->
                                    <!--                                    </el-table-column>-->
                                </el-table>
                                <!--                                <el-col  class="addImmunityButton" >-->
                                <!--                                    <router-link  :to="{path:'/user/pet/uploadImmunity',query: {'petCardId':petInfo.petCard.petCardId,'petId':petInfo.petId}}"><el-button size="mini" icon="el-icon-plus" type="info">新增免疫信息</el-button></router-link>-->
                                <!--                                </el-col>-->
                            </template>
                        </div>

                        <el-button v-if="petInfo.petInfo.petCard==null" type="warning" size="mini"
                                   @click="sendCardNotice">提示属主上传宠物免疫证书
                        </el-button>
                        <el-button v-if="petInfo.petInfo.petCard!=null && petInfo.petImmunityCount ===0" type="warning"
                                   size="mini" @click="sendImmunityNotice">提示属主上传免疫信息
                        </el-button>
                    </template>

                </div>

            </div>
        </el-col>


    </el-row>

</template>

<script>  import {
    Breadcrumb,
    BreadcrumbItem,
    Col,
    Row,
    Button,
    ButtonGroup,
    Link,
    Avatar,
    Divider,
    Table,
    TableColumn,
    Tag,
    Input,
    Radio,
    Collapse,
    CollapseItem,
    Alert
} from "element-ui"

import service from "network/axios"
import moment from "moment"
import adminService from "../../../../network/adminAxios"

export default {
    name: "PetAllInfoDetail",
    components: {
        ElBreadcrumb: Breadcrumb,
        ElBreadcrumbItem: BreadcrumbItem,
        ElRow: Row,
        ElCol: Col,
        ElButton: Button,
        ElButtonGroup: ButtonGroup,
        ElLink: Link,
        ElAvatar: Avatar,
        ElDivider: Divider,
        ElTable: Table,
        ElTableColumn: TableColumn,
        ElTag: Tag,
        ElInput: Input,
        ElRadio: Radio,
        ElCollapse: Collapse,
        ElCollapseItem: CollapseItem,
        ElAlert: Alert
    },
    data() {
        return {
            openCollapse: "点击展开宠物详细信息"
        }
    },
    props: {
        petInfo: {},
        activeNames: ['1']
    },
    computed: {
        reverseTime() {
            return function (time) {
                return moment(Number.parseInt(time)).format('YYYY-MM-DD')
            }
        },
        reverseStatus() {
            return function (val) {
                switch (val) {
                    case 0:
                        return "待审核"
                    case 1:
                        return "审核通过"
                    case 2:
                        return "审核失败"
                }
            }
        }
    },
    mounted() {
        this.petInfo.petInfo.petBirthday = this.reverseTime(this.petInfo.petInfo.petBirthday)
    },
    watch: {
        "petInfo": function () {
            this.petInfo.petInfo.petBirthday = this.reverseTime(this.petInfo.petInfo.petBirthday)
        }
    },
    methods: {
        formatTime: function (row, column) {
            return this.reverseTime(row.immunityTime)
        },
        formatCreateTime: function (row, column) {
            return this.reverseTime(row.gmtCreate)

        },
        handleChange: function (val) {
            console.log(val)
            if (val[0] === "1") {
                this.openCollapse = "点击收起详细信息"
            } else {
                this.openCollapse = "点击展开宠物详细信息"

            }
        },
        sendCardNotice: function () {
            this.$Message.warning("执行操作中......")
            let data = {
                userId: this.petInfo.userInfo.id,
                petId: this.petInfo.petInfo.petId,
                type: 11 //提示上传免疫证书通知
            }
            let url = "/api/admin/petManage/sendNotice"
            const that = this
            adminService({
                url: url,
                data: data,
                method: "post"
            }).then(res => {
                if (res.data.code === 100) {
                    that.$Message.success("提示属主成功！")
                }
            })
        },
        sendImmunityNotice: function () {
            this.$msgbox.prompt('请输入疫苗注射建议！', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                inputPattern: /\S/,
                inputErrorMessage: '请输入疫苗注射建议！'
            }).then((val) => {
                this.$Message.warning("执行操作中......")
                let data = {
                    noticeDesc: val.value,
                    userId: this.petInfo.userInfo.id,
                    petId: this.petInfo.petInfo.petId,
                    petCardId: this.petInfo.petInfo.petCard.petCardId,
                    type: 12 //提示注射疫苗通知
                }
                let url = "/api/admin/petManage/sendNotice"
                const that = this
                adminService({
                    url: url,
                    data: data,
                    method: "post"
                }).then(res => {
                    if (res.data.code === 100) {
                        that.$Message.success("提示属主成功！")
                    }
                })
            })
        }
    }
}
</script>

<style scoped>
    .panel {
        max-height: 750px;
        overflow: scroll;
    }

    .row_content {
        margin-top: 30px;
    }

    .row_content > .labelVal {
        font-size: 13px;
        line-height: 1;
        color: gray;
    }

    .row_content > span > i {
        font-size: 10px;
    }

    .img_container {
        margin-top: 10px;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        background: #0a0f30;
        overflow: hidden;
        position: relative;
        cursor: pointer;
    }

    .img_container:hover .img_cover {
        display: block;
    }

    .img_cover {
        display: none;
        height: 100%;
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background: rgba(0, 0, 0, .7);
        text-align: center;
        color: #fff;
        font-size: 14px;
        cursor: pointer;
    }

    .img_cover > .upload_icon {
        display: block;
        text-align: center;
        margin-top: 38px;
    }

    .hide {
        display: block;
    }

    .row_content_input {
        padding-top: 8px;
        width: 100%;
    }

    .errorNotice {
        color: #FF4949;
        font-size: 12px;
        line-height: 1;
    }

    .timePick {
        width: 100%;
        margin-top: 10px;
    }


    .el-input__inner {
        color: red;
    }

    .image {
        text-align: center;
        padding-top: 10px;;
        margin-bottom: 10px;

    }

    .image > img {
        border-radius: 10px;
    }
</style>
