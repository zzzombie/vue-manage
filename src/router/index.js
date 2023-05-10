import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Main',
        component: () => import('@/views/Main.vue'),
        redirect: '/home',
        children: [
            // {
            //     path: '/home',
            //     name: 'home',
            //     component: () => import('@/views/home')
            // },
            // {
            //     path: '/user',
            //     name: 'user',
            //     component: () => import('@/views/User')
            // },
            // {
            //     path: '/mall',
            //     name: 'mall',
            //     component: () => import('@/views/mall')
            // },
            // {
            //     path: '/page1',
            //     name: 'page1',
            //     component: () => import('@/views/other/pageOne.vue')
            // },
            // {
            //     path: '/page2',
            //     name: 'page2',
            //     component: () => import('@/views/other/pageTwo.vue')
            // },
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login/login.vue')
    }
]


//备份VueRouter.prototype原有的push|replace方法
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
//重写VueRouter.prototype的push方法
VueRouter.prototype.push = function (location, resolve, reject) {
     //函数对象的apply与call的区别?
     //相同点:都可以改变函数的上下文一次，而且函数会立即执行一次
     //不同：函数执行的时候，传递参数不同，apply需要的是数组，call传递参数的时候用逗号隔开
     //原始的push方法可以进行路由跳转，但是需要保证上下文this是VueRouter类的实例
     //第一种情况：外部在使用push的时候传递成功与失败的回调
     if (resolve && reject) {
          originPush.call(this, location, resolve, reject);
     } else {
          //第二种情况：外部在使用push方法的时候没有传递成功与失败的回调函数
          originPush.call(this, location, () => { }, () => { });
     }
}
const router = new VueRouter({
    // path:'/home',
    mode: 'history',
    routes
})

export default router