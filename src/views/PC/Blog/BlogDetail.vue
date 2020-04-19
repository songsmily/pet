<template>
    <div class="col center-part">

        <header class="bg-light lter  wrapper-md" id="small_widgets">
            <div v-if="JSON.stringify(blogInfo) !== '{}'">
                <h1 class="">
                    <a-tag v-if="blogInfo.blogType === 1" color="green">分享</a-tag>
                    <a-tag v-if="blogInfo.blogType === 2" color="orange">提问</a-tag>
                    {{blogInfo.blogTitle}}
                </h1>
                <div  class="blog-baseInfo">


                    <div class="blog-tag">
                        <span class="blog-tag-title"><a-icon type="tags" theme="filled"></a-icon>：</span>
                        <span style="margin-left: 5px;">

                            <a-tag color="blue" v-for="(item , i ) in blogInfo.blogTag ">{{item.tagName}}</a-tag>
                        </span>
                    </div>
                    <div class="blog-desc">
                        <!--                        &lt;!&ndash;用户名&ndash;&gt;-->
                        <!--                        <i class="fontello fontello-user text-muted"></i>-->
                        <!--                        <span class="m-r-sm">&nbsp;<a>{{blogInfo.name}}&nbsp;</a></span>-->
                        <!--创建时间-->
                        <a class="m-l-sm post-item-comment">
                            <i class="fontello fontello-clock-o text-muted"></i>&nbsp;{{$util.formatTime(blogInfo.createdTime,
                            null)}}
                        </a>
                        <a-divider type="vertical"></a-divider>
                        <!--评论数-->
                        <a class="m-l-sm post-item-comment">
                            <a-icon type="message"/>&nbsp;{{blogInfo.blogComment}}
                        </a>
                        <a-divider type="vertical"/>
                        <!--点赞数-->
                        <a class="m-l-sm post-item-comment">
                            <a-icon type="like"/>&nbsp;{{blogInfo.blogGoods}}
                        </a>
                        <a-divider type="vertical"/>
                        <!--收藏数-->
                        <a class="m-l-sm post-item-comment">
                            <a-icon type="star"/>&nbsp;{{blogInfo.blogCollect}}
                        </a>
                    </div>
                </div>
            </div>


        </header>
        <!--内容页-->
        <div class="wrapper-md" id="post-panel">
            <!--            <div class="user-detail" itemscope="" >-->
            <!--                <div>-->
            <!--                    <a-avatar shape="square" class="fly-avatar" size="large" :src="blogInfo.avatarUrl" />-->
            <!--                </div>-->
            <!--                <div style="margin-left: 10px;font-size: 20px">-->
            <!--                    <span >{{blogInfo.name}}</span><br>-->
            <!--                    <span>聂启松</span>-->
            <!--                </div>-->

            <!--            </div>-->
            <template v-if="JSON.stringify(blogInfo) === '{}'">
                <a-empty description="暂无数据"
                         image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
                         :imageStyle="{height: '150px'}"
                ></a-empty>
            </template>
            <template v-else>

                <div class="breadcrumb bg-white b-a" itemscope="" style="margin-top: 10px;margin-bottom: 20px;padding: 0 10px;height: 40px;">
                    <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 40px">
                        <el-breadcrumb-item :to="'/user/home'">宠物生活</el-breadcrumb-item>
                        <el-breadcrumb-item>正文</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <div id="blog-content" v-html="content">

                </div>
                <!--帖子点赞评论操作-->
                <div class="blog-action" v-if="this.blogInfo.userId != this.$store.state.userInfo.id">
                    <a-tooltip placement="top">
                        <template slot="title">
                            <span>{{isBlogGood ? '取消点赞': '点赞'}}</span>
                        </template>
                        <a href="javascript:void(0);">
                            <a-icon :theme="isBlogGood ? 'twoTone': 'outlined'" twoToneColor="#52c41a" type="like" @click="doBlogGood"/>
                        </a>
                    </a-tooltip>
                    <a-tooltip placement="top">
                        <template slot="title">
                            <span>{{isBlogConnect ? '取消收藏': '收藏'}}</span>
                        </template>
                        <a href="javascript:void(0);">
                            <a-icon :theme="isBlogConnect ? 'twoTone': 'outlined'" twoToneColor="#52c41a" type="star" @click="doBlogConnect"/>
                        </a>
                    </a-tooltip>

                </div>
                <a-divider>
                    <a-icon type="message"></a-icon>
                </a-divider>
                <!--评论区-->
                <a-comment v-for="(item,i) in commentInfo">
                    <template slot="actions">
                    <span key="comment-basic-like">
                       <a-tooltip title="点赞">
                          <a-icon :theme="item.isCommentGood ? 'twoTone': 'outlined'" twoToneColor="#52c41a" @click="doCommentGood(item)" type="like"/>
                        </a-tooltip>
                        <span style="padding-left: 8px;cursor: auto">
                          {{item.commentGood}}
                        </span>
                    </span>

                        <a-divider type="vertical"></a-divider>
                        <!--回复按钮-->
                        <span @click="secCommentAction(item)"> <a-icon type="message"></a-icon>&nbsp;&nbsp;回复</span>
                    </template>
                    <a slot="author">{{item.commentUserName}}</a>
                    <a-avatar
                            alt="Han Solo"
                            slot="avatar"
                            :src="item.commentUserAvatarUrl"
                    />
                    <p slot="content" v-html="item.commentContent">
                    </p>
                    <a-tooltip :title="moment(item.createdTime).format('YYYY-MM-DD HH:mm:ss')" slot="datetime">
                        <span>{{$util.formatTime(item.createdTime,null)}}</span>
                    </a-tooltip>

                    <!-- 二级评论区-->
                    <a-comment v-if="item.commentSecList.length !== 0" v-for="(itemSec,i) in item.commentSecList">
                        <a slot="author">{{itemSec.secCommentUserName}}</a>
                        <a-avatar
                                alt="Han Solo"
                                slot="avatar"
                                :src="itemSec.secCommentUserAvatarUrl"
                        />
                        <p slot="content" v-html="itemSec.secContent">
                        </p>
                        <a-tooltip :title="moment(itemSec.createdTime).format('YYYY-MM-DD HH:mm:ss')" slot="datetime">
                            <span>{{$util.formatTime(itemSec.createdTime,null)}}</span>
                        </a-tooltip>
                    </a-comment>
                </a-comment>
                <!--消息预览-->
                <el-drawer
                        title="消息预览"
                        direction="ttb"
                        :closable="false"
                        :visible.sync="DrawerVisible"
                >
                    <div style="margin-left: 20px" v-html="commentHtml"></div>

                </el-drawer>
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
                            width="400"
                            trigger="click">
                        <ul class="comment-actions-emojibox">
                            <template v-for="(item,i) in emoji">
                                <li @click="choiceEmoji(item.value,item.icon)" :value="item.value">
                                    <img :src="item.icon" alt="">
                                </li>
                            </template>
                        </ul>
                        <a-tooltip  slot="reference" class="comment-actions-icon" title="添加表情">
                            <a-icon  type="smile" theme="outlined"/>

                        </a-tooltip>
                    </el-popover>
                    <a-tooltip slot="reference" class="comment-actions-icon" title="预览">
                        <a-icon @click="previewContent" type="eye" theme="outlined"/>

                    </a-tooltip>
                    <!--                <span class="comment-actions-icon">-->
                    <!--                </span>-->
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
            </template>
