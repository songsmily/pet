<template >
    <div class="col center-part" >
        <header class="bg-light lter wrapper-md">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="'#'">宠物管理</el-breadcrumb-item>
                <el-breadcrumb-item>宠物信息上传</el-breadcrumb-item>
            </el-breadcrumb>
        </header>
        <!--内容页-->
        <div class="wrapper-md" id="post-panel">


            <div class="row_content">
                <span class="labelVal">宠物昵称：</span>
                <at-input :class="{'errorType':petNameType}" size="large" placeholder="请输入宠物昵称" v-model="petInfo.petName"
                          class="row_content_input" @blur="checkName">

                </at-input>
                <span class="errorNotice">{{petNameNotice}}</span>
            </div>
            <div class="row_content">
                <span class="labelVal">宠物类型：</span>
                <!--                <at-input  size="large" :status="petTypeType" placeholder="请选择宠物类型"  v-model="petInfo.petType" class="row_content_input">                </at-input>-->

                <div class="row_content_input">
                    <el-cascader :class="{'errorType':petTypeType}" placeholder="请选择宠物类型" ref="location" :options="options" v-model="selectedOptions" @change="handleAreaChange"
                                 style="width: 100%"  @blur="checkPetType">
                        <template slot-scope="{ node, data }">
                            <span>{{ data.label }}</span>
                            <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
                        </template>
                    </el-cascader>
                </div>

                <span class="errorNotice">{{petTypeNotice}}</span>


            </div>
            <div class="row_content">
                <span class="labelVal">出生日期：</span>

                <el-date-picker :class="{'errorType':petBirthdayType}" size="large" class="timePick " @change="checkPetBirthday"
                                @blur="checkPetBirthday"
                                v-model="petInfo.petBirthday"
                                type="date"
                                placeholder="请选择出生日期"
                                value-format="timestamp">
                </el-date-picker>
                <span class="errorNotice">{{petBirthdayNotice}}</span>

            </div>

            <div class="row_content">
                <span class="labelVal">宠物毛色：</span>
                <div class="row_content_input">
<!--                    <at-input :class="{'errorType':petHairColorType}" size="large" placeholder="请输入宠物毛色"  v-model="petInfo.petHairColor"-->
<!--                              @blur="checkPetHairColor">-->

<!--                    </at-input>-->
                    <el-autocomplete
                            :class="{'errorType':petHairColorType}"
                            class="row_content_input"
                            v-model="petInfo.petHairColor"
                            :fetch-suggestions="queryHairColor"
                            placeholder="请输入宠物毛色"
                            @blur="checkPetHairColor"
                            @input="checkPetHairColor"
                    ></el-autocomplete>
                </div>

                <span class="errorNotice">{{petHairColorNotice}}</span>
            </div>

            <div class="row_content">
                <span class="labelVal">宠物体重（Kg)）：</span>
                <at-input :class="{'errorType':petWeightType}" size="large" placeholder="请输入宠物体重" :status="petWeightType" v-model="petInfo.petWeight"
                          class="row_content_input" @blur="checkWeight">

                </at-input>
<!--                <div class="row_content_input">-->
<!--                    <el-input-number v-model="petInfo.petWeight" :precision="2" :step="0.1" :max="80" :min="2.0"></el-input-number>-->

<!--                </div>-->

                <span class="errorNotice">{{petWeightNotice}}</span>
            </div>
            <div class="row_content">
                <span class="labelVal">宠物身高（Cm)）：</span>
<!--                <div class="row_content_input">-->
<!--                    <el-input-number v-model="petInfo.petHeight" :placeholder="'请输入宠物身高'" :precision="2" :step="0.1" :max="200" :min="5.0"></el-input-number>-->

<!--                </div>-->
                <at-input :class="{'errorType':petHeightType}" size="large" placeholder="请输入宠物身高" :status="petHeightType" v-model="petInfo.petHeight"
                          class="row_content_input" @blur="checkHeight">

                </at-input>

                <span class="errorNotice">{{petHeightNotice}}</span>
            </div>
            <div class="row_content">
                <span class="labelVal">宠物性别：</span>
                <div class="row_content_input">
                    <at-radio v-model="petInfo.petSex" label="1" >雄性(公)</at-radio>
                    <at-radio v-model="petInfo.petSex" label="0">雌性(母)）</at-radio>
                </div>

                <span class="errorNotice">{{petSexNotice}}</span>
            </div>
            <div class="row_content">
                <span class="labelVal">宠物饲养地址：</span>
<!--                <at-input :class="{'errorType':petRaiseAddrType}" size="large" placeholder="请输入宠物饲养地址" :status="petRaiseAddrType" v-model="petInfo.petRaiseAddr"-->
<!--                          class="row_content_input" @blur="checkPetAddr">-->

