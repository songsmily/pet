<template>
    <div style="padding-bottom: 50px;">
        <van-sticky>
            <van-nav-bar title="新增宠物信息" left-text="返回" @click-left="returnBack" left-arrow>
                <template #right>
                    <van-icon name="search" size="18"/>
                </template>
            </van-nav-bar>
        </van-sticky>
        <div style="margin-top: 10px">
            <van-form  @failed="onFailed" :colon="true" :validate-first="false" @submit="doReUpload">
                <van-field v-model="petInfo.petName" label="宠物昵称" placeholder="请输入宠物昵称"
                           :rules="[{ validator: checkPetName, message: '请输入宠物昵称，长度1-20位' }]">

                </van-field>
                <van-field v-model="petInfo.petType" ref="petType" label="宠物类型" @click="isShowPetTypeChoice = true" placeholder="请选择宠物类型"
                           :rules="[{ validator: checkPetType, message: '请选择宠物类型！' }]">

                </van-field>
                <van-popup v-model="isShowPetTypeChoice" position="bottom">
                    <van-picker show-toolbar :columns="options" @cancel="isShowPetTypeChoice = false" @confirm="selectPetType"/>
                </van-popup>
                <van-field v-model="petInfo.petBirthday" ref="petType" label="出生日期" @click="isShowDatePicker = true" placeholder="请选择出生日期"
                           :rules="[{ validator: checkBirthday, message: '请选择出生日期！' }]">

                </van-field>
                <!--            日期选择-->
                <van-popup v-model="isShowDatePicker" position="bottom">
                    <van-datetime-picker type="date" :min-date="minDate" :formatter="formatter" @cancel="isShowDatePicker = false" @confirm="onDatePick"/>
                </van-popup>

                <van-field v-model="petInfo.petHairColor" label="宠物毛色" placeholder="请输入宠物毛色"
                           :rules="[{ validator: checkHairColor, message: '请输入宠物毛色！' }]">

                </van-field>
                <van-field v-model="petInfo.petWeight" label="宠物体重(Kg)" placeholder="请输入宠物体重"
                           :rules="[{ validator: checkWeight, message: '请输入体重，范围在0.5-80！' }]">

                </van-field>
                <van-field v-model="petInfo.petHeight" label="宠物身高(cm)" placeholder="请输入宠物身高"
                           :rules="[{ validator: checkHeight, message: '请输入身高，范围在0.5-200！' }]">

                </van-field>
                <van-field name="radio" label="宠物性别"
                           :rules="[{ validator: checkSex, message: '请选择性别' }]">

                    <template #input>
                        <van-radio-group v-model="petInfo.petSex" direction="horizontal">
                            <van-radio name="1">雌性</van-radio>
                            <van-radio name="2">雄性</van-radio>
                        </van-radio-group>
                    </template>
                </van-field>
                <van-field v-model="petInfo.petRaiseAddr" label="饲养地址" placeholder="请输入饲养地址"
                           :rules="[{ validator: checkAddr, message: '请输入饲养地址，长度在1-100！' }]">

                </van-field>
                <van-field v-model="petInfo.petDesc" label="描述" placeholder="请输入宠物描述"
                           :rules="[{ validator: checkDesc, message: '请输入描述，长度在1-300！' }]">
                </van-field>

                <van-field name="uploader" label="宠物照片"
                           :rules="[{ validator: checkImage, message: '请选择图片！' }]">
                    <template #input>
                        <van-uploader v-model="fileList" multiple :before-read="checkImageFileType"  :max-count="1"/>
                    </template>
                </van-field>
                <div style="margin: 16px;">
                    <van-button round block type="info" native-type="submit">
                        提交
                    </van-button>
                </div>
            </van-form>

        </div>

    </div>

</template>

