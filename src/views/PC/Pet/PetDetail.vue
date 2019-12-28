<template >
    <div class="col center-part" >
        <header class="bg-light lter wrapper-md">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="'#'">宠物管理</el-breadcrumb-item>
                <el-breadcrumb-item :to="'/pet/petinfo'">宠物信息管理</el-breadcrumb-item>
                <el-breadcrumb-item >宠物详细信息</el-breadcrumb-item>
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
                                <at-tag  v-if="petInfo.petStatus == 0" class="right"   color="warning">审核中</at-tag>
                                <at-tag  v-else class="right"   color="success">审核通过</at-tag>
                                <span>
                                    上传日期：{{petInfo.gmtCreate | formatDate}}
                                </span>
                            </div>
                            <div class="content">
                                <div class="row_content">
                                    <span class="labelVal">宠物名：</span>
                                    <div class="row_content_input">
                                        <at-input  size="large"   v-model="petInfo.petName"
                                                  @blur="checkWeight">

                                        </at-input>
                                    </div>
                                </div>
                                <div class="row_content">
                                    <span class="labelVal">宠物类型：</span>
                                    <div class="row_content_input">
                                        <at-input  size="large"   v-model="petInfo.petType"
                                                  @blur="checkWeight">

                                        </at-input>
                                    </div>
                                </div>
                                <div class="row_content">
                                    <span class="labelVal">出生日期：</span>
                                    <div class="row_content_input">
                                        <at-input  size="large"   v-model="petInfo.petBirthday"
                                                  @blur="checkWeight">

                                        </at-input>
                                    </div>
                                </div>
                                <div class="row_content">
                                    <span class="labelVal">宠物毛色：</span>
                                    <div class="row_content_input">
                                        <at-input  size="large"   v-model="petInfo.petHairColor"
                                                  @blur="checkWeight">

                                        </at-input>
                                    </div>
                                </div>
                                <div class="row_content">
                                    <span class="labelVal">宠物体重（Kg）：</span>
                                    <div class="row_content_input">
                                        <at-input  size="large"   v-model="petInfo.petWeight"
                                                  @blur="checkWeight">

                                        </at-input>
                                    </div>
                                </div>
                                <div class="row_content">
                                    <span class="labelVal">宠物身高（Cm）：</span>
                                    <div class="row_content_input">
                                        <at-input  size="large"   v-model="petInfo.petWeight"
                                                  @blur="checkWeight">

                                        </at-input>
                                    </div>
                                </div>
                                <div class="row_content">
                                    <span class="labelVal">宠物性别：</span>
                                    <div class="row_content_input">
                                        <at-radio  v-model="petInfo.petSex" label="1" >雄性(公)</at-radio>
                                        <at-radio  v-model="petInfo.petSex" label="0">雌性(母)）</at-radio>
                                    </div>
                                </div>
                                <div class="row_content">
                                    <span class="labelVal">宠物饲养地址：</span>
                                    <div class="row_content_input">
                                        <at-input  size="large"   v-model="petInfo.petRaiseAddr"
                                                  @blur="checkWeight">

                                        </at-input>
                                    </div>
                                </div>
                                <div class="row_content">
                                    <span class="labelVal">宠物描述：</span>
                                    <div class="row_content_input">
                                        <at-input  size="large"   v-model="petInfo.petDesc"
                                                  @blur="checkWeight">

                                        </at-input>
                                    </div>
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
        Table, TableColumn, Row, Col

    } from "element-ui"
    import {Tag} from "at-ui"
    import service from "network/axios"
    import moment from 'moment'

    export default {
        name: "UploadInfo",
        components: {
            ElBreadcrumb: Breadcrumb,
            ElBreadcrumbItem: BreadcrumbItem,
            AtInput: Input,
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
            AtTag:Tag
        },
        data() {
            return {
                petInfo: []
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
            queryHairColor(queryString, cb) {
                var hairColors = this.hairColors;
                var results = queryString ? hairColors.filter(this.createFilter(queryString)) : hairColors;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            createFilter(queryString) {//创建颜色过滤器
                return (restaurant) => {
                    return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            loadAll() {//加载宠物毛色
                return [
                    { "value": "白色", "color": "白色" },
                    { "value": "黑色", "color": "黑色" },
                    { "value": "褐色", "color": "褐色" },
                    { "value": "黑褐色", "color": "黑褐色" },
                    { "value": "铁灰色", "color": "铁灰色" },
                    { "value": "灰褐色", "color": "灰褐色" },
                    { "value": "黄色", "color": "黄色" },
                    { "value": "咖啡色", "color": "咖啡色" },
                    { "value": "金黄色", "color": "金黄色" },
                    { "value": "浅黄色", "color": "浅黄色" },
                ];
            },
            checkName: function () {
                if (this.petInfo.petName !== undefined && this.petInfo.petName.length >= 1) {
                    this.petNameType = false
                    this.petNameNotice = ""
                    return true
                } else {
                    this.petNameType = true
                    this.petNameNotice = "请输入宠物昵称！"
                    return false
                }
            },
            checkPetType: function () {
                if (this.petInfo.petType === undefined || this.petInfo.petType.length === 0) {
                    this.petTypeType = true
                    this.petTypeNotice = "请选择宠物类型！"
                    return false
                } else {
                    this.petTypeType = false
                    this.petTypeNotice = ""
                    return true
                }
            },
            checkPetBirthday: function () {
                if (this.petInfo.petBirthday === undefined || this.petInfo.petBirthday.length === 0) {
                    this.petBirthdayType = true
                    this.petBirthdayNotice = "请选择宠物出生日期！"
                    return false
                } else {
                    this.petBirthdayType = false
                    this.petBirthdayNotice = ""
                    return true
                }
            },
            checkPetHairColor: function () {
                if (this.petInfo.petHairColor === undefined || this.petInfo.petHairColor.length === 0) {
                    this.petHairColorType = true
                    this.petHairColorNotice = "请输入宠物毛色！"
                    return false
                } else {
                    this.petHairColorType = false
                    this.petHairColorNotice = ""
                    return true
                }
            },
            checkPetAddr: function () {
                if (this.petInfo.petRaiseAddr === undefined || this.petInfo.petRaiseAddr.length === 0) {
                    this.petRaiseAddrType = true
                    this.petRaiseAddrNotice = "请输入宠物饲养地址！"
                    return false
                } else {
                    this.petRaiseAddrType = false
                    this.petRaiseAddrNotice = ""
                    return true
                }
            },
            checkWeight(number) {

                if (this.petInfo.petWeight === undefined || this.petInfo.petWeight.length === 0) {
                    this.petWeightType = true
                    this.petWeightNotice = "请输入宠物体重！"
                    return false
                } else {
                    if (/^\d+$/.test(this.petInfo.petWeight) || /^(([^0][0-9]+|0)\.([0-9]{1,2}))$/.test(this.petInfo.petWeight))//判断是否是数字
                    {
                        if (this.petInfo.petWeight >= 0.5 && this.petInfo.petWeight <= 80){
                            this.petWeightType = false
                            this.petWeightNotice = ""
                            return true
                        }else{
                            this.petWeightType = true
                            this.petWeightNotice = "输入值不合法！"
                            return false
                        }
                    }else{
                        this.petWeightType = true
                        this.petWeightNotice = "输入值不合法！"
                        return false
                    }

                }
            },
            checkHeight() {
                if (this.petInfo.petHeight === undefined || this.petInfo.petHeight.length === 0) {
                    this.petHeightType = true
                    this.petHeightNotice = "请输入宠物身高！"
                    return false
                } else {
                    if (/^\d+$/.test(this.petInfo.petHeight)|| /^(([^0][0-9]+|0)\.([0-9]{1,2}))$/.test(this.petInfo.petHeight))//判断是否是数字
                    {
                        if (this.petInfo.petHeight >= 0.5 && this.petInfo.petHeight <= 80){
                            this.petHeightType = false
                            this.petHeightNotice = ""
                            return true
                        }else{
                            this.petHeightType = true
                            this.petHeightNotice = "输入值不合法！"
                            return false
                        }
                    }else{
                        this.petHeightType = true
                        this.petHeightNotice = "输入值不合法！"
                        return false
                    }
                }
            },
            checkDesc() {
                if (this.petInfo.petDesc === undefined || this.petInfo.petDesc.length === 0) {
                    this.petDescType = true
                    this.petDescNotice = "请输入宠物描述！"
                    return false
                } else {
                    this.petDescType = false
                    this.petDescNotice = ""
                    return true
                }
            },
            checkSex() {
                if (this.petInfo.petSex === undefined || this.petInfo.petSex.length === 0) {
                    this.petSexNotice = "请选择宠物性别！"
                    return false
                } else {
                    this.petSexNotice = ""
                    return true
                }
            },
            checkImage() {

                if (this.petInfo.petImageUrl === undefined || this.petInfo.petImageUrl.length === 0) {
                    this.petImageNotice = "请选择宠物照片！"
                    return false
                } else {
                    this.petImageNotice = ""
                    return true
                }
            },
            getOptions: function () {
                let url = "/api/pettype/getPetTypeArray"
                const that = this
                service.get(url).then(function (res) {
                    that.options = res.data.data
                    that.$Loading.finish()
                })
            },
            doUpload:function(){
                this.$Message({
                    message: '正在上传中......',
                    type:"success",
                    iconClass:"el-icon-loading"
                });
                let  check1 = this.checkPetHairColor()
                let  check2 = this.checkPetAddr()
                let  check3 = this.checkName()
                let  check4 = this.checkImage()
                let  check5 = this.checkDesc()
                let  check6 = this.checkHeight()
                let  check7 = this.checkPetBirthday()
                let  check8 = this.checkPetType()
                let  check9 = this.checkSex()
                let  check10 = this.checkWeight()
                if (check1 && check2 && check3 && check4 && check5 && check6 && check7 && check8 && check9 && check10){
                    const that = this
                    let url = "/api/petinfo/doUpload"
                    service({
                        "method":"post",
                        "url":url,
                        "data":that.petInfo
                    }).then(function (res) {
                        that.$Message.closeAll()
                        if (res.data.code === 100){
                            that.$Notify({
                                title: '保存成功',
                                message: '宠物信息已保存成功，请等待管理员审核！',
                                type: "success",
                                duration:2000
                            })
                            that.reloadForm();
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
            reloadForm:function(){
                this.petInfo.petType = ""
                this.petInfo.petWeight = ""
                this.petInfo.petDesc = ""
                this.petInfo.petRaiseAddr = ""
                this.petInfo.petBirthday = ""
                this.petInfo.petName = ""
                this.petInfo.petHairColor = ""
                this.petInfo.petHeight = ""
                this.petInfo.petSex = ""
                this.petInfo.petImageUrl = ""
                this.selectedOptions = []
            },
            openSureMessage:function(){
                this.$msgbox.confirm('确定保存修改吗, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.doUpload()
                })
            },
            handleAreaChange:function(val){
                this.petInfo.petType = this.$refs['location'].getCheckedNodes()[0].pathLabels[2]
                this.checkPetType()

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
                    that.petInfo.petImageUrl = this.result
                    console.log(this.result)
                }

            },
            getPetInfos:function (id) {
                let url = "/api/petinfo/getPetInfoById?petId=" + id;
                const that = this
                service.get(url).then(function (res) {
                    console.log(res.data.data.petBirthday)
                    res.data.data.petBirthday = moment(parseInt(res.data.data.petBirthday)).format('YYYY-MM-DD')
                    console.log(res.data.data.petBirthday)

                    that.petInfo = res.data.data
                    that.$Loading.finish()
                })
            }
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

</style>
