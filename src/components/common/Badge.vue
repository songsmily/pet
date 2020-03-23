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
        border-radius: 90%;
        color: #fff;
        display: inline-block;
        font-size: 12px;
        padding: 0 6px;
        text-align: center;
        white-space: nowrap;
        margin-left: 10px;
        line-height: initial;
        min-height: 10px;
        min-width: 10px;
    }
    .primary{
        background-color: #409eff;
    }
    .warning{
        background-color: #e6a23c;
    }
</style>
