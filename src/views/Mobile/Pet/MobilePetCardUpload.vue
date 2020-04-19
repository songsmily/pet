<template>
    <div style="padding-bottom: 50px;">
        <van-sticky>
            <van-nav-bar title="新增宠物信息" left-text="返回" @click-left="returnBack" left-arrow>
            </van-nav-bar>
        </van-sticky>
        <div style="margin-top: 10px">
            <van-form  @failed="onFailed" :colon="true" :validate-first="false" @submit="doUpload">
                <van-field v-model="petName" label="宠物昵称" disabled="">

                </van-field>
                <van-field v-model="petCard.cardNumber" ref="cardNumber" label="证书编号"  placeholder="请输入免疫证书编号"
                           :rules="[{ validator: checkCardNumber, message: '请输入免疫证书编号！' }]">

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

    export default {
        name: "MobilePetCardUpload",
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
                petCard: {
                    petId: this.$route.query.petId,
                    cardNumber: "",
                    cardImageUrl: ""
                },
                fileList: [],
                petName: this.$route.query.petName
            }
        },
        created() {
          // this.getOptions()
        },
        methods: {
            doUpload: function() {
                this.$Toast.loading({
                    message: '正在保存中...',
                    forbidClick: true,
                });

                let date = this.petInfo.petBirthday.substring(0,19);
                date = date.replace(/-/g,'/');
                this.petInfo.petBirthday = new Date(date).getTime()

                let url = "/api/petCard/uploadPetCard"
                let that = this

                new Promise((resolve, reject) => {
                    service({
                        "method": "post",
                        "url": url,
                        "data": that.petCard
                    }).then(res => {
                        resolve(res.data.code === 100)
                    })
                }).then(res=>{
                    if (res){
                        that.$VanNotify({ type: 'success', message: '保存成功，请等待管理员审核！',duration: 1000});
                        setTimeout(function () {
                            that.$router.back()
                        },1000)
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
                    that.petCard.cardImageUrl = this.result
                }
                return true;
            },
            checkCardNumber: function(val) {
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
            }
        }
    }
</script>

<style scoped>

</style>
