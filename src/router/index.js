import Vue from 'vue'
import VueRouter from "vue-router"
import Header from "../components/content/Header"
const Home = ()=> import("views/Home")
const Share = ()=> import("views/Share")
Vue.use(VueRouter)

const routes = [
    {
        path:"/",
        redirect:"/home"
    },
    {
        path:"/home",
        component:Home,
        meta:{
            tittle:"发现"
        }
    },
    {
        path:"/share",
        component:Share,
        meta: {
            tittle:"分享"
        }
    }
]
const router = new VueRouter({
    routes,
    mode: 'history'
})
router.beforeEach((to,from,next) => {
    document.title = to.meta.tittle
    next()
})
export default router
