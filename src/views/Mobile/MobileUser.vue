<template>
    <div>

        <router-view></router-view>
        <mobile-nav-bar></mobile-nav-bar>
    </div>
</template>

<script>
    import { Calendar, Cell} from 'vant';
    import MobileNavBar from "./MobileNavBar"

    export default {
        name: "MobileUser",
        components:{
            VanCalendar: Calendar,
            VanCell:Cell,
            MobileNavBar

        },
        data() {
            return {
                date: '',
                show: false,
            };
        },
        created(){
            this.$util.returnMessage(this)
        },
        methods: {
            formatDate(date) {
                return `${date.getMonth() + 1}/${date.getDate()}`;
            },
            onConfirm(date) {
                this.show = false;
                this.date = this.formatDate(date);
            },
        },
    }
</script>

<style scoped>
    .nav-bar-sty {


    }

</style>
