import  axios from 'axios'
import {Message} from "element-ui"
import util from "../utils/util"

let service = axios.create({
    timeout: 50000
});
let that = this

service.interceptors.response.use(
    response => {

        var code = response.data.code;
        if (code === 50000) {
            sessionStorage.removeItem("adminUserInfo")
            Message.error("浏览器已登录其他账号，请重新登录！")
            setTimeout(()=>{
                window.location.href = util.returnUrl() + "/login"
            },1000)
        }
        if (code === 40007) {
            window.location.href = util.returnUrl() + "/error"
        }
        if (code  === 600 || code === 700) {
            sessionStorage.removeItem("userInfo")
            Message.error("您未登录系统，请登录！")
            setTimeout(()=>{
                window.location.href = util.returnUrl() + "/login"
            },1000)

        }else {
            return response;
        }

    }

)
export default  service;
