<template>
    <div style="">
        <van-sticky>
            <van-nav-bar left-text="返回" title="帖子详情" @click-left="returnBack" left-arrow>

            </van-nav-bar>
        </van-sticky>
        <div id="post-panel">
            <div class="blog-header">
                <div class="blog-title">
                    {{blogInfo.blogTitle}}
                </div>
                <div class="blog-tags">
                    <van-tag v-for="(tagItem , i ) in blogInfo.blogTag " plain mark type="success">{{tagItem.tagName}}
                    </van-tag>
                </div>
                <!--                            底部内容-->
                <div class="blog-item-bottom">
                    <!--                                用户信息-->
                    <div class="blog-user">
                        <!--                                    用户头像-->
                        <span class="blog-user-avatar">
                                            <img :src="blogInfo.avatarUrl" alt="">
                                    </span>
                        <!--                                    用户名-->
                        <span class="blog-user-name">
                                        {{blogInfo.name}}
                                    </span>
                    </div>
                    <!--                                评论点赞信息-->
                    <div class="blog-desc">
                        <!--                                    发布时间-->
                        <span class="blog-time">
                                         <i class="fontello fontello-clock-o text-muted"></i>
                                        {{$util.formatTime(blogInfo.createdTime, null)}}
                                    </span>
                        <!--                                    评论数-->
                        <span class="blog-comment-count">
                                        <i class="iconfont icon-comments-o text-muted"></i>
                                        {{blogInfo.blogComment}}
                                    </span>
                        <!--                                    点赞数-->
                        <span class="blog-good-count">
                                         <a-icon type="like"></a-icon>
                                        {{blogInfo.blogGoods}}
                                    </span>
                        <!--                                    收藏数-->
                        <span class="blog-collect-count">
                                         <i class="el-icon-star-off"></i>
                                        {{blogInfo.blogCollect}}
                                    </span>
                    </div>
                </div>

            </div>
            <van-divider>正文</van-divider>
            <div class="blog-content" v-html="content">

            </div>
            <van-divider>评论</van-divider>
            <!--评论区-->
            <a-comment v-for="(item,i) in commentInfo">
                <template slot="actions">
                    <span >{{$util.formatTime(item.createdTime,null)}}</span>

                    <span key="comment-basic-like">
                          <a-icon :theme="item.isCommentGood ? 'twoTone': 'outlined'" twoToneColor="#52c41a" @click="doCommentGood(item)" type="like"/>
                        <span style="padding-left: 1px;cursor: auto">
                          {{item.commentGood}}
                        </span>
                    </span>

                    <!--回复按钮-->
                    <span  @click="secCommentAction(item)" > <a-icon type="message"></a-icon>&nbsp;&nbsp;回复</span>
                </template>
                <a slot="author">{{item.commentUserName}}</a>
                <a-avatar
                        slot="avatar"
                        :src="item.commentUserAvatarUrl"
                />
                <p slot="content" v-html="item.commentContent">
                </p>

                <!-- 二级评论区-->
                <a-comment v-if="item.commentSecList.length !== 0" v-for="(itemSec,i) in item.commentSecList">
                    <template slot="actions">
                        <span >{{$util.formatTime(itemSec.createdTime,null)}}</span>

                    </template>
                    <a slot="author">{{itemSec.secCommentUserName}}</a>
                    <a-avatar
                            slot="avatar"
                            :src="itemSec.secCommentUserAvatarUrl"
                    />
                    <p slot="content" v-html="itemSec.secContent">
                    </p>

                </a-comment>
            </a-comment>
            <!--二级评论抬头-->
            <template v-if="isSecond">
                <el-alert type="success"   effect="dark" @close="unsetSecondComment">
                    <slot name="title">
                        <span v-html="secondPreview"></span>
                    </slot>
                </el-alert>
            </template>
            <!--撰写评论区-->
            <div class="comment-actions">
                <el-popover
                        placement="top"
                        width="300"
                        trigger="click">
                    <ul class="comment-actions-emojibox">
                        <template v-for="(item,i) in emoji">
                            <li @click="choiceEmoji(item.value,item.icon)" :value="item.value">
                                <img :src="item.icon" alt="">
                            </li>
                        </template>
                    </ul>
                    <a-tooltip  slot="reference" class="comment-actions-icon">
                        <a-icon  type="smile" theme="outlined"/>

                    </a-tooltip>
                </el-popover>
