<template>
    <div>
    <div>
        <div>
            <div class="sc-1duRon-1 sbfRl">
                <p class="sc-1I1iYs-3 kmwMDA" style='font-family: serif;font-size: 18px;color: #41464B;'>宠物之家</p>
            </div>
            <div class="sc-1duRon-3 cPHJDB">
                <div class="sc-1duRon-4 doAKkT">
                    <div class="sc-3JRwrF irtYus">
                        <div class="main">
                            <div class="title">
<!--                                <img src="http://localhost/exam/resources/views/img/70.png" style="width: 40%">-->
                            <p>注册</p>
                            </div>
                            <div class="sc-3JRwrF-1 khjAih">
                                <div class="form-wrapper">
                                    <div class="sc-2oZUsG bHHvBK">
                                        <form id="form">
                                            <div>
                                                <div class="sc-3ksGSP kPTEpp" type="mobileOrEmail"><label class="label">输入姓名</label>
                                                    <div class="input"><input id="username" type="text" placeholder="" autocomplete="off" autofocus value=""
                                                                              name="username"></div>
                                                    <div class="tips" id="usernameTip"></div>
                                                </div>

                                                <div class="sc-3ksGSP kPTEpp" type="mobileOrEmail"><label class="label">输入手机号</label>
                                                    <div class="input"><input id="phone" type="text" placeholder="" autocomplete="off"  value=""
                                                                              name="phone"></div>
                                                    <div class="tips" id="phoneTip"></div>

                                                </div>
                                                <div class="sc-3ksGSP kPTEpp" type="mobileOrEmail"><label class="label">输入支部名称</label>
                                                    <div class="input"><input id="zhibu" type="text" placeholder="" autocomplete="off"  value=""
                                                                              name="zhibu"></div>
                                                    <div id="zhibuTip" class="tips"></div>

                                                </div>
                                                <div class="sc-3ksGSP kPTEpp" type="password"><label class="label">输入密码</label>
                                                    <div class="input"><input id="password" type="password" placeholder="" autocomplete="off" value=""
                                                                              name="password">
                                                    </div>
                                                    <div class="tips" id="passwordTip"></div>
                                                </div>
                                                <div class="sc-3ksGSP kPTEpp" type="password"><label class="label">再次输入密码</label>
                                                    <div class="input"><input disabled id="repassword" type="password" placeholder="" autocomplete="off" value=""
                                                                              name="repassword">
                                                    </div>
                                                    <div class="tips" id="repasswordTip"></div>
                                                </div>
                                                <button class="sm-button submit sc-1n784rm-0 bcuuIb" type="button">立即注册</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="ToastsContainer_ShimoUI">
                <div class="Toastify"></div>
            </div>
        </div>
    </div>
    <div id="feedback-root"></div>
    <div id="blockbyte-bs-indicator" style="width: 8px; height: 27%; top: 0%;"></div>
    </div>
</template>

<script>
    export default {
        name: "Register"
    }
</script>

<style scoped>
    @import "~assets/css/logres/login.css";
    label{
        text-align: left;
        text-shadow: none;
        font-family: -apple-system,BlinkMacSystemFont,"PingFang SC",Helvetica,Tahoma,Arial,"Microsoft YaHei",微软雅黑,黑体,Heiti,sans-serif,SimSun,宋体,serif;
        display: block;
        padding: 0;
    }
</style>