<script>
    import service from "../../../network/axios"
    import moment from "moment"
    export default {
        name: "MobilePetReUploadInfo",
        data() {
            return {

                value1: '',
                value2: '',
                value3: '',
                pattern: /\d{6}/,
                isShowPetTypeChoice:false,
                isShowDatePicker:false,
                minDate: new Date(2000, 0 , 1),
                options:[],
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
                fileList: [{
                    content: "",
                    file: File,
                    status: ""
                }],
            }
        },
        created() {
            this.getPetInfos(this.$route.query.reUploadPetId)
            this.getOptions()
        },
        methods: {
            doReUpload: function() {
                this.$Toast.loading({
                    message: '正在修改中...',
                    forbidClick: true,
                })

                let date = this.petInfo.petBirthday.substring(0,19);
                date = date.replace(/-/g,'/');
                this.petInfo.petBirthday = new Date(date).getTime()

                const that = this
                let url = "/api/petinfo/doReUpload"
                service({
                    "method":"post",
                    "url":url,
                    "data":that.petInfo
                }).then(function (res) {
                    that.$Toast.clear()
                    if (res.data.code === 100){
                        that.$VanNotify({ type: 'success', message: '修改成功，请等待管理员审核！',duration: 1500});
                        setTimeout(function () {
                            that.$router.back()
                        }, 1500)
                    }else{
                        that.$VanNotify({ type: 'warning', message: '修改失败，请重试！',duration: 1500});
                    }
                })
            },
            getPetInfos: function (id) {
                let url = "/api/petinfo/getPetInfoById?petId=" + id
                const that = this
                service.get(url).then(function (res) {
                    res.data.data.petInfo.petBirthday = moment(parseInt(res.data.data.petInfo.petBirthday)).format('YYYY-MM-DD')
                    that.petInfo = res.data.data.petInfo
                    that.fileList[0].content = that.petInfo.petImageUrl
                })
            },
            returnBack: function () {

            },
            // 校验图片文件类型
            checkImageFileType(file) {
                if (file.size > 1024 * 1024 * 2 || file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif') {
                    this.$Toast("仅支持JPG、PNG、GIF格式，且小于2M！")
                    return false;
                }
                let fileReader = new FileReader()
                fileReader.readAsDataURL(file)
                const that = this
                fileReader.onload = function () {
                    that.petInfo.petImageUrl = this.result
                }
                return true;
            },
            // 校验函数返回 true 表示校验通过，false 表示不通过
            validator(val) {
                return /1\d{10}/.test(val);
            },
            //校验宠物昵称
            checkPetName: function(val) {
                return (val.length >= 1 && val.length <= 10 )
            },
            //校验地址
            checkAddr: function(val) {
                return (val.length >= 4 && val.length <= 100 )
            },
            //校验描述
            checkDesc: function(val) {
                return (val.length >= 1 && val.length <= 300 )
            },
            //校验图片
            checkImage: function(val) {
                return (val.length > 0)
            },
            //校验宠物类型
            checkPetType: function(val) {
                return (val.length > 0)
            },
            //校验出生日期
            checkBirthday: function(val) {
                return (val.length > 0)
            },
            //校验毛色
            checkHairColor: function(val) {
                return (val.length > 0)
            },
            //校验性别
            checkSex: function(val) {
                return (val.length > 0)
            },
            //校验体重
            checkWeight: function(val) {
                if (/^\d+$/.test(val)|| /^(([^0][0-9]+|0)\.([0-9]{1,2}))$/.test(val))//判断是否是数字
                {
                    if (val >= 0.5 && val <= 80){
                        return true
                    }else{
                        return false
                    }
                }else{

                    return false
                }
            },
            //校验身高
            checkHeight: function(val) {
                if (/^\d+$/.test(val)|| /^(([^0][0-9]+|0)\.([0-9]{1,2}))$/.test(val))//判断是否是数字
                {
                    if (val >= 0.5 && val <= 200){
                        return true
                    }else{
                        return false
                    }
                }else{
                    return false
                }
            },
            // 异步校验函数返回 Promise
            asyncValidator(val) {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(/\d{6}/.test(val));
                    }, 2000);
                });
            },
            //表单校验失败
            onFailed(errorInfo) {
               this.$Toast.fail("请正确填写所有信息！")
            },
            //宠物类型被选中
            selectPetType(value) {
                this.petInfo.petType = value[2];
                this.isShowPetTypeChoice = false;
            },
            //格式化日期
            formatter(type, val) {
                if (type === 'year') {
                    return `${val}年`;
                } else if (type === 'month') {
                    return `${val}月`;
                }
                return val;
            },
            formatDate(date) {
                return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
            },
            //日期被选中
            onDatePick: function(date){
                // new Date().get()
                this.isShowDatePicker = false
                this.petInfo.petBirthday  = this.formatDate(date)
            },
            //获取宠物类型
            getOptions: function () {
                let url = "/api/pettype/getPetTypeArrayMobile"
                const that = this
                service.get(url).then(function (res) {
                    that.options = res.data.data
                    that.$Loading.finish()
                })
            },
        }
    }
</script>

<style scoped>

</style>
