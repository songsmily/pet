<template>
    <!--首页右侧栏-->
    <aside class="asideBar col w-md bg-white-only bg-auto no-border-xs" role="complementary">
        <div id="sidebar">
            <at-tabs>
                <at-tab-pane label="" name="name1" icon="icon-award">
                    <!--宠物榜单-->
                    <div style="padding-left: 0" class="tab-pane  fade in wrapper-md active" role="tabpanel">
                        <h5 class="widget-title m-t-none text-md">热门标签</h5>
                        <a-divider style="margin: 14px 0"></a-divider>
                        <div>
                            <a-button v-for="(item, i) in this.$store.state.hotTags" type="primary" ghost  style="margin: 4px" size="small"  @click="setHotTagChoice(item)">{{item.tagName}}({{item.tagCount}})</a-button>

                        </div>
                    </div>
                </at-tab-pane>

<!--                <at-tab-pane label="" name="name3" icon="icon-pocket">-->
<!--                    <div style="padding-left: 0" class="tab-pane  fade in wrapper-md active" role="tabpanel">-->
<!--                        <h5 class="widget-title m-t-none text-md">热门分享</h5>-->
<!--                        <ul class="list-group no-bg no-borders pull-in m-b-none">-->
<!--                            <li class="list-group-item">-->
<!--                                <a href="javascript:void(0)" class="pull-left thumb-sm m-r"><img-->
<!--                                        src="http://jijianblog.com/usr/themes/handsome/usr/img/sj2/9.jpg"-->
<!--                                        class="img-40px normal-shadow img-square"></a>-->
<!--                                <div class="clear">-->
<!--                                    <h4 class="h5 l-h text-second"><a href="javascript:void(0)"> 最暖心的哈士奇：大G </a></h4>-->
<!--                                    <small class="text-muted post-head-icon"><span class="meta-views"> <span-->
<!--                                            class="right-small-icons"><svg xmlns="http://www.w3.org/2000/svg"-->
<!--                                                                           width="16px" height="16px"-->
<!--                                                                           viewBox="0 0 24 24" fill="none"-->
<!--                                                                           stroke="currentColor" stroke-width="2"-->
<!--                                                                           stroke-linecap="round"-->
<!--                                                                           stroke-linejoin="round"-->
<!--                                                                           class="feather feather-message-circle"><path-->
<!--                                            d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg></span>  <span-->
<!--                                            class="sr-only">评论数：</span> <span class="meta-value">2</span>-->
<!--                    </span></small></div>-->
<!--                            </li>-->
<!--                            <li class="list-group-item">-->
<!--                                <a href="javascript:void(0)" class="pull-left thumb-sm m-r"><img-->
<!--                                        src="http://jijianblog.com/usr/themes/handsome/usr/img/sj2/9.jpg"-->
<!--                                        class="img-40px normal-shadow img-square"></a>-->
<!--                                <div class="clear">-->
<!--                                    <h4 class="h5 l-h text-second"><a href="javascript:void(0)"> 最暖心的哈士奇：大G </a></h4>-->
<!--                                    <small class="text-muted post-head-icon"><span class="meta-views"> <span-->
<!--                                            class="right-small-icons"><svg xmlns="http://www.w3.org/2000/svg"-->
<!--                                                                           width="16px" height="16px"-->
<!--                                                                           viewBox="0 0 24 24" fill="none"-->
<!--                                                                           stroke="currentColor" stroke-width="2"-->
<!--                                                                           stroke-linecap="round"-->
<!--                                                                           stroke-linejoin="round"-->
<!--                                                                           class="feather feather-message-circle"><path-->
<!--                                            d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg></span>  <span-->
<!--                                            class="sr-only">评论数：</span> <span class="meta-value">2</span>-->
<!--                    </span></small></div>-->
<!--                            </li>-->
<!--                            <li class="list-group-item">-->
<!--                                <a href="javascript:void(0)" class="pull-left thumb-sm m-r"><img-->
<!--                                        src="http://jijianblog.com/usr/themes/handsome/usr/img/sj2/9.jpg"-->
<!--                                        class="img-40px normal-shadow img-square"></a>-->
<!--                                <div class="clear">-->
<!--                                    <h4 class="h5 l-h text-second"><a href="javascript:void(0)"> 最暖心的哈士奇：大G </a></h4>-->
<!--                                    <small class="text-muted post-head-icon"><span class="meta-views"> <span-->
<!--                                            class="right-small-icons"><svg xmlns="http://www.w3.org/2000/svg"-->
<!--                                                                           width="16px" height="16px"-->
<!--                                                                           viewBox="0 0 24 24" fill="none"-->
<!--                                                                           stroke="currentColor" stroke-width="2"-->
<!--                                                                           stroke-linecap="round"-->
<!--                                                                           stroke-linejoin="round"-->
<!--                                                                           class="feather feather-message-circle"><path-->
<!--                                            d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg></span>  <span-->
<!--                                            class="sr-only">评论数：</span> <span class="meta-value">2</span>-->
<!--                    </span></small></div>-->
<!--                            </li><li class="list-group-item">-->
<!--                            <a href="javascript:void(0)" class="pull-left thumb-sm m-r"><img-->
<!--                                    src="http://jijianblog.com/usr/themes/handsome/usr/img/sj2/9.jpg"-->
<!--                                    class="img-40px normal-shadow img-square"></a>-->
<!--                            <div class="clear">-->
<!--                                <h4 class="h5 l-h text-second"><a href="javascript:void(0)"> 最暖心的哈士奇：大G </a></h4>-->
<!--                                <small class="text-muted post-head-icon"><span class="meta-views"> <span-->
<!--                                        class="right-small-icons"><svg xmlns="http://www.w3.org/2000/svg"-->
<!--                                                                       width="16px" height="16px"-->
<!--                                                                       viewBox="0 0 24 24" fill="none"-->
<!--                                                                       stroke="currentColor" stroke-width="2"-->
<!--                                                                       stroke-linecap="round"-->
<!--                                                                       stroke-linejoin="round"-->
<!--                                                                       class="feather feather-message-circle"><path-->
<!--                                        d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg></span>  <span-->
<!--                                        class="sr-only">评论数：</span> <span class="meta-value">2</span>-->
<!--                    </span></small></div>-->
<!--                        </li><li class="list-group-item">-->
<!--                            <a href="javascript:void(0)" class="pull-left thumb-sm m-r"><img-->
<!--                                    src="http://jijianblog.com/usr/themes/handsome/usr/img/sj2/9.jpg"-->
<!--                                    class="img-40px normal-shadow img-square"></a>-->
<!--                            <div class="clear">-->
<!--                                <h4 class="h5 l-h text-second"><a href="javascript:void(0)"> 最暖心的哈士奇：大G </a></h4>-->
<!--                                <small class="text-muted post-head-icon"><span class="meta-views"> <span-->
<!--                                        class="right-small-icons"><svg xmlns="http://www.w3.org/2000/svg"-->
<!--                                                                       width="16px" height="16px"-->
<!--                                                                       viewBox="0 0 24 24" fill="none"-->
<!--                                                                       stroke="currentColor" stroke-width="2"-->
<!--                                                                       stroke-linecap="round"-->
<!--                                                                       stroke-linejoin="round"-->
<!--                                                                       class="feather feather-message-circle"><path-->
<!--                                        d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg></span>  <span-->
<!--                                        class="sr-only">评论数：</span> <span class="meta-value">2</span>-->
<!--                    </span></small></div>-->
<!--                        </li><li class="list-group-item">-->
<!--                            <a href="javascript:void(0)" class="pull-left thumb-sm m-r"><img-->
<!--                                    src="http://jijianblog.com/usr/themes/handsome/usr/img/sj2/9.jpg"-->
<!--                                    class="img-40px normal-shadow img-square"></a>-->
<!--                            <div class="clear">-->
<!--                                <h4 class="h5 l-h text-second"><a href="javascript:void(0)"> 最暖心的哈士奇：大G </a></h4>-->
<!--                                <small class="text-muted post-head-icon"><span class="meta-views"> <span-->
<!--                                        class="right-small-icons"><svg xmlns="http://www.w3.org/2000/svg"-->
<!--                                                                       width="16px" height="16px"-->
<!--                                                                       viewBox="0 0 24 24" fill="none"-->
<!--                                                                       stroke="currentColor" stroke-width="2"-->
<!--                                                                       stroke-linecap="round"-->
<!--                                                                       stroke-linejoin="round"-->
<!--                                                                       class="feather feather-message-circle"><path-->
<!--                                        d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg></span>  <span-->
<!--                                        class="sr-only">评论数：</span> <span class="meta-value">2</span>-->
<!--                    </span></small></div>-->
<!--                        </li><li class="list-group-item">-->
<!--                            <a href="javascript:void(0)" class="pull-left thumb-sm m-r"><img-->
<!--                                    src="http://jijianblog.com/usr/themes/handsome/usr/img/sj2/9.jpg"-->
<!--                                    class="img-40px normal-shadow img-square"></a>-->
<!--                            <div class="clear">-->
<!--                                <h4 class="h5 l-h text-second"><a href="javascript:void(0)"> 最暖心的哈士奇：大G </a></h4>-->
<!--                                <small class="text-muted post-head-icon"><span class="meta-views"> <span-->
<!--                                        class="right-small-icons"><svg xmlns="http://www.w3.org/2000/svg"-->
<!--                                                                       width="16px" height="16px"-->
<!--                                                                       viewBox="0 0 24 24" fill="none"-->
<!--                                                                       stroke="currentColor" stroke-width="2"-->
<!--                                                                       stroke-linecap="round"-->
<!--                                                                       stroke-linejoin="round"-->
<!--                                                                       class="feather feather-message-circle"><path-->
<!--                                        d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg></span>  <span-->
<!--                                        class="sr-only">评论数：</span> <span class="meta-value">2</span>-->
<!--                    </span></small></div>-->
<!--                        </li><li class="list-group-item">-->
<!--                            <a href="javascript:void(0)" class="pull-left thumb-sm m-r"><img-->
<!--                                    src="http://jijianblog.com/usr/themes/handsome/usr/img/sj2/9.jpg"-->
<!--                                    class="img-40px normal-shadow img-square"></a>-->
<!--                            <div class="clear">-->
<!--                                <h4 class="h5 l-h text-second"><a href="javascript:void(0)"> 最暖心的哈士奇：大G </a></h4>-->
<!--                                <small class="text-muted post-head-icon"><span class="meta-views"> <span-->
<!--                                        class="right-small-icons"><svg xmlns="http://www.w3.org/2000/svg"-->
<!--                                                                       width="16px" height="16px"-->
<!--                                                                       viewBox="0 0 24 24" fill="none"-->
<!--                                                                       stroke="currentColor" stroke-width="2"-->
<!--                                                                       stroke-linecap="round"-->
<!--                                                                       stroke-linejoin="round"-->
<!--                                                                       class="feather feather-message-circle"><path-->
<!--                                        d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg></span>  <span-->
<!--                                        class="sr-only">评论数：</span> <span class="meta-value">2</span>-->
<!--                    </span></small></div>-->
<!--                        </li>-->

