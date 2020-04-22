<template>
    <div style="margin-bottom: 60px">
        <van-sticky>
            <header  style="padding-top: 10px;background-color:#f0f0f0;">
                <van-cell style="background-color:#f0f0f0;" :title-class="'header-tittle'" :value-class="'header-value'"  >
                    <template #title>
                        <van-row type="flex">
                            <van-col>
                                <a-avatar  size="large" :src="$store.state.userInfo.avatarUrl"/>
                            </van-col>
                                <div style="margin-left: 14px">
                                    <span style="font-size: 1.2em;display: block;">{{$store.state.userInfo.name}}</span>
                                    <div style="font-size: 0.8em;color: gray;width: 60vw;overflow: hidden; white-space: nowrap; text-overflow: ellipsis;"  class="van-ellipsis">
                                        {{$store.state.userInfo.bio}}
                                    </div>
                                </div>
                        </van-row>
                    </template>
                    <template #default>
                        <van-icon name="vip-card-o" />
                    </template>
                </van-cell>
            </header>

        </van-sticky>

        <div class="van-doc-demo-block__title">
            <span>宠物社区 </span>
        </div>
        <div style="">
            <van-cell is-link to="/mobile/user/blog/myCollection" title="我的收藏" icon="star-o" >
                <template #right-icon>
                    <van-icon name="arrow" style="line-height: inherit;" />
                </template>
            </van-cell>
        </div>
        <div style="margin-top: 2px">
            <van-cell is-link to="/mobile/user/blog/myBlog" title="我的分享" icon="flower-o" >
                <template #right-icon>
                    <van-icon name="arrow" style="line-height: inherit;" />
                </template>
            </van-cell>
        </div>
        <div class="van-doc-demo-block__title">
            <span>消息通知</span>
        </div>

        <div style="margin-top: 2px">
            <van-cell is-link @click="$router.push('/mobile/user/systemNotice')"  >
                <template #icon>
                    <template v-if="$store.state.sysPetMessage.unReadCount > 0">
                        <a-badge style="" dot>

                            <van-icon style="line-height: 22px;" name="volume-o"></van-icon>
                        </a-badge>
                    </template>
                    <template v-else>
                        <a-badge style="">
                            <van-icon style="line-height: 22px;" name="volume-o"></van-icon>
                        </a-badge>
                    </template>

                </template>
                <template #title>
                    <span style="padding-left: 5px"> 系统通知</span>
                </template>
                <template #right-icon>
                    <van-icon name="arrow" style="line-height: inherit;" />
                </template>
                <template v-if="$store.state.sysPetMessage.unReadCount > 0" #default>
                    <span style="color: #ed5a65">
                                            {{$store.state.sysPetMessage.unReadCount }}条未读

                    </span>
                </template>
            </van-cell>
        </div>


        <div class="van-doc-demo-block__title">
            <span>个人中心 </span>
        </div>

        <div style="margin-top: 2px">
            <van-cell is-link to="/mobile/user/manage" title="我的资料" icon="label-o" >
                <template #right-icon>
                    <van-icon name="arrow" style="line-height: inherit;" />
                </template>
            </van-cell>
        </div>

        <div style="margin-top: 2px">
            <van-cell @click="isShowChangePwd = true" is-link to="#" title="修改密码" icon="edit" >
                <template #right-icon>
                    <van-icon name="arrow" style="line-height: inherit;" />
                </template>
            </van-cell>
        </div>
        <div style="margin-top: 2px">
            <van-cell is-link @click="logOut" title="退出登录" >
                <template #right-icon>
                    <svg t="1576500513143" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="24612" width="20" height="20"><path d="M991.25 515.938c0.281-1.312 0.75-2.531 0.75-3.844s-0.469-2.625-0.75-3.844c-0.281-1.406-0.281-2.906-0.844-4.312-0.469-1.219-1.5-2.25-2.25-3.469-0.844-1.219-1.406-2.625-2.438-3.75l-130.219-130.969c-8.531-8.531-22.313-8.625-30.844-0.094-8.531 8.531-8.625 22.313-0.094 30.844l93.187 93.75h-340.313c-12.094 0-21.844 9.75-21.844 21.844s9.75 21.844 21.844 21.844h340.219l-93.188 93.75c-8.531 8.531-8.438 22.313 0.094 30.844 4.219 4.219 9.844 6.375 15.375 6.375 5.625 0 11.25-2.156 15.469-6.469l130.219-130.875c1.125-1.125 1.688-2.438 2.438-3.75 0.75-1.125 1.781-2.156 2.25-3.469 0.656-1.5 0.656-3 0.938-4.406zM250.156 577.438c-36.094 0-65.438-29.344-65.438-65.438s29.344-65.438 65.438-65.438 65.438 29.344 65.438 65.438-29.344 65.438-65.438 65.438zM250.156 490.156c-12 0-21.844 9.75-21.844 21.844 0 12 9.75 21.844 21.844 21.844 12 0 21.844-9.75 21.844-21.844 0-12-9.75-21.844-21.844-21.844z" fill="#323233" p-id="24613"></path><path d="M773.844 446.562v-327.281c0-24.094-19.5-43.594-43.594-43.594h-305.531c0-24.094-19.5-43.594-43.594-43.594l-349.125 87.188v785.438l349.125 87.281c24.094 0 43.594-19.5 43.594-43.594h305.438c24.094 0 43.594-19.5 43.594-43.594v-327.375h-43.594v327.281h-305.438v-785.438h305.438v327.281h43.688zM75.594 870.688v-717.375l305.531-76.313v870l-305.531-76.313z" fill="#323233" p-id="24614"></path></svg>                         </span>
                </template>
            </van-cell>
        </div>





        <van-popup v-model="isShowChangePwd" position="bottom"  round :style="{ height: '30%' }">
            <div style="margin-top: 20px">
                <van-form @failed="onFailed" :colon="true" :validate-first="false" @submit="doChangePwd">
                    <van-field v-model="password.pass" ref="petType" label="密码 " placeholder="请输入密码"
                               type="password"
                               :rules="[{ validator: checkPass, message: '请输入密码，长度6-12位！' }]">
                    </van-field>

                    <van-field v-model="password.checkPass" label="确认密码" placeholder="请再次输入密码"
                               type="password"
                               :rules="[{ validator: checkRePass, message: '两次密码输入不一致！' }]">
                    </van-field>
                    <div style="margin: 16px;">
                        <van-button round block type="info" native-type="submit">
                            提交
                        </van-button>
                    </div>
                </van-form>

            </div>
        </van-popup>
    </div>

