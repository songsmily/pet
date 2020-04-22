<template>
    <div style="margin-bottom: 10px">
        <van-sticky>
            <van-nav-bar title="系统通知" left-text="返回" @click-left="returnBack" left-arrow>

            </van-nav-bar>
        </van-sticky>

        <!--内容页-->
        <div style="padding: 2px">
            <div class="message_all_do">
                <el-button-group>
                    <el-button v-if="this.$store.state.sysPetMessage.unReadCount > 0" @click="allHaveRead" type="primary" size="mini" icon="el-icon-edit">全部标为已读</el-button>
                    <el-button v-if="this.$store.state.sysPetMessage.data.length > 0" type="danger" size="mini" @click="deleteAllNotice" icon="el-icon-delete">删除全部通知</el-button>
                </el-button-group>
            </div>
<!--            <van-list-->
<!--                    v-model="loading"-->
<!--                    :finished="finished"-->
<!--                    finished-text="没有更多了"-->
<!--                    @load="load"-->
<!--            >-->
            <el-row v-infinite-scroll="load">

                <div  v-if="list.data.length > 0">
                        <div v-for="(item,i) in this.list.data" class="message_col">
                            <div class="message_top">
                                <div class="message_status">
                                    <el-tag v-if="item.noticeStatus == 0" size="mini" type="danger">未读</el-tag>
                                    <el-tag v-else-if="item.noticeStatus == 1" size="mini" type="primary">已读</el-tag>
                                </div>
                                <span class="message_tittle">
                                {{reverseTittle(item.type)}}
                            </span>
                                <span class="message_time">
                                {{$util.formatTime(item.gmtCreate, null)}}
                            </span>
                            </div>
                            <div class="message_bottom">
                            <span v-if="item.type!==12" class="message_content">

                                {{reverseContent(item.type)}}
                            </span>
                                <span v-else class="message_content">
                                {{item.noticeDesc}}
                            </span>
                            </div>
                            <div class="message_do">
                                <el-dropdown trigger="click">
                              <span class="el-dropdown-link">
                                  <i class="el-icon-arrow-down el-icon-more"></i>
                              </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item v-if="item.noticeStatus==0" icon="el-icon-circle-check" @click.native="haveRead(item.id,i)">标为已读</el-dropdown-item>
                                        <el-dropdown-item icon="el-icon-delete" @click.native="deleteNotice(item.id,i)">删除通知</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </div>

                        </div>
                </div>
                <el-col v-else :span="24" style="text-align: center">
                    <van-empty description="暂无数据" />
                </el-col>

                <div v-if="finished" style="text-align: center">
                    没有更多了......
                </div>
                <div v-if="loading" style="text-align: center">
                    <van-loading size="24px">加载中...</van-loading>
                </div>
            </el-row>
<!--            </van-list>-->
        </div>
    </div>
</template>