<!--                预览 -->
<!--                    <a-icon @click="previewContent" class="comment-actions-icon" type="eye" theme="outlined"/>-->
            </div>
            <el-form label-position="top" :model="form" :rules="rules" ref="form" class="demo-ruleForm">

                <el-form-item  prop="commentContent">
                    <el-input placeholder="请输入评论内容" type="textarea" ref="commentContent" v-model="form.commentContent"
                              :autosize="{ minRows: 5, maxRows: 5}"></el-input>
                </el-form-item>
                <el-form-item>
                    <a-button type="primary" @click="postComment('form')">发表评论</a-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="blog-handle" v-if="this.blogInfo.userId != this.$store.state.userInfo.id">
            <div style="width: 60%;margin-left: 5px">
                <a-input placeholder="评论..." @click="setCommentFocus" >
                    <a-icon slot="prefix" type="message" />
                </a-input>
            </div>
            <div class="good-collect">
                <van-icon v-if="isBlogGood" name="good-job"  color="#00a1d6"  @click="doBlogGood"/>
                <van-icon v-else  name="good-job-o" @click="doBlogGood" />
                <van-icon v-if="isBlogConnect" name="star"   color="#00a1d6" @click="doBlogConnect" />
                <van-icon v-else name="star-o" @click="doBlogConnect"/>
            </div>
        </div>
<!--        评论框-->
        <van-popup v-model="isShowCommentBox" position="bottom"  :style="{height:'60%'}">

        </van-popup>
    </div>
</template>