</template>

<script>
    import {Avatar} from "ant-design-vue"
    import service from "../../../network/axios"

    export default {
        name: "MobileUserIndex",
        data() {
            return{
                isShowChangePwd: false,
                password: {
                    pass: "",
                    checkPass: ""
                }
            }
        },
        components: {
            AAvatar: Avatar
        },
        methods:{
            checkPass(val){
                return (val.length >= 6 && val.length < 12 )
            },
            checkRePass(val){
                return (val === this.password.pass)
            },
            onFailed(){
                this.$Toast.fail("请填写")
            },
            doChangePwd(){
                let url = "/api/user/resetPassword?password=" + this.password.pass;
                const that = this
                service.get(url).then(res => {
                    if (res.data.code === 100) {
                        that.isShowChangePwd = false
                        that.$Toast.success("密码修改成功！")
                    } else {
                        that.$Toast.fail("密码修改失败，请重试！")
                    }
                })
            },
            logOut:function () {
                this.$util.logOut(this)
            }
        }
    }
</script>

<style scoped>

    header {
        background-color: #fff;
        margin: 0;
        padding: 0;
    }

    .header-tittle {

    }

    .header-value {
        height: 50px;
        line-height: 50px;
    }
    .van-doc-demo-block__title {
        margin: 0;
        padding: 32px 16px 16px;
        color: rgba(69, 90, 100, 0.6);
        font-weight: normal;
        font-size: 14px;
        line-height: 16px;
    }

</style>
