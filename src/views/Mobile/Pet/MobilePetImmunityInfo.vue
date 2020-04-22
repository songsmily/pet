<template>
    <div style="padding-bottom: 50px">
        <van-sticky>
            <van-nav-bar title="宠物免疫信息" left-text="返回" @click-left="returnBack" left-arrow>

            </van-nav-bar>
        </van-sticky>
        <div style="">
            <template v-if="'{}'!==JSON.stringify(petInfo)" >
                <div class="wrapper-md"  v-for="(item, i) in petInfo.petCard.petImmunities">
                    <van-panel :title="item.immunityType"  :status="reverseStatus(item.immunityStatus)">
                        <div>
                            <van-cell value="上传日期" >
                                <template #title>
                                    {{item.gmtCreate | formatDate}}
                                </template>
                            </van-cell>
                            <van-cell value="疫苗注射日期" >
                                <template #title>
                                    {{item.immunityTime | formatDate}}
                                </template>
                            </van-cell>
                        </div>


                        <template #footer>
                            <div style="text-align: right">

                                <van-button size="small" icon="eye-o"   @click="showImmunityDetail(item)">查看详情</van-button>

                                <van-button size="small" icon="edit" type="warning" v-if="item.immunityStatus === 2" @click="$router.push('/mobile/user/pet/reUploadImmunity?petCardId=' + item.petCardId + '&petId=' + item.petId+ '&immunityId=' + item.petImmunityId + '&petName=' + petInfo.petName) " style="margin-left: 10px">修改信息</van-button>
                            </div>

                        </template>
                    </van-panel>
                </div>

            </template>
<!--            修改-->
            <van-popup v-model="isShowImmunityChange" position="bottom"  round :style="{ height: '70%' }">

            </van-popup>
<!--            查看详情-->
            <van-popup v-model="isShowImmunityInfo" position="bottom"  round :style="{ height: '70%' }">
                <div style="padding: 10px">
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
                        <span class="labelVal">疫苗标签：</span>
                        <div class="img_container">
                            <div>
                                <img  :src="petImmunity.immunityImageUrl" alt="">
                            </div>
                        </div>

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
                                   :value="petImmunity.immunityTime | formatDate"
                                   placeholder="请选择疫苗注射日期">
                        </el-input>

                    </div>
                    <div class="row_content">
                        <span class="labelVal">上传日期：</span>

                        <el-input  size="large" class="timePick "
                                   :value="petImmunity.gmtCreate | formatDate"
                                   placeholder="请选择疫苗注射日期">
                        </el-input>

                    </div>

                </div>
            </van-popup>
        </div>
    </div>
</template>

<script>
    import moment from 'moment'
    import service from "../../../network/axios"
    import {Button,Input,Alert} from "element-ui"
    export default {
        name: "MobilePetImmunityInfo",
        components: {

            ElButton:Button,

            ElInput:Input,
            ElAlert:Alert
        },
        data() {
            return {
                petInfo:{},
                activeNames: ['1'],
                isShowImmunityInfo: false,
                isShowImmunityChange: false,
                petImmunity: {}
            }
        },
        created() {
            this.getPetImmunity(this.$route.query.petId)
        },
        filters:{
            formatDate: function (value) {
                return moment(value).format('YYYY-MM-DD')
            }
        },
        computed: {
          reverseStatus(){
              return function(val) {
                  if (val === 0) {
                      return "待审核"
                  } else if (val === 1) {
                      return "审核通过"
                  }  else {
                      return "审核失败"
                  }
              }
          }
        },
        methods:{
            getPetImmunity:function (petId) {
                let url = "/api/petCard/returnPetCardImmunityInfosByPetId?petId=" + petId
                const that = this
                service.get(url).then(function (res) {
                    that.petInfo = res.data.data
                })
            },
            showImmunityDetail(item) {
                this.isShowImmunityInfo = true
                this.petImmunity = item
            },
            returnBack() {
                this.$router.back()
            }
        }
    }
</script>

<style scoped>
    .image >img{
        height: 300px;
    }
    .c {
        color: red;
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
        border-radius: 10px;
        width: 100%;
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
