<template>
    <div class="col center-part">
        <header class="bg-light lter wrapper-md">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="'/user/home'">宠物生活</el-breadcrumb-item>
                <el-breadcrumb-item>发表新帖</el-breadcrumb-item>
            </el-breadcrumb>
        </header>


<!--        <a-form-model :form="form"-->
<!--                class="login-form"-->
<!--                :label-col="{ span: this.$store.state.isMobile ? 5 :2 }"-->
<!--                :wrapper-col="{ span: 12 }">-->
        <a-form-model
                ref="ruleForm"
                :model="data"
                :rules="modelrules"
                :label-col="{ span: this.$store.state.isMobile ? 5 :2 }"
                :wrapper-col="{span:12}">
            <!--内容页-->
            <div id="post-panel" :class="this.$store.state.isMobile ?'wrap_content_mobile':'wrap_content_user'">

                <div style="margin-bottom: 1px;padding-left: 20px">
                    <a-form-item label="类型 ">

                        <a-select   size="large" v-model="data.blogType">
                            <a-icon slot="suffixIcon" type="smile"/>
                            <a-select-option value="1">分享</a-select-option>
                            <a-select-option value="2">提问</a-select-option>
                        </a-select>
                    </a-form-item>
<!--                    <a-form-item label="标题">-->
<!--                        <a-input maxlength="10"-->
<!--                                v-decorator="['title', { rules: [{ required: true,message: '请输入标题!' }] }]"-->
<!--                                placeholder="请输入标题" size="large" ></a-input>-->
<!--&lt;!&ndash;                        <span class="contentNotice">请输入内容，字数不超过500字！</span>&ndash;&gt;-->

<!--                    </a-form-item>-->
                    <a-form-model-item label="标题" prop="blogTitle" ref="blogTitle">
                        <a-input placeholder="请输入标题 "
                                size="large"
                                v-model="data.blogTitle"
                                @blur="
          () => {
            $refs.blogTitle.onFieldBlur();
          }
        "
                        />
                    </a-form-model-item>
                    <a-form-model-item label="标签" prop="blogTag" ref="blogTag">
<!--                        <a-select-->
<!--                                v-decorator="['tags',{ rules: [{ required: true, message: '请输入标签！' }] },]"-->
<!--                                placeholder="请输入标签，回车键间隔" notFoundContent="请输入" mode="tags" size="large"-->
<!--                                style="width: 100%" :tokenSeparators="[',']"-->
<!--                                >-->

<!--                        </a-select>-->
                        <a-select style="width: 100%"
                                  @change="handleTagsChange"
                                  placeholder="请选择或输入标签，最多不超过5个！"
                                  mode="multiple"
                                  size="large"
                                  v-model="data.blogTag"
                                  @blur="
          () => {
            $refs.blogTag.onFieldBlur();
          }
        "
                                  >
                            <a-select-option v-for="item in optionTags" :key="item.tagId.toString()"
                            >{{item.tagName}}</a-select-option>
                        </a-select>
                    </a-form-model-item>
                    <el-divider></el-divider>
                    <el-tabs v-model="activeType" @tab-click="handleChangeType">
                        <el-tab-pane name="profession">
                            <span slot="label" style="font-size: 14px"> 专业版编辑器</span>
                        </el-tab-pane>
                        <el-tab-pane name="simple">
                            <span slot="label" style="font-size: 14px"> 简易版编辑器</span>
                        </el-tab-pane>

                    </el-tabs>
                </div>

                <mavon-editor  style="min-height: 500px;z-index: 1000;" ref="md" v-model="data.blogContent" :toolbars="toolbars"
                              @imgAdd="imgAdd" @imgDel="imgDel"/>
                <span v-if="contentNotice" class="contentNotice">请输入内容，字数不超过500字！</span>

                <div style="margin-top: 20px;font-size: 15px">

                    <a-button type="primary" size="large" @click="handleSubmit">
                        立即发布
                    </a-button>
                </div>

            </div>

        </a-form-model>