<!--                        </ul>-->
<!--                    </div>-->

<!--                </at-tab-pane>-->
            </at-tabs>
<!--            <section style="padding-left: 0" id="blog_info" class="widget widget_categories wrapper-md clear">-->
<!--                <h5 class="widget-title m-t-none text-md">站点信息</h5>-->
<!--                <ul class="list-group box-shadow-wrap-normal">-->
<!--                    <li class="list-group-item text-second"><span class="blog-info-icons"> <svg-->
<!--                            xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24"-->
<!--                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"-->
<!--                            stroke-linejoin="round" class="feather feather-award"><circle cx="12" cy="8" r="7"></circle><polyline-->
<!--                            points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg></span> <span class="badge-->
<!--           pull-right">3</span>文章数目-->
<!--                    </li>-->
<!--                    <li class="list-group-item text-second"><span class="blog-info-icons"> <svg-->
<!--                            xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24"-->
<!--                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"-->
<!--                            stroke-linejoin="round" class="feather feather-message-circle"><path-->
<!--                            d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg></span>-->
<!--                        <span class="badge-->
<!--           pull-right">3</span>评论数目-->
<!--                    </li>-->
<!--                    <li class="list-group-item text-second"><span class="blog-info-icons"> <svg-->
<!--                            xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24"-->
<!--                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"-->
<!--                            stroke-linejoin="round" class="feather feather-calendar"><rect x="3" y="4" width="18"-->
<!--                                                                                           height="18" rx="2"-->
<!--                                                                                           ry="2"></rect><line x1="16"-->
<!--                                                                                                               y1="2"-->
<!--                                                                                                               x2="16"-->
<!--                                                                                                               y2="6"></line><line-->
<!--                            x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg></span>-->
<!--                        <span class="badge-->
<!--           pull-right">149天</span>运行天数-->
<!--                    </li>-->
<!--                    &lt;!&ndash;                    <li class="list-group-item text-second"><span class="blog-info-icons"> <svg&ndash;&gt;-->
<!--                    &lt;!&ndash;                            xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24"&ndash;&gt;-->
<!--                    &lt;!&ndash;                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"&ndash;&gt;-->
<!--                    &lt;!&ndash;                            stroke-linejoin="round" class="feather feather-activity"><polyline&ndash;&gt;-->
<!--                    &lt;!&ndash;                            points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg></span> <span class="badge&ndash;&gt;-->
<!--                    &lt;!&ndash;           pull-right">2 天前</span>最后活动&ndash;&gt;-->
<!--                    &lt;!&ndash;                    </li>&ndash;&gt;-->
<!--                </ul>-->
<!--            </section>-->
            <!--非文章页面-->
            <!--            <section id="tag_cloud-2" class="widget widget_tag_cloud wrapper-md clear">-->
            <!--                <h5 class="widget-title m-t-none text-md">热门宠物</h5>-->
            <!--                <div class="tags l-h-2x">-->
            <!--                    <a href="http://jijianblog.com/index.php/tag/%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91/"-->
            <!--                       class="label badge" title="" data-toggle="tooltip" data-original-title="科学上网">科学上网</a>-->
            <!--                </div>-->
            <!--            </section>-->
        </div>
    </aside>
</template>

<script>
    import {Tabs, TabPane} from "at-ui"
    import {Tag as ATag,Button as AButton,Divider as ADivider} from "ant-design-vue"
    import service from "../../network/axios"

    export default {
        name: "RightAsideBar",
        components: {
            AtTabs: Tabs,
            AtTabPane: TabPane,
            ATag,
            AButton,
            ADivider
        },
        data(){
            return{
                hotTag:[]
            }
        },
        created() {
            // this
        },

        methods:{
            setHotTagChoice:function (item) {
                this.$store.commit("changeHotTagChoice", item)
                this.$router.replace("/user/blog/hotTag/" + item.tagId)
            }
        }
    }
</script>

<style scoped>
    .at-tabs__pane{

    }
</style>
