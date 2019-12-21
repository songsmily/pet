<template >
    <span class="base_content" :class="{'primary':'primary' === type,'warning':'warning' === type}">{{value}}</span>
</template>

<script>
    export default {
        name: "DefBadge",
        props:{
            value:"",
            type:"",
        }
    }
</script>

<style scoped>
    .base_content{
        background-color: #f56c6c;
        border-radius: 10px;
        color: #fff;
        display: inline-block;
        font-size: 12px;
        padding: 0 6px;
        text-align: center;
        white-space: nowrap;
        border: 1px solid #fff;
        margin-left: 10px;
    }
    .primary{
        background-color: #409eff;
    }
    .warning{
        background-color: #e6a23c;
    }
</style>
