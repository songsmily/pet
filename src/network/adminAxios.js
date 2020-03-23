import  axios from 'axios'
import {Message} from "element-ui"

let adminService = axios.create({
    timeout: 50000
});

adminService.interceptors.response.use(
    response => {
        var code = response.data.code;
        if (code  === 600 ) {
            sessionStorage.removeItem("adminUserInfo")
            Message.error("您未登录系统，请登录！")
            setTimeout(()=>{
                window.location.href = this.$util.returnUrl() + "/login"
            },2000)

        }else if (code === 700) {
            Message.error("当前用户未获取权限！")

        }else{
            return response;

        }

    }

)
export default  adminService;
