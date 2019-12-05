<template>
    <div>
        <div>
            <div class="sc-1duRon-2 pvvuG">
                <div v-if="logOrRegPos" class="sm-btn-group sc-1duRon-5 dvRHZl sc-17dnj82-0 dfsiVH"><span class="switch-tips">没有帐号？请</span>
                    <a class="sm-button  sc-1n784rm-0 sfCUt" type="default"  @click="logOrRegPos = !logOrRegPos">注册</a>
                </div>
                <div v-else class="sm-btn-group sc-1duRon-5 dvRHZl sc-17dnj82-0 dfsiVH"><span class="switch-tips">已有帐号？请</span>
                    <a class="sm-button  sc-1n784rm-0 sfCUt" type="default"  @click="logOrRegPos = !logOrRegPos">登录</a>
                </div>
            </div>
        </div>
        <login v-if="logOrRegPos"></login>
        <register v-else></register>
    </div>
</template>

<script>
    import Login from "./Login"
    import Register from "./Register"

    export default {
        name: "LogReg",
        components:{
            Login,
            Register
        },
        data(){
            return{
                logOrRegPos:true
            }
        }
    }
</script>

<style>
    @import "~assets/css/logres/login.css";
    label{
        text-align: left;
        text-shadow: none;
        font-family: -apple-system,BlinkMacSystemFont,"PingFang SC",Helvetica,Tahoma,Arial,"Microsoft YaHei",微软雅黑,黑体,Heiti,sans-serif,SimSun,宋体,serif;
        display: block;
        padding: 0;
    }

</style>
