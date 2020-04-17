<template>
    <div id="app" >
        <router-view ></router-view>

    </div>
</template>

<script>


    export default {
        name: 'app',
        data() {
            return {
                centerDialogVisible: false,
            }
        },
        methods: {
        },
        mounted() {
            function f() {
                let arr = []
                while(arr.length < 4){
                    let i = Math.ceil( Math.random() * 20)
                    if(!arr.includes(i)){
                        arr.push(i)
                    }
                }
                console.log(arr)
            }
            // f()
        }
    }

</script>

<style>
    #app{
        height: 100%;
    }
    /*
TabBar样式重写
 */
    .at-tabs-nav{
        width: 100%;
        display: flex;
        text-align: center;
    }
    .at-tabs-nav >div{
        flex: 1;
    }

    .at-input__original{
        font-size: 14px;
        color: #606266;
    }


    @import "~vue-layer/lib/vue-layer.css";
    @import "~at-ui-style";
    /*@import "~semantic-ui/dist/semantic.min.css";*/
    /*@import "~assets/libs/font-awesome-4.7.0 2/css/font-awesome.min.css";*/
    @import "~assets/css/base.css";

</style>