<script>
    import {
        Row,
        Col,
        Tag,
        Button,
        ButtonGroup,
        Dropdown,
        DropdownMenu,
        DropdownItem
    } from "element-ui"
    import moment from "moment"
    import infiniteScroll from 'vue-infinite-scroll'
    import service from "network/axios"

    export default {
        name: "MobileSysNotice",
        directives: {infiniteScroll},
        components: {
            ElRow: Row,
            ElCol: Col,
            ElTag: Tag,
            ElButtonGroup: ButtonGroup,
            ElButton: Button,
            ElDropdown: Dropdown,
            ElDropdownMenu: DropdownMenu,
            ElDropdownItem: DropdownItem
        },
        data() {
            return {
                loading: false,
                finished: false,
                list: {
                    limit: 0,
                    data: []
                }
            }
        },
        created() {
        },
        mounted() {
        },
        updated() {

        },
        methods: {
            load: function () {
                if (this.finished)
                    return
                this.loading = true;

                if (this.list.limit === 0) {
                    this.list.limit += 6
                } else {
                    this.list.limit += 3
                }

                const that = this
                let url = "/api/sysPetNotice/getMessage?topNumber=" + this.list.limit
                service.post(url).then(function (res) {
                    // 加载状态结束
                    that.loading = false;
                    if (res.data.data.list.length === that.list.data.length){
                        that.finished = true;
                    }
                    that.list.data = res.data.data.list
                    that.list.unReadCount = res.data.data.unReadCount
                    that.$store.state.sysPetMessage.data = res.data.data.list
                    that.$store.state.sysPetMessage.unReadCount = res.data.data.unReadCount
                })
            },
            haveRead:function(id,i){
                let url = "/api/sysPetNotice/haveRead?id=" + id
                const that = this
                service.get(url).then(function (res) {
                    if (res.data.code === 100){
                        that.$store.state.sysPetMessage.data[i].noticeStatus = 1;
                        that.$store.state.sysPetMessage.unReadCount -= 1;
                    }else{
                        that.$Message.warning("操作失败！")
                    }
                })
            },
            allHaveRead:function(){
                let url = "/api/sysPetNotice/allHaveRead"
                const that = this
                service.get(url).then(function (res) {
                    if (res.data.code === 100){
                        that.$util.returnMessage(that);
                    }else{
                        that.$Message.warning("操作失败！")
                    }
                })
            },
            deleteNotice:function(id,i){
                let url = "/api/sysPetNotice/deleteNotice?id=" + id
                const that = this
                service.get(url).then(function (res) {
                    if (res.data.code === 100){
                        if (that.$store.state.sysPetMessage.data[i].noticeStatus === 0){
                            that.$store.state.sysPetMessage.unReadCount -= 1;
                        }
                        that.$store.state.sysPetMessage.data.splice(i,1);
                    }else{
                        that.$Message.warning("操作失败！")
                    }
                })
            },
            deleteAllNotice:function(){
                this.$msgbox.confirm('确定删除所有通知吗, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let url = "/api/sysPetNotice/deleteAllNotice"
                    const that = this
                    service.get(url).then(function (res) {
                        if (res.data.code === 100){
                            that.$util.returnMessage(that);
                        }else{
                            that.$Message.warning("操作失败！")
                        }
                    })
                })

            },
            returnBack(){
                this.$router.back()
            }
        },
        computed: {
            reverseTittle() {
                return function (type) {
                    switch (type) {
                        case 1:
                            return "宠物信息已审核通过！"
                        case 2:
                            return "宠物信息审核失败！"
                        case 3:
                            return "宠物免疫证书信息已审核通过！"
                        case 4:
                            return "宠物免疫证书信息审核失败！"
                        case 5:
                            return "宠物免疫信息审核通过！"
                        case 6:
                            return "宠物免疫信息审核失败！"
                        case 11:
                            return "请及时上传免疫证书！"
                        case 12:
                            return "请及时上传疫苗信息！"
                    }
                }
            },
            reverseTime() {
                return function (time) {
                    return moment(time).format('YYYY-MM-DD HH:mm:ss')
                }
            },
            reverseContent() {
                return function (type) {
                    switch (type) {
                        case 1:
                            return "您提交的宠物信息已审核通过，请及时提交宠物防疫信息！"
                        case 2:
                            return "您提交的宠物信息未审核通过，请前往【宠物管理 -> 宠物信息管理】查看详细信息！"
                        case 3:
                            return "您提交的宠物免疫证书信息已审核通过！"
                        case 4:
                            return "您提交的宠物免疫证书未审核通过，请前往【宠物管理 -> 宠物防疫管理】查看详细信息！"
                        case 5:
                            return "您提交的宠物免疫信息已审核通过！"
                        case 6:
                            return "您提交的宠物免疫信息未审核通过，请前往【宠物管理 -> 宠物防疫管理】查看详细信息！"
                        case 11:
                            return "您饲养的宠物还未上传免疫证书，请及时前往【宠物管理 -> 宠物防疫管理】提交信息！"
                    }
                }
            }

        }
    }
</script>

<style scoped>

    .message_all_do{
        margin-top: 10px;
        text-align: right;
    }

    .message_col {
        line-height: 24px;
        position: relative;
        padding: 12px 16px;
        background-color: #fff;
        margin-bottom: 10px;
        border-radius: 4px;
        margin-top: 10px;
    }

    .message_tittle {
        color: #333;
        font-weight: 700;
        line-height: 24px;
    }

    .message_time {
        color: #999;
        font-size: 12px;
        line-height: 22px;
        margin: 0 10px;
        box-sizing: border-box;
    }

    .message_bottom {
        color: #666;
        padding-left: 8px;
    }

    .message_content {
        color: #666;
        line-height: 24px;
        font-size: 12px;
    }

    .message_status {
        /*margin-right: 0;*/
        margin-bottom: 5px;
        /*float: left;*/
    }

    .message_do {
        text-align: right;
        margin-top: 5px;
    }


</style>
