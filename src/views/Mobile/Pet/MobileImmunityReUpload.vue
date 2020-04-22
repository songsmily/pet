<template>
    <div style="padding-bottom: 50px;">
        <van-sticky>
            <van-nav-bar title="修改免疫信息" left-text="返回" @click-left="returnBack" left-arrow>
            </van-nav-bar>
        </van-sticky>
        <div style="margin-top: 10px">
            <van-form  @failed="onFailed" :colon="true" :validate-first="false" @submit="doUpload">
                <van-field v-model="petName" label="宠物昵称" disabled="">

                </van-field>

                <van-field v-model="petImmunity.immunityType" ref="petType" label="疫苗种类" @click="isShowImmunityType = true" placeholder="请选择疫苗种类"
                           :rules="[{ validator: checkImmunityType, message: '请选择疫苗种类！' }]">

                </van-field>
                <van-popup v-model="isShowImmunityType" position="bottom">
                    <van-picker show-toolbar :columns="options" @cancel="isShowImmunityType = false" @confirm="selectImmunityType"/>
                </van-popup>
                <van-field v-model="petImmunity.immunityTime" ref="petType" label="注射日期" @click="isShowDatePicker = true" placeholder="请选择注射日期"
                           :rules="[{ validator: checkImmunityTime, message: '请选择注射日期！' }]">

                </van-field>
                <!--            日期选择-->
                <van-popup v-model="isShowDatePicker" position="bottom">
                    <van-datetime-picker type="date" :min-date="minDate" :formatter="formatter" @cancel="isShowDatePicker = false" @confirm="onDatePick"/>
                </van-popup>
                <van-field name="uploader" label="疫苗标签"
                           :rules="[{ validator: checkImage, message: '请选择标签图片！' }]">
                    <template #input>
                        <van-uploader v-model="fileList" multiple :before-read="checkImageFileType"  :max-count="1"/>
                    </template>
                </van-field>
                <i style="font-size: 3px">注意：请将免疫证书内页中该支疫苗的标签信息完整拍摄并上传</i>


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
        name: "MobileImmunityReUpload",
        data() {
            return {
                pattern: /\d{6}/,
                isShowImmunityType:false,
                isShowDatePicker:false,
                minDate: new Date(2000, 0 , 1),
                options:[],
                petInfo: {},
                petCard: {
                    petId: this.$route.query.petId,
                    cardNumber: "",
                    cardImageUrl: ""
                },
                petImmunity:{
                    petId: this.$route.query.petId,
                    petCardId:this.$route.query.petCardId,
                    immunityType: "",
                    immunityTime: "",
                    immunityImageUrl:""
                },
                immunityId: this.$route.query.immunityId,
                fileList: [{
                    url: "",
                    status: ""
                }],
                petName: this.$route.query.petName
            }
        },
        mounted() {
            // this.getPetInfos(this.petImmunity.petId)
            this.getImmunityInfo()
            this.getOptions()
        },
        methods: {
            getImmunityInfo(){
                let url = "/api/petImmunity/getImmunityByImmunityId?immunityId=" + this.immunityId
                const that = this
                service({
                    method: "post",
                    url: url
                }).then(res => {
                    if (res.data.code === 100) {
                        res.data.data.immunityTime = moment(res.data.data.immunityTime).format("YYYY-MM-DD")
                        that.petImmunity  = res.data.data
                        that.fileList[0].url = that.petImmunity.immunityImageUrl
                    }
                })
            },
            getOptions: function(){
                let url = "/api/petVac/returnPetVac?petId=" + this.petImmunity.petId;
                const that = this
                service.get(url).then(function (res) {
                    that.petVacs = Array.from( res.data.data)
                    for (let i = 0;i < that.petVacs.length;i++){
                        that.options.push( {
                            'text':that.petVacs[i].vacName + "——" + that.petVacs[i].vacDesc + "",
                            'value':that.petVacs[i].vacName,
                            'position':i
                        })
                    }
                })
            },
            getPetInfos:function (id) {
                const that = this
                Promise.all([
                    new Promise((resolve , reject)=>{
                        let url = "/api/petinfo/getPetInfoById?petId=" + id;
                        console.log(url)
                        service.get(url).then(function (res) {
                            res.data.data.petInfo.petBirthday = moment(parseInt(res.data.data.petInfo.petBirthday)).format('YYYY-MM-DD')
                            that.petInfo = res.data.data.petInfo
                            if (res.data.data.petInfo.petStatus === -1){
                                that.petCheckfalse = res.data.data.petCheckfalse
                            }
                            resolve(true)
                        })
                    }),
                    new Promise((resolve , reject)=>{
                        let url = "/api/petVac/returnPetVac?petId=" + id;
                        service.get(url).then(function (res) {
                            that.petVacs = Array.from( res.data.data)
                            for (let i = 0;i < that.petVacs.length;i++){
                                that.options.push( {
                                    'text':that.petVacs[i].vacName + "——" + that.petVacs[i].vacDesc + "",
                                    'value':that.petVacs[i].vacName,
                                    'position':i
                                })
                            }

                            resolve(true)
                        })
                    }).then(res=>{
                        if (res){
                            this.$Loading.finish()
                        }
                    })
                ])

            },
            doUpload: function() {
                this.$Toast.loading({
                    message: '正在保存中...',
                    forbidClick: true,
                });

                let date = this.petImmunity.immunityTime.substring(0,19);
                date = date.replace(/-/g,'/');
                const data = {
                    petId: this.petImmunity.petId,
                    petCardId:this.petImmunity.petCardId,
                    immunityType: this.petImmunity.immunityType,
                    immunityTime: new Date(date).getTime(),
                    immunityImageUrl: this.petImmunity.immunityImageUrl,
                    petImmunityId: this.petImmunity.petImmunityId,
                    gmtCreate: this.petImmunity.gmtCreate,
                }
                const url = "/api/petImmunity/updateImmunity"
                const that = this

                new Promise((resolve, reject) => {
                    service({
                        "method": "post",
                        "url": url,
                        "data": data
                    }).then(res => {
                        that.$Toast.clear()
                        resolve(res.data.code === 100)
                    })
                }).then(res=>{
                    if (res){
                        that.$VanNotify({ type: 'success', message: '保存成功，请等待管理员审核！',duration: 1000});
                    } else {
                        that.$VanNotify({ type: 'warning', message: '保存失败，请重试！',duration: 1000});
                    }
                })
            },

            returnBack: function () {
                this.$router.back()
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
                    that.petImmunity.immunityImageUrl = this.result
                }
                return true;
            },
            checkCardNumber: function(val) {
                return (val.length > 0)
            },
            checkImmunityType: function(val) {
                return (val.length > 0)
            },
            checkImmunityTime: function(val) {
                return (val.length > 0)
            },
            //校验图片
            checkImage: function(val) {
                return (val.length > 0)
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
            selectImmunityType(value){
                this.isShowImmunityType = false
                this.petImmunity.immunityType = value.value
            },
            //日期被选中
            onDatePick: function(date){
                this.isShowDatePicker = false
                this.petImmunity.immunityTime  = moment(date).format("YYYY-MM-DD")
            },
        }
    }
</script>

<style scoped>

</style>