<!--            <a-textarea-->
<!--                    @change="contentChange"-->
<!--                    v-model="commentContent"-->
<!--                    @close="onDrawerClose"-->
<!--                    placeholder="请输入评论内容"-->
<!--                    :autoSize="{ minRows: 4, maxRows: 6 }"-->
<!--            />-->
        </div>
    </div>
</template>

<script>
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
    import moment from 'moment'
    import service from "network/axios"
    import marked from 'marked'

    export default {
        name: "BlogDetail",
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
            ElAlert:Alert,
            AEmpty
        },
        data() {
            return {
                //帖子ID
                blogId: this.$route.params.id,
                //帖子信息
                blogInfo: {},
                //评论信息
                commentInfo:{},
                //
                content: "",
                //点赞数
                goods: 0,
                //是否点赞
                isBlogGood: false,
                isBlogConnect:false,
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
                DrawerVisible:false,
                //表单校验规则
                rules: {

                    commentContent: [
                        {required: true, message: '请输入评论内容', trigger: 'blur'},
                        {min: 1, max: 300, message: '长度在 1 到 300 个字符', trigger: 'blur'}
                    ]
                },
                //表单
                form: {
                    commentContent: ''
                },
                //是否输入二级评论
                isSecond:false,
                //二级评论带 @用户 + 内容
                secondPreview:"",
                //二级评论父ID
                secondCommentParentId:""

            }
        },
        created() {
            this.$Loading.start()
        },
        mounted() {
            this.getBlogInfoAndCommentsById()
        },
        filters: {
            formatDate: function (value) {
                return moment(value).format('YYYY-MM-DD')
            }
        },
        methods: {
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
            //取消回复二级评论
            unsetSecondComment:function(){
                this.isSecond = false;
                this.secondPreview = "";
            },
            //设置回复二级评论顶部内容
            secCommentAction:function(comment){
                this.secondPreview = "回复：<strong>@" + comment.commentUserName + "</strong> &nbsp;" + comment.commentContent;
                this.isSecond = true;
                this.secondCommentParentId = comment.commentId
                this.$refs['commentContent'].focus()

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
                                    that.$Message.success("评论成功！");
                                    that.$refs["form"].resetFields();
                                    that.getBlogCommonById()
                                    that.getBlogInfoById()
                                    that.isSecond = false
                                } else if(res.data.code === 60001){
                                    that.$Message.error("含有或疑似违规内容！请修改后重试！")
                                }  else{
                                    that.$Message.error("保存失败！请重试！")
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
                                    that.$Message.success("评论成功！");
                                    that.$refs["form"].resetFields();
                                    that.getBlogCommonById()
                                    that.getBlogInfoById()

                                }  else if(res.data.code === 60001){
                                    that.$Message.error("含有或疑似违规内容！请修改后重试！")
                                }  else{
                                    that.$Message.error("保存失败！请重试！")
                                }
                            })
                        }

                    }
                });
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
            //查询帖子内容和评论内容
            getBlogInfoAndCommentsById:function(){
                const that = this;
                Promise.all([
                   new Promise((resolve, reject)=>{
                       let url = "/api/blBlog/getBlogInfoById?blogId=" + this.blogId
                       const that = this
                       service.get(url).then(function (res) {
                           if (res.data.code !== 100){
                                reject(res.data.code)
                           }
                           that.blogInfo = res.data.data
                           that.content = marked(that.blogInfo.blogContent)
                           that.isBlogGood = res.data.data.isBlogGood
                           that.isBlogConnect = res.data.data.isBlogConnect
                           that.$Loading.finish()
                           resolve(true)
                       })
                   }),
                   new Promise((resolve, reject)=>{
                       let url = "/api/blComment/getBlogCommentById?blogId=" + this.blogId
                       const that = this
                       service.get(url).then(function (res) {
                           if (res.data.code === 100){
                               that.commentInfo = res.data.data
                           }else{
                               reject(res.data.code)

                           }
                           resolve(true)
                       })
                   })
                ]).then(result=>{
                    if (result[0] && result[1]){
                        that.$Loading.finish()
                    }
                }).catch(reason => {
                    that.$Loading.finish()
                    that.$msgbox.confirm('帖子不存在或已被删除！', '提示', {
                        confirmButtonText: '返回上一页',
                        cancelButtonText: "取消",
                        type: 'error'
                    }).then(() => {
                        that.$router.back()
                    })
                })
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
            onDrawerClose:function () {
                this.DrawerVisible = false
            }
        }
    }
</script>

<style scoped>
    .image > img {
        height: 300px;
    }

    #blog-content {
        background-color: white;
        padding: 10px;
        min-height: 30vh;
    }

    .blog-baseInfo {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .blog-tag-title {
        font-weight: 400;
    }

    .user-detail {
        margin-top: 10px;
        position: relative;
        line-height: 20px;
        padding: 15px 15px 15px 15px;
        font-size: 13px;
        background-color: #f8f8f8;
        color: #999;
        display: flex;
    }

    .blog-action {
        margin-top: 5px;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        font-size: 24px;
        padding: 15px 15px 15px 15px;
    }

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

    .blog-good {
        color: #595959;
    }

    .blog-good:hover {
        color: #595959;
    }

    .comment-good {
        color: #595959;
    }

    .comment-good:hover {
        color: #595959;
    }

    .blog-collection {
        color: #595959;
    }

    .blog-collection:hover {
        color: #595959;
    }

    .meta-active {
        /* 标识当前是否已点赞，是否已收藏 */
        color: red;
    }

    .meta-active:hover {
        /* 标识当前是否已点赞，是否已收藏 */
        color: red !important;
    }

</style>
