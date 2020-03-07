<template>
    <div>sgfaessr</div>
</template>

<script>
    import service from "network/axios"
    export default {
        name: "AdminHome",
        data(){
            return{
                userInfo:""
            }
        },
        created() {
            let that = this
            service.get("/api/admin/adminUser/returnUserInfo").then(function (res) {
                that.userInfo = res
            })
        }
    }
</script>

<style scoped>

</style>