<!--        <a-form-model-->
<!--                ref="ruleForm"-->
<!--                :model="modelform"-->
<!--                :rules="modelrules"-->
<!--                :label-col="modellabelCol"-->
<!--                :wrapper-col="modelwrapperCol"-->
<!--        >-->
<!--            <a-form-model-item label="Activity name" prop="name" ref="name">-->
<!--                <a-input-->
<!--                        v-model="modelform.name"-->
<!--                        @blur="-->
<!--          () => {-->
<!--            $refs.name.onFieldBlur();-->
<!--          }-->
<!--        "-->
<!--                />-->
<!--            </a-form-model-item>-->
<!--        </a-form-model>-->
    </div>
</template>

<script>
    import {Breadcrumb, BreadcrumbItem, Col, Row, ButtonGroup, TabPane, Tabs, Divider} from "element-ui"
    import {
        FormModel,
        Tooltip, Tag, Input as AInput, Select as ASelect, Icon as AIcon, Radio as ARadio,
        Form, Button as AButton
    } from "ant-design-vue"
    import moment from 'moment'
    import {mavonEditor} from "mavon-editor"
    import service from "network/axios"
    import 'mavon-editor/dist/css/index.css'
    export default {
        name: "AddBlog",
        components: {
            ElBreadcrumb: Breadcrumb,
            ElBreadcrumbItem: BreadcrumbItem,
            ElRow: Row,
            ElCol: Col,
            MavonEditor: mavonEditor,
            ElButtonGroup: ButtonGroup,
            ElTabPane: TabPane,
            ElTabs: Tabs,
            ATooltip: Tooltip,
            ATag: Tag,
            AInput: AInput,
            ASelect,
            ASelectOption: ASelect.Option,
            AIcon,
            ARadio,
            ARadioGroup: ARadio.Group,
            ElDivider: Divider,
            AForm: Form,
            AFormItem: Form.Item,
            AButton,
            AFormModel:FormModel,
            AFormModelItem:FormModel.Item
        },
        data() {
            return {
                activeType: 'profession',
                value: "",
                simpleToolBar: {
                    bold: true, // 粗体
                    italic: true, // 斜体
                    header: true, // 标题
                    fullscreen: true, // 全屏编辑
                    preview: true, // 预览
                    imagelink: true, // 图片链接


                },
                toolbars: {
                    bold: true, // 粗体
                    italic: true, // 斜体
                    header: true, // 标题
                    ol: true, // 有序列表
                    ul: true, // 无序列表
                    link: true, // 链接
                    imagelink: true, // 图片链接
                    table: true, // 表格
                    fullscreen: true, // 全屏编辑
                    readmodel: true, // 沉浸式阅读
                    help: true, // 帮助
                    /* 2.1.8 */
                    alignleft: true, // 左对齐
                    aligncenter: true, // 居中
                    alignright: true, // 右对齐
                },
                optionTags: [],
                tags: [],
                inputVisible: false,
                inputValue: '',
                form: this.$form.createForm(this, {name: 'coordinated'}),
                data:{
                    blogTitle:"",
                    blogType:"1",
                    blogTag:[],
                    blogContent:"",
                },
                contentPos:false,
                contentNotice:false,
                modellabelCol: { span: 4 },
                modelwrapperCol: { span: 14 },
                modelrules: {
                    blogTitle: [
                        { required: true, message: '请输入标题', trigger: 'blur' },
                        { min: 10, max: 100, message: '长度在10字符到80字符之间', trigger: 'blur' },
                    ],
                    blogTag:[
                        { required: true, message: '请选择标签', trigger: 'blur' },
                    ]
                },
                imageCheck:true
            }
        },
        created() {
            this.$Loading.start()
        },
        mounted() {
            this.getTags()
        },
        filters: {
            formatDate: function (value) {
                return moment(value).format('YYYY-MM-DD')
            }
        },
        methods: {
            //获取标签
            getTags:function(){
                const that =  this
                service({
                    method:"get",
                    url:"/api/blTag/getTags"
                }).then(res => {
                    if (res.data.code === 100) {
                        that.optionTags = res.data.data
                    }
                    this.$Loading.finish()
                })
            },
            //上传帖子
            handleSubmit(e) {
                e.preventDefault()
                this.$refs.ruleForm.validate(valid => {
                    if (valid) {
                        if (this.data.blogContent.length <= 0 || this.data.blogContent.length >= 500){
                            this.contentPos = false;
                            this.contentNotice = true;
                            return
                        }else{
                            this.contentPos = true;
                            this.contentNotice = false;
                        }
                        if (valid) {
                            this.$Message.warning("正在上传中......")
                            const that = this
                            let data = {
                                blogTitle:this.data.blogTitle,
                                blogType:this.data.blogType,
                                blogTag:"&" + this.data.blogTag.join("&") + "&",
                                blogContent:this.data.blogContent,
                            }
                            service({
                                method:"post",
                                data:data,
                                url:"/api/blBlog/add",
                            }).then(res => {
                                if (res.data.code === 100){
                                    that.$Message.success("帖子上传成功！");
                                    that.$util.getHotTags(that)
                                    setTimeout(function () {
                                        that.$router.push("/user/home")
                                    },1000)
                                } else if(res.data.code === 60001){

                                    that.$Message.error("含有或疑似违规内容！请修改后重试！")
                                }  else{
                                    that.$Message.error("保存失败！请重试！")
                                }
                            })
                        }
                    }
                });
            },
            handleTagsChange: function () {

            },
            /**
             * 图片上传
             */
            imgAdd: function (pos, $file) {
                const formData = new FormData()
                formData.append('image', $file)
                let that = this
                that.$Message.success("图片上传中！")

                service({
                    method: "post",
                    url: "/api/blBlog/postBlogImage",
                    data: formData
                }).then(res => {
                    if (res.data.code === 100) {
                        that.$refs.md.$img2Url(pos, res.data.data)
                        that.$Message.success("图片上传成功！")
                    } else if(res.data.code === 60001){
                        that.$Message.error("该图片疑似违规，上传失败！")
                        that.data.blogContent =  that.data.blogContent.substring(0,  (that.data.blogContent.lastIndexOf("![") ))
                    }  else{
                        that.$Message.error("保存失败！请重试！")
                        that.data.blogContent =  that.data.blogContent.substring(0,  (that.data.blogContent.lastIndexOf("![") ))
                    }
                })
            },
            imgDel:function(pos){
                const that = this
                service({
                    method:'post',
                    url:"/api/blBlog/deleteBlogImage",
                    data:{
                        "imageUrl": pos[0]
                    }
                }).then(res => {
                    console.log(res)
                })
            },
            handleChangeType: function () {
                if (this.activeType === "profession") {
                    this.toolbars = {
                        bold: true, // 粗体
                        italic: true, // 斜体
                        header: true, // 标题
                        ol: true, // 有序列表
                        ul: true, // 无序列表
                        link: true, // 链接
                        imagelink: true, // 图片链接
                        table: true, // 表格
                        fullscreen: true, // 全屏编辑
                        readmodel: true, // 沉浸式阅读
                        help: true, // 帮助/* 2.1.8 */
                        alignleft: true, // 左对齐
                        aligncenter: true, // 居中
                        alignright: true, // 右对齐
                    }
                } else {
                    this.toolbars = this.simpleToolBar
                }
            }
        }
    }
</script>

<style scoped>
    .image > img {
        height: 300px;
    }

    .wrap_content_user {
        padding: 10px 20px 10px 20px;
    }

    .wrap_content_mobile {
        margin-top: 100px;
    }
    .contentNotice{
        color: #f5222d;
    }
    .contentBorder{
        border: 1px solid #f5222d;
    }
</style>
