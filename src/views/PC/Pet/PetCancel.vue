<template >
    <div class="col center-part" >
        <header class="bg-light lter wrapper-md">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="'#'">宠物管理</el-breadcrumb-item>
                <el-breadcrumb-item :to="'/user/pet/petinfo'">宠物信息管理</el-breadcrumb-item>
                <el-breadcrumb-item >宠物信息注销</el-breadcrumb-item>
            </el-breadcrumb>
        </header>
        <!--内容页-->
        <div class="wrapper-md" id="post-panel">
            <el-row :gutter="30">
                <el-col v-if="petInfo.petId" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <div class="grid-content" >
                            <div class="image">
                                <img :src="petInfo.petImageUrl">
                            </div>
                            <div class="extra content">
<!--                                <el-tag  v-if="petInfo.petStatus == 0" class="right"   color="primary">审核中</el-tag>-->
<!--                                <el-tag  v-else-if="petInfo.petStatus == 1" class="right"   color="success">审核通过</el-tag>-->
<!--&lt;!&ndash;                                <el-tag  v-else-if="petInfo.petStatus == -1" class="right"   color="warning">审核失败</el-tag>&ndash;&gt;-->
<!--                                <div v-if="petInfo.petStatus == -1" style="text-align: center">-->
<!--                                    <el-button  type="danger" size="small" icon="el-icon-delete" style="" @click="deletePetInfo">删除宠物信息</el-button>-->
<!--                                    <el-button  type="warning" size="small" icon="el-icon-edit" style="" @click="reUpload">修改宠物信息</el-button>-->
<!--                                </div>-->
<!--                                <div v-if="petInfo.petStatus == 1" style="text-align: center">-->
<!--                                    <el-button  type="danger" size="small" icon="el-icon-delete" style="" @click="cancelPet">注销宠物信息</el-button>-->
<!--                                    <el-button  type="warning" size="small" icon="el-icon-edit" style="" @click="reUpload">修改宠物信息</el-button>-->

<!--                                </div>-->


                            </div>
                            <div class="content">
                                <div class="row_content">
                                    <span class="labelVal">宠物名：</span>
                                    <div class="row_content_input">
                                        <el-input   size="large" :disabled="true"    v-model="petInfo.petName"
                                                  >

                                        </el-input>
                                    </div>
                                </div>
                              <div class="row_content">
                                    <span class="labelVal">宠物编号：</span>
                                    <div class="row_content_input">
                                        <el-input  size="large"  :disabled="true"  v-model="petInfo.petNo"
                                                  >

                                        </el-input>
                                    </div>
                                </div>

                                <div class="row_content">
                                    <span class="labelVal">注销类型：</span>
                                    <div class="row_content_input">
                                        <el-select   @change="checkCancelType" :class="{'errorType':cancelTypeType}" v-model="cancelData.cancelType" style="width: 100%" placeholder="请选择">
                                            <el-option
                                                    v-for="item in options"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value"
                                                  >
                                            </el-option>
                                        </el-select>
                                        <span class="errorNotice">{{cancelTypeNotice}}</span>
                                    </div>
                                </div>
                                <div class="row_content">
                                    <span class="labelVal">注销原因：</span>
                                    <div class="row_content_input">
                                        <el-input  size="large" :class="{'errorType':cancelResType}"    v-model="cancelData.cancelRes"
                                                   placeholder="请输入注销原因"
                                                  >
                                        </el-input>
                                        <span class="errorNotice">{{cancelResNotice}}</span>
                                    </div>
                                </div>
                                <div class="row_content">
                                    <el-button icon="el-icon-circle-check" plain  type="danger" size="large" hollow @click="openSureMessage">保存信息</el-button>
                                </div>
                            </div>

                        </div>
                </el-col>


            </el-row>

        </div>

    </div>

</template>

