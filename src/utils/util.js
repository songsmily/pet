import axios from "axios"
import service from "../network/axios"

export default {
    // initApp(that){
    //     this.isMobile(that)
    //     this.getUserInfo(that);
    //
    // },
    /**
     * 获取用户信息
     * @param that
     */
    getUserInfo(that) {
        const _this = this
        if (!sessionStorage.getItem("userInfo")) {
            axios.get("/api/user/returnUserInfo").then(function (res) {
                console.log(res)
                if (res.data.data) {
                    sessionStorage.setItem('userInfo', JSON.stringify(res.data.data))
                    that.$store.commit("changeUserInfo", _this.returnUserInfo())
                    that.$store.commit("changeLoginType", true)
                }
            }).catch(function (res) {
                console.log(res)
            })
        }

    },
    /**
     * 替换用户信息
     * @param that
     */
    replaceUserInfo(that) {
        const _this = this
        axios.get("/api/user/returnUserInfo").then(function (res) {
            console.log(res)
            if (res.data.data) {
                sessionStorage.setItem('userInfo', JSON.stringify(res.data.data))
                that.$store.commit("changeUserInfo", _this.returnUserInfo())
                that.$store.commit("changeLoginType", true)
                that.reloadUserInfoForm()
            }
        }).catch(function (res) {
            console.log(res)
        })
    },
    /**
     * 获取用户消息和系统通知
     */
    returnMessage(that, status = false) {
        if (that.$store.state.sysPetMessage.limit === 0) {
            that.$store.state.sysPetMessage.limit += 6
        } else {
            that.$store.state.sysPetMessage.limit += 3
        }
        let url = "/api/sysPetNotice/getMessage?topNumber=" + that.$store.state.sysPetMessage.limit
        service.post(url).then(function (res) {
            that.$store.state.sysPetMessage.data = res.data.data.list
            that.$store.state.sysPetMessage.unReadCount = res.data.data.unReadCount
        })
        if (status) {
            that.$Loading.finish()
        }

    },
    setUserInfoAndLoginTypeToStore(that) {
        that.$store.commit("changeUserInfo", this.returnUserInfo())
        that.$store.commit("changeLoginType", this.loginType())

    },
    returnUserInfo() {
        return JSON.parse(sessionStorage.getItem("userInfo"))
    },
    isMobile(that) {
        if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
            that.$store.commit('isMobile', true)
            console.log("我是手机")
        } else {
            that.$store.commit('isMobile', false)
        }
    },
    loginType(that) {
        return !(null === sessionStorage.getItem("userInfo"))
    },

    logOut(that) {
        const _this = this
        axios.get("/api/user/logOut").then(function (res) {
            sessionStorage.removeItem("userInfo")
            _this.setUserInfoAndLoginTypeToStore(that)
            if (parseInt(sessionStorage.getItem("isMobile")) === 1) {
                that.$Toast.success("已退出登录")
                that.$router.push('/mobile/login')
            } else {
                that.$Message({
                    message: '已退出登录！',
                    type: "success"
                })
                that.$router.push('/login')
            }
        })
    },
    returnUrl() {
        return window.location.protocol + "//" + window.location.host
    },
    /**
     * Parse the time to string
     * @param {(Object|string|number)} time
     * @param {string} cFormat
     * @returns {string | null}
     */
    parseTime(time, cFormat) {
        if (arguments.length === 0) {
            return null
        }
        const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
        let date
        if (typeof time === 'object') {
            date = time
        } else {
            if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
                time = parseInt(time)
            }
            if ((typeof time === 'number') && (time.toString().length === 10)) {
                time = time * 1000
            }
            date = new Date(time)
        }
        const formatObj = {
            y: date.getFullYear(),
            m: date.getMonth() + 1,
            d: date.getDate(),
            h: date.getHours(),
            i: date.getMinutes(),
            s: date.getSeconds(),
            a: date.getDay()
        }
        const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
            const value = formatObj[key]
            // Note: getDay() returns 0 on Sunday
            if (key === 'a') {
                return ['日', '一', '二', '三', '四', '五', '六'][value]
            }
            return value.toString().padStart(2, '0')
        })
        return time_str
    },
    /**
     * 获取热门标签
     */
    getHotTags(that){
        service({
            method:"post",
            url:"/api/blTag/getHotTags"
        }).then(res => {
            if (res.data.code === 100){
                that.$store.commit("changeHotTags",res.data.data)
            }
        })
    },
    /**
     * 查看热门标签
     */
    setHotTagChoice(that, hotTagChoice) {
      that.$store.commit("changeHotTagChoice", hotTagChoice)
    },
    /**
     * @param {number} time
     * @param {string} option
     * @returns {string}
     */
    formatTime(time, option) {
        if (('' + time).length === 10) {
            time = parseInt(time) * 1000
        } else {
            time = +time
        }
        const d = new Date(time)
        const now = Date.now()

        const diff = (now - d) / 1000

        if (diff < 30) {
            return '刚刚'
        } else if (diff < 3600) {
            // less 1 hour
            return Math.ceil(diff / 60) + '分钟前'
        } else if (diff < 3600 * 24) {
            return Math.ceil(diff / 3600) + '小时前'
        } else if (diff < 3600 * 24 * 2) {
            return '1天前'
        }
        if (option) {
            return parseTime(time, option)
        } else {
            return (
                d.getMonth() +
                1 +
                '月' +
                d.getDate() +
                '日' +
                d.getHours() +
                '时' +
                d.getMinutes() +
                '分'
            )
        }
    }


}