<!--                </at-input>-->
                <el-autocomplete
                        :class="{'errorType':petRaiseAddrType}"
                        class="row_content_input"
                        v-model="petInfo.petRaiseAddr"
                        :fetch-suggestions="queryAddr"
                        placeholder="请输入宠物饲养地址"
                        @blur="checkPetAddr"
                        @input="checkPetAddr"
                ></el-autocomplete>
                <span class="errorNotice">{{petRaiseAddrNotice}}</span>
            </div>
            <div class="row_content">
                <span class="labelVal">宠物描述：</span>
                <at-input :class="{'errorType':petDescType}" size="large" type="textarea" placeholder="请对宠物进行描述" :status="petDescType"
                          v-model="petInfo.petDesc" class="row_content_input" @blur="checkDesc">

                </at-input>
                <span class="errorNotice">{{petDescNotice}}</span>
            </div>

            <div class="row_content">
                <span class="labelVal">宠物照片：<i>仅支持JPG、PNG、GIF格式，文件小于2M</i></span>
                <div class="img_container">
                    <div>
                        <img style="width: 140px;height: 140px" :src="petInfo.petImageUrl" alt="">
                    </div>
                    <span class="img_cover" @click="choiceImg">
                        <span class="upload_icon">
                            <svg t="1576639130005" class="icon" viewBox="0 0 1066 1024" version="1.1"
                                 xmlns="http://www.w3.org/2000/svg" p-id="1859" width="40" height="40"><path
                                    d="M806.4 362.666667a38.4 38.4 0 1 1-76.8 0 196.266667 196.266667 0 0 0-392.533333 0 38.4 38.4 0 0 1-76.8 0 273.066667 273.066667 0 1 1 546.133333 0z"
                                    fill="#ffffff" p-id="1860"></path><path
                                    d="M768 882.858667a38.4 38.4 0 0 1 0-76.8 196.266667 196.266667 0 1 0 0-392.533334 38.4 38.4 0 0 1 0-76.8 273.066667 273.066667 0 1 1 0 546.133334zM277.333333 336.725333a38.4 38.4 0 0 1 0 76.8 196.266667 196.266667 0 1 0 0 392.533334 38.4 38.4 0 0 1 0 76.8 273.066667 273.066667 0 1 1 0-546.133334z"
                                    fill="#ffffff" p-id="1861"></path><path
                                    d="M484.266667 664.362667a38.4 38.4 0 0 1 76.8 0V896a38.4 38.4 0 1 1-76.8 0v-231.637333z"
                                    fill="#ffffff" p-id="1862"></path><path
                                    d="M359.509333 691.370667a38.4 38.4 0 0 1-54.613333-53.973334l190.421333-193.024a38.4 38.4 0 0 1 54.698667 0l190.464 193.024a38.4 38.4 0 0 1-54.656 53.973334l-163.157333-165.333334-163.157334 165.333334z"
                                    fill="#ffffff" p-id="1863"></path></svg>

                        </span>
                        <span>上传照片</span>
                    </span>
                    <input :ref="'filElem'" type="file" style="display: none" @change="getImg">
                </div>
                <span class="errorNotice">{{petImageNotice}}</span>

            </div>
            <div class="row_content">
                <el-button icon="el-icon-circle-check" plain  type="primary" size="large" hollow @click="openSureMessage">保存信息</el-button>
            </div>
        </div>

    </div>

</template>

<script>
    import service from "network/axios"

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
        Table, TableColumn
    } from "element-ui"

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
            ElTableColumn:TableColumn
        },
        data() {
            return {
                petInfo: {
                    petType: "",
                    hosteId: "",
                    petName: "",
                    petSex: "",
                    petHeight: "",
                    petBirthday: "",
                    petHairColor: "",
                    petRaiseAddr: "",
                    petWeight:"",
                    petImageUrl: "",
                    petDesc: "",
                },

                petNameType: "",
                petNameNotice: "",
                petTypeType: "",
                petTypeNotice: "",
                petBirthdayType: "",
                petBirthdayNotice: "",
                petHairColorType: "",
                petHairColorNotice: "",
                petRaiseAddrType: "",
                petRaiseAddrNotice: "",
                petWeightType: "",
                petWeightNotice: "",
                petHeightType: "",
                petHeightNotice: "",
                petSexType: "",
                petSexNotice: "",
                petDescType: "",
                petDescNotice: "",
                petImageNotice:"",
                selectedOptions: [],
                options:[],
                hairColors: [],
                addrs: [
                    { "value":this.$store.state.userInfo.address, "addr": this.$store.state.userInfo.address },
                ]
            }
        },
        created(){
            this.$Loading.start()
        },
        mounted() {
            this.getOptions()
            this.hairColors = this.loadAllColor();
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
            queryAddr(queryString, cb) {
                var addrs = this.addrs;
                var results = queryString ? addrs.filter(this.createFilter(queryString)) : addrs;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            createFilter(queryString) {//创建颜色过滤器
                return (restaurant) => {
                    return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            loadAllColor() {//加载宠物毛色
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
