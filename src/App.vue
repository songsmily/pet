<template>
    <div id="app" class="app app-aside-fixed container app-header-fixed ">
        <header-bar></header-bar>
        <aside-bar></aside-bar>
        <router-view></router-view>
        <el-dialog :visible.sync="$store.state.isShowLogRegDialog" center width="45%">
            <log-reg></log-reg>
        </el-dialog>


    </div>
</template>

<script>
    import HeaderBar from "./components/content/Header"
    import AsideBar from "./components/content/AsideBar"

    import Swal from "sweetalert2"
    import Login from "./components/content/Login"
    import LogReg from "./components/content/LogReg"

    export default {
        name: 'app',
        components: {
            HeaderBar,
            AsideBar,
            LogReg
        },
        data() {
            return {
                centerDialogVisible: false
            }
        },
        methods: {
            test: function () {
                //     this.$layer.iframe({
                //       content: {
                //         content: Login, //传递的组件对象
                //         parent: this,//当前的vue对象
                //         data:{}//props
                //       },
                //       offset:["100px",'100px'],
                //       area:['800px','600px'],
                //       title: false,
                // // cancel:()=>{//关闭事件
                // //   alert('关闭iframe');
                // // }
                //   });
            }
        }
    }

</script>

<style>
    @import "~vue-layer/lib/vue-layer.css";
    /*@import "~semantic-ui/dist/semantic.min.css";*/
    @import "~assets/libs/font-awesome-4.7.0 2/css/font-awesome.min.css";
    @import "~assets/css/base.css";

</style>