<script>
    import service from "network/axios"
    import marked from 'marked'
    import moment from "moment"
    import {Breadcrumb, BreadcrumbItem, Col, Row, Popover, Table, TableColumn,Drawer,Form,FormItem,Input,Alert} from "element-ui"
    import {
        Tag as ATag,
        Avatar as AAvatar,
        Icon as AIcon,
        Tooltip as ATooltip,
        Divider as ADivider,
        Comment as AComment,
        Input as AInput,
        Drawer as ADrawer,
        Button as AButton,
        Empty as AEmpty
    } from "ant-design-vue"
    export default {
        name: "MobileBlogDetail",
        components: {
            ElBreadcrumb: Breadcrumb,
            ElBreadcrumbItem: BreadcrumbItem,
            ElRow: Row,
            ElCol: Col,
            ATag,
            AAvatar,
            AIcon,
            ATooltip,
            ADivider,
            AComment,
            ATextarea: AInput.TextArea,
            ElPopover: Popover,
            ElTableColumn: TableColumn,
            ElTable: Table,
            ADrawer,
            AButton,
            ElDrawer:Drawer,
            ElForm:Form,
            ElFormItem:FormItem,
            ElInput:Input,
            AInput,
            ElAlert:Alert,
            AEmpty
        },
        data() {
            return {
                isShowCommentBox: false,
                //帖子ID
                blogId: this.$route.query.blogId,
                //帖子信息
                blogInfo: {},
                //评论信息
                commentInfo: {},
                //
                content: "",
                //点赞数
                goods: 0,
                //是否点赞
                isBlogGood: false,
                //是否收藏
                isBlogConnect: false,
                //格式化工具
                moment,
                //评论内容
                commentContent: '',
                //评论HTMl
                commentHtml: "",
                //emoji json
                emoji: [{
                    icon: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/7a/shenshou_thumb.gif",
                    value: "[草泥马]"
                }, {
                    icon: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/60/horse2_thumb.gif",
                    value: "[神马]"
                }, {
                    icon: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/bc/fuyun_thumb.gif",
                    value: "[浮云]"
                }, {
                    icon: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/c9/geili_thumb.gif",
                    value: "[给力]"
                }, {
                    icon: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/f2/wg_thumb.gif",
                    value: "[围观]"
                }, {
                    icon: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/70/vw_thumb.gif",
                    value: "[威武]"
                }, {
                    icon: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/6e/panda_thumb.gif",
                    value: "[熊猫]"
                }, {
                    icon: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/81/rabbit_thumb.gif",
                    value: "[兔子]"
                }, {
                    icon: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/bc/otm_thumb.gif",
                    value: "[奥特曼]"
                }, {
                    icon: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/15/j_thumb.gif",
                    value: "[囧]"
                }, {
                    icon: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/89/hufen_thumb.gif",
                    value: "[互粉]"
                }, {
                    icon: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/c4/liwu_thumb.gif",
                    value: "[礼物]"
                }, {
                    icon: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/ac/smilea_thumb.gif",
                    value: "[呵呵]"
                }, {
                    icon: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/0b/tootha_thumb.gif",
                    value: "[嘻嘻]"
                }, {
                    icon: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/6a/laugh.gif",
                    value: "[哈哈]"
                }, {
                    icon: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/14/tza_thumb.gif",
                    value: "[可爱]"
                }, {
                    icon: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/af/kl_thumb.gif",
                    value: "[可怜]"
                }, {
                    icon: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/a0/kbsa_thumb.gif",
                    value: "[挖鼻屎]"
                }, {
                    icon: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/f4/cj_thumb.gif",
                    value: "[吃惊]"
                }, {
                    icon: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/6e/shamea_thumb.gif",
                    value: "[害羞]"
                }, {
                    icon: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/c3/zy_thumb.gif",
                    value: "[挤眼]"
                }, {
                    icon: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/29/bz_thumb.gif",
                    value: "[闭嘴]"
                }, {
                    icon: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/71/bs2_thumb.gif",
                    value: "[鄙视]"
                }, {
                    icon: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/6d/lovea_thumb.gif",
                    value: "[爱你]"
                }, {
                    icon: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/9d/sada_thumb.gif",
                    value: "[泪]"
                }, {
                    icon: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/19/heia_thumb.gif",
                    value: "[偷笑]"
                }, {
                    icon: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/8f/qq_thumb.gif",
                    value: "[亲亲]"
                }, {
                    icon: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/b6/sb_thumb.gif",
                    value: "[生病]"
                }, {
                    icon: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/58/mb_thumb.gif",
                    value: "[太开心]"
                }, {
                    icon: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/17/ldln_thumb.gif",
                    value: "[懒得理你]"
                }, {
                    icon: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/98/yhh_thumb.gif",
                    value: "[右哼哼]"
                }, {
                    icon: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/6d/zhh_thumb.gif",
                    value: "[左哼哼]"
                }, {
                    icon: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/a6/x_thumb.gif",
                    value: "[嘘]"
                }, {
                    icon: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/af/cry.gif",
                    value: "[衰]"
                }, {
                    icon: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/73/wq_thumb.gif",
                    value: "[委屈]"
                }, {
                    icon: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/9e/t_thumb.gif",
                    value: "[吐]"
                }, {
                    icon: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/f3/k_thumb.gif",
                    value: "[打哈欠]"
                }, {
                    icon: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/27/bba_thumb.gif",
                    value: "[抱抱]"
                }, {
                    icon: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/7c/angrya_thumb.gif",
                    value: "[怒]"
                }, {
                    icon: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/5c/yw_thumb.gif",
                    value: "[疑问]"
                }, {
                    icon: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/a5/cza_thumb.gif",
                    value: "[馋嘴]"
                }, {
                    icon: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/70/88_thumb.gif",
                    value: "[拜拜]"
                }, {
                    icon: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/e9/sk_thumb.gif",
                    value: "[思考]"
                }, {
                    icon: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/24/sweata_thumb.gif",
                    value: "[汗]"
                }, {
                    icon: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/7f/sleepya_thumb.gif",
                    value: "[困]"
                }, {
                    icon: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/6b/sleepa_thumb.gif",
                    value: "[睡觉]"
                }, {
                    icon: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/90/money_thumb.gif",
                    value: "[钱]"
                }, {
                    icon: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/0c/sw_thumb.gif",
                    value: "[失望]"
                }, {
                    icon: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/40/cool_thumb.gif",
                    value: "[酷]"
                }, {
                    icon: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/8c/hsa_thumb.gif",
                    value: "[花心]"
                }, {
                    icon: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/49/hatea_thumb.gif",
                    value: "[哼]"
                }, {
                    icon: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/36/gza_thumb.gif",
                    value: "[鼓掌]"
                }, {
                    icon: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/d9/dizzya_thumb.gif",
                    value: "[晕]"
                }, {
                    icon: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/1a/bs_thumb.gif",
                    value: "[悲伤]"
                }, {
                    icon: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/62/crazya_thumb.gif",
                    value: "[抓狂]"
                }, {
                    icon: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/91/h_thumb.gif",
                    value: "[黑线]"
                }, {
                    icon: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/6d/yx_thumb.gif",
                    value: "[阴险]"
                }, {
                    icon: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/89/nm_thumb.gif",
                    value: "[怒骂]"
                }, {
                    icon: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/40/hearta_thumb.gif",
                    value: "[心]"
                }, {
                    icon: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/ea/unheart.gif",
                    value: "[伤心]"
                }, {
                    icon: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/58/pig.gif",
                    value: "[猪头]"
                }, {
                    icon: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/d6/ok_thumb.gif",
                    value: "[ok]"
                }, {
                    icon: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/d9/ye_thumb.gif",
                    value: "[耶]"
                }, {
                    icon: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/d8/good_thumb.gif",
                    value: "[good]"
                }, {
                    icon: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/c7/no_thumb.gif",
                    value: "[不要]"
                }, {
                    icon: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/d0/z2_thumb.gif",
                    value: "[赞]"
                }, {
                    icon: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/40/come_thumb.gif",
                    value: "[来]"
                }, {
                    icon: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/d8/sad_thumb.gif",
                    value: "[弱]"
                }, {
                    icon: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/91/lazu_thumb.gif",
                    value: "[蜡烛]"
                }, {
                    icon: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/6a/cake.gif",
                    value: "[蛋糕]"
                }, {
                    icon: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/d3/clock_thumb.gif",
                    value: "[钟]"
                }, {
                    icon: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/1b/m_thumb.gif",
                    value: "[话筒]"
                }],
                //是否显示预览
                DrawerVisible: false,
                //表单校验规则
                rules: {

                    commentContent: [
                        {required: true, message: '请输入评论内容', trigger: 'submit'},
                        {min: 1, max: 300, message: '长度在 1 到 300 个字符', trigger: 'submit'}
                    ]
                },
                //表单
                form: {
                    commentContent: ''
                },
                //是否输入二级评论
                isSecond: false,
                //二级评论带 @用户 + 内容
                secondPreview: "",
                //二级评论父ID
                secondCommentParentId: ""

            }
        },
        mounted() {
            this.getBlogInfoAndCommentsById()
        },
        methods: {
            //提交评论
            postComment(formName) {
                this.$refs[formName].validate((valid) => {
                    this.contentToHTML()
                    const that = this;
                    if (valid) {
                        if (this.isSecond){
                            service({
                                method:'post',
                                url:"/api/blCommentSec/addSecComment",
                                data:{
                                    secParent: that.secondCommentParentId,
                                    secContent:that.commentHtml
                                }
                            }).then(res => {
                                if (res.data.code === 100){
                                    that.$Toast.success("回复成功！");
                                    that.$refs["form"].resetFields();
                                    that.getBlogCommonById()
                                    that.getBlogInfoById()
                                    that.isSecond = false
                                } else if(res.data.code === 60001){
                                    that.$Toast.fail("含有或疑似违规内容！请修改后重试！")
                                }  else{
                                    that.$Toast.fail("回复失败！请重试！")
                                }
                            })
                        }else {
                            service({
                                method:'get',
                                url:"/api/blComment/addComment",
                                params:{
                                    commentBlog: that.blogInfo.blogId,
                                    commentContent:that.commentHtml
                                }
                            }).then(res => {
                                if (res.data.code === 100){
                                    that.$Toast.success("评论成功！");
                                    that.$refs["form"].resetFields();
                                    that.getBlogCommonById()
                                    that.getBlogInfoById()

                                }  else if(res.data.code === 60001){
                                    that.$Toast.fail("含有或疑似违规内容！请修改后重试！")
                                }  else{
                                    that.$Toast.fail("评论失败！请重试！")
                                }
                            })
                        }

                    }
                });
            },
            //选择Emoji
            choiceEmoji: function (value, icon) {
                this.form.commentContent += value
            },
            //预览评论
            previewContent: function () {
                this.contentToHTML()
                this.DrawerVisible = !this.DrawerVisible
            },
            //评论点赞
            doCommentGood(comment) {
                let url = "";
                const that = this;

                if ( comment.isCommentGood ){
                    url = "/api/good/removeCommentGood?commentId=" + comment.commentId
                    service({
                        method: 'get',
                        url: url
                    }).then(res => {
                        if (res.data.code === 100){
                            comment.isCommentGood = false;
                            comment.commentGood = comment.commentGood - 1
                        }
                    })
                } else {
                    url = "/api/good/addCommentGood?commentId=" + comment.commentId
                    service({
                        method: 'get',
                        url: url
                    }).then(res => {
                        if (res.data.code === 100){
                            comment.isCommentGood = true;
                            comment.commentGood = comment.commentGood + 1
                        }
                    })
                }


            },
            //帖子收藏操作
            doBlogConnect:function(){
                let url = ""
                if (!this.isBlogConnect) {
                    //点赞
                    url = "/api/blCollect/addBlogConnect"
                }else{
                    //取消点赞
                    url = "/api/blCollect/removeBlogConnect"
                }
                const that = this
                service({
                    method:'post',
                    data:{
                        blogId:that.blogInfo.blogId
                    },
                    url:url
                }).then(res=>{
                    if (res.data.code === 100){
                        that.isBlogConnect = !that.isBlogConnect
                        if (that.isBlogConnect){
                            that.blogInfo.blogCollect = that.blogInfo.blogCollect + 1;
                        }else{
                            that.blogInfo.blogCollect = that.blogInfo.blogCollect - 1;
                        }
                    }
                })
            },
            //帖子点赞操作
            doBlogGood:function(){
                let url = ""
                if (!this.isBlogGood) {
                    //点赞
                    url = "/api/good/addBlogGood?blogId=" + this.blogInfo.blogId
                }else{
                    //取消点赞
                    url = "/api/good/removeBlogGood?blogId=" + this.blogInfo.blogId
                }
                const that = this
                service({
                    method:'post',
                    url:url,
                }).then(res=>{
                    if (res.data.code === 100){
                        that.isBlogGood = !that.isBlogGood
                        if (that.isBlogGood){
                            that.blogInfo.blogGoods = that.blogInfo.blogGoods + 1;
                        }else{
                            that.blogInfo.blogGoods = that.blogInfo.blogGoods - 1;

                        }
                    }
                })
            },
            //查询帖子内容和评论内容
            getBlogInfoAndCommentsById: function () {
                const that = this
                Promise.all([
                    new Promise((resolve, reject) => {
                        let url = "/api/blBlog/getBlogInfoById?blogId=" + this.blogId
                        const that = this
                        service.get(url).then(function (res) {
                            if (res.data.code !== 100) {
                                reject(res.data.code)
                            }
                            that.blogInfo = res.data.data
                            that.content = marked(that.blogInfo.blogContent)
                            that.isBlogGood = res.data.data.isBlogGood
                            that.isBlogConnect = res.data.data.isBlogConnect
                            resolve(true)
                        })
                    }),
                    new Promise((resolve, reject) => {
                        let url = "/api/blComment/getBlogCommentById?blogId=" + this.blogId
                        const that = this
                        service.get(url).then(function (res) {
                            if (res.data.code === 100) {
                                that.commentInfo = res.data.data
                            } else {
                                reject(res.data.code)
                            }
                            resolve(true)
                        })
                    })
                ]).then(result => {
                    if (result[0] && result[1]) {
                    }
                }).catch(reason => {
                    that.$Toast.fail("帖子不存在或已被删除，页面即将跳转！")

                    setTimeout(function () {
                        that.changeIsShowBlog()
                    }, 1000)

                })
            },
            //查询评论
            getBlogCommonById:function(){
                let url = "/api/blComment/getBlogCommentById?blogId=" + this.blogId
                const that = this
                service.get(url).then(function (res) {
                    if (res.data.code === 100){
                        that.commentInfo = res.data.data
                    }
                })
            },
            //查询帖子内容
            getBlogInfoById: function () {
                let url = "/api/blBlog/getBlogInfoById?blogId=" + this.blogId
                const that = this
                service.get(url).then(function (res) {
                    that.blogInfo = res.data.data
                    that.content = marked(that.blogInfo.blogContent)
                    that.isBlogGood = res.data.data.isBlogGood
                    that.$Loading.finish()

                })
            },
            //评论内容转HTMl
            contentToHTML:function(){
                let contentHtml = ""
                let arr = this.form.commentContent.split("[")
                for (let i = 0; i < arr.length; i++){
                    let item = arr[i]
                    if((item.indexOf("]") !== -1)){
                        let emoji = "[" + item.substring(0, item.indexOf("]") + 1)
                        for (let k = 0, l = this.emoji.length; k < l; k++) {
                            for (var key in this.emoji[k]) {
                                if (emoji === this.emoji[k]['value']){
                                    arr[i] = "<img src='" + this.emoji[k]['icon'] + "'>"   + arr[i].substring(arr[i].indexOf(']') + 1)
                                }
                            }

                        }
                    }
                    contentHtml += arr[i]
                }
                this.commentHtml = contentHtml;
            },
            //修改是否显示详情
            returnBack() {
                this.$router.back()
                // this.$emit("changeIsShowBlog")
            },
            //设置回复二级评论顶部内容
            secCommentAction:function(comment){
                this.secondPreview = "回复：<strong>@" + comment.commentUserName + "</strong> &nbsp;" + comment.commentContent;
                this.isSecond = true;
                this.secondCommentParentId = comment.commentId
                this.$refs['commentContent'].focus()

            },

            //取消回复二级评论
            unsetSecondComment:function(){
                this.isSecond = false;
                this.secondPreview = "";
            },
            //获取焦点
            setCommentFocus(){
                this.$refs['commentContent'].focus()

            }
        }
    }
