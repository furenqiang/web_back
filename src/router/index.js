import Vue from "vue";
import Router from "vue-router";
// 后面这里引入可以被用户访问的页面组件
import home from "../components/home/Home";
import user from "../components/sysUser/User";
import login from "../components/login/Login";
import log from "../components/sysLog/Log";
import exceptLog from "../components/sysExceptionLog/ExceptLog";
import {test} from "../request/sysApi";
import store from "../store/index";

Vue.use(Router);

const router= new Router({
  // 设置路由模式为‘history’，去掉默认的#
  mode: "history",
  routes: [
    // 路由列表
    {
      // path: "路由地址",
      path: "/",
      // component: 组件类名,
      redirect: "/home"
    }, 
    {
      // name:"路由别名",
      name: "home",
      // path: "路由地址",
      path: "/home",
      // component: 组件类名,
      component: home
    }, 
    {
      // name:"路由别名",
      name: "user",
      // path: "路由地址",
      path: "/user",
      // component: 组件类名,
      component: user
    }, 
    {
      // name:"路由别名",
      name: "login",
      // path: "路由地址",
      path: "/login",
      // component: 组件类名,
      component: login
    }, 
    {
      // name:"路由别名",
      name: "log",
      // path: "路由地址",
      path: "/log",
      // component: 组件类名,
      component: log
    }, 
    {
      // name:"路由别名",
      name: "exceptLog",
      // path: "路由地址",
      path: "/exceptLog",
      // component: 组件类名,
      component: exceptLog
    }
  ]
});

export default router

router.afterEach((to,from)=>{
  if(to.fullPath=="/login"){
    //console.log("进入登录页");
  }else{
    test({
      data:{
        param:"1"
      }
    }).then((res)=>{
      if(res===1){
        store.commit({
          type:"changeLoginShow",
          show:false
        })
      }
    })
  }
})

const VueRouterPush = Router.prototype.push
Router.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}
