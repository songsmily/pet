<template>
    <div class="col center-part">
        <header class="bg-light lter wrapper-md">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="'#'">宠物资讯</el-breadcrumb-item>
                <el-breadcrumb-item>新增资讯</el-breadcrumb-item>
            </el-breadcrumb>
        </header>

        <a-form-model
                ref="ruleForm"
                :model="data"
                :rules="modelrules"
                :label-col="{ span: this.$store.state.isMobile ? 5 :2 }"
                :wrapper-col="{span:12}">
            <!--内容页-->
            <div id="post-panel" :class="this.$store.state.isMobile ?'wrap_content_mobile':'wrap_content_user'">

                <div style="margin-bottom: 1px;padding-left: 20px">
<!--                    <a-form-item label="类型 ">-->

<!--                        <a-select   size="large" v-model="data.blogType">-->
<!--                            <a-icon slot="suffixIcon" type="smile"/>-->
<!--                            <a-select-option value="1">分享</a-select-option>-->
<!--                            <a-select-option value="2">提问</a-select-option>-->
<!--                            <a-select-option value="3">讨论</a-select-option>-->
<!--                        </a-select>-->
<!--                    </a-form-item>-->
                    <a-form-model-item label="标题" prop="infoTitle" ref="infoTitle">
                        <a-input
                                size="large"
                                v-model="data.infoTitle"
                                @blur="
                                      () => {
                                        $refs.infoTitle.onFieldBlur();
                                      }
                                    "
                        />
                    </a-form-model-item>
                    <a-form-model-item label="标题图片" prop="infoImage" ref="infoImage">
                        <div>
                            <a-upload
                                    name="avatar"
                                    listType="picture-card"
                                    class="avatar-uploader"
                                    :fileList="fileList"
                                    :multiple="true"
                                    :showUploadList="false"
                                    :beforeUpload="beforeImageUpload"
                                    @change="handleImageChange"

                            >
                                <img v-if="data.infoImage" :src="data.infoImage" alt="avatar" style="width: 202px;height: 100px"/>
                                <div v-else>
                                    <a-icon :type="loading ? 'loading' : 'plus'" />
                                    <div class="ant-upload-text">上传图片</div>
                                </div>
                            </a-upload>
                        </div>

                    </a-form-model-item>
<!--                    <a-form-item label="标签">-->
<!--&lt;!&ndash;                        <a-select&ndash;&gt;-->
<!--&lt;!&ndash;                                v-decorator="['tags',{ rules: [{ required: true, message: '请输入标签！' }] },]"&ndash;&gt;-->
<!--&lt;!&ndash;                                placeholder="请输入标签，回车键间隔" notFoundContent="请输入" mode="tags" size="large"&ndash;&gt;-->
<!--&lt;!&ndash;                                style="width: 100%" :tokenSeparators="[',']"&ndash;&gt;-->
<!--&lt;!&ndash;                                >&ndash;&gt;-->

<!--&lt;!&ndash;                        </a-select>&ndash;&gt;-->
<!--                        <a-select style="width: 100%"-->
<!--                                  @change="handleTagsChange"-->
<!--                                  placeholder="请选择或输入标签，最多不超过5个！"-->
<!--                                  mode="tags"-->
<!--                                  size="large"-->
<!--                                  v-decorator="['tags',{ rules: [{ required: true, message: '请输入标签,最多不超过5个！' }] },]"-->
<!--                                  >-->

<!--                        </a-select>-->
<!--                    </a-form-item>-->
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

                <mavon-editor  style="min-height: 500px;z-index: 1000;" ref="md" v-model="data.infoContent" :toolbars="toolbars"
                              @imgAdd="imgAdd" @imgDel="imgDel"/>
                <span v-if="contentNotice" class="contentNotice">请输入内容，字数不超过3000字！</span>

                <div style="margin-top: 20px;font-size: 15px">

                    <a-button type="primary" size="large" @click="handleSubmit">
                        立即发布
                    </a-button>
                </div>

            </div>

        </a-form-model>
    </div>