</script>

<style scoped>
    #post-panel {
        margin: 0;
        padding: 10px 10px;
        height: 90vh;
        background-color: #ffffff;
        padding-bottom: 60px;
    }
    .blog-header {
    }
    .blog-title {
        color: #4f4f4f;
        font-size: 22px;
        font-weight: 500;
        margin-bottom: 10px;
        line-height: 30px;
    }

    .blog-title > span {
        height: 20px;
        line-height: 20px;
    }

    .blog-tags {
        margin: 10px 0;
    }

    .blog-tags > span {
        margin-right: 10px;
    }

    .blog-item-bottom {
        height: 20px;
        display: flex;
        font-size: 12px;
    }


    .blog-user-avatar > img {
        height: 20px;
        width: 20px;
        border-radius: 50%;
        margin-right: 5px;
    }

    .blog-user-name {
        font-weight: bold;
        margin-right: 10px;
    }

    .blog-desc > span {
        margin-right: 15px;
    }

    .blog-time {

    }
    .blog-content {
        padding-bottom: 10px;
    }
    .blog-handle {
        position: fixed;
        bottom: 0px;
        background-color: #fff;
        width: 100%;
        height: 60px;
        box-shadow: 0 0 0 0 rgba(21,21,23,.15);
        display: flex;
        line-height: 60px;
        justify-content: space-between;
        padding: 0 15px;
    }
    .good-collect {
        line-height: 60px;
        height: 60px;
        font-size: 25px;
    }
    .good-collect > i{
        margin-left: 15px;
    }




/*    评论】*/

    .comment-actions {
        margin-top:2px;
        border: 1px solid #e6e6e6;
        border-radius: 2px 2px 0 0;
        background-color: #FBFBFB;
        min-height: 42px;
        line-height: 42px;
        font-size: 25px;
        margin-bottom: 2px;

    }
    .sec-comment-info {
        color: #303030;
        width: auto;
        margin: 0px auto;
        overflow: hidden;
        position: relative;
        background: #f9f9f9;
        height: 36px;
        line-height: 36px;
        padding: 0px 10px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        font-size: 13px;

    }

    .comment-actions-emojibox {

        border: 1px solid #D9D9D9;
        background-color: #fff;
    }

    .comment-actions-emojibox li {
        cursor: pointer;
        float: left;
        border: 1px solid #e8e8e8;
        height: 22px;
        width: 26px;
        overflow: hidden;
        margin: 2px 2px;
        text-align: center;
    }

    .comment-actions-emojibox li:hover {
        border: 1px solid #eb7350;
        background: #fff9ec;
    }

    .comment-actions-icon {
        cursor: pointer;
        margin-left: 15px;
    }
</style>
