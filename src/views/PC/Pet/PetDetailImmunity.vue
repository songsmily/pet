<template>
    <div class="col center-part">
        <header class="bg-light lter wrapper-md">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="#">宠物管理</el-breadcrumb-item>
                <el-breadcrumb-item to="/user/pet/petPrevention">宠物防疫管理</el-breadcrumb-item>
                <el-breadcrumb-item >免疫信息详情</el-breadcrumb-item>
            </el-breadcrumb>
        </header>
        <!--内容页-->
        <div class="wrapper-md" id="post-panel">
            <div class="row_content" v-if="petImmunity.immunityStatus === 2" >
                <el-alert style="margin-top: 20px;margin-bottom: 20px"
                          title="审核未通过"
                          type="error"
                          :closable="false"
                          :description=" petImmunity.falseRes"
                          show-icon>
                </el-alert>
            </div>
            <div class="row_content">
                <span class="labelVal">宠物昵称：</span>
                <el-input  size="large"  v-model="petInfo.petName"
                          class="row_content_input" >

                </el-input>
            </div>
            <div class="row_content">
                <span class="labelVal">疫苗种类：</span>
                <el-input  class="row_content_input" v-model="petImmunity.immunityType" placeholder="请选择疫苗种类">
                </el-input>
            </div>
            <div class="row_content">
                <span class="labelVal">疫苗注射日期：</span>

                <el-input  size="large" class="timePick "
                                v-model="petImmunity.immunityTime"
                                placeholder="请选择疫苗注射日期">
                </el-input>

            </div>
            <div class="row_content">
                <span class="labelVal">疫苗标签：</span>
                <div class="img_container">
                    <div>
                        <img  :src="petImmunity.immunityImageUrl" alt="">
                    </div>
                </div>

            </div>
            <div class="row_content">
                <el-button icon="el-icon-back" plain  type="primary" size="large" hollow @click="returnBack">返回</el-button>
                <el-button v-if="petImmunity.immunityStatus ===2" icon="el-icon-edit" plain  type="warning" size="large" hollow @click="toUpdate">进入修改页面</el-button>
            </div>
        </div>
    </div>

</template>

<script>
    import {Breadcrumb, BreadcrumbItem, Col, Row,Button,Link,Avatar,Divider,Table,TableColumn,Tag,Input,
    Select,Option,DatePicker,Alert} from "element-ui"
    import moment from "moment"
    import service from "network/axios"

    export default {
        name: "PetDetailImmunity",
        components: {
            ElBreadcrumb: Breadcrumb,
            ElBreadcrumbItem: BreadcrumbItem,
            ElRow: Row,
            ElCol: Col,
            ElButton:Button,
            ElLink:Link,
            ElAvatar:Avatar,
            ElDivider:Divider,
            ElTable:Table,
            ElTableColumn:TableColumn,
            ElTag:Tag,
            ElInput:Input,
            ElSelect:Select,
            ElOption:Option,
            ElDatePicker:DatePicker,
            ElAlert:Alert
        },
        props:{

        },
        data(){
            return{
                petInfo:[],
                petImmunity:{
                    petId: this.$route.query.petId,
                    petCardId:this.$route.query.petCardId,
                    immunityType: "",
                    immunityTime: "",
                    immunityImageUrl:""
                }
            }
        },
        created(){
            this.$Loading.start()
        },
        mounted(){
            this.petImmunity = JSON.parse( sessionStorage.getItem("petDetailImmunity"))
            this.petImmunity.immunityTime = this.reverseTime(this.petImmunity.immunityTime)
            this.getPetInfos(this.petImmunity.petId)
        },
        computed:{
            reverseTime: function () {
                return function (time) {
                    return moment(time).format('YYYY-MM-DD')
                }
            },
        },
        methods:{

            getPetInfos:function (id) {
                const that = this
                Promise.all([
                    new Promise((resolve , reject)=>{
                        let url = "/api/petinfo/getPetInfoById?petId=" + id;
                        service.get(url).then(function (res) {
                            that.petInfo = res.data.data.petInfo
                            resolve(true)
                        })
                    })
                ]).then(res=>{
                    if (res[0]){
                        that.$Loading.finish()
                    }
                })

            },
            choiceImg: function () {
                // console.log(this.$store.state)
                this.$refs.filElem.dispatchEvent(new MouseEvent('click'))
            },
            getImg: function () {
                const that = this
                const inputFile = this.$refs.filElem.files[0]
                if (inputFile) {
                    if (inputFile.size > 1024 * 1024 * 2 || inputFile.type !== 'image/jpeg' && inputFile.type !== 'image/png' && inputFile.type !== 'image/gif') {
                        this.$Notify({
                            title: '文件类型错误',
                            message: '仅支持JPG、PNG、GIF格式，且小于2M！',
                            type: "error",
                            duration: 2000
                        })
                        return false
                    }
                } else {
                    return false
                }
                let fileReader = new FileReader()
                fileReader.readAsDataURL(inputFile)
                fileReader.onload = function () {
                    that.petImmunity.immunityImageUrl = this.result
                }

            },
            returnBack:function () {
                this.$router.back()
            },
            toUpdate:function () {
                this.$router.push("/user/pet/updateImmunity")
            }
        }
    }
</script>

<style scoped>
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
        border-radius: 10px;
        width: 400px;
        height: 300px;
        background: #0a0f30;
        overflow: hidden;
        position: relative;
        cursor: pointer;
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
        margin-top: 100px;
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

</style>
