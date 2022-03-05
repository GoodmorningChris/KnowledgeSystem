import {createRouter, createWebHashHistory} from "vue-router";
import axios from "axios";
import store from "../plugins/store.js";
const Administrator=()=>import("../pages/Administrator.vue")
const Login=()=>import("../pages/Login.vue")
const  routes =[
    {path: "/", redirect: '/Login'},
    {
        path: "/Administrator",
        name: "Administrator",
        component:Administrator,
    },
    {
        path: "/Login",
        name: "Login",
        component:Login,
    },
];


const router = createRouter({
    history: createWebHashHistory(),
    routes
});
// router.beforeEach((to,form,next)=>{
//     if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
//         console.log("进入需要判断权限的地方")
//         let userInfo = store.getters.getUserInfo;
//         console.log(userInfo)
//         let authType = userInfo.type;
//         let token = userInfo.token;
//         axios.get('https://',
//             {
//                 headers: {
//                     'Authorization': authType + ' ' + token
//                 }
//             })
//             .then(()=> next()
//             ).catch(error => {
//             if (error.response.status === 401)
//                 next({
//                     path: '/',
//                     query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
//                 })
//         })
//         next();
//     }
//     else {
//         next();
//     }
// })
//
// router.afterEach((to,from,next)=>{
//     document.title=to.meta.title||"知识库系统"
// })

export default router;