<script>

    import {
        Breadcrumb,
        Radio,
        BreadcrumbItem,
        Button,
        Cascader,
        DatePicker,
        InputNumber,
        Input,
        Autocomplete,
        Table, TableColumn, Row, Col,
        Alert,
        Select,
        Option

    } from "element-ui"
    import {Tag} from "at-ui"
    import service from "network/axios"
    import moment from 'moment'

    export default {
        name: "PerCancel",
        components: {
            ElBreadcrumb: Breadcrumb,
            ElBreadcrumbItem: BreadcrumbItem,
            ElInput: Input,
            ElInputNumber: InputNumber,
            ElDatePicker: DatePicker,
            ElCascader: Cascader,
            ElButton:Button,
            AtRadio:Radio,
            ElAutocomplete:Autocomplete,
            ElTable:Table,
            ElTableColumn:TableColumn,
            ElRow:Row,
            ElCol:Col,
            AtTag:Tag,
            ElAlert:Alert,
            ElSelect:Select,
            ElOption:Option
        },
        data() {
            return {
                petInfo: [],
                petCheckfalse:[],
                cancelData:{
                    cancelType:"",
                    cancelRes:"",
                    petId:"",
                    petHosteId:""
                },
                cancelResType:false,
                cancelResNotice:"",
                cancelTypeType:false,
                cancelTypeNotice:"",
                options: [{
                    value: '丢失',
                    label: '丢失'
                }, {
                    value: '正常死亡',
                    label: '正常死亡'
                }, {
                    value: '疾病死亡',
                    label: '疾病死亡'
                }],
            }
        },
        created(){
            this.$Loading.start()
        },
        mounted() {
            this.getPetInfos(this.$route.query.id)

        },
        watch:{

        },
        methods: {
            getPetInfos:function (id) {
                let url = "/api/petinfo/getPetInfoById?petId=" + id;
                const that = this
                service.get(url).then(function (res) {
                    res.data.data.petInfo.petBirthday = moment(parseInt(res.data.data.petInfo.petBirthday)).format('YYYY-MM-DD')
                    that.petInfo = res.data.data.petInfo
                    if (res.data.data.petInfo.petStatus === -1){
                        that.petCheckfalse = res.data.data.petCheckfalse
                    }
                    that.$Loading.finish()
                })
            },
            checkCancelType:function(){
                if (this.cancelData.cancelType === undefined || this.cancelData.cancelType.length === 0) {
                    this.cancelTypeType = true
                    this.cancelTypeNotice = "请选择注销类型！"
                    return false
                } else {
                    this.cancelTypeType = false
                    this.cancelTypeNotice = ""
                    return true
                }
            },
            checkCancelRes:function(){
                if (this.cancelData.cancelRes === undefined || this.cancelData.cancelRes.length === 0) {
                    this.cancelResType = true
                    this.cancelResNotice = "请输入注销原因！"
                    return false
                } else {
                    this.cancelResType = false
                    this.cancelResNotice = ""
                    return true
                }
            },
            cancelPet:function(){
                this.$router.push("/user/petinfo/cancelPet?petId=" + this.petInfo.petId)
            },
            openSureMessage:function(){
                let  check1 = this.checkCancelRes()
                let  check2 = this.checkCancelType()

                if (check1 && check2){
                    this.$msgbox.confirm('确定保存修改吗, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.doUpload()
                    })
                }

            },
            doUpload:function(){
                this.cancelData.petHosteId = this.petInfo.hosteId
                this.cancelData.petId = this.petInfo.petId
                this.cancelData.petNo = this.petInfo.petNo

                this.$Message({
                    message: '正在上传中......',
                    type:"success",
                    iconClass:"el-icon-loading"
                });
                let  check1 = this.checkCancelRes()
                let  check2 = this.checkCancelType()

                if (check1 && check2){
                    const that = this
                    let url = "/api/petCancel/doCancel"
                    service({
                        "method":"post",
                        "url":url,
                        "data":that.cancelData
                    }).then(function (res) {
                        that.$Message.closeAll()
                        if (res.data.code === 100){
                            that.$Notify({
                                title: '保存成功',
                                message: '宠物信息已注销！',
                                type: "success",
                                duration:2000
                            })
                            that.$router.push("/user/pet/petinfo")
                        }else{
                            that.$Notify({
                                title: '保存失败',
                                message: '请重新提交保存！',
                                type: "error",
                                duration:2000
                            })
                        }
                    })
                }else{
                    this.$Message.closeAll()
                    this.$Notify({
                        title: '信息填写错误',
                        message: '请更正后保存！',
                        type: "error",
                        duration:2000
                    })
                }

            },

        },
        filters:{
            formatDate: function (value) {
                return moment(value).format('YYYY-MM-DD')
            }
        }

    }
</script>
<style>
    .errorType  input {
        border: red 1px solid;
    }
    .errorType > textarea{
        border: red 1px solid;
    }
</style>
<style scoped>

    .page-navigator > li > a, .page-navigator > li > span {
        line-height: 1.42857143;
        padding: 6px 12px;
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
        width: 140px;
        height: 140px;
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
    .image{
        text-align: center;
        padding-top: 10px;;
        margin-bottom: 10px;

    }
    .image >img{
        height: 400px;
        border-radius: 10px;
    }

</style>
