<template>
    <van-tabbar v-model="$store.state.navBarIndex">
        <van-tabbar-item icon="home-o"  @click="$router.push('/mobile/user/home')">社区</van-tabbar-item>
        <van-tabbar-item icon="smile-comment-o"  @click="$router.push('/mobile/user/information')">资讯</van-tabbar-item>
        <van-tabbar-item icon="setting-o" @click="petShow = true" >宠物</van-tabbar-item>
        <van-tabbar-item icon="user-o" @click="$router.push('/mobile/user/index')">我的</van-tabbar-item>

        <van-action-sheet
                v-model="petShow"
                :actions="petActions"
                cancel-text="取消"
                @select="onSelect"
                @close="onCancel"
        />
    </van-tabbar>

</template>

<script>
    import { Tabbar, TabbarItem } from 'vant';
    export default {
        name: "MobileNavBar",
        components:{
            VanTabbar: Tabbar,
            VanTabbarItem:TabbarItem
        },
        data(){
            return {
                active: 0,
                petShow:false,
                navBarIndex: parseInt(sessionStorage.getItem('navBarIndex')),
                petActions: [
                    { name: '新增宠物信息', path: "/mobile/user/pet/upload"},
                    { name: '宠物信息管理', path: "/mobile/user/pet/petInfo" },
                    { name: '宠物防疫管理', path: "/mobile/user/pet/petPrevention"},
                ],
            }
        },
        computed: {
            reverseNavBarIndex:function () {
                return parseInt(sessionStorage.getItem('navBarIndex'))
            }
        },
        methods: {
            onSelect:function (item) {
                this.petShow = false;
                this.$router.push(item.path)
            },
            onCancel:function () {
                this.navBarIndex = parseInt(sessionStorage.getItem('navBarIndex'))
            }
        }
    }
</script>

<style scoped>

</style>
