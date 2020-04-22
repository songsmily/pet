<template>
    <div style="margin-bottom: 10px">
        <van-sticky>
            <van-nav-bar title="我的资料" left-text="返回" @click-left="returnBack" left-arrow>

            </van-nav-bar>
        </van-sticky>
        <div>
            <van-form  @failed="onFailed" :colon="true" :validate-first="false" @submit="doUpload">

                <van-field v-model="userInfo.name" label="用户名"
                           :rules="[{ validator: checkName, message: nameNotice }]">

                </van-field>
                <van-field v-model="userInfo.realName" label="真实姓名"
                           :rules="[{ validator: checkRealName, message: '请输入真实用户名，长度2-30位' }]">

                </van-field>
                <van-field v-model="userInfo.phone" label="电话号码" disabled>

                </van-field>

                <van-field v-model="userInfo.email" label="邮件地址"
                           :rules="[{ validator: checkEmail, message: '请输入正确的邮件地址' }]">

                </van-field>
                <van-field v-model="userInfo.location" ref="location" label="地区" @click="isShowLocationChoice = true"
                           :rules="[{ validator: checkLocation, message: '请选择地区！' }]">

                </van-field>
                <van-popup v-model="isShowLocationChoice" position="bottom">
                    <van-picker show-toolbar :columns="options" @cancel="isShowLocationChoice = false" @confirm="selectLocation"/>
                </van-popup>


                <van-field v-model="userInfo.addr" label="详细地址"
                           :rules="[{ validator: checkAddr, message: '请输入详细地址，长度5-200位' }]">

                </van-field>

                <van-field v-model="userInfo.bio" label="个性签名"
                           :rules="[{ validator: checkBio, message: '请输入个性签名，长度1-200位' }]">
                </van-field>


                <van-field name="uploader" label="头像"
                           :rules="[{ validator: checkAvatar, message: '请选择图片！'}]">
                    <template #input>
                        <van-uploader v-model="fileList" multiple :before-read="checkImageFileType"  :max-count="1"/>
                    </template>
                </van-field>
                <div style="margin: 16px;">
                    <van-button round block type="info" native-type="submit">
                        提交修改
                    </van-button>
                </div>
            </van-form>


        </div>
    </div>
</template>

<script>
    import service from "../../../network/axios"

    export default {
        name: "MobileUserManage",
        data() {
            return {
                userInfo:{
                    avatarUrl:this.$store.state.userInfo.avatarUrl,
                    accountId:this.$store.state.userInfo.accountId,
                    accountType:this.$store.state.userInfo.accountType,
                    id:this.$store.state.userInfo.id,
                    name:this.$store.state.userInfo.name,
                    bio:this.$store.state.userInfo.bio,
                    realName:this.$store.state.userInfo.realName,
                    email:this.$store.state.userInfo.email,
                    location:this.$store.state.userInfo.location,
                    addr:this.$store.state.userInfo.address,
                    phone:this.$store.state.userInfo.phone
                },
                options:[],
                selectedOptions: [],
                isShowLocationChoice: false,
                fileList: [{
                    url: this.$store.state.userInfo.avatarUrl
                }],
                nameNotice: "",
            }
        },
        mounted(){
            this.getOptions()
            // this.getImgBase64()
            // if (this.userInfo.location){
            //     this.getUserLocationArray();
            // }
        },
        methods: {
            getImgBase64:function(){
                let url = "/api/user/getImgBase64?imgUrl=" + this.userInfo.avatarUrl
                const that = this
                service({
                    method: "get",
                    url: url
                }).then(res => {
                    if (res.data.code === 100) {
                        that.fileList = [
                            {
                                content: res.data.data,
                                file: File,
                                status: ""
                            }
                        ]
                    }
                })
            },
            getOptions:function(){
                let url = "/api/plot/getPlotAndBuild"
                const that = this
                service.get(url).then(function (res) {
                    let location = res.data.data
                    let newLocation = []
                    location.forEach(obj => {
                        let levelOne = {
                            value: obj.value,
                            text: obj.label,
                            children : []
                        }
                        let children = []
                        obj.children.forEach(secObj => {
                            let levelTwo = {
                                value: secObj.value,
                                text: secObj.label
                            }
                            children.push(levelTwo)
                        })
                        levelOne.children = children
                        newLocation.push(levelOne)
                    })
                    that.options = newLocation
                })
            },
            getUserLocationArray:function(){
                let url = "/api/build/getUserLocationArray?build_name=" + this.userInfo.location
                const that = this;
                service.get(url).then(function (res) {
                    let options = [res.data.data.plotId,res.data.data.buildId]
                    that.selectedOptions = options
                    that.$Loading.finish()

                })
            },
            doUpload: function(){
                this.$VanDialog.confirm({
                    message: '确认保存修改吗？',
                }).then(() => {
                    const that = this
                    that.$Toast.loading({
                        message: '保存修改中...',
                        forbidClick: true,
                    });
                    let url = "/api/user/doUpdate"
                    let data =  this.userInfo
                    service({
                        method: "POST",
                        url: url,
                        data:data
                    }).then(res => {
                        that.$Toast.clear()
                        if (res.data.code === 100) {
                            that.$util.replaceUserInfo(that)
                            that.$Toast.success('修改成功');
                        }else if (res.data.code === 60002)  {
                            that.$Toast.fail('签名信息疑似违规，请修改后重试！');
                        } else if (res.data.code === 60003)  {
                            that.$Toast.fail('头像图片疑似违规，请修改后重试！');
                        } else {
                            that.$Toast.fail('保存修改失败，请重试！');
                        }
                    })
                }).catch(() => {
                })
            },
            returnBack() {
                this.$router.back()
            },
            //Avatar
            checkAvatar: function(val) {
                return (val.length > 0)
            },
            //Email
            checkEmail: function(val) {
                return (/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(val))
            },
            //Bio
            checkBio: function(val) {
                return (val.length >= 1 && val.length < 200)
            },
            //Addr
            checkAddr: function(val) {
                return (val.length >= 5 && val.length < 200)
            },
            //Location
            checkLocation: function(val) {
                return (val.length > 0)
            },
            //校验真实姓名
            checkRealName: function(val) {
                return (val.length > 2 && val.length < 30)
            },
            //校验用户名
            checkName: function(val) {
                const that = this
                return new Promise((resolve) => {
                    if (val.length > 1 && val.length < 20){
                        let url = "/api/user/isRepeatName?name=" + val
                        const that = this
                        return service.get(url).then(function (res) {
                            if(res.data.data){
                                resolve(true)
                            }else{
                                that.nameNotice = "该用户名已存在"
                                resolve(false)
                            }
                        })
                    } else {
                        that.nameNotice = "请输入用户名，长度1-20位"
                        resolve(false)
                    }
                })

            },
            //选中Location
            selectLocation(value){
                this.isShowLocationChoice = false
                this.userInfo.location = value[1]
                // this.petImmunity.immunityType = value.value
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
                    that.userInfo.avatarUrl = this.result
                }
                return true;
            },
            //表单校验失败
            onFailed(errorInfo) {
                this.$Toast.fail("请正确填写所有信息！")
            },
        }
    }
</script>

<style scoped>

</style>