</template>

<script>
    import {Breadcrumb, BreadcrumbItem, Col, Row, ButtonGroup, TabPane, Tabs, Divider} from "element-ui"
    import {FormModel,
        Tooltip, Tag, Input as AInput, Select as ASelect, Icon as AIcon, Radio as ARadio,
        Form, Button as AButton, Upload as AUpload
    } from "ant-design-vue"
    import moment from 'moment'
    import {mavonEditor} from "mavon-editor"
    import service from "network/axios"
    import 'mavon-editor/dist/css/index.css'
    import adminService from "../../../../network/adminAxios"

    export default {
        name: "AddNews",
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
            AFormModelItem:FormModel.Item,
            AUpload
        },
        data() {
            return {
                activeType: 'profession',
                value: "",
                simpleToolBar: {
                    bold: true, // 粗体
                    italic: true, // 斜体
                    header: true, // 标题
                    underline: true, // 下划线
                    strikethrough: true, // 中划线
                    fullscreen: true, // 全屏编辑
                    trash: true, // 清空
                    save: true, // 保存（触发events中的save事件）
                    preview: true, // 预览
                    imagelink: true, // 图片链接


                },
                toolbars: {
                    bold: true, // 粗体
                    italic: true, // 斜体
                    header: true, // 标题
                    underline: true, // 下划线
                    strikethrough: true, // 中划线
                    mark: true, // 标记
                    superscript: true, // 上角标
                    subscript: true, // 下角标
                    quote: true, // 引用
                    ol: true, // 有序列表
                    ul: true, // 无序列表
                    link: true, // 链接
                    imagelink: true, // 图片链接
                    code: true, // code
                    table: true, // 表格
                    fullscreen: true, // 全屏编辑
                    readmodel: true, // 沉浸式阅读
                    htmlcode: true, // 展示html源码
                    help: true, // 帮助
                    /* 1.3.5 */
                    undo: true, // 上一步
                    redo: true, // 下一步
                    trash: true, // 清空
                    save: true, // 保存（触发events中的save事件）
                    /* 1.4.2 */
                    navigation: true, // 导航目录
                    /* 2.1.8 */
                    alignleft: true, // 左对齐
                    aligncenter: true, // 居中
                    alignright: true, // 右对齐
                    /* 2.2.1 */
                    subfield: true, // 单双栏模式
                    preview: true, // 预览
                },
                optionTags: [],
                tags: [],
                fileList:[],
                loading:false,
                inputVisible: false,
                inputValue: '',
                form: this.$form.createForm(this, {name: 'coordinated'}),

                contentPos:false,
                contentNotice:false,
                form: this.$form.createForm(this, {name: 'coordinated'}),
                data:{
                    infoTitle:"",
                    infoContent:"",
                    infoImage:""
                },
                contentPos:false,
                contentNotice:false,
                modellabelCol: { span: 4 },
                modelwrapperCol: { span: 14 },
                modelrules: {
                    infoTitle: [
                        { required: true, message: '请输入标题', trigger: 'blur' },
                        { min: 5, max: 30, message: '长度在5字符到30字符之间', trigger: 'blur' },
                    ],
                    infoImage:[
                        { required: true, message: '请上传标题图片', trigger: 'blur' },
                    ]
                },
            }
        },
        created() {
            // this.$Loading.start()
        },
        mounted() {
            // this.getTags()
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
                    if (valid){
                        if (this.data.infoContent.length <= 0 || this.data.infoContent.length >= 3000){
                            this.contentPos = false;
                            this.contentNotice = true;
                            return
                        }else{
                            this.contentPos = true;
                            this.contentNotice = false;
                        }
                        if (valid) {
                            this.$Message.warning("正在上传中......")
                            console.log(this.data)
                            const that = this
                            service({
                                method:"post",
                                data:that.data,
                                url:"/api/admin/information/add",
                            }).then(res => {
                                if (res.data.code === 100){
                                    that.$Message.success("资讯上传成功！");
                                }
                            })
                        }
                    }

                })
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
                adminService({
                    method: "post",
                    url: "/api/admin/information/postInfoImage",
                    data: formData
                }).then(res => {
                    if (res.data.code === 100) {
                        that.$refs.md.$img2Url(pos, res.data.data)
                    }
                })
            },
            imgDel:function(pos){
                const that = this
                adminService({
                    method:'get',
                    url:"/api/admin/information/deleteInfoImage",
                    params:{
                        "imageUrl": pos[0]
                    }
                }).then(res => {
                    console.log(res)
                })
            },
            handleImageChange(info) {
                let file = this.fileList[0]
                console.log(file.size)
                console.log(file.type)
                if(file.size > 1024 * 1024 * 2 || file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif'){
                    this.$Notify({
                        title: '文件类型错误',
                        message: '仅支持JPG、PNG、GIF格式，且图片大小小于2M！',
                        type: "error",
                        duration:2000
                    })
                }else{
                    const formData = new FormData()
                    formData.append('image',this.fileList[0])
                    this.loading = true;
                    let that = this
                    adminService({
                        method: "post",
                        url: "/api/admin/information/postInfoImage",
                        data: formData
                    }).then(res => {
                        that.loading = false
                        if (res.data.code === 100) {
                            that.data.infoImage = res.data.data
                        } else {
                            that.$Message.error("上传失败，请重新选择文件后提交!");
                        }
                    })
                }

                // this.data.infoImage=  "http://oss.songsmily.cn/images/1577240405732.jpeg"
                // if (info.file.status === 'uploading') {
                //     this.loading = true;
                //     return;
                // }
                // if (info.file.status === 'done') {
                //     // Get this url from response in real world.
                //     getBase64(info.file.originFileObj, imageUrl => {
                //
                //         this.imageUrl = imageUrl;
                //         this.loading = false;
                //     });
                // }
            },
            beforeImageUpload(file) {
                // const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
                // if (!isJpgOrPng) {
                //     this.$Message.error('You can only upload JPG file!');
                // }
                // const isLt2M = file.size / 1024 / 1024 < 2;
                // if (!isLt2M) {
                //     this.$Message.error('Image must smaller than 2MB!');
                // }
                // return isJpgOrPng && isLt2M;
                this.fileList = [...this.fileList, file];
                return false;
            },
            handleChangeType: function () {
                if (this.activeType === "profession") {
                    this.toolbars = {
                        bold: true, // 粗体
                        italic: true, // 斜体
                        header: true, // 标题
                        underline: true, // 下划线
                        strikethrough: true, // 中划线
                        mark: true, // 标记
                        superscript: true, // 上角标
                        subscript: true, // 下角标
                        quote: true, // 引用
                        ol: true, // 有序列表
                        ul: true, // 无序列表
                        link: true, // 链接
                        imagelink: true, // 图片链接
                        code: true, // code
                        table: true, // 表格
                        fullscreen: true, // 全屏编辑
                        readmodel: true, // 沉浸式阅读
                        htmlcode: true, // 展示html源码
                        help: true, // 帮助
                        /* 1.3.5 */
                        undo: true, // 上一步
                        redo: true, // 下一步
                        trash: true, // 清空
                        save: true, // 保存（触发events中的save事件）
                        /* 1.4.2 */
                        navigation: true, // 导航目录
                        /* 2.1.8 */
                        alignleft: true, // 左对齐
                        aligncenter: true, // 居中
                        alignright: true, // 右对齐
                        /* 2.2.1 */
                        subfield: true, // 单双栏模式
                        preview: true, // 预览
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
    .avatar-uploader > .ant-upload {
        width: 128px;
        height: 128px;
    }
    .ant-upload-select-picture-card i {
        font-size: 32px;
        color: #999;
    }

    .ant-upload-select-picture-card .ant-upload-text {
        margin-top: 8px;
        color: #666;
    }
</style>
